"use strict";

var r = function(e, t, n) {
    if (Array.isArray(e)) {
        e.forEach(t, n);
    } else {
        if (e) {
            t.call(n, e)
        };
    }
};

module.exports = r;
