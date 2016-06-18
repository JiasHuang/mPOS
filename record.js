
const dbName = "recordDB";
const objStoreName = "record";

var db;
var selectedRecordID;

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

function DelSelectedRecord(){
    DelRecord(selectedRecordID, ShowRecord);
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

function ShowObj(objs) {

    var text = '';
    text += '<br><table>';
    text += '<tr><th>ID</th><th>Date</th><th>Customer</th><th class=total>Total Amount</th><th>Shipped</th><th>Paid</th></tr>';
    for (var i = 0; i < objs.length; i++) {
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
    $('#RecordEntry').show();
    $('#RecordEdit').hide();

}

function ShowRecord() {
    getAllItems(ShowObj);
}

function PrintSelectedRecord() {
    PrintObjByID(selectedRecordID);
}

function SaveEdit() {
    ShowRecord();
}

function EditSelectedRecord() {
    $('#RecordEntry').hide();
    $('#RecordEdit').show();
}

function LoadRecord() {
    InitRecordDB(ShowRecord);
}
