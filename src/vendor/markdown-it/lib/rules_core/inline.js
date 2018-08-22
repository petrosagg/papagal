"use strict";

module.exports = function(e) {
    var t, n, r, o = e.tokens;
    for (n = 0, r = o.length; r > n; n++) {
        t = o[n];
        if (t.type === "inline") {
            e.md.inline.parse(t.content, e.md, e.env, t.children)
        };
    }
};