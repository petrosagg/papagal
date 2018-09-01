"use strict";

function r() {
    T = D;
    S = new ne();
    ae();
    S.init();
    ue();
    return S;
}

var o, i = {
    DEBUG: false,
    LIB_VERSION: "2.13.0"
};

if (typeof window == "undefined") {
    o = {
        navigator: {}
    };
} else {
    o = window;
}

var s = Array.prototype, a = Function.prototype, u = Object.prototype, l = s.slice, c = u.toString, p = u.hasOwnProperty, d = o.console, h = o.navigator, f = o.document, m = h.userAgent, g = a.bind, v = s.forEach, b = s.indexOf, y = Array.isArray, _ = {}, w = {
    trim: function(e) {
        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
}, k = {
    log: function() {
        if (i.DEBUG && !w.isUndefined(d) && d) {
            try {
                d.log.apply(d, arguments);
            } catch (e) {
                w.each(arguments, function(e) {
                    d.log(e);
                });
            }
        }
    },
    error: function() {
        if (i.DEBUG && !w.isUndefined(d) && d) {
            var e = [ "Mixpanel error:" ].concat(w.toArray(arguments));
            try {
                d.error.apply(d, e);
            } catch (t) {
                w.each(e, function(e) {
                    d.error(e);
                });
            }
        }
    },
    critical: function() {
        if (!w.isUndefined(d) && d) {
            var e = [ "Mixpanel error:" ].concat(w.toArray(arguments));
            try {
                d.error.apply(d, e);
            } catch (t) {
                w.each(e, function(e) {
                    d.error(e);
                });
            }
        }
    }
};

w.bind = function(e, t) {
    var n, r;
    if (g && e.bind === g) {
        return g.apply(e, l.call(arguments, 1));
    }
    if (!w.isFunction(e)) {
        throw new TypeError();
    }
    n = l.call(arguments, 2);
    return r = function() {
        if (!(this instanceof r)) {
            return e.apply(t, n.concat(l.call(arguments)));
        }
        var o = {};
        o.prototype = e.prototype;
        var i = new o();
        o.prototype = null;
        var s = e.apply(i, n.concat(l.call(arguments)));
        if (Object(s) === s) {
            return s;
        }
        return i;
    };
};

w.bind_instance_methods = function(e) {
    for (var t in e) {
        if (typeof e[t] == "function") {
            e[t] = w.bind(e[t], e)
        };
    }
};

w.each = function(e, t, n) {
    if (e !== null && e !== undefined) {
        if (v && e.forEach === v) {
            e.forEach(t, n);
        } else if (e.length === +e.length) {
            for (var r = 0, o = e.length; o > r; r++) {
                if (r in e && t.call(n, e[r], r, e) === _) {
                    return;
                }
            }
        } else {
            for (var i in e) {
                if (p.call(e, i) && t.call(n, e[i], i, e) === _) {
                    return;
                }
            }
        }
    }
};

w.escapeHTML = function(e) {
    var t = e;
    if (t && w.isString(t)) {
        t = t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
    };
    return t;
};

w.extend = function(e) {
    w.each(l.call(arguments, 1), function(t) {
        for (var n in t) {
            if (t[n] !== undefined) {
                e[n] = t[n]
            };
        }
    });
    return e;
};

w.isArray = y || function(e) {
    return c.call(e) === "[object Array]";
};

w.isFunction = function(e) {
    try {
        return /^\s*\bfunction\b/.test(e);
    } catch (t) {
        return !1;
    }
};

w.isArguments = function(e) {
    return !(!e || !p.call(e, "callee"));
};

w.toArray = function(e) {
    if (e) {
        if (e.toArray) {
            return e.toArray();
        }
        if (w.isArray(e)) {
            return l.call(e);
        }
        if (w.isArguments(e)) {
            return l.call(e);
        }
        return w.values(e);
    }
    return [];
};

w.values = function(e) {
    var t = [];
    if (e === null) {
        return t;
    }
    w.each(e, function(e) {
        t[t.length] = e;
    });
    return t;
};

w.identity = function(e) {
    return e;
};

w.include = function(e, t) {
    var n = false;
    if (e === null) {
        return n;
    }
    if (b && e.indexOf === b) {
        return e.indexOf(t) != -1;
    }
    w.each(e, function(e) {
        if (n || (n = e === t)) {
            return _;
        }
        return;
    });
    return n;
};

w.includes = function(e, t) {
    return e.indexOf(t) !== -1;
};

w.inherit = function(e, t) {
    e.prototype = new t();
    e.prototype.constructor = e;
    e.superclass = t.prototype;
    return e;
};

w.isObject = function(e) {
    return e === Object(e) && !w.isArray(e);
};

w.isEmptyObject = function(e) {
    if (w.isObject(e)) {
        for (var t in e) {
            if (p.call(e, t)) {
                return false;
            }
        }
        return true;
    }
    return false;
};

w.isUndefined = function(e) {
    return e === undefined;
};

w.isString = function(e) {
    return c.call(e) == "[object String]";
};

w.isDate = function(e) {
    return c.call(e) == "[object Date]";
};

w.isNumber = function(e) {
    return c.call(e) == "[object Number]";
};

w.isElement = function(e) {
    return !(!e || e.nodeType !== 1);
};

w.encodeDates = function(e) {
    w.each(e, function(t, n) {
        if (w.isDate(t)) {
            e[n] = w.formatDate(t);
        } else {
            if (w.isObject(t)) {
                e[n] = w.encodeDates(t)
            };
        }
    });
    return e;
};

w.timestamp = function() {
    Date.now = Date.now || function() {
        return +new Date();
    };
    return Date.now();
};

w.formatDate = function(e) {
    function t(e) {
        if (e < 10) {
            return "0" + e;
        }
        return e;
    }
    return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds());
};

w.safewrap = function(e) {
    return function() {
        try {
            return e.apply(this, arguments);
        } catch (t) {
            k.critical("Implementation error. Please contact support@mixpanel.com.");
        }
    };
};

w.safewrap_class = function(e, t) {
    for (var n = 0; n < t.length; n++) {
        e.prototype[t[n]] = w.safewrap(e.prototype[t[n]]);
    }
};

w.safewrap_instance_methods = function(e) {
    for (var t in e) {
        if (typeof e[t] == "function") {
            e[t] = w.safewrap(e[t])
        };
    }
};

w.strip_empty_properties = function(e) {
    var t = {};
    w.each(e, function(e, n) {
        if (w.isString(e) && e.length > 0) {
            t[n] = e
        };
    });
    return t;
};

w.truncate = function(e, t) {
    var n;
    if (typeof e == "string") {
        n = e.slice(0, t);
    } else {
        if (w.isArray(e)) {
            n = [];
            w.each(e, function(e) {
                n.push(w.truncate(e, t));
            });
        } else {
            if (w.isObject(e)) {
                n = {};
                w.each(e, function(e, r) {
                    n[r] = w.truncate(e, t);
                });
            } else {
                n = e;
            }
        }
    }
    return n;
};

w.JSONEncode = function() {
    return function(e) {
        var t = e, n = function(e) {
            var t = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, n = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            };
            t.lastIndex = 0;
            if (t.test(e)) {
                return '"' + e.replace(t, function(e) {
                    var t = n[e];
                    if (typeof t == "string") {
                        return t;
                    }
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                }) + '"';
            }
            return '"' + e + '"';
        }, r = function(e, t) {
            var o = "", i = "    ", s = 0, a = "", u = "", l = 0, d = o, h = [], f = t[e];
            switch (f && "object" == typeof f && "function" == typeof f.toJSON && (f = f.toJSON(e)), 
            typeof f) {
              case "string":
                return n(f);

              case "number":
                if (isFinite(f)) {
                    return String(f);
                }
                return "null";

              case "boolean":
              case "null":
                return String(f);

              case "object":
                if (!f) {
                    return "null";
                }
                o += i;
                h = [];
                if (c.apply(f) === "[object Array]") {
                    for (l = f.length, s = 0; l > s; s += 1) {
                        h[s] = r(s, f) || "null";
                    }
                    if (h.length === 0) {
                        u = "[]";
                    } else {
                        if (o) {
                            u = "[\n" + o + h.join(",\n" + o) + "\n" + d + "]";
                        } else {
                            u = "[" + h.join(",") + "]";
                        }
                    }
                    o = d;
                    return u;
                }
                for (a in f) {
                    if (p.call(f, a)) {
                        u = r(a, f), u && h.push(n(a) + (o ? ": " : ":") + u)
                    };
                }
                if (h.length === 0) {
                    u = "{}";
                } else {
                    if (o) {
                        u = "{" + h.join(",") + d + "}";
                    } else {
                        u = "{" + h.join(",") + "}";
                    }
                }
                o = d;
                return u;
            }
        };
        return r("", {
            "": t
        });
    };
}();

w.JSONDecode = function() {
    var e, t, n, r, o = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t"
    }, i = function(t) {
        throw {
            name: "SyntaxError",
            message: t,
            at: e,
            text: n
        };
    }, s = function(r) {
        if (r && r !== t) {
            i("Expected '" + r + "' instead of '" + t + "'")
        };
        t = n.charAt(e);
        e += 1;
        return t;
    }, a = function() {
        var e, n = "";
        for (t === "-" && (n = "-", s("-")); t >= "0" && t <= "9"; ) {
            n += t;
            s();
        }
        if (t === ".") {
            for (n += "."; s() && t >= "0" && t <= "9"; ) {
                n += t;
            }
        }
        if (t === "e" || t === "E") {
            for (n += t, s(), (t === "-" || t === "+") && (n += t, s()); t >= "0" && t <= "9"; ) {
                n += t;
                s();
            }
        }
        e = +n;
        if (isFinite(e)) {
            return e;
        }
        return void i("Bad number");
    }, u = function() {
        var e, n, r, a = "";
        if (t === '"') {
            for (;s(); ) {
                if (t === '"') {
                    s();
                    return a;
                }
                if (t === "\\") {
                    s();
                    if (t === "u") {
                        for (r = 0, n = 0; n < 4 && (e = parseInt(s(), 16), isFinite(e)); n += 1) {
                            r = 16 * r + e;
                        }
                        a += String.fromCharCode(r);
                    } else {
                        if (typeof o[t] != "string") {
                            break;
                        }
                        a += o[t];
                    }
                } else {
                    a += t;
                }
            }
        }
        i("Bad string");
    }, l = function() {
        for (;t && t <= " "; ) {
            s();
        }
    }, c = function() {
        switch (t) {
          case "t":
            s("t");
            s("r");
            s("u");
            s("e");
            return true;

          case "f":
            s("f");
            s("a");
            s("l");
            s("s");
            s("e");
            return false;

          case "n":
            s("n");
            s("u");
            s("l");
            s("l");
            return null;
        }
        i('Unexpected "' + t + '"');
    }, p = function() {
        var e = [];
        if (t === "[") {
            s("[");
            l();
            if (t === "]") {
                s("]");
                return e;
            }
            for (;t; ) {
                e.push(r());
                l();
                if (t === "]") {
                    s("]");
                    return e;
                }
                s(",");
                l();
            }
        }
        i("Bad array");
    }, d = function() {
        var e, n = {};
        if (t === "{") {
            s("{");
            l();
            if (t === "}") {
                s("}");
                return n;
            }
            for (;t; ) {
                e = u();
                l();
                s(":");
                if (Object.hasOwnProperty.call(n, e)) {
                    i('Duplicate key "' + e + '"')
                };
                n[e] = r();
                l();
                if (t === "}") {
                    s("}");
                    return n;
                }
                s(",");
                l();
            }
        }
        i("Bad object");
    };
    r = function() {
        switch (l(), t) {
          case "{":
            return d();

          case "[":
            return p();

          case '"':
            return u();

          case "-":
            return a();

          default:
            if (t >= "0" && t <= "9") {
                return a();
            }
            return c();
        }
    };
    return function(o) {
        var s;
        n = o;
        e = 0;
        t = " ";
        s = r();
        l();
        if (t) {
            i("Syntax error")
        };
        return s;
    };
}();

w.base64Encode = function(e) {
    var t, n, r, o, i, s, a, u, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", c = 0, p = 0, d = "", h = [];
    if (!e) {
        return e;
    }
    e = w.utf8Encode(e);
    do {
        t = e.charCodeAt(c++);
        n = e.charCodeAt(c++);
        r = e.charCodeAt(c++);
        u = t << 16 | n << 8 | r;
        o = u >> 18 & 63;
        i = u >> 12 & 63;
        s = u >> 6 & 63;
        a = 63 & u;
        h[p++] = l.charAt(o) + l.charAt(i) + l.charAt(s) + l.charAt(a);
    } while (c < e.length);
    switch (d = h.join(""), e.length % 3) {
      case 1:
        d = d.slice(0, -2) + "==";
        break;

      case 2:
        d = d.slice(0, -1) + "=";
    }
    return d;
};

w.utf8Encode = function(e) {
    e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    var t, n, r, o = "", i = 0;
    for (t = n = 0, i = e.length, r = 0; i > r; r++) {
        var s = e.charCodeAt(r), a = null;
        if (s < 128) {
            n++;
        } else {
            if (s > 127 && s < 2048) {
                a = String.fromCharCode(s >> 6 | 192, 63 & s | 128);
            } else {
                a = String.fromCharCode(s >> 12 | 224, s >> 6 & 63 | 128, 63 & s | 128);
            }
        }
        if (a !== null) {
            n > t && (o += e.substring(t, n)), o += a, t = n = r + 1
        };
    }
    if (n > t) {
        o += e.substring(t, e.length)
    };
    return o;
};

w.UUID = function() {
    var e = function() {
        for (var e = 1 * new Date(), t = 0; e == 1 * new Date(); ) {
            t++;
        }
        return e.toString(16) + t.toString(16);
    }, t = function() {
        return Math.random().toString(16).replace(".", "");
    }, n = function() {
        function e(e, t) {
            var n, r = 0;
            for (n = 0; n < t.length; n++) {
                r |= o[n] << 8 * n;
            }
            return e ^ r;
        }
        var t, n, r = m, o = [], i = 0;
        for (t = 0; t < r.length; t++) {
            n = r.charCodeAt(t);
            o.unshift(255 & n);
            if (o.length >= 4) {
                i = e(i, o), o = []
            };
        }
        if (o.length > 0) {
            i = e(i, o)
        };
        return i.toString(16);
    };
    return function() {
        var r = (screen.height * screen.width).toString(16);
        return e() + "-" + t() + "-" + n() + "-" + r + "-" + e();
    };
}();

w.isBlockedUA = function(e) {
    if (/(google web preview|baiduspider|yandexbot|bingbot|googlebot|yahoo! slurp)/i.test(e)) {
        return true;
    }
    return false;
};

w.HTTPBuildQuery = function(e, t) {
    var n, r, o = [];
    if (w.isUndefined(t)) {
        t = "&"
    };
    w.each(e, function(e, t) {
        n = encodeURIComponent(e.toString());
        r = encodeURIComponent(t);
        o[o.length] = r + "=" + n;
    });
    return o.join(t);
};

w.getQueryParam = function(e, t) {
    t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var n = "[\\?&]" + t + "=([^&#]*)", r = new RegExp(n), o = r.exec(e);
    if (o === null || o && typeof o[1] != "string" && o[1].length) {
        return "";
    }
    return decodeURIComponent(o[1]).replace(/\+/g, " ");
};

w.getHashParam = function(e, t) {
    var n = e.match(new RegExp(t + "=([^&]*)"));
    if (n) {
        return n[1];
    }
    return null;
};

w.cookie = {
    get: function(e) {
        for (var t = e + "=", n = f.cookie.split(";"), r = 0; r < n.length; r++) {
            for (var o = n[r]; o.charAt(0) == " "; ) {
                o = o.substring(1, o.length);
            }
            if (o.indexOf(t) === 0) {
                return decodeURIComponent(o.substring(t.length, o.length));
            }
        }
        return null;
    },
    parse: function(e) {
        var t;
        try {
            t = w.JSONDecode(w.cookie.get(e)) || {};
        } catch (n) {}
        return t;
    },
    set_seconds: function(e, t, n, r, o) {
        var i = "", s = "", a = "";
        if (r) {
            var u = f.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i), l = u ? u[0] : "";
            if (l) {
                i = "; domain=." + l;
            } else {
                i = "";
            }
        }
        if (n) {
            var c = new Date();
            c.setTime(c.getTime() + 1e3 * n);
            s = "; expires=" + c.toGMTString();
        }
        if (o) {
            a = "; secure"
        };
        f.cookie = e + "=" + encodeURIComponent(t) + s + "; path=/" + i + a;
    },
    set: function(e, t, n, r, o) {
        var i = "", s = "", a = "";
        if (r) {
            var u = f.location.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i), l = u ? u[0] : "";
            if (l) {
                i = "; domain=." + l;
            } else {
                i = "";
            }
        }
        if (n) {
            var c = new Date();
            c.setTime(c.getTime() + 24 * n * 60 * 60 * 1e3);
            s = "; expires=" + c.toGMTString();
        }
        if (o) {
            a = "; secure"
        };
        var p = e + "=" + encodeURIComponent(t) + s + "; path=/" + i + a;
        f.cookie = p;
        return p;
    },
    remove: function(e, t) {
        w.cookie.set(e, "", -1, t);
    }
};

w.localStorage = {
    error: function(e) {
        k.error("localStorage error: " + e);
    },
    get: function(e) {
        try {
            return window.localStorage.getItem(e);
        } catch (t) {
            w.localStorage.error(t);
        }
        return null;
    },
    parse: function(e) {
        try {
            return w.JSONDecode(w.localStorage.get(e)) || {};
        } catch (t) {}
        return null;
    },
    set: function(e, t) {
        try {
            window.localStorage.setItem(e, t);
        } catch (n) {
            w.localStorage.error(n);
        }
    },
    remove: function(e) {
        try {
            window.localStorage.removeItem(e);
        } catch (t) {
            w.localStorage.error(t);
        }
    }
};

w.register_event = function() {
    function e(e, n, r) {
        var o = function(o) {
            o = o || t(window.event);
            if (!o) {
                return undefined;
            }
            var i, s, a = true;
            if (w.isFunction(r)) {
                i = r(o)
            };
            s = n.call(e, o);
            if (i === false || s === false) {
                a = false
            };
            return a;
        };
        return o;
    }
    function t(e) {
        if (e) {
            e.preventDefault = t.preventDefault, e.stopPropagation = t.stopPropagation
        };
        return e;
    }
    var register_event = function(t, n, r, o, i) {
        if (!t) {
            return void k.error("No valid element provided to register_event");
        }
        if (t.addEventListener && !o) {
            t.addEventListener(n, r, !!i);
        } else {
            var s = "on" + n, a = t[s];
            t[s] = e(t, r, a);
        }
    };
    t.preventDefault = function() {
        this.returnValue = false;
    };
    t.stopPropagation = function() {
        this.cancelBubble = true;
    };
    return register_event;
}();

w.dom_query = function() {
    function e(e) {
        if (e.all) {
            return e.all;
        }
        return e.getElementsByTagName("*");
    }
    function t(e, t) {
        var n = " " + t + " ";
        return (" " + e.className + " ").replace(r, " ").indexOf(n) >= 0;
    }
    function n(n) {
        if (!f.getElementsByTagName) {
            return [];
        }
        var r, o, i, s, a, u, l, c, p, d, h = n.split(" "), m = [ f ];
        for (u = 0; u < h.length; u++) {
            r = h[u].replace(/^\s+/, "").replace(/\s+$/, "");
            if (r.indexOf("#") > -1) {
                o = r.split("#");
                i = o[0];
                var g = o[1], v = f.getElementById(g);
                if (!v || i && v.nodeName.toLowerCase() != i) {
                    return [];
                }
                m = [ v ];
            } else if (r.indexOf(".") > -1) {
                o = r.split(".");
                i = o[0];
                var b = o[1];
                for (i || (i = "*"), s = [], a = 0, l = 0; l < m.length; l++) {
                    for (p = i == "*" ? e(m[l]) : m[l].getElementsByTagName(i), c = 0; c < p.length; c++) {
                        s[a++] = p[c];
                    }
                }
                for (m = [], d = 0, l = 0; l < s.length; l++) {
                    if (s[l].className && w.isString(s[l].className) && t(s[l], b)) {
                        m[d++] = s[l]
                    };
                }
            } else {
                var y = r.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/);
                if (y) {
                    i = y[1];
                    var _ = y[2], k = y[3], x = y[4];
                    for (i || (i = "*"), s = [], a = 0, l = 0; l < m.length; l++) {
                        for (p = i == "*" ? e(m[l]) : m[l].getElementsByTagName(i), c = 0; c < p.length; c++) {
                            s[a++] = p[c];
                        }
                    }
                    m = [];
                    d = 0;
                    var C;
                    switch (k) {
                      case "=":
                        C = function(e) {
                            return e.getAttribute(_) == x;
                        };
                        break;

                      case "~":
                        C = function(e) {
                            return e.getAttribute(_).match(new RegExp("\\b" + x + "\\b"));
                        };
                        break;

                      case "|":
                        C = function(e) {
                            return e.getAttribute(_).match(new RegExp("^" + x + "-?"));
                        };
                        break;

                      case "^":
                        C = function(e) {
                            return e.getAttribute(_).indexOf(x) === 0;
                        };
                        break;

                      case "$":
                        C = function(e) {
                            return e.getAttribute(_).lastIndexOf(x) == e.getAttribute(_).length - x.length;
                        };
                        break;

                      case "*":
                        C = function(e) {
                            return e.getAttribute(_).indexOf(x) > -1;
                        };
                        break;

                      default:
                        C = function(e) {
                            return e.getAttribute(_);
                        };
                    }
                    for (m = [], d = 0, l = 0; l < s.length; l++) {
                        if (C(s[l])) {
                            m[d++] = s[l]
                        };
                    }
                } else {
                    for (i = r, s = [], a = 0, l = 0; l < m.length; l++) {
                        for (p = m[l].getElementsByTagName(i), c = 0; c < p.length; c++) {
                            s[a++] = p[c];
                        }
                    }
                    m = s;
                }
            }
        }
        return m;
    }
    var r = /[\t\r\n]/g;
    return function(e) {
        if (w.isElement(e)) {
            return [ e ];
        }
        if (w.isObject(e) && !w.isUndefined(e.length)) {
            return e;
        }
        return n.call(this, e);
    };
}();

w.info = {
    campaignParams: function() {
        var e = "utm_source utm_medium utm_campaign utm_content utm_term".split(" "), t = "", n = {};
        w.each(e, function(e) {
            t = w.getQueryParam(f.URL, e);
            if (t.length) {
                n[e] = t
            };
        });
        return n;
    },
    searchEngine: function(e) {
        if (e.search("https?://(.*)google.([^/?]*)") === 0) {
            return "google";
        }
        if (e.search("https?://(.*)bing.com") === 0) {
            return "bing";
        }
        if (e.search("https?://(.*)yahoo.com") === 0) {
            return "yahoo";
        }
        if (e.search("https?://(.*)duckduckgo.com") === 0) {
            return "duckduckgo";
        }
        return null;
    },
    searchInfo: function(e) {
        var t = w.info.searchEngine(e), n = t != "yahoo" ? "q" : "p", r = {};
        if (t !== null) {
            r.$search_engine = t;
            var o = w.getQueryParam(e, n);
            if (o.length) {
                r.mp_keyword = o
            };
        }
        return r;
    },
    browser: function(e, t, n) {
        t = t || "";
        if (n || w.includes(e, " OPR/")) {
            if (w.includes(e, "Mini")) {
                return "Opera Mini";
            }
            return "Opera";
        }
        if (/(BlackBerry|PlayBook|BB10)/i.test(e)) {
            return "BlackBerry";
        }
        if (w.includes(e, "IEMobile") || w.includes(e, "WPDesktop")) {
            return "Internet Explorer Mobile";
        }
        if (w.includes(e, "Edge")) {
            return "Microsoft Edge";
        }
        if (w.includes(e, "FBIOS")) {
            return "Facebook Mobile";
        }
        if (w.includes(e, "Chrome")) {
            return "Chrome";
        }
        if (w.includes(e, "CriOS")) {
            return "Chrome iOS";
        }
        if (w.includes(e, "UCWEB") || w.includes(e, "UCBrowser")) {
            return "UC Browser";
        }
        if (w.includes(e, "FxiOS")) {
            return "Firefox iOS";
        }
        if (w.includes(t, "Apple")) {
            if (w.includes(e, "Mobile")) {
                return "Mobile Safari";
            }
            return "Safari";
        }
        if (w.includes(e, "Android")) {
            return "Android Mobile";
        }
        if (w.includes(e, "Konqueror")) {
            return "Konqueror";
        }
        if (w.includes(e, "Firefox")) {
            return "Firefox";
        }
        if (w.includes(e, "MSIE") || w.includes(e, "Trident/")) {
            return "Internet Explorer";
        }
        if (w.includes(e, "Gecko")) {
            return "Mozilla";
        }
        return "";
    },
    browserVersion: function(e, t, n) {
        var r = w.info.browser(e, t, n), o = {
            "Internet Explorer Mobile": /rv:(\d+(\.\d+)?)/,
            "Microsoft Edge": /Edge\/(\d+(\.\d+)?)/,
            Chrome: /Chrome\/(\d+(\.\d+)?)/,
            "Chrome iOS": /CriOS\/(\d+(\.\d+)?)/,
            "UC Browser": /(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,
            Safari: /Version\/(\d+(\.\d+)?)/,
            "Mobile Safari": /Version\/(\d+(\.\d+)?)/,
            Opera: /(Opera|OPR)\/(\d+(\.\d+)?)/,
            Firefox: /Firefox\/(\d+(\.\d+)?)/,
            "Firefox iOS": /FxiOS\/(\d+(\.\d+)?)/,
            Konqueror: /Konqueror:(\d+(\.\d+)?)/,
            BlackBerry: /BlackBerry (\d+(\.\d+)?)/,
            "Android Mobile": /android\s(\d+(\.\d+)?)/,
            "Internet Explorer": /(rv:|MSIE )(\d+(\.\d+)?)/,
            Mozilla: /rv:(\d+(\.\d+)?)/
        }, i = o[r];
        if (i === undefined) {
            return null;
        }
        var s = e.match(i);
        if (s) {
            return parseFloat(s[s.length - 2]);
        }
        return null;
    },
    os: function() {
        var e = m;
        if (/Windows/i.test(e)) {
            if (/Phone/.test(e) || /WPDesktop/.test(e)) {
                return "Windows Phone";
            }
            return "Windows";
        }
        if (/(iPhone|iPad|iPod)/.test(e)) {
            return "iOS";
        }
        if (/Android/.test(e)) {
            return "Android";
        }
        if (/(BlackBerry|PlayBook|BB10)/i.test(e)) {
            return "BlackBerry";
        }
        if (/Mac/i.test(e)) {
            return "Mac OS X";
        }
        if (/Linux/.test(e)) {
            return "Linux";
        }
        return "";
    },
    device: function(e) {
        if (/Windows Phone/i.test(e) || /WPDesktop/.test(e)) {
            return "Windows Phone";
        }
        if (/iPad/.test(e)) {
            return "iPad";
        }
        if (/iPod/.test(e)) {
            return "iPod Touch";
        }
        if (/iPhone/.test(e)) {
            return "iPhone";
        }
        if (/(BlackBerry|PlayBook|BB10)/i.test(e)) {
            return "BlackBerry";
        }
        if (/Android/.test(e)) {
            return "Android";
        }
        return "";
    },
    referringDomain: function(e) {
        var t = e.split("/");
        if (t.length >= 3) {
            return t[2];
        }
        return "";
    },
    properties: function() {
        return w.extend(w.strip_empty_properties({
            $os: w.info.os(),
            $browser: w.info.browser(m, h.vendor, window.opera),
            $referrer: f.referrer,
            $referring_domain: w.info.referringDomain(f.referrer),
            $device: w.info.device(m)
        }), {
            $current_url: window.location.href,
            $browser_version: w.info.browserVersion(m, h.vendor, window.opera),
            $screen_height: screen.height,
            $screen_width: screen.width,
            mp_lib: "web",
            $lib_version: i.LIB_VERSION
        });
    },
    people_properties: function() {
        return w.extend(w.strip_empty_properties({
            $os: w.info.os(),
            $browser: w.info.browser(m, h.vendor, window.opera)
        }), {
            $browser_version: w.info.browserVersion(m, h.vendor, window.opera)
        });
    },
    pageviewInfo: function(e) {
        return w.strip_empty_properties({
            mp_page: e,
            mp_referrer: f.referrer,
            mp_browser: w.info.browser(m, h.vendor, window.opera),
            mp_platform: w.info.os()
        });
    }
};

w.toArray = w.toArray;

w.isObject = w.isObject;

w.JSONEncode = w.JSONEncode;

w.JSONDecode = w.JSONDecode;

w.isBlockedUA = w.isBlockedUA;

w.isEmptyObject = w.isEmptyObject;

w.info = w.info;

w.info.device = w.info.device;

w.info.browser = w.info.browser;

w.info.properties = w.info.properties;

var x = 1, C = 3, E = {
    _initializedTokens: [],
    _previousElementSibling: function(e) {
        if (e.previousElementSibling) {
            return e.previousElementSibling;
        }
        do {
            e = e.previousSibling;
        } while (e && e.nodeType !== x);
        return e;
    },
    _loadScript: function(e, t) {
        var n = document.createElement("script");
        n.type = "text/javascript";
        n.src = e;
        n.onload = t;
        var r = document.getElementsByTagName("script");
        if (r.length > 0) {
            r[0].parentNode.insertBefore(n, r[0]);
        } else {
            document.body.appendChild(n);
        }
    },
    _getClassName: function(e) {
        switch (typeof e.className) {
          case "string":
            return e.className;

          case "object":
            return e.className.baseVal || e.getAttribute("class") || "";

          default:
            return "";
        }
    },
    _getPropertiesFromElement: function(e) {
        var t = {
            classes: this._getClassName(e).split(" "),
            tag_name: e.tagName.toLowerCase()
        };
        if (w.includes([ "input", "select", "textarea" ], e.tagName.toLowerCase())) {
            var n = this._getFormFieldValue(e);
            if (this._includeProperty(e, n)) {
                t.value = n
            };
        }
        w.each(e.attributes, function(e) {
            t["attr__" + e.name] = e.value;
        });
        for (var r = 1, o = 1, i = e; i = this._previousElementSibling(i); ) {
            r++;
            if (i.tagName === e.tagName) {
                o++
            };
        }
        t.nth_child = r;
        t.nth_of_type = o;
        return t;
    },
    _isTag: function(e, t) {
        return e && e.tagName && e.tagName.toLowerCase() === t.toLowerCase();
    },
    _shouldTrackDomEvent: function(e, t) {
        if (!e || this._isTag(e, "html") || e.nodeType !== x) {
            return false;
        }
        var n = e.tagName.toLowerCase();
        switch (n) {
          case "html":
            return false;

          case "form":
            return t.type === "submit";

          case "input":
            if ([ "button", "submit" ].indexOf(e.getAttribute("type")) === -1) {
                return t.type === "change";
            }
            return t.type === "click";

          case "select":
          case "textarea":
            return t.type === "change";

          default:
            return t.type === "click";
        }
    },
    _getDefaultProperties: function(e) {
        return {
            $event_type: e,
            $ce_version: 1,
            $host: window.location.host,
            $pathname: window.location.pathname
        };
    },
    _getInputValue: function(e) {
        var t = null, n = e.type.toLowerCase();
        switch (n) {
          case "checkbox":
            if (e.checked) {
                t = [ e.value ]
            };
            break;

          case "radio":
            if (e.checked) {
                t = e.value
            };
            break;

          default:
            t = e.value;
        }
        return t;
    },
    _getSelectValue: function(e) {
        var t;
        if (e.multiple) {
            var n = [];
            w.each(e.querySelectorAll("[selected]"), function(e) {
                n.push(e.value);
            });
            t = n;
        } else {
            t = e.value;
        }
        return t;
    },
    _includeProperty: function(e, t) {
        for (var n = e; n.parentNode && !this._isTag(n, "body"); n = n.parentNode) {
            var r = this._getClassName(n).split(" ");
            if (w.includes(r, "mp-sensitive") || w.includes(r, "mp-no-track")) {
                return false;
            }
        }
        if (w.includes(this._getClassName(e).split(" "), "mp-include")) {
            return true;
        }
        if (t === null) {
            return false;
        }
        var o = e.type || "";
        switch (o.toLowerCase()) {
          case "hidden":
            return false;

          case "password":
            return false;
        }
        var i = e.name || e.id || "", s = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|seccode|securitycode|securitynum|socialsec|socsec|ssn/i;
        if (s.test(i.replace(/[^a-zA-Z0-9]/g, ""))) {
            return false;
        }
        if (typeof t == "string") {
            var a = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/;
            if (a.test((t || "").replace(/[\- ]/g, ""))) {
                return false;
            }
            var u = /(^\d{3}-?\d{2}-?\d{4}$)/;
            if (u.test(t)) {
                return false;
            }
        }
        return true;
    },
    _getFormFieldValue: function(e) {
        var t;
        switch (e.tagName.toLowerCase()) {
          case "input":
            t = this._getInputValue(e);
            break;

          case "select":
            t = this._getSelectValue(e);
            break;

          default:
            t = e.value || e.textContent;
        }
        if (this._includeProperty(e, t)) {
            return t;
        }
        return null;
    },
    _getFormFieldProperties: function(e) {
        var t = {};
        w.each(e.elements, function(e) {
            var n = e.getAttribute("name") || e.getAttribute("id");
            if (n !== null) {
                n = "$form_field__" + n;
                var r = this._getFormFieldValue(e);
                if (this._includeProperty(e, r)) {
                    var o = t[n];
                    if (o !== undefined) {
                        t[n] = [].concat(o, r);
                    } else {
                        t[n] = r;
                    }
                }
            }
        }, this);
        return t;
    },
    _extractCustomPropertyValue: function(e) {
        var t = [];
        w.each(document.querySelectorAll(e.css_selector), function(e) {
            if ([ "input", "select" ].indexOf(e.tagName.toLowerCase()) > -1) {
                t.push(e.value);
            } else {
                if (e.textContent) {
                    t.push(e.textContent)
                };
            }
        });
        return t.join(", ");
    },
    _getCustomProperties: function(e) {
        var t = {};
        w.each(this._customProperties, function(n) {
            w.each(n.event_selectors, function(r) {
                var o = document.querySelectorAll(r);
                w.each(o, function(r) {
                    if (w.includes(e, r)) {
                        t[n.name] = this._extractCustomPropertyValue(n)
                    };
                }, this);
            }, this);
        }, this);
        return t;
    },
    _getEventTarget: function(e) {
        if (typeof e.target == "undefined") {
            return e.srcElement;
        }
        return e.target;
    },
    _trackEvent: function(e, t) {
        var n = this._getEventTarget(e);
        if (n.nodeType === C) {
            n = n.parentNode
        };
        if (this._shouldTrackDomEvent(n, e)) {
            for (var r = [ n ], o = n; o.parentNode && !this._isTag(o, "body"); ) {
                r.push(o.parentNode);
                o = o.parentNode;
            }
            var i, s, a, u = [], l = false;
            w.each(r, function(e, t) {
                if (e.tagName.toLowerCase() === "a") {
                    i = e.getAttribute("href");
                } else {
                    if (e.tagName.toLowerCase() === "form") {
                        a = e
                    };
                }
                if (!s && t < 5 && e.textContent) {
                    var n = w.trim(e.textContent);
                    if (n) {
                        s = n.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)
                    };
                }
                var r = this._getClassName(e).split(" ");
                if (w.includes(r, "mp-no-track")) {
                    l = true
                };
                u.push(this._getPropertiesFromElement(e));
            }, this);
            if (l) {
                return false;
            }
            var c = w.extend(this._getDefaultProperties(e.type), {
                $elements: u,
                $el_attr__href: i,
                $el_text: s
            }, this._getCustomProperties(r));
            !a || e.type !== "submit" && e.type !== "click" || w.extend(c, this._getFormFieldProperties(a));
            t.track("$web_event", c);
            return true;
        }
    },
    _navigate: function(e) {
        window.location.href = e;
    },
    _addDomEventHandlers: function(e) {
        var t = w.bind(function(t) {
            t = t || window.event;
            this._trackEvent(t, e);
        }, this);
        w.register_event(document, "submit", t, false, true);
        w.register_event(document, "change", t, false, true);
        w.register_event(document, "click", t, false, true);
    },
    _customProperties: {},
    init: function(e) {
        if (!document || !document.body) {
            console.log("document not ready yet, trying again in 500 milliseconds...");
            var t = this;
            return void setTimeout(function() {
                t.init(e);
            }, 500);
        }
        var n = e.get_config("token");
        if (this._initializedTokens.indexOf(n) > -1) {
            return void console.log('autotrack already initialized for token "' + n + '"');
        }
        this._initializedTokens.push(n);
        if (!this._maybeLoadEditor(e)) {
            var r = w.bind(function(t) {
                if (t && t.config && t.config.enable_collect_everything === true) {
                    if (t.custom_properties) {
                        this._customProperties = t.custom_properties
                    };
                    e.track("$web_event", w.extend({
                        $title: document.title
                    }, this._getDefaultProperties("pageview")));
                    this._addDomEventHandlers(e);
                } else {
                    e.__autotrack_enabled = false;
                }
            }, this);
            e._send_request(e.get_config("api_host") + "/decide/", {
                verbose: true,
                version: "1",
                lib: "web",
                token: n
            }, e._prepare_callback(r));
        }
    },
    _editorParamsFromHash: function(e, t) {
        var n;
        try {
            var r = w.getHashParam(t, "state");
            r = JSON.parse(decodeURIComponent(r));
            var o = w.getHashParam(t, "expires_in");
            n = {
                accessToken: w.getHashParam(t, "access_token"),
                accessTokenExpiresAt: new Date().getTime() + 1e3 * Number(o),
                bookmarkletMode: !!r.bookmarkletMode,
                projectId: r.projectId,
                projectOwnerId: r.projectOwnerId,
                projectToken: r.token,
                readOnly: r.readOnly,
                userFlags: r.userFlags,
                userId: r.userId
            };
            window.sessionStorage.setItem("editorParams", JSON.stringify(n));
            if (r.desiredHash) {
                window.location.hash = r.desiredHash;
            } else {
                if (window.history) {
                    history.replaceState("", document.title, window.location.pathname + window.location.search);
                } else {
                    window.location.hash = "";
                }
            }
        } catch (i) {
            console.error("Unable to parse data from hash", i);
        }
        return n;
    },
    _maybeLoadEditor: function(e) {
        try {
            var t = false;
            if (w.getHashParam(window.location.hash, "state")) {
                var n = w.getHashParam(window.location.hash, "state");
                n = JSON.parse(decodeURIComponent(n));
                t = n.action === "mpeditor";
            }
            var r, o = !!window.sessionStorage.getItem("_mpcehash");
            if (t) {
                r = this._editorParamsFromHash(e, window.location.hash);
            } else {
                if (o) {
                    r = this._editorParamsFromHash(e, window.sessionStorage.getItem("_mpcehash"));
                    window.sessionStorage.removeItem("_mpcehash");
                } else {
                    r = JSON.parse(window.sessionStorage.getItem("editorParams") || "{}");
                }
            }
            if (r.projectToken && e.get_config("token") === r.projectToken) {
                this._loadEditor(e, r);
                return true;
            }
            return false;
        } catch (i) {
            return !1;
        }
    },
    _loadEditor: function(e, t) {
        if (!window._mpEditorLoaded) {
            window._mpEditorLoaded = true;
            var n = e.get_config("app_host") + "/js-bundle/reports/collect-everything/editor.js?_ts=" + new Date().getTime();
            this._loadScript(n, function() {
                window.mp_load_editor(t);
            });
            return true;
        }
        return false;
    },
    enabledForProject: function(e, t, n) {
        if (w.isUndefined(t)) {
            t = 10;
        } else {
            t = t;
        }
        if (w.isUndefined(n)) {
            n = 10;
        } else {
            n = n;
        }
        for (var r = 0, o = 0; o < e.length; o++) {
            r += e.charCodeAt(o);
        }
        return n > r % t;
    },
    isBrowserSupported: function() {
        return w.isFunction(document.querySelectorAll);
    }
};

w.bind_instance_methods(E);

w.safewrap_instance_methods(E);

var T, S, D = 0, A = 1, M = "mixpanel", F = "__mps", N = "__mpso", O = "__mpa", I = "__mpap", P = "__mpu", L = "$set", R = "$set_once", B = "$add", j = "$append", $ = "$union", U = "$people_distinct_id", V = "__alias", H = "__cmpns", z = "__timers", q = [ F, N, O, I, P, U, V, H, z ], W = document.location.protocol === "https:" ? "https://" : "http://", G = window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest(), Y = !G && m.indexOf("MSIE") === -1 && m.indexOf("Mozilla") === -1, K = {
    api_host: W + "api.mixpanel.com",
    app_host: W + "mixpanel.com",
    autotrack: true,
    cdn: W + "cdn.mxpnl.com",
    cross_subdomain_cookie: true,
    persistence: "cookie",
    persistence_name: "",
    cookie_name: "",
    loaded: function() {},
    store_google: true,
    save_referrer: true,
    test: false,
    verbose: false,
    img: false,
    track_pageview: true,
    debug: false,
    track_links_timeout: 300,
    cookie_expiration: 365,
    upgrade: false,
    disable_persistence: false,
    disable_cookie: false,
    secure_cookie: false,
    ip: true,
    property_blacklist: []
}, Z = false, J = function() {};

J.prototype.create_properties = function() {};

J.prototype.event_handler = function() {};

J.prototype.after_track_handler = function() {};

J.prototype.init = function(e) {
    this.mp = e;
    return this;
};

J.prototype.track = function(e, t, n, r) {
    var o = this, i = w.dom_query(e);
    if (i.length === 0) {
        return void k.error("The DOM query (" + e + ") returned 0 elements");
    }
    w.each(i, function(e) {
        w.register_event(e, this.override_event, function(e) {
            var i = {}, s = o.create_properties(n, this), a = o.mp.get_config("track_links_timeout");
            o.event_handler(e, this, i);
            window.setTimeout(o.track_callback(r, s, i, true), a);
            o.mp.track(t, s, o.track_callback(r, s, i));
        });
    }, this);
    return true;
};

J.prototype.track_callback = function(e, t, n, r) {
    r = r || false;
    var o = this;
    return function() {
        n.callback_fired || (n.callback_fired = true, e && e(r, t) === false || o.after_track_handler(t, n, r));
    };
};

J.prototype.create_properties = function(e, t) {
    var n;
    return n = typeof e == "function" ? e(t) : w.extend({}, e);
};

var Q = function() {
    this.override_event = "click";
};

w.inherit(Q, J);

Q.prototype.create_properties = function(e, t) {
    var n = Q.superclass.create_properties.apply(this, arguments);
    if (t.href) {
        n.url = t.href
    };
    return n;
};

Q.prototype.event_handler = function(e, t, n) {
    n.new_tab = e.which === 2 || e.metaKey || e.ctrlKey || t.target === "_blank";
    n.href = t.href;
    n.new_tab || e.preventDefault();
};

Q.prototype.after_track_handler = function(e, t) {
    t.new_tab || setTimeout(function() {
        window.location = t.href;
    }, 0);
};

var X = function() {
    this.override_event = "submit";
};

w.inherit(X, J);

X.prototype.event_handler = function(e, t, n) {
    n.element = t;
    e.preventDefault();
};

X.prototype.after_track_handler = function(e, t) {
    setTimeout(function() {
        t.element.submit();
    }, 0);
};

var ee = function(e) {
    this.props = {};
    this.campaign_params_saved = false;
    if (e.persistence_name) {
        this.name = "mp_" + e.persistence_name;
    } else {
        this.name = "mp_" + e.token + "_mixpanel";
    }
    var t = e.persistence;
    if (t !== "cookie" && t !== "localStorage") {
        k.critical("Unknown persistence type " + t + "; falling back to cookie"), t = e.persistence = "cookie"
    };
    var n = function() {
        var e = true;
        try {
            var t = "__mplssupport__", n = "xyz";
            w.localStorage.set(t, n);
            if (w.localStorage.get(t) !== n) {
                e = false
            };
            w.localStorage.remove(t);
        } catch (r) {
            e = !1;
        }
        e || k.error("localStorage unsupported; falling back to cookie store");
        return e;
    };
    if (t === "localStorage" && n()) {
        this.storage = w.localStorage;
    } else {
        this.storage = w.cookie;
    }
    this.load();
    this.update_config(e);
    this.upgrade(e);
    this.save();
};

ee.prototype.properties = function() {
    var e = {};
    w.each(this.props, function(t, n) {
        w.include(q, n) || (e[n] = t);
    });
    return e;
};

ee.prototype.load = function() {
    if (!this.disabled) {
        var e = this.storage.parse(this.name);
        if (e) {
            this.props = w.extend({}, e)
        };
    }
};

ee.prototype.upgrade = function(e) {
    var t, n, r = e.upgrade;
    if (r) {
        t = "mp_super_properties", typeof r == "string" && (t = r), n = this.storage.parse(t), 
        this.storage.remove(t), this.storage.remove(t, true), n && (this.props = w.extend(this.props, n.all, n.events))
    };
    e.cookie_name || e.name === "mixpanel" || (t = "mp_" + e.token + "_" + e.name, n = this.storage.parse(t), 
    n && (this.storage.remove(t), this.storage.remove(t, true), this.register_once(n)));
    if (this.storage === w.localStorage) {
        n = w.cookie.parse(this.name), w.cookie.remove(this.name), w.cookie.remove(this.name, true), 
        n && this.register_once(n)
    };
};

ee.prototype.save = function() {
    this.disabled || (this._expire_notification_campaigns(), this.storage.set(this.name, w.JSONEncode(this.props), this.expire_days, this.cross_subdomain, this.secure));
};

ee.prototype.remove = function() {
    this.storage.remove(this.name, false);
    this.storage.remove(this.name, true);
};

ee.prototype.clear = function() {
    this.remove();
    this.props = {};
};

ee.prototype.register_once = function(e, t, n) {
    if (w.isObject(e)) {
        if (typeof t == "undefined") {
            t = "None"
        };
        if (typeof n == "undefined") {
            this.expire_days = this.default_expiry;
        } else {
            this.expire_days = n;
        }
        w.each(e, function(e, n) {
            this.props[n] && this.props[n] !== t || (this.props[n] = e);
        }, this);
        this.save();
        return true;
    }
    return false;
};

ee.prototype.register = function(e, t) {
    if (w.isObject(e)) {
        if (typeof t == "undefined") {
            this.expire_days = this.default_expiry;
        } else {
            this.expire_days = t;
        }
        w.extend(this.props, e);
        this.save();
        return true;
    }
    return false;
};

ee.prototype.unregister = function(e) {
    if (e in this.props) {
        delete this.props[e], this.save()
    };
};

ee.prototype._expire_notification_campaigns = w.safewrap(function() {
    var e = this.props[H], t = i.DEBUG ? 6e4 : 36e5;
    if (e) {
        for (var n in e) {
            if (1 * new Date() - e[n] > t) {
                delete e[n]
            };
        }
        if (w.isEmptyObject(e)) {
            delete this.props[H]
        };
    }
});

ee.prototype.update_campaign_params = function() {
    this.campaign_params_saved || (this.register_once(w.info.campaignParams()), this.campaign_params_saved = true);
};

ee.prototype.update_search_keyword = function(e) {
    this.register(w.info.searchInfo(e));
};

ee.prototype.update_referrer_info = function(e) {
    this.register_once({
        $initial_referrer: e || "$direct",
        $initial_referring_domain: w.info.referringDomain(e) || "$direct"
    }, "");
};

ee.prototype.get_referrer_info = function() {
    return w.strip_empty_properties({
        $initial_referrer: this.props.$initial_referrer,
        $initial_referring_domain: this.props.$initial_referring_domain
    });
};

ee.prototype.safe_merge = function(e) {
    w.each(this.props, function(t, n) {
        n in e || (e[n] = t);
    });
    return e;
};

ee.prototype.update_config = function(e) {
    this.default_expiry = this.expire_days = e.cookie_expiration;
    this.set_disabled(e.disable_persistence);
    this.set_cross_subdomain(e.cross_subdomain_cookie);
    this.set_secure(e.secure_cookie);
};

ee.prototype.set_disabled = function(e) {
    this.disabled = e;
    if (this.disabled) {
        this.remove()
    };
};

ee.prototype.set_cross_subdomain = function(e) {
    if (e !== this.cross_subdomain) {
        this.cross_subdomain = e, this.remove(), this.save()
    };
};

ee.prototype.get_cross_subdomain = function() {
    return this.cross_subdomain;
};

ee.prototype.set_secure = function(e) {
    if (e !== this.secure) {
        this.secure = e ? true : false, this.remove(), this.save()
    };
};

ee.prototype._add_to_people_queue = function(e, t) {
    var n = this._get_queue_key(e), r = t[e], o = this._get_or_create_queue(L), i = this._get_or_create_queue(R), s = this._get_or_create_queue(B), a = this._get_or_create_queue($), u = this._get_or_create_queue(j, []);
    if (n === F) {
        w.extend(o, r);
        this._pop_from_people_queue(B, r);
        this._pop_from_people_queue($, r);
    } else {
        if (n === N) {
            w.each(r, function(e, t) {
                t in i || (i[t] = e);
            });
        } else {
            if (n === O) {
                w.each(r, function(e, t) {
                    if (t in o) {
                        o[t] += e;
                    } else {
                        t in s || (s[t] = 0);
                        s[t] += e;
                    }
                }, this);
            } else {
                if (n === P) {
                    w.each(r, function(e, t) {
                        if (w.isArray(e)) {
                            t in a || (a[t] = []), a[t] = a[t].concat(e)
                        };
                    });
                } else {
                    if (n === I) {
                        u.push(r)
                    };
                }
            }
        }
    }
    k.log("MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):");
    k.log(t);
    this.save();
};

ee.prototype._pop_from_people_queue = function(e, t) {
    var n = this._get_queue(e);
    w.isUndefined(n) || (w.each(t, function(e, t) {
        delete n[t];
    }, this), this.save());
};

ee.prototype._get_queue_key = function(e) {
    if (e === L) {
        return F;
    }
    if (e === R) {
        return N;
    }
    if (e === B) {
        return O;
    }
    if (e === j) {
        return I;
    }
    if (e === $) {
        return P;
    }
    return void k.error("Invalid queue:", e);
};

ee.prototype._get_queue = function(e) {
    return this.props[this._get_queue_key(e)];
};

ee.prototype._get_or_create_queue = function(e, t) {
    var n = this._get_queue_key(e);
    if (w.isUndefined(t)) {
        t = {};
    } else {
        t = t;
    }
    return this.props[n] || (this.props[n] = t);
};

ee.prototype.set_event_timer = function(e, t) {
    var n = this.props[z] || {};
    n[e] = t;
    this.props[z] = n;
    this.save();
};

ee.prototype.remove_event_timer = function(e) {
    var t = this.props[z] || {}, n = t[e];
    w.isUndefined(n) || (delete this.props[z][e], this.save());
    return n;
};

var te, ne = function() {}, re = function() {}, oe = function(e, t, n) {
    var r, o = n === M ? S : S[n];
    if (o && T === D) {
        r = o;
    } else {
        if (o && !w.isArray(o)) {
            return void k.error("You have already initialized " + n);
        }
        r = new ne();
    }
    r._init(e, t, n);
    r.people = new re();
    r.people._init(r);
    i.DEBUG = i.DEBUG || r.get_config("debug");
    r.__autotrack_enabled = r.get_config("autotrack");
    if (r.get_config("autotrack")) {
        var s = 100, a = 100;
        if (E.enabledForProject(r.get_config("token"), s, a)) {
            if (E.isBrowserSupported()) {
                E.init(r);
            } else {
                r.__autotrack_enabled = false;
                k.log("Disabling Automatic Event Collection because this browser is not supported");
            }
        } else {
            r.__autotrack_enabled = false;
            k.log("Not in active bucket: disabling Automatic Event Collection.");
        }
        try {
            le(r);
        } catch (u) {
            k.error(u);
        }
    }
    if (!w.isUndefined(o) && w.isArray(o)) {
        r._execute_array.call(r.people, o.people), r._execute_array(o)
    };
    return r;
};

ne.prototype.init = function(e, t, n) {
    if (w.isUndefined(n)) {
        return void k.error("You must name your new library: init(token, config, name)");
    }
    if (n === M) {
        return void k.error("You must initialize the main mixpanel object right after you include the Mixpanel js snippet");
    }
    var r = oe(e, t, n);
    S[n] = r;
    r._loaded();
    return r;
};

ne.prototype._init = function(e, t, n) {
    this.__loaded = true;
    this.config = {};
    this.set_config(w.extend({}, K, t, {
        name: n,
        token: e,
        callback_fn: (n === M ? n : M + "." + n) + "._jsc"
    }));
    this._jsc = function() {};
    this.__dom_loaded_queue = [];
    this.__request_queue = [];
    this.__disabled_events = [];
    this._flags = {
        disable_all_events: false,
        identify_called: false
    };
    this.persistence = this.cookie = new ee(this.config);
    this.register_once({
        distinct_id: w.UUID()
    }, "");
};

ne.prototype._loaded = function() {
    this.get_config("loaded")(this);
    if (this.get_config("track_pageview")) {
        this.track_pageview()
    };
};

ne.prototype._dom_loaded = function() {
    w.each(this.__dom_loaded_queue, function(e) {
        this._track_dom.apply(this, e);
    }, this);
    w.each(this.__request_queue, function(e) {
        this._send_request.apply(this, e);
    }, this);
    delete this.__dom_loaded_queue;
    delete this.__request_queue;
};

ne.prototype._track_dom = function(e, t) {
    if (this.get_config("img")) {
        k.error("You can't use DOM tracking functions with img = true.");
        return false;
    }
    if (!Z) {
        this.__dom_loaded_queue.push([ e, t ]);
        return false;
    }
    var n = new e().init(this);
    return n.track.apply(n, t);
};

ne.prototype._prepare_callback = function(e, t) {
    if (w.isUndefined(e)) {
        return null;
    }
    if (G) {
        var n = function(n) {
            e(n, t);
        };
        return n;
    }
    var r = this._jsc, o = "" + Math.floor(1e8 * Math.random()), i = this.get_config("callback_fn") + "[" + o + "]";
    r[o] = function(n) {
        delete r[o];
        e(n, t);
    };
    return i;
};

ne.prototype._send_request = function(e, t, n) {
    if (Y) {
        return void this.__request_queue.push(arguments);
    }
    var r = this.get_config("verbose");
    if (t.verbose) {
        r = true
    };
    if (this.get_config("test")) {
        t.test = 1
    };
    if (r) {
        t.verbose = 1
    };
    if (this.get_config("img")) {
        t.img = 1
    };
    G || (n ? t.callback = n : (r || this.get_config("test")) && (t.callback = "(function(){})"));
    if (this.get_config("ip")) {
        t.ip = 1;
    } else {
        t.ip = 0;
    }
    t._ = new Date().getTime().toString();
    e += "?" + w.HTTPBuildQuery(t);
    if ("img" in t) {
        var o = document.createElement("img");
        o.src = e;
        document.body.appendChild(o);
    } else if (G) {
        try {
            var i = new XMLHttpRequest();
            i.open("GET", e, true);
            i.withCredentials = true;
            i.onreadystatechange = function() {
                if (i.readyState === 4) {
                    if (i.status === 200) {
                        if (n) {
                            n(r ? w.JSONDecode(i.responseText) : Number(i.responseText))
                        };
                    } else {
                        var e = "Bad HTTP status: " + i.status + " " + i.statusText;
                        k.error(e);
                        if (n) {
                            n(r ? {
                                status: 0,
                                error: e
                            } : 0)
                        };
                    }
                }
            };
            i.send(null);
        } catch (s) {
            k.error(s);
        }
    } else {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.async = true;
        a.defer = true;
        a.src = e;
        var u = document.getElementsByTagName("script")[0];
        u.parentNode.insertBefore(a, u);
    }
};

ne.prototype._execute_array = function(e) {
    var t, n = [], r = [], o = [];
    w.each(e, function(e) {
        if (e) {
            t = e[0], typeof e == "function" ? e.call(this) : w.isArray(e) && t === "alias" ? n.push(e) : w.isArray(e) && t.indexOf("track") !== -1 && typeof this[t] == "function" ? o.push(e) : r.push(e)
        };
    }, this);
    var i = function(e, t) {
        w.each(e, function(e) {
            this[e[0]].apply(this, e.slice(1));
        }, t);
    };
    i(n, this);
    i(r, this);
    i(o, this);
};

ne.prototype.push = function(e) {
    this._execute_array([ e ]);
};

ne.prototype.disable = function(e) {
    if (typeof e == "undefined") {
        this._flags.disable_all_events = true;
    } else {
        this.__disabled_events = this.__disabled_events.concat(e);
    }
};

ne.prototype.track = function(e, t, n) {
    if (typeof n != "function") {
        n = function() {}
    };
    if (w.isUndefined(e)) {
        return void k.error("No event name provided to mixpanel.track");
    }
    if (this._event_is_disabled(e)) {
        return void n(0);
    }
    t = t || {};
    t.token = this.get_config("token");
    var r = this.persistence.remove_event_timer(e);
    if (!w.isUndefined(r)) {
        var o = new Date().getTime() - r;
        t.$duration = parseFloat((o / 1e3).toFixed(3));
    }
    this.persistence.update_search_keyword(document.referrer);
    if (this.get_config("store_google")) {
        this.persistence.update_campaign_params()
    };
    if (this.get_config("save_referrer")) {
        this.persistence.update_referrer_info(document.referrer)
    };
    t = w.extend({}, w.info.properties(), this.persistence.properties(), t);
    try {
        if (this.get_config("autotrack") && e !== "mp_page_view" && e !== "$create_alias") {
            t = w.extend({}, t, this.mp_counts), this.mp_counts = {
                $__c: 0
            }, w.cookie.set("mp_" + this.get_config("name") + "__c", 0, 1, true)
        };
    } catch (i) {
        k.error(i);
    }
    var s = this.get_config("property_blacklist");
    if (w.isArray(s)) {
        w.each(s, function(e) {
            delete t[e];
        });
    } else {
        k.error("Invalid value for property_blacklist config: " + s);
    }
    var a = {
        event: e,
        properties: t
    }, u = w.truncate(a, 255), l = w.JSONEncode(u), c = w.base64Encode(l);
    k.log("MIXPANEL REQUEST:");
    k.log(u);
    this._send_request(this.get_config("api_host") + "/track/", {
        data: c
    }, this._prepare_callback(n, u));
    return u;
};

ne.prototype.track_pageview = function(e) {
    if (w.isUndefined(e)) {
        e = document.location.href
    };
    this.track("mp_page_view", w.info.pageviewInfo(e));
};

ne.prototype.track_links = function() {
    return this._track_dom.call(this, Q, arguments);
};

ne.prototype.track_forms = function() {
    return this._track_dom.call(this, X, arguments);
};

ne.prototype.time_event = function(e) {
    if (w.isUndefined(e)) {
        return void k.error("No event name provided to mixpanel.time_event");
    }
    return void (this._event_is_disabled(e) || this.persistence.set_event_timer(e, new Date().getTime()));
};

ne.prototype.register = function(e, t) {
    this.persistence.register(e, t);
};

ne.prototype.register_once = function(e, t, n) {
    this.persistence.register_once(e, t, n);
};

ne.prototype.unregister = function(e) {
    this.persistence.unregister(e);
};

ne.prototype._register_single = function(e, t) {
    var n = {};
    n[e] = t;
    this.register(n);
};

ne.prototype.identify = function(e, t, n, r, o, i) {
    if (e !== this.get_distinct_id() && e !== this.get_property(V)) {
        this.unregister(V), this._register_single("distinct_id", e)
    };
    this._check_and_handle_notifications(this.get_distinct_id());
    this._flags.identify_called = true;
    this.people._flush(t, n, r, o, i);
};

ne.prototype.reset = function() {
    this.persistence.clear();
    this._flags.identify_called = false;
    this.register_once({
        distinct_id: w.UUID()
    }, "");
};

ne.prototype.get_distinct_id = function() {
    return this.get_property("distinct_id");
};

ne.prototype.alias = function(e, t) {
    if (e === this.get_property(U)) {
        k.critical("Attempting to create alias for existing People user - aborting.");
        return -2;
    }
    var n = this;
    if (w.isUndefined(t)) {
        t = this.get_distinct_id()
    };
    if (e !== t) {
        this._register_single(V, e);
        return this.track("$create_alias", {
            alias: e,
            distinct_id: t
        }, function() {
            n.identify(e);
        });
    }
    k.error("alias matches current distinct_id - skipping api call.");
    this.identify(e);
    return -1;
};

ne.prototype.name_tag = function(e) {
    this._register_single("mp_name_tag", e);
};

ne.prototype.set_config = function(e) {
    if (w.isObject(e)) {
        w.extend(this.config, e), this.get_config("persistence_name") || (this.config.persistence_name = this.config.cookie_name), 
        this.get_config("disable_persistence") || (this.config.disable_persistence = this.config.disable_cookie), 
        this.persistence && this.persistence.update_config(this.config), i.DEBUG = i.DEBUG || this.get_config("debug")
    };
};

ne.prototype.get_config = function(e) {
    return this.config[e];
};

ne.prototype.get_property = function(e) {
    return this.persistence.props[e];
};

ne.prototype.toString = function() {
    var e = this.get_config("name");
    if (e !== M) {
        e = M + "." + e
    };
    return e;
};

ne.prototype._event_is_disabled = function(e) {
    return w.isBlockedUA(m) || this._flags.disable_all_events || w.include(this.__disabled_events, e);
};

ne.prototype._check_and_handle_notifications = function(e) {
    if (e && !this._flags.identify_called && !this.get_config("disable_notifications")) {
        k.log("MIXPANEL NOTIFICATION CHECK");
        var t = {
            verbose: true,
            version: "2",
            lib: "web",
            token: this.get_config("token"),
            distinct_id: e
        }, n = this;
        this._send_request(this.get_config("api_host") + "/decide/", t, this._prepare_callback(function(e) {
            if (e.notifications && e.notifications.length > 0) {
                n._show_notification.call(n, e.notifications[0])
            };
        }));
    }
};

ne.prototype._show_notification = function(e) {
    var t = new te(e, this);
    t.show();
};

re.prototype._init = function(e) {
    this._mixpanel = e;
};

re.prototype.set = function(e, t, n) {
    var r = {}, o = {};
    if (w.isObject(e)) {
        w.each(e, function(e, t) {
            this._is_reserved_property(t) || (o[t] = e);
        }, this);
        n = t;
    } else {
        o[e] = t;
    }
    if (this._get_config("save_referrer")) {
        this._mixpanel.persistence.update_referrer_info(document.referrer)
    };
    o = w.extend({}, w.info.people_properties(), this._mixpanel.persistence.get_referrer_info(), o);
    r[L] = o;
    return this._send_request(r, n);
};

re.prototype.set_once = function(e, t, n) {
    var r = {}, o = {};
    if (w.isObject(e)) {
        w.each(e, function(e, t) {
            this._is_reserved_property(t) || (o[t] = e);
        }, this);
        n = t;
    } else {
        o[e] = t;
    }
    r[R] = o;
    return this._send_request(r, n);
};

re.prototype.increment = function(e, t, n) {
    var r = {}, o = {};
    if (w.isObject(e)) {
        w.each(e, function(e, t) {
            if (!this._is_reserved_property(t)) {
                if (isNaN(parseFloat(e))) {
                    return void k.error("Invalid increment value passed to mixpanel.people.increment - must be a number");
                }
                o[t] = e;
            }
        }, this);
        n = t;
    } else {
        if (w.isUndefined(t)) {
            t = 1
        };
        o[e] = t;
    }
    r[B] = o;
    return this._send_request(r, n);
};

re.prototype.append = function(e, t, n) {
    var r = {}, o = {};
    if (w.isObject(e)) {
        w.each(e, function(e, t) {
            this._is_reserved_property(t) || (o[t] = e);
        }, this);
        n = t;
    } else {
        o[e] = t;
    }
    r[j] = o;
    return this._send_request(r, n);
};

re.prototype.union = function(e, t, n) {
    var r = {}, o = {};
    if (w.isObject(e)) {
        w.each(e, function(e, t) {
            this._is_reserved_property(t) || (o[t] = w.isArray(e) ? e : [ e ]);
        }, this);
        n = t;
    } else {
        if (w.isArray(t)) {
            o[e] = t;
        } else {
            o[e] = [ t ];
        }
    }
    r[$] = o;
    return this._send_request(r, n);
};

re.prototype.track_charge = function(e, t, n) {
    if (!w.isNumber(e) && (e = parseFloat(e), isNaN(e))) {
        return void k.error("Invalid value passed to mixpanel.people.track_charge - must be a number");
    }
    return this.append("$transactions", w.extend({
        $amount: e
    }, t), n);
};

re.prototype.clear_charges = function(e) {
    return this.set("$transactions", [], e);
};

re.prototype.delete_user = function() {
    if (!this._identify_called()) {
        return void k.error("mixpanel.people.delete_user() requires you to call identify() first");
    }
    var e = {
        $delete: this._mixpanel.get_distinct_id()
    };
    return this._send_request(e);
};

re.prototype.toString = function() {
    return this._mixpanel.toString() + ".people";
};

re.prototype._send_request = function(e, t) {
    e.$token = this._get_config("token");
    e.$distinct_id = this._mixpanel.get_distinct_id();
    var n = w.encodeDates(e), r = w.truncate(n, 255), o = w.JSONEncode(n), i = w.base64Encode(o);
    if (this._identify_called()) {
        k.log("MIXPANEL PEOPLE REQUEST:");
        k.log(r);
        this._mixpanel._send_request(this._get_config("api_host") + "/engage/", {
            data: i
        }, this._mixpanel._prepare_callback(t, r));
        return r;
    }
    this._enqueue(e);
    w.isUndefined(t) || t(this._get_config("verbose") ? {
        status: -1,
        error: null
    } : -1);
    return r;
};

re.prototype._get_config = function(e) {
    return this._mixpanel.get_config(e);
};

re.prototype._identify_called = function() {
    return this._mixpanel._flags.identify_called === true;
};

re.prototype._enqueue = function(e) {
    if (L in e) {
        this._mixpanel.persistence._add_to_people_queue(L, e);
    } else {
        if (R in e) {
            this._mixpanel.persistence._add_to_people_queue(R, e);
        } else {
            if (B in e) {
                this._mixpanel.persistence._add_to_people_queue(B, e);
            } else {
                if (j in e) {
                    this._mixpanel.persistence._add_to_people_queue(j, e);
                } else {
                    if ($ in e) {
                        this._mixpanel.persistence._add_to_people_queue($, e);
                    } else {
                        k.error("Invalid call to _enqueue():", e);
                    }
                }
            }
        }
    }
};

re.prototype._flush = function(e, t, n, r, o) {
    var i = this, s = w.extend({}, this._mixpanel.persistence._get_queue(L)), a = w.extend({}, this._mixpanel.persistence._get_queue(R)), u = w.extend({}, this._mixpanel.persistence._get_queue(B)), l = this._mixpanel.persistence._get_queue(j), c = w.extend({}, this._mixpanel.persistence._get_queue($));
    w.isUndefined(s) || !w.isObject(s) || w.isEmptyObject(s) || (i._mixpanel.persistence._pop_from_people_queue(L, s), 
    this.set(s, function(t, n) {
        if (t === 0) {
            i._mixpanel.persistence._add_to_people_queue(L, s)
        };
        w.isUndefined(e) || e(t, n);
    }));
    w.isUndefined(a) || !w.isObject(a) || w.isEmptyObject(a) || (i._mixpanel.persistence._pop_from_people_queue(R, a), 
    this.set_once(a, function(e, t) {
        if (e === 0) {
            i._mixpanel.persistence._add_to_people_queue(R, a)
        };
        w.isUndefined(r) || r(e, t);
    }));
    w.isUndefined(u) || !w.isObject(u) || w.isEmptyObject(u) || (i._mixpanel.persistence._pop_from_people_queue(B, u), 
    this.increment(u, function(e, n) {
        if (e === 0) {
            i._mixpanel.persistence._add_to_people_queue(B, u)
        };
        w.isUndefined(t) || t(e, n);
    }));
    w.isUndefined(c) || !w.isObject(c) || w.isEmptyObject(c) || (i._mixpanel.persistence._pop_from_people_queue($, c), 
    this.union(c, function(e, t) {
        if (e === 0) {
            i._mixpanel.persistence._add_to_people_queue($, c)
        };
        w.isUndefined(o) || o(e, t);
    }));
    if (!w.isUndefined(l) && w.isArray(l) && l.length) {
        for (var p, d = function(e, t) {
            if (e === 0) {
                i._mixpanel.persistence._add_to_people_queue(j, p)
            };
            w.isUndefined(n) || n(e, t);
        }, h = l.length - 1; h >= 0; h--) {
            p = l.pop();
            i.append(p, d);
        }
        i._mixpanel.persistence.save();
    }
};

re.prototype._is_reserved_property = function(e) {
    return e === "$distinct_id" || e === "$token";
};

ne._Notification = function(e, t) {
    w.bind_instance_methods(this);
    this.mixpanel = t;
    this.persistence = this.mixpanel.persistence;
    this.campaign_id = w.escapeHTML(e.id);
    this.message_id = w.escapeHTML(e.message_id);
    this.body = (w.escapeHTML(e.body) || "").replace(/\n/g, "<br/>");
    this.cta = w.escapeHTML(e.cta) || "Close";
    this.notif_type = w.escapeHTML(e.type) || "takeover";
    this.style = w.escapeHTML(e.style) || "light";
    this.title = w.escapeHTML(e.title) || "";
    this.video_width = te.VIDEO_WIDTH;
    this.video_height = te.VIDEO_HEIGHT;
    this.dest_url = e.cta_url || null;
    this.image_url = e.image_url || null;
    this.thumb_image_url = e.thumb_image_url || null;
    this.video_url = e.video_url || null;
    this.clickthrough = true;
    this.dest_url || (this.dest_url = "#dismiss", this.clickthrough = false);
    this.mini = this.notif_type === "mini";
    this.mini || (this.notif_type = "takeover");
    if (this.mini) {
        this.notif_width = te.NOTIF_WIDTH_MINI;
    } else {
        this.notif_width = te.NOTIF_WIDTH;
    }
    this._set_client_config();
    this.imgs_to_preload = this._init_image_html();
    this._init_video();
};

te = ne._Notification;

te.ANIM_TIME = 200;

te.MARKUP_PREFIX = "mixpanel-notification";

te.BG_OPACITY = .6;

te.NOTIF_TOP = 25;

te.NOTIF_START_TOP = 200;

te.NOTIF_WIDTH = 388;

te.NOTIF_WIDTH_MINI = 420;

te.NOTIF_HEIGHT_MINI = 85;

te.THUMB_BORDER_SIZE = 5;

te.THUMB_IMG_SIZE = 60;

te.THUMB_OFFSET = Math.round(te.THUMB_IMG_SIZE / 2);

te.VIDEO_WIDTH = 595;

te.VIDEO_HEIGHT = 334;

te.prototype.show = function() {
    var e = this;
    this._set_client_config();
    if (this.body_el) {
        this._init_styles();
        this._init_notification_el();
        return void this._preload_images(this._attach_and_animate);
    }
    return void setTimeout(function() {
        e.show();
    }, 300);
};

te.prototype.dismiss = w.safewrap(function() {
    this.marked_as_shown || this._mark_delivery({
        invisible: true
    });
    var e = this.showing_video ? this._get_el("video") : this._get_notification_display_el();
    if (this.use_transitions) {
        this._remove_class("bg", "visible");
        this._add_class(e, "exiting");
        setTimeout(this._remove_notification_el, te.ANIM_TIME);
    } else {
        var t, n, r;
        if (this.mini) {
            t = "right";
            n = 20;
            r = -100;
        } else {
            t = "top";
            n = te.NOTIF_TOP;
            r = te.NOTIF_START_TOP + te.NOTIF_TOP;
        }
        this._animate_els([ {
            el: this._get_el("bg"),
            attr: "opacity",
            start: te.BG_OPACITY,
            goal: 0
        }, {
            el: e,
            attr: "opacity",
            start: 1,
            goal: 0
        }, {
            el: e,
            attr: t,
            start: n,
            goal: r
        } ], te.ANIM_TIME, this._remove_notification_el);
    }
});

te.prototype._add_class = w.safewrap(function(e, t) {
    t = te.MARKUP_PREFIX + "-" + t;
    if (typeof e == "string") {
        e = this._get_el(e)
    };
    if (e.className) {
        ~(" " + e.className + " ").indexOf(" " + t + " ") || (e.className += " " + t);
    } else {
        e.className = t;
    }
});

te.prototype._remove_class = w.safewrap(function(e, t) {
    t = te.MARKUP_PREFIX + "-" + t;
    if (typeof e == "string") {
        e = this._get_el(e)
    };
    if (e.className) {
        e.className = (" " + e.className + " ").replace(" " + t + " ", "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "")
    };
});

te.prototype._animate_els = w.safewrap(function(e, t, n, r) {
    var o, i, s, a = this, u = false, l = 1 * new Date();
    for (r = r || l, s = l - r, o = 0; o < e.length; o++) {
        i = e[o];
        if (typeof i.val == "undefined") {
            i.val = i.start
        };
        if (i.val !== i.goal) {
            u = true;
            var c = i.goal - i.start, p = i.goal >= i.start ? 1 : -1;
            i.val = i.start + c * s / t;
            if (i.attr !== "opacity") {
                i.val = Math.round(i.val)
            };
            if (p > 0 && i.val >= i.goal || p < 0 && i.val <= i.goal) {
                i.val = i.goal
            };
        }
    }
    if (!u) {
        return void (n && n());
    }
    for (o = 0; o < e.length; o++) {
        i = e[o];
        if (i.el) {
            var d = i.attr === "opacity" ? "" : "px";
            i.el.style[i.attr] = String(i.val) + d;
        }
    }
    setTimeout(function() {
        a._animate_els(e, t, n, r);
    }, 10);
});

te.prototype._attach_and_animate = w.safewrap(function() {
    var e = this;
    if (!this.shown && !this._get_shown_campaigns()[this.campaign_id]) {
        this.shown = true;
        this.body_el.appendChild(this.notification_el);
        setTimeout(function() {
            var t = e._get_notification_display_el();
            if (e.use_transitions) {
                e.mini || e._add_class("bg", "visible");
                e._add_class(t, "visible");
                e._mark_as_shown();
            } else {
                var n, r, o;
                if (e.mini) {
                    n = "right";
                    r = -100;
                    o = 20;
                } else {
                    n = "top";
                    r = te.NOTIF_START_TOP + te.NOTIF_TOP;
                    o = te.NOTIF_TOP;
                }
                e._animate_els([ {
                    el: e._get_el("bg"),
                    attr: "opacity",
                    start: 0,
                    goal: te.BG_OPACITY
                }, {
                    el: t,
                    attr: "opacity",
                    start: 0,
                    goal: 1
                }, {
                    el: t,
                    attr: n,
                    start: r,
                    goal: o
                } ], te.ANIM_TIME, e._mark_as_shown);
            }
        }, 100);
        w.register_event(e._get_el("cancel"), "click", function(t) {
            t.preventDefault();
            e.dismiss();
        });
        var t = e._get_el("button") || e._get_el("mini-content");
        w.register_event(t, "click", function(t) {
            t.preventDefault();
            if (e.show_video) {
                e._track_event("$campaign_open", {
                    $resource_type: "video"
                });
                e._switch_to_video();
            } else {
                e.dismiss();
                if (e.clickthrough) {
                    e._track_event("$campaign_open", {
                        $resource_type: "link"
                    }, function() {
                        window.location.href = e.dest_url;
                    })
                };
            }
        });
    }
});

te.prototype._get_el = function(e) {
    return document.getElementById(te.MARKUP_PREFIX + "-" + e);
};

te.prototype._get_notification_display_el = function() {
    return this._get_el(this.notif_type);
};

te.prototype._get_shown_campaigns = function() {
    return this.persistence.props[H] || (this.persistence.props[H] = {});
};

te.prototype._browser_lte = function(e, t) {
    return this.browser_versions[e] && this.browser_versions[e] <= t;
};

te.prototype._init_image_html = function() {
    var e = [];
    if (this.mini) {
        this.thumb_image_url = this.thumb_image_url || "//cdn.mxpnl.com/site_media/images/icons/notifications/mini-news-dark.png";
        e.push(this.thumb_image_url);
    } else {
        if (this.image_url) {
            e.push(this.image_url);
            this.img_html = '<img id="img" src="' + this.image_url + '"/>';
        } else {
            this.img_html = "";
        }
        if (this.thumb_image_url) {
            e.push(this.thumb_image_url);
            this.thumb_img_html = '<div id="thumbborder-wrapper"><div id="thumbborder"></div></div><img id="thumbnail" src="' + this.thumb_image_url + '" width="' + te.THUMB_IMG_SIZE + '" height="' + te.THUMB_IMG_SIZE + '"/><div id="thumbspacer"></div>';
        } else {
            this.thumb_img_html = "";
        }
    }
    return e;
};

te.prototype._init_notification_el = function() {
    var e = "", t = "", n = "", r = '<div id="cancel"><div id="cancel-icon"></div></div>';
    this.notification_el = document.createElement("div");
    this.notification_el.id = te.MARKUP_PREFIX + "-wrapper";
    if (this.mini) {
        e = '<div id="mini"><div id="mainbox">' + r + '<div id="mini-content"><div id="mini-icon"><div id="mini-icon-img"></div></div><div id="body"><div id="body-text"><div>' + this.body + '</div></div></div></div></div><div id="mini-border"></div></div>';
    } else {
        var o = this.clickthrough || this.show_video ? "" : '<div id="button-close"></div>', i = this.show_video ? '<div id="button-play"></div>' : "";
        if (this._browser_lte("ie", 7)) {
            o = "", i = ""
        };
        e = '<div id="takeover">' + this.thumb_img_html + '<div id="mainbox">' + r + '<div id="content">' + this.img_html + '<div id="title">' + this.title + '</div><div id="body">' + this.body + '</div><div id="tagline"><a href="http://mixpanel.com?from=inapp" target="_blank">POWERED BY MIXPANEL</a></div></div><div id="button">' + o + '<a id="button-link" href="' + this.dest_url + '">' + this.cta + "</a>" + i + "</div></div></div>";
    }
    if (this.youtube_video) {
        t = "//www.youtube.com/embed/" + this.youtube_video + "?wmode=transparent&showinfo=0&modestbranding=0&rel=0&autoplay=1&loop=0&vq=hd1080";
        if (this.yt_custom) {
            t += "&enablejsapi=1&html5=1&controls=0", n = '<div id="video-controls"><div id="video-progress" class="video-progress-el"><div id="video-progress-total" class="video-progress-el"></div><div id="video-elapsed" class="video-progress-el"></div></div><div id="video-time" class="video-progress-el"></div></div>'
        };
    } else {
        if (this.vimeo_video) {
            t = "//player.vimeo.com/video/" + this.vimeo_video + "?autoplay=1&title=0&byline=0&portrait=0"
        };
    }
    if (this.show_video) {
        this.video_iframe = '<iframe id="' + te.MARKUP_PREFIX + '-video-frame" width="' + this.video_width + '" height="' + this.video_height + '"  src="' + t + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen="1" scrolling="no"></iframe>', 
        n = '<div id="video-' + (this.flip_animate ? "" : "no") + 'flip"><div id="video"><div id="video-holder"></div>' + n + "</div></div>"
    };
    var s = n + e;
    if (this.flip_animate) {
        s = (this.mini ? e : "") + '<div id="flipcontainer"><div id="flipper">' + (this.mini ? n : s) + "</div></div>"
    };
    this.notification_el.innerHTML = ('<div id="overlay" class="' + this.notif_type + '"><div id="campaignid-' + this.campaign_id + '"><div id="bgwrapper"><div id="bg"></div>' + s + "</div></div></div>").replace(/class=\"/g, 'class="' + te.MARKUP_PREFIX + "-").replace(/id=\"/g, 'id="' + te.MARKUP_PREFIX + "-");
};

te.prototype._init_styles = function() {
    if (this.style === "dark") {
        this.style_vals = {
            bg: "#1d1f25",
            bg_actions: "#282b32",
            bg_hover: "#3a4147",
            bg_light: "#4a5157",
            border_gray: "#32353c",
            cancel_opacity: "0.4",
            mini_hover: "#2a3137",
            text_title: "#fff",
            text_main: "#9498a3",
            text_tagline: "#464851",
            text_hover: "#ddd"
        };
    } else {
        this.style_vals = {
            bg: "#fff",
            bg_actions: "#e7eaee",
            bg_hover: "#eceff3",
            bg_light: "#f5f5f5",
            border_gray: "#e4ecf2",
            cancel_opacity: "1.0",
            mini_hover: "#fafafa",
            text_title: "#5c6578",
            text_main: "#8b949b",
            text_tagline: "#ced9e6",
            text_hover: "#7c8598"
        };
    }
    var e = "0px 0px 35px 0px rgba(45, 49, 56, 0.7)", t = e, n = e, r = te.THUMB_IMG_SIZE + 2 * te.THUMB_BORDER_SIZE, o = te.ANIM_TIME / 1e3 + "s";
    if (this.mini) {
        e = "none"
    };
    var i = {}, s = te.NOTIF_WIDTH_MINI + 20;
    i["@media only screen and (max-width: " + (s - 1) + "px)"] = {
        "#overlay": {
            display: "none"
        }
    };
    var a = {
        ".flipped": {
            transform: "rotateY(180deg)"
        },
        "#overlay": {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            overflow: "auto",
            "text-align": "center",
            "z-index": "10000",
            "font-family": '"Helvetica", "Arial", sans-serif',
            "-webkit-font-smoothing": "antialiased",
            "-moz-osx-font-smoothing": "grayscale"
        },
        "#overlay.mini": {
            height: "0",
            overflow: "visible"
        },
        "#overlay a": {
            width: "initial",
            padding: "0",
            "text-decoration": "none",
            "text-transform": "none",
            color: "inherit"
        },
        "#bgwrapper": {
            position: "relative",
            width: "100%",
            height: "100%"
        },
        "#bg": {
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            "min-width": 4 * this.doc_width + "px",
            "min-height": 4 * this.doc_height + "px",
            "background-color": "black",
            opacity: "0.0",
            "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)",
            filter: "alpha(opacity=60)",
            transition: "opacity " + o
        },
        "#bg.visible": {
            opacity: te.BG_OPACITY
        },
        ".mini #bg": {
            width: "0",
            height: "0",
            "min-width": "0"
        },
        "#flipcontainer": {
            perspective: "1000px",
            position: "absolute",
            width: "100%"
        },
        "#flipper": {
            position: "relative",
            "transform-style": "preserve-3d",
            transition: "0.3s"
        },
        "#takeover": {
            position: "absolute",
            left: "50%",
            width: te.NOTIF_WIDTH + "px",
            "margin-left": Math.round(-te.NOTIF_WIDTH / 2) + "px",
            "backface-visibility": "hidden",
            transform: "rotateY(0deg)",
            opacity: "0.0",
            top: te.NOTIF_START_TOP + "px",
            transition: "opacity " + o + ", top " + o
        },
        "#takeover.visible": {
            opacity: "1.0",
            top: te.NOTIF_TOP + "px"
        },
        "#takeover.exiting": {
            opacity: "0.0",
            top: te.NOTIF_START_TOP + "px"
        },
        "#thumbspacer": {
            height: te.THUMB_OFFSET + "px"
        },
        "#thumbborder-wrapper": {
            position: "absolute",
            top: -te.THUMB_BORDER_SIZE + "px",
            left: te.NOTIF_WIDTH / 2 - te.THUMB_OFFSET - te.THUMB_BORDER_SIZE + "px",
            width: r + "px",
            height: r / 2 + "px",
            overflow: "hidden"
        },
        "#thumbborder": {
            position: "absolute",
            width: r + "px",
            height: r + "px",
            "border-radius": r + "px",
            "background-color": this.style_vals.bg_actions,
            opacity: "0.5"
        },
        "#thumbnail": {
            position: "absolute",
            top: "0px",
            left: te.NOTIF_WIDTH / 2 - te.THUMB_OFFSET + "px",
            width: te.THUMB_IMG_SIZE + "px",
            height: te.THUMB_IMG_SIZE + "px",
            overflow: "hidden",
            "z-index": "100",
            "border-radius": te.THUMB_IMG_SIZE + "px"
        },
        "#mini": {
            position: "absolute",
            right: "20px",
            top: te.NOTIF_TOP + "px",
            width: this.notif_width + "px",
            height: 2 * te.NOTIF_HEIGHT_MINI + "px",
            "margin-top": 20 - te.NOTIF_HEIGHT_MINI + "px",
            "backface-visibility": "hidden",
            opacity: "0.0",
            transform: "rotateX(90deg)",
            transition: "opacity 0.3s, transform 0.3s, right 0.3s"
        },
        "#mini.visible": {
            opacity: "1.0",
            transform: "rotateX(0deg)"
        },
        "#mini.exiting": {
            opacity: "0.0",
            right: "-150px"
        },
        "#mainbox": {
            "border-radius": "4px",
            "box-shadow": e,
            "text-align": "center",
            "background-color": this.style_vals.bg,
            "font-size": "14px",
            color: this.style_vals.text_main
        },
        "#mini #mainbox": {
            height: te.NOTIF_HEIGHT_MINI + "px",
            "margin-top": te.NOTIF_HEIGHT_MINI + "px",
            "border-radius": "3px",
            transition: "background-color " + o
        },
        "#mini-border": {
            height: te.NOTIF_HEIGHT_MINI + 6 + "px",
            width: te.NOTIF_WIDTH_MINI + 6 + "px",
            position: "absolute",
            top: "-3px",
            left: "-3px",
            "margin-top": te.NOTIF_HEIGHT_MINI + "px",
            "border-radius": "6px",
            opacity: "0.25",
            "background-color": "#fff",
            "z-index": "-1",
            "box-shadow": n
        },
        "#mini-icon": {
            position: "relative",
            display: "inline-block",
            width: "75px",
            height: te.NOTIF_HEIGHT_MINI + "px",
            "border-radius": "3px 0 0 3px",
            "background-color": this.style_vals.bg_actions,
            background: "linear-gradient(135deg, " + this.style_vals.bg_light + " 0%, " + this.style_vals.bg_actions + " 100%)",
            transition: "background-color " + o
        },
        "#mini:hover #mini-icon": {
            "background-color": this.style_vals.mini_hover
        },
        "#mini:hover #mainbox": {
            "background-color": this.style_vals.mini_hover
        },
        "#mini-icon-img": {
            position: "absolute",
            "background-image": "url(" + this.thumb_image_url + ")",
            width: "48px",
            height: "48px",
            top: "20px",
            left: "12px"
        },
        "#content": {
            padding: "30px 20px 0px 20px"
        },
        "#mini-content": {
            "text-align": "left",
            height: te.NOTIF_HEIGHT_MINI + "px",
            cursor: "pointer"
        },
        "#img": {
            width: "328px",
            "margin-top": "30px",
            "border-radius": "5px"
        },
        "#title": {
            "max-height": "600px",
            overflow: "hidden",
            "word-wrap": "break-word",
            padding: "25px 0px 20px 0px",
            "font-size": "19px",
            "font-weight": "bold",
            color: this.style_vals.text_title
        },
        "#body": {
            "max-height": "600px",
            "margin-bottom": "25px",
            overflow: "hidden",
            "word-wrap": "break-word",
            "line-height": "21px",
            "font-size": "15px",
            "font-weight": "normal",
            "text-align": "left"
        },
        "#mini #body": {
            display: "inline-block",
            "max-width": "250px",
            margin: "0 0 0 30px",
            height: te.NOTIF_HEIGHT_MINI + "px",
            "font-size": "16px",
            "letter-spacing": "0.8px",
            color: this.style_vals.text_title
        },
        "#mini #body-text": {
            display: "table",
            height: te.NOTIF_HEIGHT_MINI + "px"
        },
        "#mini #body-text div": {
            display: "table-cell",
            "vertical-align": "middle"
        },
        "#tagline": {
            "margin-bottom": "15px",
            "font-size": "10px",
            "font-weight": "600",
            "letter-spacing": "0.8px",
            color: "#ccd7e0",
            "text-align": "left"
        },
        "#tagline a": {
            color: this.style_vals.text_tagline,
            transition: "color " + o
        },
        "#tagline a:hover": {
            color: this.style_vals.text_hover
        },
        "#cancel": {
            position: "absolute",
            right: "0",
            width: "8px",
            height: "8px",
            padding: "10px",
            "border-radius": "20px",
            margin: "12px 12px 0 0",
            "box-sizing": "content-box",
            cursor: "pointer",
            transition: "background-color " + o
        },
        "#mini #cancel": {
            margin: "7px 7px 0 0"
        },
        "#cancel-icon": {
            width: "8px",
            height: "8px",
            overflow: "hidden",
            "background-image": "url(//cdn.mxpnl.com/site_media/images/icons/notifications/cancel-x.png)",
            opacity: this.style_vals.cancel_opacity
        },
        "#cancel:hover": {
            "background-color": this.style_vals.bg_hover
        },
        "#button": {
            display: "block",
            height: "60px",
            "line-height": "60px",
            "text-align": "center",
            "background-color": this.style_vals.bg_actions,
            "border-radius": "0 0 4px 4px",
            overflow: "hidden",
            cursor: "pointer",
            transition: "background-color " + o
        },
        "#button-close": {
            display: "inline-block",
            width: "9px",
            height: "60px",
            "margin-right": "8px",
            "vertical-align": "top",
            "background-image": "url(//cdn.mxpnl.com/site_media/images/icons/notifications/close-x-" + this.style + ".png)",
            "background-repeat": "no-repeat",
            "background-position": "0px 25px"
        },
        "#button-play": {
            display: "inline-block",
            width: "30px",
            height: "60px",
            "margin-left": "15px",
            "background-image": "url(//cdn.mxpnl.com/site_media/images/icons/notifications/play-" + this.style + "-small.png)",
            "background-repeat": "no-repeat",
            "background-position": "0px 15px"
        },
        "a#button-link": {
            display: "inline-block",
            "vertical-align": "top",
            "text-align": "center",
            "font-size": "17px",
            "font-weight": "bold",
            overflow: "hidden",
            "word-wrap": "break-word",
            color: this.style_vals.text_title,
            transition: "color " + o
        },
        "#button:hover": {
            "background-color": this.style_vals.bg_hover,
            color: this.style_vals.text_hover
        },
        "#button:hover a": {
            color: this.style_vals.text_hover
        },
        "#video-noflip": {
            position: "relative",
            top: 2 * -this.video_height + "px"
        },
        "#video-flip": {
            "backface-visibility": "hidden",
            transform: "rotateY(180deg)"
        },
        "#video": {
            position: "absolute",
            width: this.video_width - 1 + "px",
            height: this.video_height + "px",
            top: te.NOTIF_TOP + "px",
            "margin-top": "100px",
            left: "50%",
            "margin-left": Math.round(-this.video_width / 2) + "px",
            overflow: "hidden",
            "border-radius": "5px",
            "box-shadow": t,
            transform: "translateZ(1px)",
            transition: "opacity " + o + ", top " + o
        },
        "#video.exiting": {
            opacity: "0.0",
            top: this.video_height + "px"
        },
        "#video-holder": {
            position: "absolute",
            width: this.video_width - 1 + "px",
            height: this.video_height + "px",
            overflow: "hidden",
            "border-radius": "5px"
        },
        "#video-frame": {
            "margin-left": "-1px",
            width: this.video_width + "px"
        },
        "#video-controls": {
            opacity: "0",
            transition: "opacity 0.5s"
        },
        "#video:hover #video-controls": {
            opacity: "1.0"
        },
        "#video .video-progress-el": {
            position: "absolute",
            bottom: "0",
            height: "25px",
            "border-radius": "0 0 0 5px"
        },
        "#video-progress": {
            width: "90%"
        },
        "#video-progress-total": {
            width: "100%",
            "background-color": this.style_vals.bg,
            opacity: "0.7"
        },
        "#video-elapsed": {
            width: "0",
            "background-color": "#6cb6f5",
            opacity: "0.9"
        },
        "#video #video-time": {
            width: "10%",
            right: "0",
            "font-size": "11px",
            "line-height": "25px",
            color: this.style_vals.text_main,
            "background-color": "#666",
            "border-radius": "0 0 5px 0"
        }
    };
    if (this._browser_lte("ie", 8)) {
        w.extend(a, {
            "* html #overlay": {
                position: "absolute"
            },
            "* html #bg": {
                position: "absolute"
            },
            "html, body": {
                height: "100%"
            }
        })
    };
    if (this._browser_lte("ie", 7)) {
        w.extend(a, {
            "#mini #body": {
                display: "inline",
                zoom: "1",
                border: "1px solid " + this.style_vals.bg_hover
            },
            "#mini #body-text": {
                padding: "20px"
            },
            "#mini #mini-icon": {
                display: "none"
            }
        })
    };
    var u = [ "backface-visibility", "border-radius", "box-shadow", "opacity", "perspective", "transform", "transform-style", "transition" ], l = [ "khtml", "moz", "ms", "o", "webkit" ];
    for (var c in a) {
        for (var p = 0; p < u.length; p++) {
            var d = u[p];
            if (d in a[c]) {
                for (var h = a[c][d], f = 0; f < l.length; f++) {
                    a[c]["-" + l[f] + "-" + d] = h;
                }
            }
        }
    }
    var m = function(e, t) {
        var n = function(e) {
            var t = "";
            for (var n in e) {
                var r = n.replace(/#/g, "#" + te.MARKUP_PREFIX + "-").replace(/\./g, "." + te.MARKUP_PREFIX + "-");
                t += "\n" + r + " {";
                var o = e[n];
                for (var i in o) {
                    t += i + ":" + o[i] + ";";
                }
                t += "}";
            }
            return t;
        }, r = function(e) {
            var t = "";
            for (var r in e) {
                t += "\n" + r + " {" + n(e[r]) + "\n}";
            }
            return t;
        }, o = n(e) + r(t), i = document.head || document.getElementsByTagName("head")[0] || document.documentElement, s = document.createElement("style");
        i.appendChild(s);
        s.setAttribute("type", "text/css");
        if (s.styleSheet) {
            s.styleSheet.cssText = o;
        } else {
            s.textContent = o;
        }
    };
    m(a, i);
};

te.prototype._init_video = w.safewrap(function() {
    if (this.video_url) {
        var e = this;
        e.yt_custom = "postMessage" in window;
        e.dest_url = e.video_url;
        var t = e.video_url.match(/(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i), n = e.video_url.match(/vimeo\.com\/.*?(\d+)/i);
        if (t) {
            e.show_video = true;
            e.youtube_video = t[1];
            if (e.yt_custom) {
                window.onYouTubeIframeAPIReady = function() {
                    if (e._get_el("video-frame")) {
                        e._yt_video_ready()
                    };
                };
                var r = document.createElement("script");
                r.src = "//www.youtube.com/iframe_api";
                var o = document.getElementsByTagName("script")[0];
                o.parentNode.insertBefore(r, o);
            }
        } else {
            if (n) {
                e.show_video = true, e.vimeo_video = n[1]
            };
        }
        if (e._browser_lte("ie", 7) || e._browser_lte("firefox", 3)) {
            e.show_video = false, e.clickthrough = true
        };
    }
});

te.prototype._mark_as_shown = w.safewrap(function() {
    var e = this;
    w.register_event(e._get_el("bg"), "click", function() {
        e.dismiss();
    });
    var t = function(e, t) {
        var n = {};
        if (document.defaultView && document.defaultView.getComputedStyle) {
            n = document.defaultView.getComputedStyle(e, null);
        } else {
            if (e.currentStyle) {
                n = e.currentStyle
            };
        }
        return n[t];
    };
    if (this.campaign_id) {
        var n = this._get_el("overlay");
        if (n && t(n, "visibility") !== "hidden" && t(n, "display") !== "none") {
            this._mark_delivery()
        };
    }
});

te.prototype._mark_delivery = w.safewrap(function(e) {
    this.marked_as_shown || (this.marked_as_shown = true, this.campaign_id && (this._get_shown_campaigns()[this.campaign_id] = 1 * new Date(), 
    this.persistence.save()), this._track_event("$campaign_delivery", e), this.mixpanel.people.append({
        $campaigns: this.campaign_id,
        $notifications: {
            campaign_id: this.campaign_id,
            message_id: this.message_id,
            type: "web",
            time: new Date()
        }
    }));
});

te.prototype._preload_images = function(e) {
    var t = this;
    if (this.imgs_to_preload.length === 0) {
        return void e();
    }
    for (var n = 0, r = [], o = function() {
        n++;
        if (n === t.imgs_to_preload.length && e) {
            e(), e = null
        };
    }, i = 0; i < this.imgs_to_preload.length; i++) {
        var s = new Image();
        s.onload = o;
        s.src = this.imgs_to_preload[i];
        if (s.complete) {
            o()
        };
        r.push(s);
    }
    if (this._browser_lte("ie", 7)) {
        setTimeout(function() {
            var t = true;
            for (i = 0; i < r.length; i++) {
                r[i].complete || (t = false);
            }
            if (t && e) {
                e(), e = null
            };
        }, 500)
    };
};

te.prototype._remove_notification_el = w.safewrap(function() {
    window.clearInterval(this._video_progress_checker);
    this.notification_el.style.visibility = "hidden";
    this.body_el.removeChild(this.notification_el);
});

te.prototype._set_client_config = function() {
    var e = function(e) {
        var t = navigator.userAgent.match(e);
        return t && t[1];
    };
    this.browser_versions = {};
    this.browser_versions.chrome = e(/Chrome\/(\d+)/);
    this.browser_versions.firefox = e(/Firefox\/(\d+)/);
    this.browser_versions.ie = e(/MSIE (\d+).+/);
    if (!this.browser_versions.ie && !window.ActiveXObject && "ActiveXObject" in window) {
        this.browser_versions.ie = 11
    };
    this.body_el = document.body || document.getElementsByTagName("body")[0];
    if (this.body_el) {
        this.doc_width = Math.max(this.body_el.scrollWidth, document.documentElement.scrollWidth, this.body_el.offsetWidth, document.documentElement.offsetWidth, this.body_el.clientWidth, document.documentElement.clientWidth), 
        this.doc_height = Math.max(this.body_el.scrollHeight, document.documentElement.scrollHeight, this.body_el.offsetHeight, document.documentElement.offsetHeight, this.body_el.clientHeight, document.documentElement.clientHeight)
    };
    var t = this.browser_versions.ie, n = document.createElement("div").style, r = function(e) {
        if (e in n) {
            return true;
        }
        if (!t) {
            e = e[0].toUpperCase() + e.slice(1);
            for (var r = [ "O" + e, "Webkit" + e, "Moz" + e ], o = 0; o < r.length; o++) {
                if (r[o] in n) {
                    return true;
                }
            }
        }
        return false;
    };
    this.use_transitions = this.body_el && r("transition") && r("transform");
    this.flip_animate = (this.browser_versions.chrome >= 33 || this.browser_versions.firefox >= 15) && this.body_el && r("backfaceVisibility") && r("perspective") && r("transform");
};

te.prototype._switch_to_video = w.safewrap(function() {
    var e = this, t = [ {
        el: e._get_notification_display_el(),
        attr: "opacity",
        start: 1,
        goal: 0
    }, {
        el: e._get_notification_display_el(),
        attr: "top",
        start: te.NOTIF_TOP,
        goal: -500
    }, {
        el: e._get_el("video-noflip"),
        attr: "opacity",
        start: 0,
        goal: 1
    }, {
        el: e._get_el("video-noflip"),
        attr: "top",
        start: 2 * -e.video_height,
        goal: 0
    } ];
    if (e.mini) {
        var n = e._get_el("bg"), r = e._get_el("overlay");
        n.style.width = "100%";
        n.style.height = "100%";
        r.style.width = "100%";
        e._add_class(e._get_notification_display_el(), "exiting");
        e._add_class(n, "visible");
        t.push({
            el: e._get_el("bg"),
            attr: "opacity",
            start: 0,
            goal: te.BG_OPACITY
        });
    }
    var o = e._get_el("video-holder");
    o.innerHTML = e.video_iframe;
    var i = function() {
        if (window.YT && window.YT.loaded) {
            e._yt_video_ready()
        };
        e.showing_video = true;
        e._get_notification_display_el().style.visibility = "hidden";
    };
    if (e.flip_animate) {
        e._add_class("flipper", "flipped");
        setTimeout(i, te.ANIM_TIME);
    } else {
        e._animate_els(t, te.ANIM_TIME, i);
    }
});

te.prototype._track_event = function(e, t, n) {
    if (this.campaign_id) {
        t = t || {};
        t = w.extend(t, {
            campaign_id: this.campaign_id,
            message_id: this.message_id,
            message_type: "web_inapp",
            message_subtype: this.notif_type
        });
        this.mixpanel.track(e, t, n);
    } else {
        if (n) {
            n.call()
        };
    }
};

te.prototype._yt_video_ready = w.safewrap(function() {
    var e = this;
    if (!e.video_inited) {
        e.video_inited = true;
        var t = e._get_el("video-elapsed"), n = e._get_el("video-time"), r = e._get_el("video-progress");
        new window.YT.Player(te.MARKUP_PREFIX + "-video-frame", {
            events: {
                onReady: function(o) {
                    var i = o.target, s = i.getDuration(), a = function(e) {
                        return ("00" + e).slice(-2);
                    }, u = function(e) {
                        var t = Math.round(s - e), r = Math.floor(t / 60), o = Math.floor(r / 60);
                        t -= 60 * r;
                        r -= 60 * o;
                        n.innerHTML = "-" + (o ? o + ":" : "") + a(r) + ":" + a(t);
                    };
                    u(0);
                    e._video_progress_checker = window.setInterval(function() {
                        var e = i.getCurrentTime();
                        t.style.width = e / s * 100 + "%";
                        u(e);
                    }, 250);
                    w.register_event(r, "click", function(e) {
                        var t = Math.max(0, e.pageX - r.getBoundingClientRect().left);
                        i.seekTo(s * t / r.clientWidth, true);
                    });
                }
            }
        });
    }
});

ne.prototype.init = ne.prototype.init;

ne.prototype.reset = ne.prototype.reset;

ne.prototype.disable = ne.prototype.disable;

ne.prototype.time_event = ne.prototype.time_event;

ne.prototype.track = ne.prototype.track;

ne.prototype.track_links = ne.prototype.track_links;

ne.prototype.track_forms = ne.prototype.track_forms;

ne.prototype.track_pageview = ne.prototype.track_pageview;

ne.prototype.register = ne.prototype.register;

ne.prototype.register_once = ne.prototype.register_once;

ne.prototype.unregister = ne.prototype.unregister;

ne.prototype.identify = ne.prototype.identify;

ne.prototype.alias = ne.prototype.alias;

ne.prototype.name_tag = ne.prototype.name_tag;

ne.prototype.set_config = ne.prototype.set_config;

ne.prototype.get_config = ne.prototype.get_config;

ne.prototype.get_property = ne.prototype.get_property;

ne.prototype.get_distinct_id = ne.prototype.get_distinct_id;

ne.prototype.toString = ne.prototype.toString;

ne.prototype._check_and_handle_notifications = ne.prototype._check_and_handle_notifications;

ne.prototype._show_notification = ne.prototype._show_notification;

ee.prototype.properties = ee.prototype.properties;

ee.prototype.update_search_keyword = ee.prototype.update_search_keyword;

ee.prototype.update_referrer_info = ee.prototype.update_referrer_info;

ee.prototype.get_cross_subdomain = ee.prototype.get_cross_subdomain;

ee.prototype.clear = ee.prototype.clear;

re.prototype.set = re.prototype.set;

re.prototype.set_once = re.prototype.set_once;

re.prototype.increment = re.prototype.increment;

re.prototype.append = re.prototype.append;

re.prototype.union = re.prototype.union;

re.prototype.track_charge = re.prototype.track_charge;

re.prototype.clear_charges = re.prototype.clear_charges;

re.prototype.delete_user = re.prototype.delete_user;

re.prototype.toString = re.prototype.toString;

w.safewrap_class(ne, [ "identify", "_check_and_handle_notifications", "_show_notification" ]);

var ie = {}, se = function() {
    w.each(ie, function(e, t) {
        if (t !== M) {
            S[t] = e
        };
    });
    S._ = w;
}, ae = function() {
    S.init = function(e, t, n) {
        if (n) {
            S[n] || (S[n] = ie[n] = oe(e, t, n), S[n]._loaded());
            return S[n];
        }
        var r = S;
        if (ie[M]) {
            r = ie[M];
        } else {
            if (e) {
                r = oe(e, t, M), r._loaded(), ie[M] = r
            };
        }
        S = r;
        if (T === A) {
            window[M] = S
        };
        se();
    };
}, ue = function() {
    function e() {
        e.done || (e.done = true, Z = true, Y = false, w.each(ie, function(e) {
            e._dom_loaded();
        }));
    }
    function t() {
        try {
            document.documentElement.doScroll("left");
        } catch (n) {
            return void setTimeout(t, 1);
        }
        e();
    }
    if (document.addEventListener) {
        if (document.readyState === "complete") {
            e();
        } else {
            document.addEventListener("DOMContentLoaded", e, false);
        }
    } else if (document.attachEvent) {
        document.attachEvent("onreadystatechange", e);
        var n = false;
        try {
            n = window.frameElement === null;
        } catch (r) {}
        if (document.documentElement.doScroll && n) {
            t()
        };
    }
    w.register_event(window, "load", e, true);
}, le = function(e) {
    var t = e.get_config("name");
    e.mp_counts = e.mp_counts || {};
    e.mp_counts.$__c = parseInt(w.cookie.get("mp_" + t + "__c")) || 0;
    var n = function() {
        e.mp_counts.$__c = (e.mp_counts.$__c || 0) + 1;
        w.cookie.set("mp_" + t + "__c", e.mp_counts.$__c, 1, true);
    }, r = function() {
        try {
            e.mp_counts = e.mp_counts || {};
            n();
        } catch (t) {
            k.error(t);
        }
    };
    w.register_event(document, "submit", r);
    w.register_event(document, "change", r);
    var o = null;
    w.register_event(document, "mousedown", function(e) {
        o = e.target;
    });
    w.register_event(document, "mouseup", function(e) {
        if (e.target === o) {
            r(e)
        };
    });
}, ce = r();

module.exports = ce;
