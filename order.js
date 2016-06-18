
function AddSelectedOrder() {
    var name = document.getElementById('OrderName').value;
    var price = document.getElementById('OrderPrice').value;
    var qty = document.getElementById('OrderQty').value;
    if (name != '' && price != '' && qty != '' && !isNaN(price) && !isNaN(qty)) {
        sessionStorage.setItem(prefix_order+name, price+separator+qty);
        ShowOrder();
    }
}

function DelOrder() {
    var name = document.getElementById('OrderName').value;
    sessionStorage.removeItem(prefix_order+name);
    ShowOrder();
}

function SaveEdit() {

    var oldname = document.getElementById('OrderName').value;
    var newname = document.getElementById('NewOrderName').value;
    if (oldname != '' && newname != '' && oldname != newname) {
        sessionStorage.removeItem(prefix_order+oldname);
    }

   document.getElementById('OrderName').value = document.getElementById('NewOrderName').value;
   document.getElementById('OrderPrice').value = document.getElementById('NewOrderPrice').value;
   document.getElementById('OrderQty').value = document.getElementById('NewOrderQty').value;
   AddSelectedOrder();
}

function LoadPrice() {
    var name = document.getElementById('NewOrderName').value;
    document.getElementById('NewOrderPrice').value = localStorage.getItem(prefix_item+name);
}

function EditOrder(selected) {

    if (selected != true) {
        document.getElementById('OrderName').value = '';
        document.getElementById('OrderPrice').value = '';
        document.getElementById('OrderQty').value = '1';
    }

    var select = '';
    select += '<select id=NewOrderName onChange=\'LoadPrice()\'>'
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
    text += '<tr><th>Each</th><td><input type=text id=NewOrderPrice \></td></tr>'
    text += '<tr><th>Qty</th><td><input type=text id=NewOrderQty \></td></tr>'
    text += '</table>';

    document.getElementById('OrderResult').innerHTML=text;
    document.getElementById('NewOrderName').value = document.getElementById('OrderName').value;
    document.getElementById('NewOrderPrice').value = document.getElementById('OrderPrice').value;
    document.getElementById('NewOrderQty').value = document.getElementById('OrderQty').value;

    $('#CustomerResult').hide();
    $('#OrderEntry').hide();
    $('#OrderEdit').show();
}

function SelectOrder(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var price = $(element).find('td:nth-child(2)')[0].innerHTML;
    var qty = $(element).find('td:nth-child(3)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    document.getElementById('OrderName').value = name;
    document.getElementById('OrderPrice').value = price; 
    document.getElementById('OrderQty').value = qty; 
}

function ShowOrder() {

    var count = 0;
    var total = 0;

    var text = '';
    text += '<br><table>';
    text += '<tr><th>Item</th><th>Price</th><th>Qty</th><th class=amount>Amount</th></tr>';
    for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i).indexOf(prefix_order) != 0)
            continue;
        var name = sessionStorage.key(i);
        var value = sessionStorage.getItem(name).split(separator);
        var price = value[0];
        var qty = value[1];
        var amount = price * qty;
        text += '<tr onclick=SelectOrder(this)>';
        text += '<td>'+name.substring(prefix_order.length)+'</td>';
        text += '<td>'+price+'</td>';
        text += '<td>'+qty+'</td>';
        text += '<td class=amount>'+amount+'</td>';
        text += '</tr>';
        count += 1;
        total += amount;
    }
    text += '</table>';

    text += '<br><table><tr><td class=total>';
    text += ' Item: '+count+' Total: '+total;
    text += '</td></tr></table>';

    document.getElementById('OrderResult').innerHTML=text;
    $('#CustomerResult').show();
    $('#OrderEntry').show();
    $('#OrderEdit').hide();
}

function LoadCustomer() {
    var value = document.getElementById('coCustomer').value;
    sessionStorage.setItem('coCustomer', value);
}

function ShowCustomer() {

    var select = '';
    select += '<select id=coCustomer onChange=\'LoadCustomer()\'>';
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_customer) != 0)
            continue;
        var name = localStorage.key(i);
        var item = name.substring(prefix_customer.length);
        select += '<option value=\"'+item+'\">'+item+'</option>';
    }
    select += '</select>';

    var text = '';

    text += '<table>';
    text += '<tr><td>Ordered By : '+select+'</td></tr>';
    text += '</table>';

    document.getElementById('CustomerResult').innerHTML=text;
    document.getElementById('coCustomer').value = sessionStorage.getItem('coCustomer');
}

function GenRecordObj() {

    var obj = new Object;
    var order = new Object;
    var total = 0;
    var count = 0;

    for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i).indexOf(prefix_order) != 0)
            continue;
        var name = sessionStorage.key(i);
        var value = sessionStorage.getItem(name);
        var price = value.split(separator)[0];
        var qty = value.split(separator)[1];

        order[name.substring(prefix_order.length)] = value;

        count += 1;
        total += price * qty;
    }

    obj['customer'] = sessionStorage.getItem('coCustomer');;
    obj['date'] = getDateFormat();
    obj['count'] = count;
    obj['total'] = total;
    obj['order'] = order;

    return obj;
}

function ResetOrder() {

    var list = [];

    for (var i = 0; i < sessionStorage.length; i++)
        list.push(sessionStorage.key(i));

    for (var i = 0; i < list.length; i++)
        sessionStorage.removeItem(list[i]);

    document.getElementById('coCustomer').value = '';
}

function SaveOrder_pass3(id) {

    var obj = GenRecordObj();
    ResetOrder();

    var text = '';
    text += '<h1>Saved Successfully</h1>';
    text += '<h1>';
    text += ' [RecordID] ' + id;
    text += ' [Customer] ' + obj['customer'];
    text += ' [Total] ' + obj['total'];
    text += ' <a target="_blank" href=print.html?id='+id+'>[PRINT]</a>';
    text += '</h1>';
    document.getElementById('OrderResult').innerHTML = text;
}

function SaveOrder_pass2() {
    AddRecord(GenRecordObj(), SaveOrder_pass3);
}

function SaveOrder() {
    InitRecordDB(SaveOrder_pass2);
}

function LoadOrder() {
    ShowCustomer();
    ShowOrder();
}
