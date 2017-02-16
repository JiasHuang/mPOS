
var ref = '';
var cnt = 0;
var head = '';
var tail = '';
var mode = '';

function addCode(key) {

    element = document.getElementById(ref)

    if (cnt === 0) {
        num = '';
        cnt++;
    } else {
        if (element.tagName == 'INPUT') {
            num = element.value;
        } else {
            num = element.innerHTML;
        }
    }

    if (key == '.' && num.length == 0) {
        num = '0.';
    } else if (key != '.' && num == '0') {
        num = key;
    } else {
	    num = num + key;
    }

    if (element.tagName == 'INPUT') {
        element.value = num;
    } else {
        element.innerHTML = num;
    }
}

function resetCode() {
    element = document.getElementById(ref)
    if (element.tagName == 'INPUT') {
        element.value = '0'
    } else {
        element.innerHTML = '0';
    }
}

function switchTo(element) {
    var tagName = $(element).prop("tagName");
    if (tagName == 'TR'){
        ref = $(element).find('td:nth-child(2)')[0].id;
        $(element).children().css("background-color", "#999999");
        $(element).children().css("color", "#ffff00");
        $(element).siblings().children().css("background-color", "#666666");
        $(element).siblings().children().css("color", "#ffffff");
    }
    else if (tagName == 'TD'){
        ref = $(element).id;
        $(element).css("background-color", "#999999");
        $(element).css("color", "#ffff00");
        $(element).siblings().css("background-color", "#666666");
        $(element).siblings().css("color", "#ffffff");
    }
    cnt = 0;
}

function numpad_init(obj) {

    var price = null;
    var qty = null;
    var switch_text = '';
    var defPrice = 0;
    var defQty = 0;

    cnt = 0;

    if (obj.hasOwnProperty('price')) {
        price = obj['price'];
    }
    if (obj.hasOwnProperty('qty')) {
        qty = obj['qty'];
    }
    if (obj.hasOwnProperty('head')) {
        head = obj['head'];
    }
    if (obj.hasOwnProperty('tail')) {
        tail = obj['tail'];
    }
    if (obj.hasOwnProperty('tail')) {
        mode = obj['mode'];
    }
    if (obj.hasOwnProperty('defPrice')) {
        defPrice = obj['defPrice'];
    }
    if (obj.hasOwnProperty('defQty')) {
        defQty = obj['defQty'];
    }

    if (price && qty) {
        if (mode == 1) {
            switch_text += '<table id=numpad>'
            switch_text += '<tr onclick=switchTo(this)>'
            switch_text += '<td>Price</td><td id='+price+'>'+defPrice+'</td>'
            switch_text += '</tr>'
            switch_text += '<tr onclick=switchTo(this)>'
            switch_text += '<td class=hl>Qty</td><td class=hl id='+qty+'>'+defQty+'</td>'
            switch_text += '</tr>'
            switch_text += '</table>'
        } else {
            switch_text += '<table id=numpad>'
            switch_text += '<tr>'
            switch_text += '<td onclick=switchTo(this)>Price</td>'
            switch_text += '<td onclick=switchTo(this) class=hl>Qty</td>'
            switch_text += '</tr>'
            switch_text += '</table>'
        }
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
    var text = '';

    text += head;
    text += switch_text;
    text += '<table id=numpad>'
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
    text += tail;

    return text
}


