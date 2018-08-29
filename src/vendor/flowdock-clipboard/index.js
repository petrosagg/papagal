"use strict";

function r(e) {
    (window.macgap || window.windowsApp).clipboard.copy(e);
    return true;
}

function o(e) {
    try {
        if (document.execCommand("copy")) {
            return true;
        }
    } catch (t) {}
    console.warn("FlowdockClipboard is unable to copy " + e.value + " to clipboard");
    return false;
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

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = {
    copy: function(e) {
        if (e) {
            if (window.macgap || window.windowsApp) {
                return r(e);
            }
            return i(e);
        }
        return false;
    }
};

module.exports = exports["default"];
