
var defw = 32;

function Right(str, width) {
    var line = str;
    var cnt = width - str.length;
    for (var i=0; i<cnt; i++)
        line = ' ' + line;
    return line;
}

function Left(str, width) {
    var line = str;
    var cnt = width - str.length;
    for (var i=0; i<cnt; i++)
        line = line + ' ';
    return line;
}

function Center(str, width) {
    var line = str;
    var cnt = (width - str.length) >> 1;
    for (var i=0; i<cnt; i++)
        line = ' ' + line;
    for (var i=0; i<cnt; i++)
        line = line + ' ';
    return line;
}

function LineEnd() {
    return '$intro$';
}

function LineCut() {
    var line = '';
    for (var i=0; i<defw; i++)
        line = line + '-';
    return line+'$intro$';
}

function FontSize() {
    return '$small$';
}

function AlignDetail(name, price, qty, amount, width) {
    if (name.length <= 16 && price.length <= 4 && qty.length <=4 && amount.length <= 5)
        return Left(name, 16) + '$' + Right(price, 4) + 'x' + Right(qty, 4) + '=' + Right(amount, 5) + LineEnd(); 
    return name + Right(' $ ' + price + ' x ' + qty + ' = ' + amount, defw-name.length) + LineEnd();
}

function ShowPrint_ProcObj(obj) {

    if (obj == null) {
        console.log('ShowPrint_ProcObj: invalid obj');
        return;
    }

    var myName = localStorage.getItem(coName);
    var myPhone = localStorage.getItem(coPhone);
    var myAddr = localStorage.getItem(coAddr);

    var text = '';

    text += '<div class=company>';
    text += '<br>' + myName;
    text += '<br>TEL : ' + myPhone;
    text += '<br>ADDR : ' + myAddr;
    text += '</div>';

    text += '<div class=customer>';
    text += '<br>RecordID : ' + obj['id'];
    text += '<br>Ordered by : ' + obj['customer'];
    text += '<br>Date : ' + date2text(obj['date']);
    text += '</div>';

    text += '<br>Detail<hr>';

    text += '<div>';
    text += '<table class=detail>';
    text += '<tr>';
    text += '<td>Item</td>';
    text += '<td class=num>Price</td>';
    text += '<td class=num>Qty</td>';
    text += '<td class=amount>Amount</td>';
    text += '</tr>'

    var order = obj['order'];

    for (key in order) {
        var name = key;
        var value = order[key].split(separator);
        var price = value[0];
        var qty = value[1];
        var amount = float_m(price, qty);
        text += '<tr>';
        text += '<td>'+name+'</td>';
        text += '<td class=num>'+price+'</td>';
        text += '<td class=num>'+qty+'</td>';
        text += '<td class=amount>'+amount+'</td>';
        text += '</tr>';
    }

    text += '</table>';
    text += '</div>';

    text += '<br>';
    text += '<div class=total>';
    text += ' Item: ' + obj['count'] + ' Total: ' + obj['total'];
    text += '</div>'

    data = '';
    data += FontSize();
    data += LineEnd();
    data += LineEnd();
    data += Center(myName, defw) + LineEnd();
    data += Center('TEL: '+myPhone, defw) + LineEnd();
    data += Center('ADDR: '+myAddr, defw) + LineEnd();
    data += LineEnd();

    data += Left('ID: '+obj['id']) + LineEnd();
    data += Left('Customer: '+obj['customer']) + LineEnd();
    data += Left('Date: '+date2text(obj['date'])) + LineEnd();
    data += LineEnd();

    data += 'Detail:' + LineEnd();
    data += LineCut();
    for (key in order) {
        var name = key;
        var value = order[key].split(separator);
        var price = parseFloat(value[0]);
        var qty = parseFloat(value[1]);
        var amount = float_m(price, qty);
        data += AlignDetail(name, price.toFixed(1).toString(), qty.toFixed(1).toString(), amount.toFixed(1).toString(), defw);
    }
    data += LineCut();

    data += Right(' Item: ' + obj['count'] + ' Total: $' + obj['total'], defw) + LineEnd();
    data += LineEnd();
    data += LineEnd();
    data += LineEnd();
    data += LineEnd();
    data += LineEnd();

    text += '<hr><a href="com.fidelier.printfromweb://'+data+'">Android POS Print Driver</a><hr>';

    document.getElementById('PrintResult').innerHTML=text;
}

function ShowPrint_GetObj() {
    var id = getURLParameter('id');
    GetRecord(parseInt(id, 10), ShowPrint_ProcObj);
}

function ShowPrint() {
    InitRecordDB(ShowPrint_GetObj);
}

function PrintObjByID(id) {
    window.open('print.html#result?id='+id, '_blank');
}

