
var selectedItemName = '';
var selectedItemPrice = '';

function AddItem(name, price) {

    if (name == '' || price == '' || isNaN(price)) {
        console.log('AddItem Error');
        return;
    }

    localStorage.setItem(prefix_item+name, price);
    ShowItem();
}

function DelItem() {
    var result = confirm("Want to delete?");
    if (result) {
        localStorage.removeItem(prefix_item+selectedItemName);
        ShowItem();
    }
}

function SaveItem() {

    var name = document.getElementById('NewItemName').value;
    var price = document.getElementById('NewItemPrice').value;

    if (selectedItemName != '' && selectedItemName != name) {
        localStorage.removeItem(prefix_item+selectedItemName);
    }

    selectedItemName = name;
    selectedItemPrice = price;

    AddItem(name, price);
}

function EditItem(selected) {

    if (selected != true) {
        selectedItemName = '';
        selectedItemPrice = '';
    }

    var text = '';
    text += '<table>';
    text += '<tr><th>Item Name</th><td><input type=text id=NewItemName \></td></tr>'
    text += '<tr><th>Item Price</th><td><input type=text id=NewItemPrice \></td></tr>'
    text += '</table>';
    text += numpad({'price':'NewItemPrice'});

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
    text += '<tr><th>Item Name</th><th>Item Price</th></tr>';
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

