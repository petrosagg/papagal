function r(e) {
    return e.replace(o, "-$1").toLowerCase();
}

var o = /([A-Z])/g;

module.exports = r;