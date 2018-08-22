(function(e) {
    !function(r) {
        function o(e) {
            throw new RangeError(O[e]);
        }
        function i(e, t) {
            for (var n = e.length, r = []; n--; ) {
                r[n] = t(e[n]);
            }
            return r;
        }
        function s(e, t) {
            var n = e.split("@"), r = "";
            if (n.length > 1) {
                r = n[0] + "@", e = n[1]
            };
            e = e.replace(N, ".");
            var o = e.split("."), s = i(o, t).join(".");
            return r + s;
        }
        function a(e) {
            for (var t, n, r = [], o = 0, i = e.length; i > o; ) {
                t = e.charCodeAt(o++);
                t >= 55296 && t <= 56319 && i > o ? (n = e.charCodeAt(o++), (64512 & n) == 56320 ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), 
                o--)) : r.push(t);
            }
            return r;
        }
        function u(e) {
            return i(e, function(e) {
                var t = "";
                if (e > 65535) {
                    e -= 65536, t += L(e >>> 10 & 1023 | 55296), e = 56320 | 1023 & e
                };
                return t += L(e);
            }).join("");
        }
        function l(e) {
            if (e - 48 < 10) {
                return e - 22;
            }
            if (e - 65 < 26) {
                return e - 65;
            }
            if (e - 97 < 26) {
                return e - 97;
            }
            return k;
        }
        function c(e, t) {
            return e + 22 + 75 * (e < 26) - ((t != 0) << 5);
        }
        function p(e, t, n) {
            var r = 0;
            for (e = n ? P(e / T) : e >> 1, e += P(e / t); e > I * C >> 1; r += k) {
                e = P(e / I);
            }
            return P(r + (I + 1) * e / (e + E));
        }
        function d(e) {
            var t, n, r, i, s, a, c, d, h, f, m = [], g = e.length, v = 0, b = D, y = S;
            for (n = e.lastIndexOf(A), n < 0 && (n = 0), r = 0; n > r; ++r) {
                if (e.charCodeAt(r) >= 128) {
                    o("not-basic")
                };
                m.push(e.charCodeAt(r));
            }
            for (i = n > 0 ? n + 1 : 0; g > i; ) {
                for (s = v, a = 1, c = k; i >= g && o("invalid-input"), d = l(e.charCodeAt(i++)), 
                (d >= k || d > P((w - v) / a)) && o("overflow"), v += d * a, h = y >= c ? x : c >= y + C ? C : c - y, 
                !(h > d); c += k) {
                    f = k - h;
                    if (a > P(w / f)) {
                        o("overflow")
                    };
                    a *= f;
                }
                t = m.length + 1;
                y = p(v - s, t, s == 0);
                if (P(v / t) > w - b) {
                    o("overflow")
                };
                b += P(v / t);
                v %= t;
                m.splice(v++, 0, b);
            }
            return u(m);
        }
        function h(e) {
            var t, n, r, i, s, u, l, d, h, f, m, g, v, b, y, _ = [];
            for (e = a(e), g = e.length, t = D, n = 0, s = S, u = 0; g > u; ++u) {
                m = e[u];
                if (m < 128) {
                    _.push(L(m))
                };
            }
            for (r = i = _.length, i && _.push(A); g > r; ) {
                for (l = w, u = 0; g > u; ++u) {
                    m = e[u];
                    if (m >= t && l > m) {
                        l = m
                    };
                }
                for (v = r + 1, l - t > P((w - n) / v) && o("overflow"), n += (l - t) * v, t = l, 
                u = 0; g > u; ++u) {
                    m = e[u];
                    if (t > m && ++n > w) {
                        o("overflow")
                    };
                    if (m == t) {
                        for (d = n, h = k; f = s >= h ? x : h >= s + C ? C : h - s, !(f > d); h += k) {
                            y = d - f;
                            b = k - f;
                            _.push(L(c(f + y % b, 0)));
                            d = P(y / b);
                        }
                        _.push(L(c(d, 0)));
                        s = p(n, v, r == i);
                        n = 0;
                        ++r;
                    }
                }
                ++n;
                ++t;
            }
            return _.join("");
        }
        function f(e) {
            return s(e, function(e) {
                if (M.test(e)) {
                    return d(e.slice(4).toLowerCase());
                }
                return e;
            });
        }
        function m(e) {
            return s(e, function(e) {
                if (F.test(e)) {
                    return "xn--" + h(e);
                }
                return e;
            });
        }
        var g = typeof exports == "object" && exports && !exports.nodeType && exports, v = typeof module == "object" && module && !module.nodeType && module, b = typeof e == "object" && e;
        if (b.global === b || b.window === b || b.self === b) {
            r = b
        };
        var y, _, w = 2147483647, k = 36, x = 1, C = 26, E = 38, T = 700, S = 72, D = 128, A = "-", M = /^xn--/, F = /[^\x20-\x7E]/, N = /[\x2E\u3002\uFF0E\uFF61]/g, O = {
            overflow: "Overflow: input needs wider integers to process",
            "not-basic": "Illegal input >= 0x80 (not a basic code point)",
            "invalid-input": "Invalid input"
        }, I = k - x, P = Math.floor, L = String.fromCharCode;
        y = {
            version: "1.4.1",
            ucs2: {
                decode: a,
                encode: u
            },
            decode: d,
            encode: h,
            toASCII: m,
            toUnicode: f
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
            define("punycode", function() {
                return y;
            });
        } else if (g && v) {
            if (module.exports == g) {
                v.exports = y;
            } else for (_ in y) {
                if (y.hasOwnProperty(_)) {
                    g[_] = y[_]
                };
            }
        } else r.punycode = y;
    }(this);
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
