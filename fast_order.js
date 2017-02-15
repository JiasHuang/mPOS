
var fastOrderName = [];
var fastOrderPrice = [];
var fastOrderQty = [];
var fastOrderCustomer = '';

function updateTotal() {
    var total_item = 0;
    var total_amount = 0;
    for (var i = 0; i < fastOrderName.length; i++) {
        if (fastOrderQty[i] != 0) {
            total_item++;
            total_amount += float_m(fastOrderPrice[i], fastOrderQty[i]);
        }
    }
    var text = '';
    text += '<table>'
    text += '<tr><th>Total Item</th><td width="50%">'+total_item+'</td></tr>'
    text += '<tr><th>Total Amount</th><td width="50%">'+total_amount+'</td></tr>'
    text += '</table>'
    document.getElementById('FastOrderTotal').innerHTML = text;
}

function OnEvent(i) {
    var element = '#_'+i;
    var idx = parseInt(i);
    fastOrderPrice[idx] = $(element+'_price').text();
    fastOrderQty[idx] = $(element+'_qty').text();
    updateTotal();
}

function SelectOrder(i) {
    var element = '#_'+i;
    var prefix = '_'+i;
    $(element).addClass('selected').siblings().removeClass('selected');
    numpad_setCallback(OnEvent, i);
    var text = numpad({'price': prefix+'_price', 'qty': prefix+'_qty'});
    document.getElementById('FastOrderNumPad').innerHTML = text;
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
    var text = '';
    text += '<br><table>';
    text += '<tr><th>Item</th><th>Price</th><th>Qty</th></tr>';
    for (var i = 0; i < fastOrderName.length; i++) {
        text += '<tr id=_'+i+' onclick=SelectOrder('+i+')>';
        text += '<td id=_'+i+'_name>'+fastOrderName[i]+'</td>';
        text += '<td id=_'+i+'_price>'+fastOrderPrice[i]+'</td>';
        text += '<td id=_'+i+'_qty>'+fastOrderQty[i]+'</td>';
        text += '</tr>';
    }
    text += '</table>';
    document.getElementById('OrderResult').innerHTML=text;
}

function LoadCustomer() {
    fastOrderCustomer = document.getElementById('FastOrderCustomer').value;
}

function ShowCustomer() {

    var select = '';
    select += '<select id=FastOrderCustomer onChange=\'LoadCustomer()\'>';
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_customer) != 0)
            continue;
        var name = localStorage.key(i).substring(prefix_customer.length);
        select += '<option value=\"'+name+'\">'+name+'</option>';
        if (fastOrderCustomer == '') {
            fastOrderCustomer = name;
        }
    }
    select += '</select>';

    var text = '';
    text += '<table>';
    text += '<tr><td>Customer: '+select+'</td></tr>';
    text += '</table>';

    document.getElementById('CustomerResult').innerHTML=text;
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

    obj['customer'] = fastOrderCustomer;
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
