"use strict";

var r = require("./invariant"), o = {
    isValidOwner: function(e) {
        return !(!e || typeof e.attachRef != "function" || typeof e.detachRef != "function");
    },
    addComponentAsRefTo: function(e, t, n) {
        r(o.isValidOwner(n));
        n.attachRef(t, e);
    },
    removeComponentAsRefFrom: function(e, t, n) {
        r(o.isValidOwner(n));
        if (n.getPublicInstance().refs[t] === e.getPublicInstance()) {
            n.detachRef(t)
        };
    }
};

module.exports = o;
