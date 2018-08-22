"use strict";

function r(e, t, n) {
    var r = e, o = !r.hasOwnProperty(n);
    if (o && t != null) {
        r[n] = t
    };
}

function o(e) {
    if (e == null) {
        return e;
    }
    var t = {};
    i(e, r, t);
    return t;
}

var i = require("./traverseAllChildren");

require("./warning");

module.exports = o;