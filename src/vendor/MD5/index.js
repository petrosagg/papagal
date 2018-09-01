(function(n) {
    !function() {
        var r = require("crypt"), o = require("charenc").utf8, i = require("charenc").bin, s = function(e, t) {
            if (e.constructor == String) {
                if (t && t.encoding === "binary") {
                    e = i.stringToBytes(e);
                } else {
                    e = o.stringToBytes(e);
                }
            } else {
                if (typeof n != "undefined" && typeof n.isBuffer == "function" && n.isBuffer(e)) {
                    e = Array.prototype.slice.call(e, 0);
                } else {
                    if (!Array.isArray(e)) {
                        e = e.toString()
                    };
                }
            }
            for (var a = r.bytesToWords(e), u = 8 * e.length, l = 1732584193, c = -271733879, p = -1732584194, d = 271733878, h = 0; h < a.length; h++) {
                a[h] = 16711935 & (a[h] << 8 | a[h] >>> 24) | 4278255360 & (a[h] << 24 | a[h] >>> 8);
            }
            a[u >>> 5] |= 128 << u % 32;
            a[(u + 64 >>> 9 << 4) + 14] = u;
            for (var f = s._ff, m = s._gg, g = s._hh, v = s._ii, h = 0; h < a.length; h += 16) {
                var b = l, y = c, _ = p, w = d;
                l = f(l, c, p, d, a[h + 0], 7, -680876936);
                d = f(d, l, c, p, a[h + 1], 12, -389564586);
                p = f(p, d, l, c, a[h + 2], 17, 606105819);
                c = f(c, p, d, l, a[h + 3], 22, -1044525330);
                l = f(l, c, p, d, a[h + 4], 7, -176418897);
                d = f(d, l, c, p, a[h + 5], 12, 1200080426);
                p = f(p, d, l, c, a[h + 6], 17, -1473231341);
                c = f(c, p, d, l, a[h + 7], 22, -45705983);
                l = f(l, c, p, d, a[h + 8], 7, 1770035416);
                d = f(d, l, c, p, a[h + 9], 12, -1958414417);
                p = f(p, d, l, c, a[h + 10], 17, -42063);
                c = f(c, p, d, l, a[h + 11], 22, -1990404162);
                l = f(l, c, p, d, a[h + 12], 7, 1804603682);
                d = f(d, l, c, p, a[h + 13], 12, -40341101);
                p = f(p, d, l, c, a[h + 14], 17, -1502002290);
                c = f(c, p, d, l, a[h + 15], 22, 1236535329);
                l = m(l, c, p, d, a[h + 1], 5, -165796510);
                d = m(d, l, c, p, a[h + 6], 9, -1069501632);
                p = m(p, d, l, c, a[h + 11], 14, 643717713);
                c = m(c, p, d, l, a[h + 0], 20, -373897302);
                l = m(l, c, p, d, a[h + 5], 5, -701558691);
                d = m(d, l, c, p, a[h + 10], 9, 38016083);
                p = m(p, d, l, c, a[h + 15], 14, -660478335);
                c = m(c, p, d, l, a[h + 4], 20, -405537848);
                l = m(l, c, p, d, a[h + 9], 5, 568446438);
                d = m(d, l, c, p, a[h + 14], 9, -1019803690);
                p = m(p, d, l, c, a[h + 3], 14, -187363961);
                c = m(c, p, d, l, a[h + 8], 20, 1163531501);
                l = m(l, c, p, d, a[h + 13], 5, -1444681467);
                d = m(d, l, c, p, a[h + 2], 9, -51403784);
                p = m(p, d, l, c, a[h + 7], 14, 1735328473);
                c = m(c, p, d, l, a[h + 12], 20, -1926607734);
                l = g(l, c, p, d, a[h + 5], 4, -378558);
                d = g(d, l, c, p, a[h + 8], 11, -2022574463);
                p = g(p, d, l, c, a[h + 11], 16, 1839030562);
                c = g(c, p, d, l, a[h + 14], 23, -35309556);
                l = g(l, c, p, d, a[h + 1], 4, -1530992060);
                d = g(d, l, c, p, a[h + 4], 11, 1272893353);
                p = g(p, d, l, c, a[h + 7], 16, -155497632);
                c = g(c, p, d, l, a[h + 10], 23, -1094730640);
                l = g(l, c, p, d, a[h + 13], 4, 681279174);
                d = g(d, l, c, p, a[h + 0], 11, -358537222);
                p = g(p, d, l, c, a[h + 3], 16, -722521979);
                c = g(c, p, d, l, a[h + 6], 23, 76029189);
                l = g(l, c, p, d, a[h + 9], 4, -640364487);
                d = g(d, l, c, p, a[h + 12], 11, -421815835);
                p = g(p, d, l, c, a[h + 15], 16, 530742520);
                c = g(c, p, d, l, a[h + 2], 23, -995338651);
                l = v(l, c, p, d, a[h + 0], 6, -198630844);
                d = v(d, l, c, p, a[h + 7], 10, 1126891415);
                p = v(p, d, l, c, a[h + 14], 15, -1416354905);
                c = v(c, p, d, l, a[h + 5], 21, -57434055);
                l = v(l, c, p, d, a[h + 12], 6, 1700485571);
                d = v(d, l, c, p, a[h + 3], 10, -1894986606);
                p = v(p, d, l, c, a[h + 10], 15, -1051523);
                c = v(c, p, d, l, a[h + 1], 21, -2054922799);
                l = v(l, c, p, d, a[h + 8], 6, 1873313359);
                d = v(d, l, c, p, a[h + 15], 10, -30611744);
                p = v(p, d, l, c, a[h + 6], 15, -1560198380);
                c = v(c, p, d, l, a[h + 13], 21, 1309151649);
                l = v(l, c, p, d, a[h + 4], 6, -145523070);
                d = v(d, l, c, p, a[h + 11], 10, -1120210379);
                p = v(p, d, l, c, a[h + 2], 15, 718787259);
                c = v(c, p, d, l, a[h + 9], 21, -343485551);
                l = l + b >>> 0;
                c = c + y >>> 0;
                p = p + _ >>> 0;
                d = d + w >>> 0;
            }
            return r.endian([ l, c, p, d ]);
        };
        s._ff = function(e, t, n, r, o, i, s) {
            var a = e + (t & n | ~t & r) + (o >>> 0) + s;
            return (a << i | a >>> 32 - i) + t;
        };
        s._gg = function(e, t, n, r, o, i, s) {
            var a = e + (t & r | n & ~r) + (o >>> 0) + s;
            return (a << i | a >>> 32 - i) + t;
        };
        s._hh = function(e, t, n, r, o, i, s) {
            var a = e + (t ^ n ^ r) + (o >>> 0) + s;
            return (a << i | a >>> 32 - i) + t;
        };
        s._ii = function(e, t, n, r, o, i, s) {
            var a = e + (n ^ (t | ~r)) + (o >>> 0) + s;
            return (a << i | a >>> 32 - i) + t;
        };
        s._blocksize = 16;
        s._digestsize = 16;
        module.exports = function(e, t) {
            if (typeof e != "undefined") {
                var n = r.wordsToBytes(s(e, t));
                if (t && t.asBytes) {
                    return n;
                }
                if (t && t.asString) {
                    return i.bytesToString(n);
                }
                return r.bytesToHex(n);
            }
        };
    }();
}).call(this, require("buffer").Buffer);
