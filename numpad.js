
var ref = '';
var cnt = 0;

function addCode(key) {

    if (cnt === 0) {
        num = '';
        cnt++;
    } else {
        num = document.getElementById(ref).value;
    }

    if (key == '.' && num.length == 0) {
        num = '0.'
    } else {
	    num = num + key;
    }

    document.getElementById(ref).value = num;
}

function resetCode() {
    document.getElementById(ref).value = ''
}

function numpad(id) {

    ref = id;
    cnt = 0;

    text = '<br>'
    text += '<table class=numpad_table id=numpad cellpadding=5 cellspacing=3>'
    text += '<tr>'
    text += '<td onclick=addCode(7)>7</td>'
    text += '<td onclick=addCode(8)>8</td>'
    text += '<td onclick=addCode(9)>9</td>'
    text += '</tr>'
    text += '<tr>'
    text += '<td onclick=addCode(4)>4</td>'
    text += '<td onclick=addCode(5)>5</td>'
    text += '<td onclick=addCode(6)>6</td>'
    text += '</tr>'
    text += '<tr>'
    text += '<td onclick=addCode(1)>1</td>'
    text += '<td onclick=addCode(2)>2</td>'
    text += '<td onclick=addCode(3)>3</td>'
    text += '</tr>'
    text += '<tr>'
    text += '<td onclick=resetCode()>C</td>'
    text += '<td onclick=addCode(0)>0</td>'
    text += '<td onclick=addCode(".")>.</td>'
    text += '</tr>'
    text += '</table>'

    return text
}

function switchID(id) {
    ref = id;
    cnt = 0;
}

