
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

function switchHighLight(hl, nh) {
    document.getElementById(hl).style.backgroundColor = "#999999";
    document.getElementById(hl).style.color = "#ffff00";
    document.getElementById(nh).style.backgroundColor = "#666666";
    document.getElementById(nh).style.color = "#ffffff";
}

function switchToPrice(id) {
    ref = id;
    cnt = 0;
    switchHighLight('numpad_price', 'numpad_qty');
}

function switchToQty(id) {
    ref = id;
    cnt = 0;
    switchHighLight('numpad_qty', 'numpad_price');
}

function numpad_init(obj) {

    var price = null;
    var qty = null;
    var switch_text = '';

    cnt = 0;

    if (obj.hasOwnProperty('price')) {
        price = obj['price'];
    }
    if (obj.hasOwnProperty('qty')) {
        qty = obj['qty'];
    }

    if (price && qty) {
        switch_text += '<table id=numpad cellpadding=5 cellspacing=3>'
        switch_text += '<tr>'
        switch_text += '<td id=numpad_price onclick=switchToPrice("'+price+'")>Price</td>'
        switch_text += '<td id=numpad_qty class=hl onclick=switchToQty("'+qty+'")>Qty</td>'
        switch_text += '</tr>'
        switch_text += '</table>'
        ref = qty;
    } else if (price) {
        ref = price;
    } else if (qty) {
        ref = qty;
    }

    return switch_text;
}

function numpad(obj) {

    var switch_text = numpad_init(obj);

    text = '<br>'
    text += switch_text;
    text += '<table id=numpad cellpadding=5 cellspacing=3>'
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


