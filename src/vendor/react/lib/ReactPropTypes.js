"use strict";

function r(e) {
    function t(t, n, r, o, i) {
        o = o || w;
        if (n[r] == null) {
            var s = y[i];
            if (t) {
                return new Error("Required " + s + " `" + r + "` was not specified in " + ("`" + o + "`."));
            }
            return null;
        }
        return e(n, r, o, i);
    }
    var n = t.bind(null, false);
    n.isRequired = t.bind(null, true);
    return n;
}

function o(e) {
    function t(t, n, r, o) {
        var i = t[n], s = m(i);
        if (s !== e) {
            var a = y[o], u = g(i);
            return new Error("Invalid " + a + " `" + n + "` of type `" + u + "` " + ("supplied to `" + r + "`, expected `" + e + "`."));
        }
        return null;
    }
    return r(t);
}

function i() {
    return r(_.thatReturns(null));
}

function s(e) {
    function t(t, n, r, o) {
        var i = t[n];
        if (!Array.isArray(i)) {
            var s = y[o], a = m(i);
            return new Error("Invalid " + s + " `" + n + "` of type " + ("`" + a + "` supplied to `" + r + "`, expected an array."));
        }
        for (var u = 0; u < i.length; u++) {
            var l = e(i, u, r, o);
            if (l instanceof Error) {
                return l;
            }
        }
        return null;
    }
    return r(t);
}

function a() {
    function e(e, t, n, r) {
        if (!v.isValidElement(e[t])) {
            var o = y[r];
            return new Error("Invalid " + o + " `" + t + "` supplied to " + ("`" + n + "`, expected a ReactElement."));
        }
        return null;
    }
    return r(e);
}

function u(e) {
    function t(t, n, r, o) {
        if (!(t[n] instanceof e)) {
            var i = y[o], s = e.name || w;
            return new Error("Invalid " + i + " `" + n + "` supplied to " + ("`" + r + "`, expected instance of `" + s + "`."));
        }
        return null;
    }
    return r(t);
}

function l(e) {
    function t(t, n, r, o) {
        for (var i = t[n], s = 0; s < e.length; s++) {
            if (i === e[s]) {
                return null;
            }
        }
        var a = y[o], u = JSON.stringify(e);
        return new Error("Invalid " + a + " `" + n + "` of value `" + i + "` " + ("supplied to `" + r + "`, expected one of " + u + "."));
    }
    return r(t);
}

function c(e) {
    function t(t, n, r, o) {
        var i = t[n], s = m(i);
        if (s !== "object") {
            var a = y[o];
            return new Error("Invalid " + a + " `" + n + "` of type " + ("`" + s + "` supplied to `" + r + "`, expected an object."));
        }
        for (var u in i) {
            if (i.hasOwnProperty(u)) {
                var l = e(i, u, r, o);
                if (l instanceof Error) {
                    return l;
                }
            }
        }
        return null;
    }
    return r(t);
}

function p(e) {
    function t(t, n, r, o) {
        for (var i = 0; i < e.length; i++) {
            var s = e[i];
            if (s(t, n, r, o) == null) {
                return null;
            }
        }
        var a = y[o];
        return new Error("Invalid " + a + " `" + n + "` supplied to " + ("`" + r + "`."));
    }
    return r(t);
}

function d() {
    function e(e, t, n, r) {
        if (!f(e[t])) {
            var o = y[r];
            return new Error("Invalid " + o + " `" + t + "` supplied to " + ("`" + n + "`, expected a ReactNode."));
        }
        return null;
    }
    return r(e);
}

function h(e) {
    function t(t, n, r, o) {
        var i = t[n], s = m(i);
        if (s !== "object") {
            var a = y[o];
            return new Error("Invalid " + a + " `" + n + "` of type `" + s + "` " + ("supplied to `" + r + "`, expected `object`."));
        }
        for (var u in e) {
            var l = e[u];
            if (l) {
                var c = l(i, u, r, o);
                if (c) {
                    return c;
                }
            }
        }
        return null;
    }
    return r(t);
}

function f(e) {
    switch (typeof e) {
      case "number":
      case "string":
      case "undefined":
        return true;

      case "boolean":
        return !e;

      case "object":
        if (Array.isArray(e)) {
            return e.every(f);
        }
        if (e === null || v.isValidElement(e)) {
            return true;
        }
        e = b.extractIfFragment(e);
        for (var t in e) {
            if (!f(e[t])) {
                return false;
            }
        }
        return true;

      default:
        return false;
    }
}

function m(e) {
    var t = typeof e;
    if (Array.isArray(e)) {
        return "array";
    }
    if (e instanceof RegExp) {
        return "object";
    }
    return t;
}

function g(e) {
    var t = m(e);
    if (t === "object") {
        if (e instanceof Date) {
            return "date";
        }
        if (e instanceof RegExp) {
            return "regexp";
        }
    }
    return t;
}

var v = require("./ReactElement"), b = require("./ReactFragment"), y = require("./ReactPropTypeLocationNames"), _ = require("./emptyFunction"), w = "<<anonymous>>", k = a(), x = d(), C = {
    array: o("array"),
    bool: o("boolean"),
    func: o("function"),
    number: o("number"),
    object: o("object"),
    string: o("string"),
    any: i(),
    arrayOf: s,
    element: k,
    instanceOf: u,
    node: x,
    objectOf: c,
    oneOf: l,
    oneOfType: p,
    shape: h
};

module.exports = C;
