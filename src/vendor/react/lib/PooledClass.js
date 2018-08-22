"use strict";

var r = require("./invariant"), o = function(e) {
    var t = this;
    if (t.instancePool.length) {
        var n = t.instancePool.pop();
        t.call(n, e);
        return n;
    }
    return new t(e);
}, i = function(e, t) {
    var n = this;
    if (n.instancePool.length) {
        var r = n.instancePool.pop();
        n.call(r, e, t);
        return r;
    }
    return new n(e, t);
}, s = function(e, t, n) {
    var r = this;
    if (r.instancePool.length) {
        var o = r.instancePool.pop();
        r.call(o, e, t, n);
        return o;
    }
    return new r(e, t, n);
}, a = function(e, t, n, r, o) {
    var i = this;
    if (i.instancePool.length) {
        var s = i.instancePool.pop();
        i.call(s, e, t, n, r, o);
        return s;
    }
    return new i(e, t, n, r, o);
}, u = function(e) {
    var t = this;
    r(e instanceof t);
    if (e.destructor) {
        e.destructor()
    };
    if (t.instancePool.length < t.poolSize) {
        t.instancePool.push(e)
    };
}, l = 10, c = o, p = function(e, t) {
    var n = e;
    n.instancePool = [];
    n.getPooled = t || c;
    n.poolSize || (n.poolSize = l);
    n.release = u;
    return n;
}, d = {
    addPoolingTo: p,
    oneArgumentPooler: o,
    twoArgumentPooler: i,
    threeArgumentPooler: s,
    fiveArgumentPooler: a
};

module.exports = d;
