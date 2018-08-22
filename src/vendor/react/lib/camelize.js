function r(e) {
    return e.replace(o, function(e, t) {
        return t.toUpperCase();
    });
}

var o = /-(.)/g;

module.exports = r;