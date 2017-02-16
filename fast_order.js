
var fastOrderName = [];
var fastOrderPrice = [];
var fastOrderQty = [];

function updateTotal() {
    var total_item = 0;
    var total_amount = 0;
    for (var i = 0; i < fastOrderName.length; i++) {
        if (fastOrderQty[i] != 0) {
            total_item++;
            total_amount += float_m(fastOrderPrice[i], fastOrderQty[i]);
        }
    }
    $('#FastOrderTotalItem').html(total_item);
    $('#FastOrderTotalAmount').html(total_amount);
}

function update(i, price, qty) {
    var element = '#_'+i;
    var index = parseInt(i);
    $(element+'_price').html(price);
    $(element+'_qty').html(qty);
    fastOrderPrice[index] = price;
    fastOrderQty[index] = qty;
}

function OnEventSave(i) {
    var element = '#_'+i;
    var price = $('#EditPrice').text()
    var qty = $('#EditQty').text()
    update(i, price, qty);
    updateTotal();
    $('#FastOrderEdit').hide();
}

function OnEventCancel() {
    $('#FastOrderEdit').hide();
}

function EditPriceQty(i) {
    var element = '#_'+i;
    var name = $(element+'_name').text()
    var price = $(element+'_price').text()
    var qty = $(element+'_qty').text()
    var head = '<table id=numpad><tr><td>'+name+'</td></tr></table>';
    var tail = '<table id=numpad><tr><td onclick=OnEventCancel()>CANCEL</td><td onclick=OnEventSave('+i+')>SAVE</td></tr></table>';
    var text = numpad({'price':'EditPrice', 'qty':'EditQty', 'head':head, 'tail':tail, 'mode':'1', 'defPrice':price, 'defQty':qty});
    $(element).addClass('selected').siblings().removeClass('selected');
    $('#FastOrderEdit').html(text);
    $('#FastOrderEdit').show();
}

function LoadItemPrice() {
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_item) != 0)
            continue;
        var name = localStorage.key(i);
        var price = localStorage.getItem(name)
        fastOrderName[fastOrderName.length] = name.substring(prefix_item.length);
        fastOrderPrice[fastOrderPrice.length] = price;
        fastOrderQty[fastOrderQty.length] = '0';
    }
}

function ShowOrder() {
    var text = '<table><tr><th>Item</th><th>Price</th><th>Qty</th></tr>';
    for (var i = 0; i < fastOrderName.length; i++) {
        text += '<tr id=_'+i+' onclick=EditPriceQty('+i+')>';
        text += '<td id=_'+i+'_name>'+fastOrderName[i]+'</td>';
        text += '<td id=_'+i+'_price>'+fastOrderPrice[i]+'</td>';
        text += '<td id=_'+i+'_qty>'+fastOrderQty[i]+'</td>';
        text += '</tr>';
    }
    text += '</table>';
    $('#FastOrderMainResult').html(text);
}

function ShowCustomer(targetID) {
    var select = '<select id=FastOrderCustomer>';
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_customer) != 0)
            continue;
        var name = localStorage.key(i).substring(prefix_customer.length);
        select += '<option value=\"'+name+'\">'+name+'</option>';
    }
    select += '</select>';
    var text = '<table><tr><th>Customer</th><th>Item</th><th>Amount</th></tr>';
    text += '<tr><td>'+select+'</td><td id=FastOrderTotalItem>0</td><td id=FastOrderTotalAmount>0</td></tr>';
    text += '</table>';
    $('#FastOrderMainCustomer').html(text);
}

function GenRecordObj() {

    var obj = new Object;
    var order = new Object;
    var total = 0;
    var count = 0;

    for (var i = 0; i < fastOrderName.length; i++) {
        if (fastOrderQty[i] != 0) {
            order[fastOrderName[i]] = fastOrderPrice[i] + separator + fastOrderQty[i];
            count += 1;
            total += float_m(fastOrderPrice[i], fastOrderQty[i]);
        }
    }

    obj['customer'] = $('#FastOrderCustomer').val();
    obj['date'] = getDateFormat();
    obj['count'] = count;
    obj['total'] = total;
    obj['order'] = order;
    obj['ship'] = 'no';
    obj['paid'] = 'no';

    return obj;
}

function SaveOrder_pass3(id) {

    var obj = GenRecordObj();

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
    text += '<td><a href=fast_order.html>ORDER</a></td>';
    text += '<td><a href=record.html>RECORD</a></td>';
    text += '<td><a target="_blank" href=print.html#result?id='+id+'>PRINT</a></td>';
    text += '</tr></table>';

    document.getElementById('FastOrderResult').innerHTML = text;

    $('#FastOrderMain').hide();
    $('#FastOrderMenuBar').hide();
}

function SaveOrder_pass2() {
    AddRecord(GenRecordObj(), SaveOrder_pass3);
}

function SaveFastOrder() {
    InitRecordDB(SaveOrder_pass2);
}

function LoadFastOrder() {
    LoadItemPrice();
    ShowCustomer();
    ShowOrder();
}
