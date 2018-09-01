function r(e, t, n) {
    function r(e, o) {
        if (r.count <= 0) {
            throw new Error("after called too many times");
        }
        --r.count;
        if (e) {
            i = true;
            t(e);
            t = n;
        } else {
            r.count !== 0 || i || t(null, o);
        }
    }
    var i = false;
    n = n || o;
    r.count = e;
    if (e === 0) {
        return t();
    }
    return r;
}

function o() {}

module.exports = r;
