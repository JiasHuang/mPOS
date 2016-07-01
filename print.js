
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
	var cnt = (width - str.length) / 2;
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
    text += ' Item: '+ obj['count'] +' Total: '+ obj['total'];
    text += '</div>'

	data = '$small$';
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
        var price = value[0];
        var qty = value[1];
        var amount = float_m(price, qty);
		data += name + Right('$' + price + ' x ' + qty + ' = $' + amount, defw-name.length) + LineEnd();
	}
    data += LineCut();

	data += LineEnd();
	data += Right('Total Items: '+ obj['count'], defw) + LineEnd();
	data += Right('Total Amount: $'+ obj['total'], defw) + LineEnd();
    data += LineCut();

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

