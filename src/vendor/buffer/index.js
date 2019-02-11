(function(t) {
    "use strict";
    function r() {
        function e() {}
        try {
            var t = new Uint8Array(1);
            t.foo = function() {
                return 42;
            };
            t.constructor = e;
            return t.foo() === 42 && t.constructor === e && typeof t.subarray == "function" && t.subarray(1, 1).byteLength === 0;
        } catch (n) {
            return !1;
        }
    }
    function o() {
        if (i.TYPED_ARRAY_SUPPORT) {
            return 2147483647;
        }
        return 1073741823;
    }
    function i(e) {
        if (this instanceof i) {
            if (!i.TYPED_ARRAY_SUPPORT) {
                this.length = 0;
                this.parent = undefined;
            };
            if (typeof e == "number") {
                return s(this, e);
            }
            if (typeof e == "string") {
                return a(this, e, arguments.length > 1 ? arguments[1] : "utf8");
            }
            return u(this, e);
        }
        if (arguments.length > 1) {
            return new i(e, arguments[1]);
        }
        return new i(e);
    }
    function s(e, t) {
        e = m(e, t < 0 ? 0 : 0 | g(t));
        if (!i.TYPED_ARRAY_SUPPORT) {
            for (var n = 0; t > n; n++) {
                e[n] = 0;
            }
        }
        return e;
    }
    function a(e, t, n) {
        if (typeof n != "string" || n === "") {
            n = "utf8"
        };
        var r = 0 | b(t, n);
        e = m(e, r);
        e.write(t, n);
        return e;
    }
    function u(e, t) {
        if (i.isBuffer(t)) {
            return l(e, t);
        }
        if (Z(t)) {
            return c(e, t);
        }
        if (t == null) {
            throw new TypeError("must start with number, buffer, array or string");
        }
        if (typeof ArrayBuffer != "undefined") {
            if (t.buffer instanceof ArrayBuffer) {
                return p(e, t);
            }
            if (t instanceof ArrayBuffer) {
                return d(e, t);
            }
        }
        if (t.length) {
            return h(e, t);
        }
        return f(e, t);
    }
    function l(e, t) {
        var n = 0 | g(t.length);
        e = m(e, n);
        t.copy(e, 0, 0, n);
        return e;
    }
    function c(e, t) {
        var n = 0 | g(t.length);
        e = m(e, n);
        for (var r = 0; n > r; r += 1) {
            e[r] = 255 & t[r];
        }
        return e;
    }
    function p(e, t) {
        var n = 0 | g(t.length);
        e = m(e, n);
        for (var r = 0; n > r; r += 1) {
            e[r] = 255 & t[r];
        }
        return e;
    }
    function d(e, t) {
        if (i.TYPED_ARRAY_SUPPORT) {
            t.byteLength;
            e = i._augment(new Uint8Array(t));
        } else {
            e = p(e, new Uint8Array(t));
        }
        return e;
    }
    function h(e, t) {
        var n = 0 | g(t.length);
        e = m(e, n);
        for (var r = 0; n > r; r += 1) {
            e[r] = 255 & t[r];
        }
        return e;
    }
    function f(e, t) {
        var n, r = 0;
        if (t.type === "Buffer" && Z(t.data)) {
            n = t.data;
            r = 0 | g(n.length);
        };
        e = m(e, r);
        for (var o = 0; r > o; o += 1) {
            e[o] = 255 & n[o];
        }
        return e;
    }
    function m(e, t) {
        if (i.TYPED_ARRAY_SUPPORT) {
            e = i._augment(new Uint8Array(t));
            e.__proto__ = i.prototype;
        } else {
            e.length = t;
            e._isBuffer = true;
        }
        var n = t !== 0 && t <= i.poolSize >>> 1;
        if (n) {
            e.parent = J
        };
        return e;
    }
    function g(e) {
        if (e >= o()) {
            throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(16) + " bytes");
        }
        return 0 | e;
    }
    function v(e, t) {
        if (!(this instanceof v)) {
            return new v(e, t);
        }
        var n = new i(e, t);
        delete n.parent;
        return n;
    }
    function b(e, t) {
        if (typeof e != "string") {
            e = "" + e
        };
        var n = e.length;
        if (n === 0) {
            return 0;
        }
        for (var r = false; ;) {
            switch (t) {
              case "ascii":
              case "binary":
              case "raw":
              case "raws":
                return n;

              case "utf8":
              case "utf-8":
                return H(e).length;

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * n;

              case "hex":
                return n >>> 1;

              case "base64":
                return W(e).length;

              default:
                if (r) {
                    return H(e).length;
                }
                t = ("" + t).toLowerCase();
                r = true;
            }
        }
    }
    function y(e, t, n) {
        var r = false;
        t = 0 | t;
        if (n === undefined || n === 1 / 0) {
            n = this.length;
        } else {
            n = 0 | n;
        }
        if (!e) {
            e = "utf8"
        };
        if (t < 0) {
            t = 0
        };
        if (n > this.length) {
            n = this.length
        };
        if (t >= n) {
            return "";
        }
        for (;;) {
            switch (e) {
              case "hex":
                return F(this, t, n);

              case "utf8":
              case "utf-8":
                return S(this, t, n);

              case "ascii":
                return A(this, t, n);

              case "binary":
                return M(this, t, n);

              case "base64":
                return T(this, t, n);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return N(this, t, n);

              default:
                if (r) {
                    throw new TypeError("Unknown encoding: " + e);
                }
                e = (e + "").toLowerCase();
                r = true;
            }
        }
    }
    function _(e, t, n, r) {
        n = Number(n) || 0;
        var o = e.length - n;
        if (r) {
            r = Number(r);
            if (r > o) {
                r = o
            };
        } else {
            r = o;
        }
        var i = t.length;
        if (i % 2 !== 0) {
            throw new Error("Invalid hex string");
        }
        if (r > i / 2) {
            r = i / 2
        };
        for (var s = 0; r > s; s++) {
            var a = parseInt(t.substr(2 * s, 2), 16);
            if (isNaN(a)) {
                throw new Error("Invalid hex string");
            }
            e[n + s] = a;
        }
        return s;
    }
    function w(e, t, n, r) {
        return Y(H(t, e.length - n), e, n, r);
    }
    function k(e, t, n, r) {
        return Y(z(t), e, n, r);
    }
    function x(e, t, n, r) {
        return k(e, t, n, r);
    }
    function C(e, t, n, r) {
        return Y(W(t), e, n, r);
    }
    function E(e, t, n, r) {
        return Y(q(t, e.length - n), e, n, r);
    }
    function T(e, t, n) {
        if (t === 0 && n === e.length) {
            return G.fromByteArray(e);
        }
        return G.fromByteArray(e.slice(t, n));
    }
    function S(e, t, n) {
        n = Math.min(e.length, n);
        for (var r = [], o = t; n > o; ) {
            var i = e[o], s = null, a = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
            if (n >= o + a) {
                var u, l, c, p;
                switch (a) {
                  case 1:
                    if (i < 128) {
                        s = i
                    };
                    break;

                  case 2:
                    u = e[o + 1];
                    if ((192 & u) === 128) {
                        p = (31 & i) << 6 | 63 & u;
                        if (p > 127) {
                            s = p
                        };
                    };
                    break;

                  case 3:
                    u = e[o + 1];
                    l = e[o + 2];
                    if ((192 & u) === 128 && (192 & l) === 128) {
                        p = (15 & i) << 12 | (63 & u) << 6 | 63 & l;
                        if (p > 2047 && (p < 55296 || p > 57343)) {
                            s = p
                        };
                    };
                    break;

                  case 4:
                    u = e[o + 1];
                    l = e[o + 2];
                    c = e[o + 3];
                    if ((192 & u) === 128 && (192 & l) === 128 && (192 & c) === 128) {
                        p = (15 & i) << 18 | (63 & u) << 12 | (63 & l) << 6 | 63 & c;
                        if (p > 65535 && p < 1114112) {
                            s = p
                        };
                    };
                }
            }
            if (s === null) {
                s = 65533;
                a = 1;
            } else {
                if (s > 65535) {
                    s -= 65536;
                    r.push(s >>> 10 & 1023 | 55296);
                    s = 56320 | 1023 & s;
                };
            }
            r.push(s);
            o += a;
        }
        return D(r);
    }
    function D(e) {
        var t = e.length;
        if (Q >= t) {
            return String.fromCharCode.apply(String, e);
        }
        for (var n = "", r = 0; t > r; ) {
            n += String.fromCharCode.apply(String, e.slice(r, r += Q));
        }
        return n;
    }
    function A(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var o = t; n > o; o++) {
            r += String.fromCharCode(127 & e[o]);
        }
        return r;
    }
    function M(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var o = t; n > o; o++) {
            r += String.fromCharCode(e[o]);
        }
        return r;
    }
    function F(e, t, n) {
        var r = e.length;
        if (!t || t < 0) {
            t = 0
        };
        if (!n || n < 0 || n > r) {
            n = r
        };
        for (var o = "", i = t; n > i; i++) {
            o += V(e[i]);
        }
        return o;
    }
    function N(e, t, n) {
        for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) {
            o += String.fromCharCode(r[i] + 256 * r[i + 1]);
        }
        return o;
    }
    function O(e, t, n) {
        if (e % 1 !== 0 || e < 0) {
            throw new RangeError("offset is not uint");
        }
        if (e + t > n) {
            throw new RangeError("Trying to access beyond buffer length");
        }
    }
    function I(e, t, n, r, o, s) {
        if (!i.isBuffer(e)) {
            throw new TypeError("buffer must be a Buffer instance");
        }
        if (t > o || s > t) {
            throw new RangeError("value is out of bounds");
        }
        if (n + r > e.length) {
            throw new RangeError("index out of range");
        }
    }
    function P(e, t, n, r) {
        if (t < 0) {
            t = 65535 + t + 1
        };
        for (var o = 0, i = Math.min(e.length - n, 2); i > o; o++) {
            e[n + o] = (t & 255 << 8 * (r ? o : 1 - o)) >>> 8 * (r ? o : 1 - o);
        }
    }
    function L(e, t, n, r) {
        if (t < 0) {
            t = 4294967295 + t + 1
        };
        for (var o = 0, i = Math.min(e.length - n, 4); i > o; o++) {
            e[n + o] = t >>> 8 * (r ? o : 3 - o) & 255;
        }
    }
    function R(e, t, n, r, o, i) {
        if (t > o || i > t) {
            throw new RangeError("value is out of bounds");
        }
        if (n + r > e.length) {
            throw new RangeError("index out of range");
        }
        if (n < 0) {
            throw new RangeError("index out of range");
        }
    }
    function B(e, t, n, r, o) {
        if (!o) {
            R(e, t, n, 4, 34028234663852886e22, -34028234663852886e22)
        };
        K.write(e, t, n, r, 23, 4);
        return n + 4;
    }
    function j(e, t, n, r, o) {
        if (!o) {
            R(e, t, n, 8, 17976931348623157e292, -17976931348623157e292)
        };
        K.write(e, t, n, r, 52, 8);
        return n + 8;
    }
    function $(e) {
        e = U(e).replace(ee, "");
        if (e.length < 2) {
            return "";
        }
        for (;e.length % 4 !== 0; ) {
            e += "=";
        }
        return e;
    }
    function U(e) {
        if (e.trim) {
            return e.trim();
        }
        return e.replace(/^\s+|\s+$/g, "");
    }
    function V(e) {
        if (e < 16) {
            return "0" + e.toString(16);
        }
        return e.toString(16);
    }
    function H(e, t) {
        t = t || 1 / 0;
        for (var n, r = e.length, o = null, i = [], s = 0; r > s; s++) {
            n = e.charCodeAt(s);
            if (n > 55295 && n < 57344) {
                if (!o) {
                    if (n > 56319) {
                        if ((t -= 3) > -1) {
                            i.push(239, 191, 189)
                        };
                        continue;
                    }
                    if (s + 1 === r) {
                        if ((t -= 3) > -1) {
                            i.push(239, 191, 189)
                        };
                        continue;
                    }
                    o = n;
                    continue;
                }
                if (n < 56320) {
                    if ((t -= 3) > -1) {
                        i.push(239, 191, 189)
                    };
                    o = n;
                    continue;
                }
                n = (o - 55296 << 10 | n - 56320) + 65536;
            } else {
                if (o && (t -= 3) > -1) {
                    i.push(239, 191, 189)
                };
            }
            o = null;
            if (n < 128) {
                if ((t -= 1) < 0) {
                    break;
                }
                i.push(n);
            } else if (n < 2048) {
                if ((t -= 2) < 0) {
                    break;
                }
                i.push(n >> 6 | 192, 63 & n | 128);
            } else if (n < 65536) {
                if ((t -= 3) < 0) {
                    break;
                }
                i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
            } else {
                if (!(n < 1114112)) {
                    throw new Error("Invalid code point");
                }
                if ((t -= 4) < 0) {
                    break;
                }
                i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
            }
        }
        return i;
    }
    function z(e) {
        for (var t = [], n = 0; n < e.length; n++) {
            t.push(255 & e.charCodeAt(n));
        }
        return t;
    }
    function q(e, t) {
        for (var n, r, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); s++) {
            n = e.charCodeAt(s);
            r = n >> 8;
            o = n % 256;
            i.push(o);
            i.push(r);
        }
        return i;
    }
    function W(e) {
        return G.toByteArray($(e));
    }
    function Y(e, t, n, r) {
        for (var o = 0; r > o && !(o + n >= t.length || o >= e.length); o++) {
            t[o + n] = e[o];
        }
        return o;
    }
    var G = require("base64-js"), K = require("ieee754"), Z = require("isarray");
    exports.Buffer = i;
    exports.SlowBuffer = v;
    exports.INSPECT_MAX_BYTES = 50;
    i.poolSize = 8192;
    var J = {};
    if (t.TYPED_ARRAY_SUPPORT !== undefined) {
        i.TYPED_ARRAY_SUPPORT = t.TYPED_ARRAY_SUPPORT;
    } else {
        i.TYPED_ARRAY_SUPPORT = r();
    }
    if (i.TYPED_ARRAY_SUPPORT) {
        i.prototype.__proto__ = Uint8Array.prototype;
        i.__proto__ = Uint8Array;
    } else {
        i.prototype.length = undefined;
        i.prototype.parent = undefined;
    }
    i.isBuffer = function(e) {
        return !(e == null || !e._isBuffer);
    };
    i.compare = function(e, t) {
        if (!i.isBuffer(e) || !i.isBuffer(t)) {
            throw new TypeError("Arguments must be Buffers");
        }
        if (e === t) {
            return 0;
        }
        for (var n = e.length, r = t.length, o = 0, s = Math.min(n, r); s > o && e[o] === t[o]; ) {
            ++o;
        }
        if (o !== s) {
            n = e[o];
            r = t[o];
        };
        if (r > n) {
            return -1;
        }
        if (n > r) {
            return 1;
        }
        return 0;
    };
    i.isEncoding = function(e) {
        switch (String(e).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "raw":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;

          default:
            return false;
        }
    };
    i.concat = function(e, t) {
        if (!Z(e)) {
            throw new TypeError("list argument must be an Array of Buffers.");
        }
        if (e.length === 0) {
            return new i(0);
        }
        var n;
        if (t === undefined) {
            for (t = 0, n = 0; n < e.length; n++) {
                t += e[n].length;
            }
        }
        var r = new i(t), o = 0;
        for (n = 0; n < e.length; n++) {
            var s = e[n];
            s.copy(r, o);
            o += s.length;
        }
        return r;
    };
    i.byteLength = b;
    i.prototype.toString = function() {
        var e = 0 | this.length;
        if (e === 0) {
            return "";
        }
        if (arguments.length === 0) {
            return S(this, 0, e);
        }
        return y.apply(this, arguments);
    };
    i.prototype.equals = function(e) {
        if (!i.isBuffer(e)) {
            throw new TypeError("Argument must be a Buffer");
        }
        if (this === e) {
            return true;
        }
        return i.compare(this, e) === 0;
    };
    i.prototype.inspect = function() {
        var e = "", t = exports.INSPECT_MAX_BYTES;
        if (this.length > 0) {
            e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
            if (this.length > t) {
                e += " ... "
            };
        };
        return "<Buffer " + e + ">";
    };
    i.prototype.compare = function(e) {
        if (!i.isBuffer(e)) {
            throw new TypeError("Argument must be a Buffer");
        }
        if (this === e) {
            return 0;
        }
        return i.compare(this, e);
    };
    i.prototype.indexOf = function(e, t) {
        function n(e, t, n) {
            for (var r = -1, o = 0; n + o < e.length; o++) {
                if (e[n + o] === t[r === -1 ? 0 : o - r]) {
                    if (r === -1) {
                        r = o
                    };
                    if (o - r + 1 === t.length) {
                        return n + r;
                    }
                } else {
                    r = -1;
                }
            }
            return -1;
        }
        if (t > 2147483647) {
            t = 2147483647;
        } else {
            if (t < -2147483648) {
                t = -2147483648
            };
        }
        t >>= 0;
        if (this.length === 0) {
            return -1;
        }
        if (t >= this.length) {
            return -1;
        }
        if (t < 0) {
            t = Math.max(this.length + t, 0)
        };
        if (typeof e == "string") {
            if (e.length === 0) {
                return -1;
            }
            return String.prototype.indexOf.call(this, e, t);
        }
        if (i.isBuffer(e)) {
            return n(this, e, t);
        }
        if (typeof e == "number") {
            if (i.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === "function") {
                return Uint8Array.prototype.indexOf.call(this, e, t);
            }
            return n(this, [ e ], t);
        }
        throw new TypeError("val must be string, number or Buffer");
    };
    i.prototype.get = function(e) {
        console.log(".get() is deprecated. Access using array indexes instead.");
        return this.readUInt8(e);
    };
    i.prototype.set = function(e, t) {
        console.log(".set() is deprecated. Access using array indexes instead.");
        return this.writeUInt8(e, t);
    };
    i.prototype.write = function(e, t, n, r) {
        if (t === undefined) {
            r = "utf8";
            n = this.length;
            t = 0;
        } else if (n === undefined && typeof t == "string") {
            r = t;
            n = this.length;
            t = 0;
        } else if (isFinite(t)) {
            t = 0 | t;
            if (isFinite(n)) {
                n = 0 | n;
                if (r === undefined) {
                    r = "utf8"
                };
            } else {
                r = n;
                n = undefined;
            }
        } else {
            var o = r;
            r = t;
            t = 0 | n;
            n = o;
        }
        var i = this.length - t;
        if (n === undefined || n > i) {
            n = i
        };
        if (e.length > 0 && (n < 0 || t < 0) || t > this.length) {
            throw new RangeError("attempt to write outside buffer bounds");
        }
        if (!r) {
            r = "utf8"
        };
        for (var s = false; ;) {
            switch (r) {
              case "hex":
                return _(this, e, t, n);

              case "utf8":
              case "utf-8":
                return w(this, e, t, n);

              case "ascii":
                return k(this, e, t, n);

              case "binary":
                return x(this, e, t, n);

              case "base64":
                return C(this, e, t, n);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return E(this, e, t, n);

              default:
                if (s) {
                    throw new TypeError("Unknown encoding: " + r);
                }
                r = ("" + r).toLowerCase();
                s = true;
            }
        }
    };
    i.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        };
    };
    var Q = 4096;
    i.prototype.slice = function(e, t) {
        var n = this.length;
        e = ~~e;
        if (t === undefined) {
            t = n;
        } else {
            t = ~~t;
        }
        if (e < 0) {
            e += n;
            if (e < 0) {
                e = 0
            };
        } else {
            if (e > n) {
                e = n
            };
        }
        if (t < 0) {
            t += n;
            if (t < 0) {
                t = 0
            };
        } else {
            if (t > n) {
                t = n
            };
        }
        if (e > t) {
            t = e
        };
        var r;
        if (i.TYPED_ARRAY_SUPPORT) {
            r = i._augment(this.subarray(e, t));
        } else {
            var o = t - e;
            r = new i(o, undefined);
            for (var s = 0; o > s; s++) {
                r[s] = this[s + e];
            }
        }
        if (r.length) {
            r.parent = this.parent || this
        };
        return r;
    };
    i.prototype.readUIntLE = function(e, t, n) {
        e = 0 | e;
        t = 0 | t;
        if (!n) {
            O(e, t, this.length)
        };
        for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) {
            r += this[e + i] * o;
        }
        return r;
    };
    i.prototype.readUIntBE = function(e, t, n) {
        e = 0 | e;
        t = 0 | t;
        if (!n) {
            O(e, t, this.length)
        };
        for (var r = this[e + --t], o = 1; t > 0 && (o *= 256); ) {
            r += this[e + --t] * o;
        }
        return r;
    };
    i.prototype.readUInt8 = function(e, t) {
        if (!t) {
            O(e, 1, this.length)
        };
        return this[e];
    };
    i.prototype.readUInt16LE = function(e, t) {
        if (!t) {
            O(e, 2, this.length)
        };
        return this[e] | this[e + 1] << 8;
    };
    i.prototype.readUInt16BE = function(e, t) {
        if (!t) {
            O(e, 2, this.length)
        };
        return this[e] << 8 | this[e + 1];
    };
    i.prototype.readUInt32LE = function(e, t) {
        if (!t) {
            O(e, 4, this.length)
        };
        return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
    };
    i.prototype.readUInt32BE = function(e, t) {
        if (!t) {
            O(e, 4, this.length)
        };
        return 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
    };
    i.prototype.readIntLE = function(e, t, n) {
        e = 0 | e;
        t = 0 | t;
        if (!n) {
            O(e, t, this.length)
        };
        for (var r = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) {
            r += this[e + i] * o;
        }
        o *= 128;
        if (r >= o) {
            r -= Math.pow(2, 8 * t)
        };
        return r;
    };
    i.prototype.readIntBE = function(e, t, n) {
        e = 0 | e;
        t = 0 | t;
        if (!n) {
            O(e, t, this.length)
        };
        for (var r = t, o = 1, i = this[e + --r]; r > 0 && (o *= 256); ) {
            i += this[e + --r] * o;
        }
        o *= 128;
        if (i >= o) {
            i -= Math.pow(2, 8 * t)
        };
        return i;
    };
    i.prototype.readInt8 = function(e, t) {
        if (!t) {
            O(e, 1, this.length)
        };
        if (128 & this[e]) {
            return -1 * (255 - this[e] + 1);
        }
        return this[e];
    };
    i.prototype.readInt16LE = function(e, t) {
        if (!t) {
            O(e, 2, this.length)
        };
        var n = this[e] | this[e + 1] << 8;
        if (32768 & n) {
            return 4294901760 | n;
        }
        return n;
    };
    i.prototype.readInt16BE = function(e, t) {
        if (!t) {
            O(e, 2, this.length)
        };
        var n = this[e + 1] | this[e] << 8;
        if (32768 & n) {
            return 4294901760 | n;
        }
        return n;
    };
    i.prototype.readInt32LE = function(e, t) {
        if (!t) {
            O(e, 4, this.length)
        };
        return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
    };
    i.prototype.readInt32BE = function(e, t) {
        if (!t) {
            O(e, 4, this.length)
        };
        return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
    };
    i.prototype.readFloatLE = function(e, t) {
        if (!t) {
            O(e, 4, this.length)
        };
        return K.read(this, e, true, 23, 4);
    };
    i.prototype.readFloatBE = function(e, t) {
        if (!t) {
            O(e, 4, this.length)
        };
        return K.read(this, e, false, 23, 4);
    };
    i.prototype.readDoubleLE = function(e, t) {
        if (!t) {
            O(e, 8, this.length)
        };
        return K.read(this, e, true, 52, 8);
    };
    i.prototype.readDoubleBE = function(e, t) {
        if (!t) {
            O(e, 8, this.length)
        };
        return K.read(this, e, false, 52, 8);
    };
    i.prototype.writeUIntLE = function(e, t, n, r) {
        e = +e;
        t = 0 | t;
        n = 0 | n;
        if (!r) {
            I(this, e, t, n, Math.pow(2, 8 * n), 0)
        };
        var o = 1, i = 0;
        for (this[t] = 255 & e; ++i < n && (o *= 256); ) {
            this[t + i] = e / o & 255;
        }
        return t + n;
    };
    i.prototype.writeUIntBE = function(e, t, n, r) {
        e = +e;
        t = 0 | t;
        n = 0 | n;
        if (!r) {
            I(this, e, t, n, Math.pow(2, 8 * n), 0)
        };
        var o = n - 1, i = 1;
        for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); ) {
            this[t + o] = e / i & 255;
        }
        return t + n;
    };
    i.prototype.writeUInt8 = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 1, 255, 0)
        };
        if (!i.TYPED_ARRAY_SUPPORT) {
            e = Math.floor(e)
        };
        this[t] = 255 & e;
        return t + 1;
    };
    i.prototype.writeUInt16LE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 2, 65535, 0)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = 255 & e;
            this[t + 1] = e >>> 8;
        } else {
            P(this, e, t, true);
        }
        return t + 2;
    };
    i.prototype.writeUInt16BE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 2, 65535, 0)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 8;
            this[t + 1] = 255 & e;
        } else {
            P(this, e, t, false);
        }
        return t + 2;
    };
    i.prototype.writeUInt32LE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 4, 4294967295, 0)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t + 3] = e >>> 24;
            this[t + 2] = e >>> 16;
            this[t + 1] = e >>> 8;
            this[t] = 255 & e;
        } else {
            L(this, e, t, true);
        }
        return t + 4;
    };
    i.prototype.writeUInt32BE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 4, 4294967295, 0)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 24;
            this[t + 1] = e >>> 16;
            this[t + 2] = e >>> 8;
            this[t + 3] = 255 & e;
        } else {
            L(this, e, t, false);
        }
        return t + 4;
    };
    i.prototype.writeIntLE = function(e, t, n, r) {
        e = +e;
        t = 0 | t;
        if (!r) {
            var o = Math.pow(2, 8 * n - 1);
            I(this, e, t, n, o - 1, -o);
        }
        var i = 0, s = 1, a = e < 0 ? 1 : 0;
        for (this[t] = 255 & e; ++i < n && (s *= 256); ) {
            this[t + i] = (e / s >> 0) - a & 255;
        }
        return t + n;
    };
    i.prototype.writeIntBE = function(e, t, n, r) {
        e = +e;
        t = 0 | t;
        if (!r) {
            var o = Math.pow(2, 8 * n - 1);
            I(this, e, t, n, o - 1, -o);
        }
        var i = n - 1, s = 1, a = e < 0 ? 1 : 0;
        for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); ) {
            this[t + i] = (e / s >> 0) - a & 255;
        }
        return t + n;
    };
    i.prototype.writeInt8 = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 1, 127, -128)
        };
        if (!i.TYPED_ARRAY_SUPPORT) {
            e = Math.floor(e)
        };
        if (e < 0) {
            e = 255 + e + 1
        };
        this[t] = 255 & e;
        return t + 1;
    };
    i.prototype.writeInt16LE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 2, 32767, -32768)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = 255 & e;
            this[t + 1] = e >>> 8;
        } else {
            P(this, e, t, true);
        }
        return t + 2;
    };
    i.prototype.writeInt16BE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 2, 32767, -32768)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 8;
            this[t + 1] = 255 & e;
        } else {
            P(this, e, t, false);
        }
        return t + 2;
    };
    i.prototype.writeInt32LE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 4, 2147483647, -2147483648)
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = 255 & e;
            this[t + 1] = e >>> 8;
            this[t + 2] = e >>> 16;
            this[t + 3] = e >>> 24;
        } else {
            L(this, e, t, true);
        }
        return t + 4;
    };
    i.prototype.writeInt32BE = function(e, t, n) {
        e = +e;
        t = 0 | t;
        if (!n) {
            I(this, e, t, 4, 2147483647, -2147483648)
        };
        if (e < 0) {
            e = 4294967295 + e + 1
        };
        if (i.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 24;
            this[t + 1] = e >>> 16;
            this[t + 2] = e >>> 8;
            this[t + 3] = 255 & e;
        } else {
            L(this, e, t, false);
        }
        return t + 4;
    };
    i.prototype.writeFloatLE = function(e, t, n) {
        return B(this, e, t, true, n);
    };
    i.prototype.writeFloatBE = function(e, t, n) {
        return B(this, e, t, false, n);
    };
    i.prototype.writeDoubleLE = function(e, t, n) {
        return j(this, e, t, true, n);
    };
    i.prototype.writeDoubleBE = function(e, t, n) {
        return j(this, e, t, false, n);
    };
    i.prototype.copy = function(e, t, n, r) {
        if (!n) {
            n = 0
        };
        if (!(r || r === 0)) {
            r = this.length
        };
        if (t >= e.length) {
            t = e.length
        };
        if (!t) {
            t = 0
        };
        if (r > 0 && n > r) {
            r = n
        };
        if (r === n) {
            return 0;
        }
        if (e.length === 0 || this.length === 0) {
            return 0;
        }
        if (t < 0) {
            throw new RangeError("targetStart out of bounds");
        }
        if (n < 0 || n >= this.length) {
            throw new RangeError("sourceStart out of bounds");
        }
        if (r < 0) {
            throw new RangeError("sourceEnd out of bounds");
        }
        if (r > this.length) {
            r = this.length
        };
        if (e.length - t < r - n) {
            r = e.length - t + n
        };
        var o, s = r - n;
        if (this === e && t > n && r > t) {
            for (o = s - 1; o >= 0; o--) {
                e[o + t] = this[o + n];
            }
        } else if (s < 1e3 || !i.TYPED_ARRAY_SUPPORT) {
            for (o = 0; s > o; o++) {
                e[o + t] = this[o + n];
            }
        } else {
            e._set(this.subarray(n, n + s), t);
        }
        return s;
    };
    i.prototype.fill = function(e, t, n) {
        if (!e) {
            e = 0
        };
        if (!t) {
            t = 0
        };
        if (!n) {
            n = this.length
        };
        if (t > n) {
            throw new RangeError("end < start");
        }
        if (n !== t && this.length !== 0) {
            if (t < 0 || t >= this.length) {
                throw new RangeError("start out of bounds");
            }
            if (n < 0 || n > this.length) {
                throw new RangeError("end out of bounds");
            }
            var r;
            if (typeof e == "number") {
                for (r = t; n > r; r++) {
                    this[r] = e;
                }
            } else {
                var o = H(e.toString()), i = o.length;
                for (r = t; n > r; r++) {
                    this[r] = o[r % i];
                }
            }
            return this;
        }
    };
    i.prototype.toArrayBuffer = function() {
        if (typeof Uint8Array != "undefined") {
            if (i.TYPED_ARRAY_SUPPORT) {
                return new i(this).buffer;
            }
            for (var e = new Uint8Array(this.length), t = 0, n = e.length; n > t; t += 1) {
                e[t] = this[t];
            }
            return e.buffer;
        }
        throw new TypeError("Buffer.toArrayBuffer not supported in this browser");
    };
    var X = i.prototype;
    i._augment = function(e) {
        e.constructor = i;
        e._isBuffer = true;
        e._set = e.set;
        e.get = X.get;
        e.set = X.set;
        e.write = X.write;
        e.toString = X.toString;
        e.toLocaleString = X.toString;
        e.toJSON = X.toJSON;
        e.equals = X.equals;
        e.compare = X.compare;
        e.indexOf = X.indexOf;
        e.copy = X.copy;
        e.slice = X.slice;
        e.readUIntLE = X.readUIntLE;
        e.readUIntBE = X.readUIntBE;
        e.readUInt8 = X.readUInt8;
        e.readUInt16LE = X.readUInt16LE;
        e.readUInt16BE = X.readUInt16BE;
        e.readUInt32LE = X.readUInt32LE;
        e.readUInt32BE = X.readUInt32BE;
        e.readIntLE = X.readIntLE;
        e.readIntBE = X.readIntBE;
        e.readInt8 = X.readInt8;
        e.readInt16LE = X.readInt16LE;
        e.readInt16BE = X.readInt16BE;
        e.readInt32LE = X.readInt32LE;
        e.readInt32BE = X.readInt32BE;
        e.readFloatLE = X.readFloatLE;
        e.readFloatBE = X.readFloatBE;
        e.readDoubleLE = X.readDoubleLE;
        e.readDoubleBE = X.readDoubleBE;
        e.writeUInt8 = X.writeUInt8;
        e.writeUIntLE = X.writeUIntLE;
        e.writeUIntBE = X.writeUIntBE;
        e.writeUInt16LE = X.writeUInt16LE;
        e.writeUInt16BE = X.writeUInt16BE;
        e.writeUInt32LE = X.writeUInt32LE;
        e.writeUInt32BE = X.writeUInt32BE;
        e.writeIntLE = X.writeIntLE;
        e.writeIntBE = X.writeIntBE;
        e.writeInt8 = X.writeInt8;
        e.writeInt16LE = X.writeInt16LE;
        e.writeInt16BE = X.writeInt16BE;
        e.writeInt32LE = X.writeInt32LE;
        e.writeInt32BE = X.writeInt32BE;
        e.writeFloatLE = X.writeFloatLE;
        e.writeFloatBE = X.writeFloatBE;
        e.writeDoubleLE = X.writeDoubleLE;
        e.writeDoubleBE = X.writeDoubleBE;
        e.fill = X.fill;
        e.inspect = X.inspect;
        e.toArrayBuffer = X.toArrayBuffer;
        return e;
    };
    var ee = /[^+\/0-9A-Za-z-_]/g;
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
