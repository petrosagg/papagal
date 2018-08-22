"use strict";

function r(e) {
    if (typeof e.type == "function") {
        return e.type;
    }
    var t = e.type, n = p[t];
    if (n == null) {
        p[t] = n = l(t)
    };
    return n;
}

function o(e) {
    u(c);
    return new c(e.type, e.props);
}

function i(e) {
    return new d(e);
}

function s(e) {
    return e instanceof d;
}

var a = require("./Object.assign"), u = require("./invariant"), l = null, c = null, p = {}, d = null, h = {
    injectGenericComponentClass: function(e) {
        c = e;
    },
    injectTextComponentClass: function(e) {
        d = e;
    },
    injectComponentClasses: function(e) {
        a(p, e);
    },
    injectAutoWrapper: function(e) {
        l = e;
    }
}, f = {
    getComponentClassForElement: r,
    createInternalComponent: o,
    createInstanceForText: i,
    isTextComponent: s,
    injection: h
};

module.exports = f;