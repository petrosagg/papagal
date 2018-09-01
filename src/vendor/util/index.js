(function(t, r) {
    function o(e, t) {
        var r = {
            seen: [],
            stylize: s
        };
        if (arguments.length >= 3) {
            r.depth = arguments[2]
        };
        if (arguments.length >= 4) {
            r.colors = arguments[3]
        };
        if (m(t)) {
            r.showHidden = t;
        } else {
            if (t) {
                exports._extend(r, t)
            };
        }
        if (w(r.showHidden)) {
            r.showHidden = false
        };
        if (w(r.depth)) {
            r.depth = 2
        };
        if (w(r.colors)) {
            r.colors = false
        };
        if (w(r.customInspect)) {
            r.customInspect = true
        };
        if (r.colors) {
            r.stylize = i
        };
        return u(r, e, r.depth);
    }
    function i(e, t) {
        var n = o.styles[t];
        if (n) {
            return "[" + o.colors[n][0] + "m" + e + "[" + o.colors[n][1] + "m";
        }
        return e;
    }
    function s(e, t) {
        return e;
    }
    function a(e) {
        var t = {};
        e.forEach(function(e, n) {
            t[e] = true;
        });
        return t;
    }
    function u(e, t, r) {
        if (e.customInspect && t && T(t.inspect) && t.inspect !== exports.inspect && (!t.constructor || t.constructor.prototype !== t)) {
            var o = t.inspect(r, e);
            if (!y(o)) {
                o = u(e, o, r)
            };
            return o;
        }
        var i = l(e, t);
        if (i) {
            return i;
        }
        var s = Object.keys(t), m = a(s);
        if (e.showHidden) {
            s = Object.getOwnPropertyNames(t)
        };
        if (E(t) && (s.indexOf("message") >= 0 || s.indexOf("description") >= 0)) {
            return c(t);
        }
        if (s.length === 0) {
            if (T(t)) {
                var g = t.name ? ": " + t.name : "";
                return e.stylize("[Function" + g + "]", "special");
            }
            if (k(t)) {
                return e.stylize(RegExp.prototype.toString.call(t), "regexp");
            }
            if (C(t)) {
                return e.stylize(Date.prototype.toString.call(t), "date");
            }
            if (E(t)) {
                return c(t);
            }
        }
        var v = "", b = false, _ = [ "{", "}" ];
        if (f(t)) {
            b = true, _ = [ "[", "]" ]
        };
        if (T(t)) {
            var w = t.name ? ": " + t.name : "";
            v = " [Function" + w + "]";
        }
        if (k(t)) {
            v = " " + RegExp.prototype.toString.call(t)
        };
        if (C(t)) {
            v = " " + Date.prototype.toUTCString.call(t)
        };
        if (E(t)) {
            v = " " + c(t)
        };
        if (s.length === 0 && (!b || t.length == 0)) {
            return _[0] + v + _[1];
        }
        if (r < 0) {
            if (k(t)) {
                return e.stylize(RegExp.prototype.toString.call(t), "regexp");
            }
            return e.stylize("[Object]", "special");
        }
        e.seen.push(t);
        var x;
        if (b) {
            x = p(e, t, r, m, s);
        } else {
            x = s.map(function(n) {
                return d(e, t, r, m, n, b);
            });
        }
        e.seen.pop();
        return h(x, v, _);
    }
    function l(e, t) {
        if (w(t)) {
            return e.stylize("undefined", "undefined");
        }
        if (y(t)) {
            var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return e.stylize(n, "string");
        }
        if (b(t)) {
            return e.stylize("" + t, "number");
        }
        if (m(t)) {
            return e.stylize("" + t, "boolean");
        }
        if (g(t)) {
            return e.stylize("null", "null");
        }
        return;
    }
    function c(e) {
        return "[" + Error.prototype.toString.call(e) + "]";
    }
    function p(e, t, n, r, o) {
        for (var i = [], s = 0, a = t.length; a > s; ++s) {
            if (F(t, String(s))) {
                i.push(d(e, t, n, r, String(s), true));
            } else {
                i.push("");
            }
        }
        o.forEach(function(o) {
            if (!o.match(/^\d+$/)) {
                i.push(d(e, t, n, r, o, true))
            };
        });
        return i;
    }
    function d(e, t, n, r, o, i) {
        var s, a, l;
        l = Object.getOwnPropertyDescriptor(t, o) || {
            value: t[o]
        };
        if (l.get) {
            if (l.set) {
                a = e.stylize("[Getter/Setter]", "special");
            } else {
                a = e.stylize("[Getter]", "special");
            }
        } else {
            if (l.set) {
                a = e.stylize("[Setter]", "special")
            };
        }
        if (!F(r, o)) {
            s = "[" + o + "]"
        };
        if (!a) {
            e.seen.indexOf(l.value) < 0 ? (a = g(n) ? u(e, l.value, null) : u(e, l.value, n - 1), 
            a.indexOf("\n") > -1 && (a = i ? a.split("\n").map(function(e) {
                return "  " + e;
            }).join("\n").substr(2) : "\n" + a.split("\n").map(function(e) {
                return "   " + e;
            }).join("\n"))) : a = e.stylize("[Circular]", "special")
        };
        if (w(s)) {
            if (i && o.match(/^\d+$/)) {
                return a;
            }
            s = JSON.stringify("" + o);
            if (s.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                s = s.substr(1, s.length - 2);
                s = e.stylize(s, "name");
            } else {
                s = s.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                s = e.stylize(s, "string");
            }
        }
        return s + ": " + a;
    }
    function h(e, t, n) {
        var r = 0, o = e.reduce(function(e, t) {
            r++;
            if (t.indexOf("\n") >= 0) {
                r++
            };
            return e + t.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (o > 60) {
            return n[0] + (t === "" ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1];
        }
        return n[0] + t + " " + e.join(", ") + " " + n[1];
    }
    function f(e) {
        return Array.isArray(e);
    }
    function m(e) {
        return typeof e == "boolean";
    }
    function g(e) {
        return e === null;
    }
    function v(e) {
        return e == null;
    }
    function b(e) {
        return typeof e == "number";
    }
    function y(e) {
        return typeof e == "string";
    }
    function _(e) {
        return typeof e == "symbol";
    }
    function w(e) {
        return e === undefined;
    }
    function k(e) {
        return x(e) && D(e) === "[object RegExp]";
    }
    function x(e) {
        return typeof e == "object" && e !== null;
    }
    function C(e) {
        return x(e) && D(e) === "[object Date]";
    }
    function E(e) {
        return x(e) && (D(e) === "[object Error]" || e instanceof Error);
    }
    function T(e) {
        return typeof e == "function";
    }
    function S(e) {
        return e === null || typeof e == "boolean" || typeof e == "number" || typeof e == "string" || typeof e == "symbol" || typeof e == "undefined";
    }
    function D(e) {
        return Object.prototype.toString.call(e);
    }
    function A(e) {
        if (e < 10) {
            return "0" + e.toString(10);
        }
        return e.toString(10);
    }
    function M() {
        var e = new Date(), t = [ A(e.getHours()), A(e.getMinutes()), A(e.getSeconds()) ].join(":");
        return [ e.getDate(), P[e.getMonth()], t ].join(" ");
    }
    function F(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    var N = /%[sdj%]/g;
    exports.format = function(e) {
        if (!y(e)) {
            for (var t = [], n = 0; n < arguments.length; n++) {
                t.push(o(arguments[n]));
            }
            return t.join(" ");
        }
        for (var n = 1, r = arguments, i = r.length, s = String(e).replace(N, function(e) {
            if (e === "%%") {
                return "%";
            }
            if (n >= i) {
                return e;
            }
            switch (e) {
              case "%s":
                return String(r[n++]);

              case "%d":
                return Number(r[n++]);

              case "%j":
                try {
                    return JSON.stringify(r[n++]);
                } catch (t) {
                    return "[Circular]";
                }

              default:
                return e;
            }
        }), a = r[n]; i > n; a = r[++n]) {
            if (g(a) || !x(a)) {
                s += " " + a;
            } else {
                s += " " + o(a);
            }
        }
        return s;
    };
    exports.deprecate = function(e, o) {
        function i() {
            if (!s) {
                if (t.throwDeprecation) {
                    throw new Error(o);
                }
                if (t.traceDeprecation) {
                    console.trace(o);
                } else {
                    console.error(o);
                }
                s = true;
            }
            return e.apply(this, arguments);
        }
        if (w(r.process)) {
            return function() {
                return exports.deprecate(e, o).apply(this, arguments);
            };
        }
        if (t.noDeprecation === true) {
            return e;
        }
        var s = false;
        return i;
    };
    var O, I = {};
    exports.debuglog = function(e) {
        if (w(O)) {
            O = t.env.NODE_DEBUG || ""
        };
        e = e.toUpperCase();
        if (!I[e]) {
            if (new RegExp("\\b" + e + "\\b", "i").test(O)) {
                var r = t.pid;
                I[e] = function() {
                    var t = exports.format.apply(exports, arguments);
                    console.error("%s %d: %s", e, r, t);
                };
            } else {
                I[e] = function() {};
            }
        }
        return I[e];
    };
    exports.inspect = o;
    o.colors = {
        bold: [ 1, 22 ],
        italic: [ 3, 23 ],
        underline: [ 4, 24 ],
        inverse: [ 7, 27 ],
        white: [ 37, 39 ],
        grey: [ 90, 39 ],
        black: [ 30, 39 ],
        blue: [ 34, 39 ],
        cyan: [ 36, 39 ],
        green: [ 32, 39 ],
        magenta: [ 35, 39 ],
        red: [ 31, 39 ],
        yellow: [ 33, 39 ]
    };
    o.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    };
    exports.isArray = f;
    exports.isBoolean = m;
    exports.isNull = g;
    exports.isNullOrUndefined = v;
    exports.isNumber = b;
    exports.isString = y;
    exports.isSymbol = _;
    exports.isUndefined = w;
    exports.isRegExp = k;
    exports.isObject = x;
    exports.isDate = C;
    exports.isError = E;
    exports.isFunction = T;
    exports.isPrimitive = S;
    exports.isBuffer = require("./support/isBuffer");
    var P = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    exports.log = function() {
        console.log("%s - %s", M(), exports.format.apply(exports, arguments));
    };
    exports.inherits = require("inherits");
    exports._extend = function(e, t) {
        if (!t || !x(t)) {
            return e;
        }
        for (var n = Object.keys(t), r = n.length; r--; ) {
            e[n[r]] = t[n[r]];
        }
        return e;
    };
}).call(this, require("_process"), typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
