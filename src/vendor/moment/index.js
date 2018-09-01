!function(e, r) {
    if (typeof exports == "object" && typeof module != "undefined") {
        module.exports = r();
    } else {
        if (typeof define == "function" && define.amd) {
            define(r);
        } else {
            e.moment = r();
        }
    }
}(this, function() {
    "use strict";
    function n() {
        return Ln.apply(null, arguments);
    }
    function r(e) {
        Ln = e;
    }
    function o(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    }
    function i(e) {
        return e instanceof Date || Object.prototype.toString.call(e) === "[object Date]";
    }
    function s(e, t) {
        var n, r = [];
        for (n = 0; n < e.length; ++n) {
            r.push(t(e[n], n));
        }
        return r;
    }
    function a(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    function u(e, t) {
        for (var n in t) {
            if (a(t, n)) {
                e[n] = t[n]
            };
        }
        if (a(t, "toString")) {
            e.toString = t.toString
        };
        if (a(t, "valueOf")) {
            e.valueOf = t.valueOf
        };
        return e;
    }
    function l(e, t, n, r) {
        return Me(e, t, n, r, true).utc();
    }
    function c() {
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false
        };
    }
    function p(e) {
        if (e._pf == null) {
            e._pf = c()
        };
        return e._pf;
    }
    function d(e) {
        if (e._isValid == null) {
            var t = p(e);
            e._isValid = !(isNaN(e._d.getTime()) || !(t.overflow < 0) || t.empty || t.invalidMonth || t.invalidWeekday || t.nullInput || t.invalidFormat || t.userInvalidated);
            if (e._strict) {
                e._isValid = e._isValid && t.charsLeftOver === 0 && t.unusedTokens.length === 0 && t.bigHour === undefined
            };
        }
        return e._isValid;
    }
    function h(e) {
        var t = l(NaN);
        if (e != null) {
            u(p(t), e);
        } else {
            p(t).userInvalidated = true;
        }
        return t;
    }
    function f(e, t) {
        var n, r, o;
        if (typeof t._isAMomentObject != "undefined") {
            e._isAMomentObject = t._isAMomentObject
        };
        if (typeof t._i != "undefined") {
            e._i = t._i
        };
        if (typeof t._f != "undefined") {
            e._f = t._f
        };
        if (typeof t._l != "undefined") {
            e._l = t._l
        };
        if (typeof t._strict != "undefined") {
            e._strict = t._strict
        };
        if (typeof t._tzm != "undefined") {
            e._tzm = t._tzm
        };
        if (typeof t._isUTC != "undefined") {
            e._isUTC = t._isUTC
        };
        if (typeof t._offset != "undefined") {
            e._offset = t._offset
        };
        if (typeof t._pf != "undefined") {
            e._pf = p(t)
        };
        if (typeof t._locale != "undefined") {
            e._locale = t._locale
        };
        if (Bn.length > 0) {
            for (n in Bn) {
                r = Bn[n];
                o = t[r];
                if (typeof o != "undefined") {
                    e[r] = o
                };
            }
        }
        return e;
    }
    function m(e) {
        f(this, e);
        this._d = new Date(e._d != null ? e._d.getTime() : NaN);
        if (jn === false) {
            jn = true;
            n.updateOffset(this);
            jn = false;
        };
    }
    function g(e) {
        return e instanceof m || e != null && e._isAMomentObject != null;
    }
    function v(e) {
        if (e < 0) {
            return Math.ceil(e);
        }
        return Math.floor(e);
    }
    function b(e) {
        var t = +e, n = 0;
        if (t !== 0 && isFinite(t)) {
            n = v(t)
        };
        return n;
    }
    function y(e, t, n) {
        var r, o = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), s = 0;
        for (r = 0; o > r; r++) {
            if (n && e[r] !== t[r] || !n && b(e[r]) !== b(t[r])) {
                s++
            };
        }
        return s + i;
    }
    function _() {}
    function w(e) {
        if (e) {
            return e.toLowerCase().replace("_", "-");
        }
        return e;
    }
    function k(e) {
        for (var t, n, r, o, i = 0; i < e.length; ) {
            for (o = w(e[i]).split("-"), t = o.length, n = w(e[i + 1]), n = n ? n.split("-") : null; t > 0; ) {
                r = x(o.slice(0, t).join("-"));
                if (r) {
                    return r;
                }
                if (n && n.length >= t && y(o, n, true) >= t - 1) {
                    break;
                }
                t--;
            }
            i++;
        }
        return null;
    }
    function x(n) {
        var r = null;
        if (!$n[n] && typeof module != "undefined" && module && module.exports) {
            try {
                r = Rn._abbr;
                require("./locale/" + n);
                C(r);
            } catch (o) {}
        }
        return $n[n];
    }
    function C(e, t) {
        var n;
        if (e) {
            if (typeof t == "undefined") {
                n = T(e);
            } else {
                n = E(e, t);
            }
            if (n) {
                Rn = n
            };
        };
        return Rn._abbr;
    }
    function E(e, t) {
        if (t !== null) {
            t.abbr = e;
            $n[e] = $n[e] || new _();
            $n[e].set(t);
            C(e);
            return $n[e];
        }
        delete $n[e];
        return null;
    }
    function T(e) {
        var t;
        if (e && e._locale && e._locale._abbr) {
            e = e._locale._abbr
        };
        if (!e) {
            return Rn;
        }
        if (!o(e)) {
            t = x(e);
            if (t) {
                return t;
            }
            e = [ e ];
        }
        return k(e);
    }
    function S(e, t) {
        var n = e.toLowerCase();
        Un[n] = Un[n + "s"] = Un[t] = e;
    }
    function D(e) {
        if (typeof e == "string") {
            return Un[e] || Un[e.toLowerCase()];
        }
        return;
    }
    function A(e) {
        var t, n, r = {};
        for (n in e) {
            if (a(e, n)) {
                t = D(n);
                if (t) {
                    r[t] = e[n]
                };
            };
        }
        return r;
    }
    function M(e, t) {
        return function(r) {
            if (r != null) {
                N(this, e, r);
                n.updateOffset(this, t);
                return this;
            }
            return F(this, e);
        };
    }
    function F(e, t) {
        return e._d["get" + (e._isUTC ? "UTC" : "") + t]();
    }
    function N(e, t, n) {
        return e._d["set" + (e._isUTC ? "UTC" : "") + t](n);
    }
    function O(e, t) {
        var n;
        if (typeof e == "object") {
            for (n in e) {
                this.set(n, e[n]);
            }
        } else {
            e = D(e);
            if (typeof this[e] == "function") {
                return this[e](t);
            }
        }
        return this;
    }
    function I(e, t, n) {
        var r = "" + Math.abs(e), o = t - r.length, i = e >= 0;
        return (i ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, o)).toString().substr(1) + r;
    }
    function P(e, t, n, r) {
        var o = r;
        if (typeof r == "string") {
            o = function() {
                return this[r]();
            }
        };
        if (e) {
            qn[e] = o
        };
        if (t) {
            qn[t[0]] = function() {
                return I(o.apply(this, arguments), t[1], t[2]);
            }
        };
        if (n) {
            qn[n] = function() {
                return this.localeData().ordinal(o.apply(this, arguments), e);
            }
        };
    }
    function L(e) {
        if (e.match(/\[[\s\S]/)) {
            return e.replace(/^\[|\]$/g, "");
        }
        return e.replace(/\\/g, "");
    }
    function R(e) {
        var t, n, r = e.match(Vn);
        for (t = 0, n = r.length; n > t; t++) {
            if (qn[r[t]]) {
                r[t] = qn[r[t]];
            } else {
                r[t] = L(r[t]);
            }
        }
        return function(o) {
            var i = "";
            for (t = 0; n > t; t++) {
                if (r[t] instanceof Function) {
                    i += r[t].call(o, e);
                } else {
                    i += r[t];
                }
            }
            return i;
        };
    }
    function B(e, t) {
        if (e.isValid()) {
            t = j(t, e.localeData());
            zn[t] = zn[t] || R(t);
            return zn[t](e);
        }
        return e.localeData().invalidDate();
    }
    function j(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e;
        }
        var r = 5;
        for (Hn.lastIndex = 0; r >= 0 && Hn.test(e); ) {
            e = e.replace(Hn, n);
            Hn.lastIndex = 0;
            r -= 1;
        }
        return e;
    }
    function $(e) {
        return typeof e == "function" && Object.prototype.toString.call(e) === "[object Function]";
    }
    function U(e, t, n) {
        if ($(t)) {
            sr[e] = t;
        } else {
            sr[e] = function(e) {
                if (e && n) {
                    return n;
                }
                return t;
            };
        }
    }
    function V(e, t) {
        if (a(sr, e)) {
            return sr[e](t._strict, t._locale);
        }
        return new RegExp(H(e));
    }
    function H(e) {
        return e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, r, o) {
            return t || n || r || o;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function z(e, t) {
        var n, r = t;
        for (typeof e == "string" && (e = [ e ]), typeof t == "number" && (r = function(e, n) {
            n[t] = b(e);
        }), n = 0; n < e.length; n++) {
            ar[e[n]] = r;
        }
    }
    function q(e, t) {
        z(e, function(e, n, r, o) {
            r._w = r._w || {};
            t(e, r._w, r, o);
        });
    }
    function W(e, t, n) {
        if (t != null && a(ar, e)) {
            ar[e](t, n._a, n, e)
        };
    }
    function G(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate();
    }
    function Y(e) {
        return this._months[e.month()];
    }
    function K(e) {
        return this._monthsShort[e.month()];
    }
    function Z(e, t, n) {
        var r, o, i;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
        r = 0; r < 12; r++) {
            o = l([ 2e3, r ]);
            if (n && !this._longMonthsParse[r]) {
                this._longMonthsParse[r] = new RegExp("^" + this.months(o, "").replace(".", "") + "$", "i");
                this._shortMonthsParse[r] = new RegExp("^" + this.monthsShort(o, "").replace(".", "") + "$", "i");
            };
            if (!(n || this._monthsParse[r])) {
                i = "^" + this.months(o, "") + "|^" + this.monthsShort(o, "");
                this._monthsParse[r] = new RegExp(i.replace(".", ""), "i");
            };
            if (n && t === "MMMM" && this._longMonthsParse[r].test(e)) {
                return r;
            }
            if (n && t === "MMM" && this._shortMonthsParse[r].test(e)) {
                return r;
            }
            if (!n && this._monthsParse[r].test(e)) {
                return r;
            }
        }
    }
    function J(e, t) {
        var n;
        if (typeof t == "string" && (t = e.localeData().monthsParse(t), typeof t != "number")) {
            return e;
        }
        n = Math.min(e.date(), G(e.year(), t));
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n);
        return e;
    }
    function Q(e) {
        if (e != null) {
            J(this, e);
            n.updateOffset(this, true);
            return this;
        }
        return F(this, "Month");
    }
    function X() {
        return G(this.year(), this.month());
    }
    function ee(e) {
        var t, n = e._a;
        if (n && p(e).overflow === -2) {
            if (n[lr] < 0 || n[lr] > 11) {
                t = lr;
            } else {
                if (n[cr] < 1 || n[cr] > G(n[ur], n[lr])) {
                    t = cr;
                } else {
                    if (n[pr] < 0 || n[pr] > 24 || n[pr] === 24 && (n[dr] !== 0 || n[hr] !== 0 || n[fr] !== 0)) {
                        t = pr;
                    } else {
                        if (n[dr] < 0 || n[dr] > 59) {
                            t = dr;
                        } else {
                            if (n[hr] < 0 || n[hr] > 59) {
                                t = hr;
                            } else {
                                if (n[fr] < 0 || n[fr] > 999) {
                                    t = fr;
                                } else {
                                    t = -1;
                                }
                            }
                        }
                    }
                }
            }
            if (p(e)._overflowDayOfYear && (ur > t || t > cr)) {
                t = cr
            };
            p(e).overflow = t;
        };
        return e;
    }
    function te(e) {
        if (n.suppressDeprecationWarnings === false && typeof console != "undefined" && console.warn) {
            console.warn("Deprecation warning: " + e)
        };
    }
    function ne(e, t) {
        var n = true;
        return u(function() {
            if (n) {
                te(e + "\n" + new Error().stack);
                n = false;
            };
            return t.apply(this, arguments);
        }, t);
    }
    function re(e, t) {
        if (!vr[e]) {
            te(t);
            vr[e] = true;
        };
    }
    function oe(e) {
        var t, n, r = e._i, o = br.exec(r);
        if (o) {
            for (p(e).iso = true, t = 0, n = yr.length; n > t; t++) {
                if (yr[t][1].exec(r)) {
                    e._f = yr[t][0];
                    break;
                }
            }
            for (t = 0, n = _r.length; n > t; t++) {
                if (_r[t][1].exec(r)) {
                    e._f += (o[6] || " ") + _r[t][0];
                    break;
                }
            }
            if (r.match(rr)) {
                e._f += "Z"
            };
            xe(e);
        } else {
            e._isValid = false;
        }
    }
    function ie(e) {
        var t = wr.exec(e._i);
        if (t !== null) {
            return void (e._d = new Date(+t[1]));
        }
        oe(e);
        return void (e._isValid === false && (delete e._isValid, n.createFromInputFallback(e)));
    }
    function se(e, t, n, r, o, i, s) {
        var a = new Date(e, t, n, r, o, i, s);
        if (e < 1970) {
            a.setFullYear(e)
        };
        return a;
    }
    function ae(e) {
        var t = new Date(Date.UTC.apply(null, arguments));
        if (e < 1970) {
            t.setUTCFullYear(e)
        };
        return t;
    }
    function ue(e) {
        if (le(e)) {
            return 366;
        }
        return 365;
    }
    function le(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0;
    }
    function ce() {
        return le(this.year());
    }
    function pe(e, t, n) {
        var r, o = n - t, i = n - e.day();
        if (i > o) {
            i -= 7
        };
        if (o - 7 > i) {
            i += 7
        };
        r = Fe(e).add(i, "d");
        return {
            week: Math.ceil(r.dayOfYear() / 7),
            year: r.year()
        };
    }
    function de(e) {
        return pe(e, this._week.dow, this._week.doy).week;
    }
    function he() {
        return this._week.dow;
    }
    function fe() {
        return this._week.doy;
    }
    function me(e) {
        var t = this.localeData().week(this);
        if (e == null) {
            return t;
        }
        return this.add(7 * (e - t), "d");
    }
    function ge(e) {
        var t = pe(this, 1, 4).week;
        if (e == null) {
            return t;
        }
        return this.add(7 * (e - t), "d");
    }
    function ve(e, t, n, r, o) {
        var i, s = 6 + o - r, a = ae(e, 0, 1 + s), u = a.getUTCDay();
        if (o > u) {
            u += 7
        };
        if (n != null) {
            n = 1 * n;
        } else {
            n = o;
        }
        i = 1 + s + 7 * (t - 1) - u + n;
        return {
            year: i > 0 ? e : e - 1,
            dayOfYear: i > 0 ? i : ue(e - 1) + i
        };
    }
    function be(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        if (e == null) {
            return t;
        }
        return this.add(e - t, "d");
    }
    function ye(e, t, n) {
        if (e != null) {
            return e;
        }
        if (t != null) {
            return t;
        }
        return n;
    }
    function _e(e) {
        var t = new Date();
        if (e._useUTC) {
            return [ t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate() ];
        }
        return [ t.getFullYear(), t.getMonth(), t.getDate() ];
    }
    function we(e) {
        var t, n, r, o, i = [];
        if (!e._d) {
            for (r = _e(e), e._w && e._a[cr] == null && e._a[lr] == null && ke(e), e._dayOfYear && (o = ye(e._a[ur], r[ur]), 
            e._dayOfYear > ue(o) && (p(e)._overflowDayOfYear = true), n = ae(o, 0, e._dayOfYear), 
            e._a[lr] = n.getUTCMonth(), e._a[cr] = n.getUTCDate()), t = 0; t < 3 && e._a[t] == null; ++t) {
                e._a[t] = i[t] = r[t];
            }
            for (;t < 7; t++) {
                e._a[t] = i[t] = e._a[t] == null ? t === 2 ? 1 : 0 : e._a[t];
            }
            if (e._a[pr] === 24 && e._a[dr] === 0 && e._a[hr] === 0 && e._a[fr] === 0) {
                e._nextDay = true;
                e._a[pr] = 0;
            };
            e._d = (e._useUTC ? ae : se).apply(null, i);
            if (e._tzm != null) {
                e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm)
            };
            if (e._nextDay) {
                e._a[pr] = 24
            };
        }
    }
    function ke(e) {
        var t, n, r, o, i, s, a;
        t = e._w;
        if (t.GG != null || t.W != null || t.E != null) {
            i = 1;
            s = 4;
            n = ye(t.GG, e._a[ur], pe(Fe(), 1, 4).year);
            r = ye(t.W, 1);
            o = ye(t.E, 1);
        } else {
            i = e._locale._week.dow;
            s = e._locale._week.doy;
            n = ye(t.gg, e._a[ur], pe(Fe(), i, s).year);
            r = ye(t.w, 1);
            if (t.d != null) {
                o = t.d;
                if (i > o) {
                    ++r
                };
            } else {
                if (t.e != null) {
                    o = t.e + i;
                } else {
                    o = i;
                }
            }
        }
        a = ve(n, r, o, s, i);
        e._a[ur] = a.year;
        e._dayOfYear = a.dayOfYear;
    }
    function xe(e) {
        if (e._f === n.ISO_8601) {
            return void oe(e);
        }
        e._a = [];
        p(e).empty = true;
        var t, r, o, i, s, a = "" + e._i, u = a.length, l = 0;
        for (o = j(e._f, e._locale).match(Vn) || [], t = 0; t < o.length; t++) {
            i = o[t];
            r = (a.match(V(i, e)) || [])[0];
            if (r) {
                s = a.substr(0, a.indexOf(r));
                if (s.length > 0) {
                    p(e).unusedInput.push(s)
                };
                a = a.slice(a.indexOf(r) + r.length);
                l += r.length;
            };
            if (qn[i]) {
                if (r) {
                    p(e).empty = false;
                } else {
                    p(e).unusedTokens.push(i);
                }
                W(i, r, e);
            } else {
                if (e._strict && !r) {
                    p(e).unusedTokens.push(i)
                };
            }
        }
        p(e).charsLeftOver = u - l;
        if (a.length > 0) {
            p(e).unusedInput.push(a)
        };
        if (p(e).bigHour === true && e._a[pr] <= 12 && e._a[pr] > 0) {
            p(e).bigHour = undefined
        };
        e._a[pr] = Ce(e._locale, e._a[pr], e._meridiem);
        we(e);
        ee(e);
    }
    function Ce(e, t, n) {
        var r;
        if (n == null) {
            return t;
        }
        if (e.meridiemHour != null) {
            return e.meridiemHour(t, n);
        }
        if (e.isPM != null) {
            r = e.isPM(n);
            if (r && t < 12) {
                t += 12
            };
            if (!(r || t !== 12)) {
                t = 0
            };
            return t;
        }
        return t;
    }
    function Ee(e) {
        var t, n, r, o, i;
        if (e._f.length === 0) {
            p(e).invalidFormat = true;
            return void (e._d = new Date(NaN));
        }
        for (o = 0; o < e._f.length; o++) {
            i = 0;
            t = f({}, e);
            if (e._useUTC != null) {
                t._useUTC = e._useUTC
            };
            t._f = e._f[o];
            xe(t);
            if (d(t)) {
                i += p(t).charsLeftOver;
                i += 10 * p(t).unusedTokens.length;
                p(t).score = i;
                if (r == null || r > i) {
                    r = i;
                    n = t;
                };
            };
        }
        u(e, n || t);
    }
    function Te(e) {
        if (!e._d) {
            var t = A(e._i);
            e._a = [ t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond ];
            we(e);
        }
    }
    function Se(e) {
        var t = new m(ee(De(e)));
        if (t._nextDay) {
            t.add(1, "d");
            t._nextDay = undefined;
        };
        return t;
    }
    function De(e) {
        var t = e._i, n = e._f;
        e._locale = e._locale || T(e._l);
        if (t === null || n === undefined && t === "") {
            return h({
                nullInput: true
            });
        }
        if (typeof t == "string") {
            e._i = t = e._locale.preparse(t)
        };
        if (g(t)) {
            return new m(ee(t));
        }
        if (o(n)) {
            Ee(e);
        } else {
            if (n) {
                xe(e);
            } else {
                if (i(t)) {
                    e._d = t;
                } else {
                    Ae(e);
                }
            }
        }
        return e;
    }
    function Ae(e) {
        var t = e._i;
        if (t === undefined) {
            e._d = new Date();
        } else {
            if (i(t)) {
                e._d = new Date(+t);
            } else {
                if (typeof t == "string") {
                    ie(e);
                } else {
                    if (o(t)) {
                        e._a = s(t.slice(0), function(e) {
                            return parseInt(e, 10);
                        });
                        we(e);
                    } else {
                        if (typeof t == "object") {
                            Te(e);
                        } else {
                            if (typeof t == "number") {
                                e._d = new Date(t);
                            } else {
                                n.createFromInputFallback(e);
                            }
                        }
                    }
                }
            }
        }
    }
    function Me(e, t, n, r, o) {
        var i = {};
        if (typeof n == "boolean") {
            r = n;
            n = undefined;
        };
        i._isAMomentObject = true;
        i._useUTC = i._isUTC = o;
        i._l = n;
        i._i = e;
        i._f = t;
        i._strict = r;
        return Se(i);
    }
    function Fe(e, t, n, r) {
        return Me(e, t, n, r, false);
    }
    function Ne(e, t) {
        var n, r;
        if (t.length === 1 && o(t[0])) {
            t = t[0]
        };
        if (!t.length) {
            return Fe();
        }
        for (n = t[0], r = 1; r < t.length; ++r) {
            if (!t[r].isValid() || t[r][e](n)) {
                n = t[r]
            };
        }
        return n;
    }
    function Oe() {
        var e = [].slice.call(arguments, 0);
        return Ne("isBefore", e);
    }
    function Ie() {
        var e = [].slice.call(arguments, 0);
        return Ne("isAfter", e);
    }
    function Pe(e) {
        var t = A(e), n = t.year || 0, r = t.quarter || 0, o = t.month || 0, i = t.week || 0, s = t.day || 0, a = t.hour || 0, u = t.minute || 0, l = t.second || 0, c = t.millisecond || 0;
        this._milliseconds = +c + 1e3 * l + 6e4 * u + 36e5 * a;
        this._days = +s + 7 * i;
        this._months = +o + 3 * r + 12 * n;
        this._data = {};
        this._locale = T();
        this._bubble();
    }
    function Le(e) {
        return e instanceof Pe;
    }
    function Re(e, t) {
        P(e, 0, 0, function() {
            var e = this.utcOffset(), n = "+";
            if (e < 0) {
                e = -e;
                n = "-";
            };
            return n + I(~~(e / 60), 2) + t + I(~~e % 60, 2);
        });
    }
    function Be(e) {
        var t = (e || "").match(rr) || [], n = t[t.length - 1] || [], r = (n + "").match(Tr) || [ "-", 0, 0 ], o = +(60 * r[1]) + b(r[2]);
        if (r[0] === "+") {
            return o;
        }
        return -o;
    }
    function je(e, t) {
        var r, o;
        if (t._isUTC) {
            r = t.clone();
            o = (g(e) || i(e) ? +e : +Fe(e)) - +r;
            r._d.setTime(+r._d + o);
            n.updateOffset(r, false);
            return r;
        }
        return Fe(e).local();
    }
    function $e(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15);
    }
    function Ue(e, t) {
        var r, o = this._offset || 0;
        if (e != null) {
            if (typeof e == "string") {
                e = Be(e)
            };
            if (Math.abs(e) < 16) {
                e = 60 * e
            };
            if (!this._isUTC && t) {
                r = $e(this)
            };
            this._offset = e;
            this._isUTC = true;
            if (r != null) {
                this.add(r, "m")
            };
            if (o !== e) {
                !t || this._changeInProgress ? rt(this, Qe(e - o, "m"), 1, false) : this._changeInProgress || (this._changeInProgress = true, 
                n.updateOffset(this, true), this._changeInProgress = null)
            };
            return this;
        }
        if (this._isUTC) {
            return o;
        }
        return $e(this);
    }
    function Ve(e, t) {
        if (e != null) {
            if (typeof e != "string") {
                e = -e
            };
            this.utcOffset(e, t);
            return this;
        }
        return -this.utcOffset();
    }
    function He(e) {
        return this.utcOffset(0, e);
    }
    function ze(e) {
        if (this._isUTC) {
            this.utcOffset(0, e);
            this._isUTC = false;
            if (e) {
                this.subtract($e(this), "m")
            };
        };
        return this;
    }
    function qe() {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else {
            if (typeof this._i == "string") {
                this.utcOffset(Be(this._i))
            };
        }
        return this;
    }
    function We(e) {
        if (e) {
            e = Fe(e).utcOffset();
        } else {
            e = 0;
        }
        return (this.utcOffset() - e) % 60 === 0;
    }
    function Ge() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }
    function Ye() {
        if (typeof this._isDSTShifted != "undefined") {
            return this._isDSTShifted;
        }
        var e = {};
        f(e, this);
        e = De(e);
        if (e._a) {
            var t = e._isUTC ? l(e._a) : Fe(e._a);
            this._isDSTShifted = this.isValid() && y(e._a, t.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }
        return this._isDSTShifted;
    }
    function Ke() {
        return !this._isUTC;
    }
    function Ze() {
        return this._isUTC;
    }
    function Je() {
        return this._isUTC && this._offset === 0;
    }
    function Qe(e, t) {
        var n, r, o, i = e, s = null;
        if (Le(e)) {
            i = {
                ms: e._milliseconds,
                d: e._days,
                M: e._months
            };
        } else {
            if (typeof e == "number") {
                i = {};
                if (t) {
                    i[t] = e;
                } else {
                    i.milliseconds = e;
                }
            } else {
                s = Sr.exec(e);
                if (s) {
                    if (s[1] === "-") {
                        n = -1;
                    } else {
                        n = 1;
                    }
                    i = {
                        y: 0,
                        d: b(s[cr]) * n,
                        h: b(s[pr]) * n,
                        m: b(s[dr]) * n,
                        s: b(s[hr]) * n,
                        ms: b(s[fr]) * n
                    };
                } else {
                    s = Dr.exec(e);
                    if (s) {
                        if (s[1] === "-") {
                            n = -1;
                        } else {
                            n = 1;
                        }
                        i = {
                            y: Xe(s[2], n),
                            M: Xe(s[3], n),
                            d: Xe(s[4], n),
                            h: Xe(s[5], n),
                            m: Xe(s[6], n),
                            s: Xe(s[7], n),
                            w: Xe(s[8], n)
                        };
                    } else {
                        if (i == null) {
                            i = {};
                        } else {
                            if (typeof i == "object" && ("from" in i || "to" in i)) {
                                o = tt(Fe(i.from), Fe(i.to));
                                i = {};
                                i.ms = o.milliseconds;
                                i.M = o.months;
                            };
                        }
                    }
                }
            }
        }
        r = new Pe(i);
        if (Le(e) && a(e, "_locale")) {
            r._locale = e._locale
        };
        return r;
    }
    function Xe(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t;
    }
    function et(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        n.months = t.month() - e.month() + 12 * (t.year() - e.year());
        if (e.clone().add(n.months, "M").isAfter(t)) {
            --n.months
        };
        n.milliseconds = +t - +e.clone().add(n.months, "M");
        return n;
    }
    function tt(e, t) {
        var n;
        t = je(t, e);
        if (e.isBefore(t)) {
            n = et(e, t);
        } else {
            n = et(t, e);
            n.milliseconds = -n.milliseconds;
            n.months = -n.months;
        }
        return n;
    }
    function nt(e, t) {
        return function(n, r) {
            var o, i;
            if (!(r === null || isNaN(+r))) {
                re(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period).");
                i = n;
                n = r;
                r = i;
            };
            if (typeof n == "string") {
                n = +n;
            } else {
                n = n;
            }
            o = Qe(n, r);
            rt(this, o, e);
            return this;
        };
    }
    function rt(e, t, r, o) {
        var i = t._milliseconds, s = t._days, a = t._months;
        if (o == null) {
            o = true;
        } else {
            o = o;
        }
        if (i) {
            e._d.setTime(+e._d + i * r)
        };
        if (s) {
            N(e, "Date", F(e, "Date") + s * r)
        };
        if (a) {
            J(e, F(e, "Month") + a * r)
        };
        if (o) {
            n.updateOffset(e, s || a)
        };
    }
    function ot(e, t) {
        var n = e || Fe(), r = je(n, this).startOf("day"), o = this.diff(r, "days", true), i = o < -6 ? "sameElse" : o < -1 ? "lastWeek" : o < 0 ? "lastDay" : o < 1 ? "sameDay" : o < 2 ? "nextDay" : o < 7 ? "nextWeek" : "sameElse";
        return this.format(t && t[i] || this.localeData().calendar(i, this, Fe(n)));
    }
    function it() {
        return new m(this);
    }
    function st(e, t) {
        var n;
        t = D(typeof t != "undefined" ? t : "millisecond");
        if (t === "millisecond") {
            if (g(e)) {
                e = e;
            } else {
                e = Fe(e);
            }
            return +this > +e;
        }
        if (g(e)) {
            n = +e;
        } else {
            n = +Fe(e);
        }
        return n < +this.clone().startOf(t);
    }
    function at(e, t) {
        var n;
        t = D(typeof t != "undefined" ? t : "millisecond");
        if (t === "millisecond") {
            if (g(e)) {
                e = e;
            } else {
                e = Fe(e);
            }
            return +e > +this;
        }
        if (g(e)) {
            n = +e;
        } else {
            n = +Fe(e);
        }
        return +this.clone().endOf(t) < n;
    }
    function ut(e, t, n) {
        return this.isAfter(e, n) && this.isBefore(t, n);
    }
    function lt(e, t) {
        var n;
        t = D(t || "millisecond");
        if (t === "millisecond") {
            if (g(e)) {
                e = e;
            } else {
                e = Fe(e);
            }
            return +this === +e;
        }
        n = +Fe(e);
        return +this.clone().startOf(t) <= n && n <= +this.clone().endOf(t);
    }
    function ct(e, t, n) {
        var r, o, i = je(e, this), s = 6e4 * (i.utcOffset() - this.utcOffset());
        t = D(t);
        if (t === "year" || t === "month" || t === "quarter") {
            o = pt(this, i);
            if (t === "quarter") {
                o /= 3;
            } else {
                if (t === "year") {
                    o /= 12
                };
            }
        } else {
            r = this - i;
            if (t === "second") {
                o = r / 1e3;
            } else {
                if (t === "minute") {
                    o = r / 6e4;
                } else {
                    if (t === "hour") {
                        o = r / 36e5;
                    } else {
                        if (t === "day") {
                            o = (r - s) / 864e5;
                        } else {
                            if (t === "week") {
                                o = (r - s) / 6048e5;
                            } else {
                                o = r;
                            }
                        }
                    }
                }
            }
        }
        if (n) {
            return o;
        }
        return v(o);
    }
    function pt(e, t) {
        var n, r, o = 12 * (t.year() - e.year()) + (t.month() - e.month()), i = e.clone().add(o, "months");
        if (t - i < 0) {
            n = e.clone().add(o - 1, "months");
            r = (t - i) / (i - n);
        } else {
            n = e.clone().add(o + 1, "months");
            r = (t - i) / (n - i);
        }
        return -(o + r);
    }
    function dt() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function ht() {
        var e = this.clone().utc();
        if (e.year() > 0 && e.year() <= 9999) {
            if (typeof Date.prototype.toISOString == "function") {
                return this.toDate().toISOString();
            }
            return B(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
        }
        return B(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }
    function ft(e) {
        var t = B(this, e || n.defaultFormat);
        return this.localeData().postformat(t);
    }
    function mt(e, t) {
        if (this.isValid()) {
            return Qe({
                to: this,
                from: e
            }).locale(this.locale()).humanize(!t);
        }
        return this.localeData().invalidDate();
    }
    function gt(e) {
        return this.from(Fe(), e);
    }
    function vt(e, t) {
        if (this.isValid()) {
            return Qe({
                from: this,
                to: e
            }).locale(this.locale()).humanize(!t);
        }
        return this.localeData().invalidDate();
    }
    function bt(e) {
        return this.to(Fe(), e);
    }
    function yt(e) {
        var t;
        if (e === undefined) {
            return this._locale._abbr;
        }
        t = T(e);
        if (t != null) {
            this._locale = t
        };
        return this;
    }
    function _t() {
        return this._locale;
    }
    function wt(e) {
        switch (e = D(e)) {
          case "year":
            this.month(0);

          case "quarter":
          case "month":
            this.date(1);

          case "week":
          case "isoWeek":
          case "day":
            this.hours(0);

          case "hour":
            this.minutes(0);

          case "minute":
            this.seconds(0);

          case "second":
            this.milliseconds(0);
        }
        if (e === "week") {
            this.weekday(0)
        };
        if (e === "isoWeek") {
            this.isoWeekday(1)
        };
        if (e === "quarter") {
            this.month(3 * Math.floor(this.month() / 3))
        };
        return this;
    }
    function kt(e) {
        e = D(e);
        if (e === undefined || e === "millisecond") {
            return this;
        }
        return this.startOf(e).add(1, e === "isoWeek" ? "week" : e).subtract(1, "ms");
    }
    function xt() {
        return +this._d - 6e4 * (this._offset || 0);
    }
    function Ct() {
        return Math.floor(+this / 1e3);
    }
    function Et() {
        if (this._offset) {
            return new Date(+this);
        }
        return this._d;
    }
    function Tt() {
        var e = this;
        return [ e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond() ];
    }
    function St() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        };
    }
    function Dt() {
        return d(this);
    }
    function At() {
        return u({}, p(this));
    }
    function Mt() {
        return p(this).overflow;
    }
    function Ft(e, t) {
        P(0, [ e, e.length ], 0, t);
    }
    function Nt(e, t, n) {
        return pe(Fe([ e, 11, 31 + t - n ]), t, n).week;
    }
    function Ot(e) {
        var t = pe(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        if (e == null) {
            return t;
        }
        return this.add(e - t, "y");
    }
    function It(e) {
        var t = pe(this, 1, 4).year;
        if (e == null) {
            return t;
        }
        return this.add(e - t, "y");
    }
    function Pt() {
        return Nt(this.year(), 1, 4);
    }
    function Lt() {
        var e = this.localeData()._week;
        return Nt(this.year(), e.dow, e.doy);
    }
    function Rt(e) {
        if (e == null) {
            return Math.ceil((this.month() + 1) / 3);
        }
        return this.month(3 * (e - 1) + this.month() % 3);
    }
    function Bt(e, t) {
        if (typeof e != "string") {
            return e;
        }
        if (isNaN(e)) {
            e = t.weekdaysParse(e);
            if (typeof e == "number") {
                return e;
            }
            return null;
        }
        return parseInt(e, 10);
    }
    function jt(e) {
        return this._weekdays[e.day()];
    }
    function $t(e) {
        return this._weekdaysShort[e.day()];
    }
    function Ut(e) {
        return this._weekdaysMin[e.day()];
    }
    function Vt(e) {
        var t, n, r;
        for (this._weekdaysParse = this._weekdaysParse || [], t = 0; t < 7; t++) {
            if (!this._weekdaysParse[t]) {
                n = Fe([ 2e3, 1 ]).day(t);
                r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, "");
                this._weekdaysParse[t] = new RegExp(r.replace(".", ""), "i");
            };
            if (this._weekdaysParse[t].test(e)) {
                return t;
            }
        }
    }
    function Ht(e) {
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (e != null) {
            e = Bt(e, this.localeData());
            return this.add(e - t, "d");
        }
        return t;
    }
    function zt(e) {
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        if (e == null) {
            return t;
        }
        return this.add(e - t, "d");
    }
    function qt(e) {
        if (e == null) {
            return this.day() || 7;
        }
        return this.day(this.day() % 7 ? e : e - 7);
    }
    function Wt(e, t) {
        P(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t);
        });
    }
    function Gt(e, t) {
        return t._meridiemParse;
    }
    function Yt(e) {
        return (e + "").toLowerCase().charAt(0) === "p";
    }
    function Kt(e, t, n) {
        if (e > 11) {
            if (n) {
                return "pm";
            }
            return "PM";
        }
        if (n) {
            return "am";
        }
        return "AM";
    }
    function Zt(e, t) {
        t[fr] = b(1e3 * ("0." + e));
    }
    function Jt() {
        if (this._isUTC) {
            return "UTC";
        }
        return "";
    }
    function Qt() {
        if (this._isUTC) {
            return "Coordinated Universal Time";
        }
        return "";
    }
    function Xt(e) {
        return Fe(1e3 * e);
    }
    function en() {
        return Fe.apply(null, arguments).parseZone();
    }
    function tn(e, t, n) {
        var r = this._calendar[e];
        if (typeof r == "function") {
            return r.call(t, n);
        }
        return r;
    }
    function nn(e) {
        var t = this._longDateFormat[e], n = this._longDateFormat[e.toUpperCase()];
        if (t || !n) {
            return t;
        }
        this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1);
        });
        return this._longDateFormat[e];
    }
    function rn() {
        return this._invalidDate;
    }
    function on(e) {
        return this._ordinal.replace("%d", e);
    }
    function sn(e) {
        return e;
    }
    function an(e, t, n, r) {
        var o = this._relativeTime[n];
        if (typeof o == "function") {
            return o(e, t, n, r);
        }
        return o.replace(/%d/i, e);
    }
    function un(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        if (typeof n == "function") {
            return n(t);
        }
        return n.replace(/%s/i, t);
    }
    function ln(e) {
        var t, n;
        for (n in e) {
            t = e[n];
            if (typeof t == "function") {
                this[n] = t;
            } else {
                this["_" + n] = t;
            }
        }
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
    }
    function cn(e, t, n, r) {
        var o = T(), i = l().set(r, t);
        return o[n](i, e);
    }
    function pn(e, t, n, r, o) {
        if (typeof e == "number") {
            t = e;
            e = undefined;
        };
        e = e || "";
        if (t != null) {
            return cn(e, t, n, o);
        }
        var i, s = [];
        for (i = 0; r > i; i++) {
            s[i] = cn(e, i, n, o);
        }
        return s;
    }
    function dn(e, t) {
        return pn(e, t, "months", 12, "month");
    }
    function hn(e, t) {
        return pn(e, t, "monthsShort", 12, "month");
    }
    function fn(e, t) {
        return pn(e, t, "weekdays", 7, "day");
    }
    function mn(e, t) {
        return pn(e, t, "weekdaysShort", 7, "day");
    }
    function gn(e, t) {
        return pn(e, t, "weekdaysMin", 7, "day");
    }
    function vn() {
        var e = this._data;
        this._milliseconds = Jr(this._milliseconds);
        this._days = Jr(this._days);
        this._months = Jr(this._months);
        e.milliseconds = Jr(e.milliseconds);
        e.seconds = Jr(e.seconds);
        e.minutes = Jr(e.minutes);
        e.hours = Jr(e.hours);
        e.months = Jr(e.months);
        e.years = Jr(e.years);
        return this;
    }
    function bn(e, t, n, r) {
        var o = Qe(t, n);
        e._milliseconds += r * o._milliseconds;
        e._days += r * o._days;
        e._months += r * o._months;
        return e._bubble();
    }
    function yn(e, t) {
        return bn(this, e, t, 1);
    }
    function _n(e, t) {
        return bn(this, e, t, -1);
    }
    function wn(e) {
        if (e < 0) {
            return Math.floor(e);
        }
        return Math.ceil(e);
    }
    function kn() {
        var e, t, n, r, o, i = this._milliseconds, s = this._days, a = this._months, u = this._data;
        if (!(i >= 0 && s >= 0 && a >= 0 || i <= 0 && s <= 0 && a <= 0)) {
            i += 864e5 * wn(Cn(a) + s);
            s = 0;
            a = 0;
        };
        u.milliseconds = i % 1e3;
        e = v(i / 1e3);
        u.seconds = e % 60;
        t = v(e / 60);
        u.minutes = t % 60;
        n = v(t / 60);
        u.hours = n % 24;
        s += v(n / 24);
        o = v(xn(s));
        a += o;
        s -= wn(Cn(o));
        r = v(a / 12);
        a %= 12;
        u.days = s;
        u.months = a;
        u.years = r;
        return this;
    }
    function xn(e) {
        return 4800 * e / 146097;
    }
    function Cn(e) {
        return 146097 * e / 4800;
    }
    function En(e) {
        var t, n, r = this._milliseconds;
        e = D(e);
        if (e === "month" || e === "year") {
            t = this._days + r / 864e5;
            n = this._months + xn(t);
            if (e === "month") {
                return n;
            }
            return n / 12;
        }
        switch (t = this._days + Math.round(Cn(this._months)), e) {
          case "week":
            return t / 7 + r / 6048e5;

          case "day":
            return t + r / 864e5;

          case "hour":
            return 24 * t + r / 36e5;

          case "minute":
            return 1440 * t + r / 6e4;

          case "second":
            return 86400 * t + r / 1e3;

          case "millisecond":
            return Math.floor(864e5 * t) + r;

          default:
            throw new Error("Unknown unit " + e);
        }
    }
    function Tn() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * b(this._months / 12);
    }
    function Sn(e) {
        return function() {
            return this.as(e);
        };
    }
    function Dn(e) {
        e = D(e);
        return this[e + "s"]();
    }
    function An(e) {
        return function() {
            return this._data[e];
        };
    }
    function Mn() {
        return v(this.days() / 7);
    }
    function Fn(e, t, n, r, o) {
        return o.relativeTime(t || 1, !!n, e, r);
    }
    function Nn(e, t, n) {
        var r = Qe(e).abs(), o = fo(r.as("s")), i = fo(r.as("m")), s = fo(r.as("h")), a = fo(r.as("d")), u = fo(r.as("M")), l = fo(r.as("y")), c = o < mo.s && [ "s", o ] || i === 1 && [ "m" ] || i < mo.m && [ "mm", i ] || s === 1 && [ "h" ] || s < mo.h && [ "hh", s ] || a === 1 && [ "d" ] || a < mo.d && [ "dd", a ] || u === 1 && [ "M" ] || u < mo.M && [ "MM", u ] || l === 1 && [ "y" ] || [ "yy", l ];
        c[2] = t;
        c[3] = +e > 0;
        c[4] = n;
        return Fn.apply(null, c);
    }
    function On(e, t) {
        if (mo[e] === undefined) {
            return false;
        }
        if (t === undefined) {
            return mo[e];
        }
        mo[e] = t;
        return true;
    }
    function In(e) {
        var t = this.localeData(), n = Nn(this, !e, t);
        if (e) {
            n = t.pastFuture(+this, n)
        };
        return t.postformat(n);
    }
    function Pn() {
        var e, t, n, r = go(this._milliseconds) / 1e3, o = go(this._days), i = go(this._months);
        e = v(r / 60);
        t = v(e / 60);
        r %= 60;
        e %= 60;
        n = v(i / 12);
        i %= 12;
        var s = n, a = i, u = o, l = t, c = e, p = r, d = this.asSeconds();
        if (d) {
            return (d < 0 ? "-" : "") + "P" + (s ? s + "Y" : "") + (a ? a + "M" : "") + (u ? u + "D" : "") + (l || c || p ? "T" : "") + (l ? l + "H" : "") + (c ? c + "M" : "") + (p ? p + "S" : "");
        }
        return "P0D";
    }
    var Ln, Rn, Bn = n.momentProperties = [], jn = false, $n = {}, Un = {}, Vn = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Hn = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, zn = {}, qn = {}, Wn = /\d/, Gn = /\d\d/, Yn = /\d{3}/, Kn = /\d{4}/, Zn = /[+-]?\d{6}/, Jn = /\d\d?/, Qn = /\d{1,3}/, Xn = /\d{1,4}/, er = /[+-]?\d{1,6}/, tr = /\d+/, nr = /[+-]?\d+/, rr = /Z|[+-]\d\d:?\d\d/gi, or = /[+-]?\d+(\.\d{1,3})?/, ir = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, sr = {}, ar = {}, ur = 0, lr = 1, cr = 2, pr = 3, dr = 4, hr = 5, fr = 6;
    P("M", [ "MM", 2 ], "Mo", function() {
        return this.month() + 1;
    });
    P("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e);
    });
    P("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e);
    });
    S("month", "M");
    U("M", Jn);
    U("MM", Jn, Gn);
    U("MMM", ir);
    U("MMMM", ir);
    z([ "M", "MM" ], function(e, t) {
        t[lr] = b(e) - 1;
    });
    z([ "MMM", "MMMM" ], function(e, t, n, r) {
        var o = n._locale.monthsParse(e, r, n._strict);
        if (o != null) {
            t[lr] = o;
        } else {
            p(n).invalidMonth = e;
        }
    });
    var mr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), gr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), vr = {};
    n.suppressDeprecationWarnings = false;
    var br = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, yr = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/ ], [ "YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d{2}/ ], [ "YYYY-DDD", /\d{4}-\d{3}/ ] ], _r = [ [ "HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss", /(T| )\d\d:\d\d:\d\d/ ], [ "HH:mm", /(T| )\d\d:\d\d/ ], [ "HH", /(T| )\d\d/ ] ], wr = /^\/?Date\((\-?\d+)/i;
    n.createFromInputFallback = ne("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
    });
    P(0, [ "YY", 2 ], 0, function() {
        return this.year() % 100;
    });
    P(0, [ "YYYY", 4 ], 0, "year");
    P(0, [ "YYYYY", 5 ], 0, "year");
    P(0, [ "YYYYYY", 6, true ], 0, "year");
    S("year", "y");
    U("Y", nr);
    U("YY", Jn, Gn);
    U("YYYY", Xn, Kn);
    U("YYYYY", er, Zn);
    U("YYYYYY", er, Zn);
    z([ "YYYYY", "YYYYYY" ], ur);
    z("YYYY", function(e, t) {
        if (e.length === 2) {
            t[ur] = n.parseTwoDigitYear(e);
        } else {
            t[ur] = b(e);
        }
    });
    z("YY", function(e, t) {
        t[ur] = n.parseTwoDigitYear(e);
    });
    n.parseTwoDigitYear = function(e) {
        return b(e) + (b(e) > 68 ? 1900 : 2e3);
    };
    var kr = M("FullYear", false);
    P("w", [ "ww", 2 ], "wo", "week");
    P("W", [ "WW", 2 ], "Wo", "isoWeek");
    S("week", "w");
    S("isoWeek", "W");
    U("w", Jn);
    U("ww", Jn, Gn);
    U("W", Jn);
    U("WW", Jn, Gn);
    q([ "w", "ww", "W", "WW" ], function(e, t, n, r) {
        t[r.substr(0, 1)] = b(e);
    });
    var xr = {
        dow: 0,
        doy: 6
    };
    P("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear");
    S("dayOfYear", "DDD");
    U("DDD", Qn);
    U("DDDD", Yn);
    z([ "DDD", "DDDD" ], function(e, t, n) {
        n._dayOfYear = b(e);
    });
    n.ISO_8601 = function() {};
    var Cr = ne("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function() {
        var e = Fe.apply(null, arguments);
        if (this > e) {
            return this;
        }
        return e;
    }), Er = ne("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function() {
        var e = Fe.apply(null, arguments);
        if (e > this) {
            return this;
        }
        return e;
    });
    Re("Z", ":");
    Re("ZZ", "");
    U("Z", rr);
    U("ZZ", rr);
    z([ "Z", "ZZ" ], function(e, t, n) {
        n._useUTC = true;
        n._tzm = Be(e);
    });
    var Tr = /([\+\-]|\d\d)/gi;
    n.updateOffset = function() {};
    var Sr = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Dr = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Qe.fn = Pe.prototype;
    var Ar = nt(1, "add"), Mr = nt(-1, "subtract");
    n.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var Fr = ne("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        if (e === undefined) {
            return this.localeData();
        }
        return this.locale(e);
    });
    P(0, [ "gg", 2 ], 0, function() {
        return this.weekYear() % 100;
    });
    P(0, [ "GG", 2 ], 0, function() {
        return this.isoWeekYear() % 100;
    });
    Ft("gggg", "weekYear");
    Ft("ggggg", "weekYear");
    Ft("GGGG", "isoWeekYear");
    Ft("GGGGG", "isoWeekYear");
    S("weekYear", "gg");
    S("isoWeekYear", "GG");
    U("G", nr);
    U("g", nr);
    U("GG", Jn, Gn);
    U("gg", Jn, Gn);
    U("GGGG", Xn, Kn);
    U("gggg", Xn, Kn);
    U("GGGGG", er, Zn);
    U("ggggg", er, Zn);
    q([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(e, t, n, r) {
        t[r.substr(0, 2)] = b(e);
    });
    q([ "gg", "GG" ], function(e, t, r, o) {
        t[o] = n.parseTwoDigitYear(e);
    });
    P("Q", 0, 0, "quarter");
    S("quarter", "Q");
    U("Q", Wn);
    z("Q", function(e, t) {
        t[lr] = 3 * (b(e) - 1);
    });
    P("D", [ "DD", 2 ], "Do", "date");
    S("date", "D");
    U("D", Jn);
    U("DD", Jn, Gn);
    U("Do", function(e, t) {
        if (e) {
            return t._ordinalParse;
        }
        return t._ordinalParseLenient;
    });
    z([ "D", "DD" ], cr);
    z("Do", function(e, t) {
        t[cr] = b(e.match(Jn)[0], 10);
    });
    var Nr = M("Date", true);
    P("d", 0, "do", "day");
    P("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e);
    });
    P("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e);
    });
    P("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e);
    });
    P("e", 0, 0, "weekday");
    P("E", 0, 0, "isoWeekday");
    S("day", "d");
    S("weekday", "e");
    S("isoWeekday", "E");
    U("d", Jn);
    U("e", Jn);
    U("E", Jn);
    U("dd", ir);
    U("ddd", ir);
    U("dddd", ir);
    q([ "dd", "ddd", "dddd" ], function(e, t, n) {
        var r = n._locale.weekdaysParse(e);
        if (r != null) {
            t.d = r;
        } else {
            p(n).invalidWeekday = e;
        }
    });
    q([ "d", "e", "E" ], function(e, t, n, r) {
        t[r] = b(e);
    });
    var Or = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Ir = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Pr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    P("H", [ "HH", 2 ], 0, "hour");
    P("h", [ "hh", 2 ], 0, function() {
        return this.hours() % 12 || 12;
    });
    Wt("a", true);
    Wt("A", false);
    S("hour", "h");
    U("a", Gt);
    U("A", Gt);
    U("H", Jn);
    U("h", Jn);
    U("HH", Jn, Gn);
    U("hh", Jn, Gn);
    z([ "H", "HH" ], pr);
    z([ "a", "A" ], function(e, t, n) {
        n._isPm = n._locale.isPM(e);
        n._meridiem = e;
    });
    z([ "h", "hh" ], function(e, t, n) {
        t[pr] = b(e);
        p(n).bigHour = true;
    });
    var Lr = /[ap]\.?m?\.?/i, Rr = M("Hours", true);
    P("m", [ "mm", 2 ], 0, "minute");
    S("minute", "m");
    U("m", Jn);
    U("mm", Jn, Gn);
    z([ "m", "mm" ], dr);
    var Br = M("Minutes", false);
    P("s", [ "ss", 2 ], 0, "second");
    S("second", "s");
    U("s", Jn);
    U("ss", Jn, Gn);
    z([ "s", "ss" ], hr);
    var jr = M("Seconds", false);
    P("S", 0, 0, function() {
        return ~~(this.millisecond() / 100);
    });
    P(0, [ "SS", 2 ], 0, function() {
        return ~~(this.millisecond() / 10);
    });
    P(0, [ "SSS", 3 ], 0, "millisecond");
    P(0, [ "SSSS", 4 ], 0, function() {
        return 10 * this.millisecond();
    });
    P(0, [ "SSSSS", 5 ], 0, function() {
        return 100 * this.millisecond();
    });
    P(0, [ "SSSSSS", 6 ], 0, function() {
        return 1e3 * this.millisecond();
    });
    P(0, [ "SSSSSSS", 7 ], 0, function() {
        return 1e4 * this.millisecond();
    });
    P(0, [ "SSSSSSSS", 8 ], 0, function() {
        return 1e5 * this.millisecond();
    });
    P(0, [ "SSSSSSSSS", 9 ], 0, function() {
        return 1e6 * this.millisecond();
    });
    S("millisecond", "ms");
    U("S", Qn, Wn);
    U("SS", Qn, Gn);
    U("SSS", Qn, Yn);
    var $r;
    for ($r = "SSSS"; $r.length <= 9; $r += "S") {
        U($r, tr);
    }
    for ($r = "S"; $r.length <= 9; $r += "S") {
        z($r, Zt);
    }
    var Ur = M("Milliseconds", false);
    P("z", 0, 0, "zoneAbbr");
    P("zz", 0, 0, "zoneName");
    var Vr = m.prototype;
    Vr.add = Ar;
    Vr.calendar = ot;
    Vr.clone = it;
    Vr.diff = ct;
    Vr.endOf = kt;
    Vr.format = ft;
    Vr.from = mt;
    Vr.fromNow = gt;
    Vr.to = vt;
    Vr.toNow = bt;
    Vr.get = O;
    Vr.invalidAt = Mt;
    Vr.isAfter = st;
    Vr.isBefore = at;
    Vr.isBetween = ut;
    Vr.isSame = lt;
    Vr.isValid = Dt;
    Vr.lang = Fr;
    Vr.locale = yt;
    Vr.localeData = _t;
    Vr.max = Er;
    Vr.min = Cr;
    Vr.parsingFlags = At;
    Vr.set = O;
    Vr.startOf = wt;
    Vr.subtract = Mr;
    Vr.toArray = Tt;
    Vr.toObject = St;
    Vr.toDate = Et;
    Vr.toISOString = ht;
    Vr.toJSON = ht;
    Vr.toString = dt;
    Vr.unix = Ct;
    Vr.valueOf = xt;
    Vr.year = kr;
    Vr.isLeapYear = ce;
    Vr.weekYear = Ot;
    Vr.isoWeekYear = It;
    Vr.quarter = Vr.quarters = Rt;
    Vr.month = Q;
    Vr.daysInMonth = X;
    Vr.week = Vr.weeks = me;
    Vr.isoWeek = Vr.isoWeeks = ge;
    Vr.weeksInYear = Lt;
    Vr.isoWeeksInYear = Pt;
    Vr.date = Nr;
    Vr.day = Vr.days = Ht;
    Vr.weekday = zt;
    Vr.isoWeekday = qt;
    Vr.dayOfYear = be;
    Vr.hour = Vr.hours = Rr;
    Vr.minute = Vr.minutes = Br;
    Vr.second = Vr.seconds = jr;
    Vr.millisecond = Vr.milliseconds = Ur;
    Vr.utcOffset = Ue;
    Vr.utc = He;
    Vr.local = ze;
    Vr.parseZone = qe;
    Vr.hasAlignedHourOffset = We;
    Vr.isDST = Ge;
    Vr.isDSTShifted = Ye;
    Vr.isLocal = Ke;
    Vr.isUtcOffset = Ze;
    Vr.isUtc = Je;
    Vr.isUTC = Je;
    Vr.zoneAbbr = Jt;
    Vr.zoneName = Qt;
    Vr.dates = ne("dates accessor is deprecated. Use date instead.", Nr);
    Vr.months = ne("months accessor is deprecated. Use month instead", Q);
    Vr.years = ne("years accessor is deprecated. Use year instead", kr);
    Vr.zone = ne("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ve);
    var Hr = Vr, zr = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, qr = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, Wr = "Invalid date", Gr = "%d", Yr = /\d{1,2}/, Kr = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, Zr = _.prototype;
    Zr._calendar = zr;
    Zr.calendar = tn;
    Zr._longDateFormat = qr;
    Zr.longDateFormat = nn;
    Zr._invalidDate = Wr;
    Zr.invalidDate = rn;
    Zr._ordinal = Gr;
    Zr.ordinal = on;
    Zr._ordinalParse = Yr;
    Zr.preparse = sn;
    Zr.postformat = sn;
    Zr._relativeTime = Kr;
    Zr.relativeTime = an;
    Zr.pastFuture = un;
    Zr.set = ln;
    Zr.months = Y;
    Zr._months = mr;
    Zr.monthsShort = K;
    Zr._monthsShort = gr;
    Zr.monthsParse = Z;
    Zr.week = de;
    Zr._week = xr;
    Zr.firstDayOfYear = fe;
    Zr.firstDayOfWeek = he;
    Zr.weekdays = jt;
    Zr._weekdays = Or;
    Zr.weekdaysMin = Ut;
    Zr._weekdaysMin = Pr;
    Zr.weekdaysShort = $t;
    Zr._weekdaysShort = Ir;
    Zr.weekdaysParse = Vt;
    Zr.isPM = Yt;
    Zr._meridiemParse = Lr;
    Zr.meridiem = Kt;
    C("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10, n = b(e % 100 / 10) === 1 ? "th" : t === 1 ? "st" : t === 2 ? "nd" : t === 3 ? "rd" : "th";
            return e + n;
        }
    });
    n.lang = ne("moment.lang is deprecated. Use moment.locale instead.", C);
    n.langData = ne("moment.langData is deprecated. Use moment.localeData instead.", T);
    var Jr = Math.abs, Qr = Sn("ms"), Xr = Sn("s"), eo = Sn("m"), to = Sn("h"), no = Sn("d"), ro = Sn("w"), oo = Sn("M"), io = Sn("y"), so = An("milliseconds"), ao = An("seconds"), uo = An("minutes"), lo = An("hours"), co = An("days"), po = An("months"), ho = An("years"), fo = Math.round, mo = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, go = Math.abs, vo = Pe.prototype;
    vo.abs = vn;
    vo.add = yn;
    vo.subtract = _n;
    vo.as = En;
    vo.asMilliseconds = Qr;
    vo.asSeconds = Xr;
    vo.asMinutes = eo;
    vo.asHours = to;
    vo.asDays = no;
    vo.asWeeks = ro;
    vo.asMonths = oo;
    vo.asYears = io;
    vo.valueOf = Tn;
    vo._bubble = kn;
    vo.get = Dn;
    vo.milliseconds = so;
    vo.seconds = ao;
    vo.minutes = uo;
    vo.hours = lo;
    vo.days = co;
    vo.weeks = Mn;
    vo.months = po;
    vo.years = ho;
    vo.humanize = In;
    vo.toISOString = Pn;
    vo.toString = Pn;
    vo.toJSON = Pn;
    vo.locale = yt;
    vo.localeData = _t;
    vo.toIsoString = ne("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Pn);
    vo.lang = Fr;
    P("X", 0, 0, "unix");
    P("x", 0, 0, "valueOf");
    U("x", nr);
    U("X", or);
    z("X", function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e, 10));
    });
    z("x", function(e, t, n) {
        n._d = new Date(b(e));
    });
    n.version = "2.10.6";
    r(Fe);
    n.fn = Hr;
    n.min = Oe;
    n.max = Ie;
    n.utc = l;
    n.unix = Xt;
    n.months = dn;
    n.isDate = i;
    n.locale = C;
    n.invalid = h;
    n.duration = Qe;
    n.isMoment = g;
    n.weekdays = fn;
    n.parseZone = en;
    n.localeData = T;
    n.isDuration = Le;
    n.monthsShort = hn;
    n.weekdaysMin = gn;
    n.defineLocale = E;
    n.weekdaysShort = mn;
    n.normalizeUnits = D;
    n.relativeTimeThreshold = On;
    var bo = n;
    return bo;
});
