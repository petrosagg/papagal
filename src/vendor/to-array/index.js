function r(e, t) {
    var n = [];
    t = t || 0;
    for (var r = t || 0; r < e.length; r++) {
        n[r - t] = e[r];
    }
    return n;
}

module.exports = r;