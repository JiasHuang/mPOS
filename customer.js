
var selectedCustomerName = '';
var selectedCustomerPhone = '';

function AddSelectedCustomer() {

    if (selectedCustomerName == '' || selectedCustomerPhone == '') {
        console.log('AddCustomer Error');
        return;
    }

    localStorage.setItem(prefix_customer+selectedCustomerName, selectedCustomerPhone);
    ShowCustomer();
}

function DelCustomer() {
    var result = confirm("Want to delete?");
    if (result) {
        localStorage.removeItem(prefix_customer+selectedCustomerName);
        ShowCustomer();
    }
}

function SaveCustomer() {

    var newname = document.getElementById('NewCustomerName').value;
    var newphone = document.getElementById('NewCustomerPhone').value;

    if (selectedCustomerName != '' && selectedCustomerName != newname) {
        localStorage.removeItem(prefix_customer+selectedCustomerName);
    }

    selectedCustomerName = document.getElementById('NewCustomerName').value;
    selectedCustomerPhone = document.getElementById('NewCustomerPhone').value;
    AddSelectedCustomer();
}

function EditCustomer(selected) {

    if (selected != true) {
        selectedCustomerName = '';
        selectedCustomerPhone = '';
    }

    var text = '<table>';
    text += '<tr><th>Customer Name</th><td><input type=text id=NewCustomerName \></td></tr>'
    text += '<tr><th>Customer Phone</th><td><input type=text id=NewCustomerPhone \></td></tr>'
    text += '</table>';
    document.getElementById('CustomerResult').innerHTML = text;
    document.getElementById('NewCustomerName').value = selectedCustomerName;
    document.getElementById('NewCustomerPhone').value = selectedCustomerPhone;
    $('#CustomerEntry').hide();
    $('#CustomerEdit').show();
}

function SelectCustomer(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var phone = $(element).find('td:nth-child(2)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    selectedCustomerName = name;
    selectedCustomerPhone = phone;
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

