"use strict";

function r(e) {
    if (e) {
        if (e.nodeType === o) {
            return e.documentElement;
        }
        return e.firstChild;
    }
    return null;
}

var o = 9;

module.exports = r;
