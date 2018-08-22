"use strict";

var r = function(e, t, n) {
    Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
};

module.exports = r;