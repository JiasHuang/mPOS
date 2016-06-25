
function ShowPrint_ProcObj(obj) {

    if (obj == null) {
        console.log('ShowPrint_pass2: invalid obj');
        return;
    }

    var text = '';

    text += '<div class=company>';
    text += '<br>' + localStorage.getItem(coName);
    text += '<br>TEL : ' + localStorage.getItem(coPhone);
    text += '<br>ADDR : ' + localStorage.getItem(coAddr);
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

