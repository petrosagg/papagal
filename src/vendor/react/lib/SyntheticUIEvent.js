"use strict";

function r(e, t, n) {
    o.call(this, e, t, n);
}

var o = require("./SyntheticEvent"), i = require("./getEventTarget"), s = {
    view: function(e) {
        if (e.view) {
            return e.view;
        }
        var t = i(e);
        if (t != null && t.window === t) {
            return t;
        }
        var n = t.ownerDocument;
        if (n) {
            return n.defaultView || n.parentWindow;
        }
        return window;
    },
    detail: function(e) {
        return e.detail || 0;
    }
};

o.augmentClass(r, s);

module.exports = r;
