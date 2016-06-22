
var selectedItemName = '';
var selectedItemPrice = '';

function AddSelectedItem() {

    if (selectedItemName == '' || selectedItemPrice == '' || isNaN(selectedItemPrice)) {
        console.log('AddSelectedItem Error');
        return;
    }

    localStorage.setItem(prefix_item+name, price);
    ShowItem();
}

function DelItem() {
    localStorage.removeItem(prefix_item+selectedItemName);
    ShowItem();
}

function SaveItem() {

    var newname = document.getElementById('NewItemName').value;
    var newprice = document.getElementById('NewItemPrice').value;

    if (selectedItemName != '' && selectedItemName != newname) {
        localStorage.removeItem(prefix_item+selectedItemName);
    }

    selectedItemName = document.getElementById('NewItemName').value;
    selectedItemPrice = document.getElementById('NewItemPrice').value;
    AddSelectedItem();
}

function EditItem(selected) {

    if (selected != true) {
        selectedItemName = '';
        selectedItemPrice = '';
    }

    var text = '';
    text += '<table>';
    text += '<tr><th>Name</th><td><input type=text id=NewItemName \></td></tr>'
    text += '<tr><th>Price</th><td><input type=text id=NewItemPrice \></td></tr>'
    text += '</table>';

    document.getElementById('ItemResult').innerHTML=text;
    document.getElementById('NewItemName').value = selectedItemName;
    document.getElementById('NewItemPrice').value = selectedItemPrice;

    $('#ItemEntry').hide();
    $('#ItemEdit').show();
}

function SelectItem(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var price = $(element).find('td:nth-child(2)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    selectedItemName = name;
    selectedItemPrice = price; 
}

function ShowItem() {

    var text = '';
    text += '<table>';
    text += '<tr><th>Name</th><th>Price</th></tr>';
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).indexOf(prefix_item) != 0)
            continue;
        var name = localStorage.key(i);
        var price = localStorage.getItem(name);
        text += '<tr onclick=SelectItem(this)>';
        text += '<td>'+name.substring(prefix_item.length)+'</td>';
        text += '<td>'+price+'</td>';
        text += '</tr>';
    }
    text = text + '</table>';

    document.getElementById('ItemResult').innerHTML=text;
    $('#ItemEntry').show();
    $('#ItemEdit').hide();
}

