"use strict";

var r = require("./invariant"), o = function(e) {
    var t, n = {};
    r(e instanceof Object && !Array.isArray(e));
    for (t in e) {
        if (e.hasOwnProperty(t)) {
            n[t] = t
        };
    }
    return n;
};

module.exports = o;
