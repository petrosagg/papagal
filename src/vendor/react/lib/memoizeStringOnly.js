"use strict";

function r(e) {
    var t = {};
    return function(n) {
        t.hasOwnProperty(n) || (t[n] = e.call(this, n));
        return t[n];
    };
}

module.exports = r;