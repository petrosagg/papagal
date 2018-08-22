var r = [].indexOf;

module.exports = function(e, t) {
    if (r) {
        return e.indexOf(t);
    }
    for (var n = 0; n < e.length; ++n) {
        if (e[n] === t) {
            return n;
        }
    }
    return -1;
};