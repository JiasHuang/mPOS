
function AddSelectedItem() {
    var name = document.getElementById('ItemName').value;
    var price = document.getElementById('ItemPrice').value;
    if (name != '' && price != '' && !isNaN(price)) {
        localStorage.setItem(prefix_item+name, price);
        ShowItem();
    }
}

function DelItem() {
    var name = document.getElementById('ItemName').value;
    localStorage.removeItem(prefix_item+name);
    ShowItem();
}

function SaveItem() {

    var oldname = document.getElementById('ItemName').value;
    var newname = document.getElementById('NewItemName').value;
    if (oldname != '' && newname != '' && oldname != newname) {
        localStorage.removeItem(prefix_item+oldname);
    }

   document.getElementById('ItemName').value = document.getElementById('NewItemName').value;
   document.getElementById('ItemPrice').value = document.getElementById('NewItemPrice').value;
   AddSelectedItem();
}

function EditItem(selected) {

    if (selected != true) {
        document.getElementById('ItemName').value = '';
        document.getElementById('ItemPrice').value = '';
    }

    var text = '';
    text += '<table>';
    text += '<tr><th>Name</th><td><input type=text id=NewItemName \></td></tr>'
    text += '<tr><th>Price</th><td><input type=text id=NewItemPrice \></td></tr>'
    text += '</table>';

    document.getElementById('ItemResult').innerHTML=text;
    document.getElementById('NewItemName').value = document.getElementById('ItemName').value;
    document.getElementById('NewItemPrice').value = document.getElementById('ItemPrice').value;

    $('#ItemEntry').hide();
    $('#ItemEdit').show();
}

function SelectItem(element) {
    var name = $(element).find('td:first')[0].innerHTML;
    var price = $(element).find('td:nth-child(2)')[0].innerHTML;
    $(element).addClass('selected').siblings().removeClass('selected');
    document.getElementById('ItemName').value = name;
    document.getElementById('ItemPrice').value = price; 
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

