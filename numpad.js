
var ref = '';
var cnt = 0;
var mode = '';

function addCode(key) {

    var element = $('#'+ref);
    var tagName = element.prop("tagName");

    if (cnt === 0) {
        num = '';
        cnt++;
    } else {
        if (tagName == 'INPUT') {
            num = element.val();
        } else {
            num = element.text();
        }
    }

    if (key == '.' && num.length == 0) {
        num = '0.';
    } else if (key != '.' && num == '0') {
        num = key;
    } else {
	    num = num + key;
    }

    if (tagName == 'INPUT') {
        element.val(num);
    } else {
        element.html(num);
    }
}

function resetCode() {
    var element = $('#'+ref);
    var tagName = element.prop("tagName");
    if (tagName == 'INPUT') {
        element.val(0);
    } else {
        element.html(0);
    }
}

function switchTo(element) {
    var tagName = $(element).prop("tagName");
    if (tagName == 'TR') {
        ref = $(element).find('td:nth-child(2)')[0].id;
        $(element).children().addClass("hl");
        $(element).siblings().children().removeClass("hl");
    } else if (tagName == 'TD') {
        ref = $(element).attr("alt");
        $(element).addClass("hl");
        $(element).siblings().removeClass("hl");
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
    if (obj.hasOwnProperty('mode')) {
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
            switch_text += '<td alt='+price+' onclick=switchTo(this)>Price</td>'
            switch_text += '<td alt='+qty+' onclick=switchTo(this) class=hl>Qty</td>'
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

    return text
}


