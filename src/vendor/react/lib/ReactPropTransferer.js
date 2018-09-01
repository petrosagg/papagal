"use strict";

function r(e) {
    return function(t, n, r) {
        if (t.hasOwnProperty(n)) {
            t[n] = e(t[n], r);
        } else {
            t[n] = r;
        }
    };
}

function o(e, t) {
    for (var n in t) {
        if (t.hasOwnProperty(n)) {
            var r = l[n];
            if (r && l.hasOwnProperty(n)) {
                r(e, n, t[n]);
            } else {
                if (!e.hasOwnProperty(n)) {
                    e[n] = t[n]
                };
            }
        }
    }
    return e;
}

var i = require("./Object.assign"), s = require("./emptyFunction"), a = require("./joinClasses"), u = r(function(e, t) {
    return i({}, t, e);
}), l = {
    children: s,
    className: r(a),
    style: u
}, c = {
    mergeProps: function(e, t) {
        return o(i({}, e), t);
    }
};

module.exports = c;
