
const dbName = "recordDB";
const objStoreName = "record";

var db;
var selectedRecordID;
var selectedRecordObj;
var selectedFilter;
var selectedFilterCustomer = '';
var selectedRecordItem;

function InitRecordDB(callback) {

    var request = indexedDB.open(dbName, 1);

    request.onsuccess = function (event) {
        db = request.result;
        callback();
    };

    request.onerror = function(event) {
    };

    request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objStore = db.createObjectStore(objStoreName, { keyPath: "id", autoIncrement:true });
        objStore.createIndex("date", "date", { unique: false });
        objStore.createIndex("customer", "customer", { unique: false });
    };
}

function AddRecord(obj, callback) {

    var id;

    if (obj == null || obj['total'] == 0) {
        console.log('AddRecord: invalid obj');
        return
    }

    var transaction = db.transaction([objStoreName], "readwrite");

    transaction.onerror = function(event) {
        console.log('transaction.onerror AddRecord');
    };

    transaction.oncomplete = function(event) {
        callback(id);
    };

    var objectStore = transaction.objectStore(objStoreName);
    var request = objectStore.add(obj);
    request.onsuccess = function(event) {
        id  = event.target.result;
    }
}

function DelRecord(id, callback) {

    var transaction = db.transaction([objStoreName], "readwrite");

    transaction.onerror = function(event) {
        console.log('transaction.onerror DelRecord');
    };

    transaction.oncomplete = function(event) {
        callback();
    };

    var objectStore = transaction.objectStore(objStoreName);
    var request = objectStore.delete(id);
}

function GetRecord(id, callback) {

    var transaction = db.transaction([objStoreName], "readwrite");
    var obj;

    transaction.onerror = function(event) {
        console.log('transaction.onerror DelRecord');
    };

    transaction.oncomplete = function(event) {
        callback(obj);
    };

    var objectStore = transaction.objectStore(objStoreName);
    var request = objectStore.get(id);
    request.onsuccess = function(event) {
        obj = request.result;
    };
}

function SaveRecordObj(obj, callback) {

    var transaction = db.transaction([objStoreName], "readwrite");

    transaction.onerror = function(event) {
        console.log('transaction.onerror DelRecord');
    };

    transaction.oncomplete = function(event) {
        callback();
    };

    var objectStore = transaction.objectStore(objStoreName);
    var request = objectStore.put(obj);
    request.onsuccess = function(event) {
    };
}

function DelSelectedRecord(){
    var result = confirm("Want to delete?");
    if (result) {
        DelRecord(selectedRecordID, ShowAllRecord);
    }
}

function getAllItems(callback) {

    var items = [];
    var transaction = db.transaction([objStoreName], "readwrite");

    transaction.oncomplete = function(event) {
        callback(items);
    };

    var objectStore = transaction.objectStore(objStoreName);
    var cursorRequest = objectStore.openCursor();
 
    cursorRequest.onerror = function(error) {
        console.log(error);
    };
 
    cursorRequest.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        }
    };
}

function SelectRecord(element) {
    var id = $(element).find('td:first')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    selectedRecordID = parseInt(id, 10);
}

function LoadFilter() {
    selectedFilterCustomer = document.getElementById('selectedFilterCustomer').value;
    selectedFilter = document.getElementById('selectedFilter').value;
    ShowAllRecord();
}

function ShowFilter() {

    var selectCustomer = '';
    selectCustomer += '<select id=selectedFilterCustomer onChange=\'LoadFilter()\'>';
    selectCustomer += '<option value=\"\">--- ALL ---</option>';
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_customer) != 0)
            continue;
        var name = localStorage.key(i);
        var item = name.substring(prefix_customer.length);
        selectCustomer += '<option value=\"'+name+'\">'+item+'</option>';
    }
    selectCustomer += '</select>'

    var select = '';
    select += '<select id=selectedFilter onChange=\'LoadFilter()\'>';
    select += '<option value=none>None</option>';
    select += '<option value=non-shipped>Non-Shipped</option>';
    select += '<option value=non-paid>Non-Paid</option>';
    select += '</select>';

    var text = '';
    text += '<table>';
    text += '<tr><td>Customer: '+selectCustomer+'</td></tr>';
    text += '<tr><td>Filter: '+select+'</td></tr>';
    text += '</table>';

    document.getElementById('RecordFilter').innerHTML=text;
    document.getElementById('selectedFilter').value = selectedFilter;
}

function ShowAllObj(objs) {

    var text = '';
    text += '<br><table>';
    text += '<tr><th>ID</th><th>Date</th><th>Customer</th><th>Total</th><th>Shipped</th><th>Paid</th></tr>';
    for (var i = 0; i < objs.length; i++) {

        if (selectedFilterCustomer != '' && objs[i]['customer'] != selectedFilterCustomer.substring(prefix_customer.length))
            continue;
        if (selectedFilter == 'non-shipped' && objs[i]['ship'] != 'no')
            continue;
        if (selectedFilter == 'non-paid' && objs[i]['paid'] != 'no')
            continue;

        text += '<tr onclick=SelectRecord(this)>';
        text += '<td>'+objs[i]['id']+'</td>';
        text += '<td>'+date2text(objs[i]['date'])+'</td>';
        text += '<td>'+objs[i]['customer']+'</td>';
        text += '<td class=total>$'+objs[i]['total']+'</td>';
        text += '<td>'+objs[i]['ship']+'</td>';
        text += '<td>'+objs[i]['paid']+'</td>';
        text += '</tr>';
    }
    text += '</table>';

    document.getElementById('RecordResult').innerHTML=text;

    $('#RecordFilter').show();
    $('#RecordEntry').show();
    $('#RecordEdit').hide();
    $('#RecordItemEdit').hide();
}

function ShowAllRecord() {
    getAllItems(ShowAllObj);
}

function PrintSelectedRecord() {
    PrintObjByID(selectedRecordID);
}

function LoadRecord() {
    ShowFilter();
    InitRecordDB(ShowAllRecord);
}

function SelectRecordItem(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var price = $(element).find('td:nth-child(2)')[0].innerHTML;
    var qty = $(element).find('td:nth-child(3)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    selectedRecordItem = name;
}

function EditObj(obj) {

    var yes_no = '<option value=no>no</option><option value=yes>yes</option>';

    var order = obj['order'];
    var text = '';

    var count = 0;
    var total = 0;

    text += '<br><hr>'
    text += '<table>';
    text += '<tr><th>Shipped</th><td><select id=RecordShipped>'+ yes_no +'</select></td></tr>';
    text += '<tr><th>Paid</th><td><select id=RecordPaid>' + yes_no + '</select></td></tr>';
    text += '</table>';

    text += '<br><hr>'
    text += '<table>';
    text += '<tr><th>Item</th><th>Price</th><th>Qty</th><th class=amount>Amount</tr>';
    for (key in order) {
        var value = order[key].split(separator);
        var price = value[0];
        var qty = value[1];
        var amount = float_m(price, qty);
        text += '<tr onclick=SelectRecordItem(this)>';
        text += '<td>' + key + '</td>';
        text += '<td>' + price + '</td>';
        text += '<td>' + qty + '</td>';
        text += '<td class=amount>' + amount + '</td>';
        text += '</tr>';

        count += 1;
        total = float_a(total, amount);
    }
    text += '</table>';

    text += '<br><table><tr><td class=total>';
    text += ' Item: '+count+' Total: '+total;
    text += '</td></tr></table>';

    obj['count'] = count;
    obj['total'] = total;

    document.getElementById('RecordResult').innerHTML=text;
    document.getElementById('RecordShipped').value = obj['ship'];
    document.getElementById('RecordPaid').value = obj['paid'];

    $('#RecordFilter').hide();
    $('#RecordEntry').hide();
    $('#RecordEdit').show();
    $('#RecordItemEdit').hide();
}

function DelSelectedRecordItem() {
    delete selectedRecordObj['order'][selectedRecordItem];
    EditObj(selectedRecordObj);
}

function EditSelectedRecordObj(obj) {
    selectedRecordObj = obj;
    EditObj(selectedRecordObj);
}

function EditSelectedRecord() {
    GetRecord(selectedRecordID, EditSelectedRecordObj);
}

function LoadRecordItemPrice() {
    var name = document.getElementById('NewRecordItemName').value;
    document.getElementById('NewRecordItemPrice').value = localStorage.getItem(prefix_item+name);
}

function EditSelectedRecordItem(selected) {

    var selectedRecordItemName = '';
    var selectedRecordItemPrice = '';
    var selectedRecordItemQty = '1';

    if (selected != true) {
        selectedRecordItem = '';
    }

    else {
        selectedRecordItemName = selectedRecordItem;
        var value = selectedRecordObj['order'][selectedRecordItem].split(separator);
        selectedRecordItemPrice = value[0];
        selectedRecordItemQty = value[1];
    }

    var select = '';
    select += '<select id=NewRecordItemName onChange=\'LoadRecordItemPrice()\'>'
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_item) != 0)
            continue;
        var name = localStorage.key(i);
        var item = name.substring(prefix_item.length);
        select += '<option value=\"'+item+'\">'+item+'</option>';
    }
    select += '</select>'

    var text = '';
    text += '<table>'
    text += '<tr><th>Item</th><td>'+select+'</td></tr>'
    text += '<tr><th>Price</th><td><input type=text id=NewRecordItemPrice \></td></tr>'
    text += '<tr><th>Qty</th><td><input type=text id=NewRecordItemQty \></td></tr>'
    text += '</table>';

    document.getElementById('RecordResult').innerHTML=text;
    document.getElementById('NewRecordItemName').value = selectedRecordItemName;
    document.getElementById('NewRecordItemPrice').value = selectedRecordItemPrice;
    document.getElementById('NewRecordItemQty').value = selectedRecordItemQty;

    $('#RecordFilter').hide();
    $('#RecordEntry').hide();
    $('#RecordEdit').hide();
    $('#RecordItemEdit').show();
}

function SaveSelectedRecord() {
    var result = confirm("Want to Save?");
    if (result) {
        selectedRecordObj['ship'] = document.getElementById('RecordShipped').value;
        selectedRecordObj['paid'] = document.getElementById('RecordPaid').value;
        SaveRecordObj(selectedRecordObj, ShowAllRecord);
    }
}

function SaveSelectedRecordItem() {

    var name = document.getElementById('NewRecordItemName').value;
    var price = document.getElementById('NewRecordItemPrice').value;
    var qty = document.getElementById('NewRecordItemQty').value;

    if (name == '' || price == '' || qty == '') {
        console.log('SaveSelectedRecordItem Error');
        return;
    }

    if (selectedRecordItem != '' && selectedRecordItem != name) {
        delete selectedRecordObj['order'][selectedRecordItem];
    }

    selectedRecordObj['order'][name] = price+separator+qty;
    EditObj(selectedRecordObj);
}
