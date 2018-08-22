module.exports = function(e, t, n) {
    var r = e.byteLength;
    t = t || 0
    n = n || r
    if (e.slice) {
        return e.slice(t, n);
    }
    if (t < 0) {
        t += r
    }
    if (n < 0) {
        n += r
    }
    if (n > r) {
        n = r
    }
    if (t >= r || t >= n || r === 0) {
        return new ArrayBuffer(0);
    }
    for (var o = new Uint8Array(e), i = new Uint8Array(n - t), s = t, a = 0; n > s; s++, 
    a++) {
        i[a] = o[s];
    }
    return i.buffer;
};
