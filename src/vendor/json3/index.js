!function(e) {
    function t(e) {
        if (t[e] !== i) {
            return t[e];
        }
        var n;
        if (e == "bug-string-char-index") {
            n = "a"[0] != "a";
        } else if (e == "json") {
            n = t("json-stringify") && t("json-parse");
        } else {
            var r, o = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
            if (e == "json-stringify") {
                var a = l.stringify, u = typeof a == "function" && c;
                if (u) {
                    (r = function() {
                        return 1;
                    }).toJSON = r;
                    try {
                        u = a(0) === "0" && a(new Number()) === "0" && a(new String()) == '""' && a(s) === i && a(i) === i && a() === i && a(r) === "1" && a([ r ]) == "[1]" && a([ i ]) == "[null]" && a(null) == "null" && a([ i, s, null ]) == "[null,null,null]" && a({
                            a: [ r, true, false, null, "\0\b\n\f\r\t" ]
                        }) == o && a(null, r) === "1" && a([ 1, 2 ], null, 1) == "[\n 1,\n 2\n]" && a(new Date(-864e13)) == '"-271821-04-20T00:00:00.000Z"' && a(new Date(864e13)) == '"+275760-09-13T00:00:00.000Z"' && a(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && a(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                    } catch (p) {
                        u = !1;
                    }
                }
                n = u;
            }
            if (e == "json-parse") {
                var d = l.parse;
                if (typeof d == "function") {
                    try {
                        if (d("0") === 0 && !d(false)) {
                            r = d(o);
                            var h = r.a.length == 5 && r.a[0] === 1;
                            if (h) {
                                try {
                                    h = !d('"\t"');
                                } catch (p) {}
                                if (h) {
                                    try {
                                        h = d("01") !== 1;
                                    } catch (p) {}
                                }
                                if (h) {
                                    try {
                                        h = d("1.") !== 1;
                                    } catch (p) {}
                                }
                            }
                        }
                    } catch (p) {
                        h = !1;
                    }
                }
                n = h;
            }
        }
        return t[e] = !!n;
    }
    var r, o, i, s = {}.toString, a = typeof define == "function" && define.amd, u = typeof JSON == "object" && JSON, l = typeof exports == "object" && exports && !exports.nodeType && exports;
    if (l && u) {
        l.stringify = u.stringify;
        l.parse = u.parse;
    } else {
        l = e.JSON = u || {};
    }
    var c = new Date(-0xc782b5b800cec);
    try {
        c = c.getUTCFullYear() == -109252 && c.getUTCMonth() === 0 && c.getUTCDate() === 1 && c.getUTCHours() == 10 && c.getUTCMinutes() == 37 && c.getUTCSeconds() == 6 && c.getUTCMilliseconds() == 708;
    } catch (p) {}
    if (!t("json")) {
        var d = "[object Function]", h = "[object Date]", f = "[object Number]", m = "[object String]", g = "[object Array]", v = "[object Boolean]", b = t("bug-string-char-index");
        if (!c) {
            var y = Math.floor, _ = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334 ], w = function(e, t) {
                return _[t] + 365 * (e - 1970) + y((e - 1969 + (t = +(t > 1))) / 4) - y((e - 1901 + t) / 100) + y((e - 1601 + t) / 400);
            };
        }
        if (!(r = {}.hasOwnProperty)) {
            r = function(e) {
                var t, n = {};
                if ((n.__proto__ = null, n.__proto__ = {
                    toString: 1
                }, n).toString != s) {
                    r = function(e) {
                        var t = this.__proto__, n = e in (this.__proto__ = null, this);
                        this.__proto__ = t;
                        return n;
                    };
                } else {
                    t = n.constructor;
                    r = function(e) {
                        var n = (this.constructor || t).prototype;
                        return e in this && !(e in n && this[e] === n[e]);
                    };
                }
                n = null;
                return r.call(this, e);
            }
        };
        var k = {
            boolean: 1,
            number: 1,
            string: 1,
            undefined: 1
        }, x = function(e, t) {
            var n = typeof e[t];
            if (n == "object") {
                return !!e[t];
            }
            return !k[n];
        };
        o = function(e, t) {
            var n, i, a, u = 0;
            (n = function() {
                this.valueOf = 0;
            }).prototype.valueOf = 0;
            i = new n();
            for (a in i) {
                if (r.call(i, a)) {
                    u++
                };
            }
            n = i = null;
            if (u) {
                if (u == 2) {
                    o = function(e, t) {
                        var n, o = {}, i = s.call(e) == d;
                        for (n in e) {
                            if (!(i && n == "prototype" || r.call(o, n) || !(o[n] = 1) || !r.call(e, n))) {
                                t(n)
                            };
                        }
                    };
                } else {
                    o = function(e, t) {
                        var n, o, i = s.call(e) == d;
                        for (n in e) {
                            if (!(i && n == "prototype" || !r.call(e, n) || (o = n === "constructor"))) {
                                t(n)
                            };
                        }
                        if (o || r.call(e, n = "constructor")) {
                            t(n)
                        };
                    };
                }
            } else {
                i = [ "valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor" ];
                o = function(e, t) {
                    var n, o, a = s.call(e) == d, u = !a && typeof e.constructor != "function" && x(e, "hasOwnProperty") ? e.hasOwnProperty : r;
                    for (n in e) {
                        if (!(a && n == "prototype" || !u.call(e, n))) {
                            t(n)
                        };
                    }
                    for (o = i.length; n = i[--o]; u.call(e, n) && t(n)) {
                    }
                };
            }
            return o(e, t);
        };
        if (!t("json-stringify")) {
            var C = {
                92: "\\\\",
                34: '\\"',
                8: "\\b",
                12: "\\f",
                10: "\\n",
                13: "\\r",
                9: "\\t"
            }, E = "000000", T = function(e, t) {
                return (E + (t || 0)).slice(-e);
            }, S = "\\u00", D = function(e) {
                var t, n = '"', r = 0, o = e.length, i = o > 10 && b;
                for (i && (t = e.split("")); o > r; r++) {
                    var s = e.charCodeAt(r);
                    switch (s) {
                      case 8:
                      case 9:
                      case 10:
                      case 12:
                      case 13:
                      case 34:
                      case 92:
                        n += C[s];
                        break;

                      default:
                        if (s < 32) {
                            n += S + T(2, s.toString(16));
                            break;
                        }
                        if (i) {
                            n += t[r];
                        } else {
                            if (b) {
                                n += e.charAt(r);
                            } else {
                                n += e[r];
                            }
                        }
                    }
                }
                return n + '"';
            }, A = function(e, t, n, a, u, l, c) {
                var p, d, b, _, k, x, C, E, S, M, F, N, O, I, P, L;
                try {
                    p = t[e];
                } catch (R) {}
                if (typeof p == "object" && p) {
                    d = s.call(p);
                    if (d != h || r.call(p, "toJSON")) {
                        if (typeof p.toJSON == "function" && (d != f && d != m && d != g || r.call(p, "toJSON"))) {
                            p = p.toJSON(e)
                        };
                    } else if (p > -1 / 0 && 1 / 0 > p) {
                        if (w) {
                            for (k = y(p / 864e5), b = y(k / 365.2425) + 1970 - 1; w(b + 1, 0) <= k; b++) {
                            }
                            for (_ = y((k - w(b, 0)) / 30.42); w(b, _ + 1) <= k; _++) {
                            }
                            k = 1 + k - w(b, _);
                            x = (p % 864e5 + 864e5) % 864e5;
                            C = y(x / 36e5) % 24;
                            E = y(x / 6e4) % 60;
                            S = y(x / 1e3) % 60;
                            M = x % 1e3;
                        } else {
                            b = p.getUTCFullYear();
                            _ = p.getUTCMonth();
                            k = p.getUTCDate();
                            C = p.getUTCHours();
                            E = p.getUTCMinutes();
                            S = p.getUTCSeconds();
                            M = p.getUTCMilliseconds();
                        }
                        p = (b <= 0 || b >= 1e4 ? (b < 0 ? "-" : "+") + T(6, b < 0 ? -b : b) : T(4, b)) + "-" + T(2, _ + 1) + "-" + T(2, k) + "T" + T(2, C) + ":" + T(2, E) + ":" + T(2, S) + "." + T(3, M) + "Z";
                    } else {
                        p = null;
                    }
                }
                if (n) {
                    p = n.call(t, e, p)
                };
                if (p === null) {
                    return "null";
                }
                d = s.call(p);
                if (d == v) {
                    return "" + p;
                }
                if (d == f) {
                    if (p > -1 / 0 && 1 / 0 > p) {
                        return "" + p;
                    }
                    return "null";
                }
                if (d == m) {
                    return D("" + p);
                }
                if (typeof p == "object") {
                    for (I = c.length; I--; ) {
                        if (c[I] === p) {
                            throw TypeError();
                        }
                    }
                    c.push(p);
                    F = [];
                    P = l;
                    l += u;
                    if (d == g) {
                        for (O = 0, I = p.length; I > O; O++) {
                            N = A(O, p, n, a, u, l, c);
                            F.push(N === i ? "null" : N);
                        }
                        if (F.length) {
                            if (u) {
                                L = "[\n" + l + F.join(",\n" + l) + "\n" + P + "]";
                            } else {
                                L = "[" + F.join(",") + "]";
                            }
                        } else {
                            L = "[]";
                        }
                    } else {
                        o(a || p, function(e) {
                            var t = A(e, p, n, a, u, l, c);
                            if (t !== i) {
                                F.push(D(e) + ":" + (u ? " " : "") + t)
                            };
                        });
                        if (F.length) {
                            if (u) {
                                L = "{\n" + l + F.join(",\n" + l) + "\n" + P + "}";
                            } else {
                                L = "{" + F.join(",") + "}";
                            }
                        } else {
                            L = "{}";
                        }
                    }
                    c.pop();
                    return L;
                }
            };
            l.stringify = function(e, t, n) {
                var r, o, i, a;
                if (typeof t == "function" || typeof t == "object" && t) {
                    if ((a = s.call(t)) == d) {
                        o = t;
                    } else if (a == g) {
                        i = {};
                        for (var u, l = 0, c = t.length; c > l; u = t[l++], a = s.call(u), (a == m || a == f) && (i[u] = 1)) {
                        }
                    }
                }
                if (n) {
                    if ((a = s.call(n)) == f) {
                        if ((n -= n % 1) > 0) {
                            for (r = "", n > 10 && (n = 10); r.length < n; r += " ") {
                            }
                        }
                    } else {
                        if (a == m) {
                            r = n.length <= 10 ? n : n.slice(0, 10)
                        };
                    }
                }
                return A("", (u = {}, u[""] = e, u), o, i, r, "", []);
            };
        }
        if (!t("json-parse")) {
            var M, F, N = String.fromCharCode, O = {
                92: "\\",
                34: '"',
                47: "/",
                98: "\b",
                116: "\t",
                110: "\n",
                102: "\f",
                114: "\r"
            }, I = function() {
                M = F = null;
                throw SyntaxError();
            }, P = function() {
                for (var e, t, n, r, o, i = F, s = i.length; s > M; ) {
                    switch (o = i.charCodeAt(M)) {
                      case 9:
                      case 10:
                      case 13:
                      case 32:
                        M++;
                        break;

                      case 123:
                      case 125:
                      case 91:
                      case 93:
                      case 58:
                      case 44:
                        if (b) {
                            e = i.charAt(M);
                        } else {
                            e = i[M];
                        }
                        M++;
                        return e;

                      case 34:
                        for (e = "@", M++; s > M; ) {
                            o = i.charCodeAt(M);
                            if (o < 32) {
                                I();
                            } else if (o == 92) {
                                switch (o = i.charCodeAt(++M)) {
                                  case 92:
                                  case 34:
                                  case 47:
                                  case 98:
                                  case 116:
                                  case 110:
                                  case 102:
                                  case 114:
                                    e += O[o];
                                    M++;
                                    break;

                                  case 117:
                                    for (t = ++M, n = M + 4; n > M; M++) {
                                        o = i.charCodeAt(M);
                                        if (!(o >= 48 && o <= 57 || o >= 97 && o <= 102 || o >= 65 && o <= 70)) {
                                            I()
                                        };
                                    }
                                    e += N("0x" + i.slice(t, M));
                                    break;

                                  default:
                                    I();
                                }
                            } else {
                                if (o == 34) {
                                    break;
                                }
                                for (o = i.charCodeAt(M), t = M; o >= 32 && o != 92 && o != 34; ) {
                                    o = i.charCodeAt(++M);
                                }
                                e += i.slice(t, M);
                            }
                        }
                        if (i.charCodeAt(M) == 34) {
                            M++;
                            return e;
                        }
                        I();

                      default:
                        t = M;
                        if (o == 45) {
                            r = true;
                            o = i.charCodeAt(++M);
                        };
                        if (o >= 48 && o <= 57) {
                            for (o == 48 && (o = i.charCodeAt(M + 1), o >= 48 && o <= 57) && I(), r = false; s > M && (o = i.charCodeAt(M), 
                            o >= 48 && o <= 57); M++) {
                            }
                            if (i.charCodeAt(M) == 46) {
                                for (n = ++M; s > n && (o = i.charCodeAt(n), o >= 48 && o <= 57); n++) {
                                }
                                if (n == M) {
                                    I()
                                };
                                M = n;
                            }
                            o = i.charCodeAt(M);
                            if (o == 101 || o == 69) {
                                for (o = i.charCodeAt(++M), (o == 43 || o == 45) && M++, n = M; s > n && (o = i.charCodeAt(n), 
                                o >= 48 && o <= 57); n++) {
                                }
                                if (n == M) {
                                    I()
                                };
                                M = n;
                            }
                            return +i.slice(t, M);
                        }
                        if (r) {
                            I()
                        };
                        if (i.slice(M, M + 4) == "true") {
                            M += 4;
                            return true;
                        }
                        if (i.slice(M, M + 5) == "false") {
                            M += 5;
                            return false;
                        }
                        if (i.slice(M, M + 4) == "null") {
                            M += 4;
                            return null;
                        }
                        I();
                    }
                }
                return "$";
            }, L = function(e) {
                var t, n;
                if (e == "$") {
                    I()
                };
                if (typeof e == "string") {
                    if ((b ? e.charAt(0) : e[0]) == "@") {
                        return e.slice(1);
                    }
                    if (e == "[") {
                        for (t = []; e = P(), e != "]"; n || (n = true)) {
                            if (n) {
                                e == "," ? (e = P(), e == "]" && I()) : I()
                            };
                            if (e == ",") {
                                I()
                            };
                            t.push(L(e));
                        }
                        return t;
                    }
                    if (e == "{") {
                        for (t = {}; e = P(), e != "}"; n || (n = true)) {
                            if (n) {
                                e == "," ? (e = P(), e == "}" && I()) : I()
                            };
                            if (e == "," || typeof e != "string" || (b ? e.charAt(0) : e[0]) != "@" || P() != ":") {
                                I()
                            };
                            t[e.slice(1)] = L(P());
                        }
                        return t;
                    }
                    I();
                }
                return e;
            }, R = function(e, t, n) {
                var r = B(e, t, n);
                if (r === i) {
                    delete e[t];
                } else {
                    e[t] = r;
                }
            }, B = function(e, t, n) {
                var r, i = e[t];
                if (typeof i == "object" && i) {
                    if (s.call(i) == g) {
                        for (r = i.length; r--; ) {
                            R(i, r, n);
                        }
                    } else {
                        o(i, function(e) {
                            R(i, e, n);
                        });
                    }
                }
                return n.call(e, t, i);
            };
            l.parse = function(e, t) {
                var n, r;
                M = 0;
                F = "" + e;
                n = L(P());
                if (P() != "$") {
                    I()
                };
                M = F = null;
                if (t && s.call(t) == d) {
                    return B((r = {}, r[""] = n, r), "", t);
                }
                return n;
            };
        }
    }
    if (a) {
        define(function() {
            return l;
        })
    };
}(this);
