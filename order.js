
const separator = 'x';
const prefix_item = 'it_'
const prefix_customer = 'co_'
const prefix_order = 'or_'

function AddOrder() {
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

function SaveOrder() {
   document.getElementById('OrderName').value = document.getElementById('NewOrderName').value;
   document.getElementById('OrderPrice').value = document.getElementById('NewOrderPrice').value;
   document.getElementById('OrderQty').value = document.getElementById('NewOrderQty').value;
   AddOrder();
}

function EditOrder() {

    var text = '';
    text += '<table>';
    text += '<tr><th>Item</th><td><input type=text id=NewOrderName \></td></tr>'
    text += '<tr><th>Each</th><td><input type=text id=NewOrderPrice \></td></tr>'
    text += '<tr><th>Qty</th><td><input type=text id=NewOrderQty \></td></tr>'
    text += '</table>';

    document.getElementById('OrderResult').innerHTML=text;
    document.getElementById('NewOrderName').value=document.getElementById('OrderName').value;
    document.getElementById('NewOrderPrice').value=document.getElementById('OrderPrice').value;
    document.getElementById('NewOrderQty').value=document.getElementById('OrderQty').value;
    $('#CustomerResult').hide();
    $('#OrderEntry').hide();
    $('#OrderEdit').show();
}

function LoadPrice() {
    var name = document.getElementById('NewOrderName').value;
    document.getElementById('NewOrderPrice').value = localStorage.getItem(prefix_item+name);
}

function NewOrder() {

    var select = '';
    select += '<select id=NewOrderName onChange=\'LoadPrice()\'>'
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).startsWith(prefix_item) != true)
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
    document.getElementById('NewOrderName').value='';
    document.getElementById('NewOrderPrice').value='';
    document.getElementById('NewOrderQty').value='1';
    
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
    text += '<thread><tr><th>Name</th><th>Price</th><th>Qty</th><th>Amount</th></tr></thread>';
    text += '<tbody>';
    for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i).startsWith(prefix_order) != true)
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
        text += '<td>'+amount+'</td>';
        text += '</tr>';

        total += amount;
        count += 1;
    }
    text += '</tbody>';
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
        if (localStorage.key(i).startsWith(prefix_customer) != true)
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

function ShowAll() {
    ShowCustomer();
    ShowOrder();
}

