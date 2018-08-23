var r;

r = function() {
    function e(e) {
        if (e == null) {
            e = {}
        };
        this.root = e;
    }
    e.prototype.set = function(t, n) {
        return e.set(this.root, t, n);
    };
    e.prototype.prefixed = function(t) {
        return new e(e.prefixed(this.root, t));
    };
    e.prototype.values = function() {
        return e.values(this.root);
    };
    e.set = function(e, t, n) {
        var r, o;
        for (r = 0; r < t.length; ) {
            o = t[r++];
            e[o] || (e[o] = {});
            e = e[o];
        }
        return e.end = n;
    };
    e.prefixed = function(e, t) {
        var n;
        for (n = 0; n < t.length; ) {
            e = e[t[n++]];
            if (!e) {
                return {};
            }
        }
        return e;
    };
    e.values = function(e) {
        var t, n, r, o, i;
        for (r = [ e ], o = []; r.length; ) {
            t = r.pop();
            for (n in t) {
                i = t[n];
                n === "end" ? o.push(i) : r.push(i);
            }
        }
        return o;
    };
    return e;
}();

module.exports = r;
