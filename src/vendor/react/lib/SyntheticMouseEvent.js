"use strict";

function r(e, t, n) {
    o.call(this, e, t, n);
}

var o = require("./SyntheticUIEvent"), i = require("./ViewportMetrics"), s = require("./getEventModifierState"), a = {
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: s,
    button: function(e) {
        var t = e.button;
        if ("which" in e) {
            return t;
        }
        if (t === 2) {
            return 2;
        }
        if (t === 4) {
            return 1;
        }
        return 0;
    },
    buttons: null,
    relatedTarget: function(e) {
        return e.relatedTarget || (e.fromElement === e.srcElement ? e.toElement : e.fromElement);
    },
    pageX: function(e) {
        if ("pageX" in e) {
            return e.pageX;
        }
        return e.clientX + i.currentScrollLeft;
    },
    pageY: function(e) {
        if ("pageY" in e) {
            return e.pageY;
        }
        return e.clientY + i.currentScrollTop;
    }
};

o.augmentClass(r, a);

module.exports = r;