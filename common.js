
const coName = 'coName';
const coPhone = 'coPhone';
const coAddr = 'coAddr';
const separator = 'x';
const prefix_item = 'it_';
const prefix_customer = 'co_';
const prefix_order = 'or_';

function delObj(array, property, searchTerm) {
    for(var i = 0, len = array.length; i < len; i++) {
        if (array[i][property] == searchTerm) {
            array.splice(i, 1);
            return;
        }
    }
}

function getDateFormat() {

    Number.prototype.padLeft = function(base,chr) {
        var len = (String(base || 10).length - String(this).length)+1;
        return len > 0? new Array(len).join(chr || '0')+this : this;
    }

    var d = new Date;
    var dformat = d.getFullYear() + (d.getMonth()+1).padLeft() + d.getDate().padLeft()
        + d.getHours().padLeft() + d.getMinutes().padLeft() + d.getSeconds().padLeft();

    return dformat;
}

function date2text(d) {
    return d.substring(0, 4) + '-' + d.substring(4, 6) + '-' + d.substring(6, 8) + ' ' +
        d.substring(8, 10) + ':' + d.substring(10, 12) + ':' + d.substring(12, 14);
}

function GenDemoObj() {

    var obj = new Object;

    obj['id'] = 100;
    obj['date'] = '20160620121314';
    obj['customer'] = 'Demo';
    obj['item'] = '2';
    obj['total'] = '12';
    obj['paid'] = 'yes';

    obj['order'] = new Object;
    obj['order']['apple'] = '5x1';
    obj['order']['garlic'] = '7x1';

    return obj;
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function float_m(a, b) {
    return ((1000 * a) * (1000 * b)) / 1000000; 
}

function float_a(a, b) {
    return ((1000 * a) + (1000 * b)) / 1000; 
}
