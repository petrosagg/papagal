"use strict";

function r(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState) {
        return n.getModifierState(e);
    }
    var r = i[e];
    if (r) {
        return !!n[r];
    }
    return false;
}

function o(e) {
    return r;
}

var i = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
};

module.exports = o;
