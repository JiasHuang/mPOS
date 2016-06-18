
function AddCustomer() {
    var name = document.getElementById('CustomerName').value;
    var phone = document.getElementById('CustomerPhone').value;
    if (name != '' && phone != '') {
        localStorage.setItem(prefix_customer+name, phone);
        ShowCustomer();
    }
}

function DelCustomer() {
    var name = document.getElementById('CustomerName').value;
    localStorage.removeItem(prefix_customer+name);
    ShowCustomer();
}

function SaveCustomer() {

    var oldname = document.getElementById('CustomerName').value;
    var newname = document.getElementById('NewCustomerName').value;
    if (oldname != '' && newname != '' && oldname != newname) {
        localStorage.removeItem(prefix_customer+oldname);
    }

   document.getElementById('CustomerName').value = document.getElementById('NewCustomerName').value;
   document.getElementById('CustomerPhone').value = document.getElementById('NewCustomerPhone').value;
   AddCustomer();
}

function EditCustomer() {
    var name = document.getElementById('CustomerName').value;
    var phone = document.getElementById('CustomerPhone').value;
    var text = '<table>';
    text += '<tr><th>Customer Name</th><td><input type=text id=NewCustomerName \></td></tr>'
    text += '<tr><th>Customer Phone</th><td><input type=text id=NewCustomerPhone \></td></tr>'
    text += '</table>';
    document.getElementById('CustomerResult').innerHTML=text;
    document.getElementById('NewCustomerName').value=name;
    document.getElementById('NewCustomerPhone').value=phone;
    $('#CustomerEntry').hide();
    $('#CustomerEdit').show();
}

function NewCustomer() {
    document.getElementById('CustomerName').value = '';
    document.getElementById('CustomerPhone').value = '';
    EditCustomer();
}

function SelectCustomer(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var phone = $(element).find('td:nth-child(2)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    document.getElementById('CustomerName').value = name;
    document.getElementById('CustomerPhone').value = phone; 
}

function ShowCustomer() {

    var text = '';
    text += '<table>';
    text += '<tr><th>Customer Name</th><th>Customer Phone</th></tr>';
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_customer) != 0)
            continue;
        var name = localStorage.key(i);
        var phone = localStorage.getItem(name);
        text += '<tr onclick=SelectCustomer(this)>';
        text += '<td>'+name.substring(prefix_customer.length)+'</td>';
        text += '<td>'+phone+'</td>';
        text += '</tr>';
    }
    text += '</table>';

    document.getElementById('CustomerResult').innerHTML=text;
    $('#CustomerEntry').show();
    $('#CustomerEdit').hide();
}

