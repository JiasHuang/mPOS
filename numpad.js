
function addCode(id, key) {

    num = document.getElementById(id).value;
    if (key == '.' && num.length == 0) {
        num = '0.'
    } else {
	    num = num + key;
    }

    document.getElementById(id).value = num;
}

function resetCode(id) {
    document.getElementById(id).value = ''
}

function setAct(key) {

    act = key;

    if (key == "pause" && num != "") {
        act = "percent"
    }
    else if (key == "forward" && num == "") {
        num = "150";
    }
    else if (key == "backward" && num == "") {
        num = "150";
    }
    else if (key == "forward" && num == "#") {
        act = "playlist-next";
        num = "";
    }
    else if (key == "backward" && num == "#") {
        act = "playlist-prev";
        num = "";
    }
    else if (key == "forward" && num == "*") {
        act = "sub-next";
        num = "";
    }
    else if (key == "backward" && num == "*") {
        act = "sub-prev";
        num = "";
    }
    else if (key == "stop" && num == "*") {
        act = "sub-remove";
        num = "";
    }

    document.forms[0].a.value = act;
    document.forms[0].n.value = num;
}

function numpad(id) {

    text = ''
    text += '<table class=numpad_table id=numpad cellpadding=5 cellspacing=3>'
    text += '<tr>'
    text += '<td onclick=addCode("'+id+'",7)>7</td>'
    text += '<td onclick=addCode("'+id+'",8)>8</td>'
    text += '<td onclick=addCode("'+id+'",9)>9</td>'
    text += '</tr>'
    text += '<tr>'
    text += '<td onclick=addCode("'+id+'",4)>4</td>'
    text += '<td onclick=addCode("'+id+'",5)>5</td>'
    text += '<td onclick=addCode("'+id+'",6)>6</td>'
    text += '</tr>'
    text += '<tr>'
    text += '<td onclick=addCode("'+id+'",1)>1</td>'
    text += '<td onclick=addCode("'+id+'",2)>2</td>'
    text += '<td onclick=addCode("'+id+'",3)>3</td>'
    text += '</tr>'
    text += '<tr>'
    text += '<td onclick=resetCode("'+id+'")>Clear</td>'
    text += '<td onclick=addCode("'+id+'",0)>0</td>'
    text += '<td onclick=addCode("'+id+'",".")>.</td>'
    text += '</tr>'
    text += '</table>'

    return text
}

