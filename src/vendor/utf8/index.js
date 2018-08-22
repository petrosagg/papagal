(function(e) {
    !function(r) {
        function o(e) {
            for (var t, n, r = [], o = 0, i = e.length; i > o; ) {
                t = e.charCodeAt(o++);
                t >= 55296 && t <= 56319 && i > o ? (n = e.charCodeAt(o++), (64512 & n) == 56320 ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), 
                o--)) : r.push(t);
            }
            return r;
        }
        function i(e) {
            for (var t, n = e.length, r = -1, o = ""; ++r < n; ) {
                t = e[r];
                if (t > 65535) {
                    t -= 65536, o += y(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t
                };
                o += y(t);
            }
            return o;
        }
        function s(e) {
            if (e >= 55296 && e <= 57343) {
                throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
            }
        }
        function a(e, t) {
            return y(e >> t & 63 | 128);
        }
        function u(e) {
            if ((4294967168 & e) == 0) {
                return y(e);
            }
            var t = "";
            (4294965248 & e) == 0 ? t = y(e >> 6 & 31 | 192) : (4294901760 & e) == 0 ? (s(e), 
            t = y(e >> 12 & 15 | 224), t += a(e, 6)) : (4292870144 & e) == 0 && (t = y(e >> 18 & 7 | 240), 
            t += a(e, 12), t += a(e, 6));
            return t += y(63 & e | 128);
        }
        function l(e) {
            for (var t, n = o(e), r = n.length, i = -1, s = ""; ++i < r; ) {
                t = n[i];
                s += u(t);
            }
            return s;
        }
        function c() {
            if (b >= v) {
                throw Error("Invalid byte index");
            }
            var e = 255 & g[b];
            b++
            if ((192 & e) == 128) {
                return 63 & e;
            }
            throw Error("Invalid continuation byte");
        }
        function p() {
            var e, t, n, r, o;
            if (b > v) {
                throw Error("Invalid byte index");
            }
            if (b == v) {
                return !1;
            }
            e = 255 & g[b]
            b++
            if ((128 & e) == 0) {
                return e;
            }
            if ((224 & e) == 192) {
                var t = c();
                o = (31 & e) << 6 | t
                if (o >= 128) {
                    return o;
                }
                throw Error("Invalid continuation byte");
            }
            if ((240 & e) == 224) {
                t = c()
                n = c()
                o = (15 & e) << 12 | t << 6 | n
                if (o >= 2048) {
                    s(o);
                    return o;
                }
                throw Error("Invalid continuation byte");
            }
            if ((248 & e) == 240 && (t = c(), n = c(), r = c(), o = (15 & e) << 18 | t << 12 | n << 6 | r, 
            o >= 65536 && o <= 1114111)) {
                return o;
            }
            throw Error("Invalid UTF-8 detected");
        }
        function d(e) {
            g = o(e);
            v = g.length;
            b = 0;
            for (var t, n = []; (t = p()) !== !1; ) {
                n.push(t);
            }
            return i(n);
        }
        var h = typeof exports == "object" && exports, f = typeof module == "object" && module && module.exports == h && module, m = typeof e == "object" && e;
        if (m.global === m || m.window === m) {
            r = m
        };
        var g, v, b, y = String.fromCharCode, _ = {
            version: "2.0.0",
            encode: l,
            decode: d
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            define(function() {
                return _;
            });
        } else if (h && !h.nodeType) {
            if (f) {
                f.exports = _;
            } else {
                var w = {}, k = w.hasOwnProperty;
                for (var x in _) {
                    if (k.call(_, x)) {
                        h[x] = _[x]
                    };
                }
            }
        } else r.utf8 = _;
    }(this);
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
