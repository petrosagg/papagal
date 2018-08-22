"use strict";

function r(e) {
    var t = 32 | e;
    return t >= 97 && t <= 122;
}

var o = require("../common/html_re").HTML_TAG_RE;

module.exports = function(e, t) {
    var n, i, s, a, u = e.pos;
    if (e.md.options.html) {
        s = e.posMax;
        if (60 !== e.src.charCodeAt(u) || u + 2 >= s) {
            return !1;
        }
        n = e.src.charCodeAt(u + 1);
        if ((n === 33 || n === 63 || n === 47 || r(n)) && (i = e.src.slice(u).match(o))) {
            t || (a = e.push("html_inline", "", 0), a.content = e.src.slice(u, u + i[0].length));
            e.pos += i[0].length;
            return !0;
        }
        return !1;
    }
    return !1;
};
