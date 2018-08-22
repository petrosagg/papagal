!function() {
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {
        rotl: function(e, t) {
            return e << t | e >>> 32 - t;
        },
        rotr: function(e, t) {
            return e << 32 - t | e >>> t;
        },
        endian: function(e) {
            if (e.constructor == Number) {
                return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
            }
            for (var t = 0; t < e.length; t++) {
                e[t] = n.endian(e[t]);
            }
            return e;
        },
        randomBytes: function(e) {
            for (var t = []; e > 0; e--) {
                t.push(Math.floor(256 * Math.random()));
            }
            return t;
        },
        bytesToWords: function(e) {
            for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) {
                t[r >>> 5] |= e[n] << 24 - r % 32;
            }
            return t;
        },
        wordsToBytes: function(e) {
            for (var t = [], n = 0; n < 32 * e.length; n += 8) {
                t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
            }
            return t;
        },
        bytesToHex: function(e) {
            for (var t = [], n = 0; n < e.length; n++) {
                t.push((e[n] >>> 4).toString(16));
                t.push((15 & e[n]).toString(16));
            }
            return t.join("");
        },
        hexToBytes: function(e) {
            for (var t = [], n = 0; n < e.length; n += 2) {
                t.push(parseInt(e.substr(n, 2), 16));
            }
            return t;
        },
        bytesToBase64: function(t) {
            for (var n = [], r = 0; r < t.length; r += 3) {
                for (var o = t[r] << 16 | t[r + 1] << 8 | t[r + 2], i = 0; i < 4; i++) {
                    8 * r + 6 * i <= 8 * t.length ? n.push(e.charAt(o >>> 6 * (3 - i) & 63)) : n.push("=");
                }
            }
            return n.join("");
        },
        base64ToBytes: function(t) {
            t = t.replace(/[^A-Z0-9+\/]/gi, "");
            for (var n = [], r = 0, o = 0; r < t.length; o = ++r % 4) {
                if (o != 0) {
                    n.push((e.indexOf(t.charAt(r - 1)) & Math.pow(2, -2 * o + 8) - 1) << 2 * o | e.indexOf(t.charAt(r)) >>> 6 - 2 * o)
                };
            }
            return n;
        }
    };
    module.exports = n;
}();