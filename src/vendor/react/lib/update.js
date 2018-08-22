"use strict";

function r(e) {
    if (Array.isArray(e)) {
        return e.concat();
    }
    if (e && typeof e == "object") {
        return s(new e.constructor(), e);
    }
    return e;
}

function o(e, t, n) {
    u(Array.isArray(e));
    var r = t[n];
    u(Array.isArray(r));
}

function i(e, t) {
    u(typeof t == "object")
    if (l.call(t, h)) {
        u(Object.keys(t).length === 1);
        return t[h];
    }
    var n = r(e);
    if (l.call(t, f)) {
        var a = t[f];
        u(a && typeof a == "object");
        u(n && typeof n == "object");
        s(n, t[f]);
    }
    if (l.call(t, c)) {
        o(e, t, c), t[c].forEach(function(e) {
            n.push(e);
        })
    };
    if (l.call(t, p)) {
        o(e, t, p), t[p].forEach(function(e) {
            n.unshift(e);
        })
    };
    if (l.call(t, d)) {
        u(Array.isArray(e)), u(Array.isArray(t[d])), t[d].forEach(function(e) {
            u(Array.isArray(e));
            n.splice.apply(n, e);
        })
    };
    if (l.call(t, m)) {
        u(typeof t[m] == "function"), n = t[m](n)
    };
    for (var g in t) {
        v.hasOwnProperty(g) && v[g] || (n[g] = i(e[g], t[g]));
    }
    return n;
}

var s = require("./Object.assign"), a = require("./keyOf"), u = require("./invariant"), l = {}.hasOwnProperty, c = a({
    $push: null
}), p = a({
    $unshift: null
}), d = a({
    $splice: null
}), h = a({
    $set: null
}), f = a({
    $merge: null
}), m = a({
    $apply: null
}), g = [ c, p, d, h, f, m ], v = {};

g.forEach(function(e) {
    v[e] = !0;
});

module.exports = i;
