"use strict";

function r(e, t, n) {
    o.call(this, e, t, n);
}

var o = require("./SyntheticUIEvent"), i = require("./getEventCharCode"), s = require("./getEventKey"), a = require("./getEventModifierState"), u = {
    key: s,
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: a,
    charCode: function(e) {
        if (e.type === "keypress") {
            return i(e);
        }
        return 0;
    },
    keyCode: function(e) {
        if (e.type === "keydown" || e.type === "keyup") {
            return e.keyCode;
        }
        return 0;
    },
    which: function(e) {
        if (e.type === "keypress") {
            return i(e);
        }
        if (e.type === "keydown" || e.type === "keyup") {
            return e.keyCode;
        }
        return 0;
    }
};

o.augmentClass(r, u);

module.exports = r;