"use strict";

function r(e) {
    (window.macgap || window.windowsApp).clipboard.copy(e);
    return !0;
}

function o(e) {
    try {
        if (document.execCommand("copy")) {
            return !0;
        }
    } catch (t) {}
    console.warn("FlowdockClipboard is unable to copy " + e.value + " to clipboard");
    return !1;
}

function i(e) {
    var t = document.createElement("input");
    window.getSelection().removeAllRanges();
    document.body.appendChild(t);
    t.value = e;
    t.select();
    var n = o(t);
    document.body.removeChild(t);
    return n;
}

Object.defineProperty(global, "__esModule", {
    value: !0
});

global["default"] = {
    copy: function(e) {
        if (e) {
            if (window.macgap || window.windowsApp) {
                return r(e);
            }
            return i(e);
        }
        return !1;
    }
};

module.exports = global["default"];