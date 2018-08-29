"use strict";

module.exports = function(e, t) {
    var n, r, o = e.pos;
    if (10 !== e.src.charCodeAt(o)) {
        return false;
    }
    for (n = e.pending.length - 1, r = e.posMax, t || (n >= 0 && e.pending.charCodeAt(n) === 32 ? n >= 1 && e.pending.charCodeAt(n - 1) === 32 ? (e.pending = e.pending.replace(/ +$/, ""), 
    e.push("hardbreak", "br", 0)) : (e.pending = e.pending.slice(0, -1), e.push("softbreak", "br", 0)) : e.push("softbreak", "br", 0)), 
    o++; r > o && e.src.charCodeAt(o) === 32; ) {
        o++;
    }
    e.pos = o;
    return true;
};
