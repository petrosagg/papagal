"use strict";

function r(e, t) {
    o(t != null)
    if (e == null) {
        return t;
    }
    var n = Array.isArray(e), r = Array.isArray(t);
    if (n && r) {
        e.push.apply(e, t);
        return e;
    }
    if (n) {
        e.push(t);
        return e;
    }
    if (r) {
        return [ e ].concat(t);
    }
    return [ e, t ];
}

var o = require("./invariant");

module.exports = r;