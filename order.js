
var selectedOrderName = '';
var selectedOrderPrice = '';
var selectedOrderQty = '';

function AddSelectedOrder() {

    if (selectedOrderName == '' || selectedOrderPrice == '' || selectedOrderQty == '' || isNaN(selectedOrderPrice) || isNaN(selectedOrderQty)) {
        console.log('AddSelectedOrder Error');
        return;
	}

    sessionStorage.setItem(prefix_order+selectedOrderName, selectedOrderPrice+separator+selectedOrderQty);
    ShowOrder();
}

function DelOrder() {
    var result = confirm("Want to delete?");
    if (result) {
        sessionStorage.removeItem(prefix_order+selectedOrderName);
        ShowOrder();
    }
}

function SaveEditOrder() {

    var newname = $('#NewOrderName').val();
    var newprice = $('#NewOrderPrice').val();
    var newqty = $('#NewOrderQty').val();

    if (selectedOrderName != '' && selectedOrderName != newname) {
        sessionStorage.removeItem(prefix_order+selectedOrderName);
    }

    selectedOrderName = newname;
    selectedOrderPrice = newprice;
    selectedOrderQty = newqty;
    AddSelectedOrder();
}

function LoadPrice() {
    var name = $('#NewOrderName').val();
    $('#NewOrderPrice').val(localStorage.getItem(prefix_item+name));
}

function EditOrder(selected) {

    if (selected != true) {
        selectedOrderName = '';
        selectedOrderPrice = '';
        selectedOrderQty = '1';
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
    text += '<tr><th>Price</th><td><input type=text id=NewOrderPrice \></td></tr>'
    text += '<tr><th>Qty</th><td><input type=text id=NewOrderQty \></td></tr>'
    text += '</table>';

    $('#OrderResult').html(text);
    $('#NewOrderName').val(selectedOrderName);
    $('#NewOrderPrice').val(selectedOrderPrice);
    $('#NewOrderQty').val(selectedOrderQty);

    $('#CustomerResult').hide();
    $('#OrderEntry').hide();
    $('#OrderEdit').show();
}

function SelectOrder(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var price = $(element).find('td:nth-child(2)')[0].innerHTML;
    var qty = $(element).find('td:nth-child(3)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    selectedOrderName = name;
    selectedOrderPrice = price;
    selectedOrderQty = qty;
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
        var amount = float_m(price, qty);
        text += '<tr onclick=SelectOrder(this)>';
        text += '<td>'+name.substring(prefix_order.length)+'</td>';
        text += '<td>'+price+'</td>';
        text += '<td>'+qty+'</td>';
        text += '<td class=amount>'+amount+'</td>';
        text += '</tr>';
        count += 1;
        total = float_a(total, amount);
    }
    text += '</table>';

    text += '<br><table><tr><td class=total>';
    text += ' Item: '+count+' Total: '+total;
    text += '</td></tr></table>';

    $('#OrderResult').html(text);
    $('#CustomerResult').show();
    $('#OrderEntry').show();
    $('#OrderEdit').hide();
}

function LoadCustomer() {
    var value = $('#coCustomer').val();
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
    text += '<tr><th>Customer</th><td>'+select+'</td></tr>';
    text += '</table>';

    $('#CustomerResult').html(text);
    $('#coCustomer').val(sessionStorage.getItem('coCustomer'));
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
    obj['ship'] = 'no';
    obj['paid'] = 'no';

    return obj;
}

function ResetOrder() {

    var list = [];

    for (var i = 0; i < sessionStorage.length; i++)
        list.push(sessionStorage.key(i));

    for (var i = 0; i < list.length; i++)
        sessionStorage.removeItem(list[i]);

    $('#coCustomer').val('');
}

function SaveOrder_pass3(id) {

    var obj = GenRecordObj();
    ResetOrder();

    var text = '';
    text += '<br>'
    text += '<h1>Saved Successfully. ID='+id+'</h1>';
    text += '<br><hr>'
    text += '<table>'
    text += '<tr><td>RecordID</td><td class=right>'+id+'</td></tr>';
    text += '<tr><td>Customer</td><td class=right>'+obj['customer']+'</td></tr>';
    text += '<tr><td>Total Items</td><td class=right>'+obj['count']+'</td></tr>';
    text += '<tr><td>Total Amount</td><td class=right>$'+obj['total']+'</td></tr>';
    text += '</table>';

    text += '<br><hr>';

    text += '<table><tr>';
    text += '<td><a href=index.html>MENU</a></td>';
    text += '<td><a href=order.html>ORDER</a></td>';
    text += '<td><a href=record.html>RECORD</a></td>';
    text += '<td><a target="_blank" href=print.html#result?id='+id+'>PRINT</a></td>';
    text += '</tr></table>';

    $('#OrderResult').html(text);

    $('#CustomerResult').hide();
    $('#OrderEntry').hide();
    $('#OrderEdit').hide();
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
