"use strict";

function r(e) {
    if (e && e.__esModule) {
        return e;
    }
    return {
        default: e
    };
}

function o(e) {
    return e.replace(y, "");
}

function i(e) {
    return o(g.inspect(e, {
        depth: 1 / 0,
        showHidden: !0
    }));
}

function s(e) {
    var t = "[keykey]";
    if (!Array.isArray(e)) {
        throw new TypeError(t + " Must call with an array.");
    }
}

function a(e, t) {
    var n = {};
    e.forEach(t.bind(t, n, e));
    return n;
}

function u(e) {
    var t = i(e);
    return _.set(t, e);
}

function l(e, t) {
    s(e);
    var n = a(e, function(e, t, n) {
        e[n] = n;
    });
    if (!t) {
        u(n)
    };
    return n;
}

function c(e) {
    return _.get(i(e)) || l(e);
}

function p(e) {
    return typeof e == "undefined";
}

function d(e) {
    return typeof e == "boolean";
}

function h(e) {
    return e[e.length - 1];
}

function f(e) {
    return !p(e) && !d(e);
}

function m(e, t) {
    if (f(t)) {
        e = [].slice.call(arguments);
        var n = h(e);
        if (d(n)) {
            t = n;
            e.pop();
        } else t = !1;
    }
    if (t) {
        return l(e, t);
    }
    return c(e);
}

var g = require("util"), v = require("lru-cache"), b = r(v), y = /\s+/g, _ = b["default"](100);

module.exports = m;

module.exports.reset = function() {
    return _.reset();
};

module.exports.resetCache = module.exports.reset;

module.exports.cacheKeys = function() {
    return _.keys();
};

module.exports.cacheValues = function() {
    return _.values();
};
