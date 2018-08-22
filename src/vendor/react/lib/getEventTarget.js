"use strict";

function r(e) {
    var t = e.target || e.srcElement || window;
    if (t.nodeType === 3) {
        return t.parentNode;
    }
    return t;
}

module.exports = r;