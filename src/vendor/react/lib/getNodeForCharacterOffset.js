"use strict";

function r(e) {
    for (;e && e.firstChild; ) {
        e = e.firstChild;
    }
    return e;
}

function o(e) {
    for (;e; ) {
        if (e.nextSibling) {
            return e.nextSibling;
        }
        e = e.parentNode;
    }
}

function i(e, t) {
    for (var n = r(e), i = 0, s = 0; n; ) {
        if (n.nodeType === 3) {
            s = i + n.textContent.length;
            if (t >= i && s >= t) {
                return {
                    node: n,
                    offset: t - i
                };
            }
            i = s;
        }
        n = r(o(n));
    }
}

module.exports = i;
