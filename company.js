
const coName = 'coName';
const coPhone = 'coPhone';

function SaveCompany() {
    localStorage.setItem(coName, document.getElementById('CompanyName').value);
    localStorage.setItem(coPhone, document.getElementById('CompanyPhone').value);
    ShowCompany();
}

function EditCompany() {

    var name = localStorage.getItem(coName);
    var phone = localStorage.getItem(coPhone);

    var text = '';
    text += '<table>';
    text += '<tr><th>Name</th><td><input type=text id=CompanyName \></td></tr>'
    text += '<tr><th>Phone</th><td><input type=text id=CompanyPhone \></td></tr>'
    text += '</table>';

    document.getElementById('CompanyResult').innerHTML=text;
    document.getElementById('CompanyName').value=name;
    document.getElementById('CompanyPhone').value=phone;
    $('#CompanyEntry').hide();
    $('#CompanyEdit').show();
}

function ShowCompany() {

    var name = localStorage.getItem(coName);
    var phone = localStorage.getItem(coPhone);

    var text = '<table>';
    text += '<tr><th>Name</th><td>'+name+'</td></tr>';
    text += '<tr><th>Phone</th><td>'+phone+'</td></tr>';
    text += '</table>';

    document.getElementById('CompanyResult').innerHTML=text;
    $('#CompanyEntry').show();
    $('#CompanyEdit').hide();
}

