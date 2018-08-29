"use strict";

var r = require("../common/entities"), o = require("../common/utils").has, i = require("../common/utils").isValidEntityCode, s = require("../common/utils").fromCodePoint, a = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i, u = /^&([a-z][a-z0-9]{1,31});/i;

module.exports = function(e, t) {
    var n, l, c, p = e.pos, d = e.posMax;
    if (38 !== e.src.charCodeAt(p)) {
        return false;
    }
    if (d > p + 1) {
        n = e.src.charCodeAt(p + 1);
        if (n === 35) {
            if (c = e.src.slice(p).match(a)) {
                t || (l = c[1][0].toLowerCase() === "x" ? parseInt(c[1].slice(1), 16) : parseInt(c[1], 10), 
                e.pending += s(i(l) ? l : 65533));
                e.pos += c[0].length;
                return true;
            }
        } else {
            c = e.src.slice(p).match(u);
            if (c && o(r, c[1])) {
                t || (e.pending += r[c[1]]);
                e.pos += c[0].length;
                return true;
            }
        }
    }
    t || (e.pending += "&");
    e.pos++;
    return true;
};
