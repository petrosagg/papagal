(function(t) {
    function r(e, t) {
        var r = "b" + global.packets[e.type] + e.data.data;
        return t(r);
    }
    function o(e, t, r) {
        if (!t) {
            return global.encodeBase64Packet(e, r);
        }
        var o = e.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
        s[0] = v[e.type];
        for (var a = 0; a < i.length; a++) {
            s[a + 1] = i[a];
        }
        return r(s.buffer);
    }
    function i(e, t, r) {
        if (!t) {
            return global.encodeBase64Packet(e, r);
        }
        var o = new FileReader();
        o.onload = function() {
            e.data = o.result;
            global.encodePacket(e, t, !0, r);
        };
        return o.readAsArrayBuffer(e.data);
    }
    function s(e, t, r) {
        if (!t) {
            return global.encodeBase64Packet(e, r);
        }
        if (g) {
            return i(e, t, r);
        }
        var o = new Uint8Array(1);
        o[0] = v[e.type];
        var s = new _([ o.buffer, e.data ]);
        return r(s);
    }
    function a(e, t, n) {
        for (var r = new Array(e.length), o = d(e.length, n), i = function(e, n, o) {
            t(n, function(t, n) {
                r[e] = n;
                o(t, r);
            });
        }, s = 0; s < e.length; s++) {
            i(s, e[s], o);
        }
    }
    var u = require("./keys"), l = require("has-binary"), c = require("arraybuffer.slice"), p = require("base64-arraybuffer"), d = require("after"), h = require("utf8"), f = navigator.userAgent.match(/Android/i), m = /PhantomJS/i.test(navigator.userAgent), g = f || m;
    global.protocol = 3;
    var v = global.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
    }, b = u(v), y = {
        type: "error",
        data: "parser error"
    }, _ = require("blob");
    global.encodePacket = function(e, n, i, a) {
        if (typeof n == "function") {
            a = n, n = !1
        };
        if (typeof i == "function") {
            a = i, i = null
        };
        var u = e.data === void 0 ? void 0 : e.data.buffer || e.data;
        if (t.ArrayBuffer && u instanceof ArrayBuffer) {
            return o(e, n, a);
        }
        if (_ && u instanceof t.Blob) {
            return s(e, n, a);
        }
        if (u && u.base64) {
            return r(e, a);
        }
        var l = v[e.type];
        if (void 0 !== e.data) {
            l += i ? h.encode(String(e.data)) : String(e.data)
        };
        return a("" + l);
    };
    global.encodeBase64Packet = function(e, r) {
        var o = "b" + global.packets[e.type];
        if (_ && e.data instanceof _) {
            var i = new FileReader();
            i.onload = function() {
                var e = i.result.split(",")[1];
                r(o + e);
            };
            return i.readAsDataURL(e.data);
        }
        var s;
        try {
            s = String.fromCharCode.apply(null, new Uint8Array(e.data));
        } catch (a) {
            for (var u = new Uint8Array(e.data), l = new Array(u.length), c = 0; c < u.length; c++) l[c] = u[c];
            s = String.fromCharCode.apply(null, l);
        }
        o += t.btoa(s);
        return r(o);
    };
    global.decodePacket = function(e, t, r) {
        if (typeof e == "string" || e === void 0) {
            if (e.charAt(0) == "b") {
                return global.decodeBase64Packet(e.substr(1), t);
            }
            if (r) {
                try {
                    e = h.decode(e);
                } catch (o) {
                    return y;
                }
            }
            var i = e.charAt(0);
            if (Number(i) == i && b[i]) {
                if (e.length > 1) {
                    return {
                        type: b[i],
                        data: e.substring(1)
                    };
                }
                return {
                    type: b[i]
                };
            }
            return y;
        }
        var s = new Uint8Array(e), i = s[0], a = c(e, 1);
        if (_ && t === "blob") {
            a = new _([ a ])
        };
        return {
            type: b[i],
            data: a
        };
    };
    global.decodeBase64Packet = function(e, n) {
        var r = b[e.charAt(0)];
        if (!t.ArrayBuffer) {
            return {
                type: r,
                data: {
                    base64: !0,
                    data: e.substr(1)
                }
            };
        }
        var o = p.decode(e.substr(1));
        if (n === "blob" && _) {
            o = new _([ o ])
        };
        return {
            type: r,
            data: o
        };
    };
    global.encodePayload = function(e, t, r) {
        function o(e) {
            return e.length + ":" + e;
        }
        function i(e, r) {
            global.encodePacket(e, s ? t : !1, !0, function(e) {
                r(null, o(e));
            });
        }
        if (typeof t == "function") {
            r = t, t = null
        };
        var s = l(e);
        if (t && s) {
            if (_ && !g) {
                return global.encodePayloadAsBlob(e, r);
            }
            return global.encodePayloadAsArrayBuffer(e, r);
        }
        if (e.length) {
            return void a(e, i, function(e, t) {
                return r(t.join(""));
            });
        }
        return r("0:");
    };
    global.decodePayload = function(e, t, r) {
        if (typeof e != "string") {
            return global.decodePayloadAsBinary(e, t, r);
        }
        if (typeof t == "function") {
            r = t, t = null
        };
        var o;
        if (e == "") {
            return r(y, 0, 1);
        }
        for (var i, s, a = "", u = 0, l = e.length; l > u; u++) {
            var c = e.charAt(u);
            if (c != ":") {
                a += c;
            } else {
                if (a == "" || a != (i = Number(a))) {
                    return r(y, 0, 1);
                }
                s = e.substr(u + 1, i)
                if (a != s.length) {
                    return r(y, 0, 1);
                }
                if (s.length) {
                    o = global.decodePacket(s, t, !0)
                    if (y.type == o.type && y.data == o.data) {
                        return r(y, 0, 1);
                    }
                    var p = r(o, u + i, l);
                    if (p === !1) {
                        return;
                    }
                }
                u += i;
                a = "";
            }
        }
        if (a != "") {
            return r(y, 0, 1);
        }
        return;
    };
    global.encodePayloadAsArrayBuffer = function(e, t) {
        function r(e, t) {
            global.encodePacket(e, !0, !0, function(e) {
                return t(null, e);
            });
        }
        if (e.length) {
            return void a(e, r, function(e, n) {
                var r = n.reduce(function(e, t) {
                    var n;
                    n = typeof t == "string" ? t.length : t.byteLength;
                    return e + n.toString().length + n + 2;
                }, 0), o = new Uint8Array(r), i = 0;
                n.forEach(function(e) {
                    var t = typeof e == "string", n = e;
                    if (t) {
                        for (var r = new Uint8Array(e.length), s = 0; s < e.length; s++) {
                            r[s] = e.charCodeAt(s);
                        }
                        n = r.buffer;
                    }
                    t ? o[i++] = 0 : o[i++] = 1;
                    for (var a = n.byteLength.toString(), s = 0; s < a.length; s++) {
                        o[i++] = parseInt(a[s]);
                    }
                    o[i++] = 255;
                    for (var r = new Uint8Array(n), s = 0; s < r.length; s++) {
                        o[i++] = r[s];
                    }
                });
                return t(o.buffer);
            });
        }
        return t(new ArrayBuffer(0));
    };
    global.encodePayloadAsBlob = function(e, t) {
        function r(e, t) {
            global.encodePacket(e, !0, !0, function(e) {
                var n = new Uint8Array(1);
                n[0] = 1
                if (typeof e == "string") {
                    for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) {
                        r[o] = e.charCodeAt(o);
                    }
                    e = r.buffer;
                    n[0] = 0;
                }
                for (var i = e instanceof ArrayBuffer ? e.byteLength : e.size, s = i.toString(), a = new Uint8Array(s.length + 1), o = 0; o < s.length; o++) {
                    a[o] = parseInt(s[o]);
                }
                a[s.length] = 255
                if (_) {
                    var u = new _([ n.buffer, a.buffer, e ]);
                    t(null, u);
                }
            });
        }
        a(e, r, function(e, n) {
            return t(new _(n));
        });
    };
    global.decodePayloadAsBinary = function(e, t, r) {
        if (typeof t == "function") {
            r = t, t = null
        };
        for (var o = e, i = [], s = !1; o.byteLength > 0; ) {
            for (var a = new Uint8Array(o), u = a[0] === 0, l = "", p = 1; a[p] != 255; p++) {
                if (l.length > 310) {
                    s = !0;
                    break;
                }
                l += a[p];
            }
            if (s) {
                return r(y, 0, 1);
            }
            o = c(o, 2 + l.length);
            l = parseInt(l);
            var d = c(o, 0, l);
            if (u) {
                try {
                    d = String.fromCharCode.apply(null, new Uint8Array(d));
                } catch (h) {
                    var f = new Uint8Array(d);
                    d = "";
                    for (var p = 0; p < f.length; p++) d += String.fromCharCode(f[p]);
                }
            }
            i.push(d);
            o = c(o, l);
        }
        var m = i.length;
        i.forEach(function(e, o) {
            r(global.decodePacket(e, t, !0), o, m);
        });
    };
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});