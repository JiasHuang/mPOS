
function SaveConfig() {
    localStorage.setItem(coName, $('#ConfigName').val());
    localStorage.setItem(coPhone, $('#ConfigPhone').val());
    localStorage.setItem(coAddr, $('#ConfigAddr').val());
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

    $('#ConfigResult').html(text);
    $('#ConfigName').val(name);
    $('#ConfigPhone').val(phone);
    $('#ConfigAddr').val(addr);
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

    $('#ConfigResult').html(text);
    $('#ConfigEntry').show();
    $('#ConfigEdit').hide();
}

