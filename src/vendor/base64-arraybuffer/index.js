!function(e) {
    "use strict";
    exports.encode = function(t) {
        var n, r = new Uint8Array(t), o = r.length, i = "";
        for (n = 0; o > n; n += 3) {
            i += e[r[n] >> 2];
            i += e[(3 & r[n]) << 4 | r[n + 1] >> 4];
            i += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6];
            i += e[63 & r[n + 2]];
        }
        o % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 === 1 && (i = i.substring(0, i.length - 2) + "==");
        return i;
    };
    exports.decode = function(t) {
        var n, r, o, i, s, a = .75 * t.length, u = t.length, l = 0;
        if (t[t.length - 1] === "=") {
            a--, t[t.length - 2] === "=" && a--
        };
        var c = new ArrayBuffer(a), p = new Uint8Array(c);
        for (n = 0; u > n; n += 4) {
            r = e.indexOf(t[n]);
            o = e.indexOf(t[n + 1]);
            i = e.indexOf(t[n + 2]);
            s = e.indexOf(t[n + 3]);
            p[l++] = r << 2 | o >> 4;
            p[l++] = (15 & o) << 4 | i >> 2;
            p[l++] = (3 & i) << 6 | 63 & s;
        }
        return c;
    };
}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");