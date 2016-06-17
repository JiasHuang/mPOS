
const separator = 'x';
const prefix_order = 'or_';
const prefix_customer = 'co_';

function getDate() {

    Number.prototype.padLeft = function(base,chr) {
        var len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
    }

    var d = new Date,
        dformat = [(d.getMonth()+1).padLeft(),
               d.getDate().padLeft(),
               d.getFullYear()].join('/') +' ' +
              [d.getHours().padLeft(),
               d.getMinutes().padLeft(),
               d.getSeconds().padLeft()].join(':');
 
    return dformat;
}

function getCustomer() {
    var name = sessionStorage.getItem('coCustomer');
    var phone = localStorage.getItem(prefix_customer+name);
    return name + ' (TEL : ' + phone + ')';
}

function PrintOrder() {

    var total = 0;

    var text = '';

    text += '<div class=company>';
    text += '<br>' + localStorage.getItem('coName');
    text += '<br>TEL : ' + localStorage.getItem('coPhone');
    text += '</div>';

    text += '<div class=customer>';
    text += '<br>Ordered by : ' + getCustomer();
    text += '<br>Date : ' + getDate();
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
    for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i).indexOf(prefix_order) != 0)
            continue;
        var name = sessionStorage.key(i);
        var value = sessionStorage.getItem(name).split(separator);
        var price = value[0];
        var qty = value[1];
        var amount = price * qty;
        text += '<tr>';
        text += '<td>'+name.substring(prefix_order.length)+'</td>';
        text += '<td class=num>'+price+'</td>';
        text += '<td class=num>'+qty+'</td>';
        text += '<td class=amount>'+amount+'</td>';
        text += '</tr>';
        total += amount;
    }
    text += '</table>';
    text += '</div>';

    text += '<br>';
    text += '<div class=total>';
    text += 'Total: '+total;
    text += '</div>'

    document.getElementById('PrintResult').innerHTML=text;
}
