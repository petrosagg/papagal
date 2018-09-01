!function(e, r) {
    "use strict";
    if (typeof define == "function" && define.amd) {
        define(r);
    } else {
        if (typeof exports == "object") {
            module.exports = r();
        } else {
            e.returnExports = r();
        }
    }
}(this, function() {
    var e, t = Array, n = t.prototype, r = Object, o = r.prototype, i = Function.prototype, s = String, a = s.prototype, u = Number, l = u.prototype, c = n.slice, p = n.splice, d = n.push, h = n.unshift, f = n.concat, m = i.call, g = Math.max, v = Math.min, b = o.toString, y = typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol", _ = Function.prototype.toString, w = function(e) {
        try {
            _.call(e);
            return true;
        } catch (t) {
            return !1;
        }
    }, k = "[object Function]", x = "[object GeneratorFunction]";
    e = function(e) {
        if (typeof e != "function") {
            return false;
        }
        if (y) {
            return w(e);
        }
        var t = b.call(e);
        return t === k || t === x;
    };
    var C, E = RegExp.prototype.exec, T = function(e) {
        try {
            E.call(e);
            return true;
        } catch (t) {
            return !1;
        }
    }, S = "[object RegExp]";
    C = function(e) {
        if (typeof e != "object") {
            return false;
        }
        if (y) {
            return T(e);
        }
        return b.call(e) === S;
    };
    var D, A = String.prototype.valueOf, M = function(e) {
        try {
            A.call(e);
            return true;
        } catch (t) {
            return !1;
        }
    }, F = "[object String]";
    D = function(e) {
        if (typeof e == "string") {
            return true;
        }
        if (typeof e != "object") {
            return false;
        }
        if (y) {
            return M(e);
        }
        return b.call(e) === F;
    };
    var N = function(e) {
        var t, n = r.defineProperty && function() {
            try {
                var e = {};
                r.defineProperty(e, "x", {
                    enumerable: false,
                    value: e
                });
                for (var t in e) {
                    return false;
                }
                return e.x === e;
            } catch (n) {
                return !1;
            }
        }();
        if (n) {
            t = function(e, t, n, o) {
                if (!(!o && t in e)) {
                    r.defineProperty(e, t, {
                        configurable: true,
                        enumerable: false,
                        writable: true,
                        value: n
                    })
                };
            };
        } else {
            t = function(e, t, n, r) {
                if (!(!r && t in e)) {
                    e[t] = n
                };
            };
        }
        return function(n, r, o) {
            for (var i in r) {
                if (e.call(r, i)) {
                    t(n, i, r[i], o)
                };
            }
        };
    }(o.hasOwnProperty), O = function(e) {
        var t = typeof e;
        return e === null || t !== "object" && t !== "function";
    }, I = {
        ToInteger: function(e) {
            var t = +e;
            if (t !== t) {
                t = 0;
            } else {
                if (t !== 0 && t !== 1 / 0 && t !== -(1 / 0)) {
                    t = (t > 0 || -1) * Math.floor(Math.abs(t))
                };
            }
            return t;
        },
        ToPrimitive: function(t) {
            var n, r, o;
            if (O(t)) {
                return t;
            }
            r = t.valueOf;
            if (e(r) && (n = r.call(t), O(n))) {
                return n;
            }
            o = t.toString;
            if (e(o) && (n = o.call(t), O(n))) {
                return n;
            }
            throw new TypeError();
        },
        ToObject: function(e) {
            if (e == null) {
                throw new TypeError("can't convert " + e + " to object");
            }
            return r(e);
        },
        ToUint32: function(e) {
            return e >>> 0;
        }
    }, P = function() {};
    N(i, {
        bind: function(t) {
            var n = this;
            if (!e(n)) {
                throw new TypeError("Function.prototype.bind called on incompatible " + n);
            }
            for (var o, i = c.call(arguments, 1), s = function() {
                if (this instanceof o) {
                    var e = n.apply(this, f.call(i, c.call(arguments)));
                    if (r(e) === e) {
                        return e;
                    }
                    return this;
                }
                return n.apply(t, f.call(i, c.call(arguments)));
            }, a = g(0, n.length - i.length), u = [], l = 0; a > l; l++) {
                d.call(u, "$" + l);
            }
            o = Function("binder", "return function (" + u.join(",") + "){ return binder.apply(this, arguments); }")(s);
            if (n.prototype) {
                P.prototype = n.prototype;
                o.prototype = new P();
                P.prototype = null;
            };
            return o;
        }
    });
    var L = m.bind(o.hasOwnProperty), R = m.bind(o.toString), B = m.bind(a.slice), j = m.bind(a.split), $ = t.isArray || function(e) {
        return R(e) === "[object Array]";
    }, U = [].unshift(0) !== 1;
    N(n, {
        unshift: function() {
            h.apply(this, arguments);
            return this.length;
        }
    }, U);
    N(t, {
        isArray: $
    });
    var V = r("a"), H = V[0] !== "a" || !(0 in V), z = function(e) {
        var t = true, n = true;
        if (e) {
            e.call("foo", function(e, n, r) {
                if (typeof r != "object") {
                    t = false
                };
            });
            e.call([ 1 ], function() {
                "use strict";
                n = typeof this == "string";
            }, "x");
        };
        return !!e && t && n;
    };
    N(n, {
        forEach: function(t) {
            var n, r = I.ToObject(this), o = H && D(this) ? j(this, "") : r, i = -1, s = o.length >>> 0;
            if (arguments.length > 1) {
                n = arguments[1]
            };
            if (!e(t)) {
                throw new TypeError("Array.prototype.forEach callback must be a function");
            }
            for (;++i < s; ) {
                if (i in o) {
                    typeof n != "undefined" ? t.call(n, o[i], i, r) : t(o[i], i, r)
                };
            }
        }
    }, !z(n.forEach));
    N(n, {
        map: function(n) {
            var r, o = I.ToObject(this), i = H && D(this) ? j(this, "") : o, s = i.length >>> 0, a = t(s);
            if (arguments.length > 1) {
                r = arguments[1]
            };
            if (!e(n)) {
                throw new TypeError("Array.prototype.map callback must be a function");
            }
            for (var u = 0; s > u; u++) {
                if (u in i) {
                    typeof r != "undefined" ? a[u] = n.call(r, i[u], u, o) : a[u] = n(i[u], u, o)
                };
            }
            return a;
        }
    }, !z(n.map));
    N(n, {
        filter: function(t) {
            var n, r, o = I.ToObject(this), i = H && D(this) ? j(this, "") : o, s = i.length >>> 0, a = [];
            if (arguments.length > 1) {
                r = arguments[1]
            };
            if (!e(t)) {
                throw new TypeError("Array.prototype.filter callback must be a function");
            }
            for (var u = 0; s > u; u++) {
                if (u in i) {
                    n = i[u];
                    if (typeof r == "undefined" ? t(n, u, o) : t.call(r, n, u, o)) {
                        d.call(a, n)
                    };
                };
            }
            return a;
        }
    }, !z(n.filter));
    N(n, {
        every: function(t) {
            var n, r = I.ToObject(this), o = H && D(this) ? j(this, "") : r, i = o.length >>> 0;
            if (arguments.length > 1) {
                n = arguments[1]
            };
            if (!e(t)) {
                throw new TypeError("Array.prototype.every callback must be a function");
            }
            for (var s = 0; i > s; s++) {
                if (s in o && !(typeof n == "undefined" ? t(o[s], s, r) : t.call(n, o[s], s, r))) {
                    return false;
                }
            }
            return true;
        }
    }, !z(n.every));
    N(n, {
        some: function(t) {
            var n, r = I.ToObject(this), o = H && D(this) ? j(this, "") : r, i = o.length >>> 0;
            if (arguments.length > 1) {
                n = arguments[1]
            };
            if (!e(t)) {
                throw new TypeError("Array.prototype.some callback must be a function");
            }
            for (var s = 0; i > s; s++) {
                if (s in o && (typeof n == "undefined" ? t(o[s], s, r) : t.call(n, o[s], s, r))) {
                    return true;
                }
            }
            return false;
        }
    }, !z(n.some));
    var q = false;
    if (n.reduce) {
        q = typeof n.reduce.call("es5", function(e, t, n, r) {
            return r;
        }) == "object"
    };
    N(n, {
        reduce: function(t) {
            var n = I.ToObject(this), r = H && D(this) ? j(this, "") : n, o = r.length >>> 0;
            if (!e(t)) {
                throw new TypeError("Array.prototype.reduce callback must be a function");
            }
            if (o === 0 && arguments.length === 1) {
                throw new TypeError("reduce of empty array with no initial value");
            }
            var i, s = 0;
            if (arguments.length >= 2) {
                i = arguments[1];
            } else {
                for (;;) {
                    if (s in r) {
                        i = r[s++];
                        break;
                    }
                    if (++s >= o) {
                        throw new TypeError("reduce of empty array with no initial value");
                    }
                }
            }
            for (;o > s; s++) {
                if (s in r) {
                    i = t(i, r[s], s, n)
                };
            }
            return i;
        }
    }, !q);
    var W = false;
    if (n.reduceRight) {
        W = typeof n.reduceRight.call("es5", function(e, t, n, r) {
            return r;
        }) == "object"
    };
    N(n, {
        reduceRight: function(t) {
            var n = I.ToObject(this), r = H && D(this) ? j(this, "") : n, o = r.length >>> 0;
            if (!e(t)) {
                throw new TypeError("Array.prototype.reduceRight callback must be a function");
            }
            if (o === 0 && arguments.length === 1) {
                throw new TypeError("reduceRight of empty array with no initial value");
            }
            var i, s = o - 1;
            if (arguments.length >= 2) {
                i = arguments[1];
            } else {
                for (;;) {
                    if (s in r) {
                        i = r[s--];
                        break;
                    }
                    if (--s < 0) {
                        throw new TypeError("reduceRight of empty array with no initial value");
                    }
                }
            }
            if (s < 0) {
                return i;
            }
            do {
                if (s in r) {
                    i = t(i, r[s], s, n)
                };
            } while (s--);
            return i;
        }
    }, !W);
    var G = n.indexOf && [ 0, 1 ].indexOf(1, 2) !== -1;
    N(n, {
        indexOf: function(e) {
            var t = H && D(this) ? j(this, "") : I.ToObject(this), n = t.length >>> 0;
            if (n === 0) {
                return -1;
            }
            var r = 0;
            for (arguments.length > 1 && (r = I.ToInteger(arguments[1])), r = r >= 0 ? r : g(0, n + r); n > r; r++) {
                if (r in t && t[r] === e) {
                    return r;
                }
            }
            return -1;
        }
    }, G);
    var Y = n.lastIndexOf && [ 0, 1 ].lastIndexOf(0, -3) !== -1;
    N(n, {
        lastIndexOf: function(e) {
            var t = H && D(this) ? j(this, "") : I.ToObject(this), n = t.length >>> 0;
            if (n === 0) {
                return -1;
            }
            var r = n - 1;
            for (arguments.length > 1 && (r = v(r, I.ToInteger(arguments[1]))), r = r >= 0 ? r : n - Math.abs(r); r >= 0; r--) {
                if (r in t && e === t[r]) {
                    return r;
                }
            }
            return -1;
        }
    }, Y);
    var K = function() {
        var e = [ 1, 2 ], t = e.splice();
        return e.length === 2 && $(t) && t.length === 0;
    }();
    N(n, {
        splice: function(e, t) {
            if (arguments.length === 0) {
                return [];
            }
            return p.apply(this, arguments);
        }
    }, !K);
    var Z = function() {
        var e = {};
        n.splice.call(e, 0, 0, 1);
        return e.length === 1;
    }();
    N(n, {
        splice: function(e, t) {
            if (arguments.length === 0) {
                return [];
            }
            var n = arguments;
            this.length = g(I.ToInteger(this.length), 0);
            if (arguments.length > 0 && typeof t != "number") {
                n = c.call(arguments);
                if (n.length < 2) {
                    d.call(n, this.length - e);
                } else {
                    n[1] = I.ToInteger(t);
                }
            };
            return p.apply(this, n);
        }
    }, !Z);
    var J = function() {
        var e = new t(1e5);
        e[8] = "x";
        e.splice(1, 1);
        return e.indexOf("x") === 7;
    }(), Q = function() {
        var e = 256, t = [];
        t[e] = "a";
        t.splice(e + 1, 0, "b");
        return t[e] === "a";
    }();
    N(n, {
        splice: function(e, t) {
            for (var n, r = I.ToObject(this), o = [], i = I.ToUint32(r.length), a = I.ToInteger(e), u = a < 0 ? g(i + a, 0) : v(a, i), l = v(g(I.ToInteger(t), 0), i - u), p = 0; l > p; ) {
                n = s(u + p);
                if (L(r, n)) {
                    o[p] = r[n]
                };
                p += 1;
            }
            var d, h = c.call(arguments, 2), f = h.length;
            if (l > f) {
                for (p = u; i - l > p; ) {
                    n = s(p + l);
                    d = s(p + f);
                    if (L(r, n)) {
                        r[d] = r[n];
                    } else {
                        delete r[d];
                    }
                    p += 1;
                }
                for (p = i; p > i - l + f; ) {
                    delete r[p - 1];
                    p -= 1;
                }
            } else if (f > l) {
                for (p = i - l; p > u; ) {
                    n = s(p + l - 1);
                    d = s(p + f - 1);
                    if (L(r, n)) {
                        r[d] = r[n];
                    } else {
                        delete r[d];
                    }
                    p -= 1;
                }
            }
            p = u;
            for (var m = 0; m < h.length; ++m) {
                r[p] = h[m];
                p += 1;
            }
            r.length = i - l + f;
            return o;
        }
    }, !J || !Q);
    var X = !{
        toString: null
    }.propertyIsEnumerable("toString"), ee = function() {}.propertyIsEnumerable("prototype"), te = !L("x", "0"), ne = function(e) {
        var t = e.constructor;
        return t && t.prototype === e;
    }, re = {
        $window: true,
        $console: true,
        $parent: true,
        $self: true,
        $frames: true,
        $frameElement: true,
        $webkitIndexedDB: true,
        $webkitStorageInfo: true
    }, oe = function() {
        if (typeof window == "undefined") {
            return false;
        }
        for (var e in window) {
            if (!re["$" + e] && L(window, e) && window[e] !== null && typeof window[e] == "object") {
                try {
                    ne(window[e]);
                } catch (t) {
                    return !0;
                }
            }
        }
        return false;
    }(), ie = function(e) {
        if (typeof window == "undefined" || !oe) {
            return ne(e);
        }
        try {
            return ne(e);
        } catch (t) {
            return !1;
        }
    }, se = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ], ae = se.length, ue = function(e) {
        return R(e) === "[object Arguments]";
    }, le = function(t) {
        return t !== null && typeof t == "object" && typeof t.length == "number" && t.length >= 0 && !$(t) && e(t.callee);
    }, ce = ue(arguments) ? ue : le;
    N(r, {
        keys: function(t) {
            var n = e(t), r = ce(t), o = t !== null && typeof t == "object", i = o && D(t);
            if (!o && !n && !r) {
                throw new TypeError("Object.keys called on a non-object");
            }
            var a = [], u = ee && n;
            if (i && te || r) {
                for (var l = 0; l < t.length; ++l) {
                    d.call(a, s(l));
                }
            }
            if (!r) {
                for (var c in t) {
                    if (!(u && c === "prototype" || !L(t, c))) {
                        d.call(a, s(c))
                    };
                }
            }
            if (X) {
                for (var p = ie(t), h = 0; ae > h; h++) {
                    var f = se[h];
                    if (!(p && f === "constructor" || !L(t, f))) {
                        d.call(a, f)
                    };
                }
            }
            return a;
        }
    });
    var pe = r.keys && function() {
        return r.keys(arguments).length === 2;
    }(1, 2), de = r.keys && function() {
        var e = r.keys(arguments);
        return arguments.length !== 1 || e.length !== 1 || e[0] !== 1;
    }(1), he = r.keys;
    N(r, {
        keys: function(e) {
            return he(ce(e) ? c.call(e) : e);
        }
    }, !pe || de);
    var fe = -621987552e5, me = "-000001", ge = Date.prototype.toISOString && new Date(fe).toISOString().indexOf(me) === -1, ve = Date.prototype.toISOString && new Date(-1).toISOString() !== "1969-12-31T23:59:59.999Z";
    N(Date.prototype, {
        toISOString: function() {
            var e, t, n, r, o;
            if (!isFinite(this)) {
                throw new RangeError("Date.prototype.toISOString called on non-finite value.");
            }
            for (r = this.getUTCFullYear(), o = this.getUTCMonth(), r += Math.floor(o / 12), 
            o = (o % 12 + 12) % 12, e = [ o + 1, this.getUTCDate(), this.getUTCHours(), this.getUTCMinutes(), this.getUTCSeconds() ], 
            r = (r < 0 ? "-" : r > 9999 ? "+" : "") + B("00000" + Math.abs(r), r >= 0 && r <= 9999 ? -4 : -6), 
            t = e.length; t--; ) {
                n = e[t];
                if (n < 10) {
                    e[t] = "0" + n
                };
            }
            return r + "-" + c.call(e, 0, 2).join("-") + "T" + c.call(e, 2).join(":") + "." + B("000" + this.getUTCMilliseconds(), -3) + "Z";
        }
    }, ge || ve);
    var be = function() {
        try {
            return Date.prototype.toJSON && new Date(NaN).toJSON() === null && new Date(fe).toJSON().indexOf(me) !== -1 && Date.prototype.toJSON.call({
                toISOString: function() {
                    return true;
                }
            });
        } catch (e) {
            return !1;
        }
    }();
    if (!be) {
        Date.prototype.toJSON = function(t) {
            var n = r(this), o = I.ToPrimitive(n);
            if (typeof o == "number" && !isFinite(o)) {
                return null;
            }
            var i = n.toISOString;
            if (!e(i)) {
                throw new TypeError("toISOString property is not callable");
            }
            return i.call(n);
        }
    };
    var ye = Date.parse("+033658-09-27T01:46:40.000Z") === 1e15, _e = !isNaN(Date.parse("2012-04-04T24:00:00.500Z")) || !isNaN(Date.parse("2012-11-31T23:59:59.000Z")) || !isNaN(Date.parse("2012-12-31T23:59:60.000Z")), we = isNaN(Date.parse("2000-01-01T00:00:00.000Z"));
    if (we || _e || !ye) {
        Date = function(e) {
            var t = function(n, r, o, i, a, u, l) {
                var c, p = arguments.length;
                if (this instanceof e) {
                    if (p === 1 && s(n) === n) {
                        c = new e(t.parse(n));
                    } else {
                        if (p >= 7) {
                            c = new e(n, r, o, i, a, u, l);
                        } else {
                            if (p >= 6) {
                                c = new e(n, r, o, i, a, u);
                            } else {
                                if (p >= 5) {
                                    c = new e(n, r, o, i, a);
                                } else {
                                    if (p >= 4) {
                                        c = new e(n, r, o, i);
                                    } else {
                                        if (p >= 3) {
                                            c = new e(n, r, o);
                                        } else {
                                            if (p >= 2) {
                                                c = new e(n, r);
                                            } else {
                                                if (p >= 1) {
                                                    c = new e(n);
                                                } else {
                                                    c = new e();
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    c = e.apply(this, arguments);
                }
                if (!O(c)) {
                    N(c, {
                        constructor: t
                    }, true)
                };
                return c;
            }, n = new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"), r = [ 0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365 ], o = function(e, t) {
                var n = t > 1 ? 1 : 0;
                return r[t] + Math.floor((e - 1969 + n) / 4) - Math.floor((e - 1901 + n) / 100) + Math.floor((e - 1601 + n) / 400) + 365 * (e - 1970);
            }, i = function(t) {
                return u(new e(1970, 0, 1, 0, 0, 0, t));
            };
            for (var a in e) {
                if (L(e, a)) {
                    t[a] = e[a]
                };
            }
            N(t, {
                now: e.now,
                UTC: e.UTC
            }, true);
            t.prototype = e.prototype;
            N(t.prototype, {
                constructor: t
            }, true);
            var l = function(t) {
                var r = n.exec(t);
                if (r) {
                    var s, a = u(r[1]), l = u(r[2] || 1) - 1, c = u(r[3] || 1) - 1, p = u(r[4] || 0), d = u(r[5] || 0), h = u(r[6] || 0), f = Math.floor(1e3 * u(r[7] || 0)), m = Boolean(r[4] && !r[8]), g = r[9] === "-" ? 1 : -1, v = u(r[10] || 0), b = u(r[11] || 0);
                    if ((d > 0 || h > 0 || f > 0 ? 24 : 25) > p && d < 60 && h < 60 && f < 1e3 && l > -1 && l < 12 && v < 24 && b < 60 && c > -1 && c < o(a, l + 1) - o(a, l) && (s = 60 * (24 * (o(a, l) + c) + p + v * g), 
                    s = 1e3 * (60 * (s + d + b * g) + h) + f, m && (s = i(s)), s >= -864e13 && s <= 864e13)) {
                        return s;
                    }
                    return NaN;
                }
                return e.parse.apply(this, arguments);
            };
            N(t, {
                parse: l
            });
            return t;
        }(Date)
    };
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        }
    };
    var ke = l.toFixed && (8e-5.toFixed(3) !== "0.000" || .9.toFixed(0) !== "1" || 1.255.toFixed(2) !== "1.25" || (0xde0b6b3a7640080).toFixed(0) !== "1000000000000000128"), xe = {
        base: 1e7,
        size: 6,
        data: [ 0, 0, 0, 0, 0, 0 ],
        multiply: function(e, t) {
            for (var n = -1, r = t; ++n < xe.size; ) {
                r += e * xe.data[n];
                xe.data[n] = r % xe.base;
                r = Math.floor(r / xe.base);
            }
        },
        divide: function(e) {
            for (var t = xe.size, n = 0; --t >= 0; ) {
                n += xe.data[t];
                xe.data[t] = Math.floor(n / e);
                n = n % e * xe.base;
            }
        },
        numToString: function() {
            for (var e = xe.size, t = ""; --e >= 0; ) {
                if (t !== "" || e === 0 || xe.data[e] !== 0) {
                    var n = s(xe.data[e]);
                    if (t === "") {
                        t = n;
                    } else {
                        t += B("0000000", 0, 7 - n.length) + n;
                    }
                }
            }
            return t;
        },
        pow: function Ie(e, t, n) {
            if (t === 0) {
                return n;
            }
            if (t % 2 === 1) {
                return Ie(e, t - 1, n * e);
            }
            return Ie(e * e, t / 2, n);
        },
        log: function(e) {
            for (var t = 0, n = e; n >= 4096; ) {
                t += 12;
                n /= 4096;
            }
            for (;n >= 2; ) {
                t += 1;
                n /= 2;
            }
            return t;
        }
    };
    N(l, {
        toFixed: function(e) {
            var t, n, r, o, i, a, l, c;
            t = u(e);
            if (t !== t) {
                t = 0;
            } else {
                t = Math.floor(t);
            }
            if (t < 0 || t > 20) {
                throw new RangeError("Number.toFixed called with invalid number of decimals");
            }
            n = u(this);
            if (n !== n) {
                return "NaN";
            }
            if (n <= -1e21 || n >= 1e21) {
                return s(n);
            }
            r = "";
            if (n < 0) {
                r = "-";
                n = -n;
            };
            o = "0";
            if (n > 1e-21) {
                i = xe.log(n * xe.pow(2, 69, 1)) - 69;
                if (i < 0) {
                    a = n * xe.pow(2, -i, 1);
                } else {
                    a = n / xe.pow(2, i, 1);
                }
                a *= 4503599627370496;
                i = 52 - i;
                if (i > 0) {
                    for (xe.multiply(0, a), l = t; l >= 7; ) {
                        xe.multiply(1e7, 0);
                        l -= 7;
                    }
                    for (xe.multiply(xe.pow(10, l, 1), 0), l = i - 1; l >= 23; ) {
                        xe.divide(1 << 23);
                        l -= 23;
                    }
                    xe.divide(1 << l);
                    xe.multiply(1, 1);
                    xe.divide(2);
                    o = xe.numToString();
                } else {
                    xe.multiply(0, a);
                    xe.multiply(1 << -i, 0);
                    o = xe.numToString() + B("0.00000000000000000000", 2, 2 + t);
                }
            }
            if (t > 0) {
                c = o.length;
                if (t >= c) {
                    o = r + B("0.0000000000000000000", 0, t - c + 2) + o;
                } else {
                    o = r + B(o, 0, c - t) + "." + B(o, c - t);
                }
            } else {
                o = r + o;
            }
            return o;
        }
    }, ke);
    if ("ab".split(/(?:ab)*/).length !== 2 || ".".split(/(.?)(.?)/).length !== 4 || "tesst".split(/(s)*/)[1] === "t" || "test".split(/(?:)/, -1).length !== 4 || "".split(/.?/).length || ".".split(/()()/).length > 1) {
        !function() {
            var e = typeof /()??/.exec("")[1] == "undefined";
            a.split = function(t, n) {
                var r = this;
                if (typeof t == "undefined" && n === 0) {
                    return [];
                }
                if (!C(t)) {
                    return j(this, t, n);
                }
                var o, i, s, a, u = [], l = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), p = 0, h = new RegExp(t.source, l + "g");
                r += "";
                if (!e) {
                    o = new RegExp("^" + h.source + "$(?!\\s)", l)
                };
                var f = typeof n == "undefined" ? -1 >>> 0 : I.ToUint32(n);
                for (i = h.exec(r); i && (s = i.index + i[0].length, !(s > p && (d.call(u, B(r, p, i.index)), 
                !e && i.length > 1 && i[0].replace(o, function() {
                    for (var e = 1; e < arguments.length - 2; e++) {
                        if (typeof arguments[e] == "undefined") {
                            i[e] = undefined
                        };
                    }
                }), i.length > 1 && i.index < r.length && d.apply(u, c.call(i, 1)), a = i[0].length, 
                p = s, u.length >= f))); ) {
                    if (h.lastIndex === i.index) {
                        h.lastIndex++
                    };
                    i = h.exec(r);
                }
                if (p === r.length) {
                    if (a || !h.test("")) {
                        d.call(u, "")
                    };
                } else {
                    d.call(u, B(r, p));
                }
                if (u.length > f) {
                    return B(u, 0, f);
                }
                return u;
            };
        }();
    } else {
        if ("0".split(undefined, 0).length) {
            a.split = function(e, t) {
                if (typeof e == "undefined" && t === 0) {
                    return [];
                }
                return j(this, e, t);
            }
        };
    }
    var Ce = a.replace, Ee = function() {
        var e = [];
        "x".replace(/x(.)?/g, function(t, n) {
            d.call(e, n);
        });
        return e.length === 1 && typeof e[0] == "undefined";
    }();
    if (!Ee) {
        a.replace = function(t, n) {
            var r = e(n), o = C(t) && /\)[*?]/.test(t.source);
            if (r && o) {
                var i = function(e) {
                    var r = arguments.length, o = t.lastIndex;
                    t.lastIndex = 0;
                    var i = t.exec(e) || [];
                    t.lastIndex = o;
                    d.call(i, arguments[r - 2], arguments[r - 1]);
                    return n.apply(this, i);
                };
                return Ce.call(this, t, i);
            }
            return Ce.call(this, t, n);
        }
    };
    var Te = a.substr, Se = "".substr && "0b".substr(-1) !== "b";
    N(a, {
        substr: function(e, t) {
            var n = e;
            if (e < 0) {
                n = g(this.length + e, 0)
            };
            return Te.call(this, n, t);
        }
    }, Se);
    var De = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff", Ae = "​", Me = "[" + De + "]", Fe = new RegExp("^" + Me + Me + "*"), Ne = new RegExp(Me + Me + "*$"), Oe = a.trim && (De.trim() || !Ae.trim());
    N(a, {
        trim: function() {
            if (typeof this == "undefined" || this === null) {
                throw new TypeError("can't convert " + this + " to object");
            }
            return s(this).replace(Fe, "").replace(Ne, "");
        }
    }, Oe);
    if (parseInt(De + "08") !== 8 || parseInt(De + "0x16") !== 22) {
        parseInt = function(e) {
            var t = /^0[xX]/;
            return function(n, r) {
                var o = s(n).trim(), i = u(r) || (t.test(o) ? 16 : 10);
                return e(o, i);
            };
        }(parseInt)
    };
});
