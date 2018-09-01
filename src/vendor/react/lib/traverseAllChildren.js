"use strict";

function r(e) {
    return g[e];
}

function o(e, t) {
    if (e && e.key != null) {
        return s(e.key);
    }
    return t.toString(36);
}

function i(e) {
    return ("" + e).replace(v, r);
}

function s(e) {
    return "$" + i(e);
}

function a(e, t, n, r, i) {
    var u = typeof e;
    if (u === "undefined" || u === "boolean") {
        e = null
    };
    if (e === null || u === "string" || u === "number" || l.isValidElement(e)) {
        r(i, e, t === "" ? f + o(e, 0) : t, n);
        return 1;
    }
    var p, g, v, b = 0;
    if (Array.isArray(e)) {
        for (var y = 0; y < e.length; y++) {
            p = e[y];
            g = (t !== "" ? t + m : f) + o(p, y);
            v = n + b;
            b += a(p, g, v, r, i);
        }
    } else {
        var _ = d(e);
        if (_) {
            var w, k = _.call(e);
            if (_ !== e.entries) {
                for (var x = 0; !(w = k.next()).done; ) {
                    p = w.value;
                    g = (t !== "" ? t + m : f) + o(p, x++);
                    v = n + b;
                    b += a(p, g, v, r, i);
                }
            } else {
                for (;!(w = k.next()).done; ) {
                    var C = w.value;
                    if (C) {
                        p = C[1];
                        g = (t !== "" ? t + m : f) + s(C[0]) + m + o(p, 0);
                        v = n + b;
                        b += a(p, g, v, r, i);
                    };
                }
            }
        } else if (u === "object") {
            h(e.nodeType !== 1);
            var E = c.extract(e);
            for (var T in E) {
                if (E.hasOwnProperty(T)) {
                    p = E[T];
                    g = (t !== "" ? t + m : f) + s(T) + m + o(p, 0);
                    v = n + b;
                    b += a(p, g, v, r, i);
                };
            }
        }
    }
    return b;
}

function u(e, t, n) {
    if (e == null) {
        return 0;
    }
    return a(e, "", 0, t, n);
}

var l = require("./ReactElement"), c = require("./ReactFragment"), p = require("./ReactInstanceHandles"), d = require("./getIteratorFn"), h = require("./invariant"), f = (require("./warning"), 
p.SEPARATOR), m = ":", g = {
    "=": "=0",
    ".": "=1",
    ":": "=2"
}, v = /[=.:]/g;

module.exports = u;
