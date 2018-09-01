"use strict";

var r = /[\n\t]/g, o = /\r[\n\u0085]|[\u2424\u2028\u0085]/g, i = /\u0000/g;

module.exports = function(e) {
    var t, n, s;
    t = e.src.replace(o, "\n");
    t = t.replace(i, "�");
    if (t.indexOf("\t") >= 0) {
        n = 0;
        s = 0;
        t = t.replace(r, function(e, r) {
            var o;
            if (t.charCodeAt(r) === 10) {
                n = r + 1;
                s = 0;
                return e;
            }
            o = "    ".slice((r - n - s) % 4);
            s = r - n + 1;
            return o;
        });
    };
    e.src = t;
};
