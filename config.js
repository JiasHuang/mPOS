
function SaveConfig() {
    localStorage.setItem(coName, document.getElementById('ConfigName').value);
    localStorage.setItem(coPhone, document.getElementById('ConfigPhone').value);
    localStorage.setItem(coAddr, document.getElementById('ConfigAddr').value);
    ShowConfig();
}

function EditConfig() {

    var name = localStorage.getItem(coName);
    var phone = localStorage.getItem(coPhone);
    var addr = localStorage.getItem(coAddr);

    var text = '';
    text += '<table>';
    text += '<tr><th>My Name</th><td><input type=text id=ConfigName \></td></tr>'
    text += '<tr><th>My Phone</th><td><input type=text id=ConfigPhone \></td></tr>'
    text += '<tr><th>My Addr</th><td><input type=text id=ConfigAddr \></td></tr>'
    text += '</table>';

    document.getElementById('ConfigResult').innerHTML=text;
    document.getElementById('ConfigName').value=name;
    document.getElementById('ConfigPhone').value=phone;
    document.getElementById('ConfigAddr').value=addr;
    $('#ConfigEntry').hide();
    $('#ConfigEdit').show();
}

function ShowConfig() {

    var name = localStorage.getItem(coName);
    var phone = localStorage.getItem(coPhone);
    var addr = localStorage.getItem(coAddr);

    if (!name)
        name = 'Please Edit Your Name'
    if (!phone)
        phone = 'Please Edit Your Phone Number'
    if (!addr)
        addr = 'Please Edit Your Addr'

    var text = '<table>';
    text += '<tr><th>My Name</th><td>'+name+'</td></tr>';
    text += '<tr><th>My Phone</th><td>'+phone+'</td></tr>';
    text += '<tr><th>My Addr</th><td>'+addr+'</td></tr>';
    text += '</table>';

    document.getElementById('ConfigResult').innerHTML=text;
    $('#ConfigEntry').show();
    $('#ConfigEdit').hide();
}

