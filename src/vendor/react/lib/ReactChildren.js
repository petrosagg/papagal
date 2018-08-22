"use strict";

function r(e, t) {
    this.forEachFunction = e;
    this.forEachContext = t;
}

function o(e, t, n, r) {
    var o = e;
    o.forEachFunction.call(o.forEachContext, t, r);
}

function i(e, t, n) {
    if (e == null) {
        return e;
    }
    var i = r.getPooled(t, n);
    h(e, o, i);
    r.release(i);
}

function s(e, t, n) {
    this.mapResult = e;
    this.mapFunction = t;
    this.mapContext = n;
}

function a(e, t, n, r) {
    var o = e, i = o.mapResult, s = !i.hasOwnProperty(n);
    if (s) {
        var a = o.mapFunction.call(o.mapContext, t, r);
        i[n] = a;
    }
}

function u(e, t, n) {
    if (e == null) {
        return e;
    }
    var r = {}, o = s.getPooled(r, t, n);
    h(e, a, o);
    s.release(o);
    return d.create(r);
}

function l(e, t, n, r) {
    return null;
}

function c(e, t) {
    return h(e, l, null);
}

var p = require("./PooledClass"), d = require("./ReactFragment"), h = require("./traverseAllChildren"), f = (require("./warning"), 
p.twoArgumentPooler), m = p.threeArgumentPooler;

p.addPoolingTo(r, f);

p.addPoolingTo(s, m);

var g = {
    forEach: i,
    map: u,
    count: c
};

module.exports = g;