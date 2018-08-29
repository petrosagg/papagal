"use strict";

for (var r = [], o = 0; o < 256; o++) {
    r.push(0);
}

"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e) {
    r[e.charCodeAt(0)] = 1;
});

module.exports = function(e, t) {
    var n, o = e.pos, i = e.posMax;
    if (92 !== e.src.charCodeAt(o)) {
        return false;
    }
    o++;
    if (i > o) {
        n = e.src.charCodeAt(o);
        if (n < 256 && 0 !== r[n]) {
            t || (e.pending += e.src[o]);
            e.pos += 2;
            return true;
        }
        if (n === 10) {
            for (t || e.push("hardbreak", "br", 0), o++; i > o && e.src.charCodeAt(o) === 32; ) {
                o++;
            }
            e.pos = o;
            return true;
        }
    }
    t || (e.pending += "\\");
    e.pos++;
    return true;
};
