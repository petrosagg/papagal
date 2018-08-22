module.exports = Object.keys || function(e) {
    var t = [], n = Object.prototype.hasOwnProperty;
    for (var r in e) {
        if (n.call(e, r)) {
            t.push(r)
        };
    }
    return t;
};
