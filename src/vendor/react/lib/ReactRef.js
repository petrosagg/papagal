"use strict";

function r(e, t, n) {
    if (typeof e == "function") {
        e(t.getPublicInstance());
    } else {
        i.addComponentAsRefTo(t, e, n);
    }
}

function o(e, t, n) {
    if (typeof e == "function") {
        e(null);
    } else {
        i.removeComponentAsRefFrom(t, e, n);
    }
}

var i = require("./ReactOwner"), s = {};

s.attachRefs = function(e, t) {
    var n = t.ref;
    if (n != null) {
        r(n, e, t._owner)
    };
};

s.shouldUpdateRefs = function(e, t) {
    return t._owner !== e._owner || t.ref !== e.ref;
};

s.detachRefs = function(e, t) {
    var n = t.ref;
    if (n != null) {
        o(n, e, t._owner)
    };
};

module.exports = s;
