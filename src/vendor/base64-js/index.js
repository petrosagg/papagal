var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

!function(e) {
    "use strict";
    function t(e) {
        var t = e.charCodeAt(0);
        if (t === s || t === p) {
            return 62;
        }
        if (t === a || t === d) {
            return 63;
        }
        if (u > t) {
            return -1;
        }
        if (u + 10 > t) {
            return t - u + 26 + 26;
        }
        if (c + 26 > t) {
            return t - c;
        }
        if (l + 26 > t) {
            return t - l + 26;
        }
        return;
    }
    function n(e) {
        function n(e) {
            l[p++] = e;
        }
        var r, o, s, a, u, l;
        if (e.length % 4 > 0) {
            throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var c = e.length;
        u = e.charAt(c - 2) === "=" ? 2 : e.charAt(c - 1) === "=" ? 1 : 0;
        l = new i(3 * e.length / 4 - u);
        s = u > 0 ? e.length - 4 : e.length;
        var p = 0;
        for (r = 0, o = 0; s > r; r += 4, o += 3) {
            a = t(e.charAt(r)) << 18 | t(e.charAt(r + 1)) << 12 | t(e.charAt(r + 2)) << 6 | t(e.charAt(r + 3));
            n((16711680 & a) >> 16);
            n((65280 & a) >> 8);
            n(255 & a);
        }
        if (u === 2) {
            a = t(e.charAt(r)) << 2 | t(e.charAt(r + 1)) >> 4;
            n(255 & a);
        } else {
            if (u === 1) {
                a = t(e.charAt(r)) << 10 | t(e.charAt(r + 1)) << 4 | t(e.charAt(r + 2)) >> 2, n(a >> 8 & 255), 
                n(255 & a)
            };
        }
        return l;
    }
    function o(e) {
        function t(e) {
            return r.charAt(e);
        }
        function n(e) {
            return t(e >> 18 & 63) + t(e >> 12 & 63) + t(e >> 6 & 63) + t(63 & e);
        }
        var o, i, s, a = e.length % 3, u = "";
        for (o = 0, s = e.length - a; s > o; o += 3) {
            i = (e[o] << 16) + (e[o + 1] << 8) + e[o + 2];
            u += n(i);
        }
        switch (a) {
          case 1:
            i = e[e.length - 1];
            u += t(i >> 2);
            u += t(i << 4 & 63);
            u += "==";
            break;

          case 2:
            i = (e[e.length - 2] << 8) + e[e.length - 1];
            u += t(i >> 10);
            u += t(i >> 4 & 63);
            u += t(i << 2 & 63);
            u += "=";
        }
        return u;
    }
    var i = typeof Uint8Array != "undefined" ? Uint8Array : Array, s = "+".charCodeAt(0), a = "/".charCodeAt(0), u = "0".charCodeAt(0), l = "a".charCodeAt(0), c = "A".charCodeAt(0), p = "-".charCodeAt(0), d = "_".charCodeAt(0);
    e.toByteArray = n;
    e.fromByteArray = o;
}(typeof exports == "undefined" ? this.base64js = {} : exports);
