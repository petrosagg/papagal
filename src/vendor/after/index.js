function r(e, t, n) {
    function r(e, o) {
        if (r.count <= 0) {
            throw new Error("after called too many times");
        }
        --r.count;
        e ? (i = !0, t(e), t = n) : 0 !== r.count || i || t(null, o);
    }
    var i = !1;
    n = n || o;
    r.count = e;
    if (e === 0) {
        return t();
    }
    return r;
}

function o() {}

module.exports = r;