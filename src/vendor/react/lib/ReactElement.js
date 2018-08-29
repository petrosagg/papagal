"use strict";

var r = require("./ReactContext"), o = require("./ReactCurrentOwner"), i = require("./Object.assign"), s = (require("./warning"), 
{
    key: true,
    ref: true
}), a = function(e, t, n, r, o, i) {
    this.type = e;
    this.key = t;
    this.ref = n;
    this._owner = r;
    this._context = o;
    this.props = i;
};

a.prototype = {
    _isReactElement: true
};

a.createElement = function(e, t, n) {
    var i, u = {}, l = null, c = null;
    if (t != null) {
        c = t.ref === undefined ? null : t.ref;
        l = t.key === undefined ? null : "" + t.key;
        for (i in t) {
            if (t.hasOwnProperty(i) && !s.hasOwnProperty(i)) {
                u[i] = t[i]
            };
        }
    }
    var p = arguments.length - 2;
    if (p === 1) {
        u.children = n;
    } else if (p > 1) {
        for (var d = Array(p), h = 0; p > h; h++) {
            d[h] = arguments[h + 2];
        }
        u.children = d;
    }
    if (e && e.defaultProps) {
        var f = e.defaultProps;
        for (i in f) {
            if (typeof u[i] == "undefined") {
                u[i] = f[i]
            };
        }
    }
    return new a(e, l, c, o.current, r.current, u);
};

a.createFactory = function(e) {
    var t = a.createElement.bind(null, e);
    t.type = e;
    return t;
};

a.cloneAndReplaceProps = function(e, t) {
    var n = new a(e.type, e.key, e.ref, e._owner, e._context, t);
    return n;
};

a.cloneElement = function(e, t, n) {
    var r, u = i({}, e.props), l = e.key, c = e.ref, p = e._owner;
    if (t != null) {
        if (undefined !== t.ref) {
            c = t.ref, p = o.current
        };
        if (undefined !== t.key) {
            l = "" + t.key
        };
        for (r in t) {
            if (t.hasOwnProperty(r) && !s.hasOwnProperty(r)) {
                u[r] = t[r]
            };
        }
    }
    var d = arguments.length - 2;
    if (d === 1) {
        u.children = n;
    } else if (d > 1) {
        for (var h = Array(d), f = 0; d > f; f++) {
            h[f] = arguments[f + 2];
        }
        u.children = h;
    }
    return new a(e.type, l, c, p, e._context, u);
};

a.isValidElement = function(e) {
    var t = !(!e || !e._isReactElement);
    return t;
};

module.exports = a;
