"use strict";

function r(e) {
    return h + e.toString(36);
}

function o(e, t) {
    return e.charAt(t) === h || t === e.length;
}

function i(e) {
    return e === "" || e.charAt(0) === h && e.charAt(e.length - 1) !== h;
}

function s(e, t) {
    return t.indexOf(e) === 0 && o(t, e.length);
}

function a(e) {
    if (e) {
        return e.substr(0, e.lastIndexOf(h));
    }
    return "";
}

function u(e, t) {
    d(i(e) && i(t))
    d(s(e, t))
    if (e === t) {
        return e;
    }
    var n, r = e.length + f;
    for (n = r; n < t.length && !o(t, n); n++) {
    }
    return t.substr(0, n);
}

function l(e, t) {
    var n = Math.min(e.length, t.length);
    if (n === 0) {
        return "";
    }
    for (var r = 0, s = 0; n >= s; s++) {
        if (o(e, s) && o(t, s)) {
            r = s;
        } else if (e.charAt(s) !== t.charAt(s)) {
            break;
        }
    }
    var a = e.substr(0, r);
    d(i(a));
    return a;
}

function c(e, t, n, r, o, i) {
    e = e || "";
    t = t || "";
    d(e !== t);
    var l = s(t, e);
    d(l || s(e, t));
    for (var c = 0, p = l ? a : u, h = e; ;h = p(h, t)) {
        var f;
        o && h === e || i && h === t || (f = n(h, l, r))
        if (f === !1 || h === t) {
            break;
        }
        d(c++ < m);
    }
}

var p = require("./ReactRootIndex"), d = require("./invariant"), h = ".", f = h.length, m = 100, g = {
    createReactRootID: function() {
        return r(p.createReactRootIndex());
    },
    createReactID: function(e, t) {
        return e + t;
    },
    getReactRootIDFromNodeID: function(e) {
        if (e && e.charAt(0) === h && e.length > 1) {
            var t = e.indexOf(h, 1);
            if (t > -1) {
                return e.substr(0, t);
            }
            return e;
        }
        return null;
    },
    traverseEnterLeave: function(e, t, n, r, o) {
        var i = l(e, t);
        if (i !== e) {
            c(e, i, n, r, !1, !0)
        };
        if (i !== t) {
            c(i, t, n, o, !0, !1)
        };
    },
    traverseTwoPhase: function(e, t, n) {
        if (e) {
            c("", e, t, n, !0, !1), c(e, "", t, n, !1, !0)
        };
    },
    traverseAncestors: function(e, t, n) {
        c("", e, t, n, !0, !1);
    },
    _getFirstCommonAncestorID: l,
    _getNextDescendantID: u,
    isAncestorIDOf: s,
    SEPARATOR: h
};

module.exports = g;