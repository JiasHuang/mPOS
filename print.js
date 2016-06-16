
var separator = 'x';
var prefix_order = 'or_'
var prefix_customer = 'co_'

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
    return name + ' ' + localStorage.getItem(prefix_customer+name);
}

function PrintOrder() {
    var text = '';
    var total = 0;

    text += '<br><table>';
    text += '<tr><td class="text-center">';
    text += '*** ' + localStorage.getItem('coName') + ' ' + localStorage.getItem('coPhone');
    text += '</td></tr>'
    text += '</table>';

    text += '<br><table>';
    text += '<tr><td text-align=center>';
    text += '*** Ordered by ' + getCustomer();
    text += '</td></tr>'
    text += '</table>';

    text += '<br><table>';
    text += '<tr><td class=text-center>';
    text += 'Date: ' + getDate();
    text += '</td></tr>';
    text += '</table>';

    text += '<br><table>';
    text += '<tr>';
    text += '<td class=text-left>Item</td>';
    text += '<td class="col-md-1 text-center">Qty</td>';
    text += '<td class="col-md-1 text-center">Price</td>';
    text += '<td class=text-right>Total</td>';
    text += '</tr>'

    for (var i = 0; i < sessionStorage.length; i++) {
        if (sessionStorage.key(i).startsWith(prefix_order) != true)
            continue;
        var name = sessionStorage.key(i);
        var value = sessionStorage.getItem(name).split(separator);
        var price = value[0];
        var qty = value[1];
        var amount = price * qty;
        text += '<tr>';
        text += '<td class=text-left>'+name.substring(prefix_order.length)+'</td>';
        text += '<td class="col-md-1 text-center">'+qty+'</td>';
        text += '<td class="col-md-1 text-center">'+price+'</td>';
        text += '<td class=text-right>'+amount+'</td>';
        text += '</tr>';
        total += amount;
    }
    text += '<tr>';
    text += '<td></td><td></td><td></td>';
    text += '<td class=text-right>Total: '+total+'</td>';
    text += '</tr>';
    text += '</table>';

    document.getElementById("PrintResult").innerHTML=text;
}
