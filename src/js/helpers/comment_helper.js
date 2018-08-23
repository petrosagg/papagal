var r;

r = function() {
    var e, t, n;
    t = Helpers.colors.slice();
    e = {};
    n = function() {
        var e;
        e = t.pop();
        t.unshift(e);
        return e;
    };
    return function(t, r) {
        if (r == null) {
            r = !0
        };
        if (e[t] != null) {
            return e[t];
        }
        if (r) {
            return e[t] = n();
        }
        return;
    };
};

Helpers.CommentHelper = {
    flows: {},
    color: function(e, t) {
        var n, o;
        return (o = (n = this.flows)[e] || (n[e] = r()))(t);
    }
};
