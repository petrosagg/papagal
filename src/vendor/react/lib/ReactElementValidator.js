"use strict";

function r() {
    if (b.current) {
        var e = b.current.getName();
        if (e) {
            return " Check the render method of `" + e + "`.";
        }
    }
    return "";
}

function o(e) {
    var t = e && e.getPublicInstance();
    if (!t) {
        return undefined;
    }
    var n = t.constructor;
    if (n) {
        return n.displayName || n.name || undefined;
    }
    return;
}

function i() {
    var e = b.current;
    return e && o(e) || undefined;
}

function s(e, t) {
    e._store.validated || e.key != null || (e._store.validated = true, u('Each child in an array or iterator should have a unique "key" prop.', e, t));
}

function a(e, t, n) {
    if (C.test(e)) {
        u("Child objects should have non-numeric keys so ordering is preserved.", t, n)
    };
}

function u(e, t, n) {
    var r = i(), s = typeof n == "string" ? n : n.displayName || n.name, a = r || s, u = k[e] || (k[e] = {});
    if (!u.hasOwnProperty(a)) {
        u[a] = true;
        var l = "";
        if (t && t._owner && t._owner !== b.current) {
            var c = o(t._owner);
            l = " It was passed a child from " + c + ".";
        }
    }
}

function l(e, t) {
    if (Array.isArray(e)) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (m.isValidElement(r)) {
                s(r, t)
            };
        }
    } else if (m.isValidElement(e)) {
        e._store.validated = true;
    } else if (e) {
        var o = _(e);
        if (o) {
            if (o !== e.entries) {
                for (var i, u = o.call(e); !(i = u.next()).done; ) {
                    if (m.isValidElement(i.value)) {
                        s(i.value, t)
                    };
                }
            }
        } else if (typeof e == "object") {
            var l = g.extractIfFragment(e);
            for (var c in l) {
                if (l.hasOwnProperty(c)) {
                    a(c, l[c], t)
                };
            }
        }
    }
}

function c(e, t, n, o) {
    for (var i in t) {
        if (t.hasOwnProperty(i)) {
            var s;
            try {
                w(typeof t[i] == "function");
                s = t[i](n, i, e, o);
            } catch (a) {
                s = a;
            }
            if (s instanceof Error && !(s.message in x)) {
                x[s.message] = true;
                r(this);
            }
        }
    }
}

function p(e, t) {
    var n = t.type, r = typeof n == "string" ? n : n.displayName, o = t._owner ? t._owner.getPublicInstance().constructor.displayName : null, i = e + "|" + r + "|" + o;
    if (!E.hasOwnProperty(i)) {
        E[i] = true;
        var s = "";
        if (r) {
            s = " <" + r + " />"
        };
        var a = "";
        if (o) {
            a = " The element was created by " + o + "."
        };
    }
}

function d(e, t) {
    if (e !== e) {
        return t !== t;
    }
    if (e === 0 && t === 0) {
        return 1 / e === 1 / t;
    }
    return e === t;
}

function h(e) {
    if (e._store) {
        var t = e._store.originalProps, n = e.props;
        for (var r in n) {
            if (n.hasOwnProperty(r)) {
                t.hasOwnProperty(r) && d(t[r], n[r]) || (p(r, e), t[r] = n[r])
            };
        }
    }
}

function f(e) {
    if (e.type != null) {
        var t = y.getComponentClassForElement(e), n = t.displayName || t.name;
        if (t.propTypes) {
            c(n, t.propTypes, e.props, v.prop)
        };
        typeof t.getDefaultProps == "function";
    }
}

var m = require("./ReactElement"), g = require("./ReactFragment"), v = require("./ReactPropTypeLocations"), b = (require("./ReactPropTypeLocationNames"), 
require("./ReactCurrentOwner")), y = require("./ReactNativeComponent"), _ = require("./getIteratorFn"), w = require("./invariant"), k = (require("./warning"), 
{}), x = {}, C = /^\d+$/, E = {}, T = {
    checkAndWarnForMutatedProps: h,
    createElement: function(e, t, n) {
        var r = m.createElement.apply(this, arguments);
        if (r == null) {
            return r;
        }
        for (var o = 2; o < arguments.length; o++) {
            l(arguments[o], e);
        }
        f(r);
        return r;
    },
    createFactory: function(e) {
        var t = T.createElement.bind(null, e);
        t.type = e;
        return t;
    },
    cloneElement: function(e, t, n) {
        for (var r = m.cloneElement.apply(this, arguments), o = 2; o < arguments.length; o++) {
            l(arguments[o], r.type);
        }
        f(r);
        return r;
    }
};

module.exports = T;
