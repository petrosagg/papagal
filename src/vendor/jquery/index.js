!function(e, n) {
    typeof module == "object" && typeof module.exports == "object" ? module.exports = e.document ? n(e, !0) : function(e) {
        if (!e.document) {
            throw new Error("jQuery requires a window with a document");
        }
        return n(e);
    } : n(e);
}(typeof window != "undefined" ? window : this, function(e, t) {
    function n(e) {
        var t = "length" in e && e.length, n = X.type(e);
        if (n === "function" || X.isWindow(e)) {
            return !1;
        }
        if (e.nodeType === 1 && t) {
            return !0;
        }
        return n === "array" || t === 0 || typeof t == "number" && t > 0 && t - 1 in e;
    }
    function r(e, t, n) {
        if (X.isFunction(t)) {
            return X.grep(e, function(e, r) {
                return !!t.call(e, r, e) !== n;
            });
        }
        if (t.nodeType) {
            return X.grep(e, function(e) {
                return e === t !== n;
            });
        }
        if (typeof t == "string") {
            if (ae.test(t)) {
                return X.filter(t, e, n);
            }
            t = X.filter(t, e);
        }
        return X.grep(e, function(e) {
            return W.call(t, e) >= 0 !== n;
        });
    }
    function o(e, t) {
        for (;(e = e[t]) && 1 !== e.nodeType; ) {
        }
        return e;
    }
    function i(e) {
        var t = fe[e] = {};
        X.each(e.match(he) || [], function(e, n) {
            t[n] = !0;
        });
        return t;
    }
    function s() {
        J.removeEventListener("DOMContentLoaded", s, !1);
        e.removeEventListener("load", s, !1);
        X.ready();
    }
    function a() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {};
            }
        });
        this.expando = X.expando + a.uid++;
    }
    function u(e, t, n) {
        var r;
        if (n === void 0 && e.nodeType === 1) {
            r = "data-" + t.replace(_e, "-$1").toLowerCase();
            n = e.getAttribute(r);
            if (typeof n == "string") {
                try {
                    n = n === "true" ? !0 : n === "false" ? !1 : n === "null" ? null : +n + "" === n ? +n : ye.test(n) ? X.parseJSON(n) : n;
                } catch (o) {}
                be.set(e, t, n);
            } else n = void 0;
        }
        return n;
    }
    function l() {
        return !0;
    }
    function c() {
        return !1;
    }
    function p() {
        try {
            return J.activeElement;
        } catch (e) {}
    }
    function d(e, t) {
        if (X.nodeName(e, "table") && X.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr")) {
            return e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody"));
        }
        return e;
    }
    function h(e) {
        e.type = (null !== e.getAttribute("type")) + "/" + e.type;
        return e;
    }
    function f(e) {
        var t = Le.exec(e.type);
        t ? e.type = t[1] : e.removeAttribute("type");
        return e;
    }
    function m(e, t) {
        for (var n = 0, r = e.length; r > n; n++) {
            ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"));
        }
    }
    function g(e, t) {
        var n, r, o, i, s, a, u, l;
        if (t.nodeType === 1) {
            if (ve.hasData(e) && (i = ve.access(e), s = ve.set(t, i), l = i.events)) {
                delete s.handle;
                s.events = {};
                for (o in l) {
                    for (n = 0, r = l[o].length; r > n; n++) {
                        X.event.add(t, o, l[o][n]);
                    }
                }
            }
            if (be.hasData(e)) {
                a = be.access(e), u = X.extend({}, a), be.set(t, u)
            };
        }
    }
    function v(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        if (t === void 0 || t && X.nodeName(e, t)) {
            return X.merge([ e ], n);
        }
        return n;
    }
    function b(e, t) {
        var n = t.nodeName.toLowerCase();
        n === "input" && Ce.test(e.type) ? t.checked = e.checked : (n === "input" || n === "textarea") && (t.defaultValue = e.defaultValue);
    }
    function y(t, n) {
        var r, o = X(n.createElement(t)).appendTo(n.body), i = e.getDefaultComputedStyle && (r = e.getDefaultComputedStyle(o[0])) ? r.display : X.css(o[0], "display");
        o.detach();
        return i;
    }
    function _(e) {
        var t = J, n = $e[e];
        n || (n = y(e, t), "none" !== n && n || (je = (je || X("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement), 
        t = je[0].contentDocument, t.write(), t.close(), n = y(e, t), je.detach()), $e[e] = n);
        return n;
    }
    function w(e, t, n) {
        var r, o, i, s, a = e.style;
        n = n || He(e);
        if (n) {
            s = n.getPropertyValue(t) || n[t]
        };
        if (n) {
            "" !== s || X.contains(e.ownerDocument, e) || (s = X.style(e, t)), Ve.test(s) && Ue.test(t) && (r = a.width, 
            o = a.minWidth, i = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, 
            a.width = r, a.minWidth = o, a.maxWidth = i)
        };
        if (void 0 !== s) {
            return s + "";
        }
        return s;
    }
    function k(e, t) {
        return {
            get: function() {
                if (e()) {
                    return void delete this.get;
                }
                return (this.get = t).apply(this, arguments);
            }
        };
    }
    function x(e, t) {
        if (t in e) {
            return t;
        }
        for (var n = t[0].toUpperCase() + t.slice(1), r = t, o = Ke.length; o--; ) {
            t = Ke[o] + n;
            if (t in e) {
                return t;
            }
        }
        return r;
    }
    function C(e, t, n) {
        var r = qe.exec(t);
        if (r) {
            return Math.max(0, r[1] - (n || 0)) + (r[2] || "px");
        }
        return t;
    }
    function E(e, t, n, r, o) {
        for (var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0, s = 0; i < 4; i += 2) {
            if (n === "margin") {
                s += X.css(e, n + ke[i], !0, o)
            };
            r ? (n === "content" && (s -= X.css(e, "padding" + ke[i], !0, o)), "margin" !== n && (s -= X.css(e, "border" + ke[i] + "Width", !0, o))) : (s += X.css(e, "padding" + ke[i], !0, o), 
            "padding" !== n && (s += X.css(e, "border" + ke[i] + "Width", !0, o)));
        }
        return s;
    }
    function T(e, t, n) {
        var r = !0, o = t === "width" ? e.offsetWidth : e.offsetHeight, i = He(e), s = X.css(e, "boxSizing", !1, i) === "border-box";
        if (o <= 0 || o == null) {
            o = w(e, t, i);
            if (o < 0 || o == null) {
                o = e.style[t]
            };
            if (Ve.test(o)) {
                return o;
            }
            r = s && (Z.boxSizingReliable() || o === e.style[t]);
            o = parseFloat(o) || 0;
        }
        return o + E(e, t, n || (s ? "border" : "content"), r, i) + "px";
    }
    function S(e, t) {
        for (var n, r, o, i = [], s = 0, a = e.length; a > s; s++) {
            r = e[s];
            if (r.style) {
                i[s] = ve.get(r, "olddisplay"), n = r.style.display, t ? (i[s] || "none" !== n || (r.style.display = ""), 
                r.style.display === "" && xe(r) && (i[s] = ve.access(r, "olddisplay", _(r.nodeName)))) : (o = xe(r), 
                n === "none" && o || ve.set(r, "olddisplay", o ? n : X.css(r, "display")))
            };
        }
        for (s = 0; a > s; s++) {
            r = e[s];
            if (r.style) {
                t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? i[s] || "" : "none")
            };
        }
        return e;
    }
    function D(e, t, n, r, o) {
        return new D.prototype.init(e, t, n, r, o);
    }
    function A() {
        setTimeout(function() {
            Ze = void 0;
        });
        return Ze = X.now();
    }
    function M(e, t) {
        var n, r = 0, o = {
            height: e
        };
        for (t = t ? 1 : 0; r < 4; r += 2 - t) {
            n = ke[r];
            o["margin" + n] = o["padding" + n] = e;
        }
        if (t) {
            o.opacity = o.width = e
        };
        return o;
    }
    function F(e, t, n) {
        for (var r, o = (nt[t] || []).concat(nt["*"]), i = 0, s = o.length; s > i; i++) {
            if (r = o[i].call(n, t, e)) {
                return r;
            }
        }
    }
    function N(e, t, n) {
        var r, o, i, s, a, u, l, c, p = this, d = {}, h = e.style, f = e.nodeType && xe(e), m = ve.get(e, "fxshow");
        n.queue || (a = X._queueHooks(e, "fx"), a.unqueued == null && (a.unqueued = 0, u = a.empty.fire, 
        a.empty.fire = function() {
            a.unqueued || u();
        }), a.unqueued++, p.always(function() {
            p.always(function() {
                a.unqueued--;
                X.queue(e, "fx").length || a.empty.fire();
            });
        }));
        if (e.nodeType === 1 && ("height" in t || "width" in t)) {
            n.overflow = [ h.overflow, h.overflowX, h.overflowY ], l = X.css(e, "display"), 
            c = l === "none" ? ve.get(e, "olddisplay") || _(e.nodeName) : l, c === "inline" && X.css(e, "float") === "none" && (h.display = "inline-block")
        };
        if (n.overflow) {
            h.overflow = "hidden", p.always(function() {
                h.overflow = n.overflow[0];
                h.overflowX = n.overflow[1];
                h.overflowY = n.overflow[2];
            })
        };
        for (r in t) {
            o = t[r];
            if (Qe.exec(o)) {
                delete t[r];
                i = i || o === "toggle";
                if (o === (f ? "hide" : "show")) {
                    if ("show" !== o || !m || m[r] === void 0) {
                        continue;
                    }
                    f = !0;
                }
                d[r] = m && m[r] || X.style(e, r);
            } else l = void 0;
        }
        if (X.isEmptyObject(d)) {
            if ((l === "none" ? _(e.nodeName) : l) === "inline") {
                h.display = l
            };
        } else {
            m ? "hidden" in m && (f = m.hidden) : m = ve.access(e, "fxshow", {});
            if (i) {
                m.hidden = !f
            };
            f ? X(e).show() : p.done(function() {
                X(e).hide();
            });
            p.done(function() {
                var t;
                ve.remove(e, "fxshow");
                for (t in d) {
                    X.style(e, t, d[t]);
                }
            });
            for (r in d) {
                s = F(f ? m[r] : 0, r, p);
                r in m || (m[r] = s.start, f && (s.end = s.start, s.start = r === "width" || r === "height" ? 1 : 0));
            }
        }
    }
    function O(e, t) {
        var n, r, o, i, s;
        for (n in e) {
            r = X.camelCase(n);
            o = t[r];
            i = e[n];
            if (X.isArray(i)) {
                o = i[1], i = e[n] = i[0]
            };
            if (n !== r) {
                e[r] = i, delete e[n]
            };
            s = X.cssHooks[r];
            if (s && "expand" in s) {
                i = s.expand(i);
                delete e[r];
                for (n in i) {
                    n in e || (e[n] = i[n], t[n] = o);
                }
            } else t[r] = o;
        }
    }
    function I(e, t, n) {
        var r, o, i = 0, s = tt.length, a = X.Deferred().always(function() {
            delete u.elem;
        }), u = function() {
            if (o) {
                return !1;
            }
            for (var t = Ze || A(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r, s = 0, u = l.tweens.length; u > s; s++) {
                l.tweens[s].run(i);
            }
            a.notifyWith(e, [ l, i, n ]);
            if (i < 1 && u) {
                return n;
            }
            a.resolveWith(e, [ l ]);
            return !1;
        }, l = a.promise({
            elem: e,
            props: X.extend({}, t),
            opts: X.extend(!0, {
                specialEasing: {}
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: Ze || A(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = X.Tween(e, l.opts, t, n, l.opts.specialEasing[t] || l.opts.easing);
                l.tweens.push(r);
                return r;
            },
            stop: function(t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (o) {
                    return this;
                }
                for (o = !0; r > n; n++) {
                    l.tweens[n].run(1);
                }
                t ? a.resolveWith(e, [ l, t ]) : a.rejectWith(e, [ l, t ]);
                return this;
            }
        }), c = l.props;
        for (O(c, l.opts.specialEasing); s > i; i++) {
            if (r = tt[i].call(l, e, c, l.opts)) {
                return r;
            }
        }
        X.map(c, F, l);
        if (X.isFunction(l.opts.start)) {
            l.opts.start.call(e, l)
        };
        X.fx.timer(X.extend(u, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        }));
        return l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
    }
    function P(e) {
        return function(t, n) {
            if (typeof t != "string") {
                n = t, t = "*"
            };
            var r, o = 0, i = t.toLowerCase().match(he) || [];
            if (X.isFunction(n)) {
                for (;r = i[o++]; ) {
                    r[0] === "+" ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n);
                }
            }
        };
    }
    function L(e, t, n, r) {
        function o(a) {
            var u;
            i[a] = !0;
            X.each(e[a] || [], function(e, a) {
                var l = a(t, n, r);
                if (typeof l != "string" || s || i[l]) {
                    if (s) {
                        return !(u = l);
                    }
                    return;
                }
                t.dataTypes.unshift(l);
                o(l);
                return !1;
            });
            return u;
        }
        var i = {}, s = e === yt;
        return o(t.dataTypes[0]) || !i["*"] && o("*");
    }
    function R(e, t) {
        var n, r, o = X.ajaxSettings.flatOptions || {};
        for (n in t) {
            if (void 0 !== t[n]) {
                (o[n] ? e : r || (r = {}))[n] = t[n]
            };
        }
        if (r) {
            X.extend(!0, e, r)
        };
        return e;
    }
    function B(e, t, n) {
        for (var r, o, i, s, a = e.contents, u = e.dataTypes; u[0] === "*"; ) {
            u.shift();
            if (r === void 0) {
                r = e.mimeType || t.getResponseHeader("Content-Type")
            };
        }
        if (r) {
            for (o in a) {
                if (a[o] && a[o].test(r)) {
                    u.unshift(o);
                    break;
                }
            }
        }
        if (u[0] in n) {
            i = u[0];
        } else {
            for (o in n) {
                if (!u[0] || e.converters[o + " " + u[0]]) {
                    i = o;
                    break;
                }
                s || (s = o);
            }
            i = i || s;
        }
        if (i) {
            if (i !== u[0]) {
                u.unshift(i)
            };
            return n[i];
        }
        return;
    }
    function j(e, t, n, r) {
        var o, i, s, a, u, l = {}, c = e.dataTypes.slice();
        if (c[1]) {
            for (s in e.converters) {
                l[s.toLowerCase()] = e.converters[s];
            }
        }
        for (i = c.shift(); i; ) {
            if (e.responseFields[i]) {
                n[e.responseFields[i]] = t
            };
            if (!u && r && e.dataFilter) {
                t = e.dataFilter(t, e.dataType)
            };
            u = i;
            if (i = c.shift()) {
                if (i === "*") {
                    i = u;
                } else if ("*" !== u && u !== i) {
                    s = l[u + " " + i] || l["* " + i];
                    if (!s) {
                        for (o in l) {
                            a = o.split(" ");
                            if (a[1] === i && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
                                s === !0 ? s = l[o] : l[o] !== !0 && (i = a[0], c.unshift(a[1]));
                                break;
                            }
                        }
                    }
                    if (s !== !0) {
                        if (s && e["throws"]) {
                            t = s(t);
                        } else try {
                            t = s(t);
                        } catch (p) {
                            return {
                                state: "parsererror",
                                error: s ? p : "No conversion from " + u + " to " + i
                            };
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: t
        };
    }
    function $(e, t, n, r) {
        var o;
        if (X.isArray(t)) {
            X.each(t, function(t, o) {
                n || Ct.test(e) ? r(e, o) : $(e + "[" + (typeof o == "object" ? t : "") + "]", o, n, r);
            });
        } else if (n || "object" !== X.type(t)) {
            r(e, t);
        } else for (o in t) {
            $(e + "[" + o + "]", t[o], n, r);
        }
    }
    function U(e) {
        if (X.isWindow(e)) {
            return e;
        }
        return e.nodeType === 9 && e.defaultView;
    }
    var V = [], H = V.slice, z = V.concat, q = V.push, W = V.indexOf, G = {}, Y = G.toString, K = G.hasOwnProperty, Z = {}, J = e.document, Q = "2.1.4", X = function(e, t) {
        return new X.fn.init(e, t);
    }, ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, te = /^-ms-/, ne = /-([\da-z])/gi, re = function(e, t) {
        return t.toUpperCase();
    };
    X.fn = X.prototype = {
        jquery: Q,
        constructor: X,
        selector: "",
        length: 0,
        toArray: function() {
            return H.call(this);
        },
        get: function(e) {
            if (e != null) {
                if (e < 0) {
                    return this[e + this.length];
                }
                return this[e];
            }
            return H.call(this);
        },
        pushStack: function(e) {
            var t = X.merge(this.constructor(), e);
            t.prevObject = this;
            t.context = this.context;
            return t;
        },
        each: function(e, t) {
            return X.each(this, e, t);
        },
        map: function(e) {
            return this.pushStack(X.map(this, function(t, n) {
                return e.call(t, n, t);
            }));
        },
        slice: function() {
            return this.pushStack(H.apply(this, arguments));
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        },
        eq: function(e) {
            var t = this.length, n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [ this[n] ] : []);
        },
        end: function() {
            return this.prevObject || this.constructor(null);
        },
        push: q,
        sort: V.sort,
        splice: V.splice
    };
    X.extend = X.fn.extend = function() {
        var e, t, n, r, o, i, s = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
        for (typeof s == "boolean" && (l = s, s = arguments[a] || {}, a++), typeof s == "object" || X.isFunction(s) || (s = {}), 
        a === u && (s = this, a--); u > a; a++) {
            if ((e = arguments[a]) != null) {
                for (t in e) {
                    n = s[t];
                    r = e[t];
                    if (s !== r) {
                        l && r && (X.isPlainObject(r) || (o = X.isArray(r))) ? (o ? (o = !1, i = n && X.isArray(n) ? n : []) : i = n && X.isPlainObject(n) ? n : {}, 
                        s[t] = X.extend(l, i, r)) : void 0 !== r && (s[t] = r)
                    };
                }
            }
        }
        return s;
    };
    X.extend({
        expando: "jQuery" + (Q + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e);
        },
        noop: function() {},
        isFunction: function(e) {
            return X.type(e) === "function";
        },
        isArray: Array.isArray,
        isWindow: function(e) {
            return e != null && e === e.window;
        },
        isNumeric: function(e) {
            return !X.isArray(e) && e - parseFloat(e) + 1 >= 0;
        },
        isPlainObject: function(e) {
            if ("object" !== X.type(e) || e.nodeType || X.isWindow(e)) {
                return !1;
            }
            if (e.constructor && !K.call(e.constructor.prototype, "isPrototypeOf")) {
                return !1;
            }
            return !0;
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) {
                return !1;
            }
            return !0;
        },
        type: function(e) {
            if (e == null) {
                return e + "";
            }
            if (typeof e == "object" || typeof e == "function") {
                return G[Y.call(e)] || "object";
            }
            return typeof e;
        },
        globalEval: function(e) {
            var t, n = eval;
            e = X.trim(e);
            if (e) {
                e.indexOf("use strict") === 1 ? (t = J.createElement("script"), t.text = e, J.head.appendChild(t).parentNode.removeChild(t)) : n(e)
            };
        },
        camelCase: function(e) {
            return e.replace(te, "ms-").replace(ne, re);
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
        },
        each: function(e, t, r) {
            var o, i = 0, s = e.length, a = n(e);
            if (r) {
                if (a) {
                    for (;s > i && (o = t.apply(e[i], r), o !== !1); i++) {
                    }
                } else for (i in e) {
                    o = t.apply(e[i], r);
                    if (o === !1) {
                        break;
                    }
                }
            } else if (a) {
                for (;s > i && (o = t.call(e[i], i, e[i]), o !== !1); i++) {
                }
            } else for (i in e) {
                o = t.call(e[i], i, e[i]);
                if (o === !1) {
                    break;
                }
            }
            return e;
        },
        trim: function(e) {
            if (e == null) {
                return "";
            }
            return (e + "").replace(ee, "");
        },
        makeArray: function(e, t) {
            var r = t || [];
            if (e != null) {
                n(Object(e)) ? X.merge(r, typeof e == "string" ? [ e ] : e) : q.call(r, e)
            };
            return r;
        },
        inArray: function(e, t, n) {
            if (t == null) {
                return -1;
            }
            return W.call(t, e, n);
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, o = e.length; n > r; r++) {
                e[o++] = t[r];
            }
            e.length = o;
            return e;
        },
        grep: function(e, t, n) {
            for (var r, o = [], i = 0, s = e.length, a = !n; s > i; i++) {
                r = !t(e[i], i);
                if (r !== a) {
                    o.push(e[i])
                };
            }
            return o;
        },
        map: function(e, t, r) {
            var o, i = 0, s = e.length, a = n(e), u = [];
            if (a) {
                for (;s > i; i++) {
                    o = t(e[i], i, r);
                    if (o != null) {
                        u.push(o)
                    };
                }
            } else for (i in e) {
                o = t(e[i], i, r);
                if (o != null) {
                    u.push(o)
                };
            }
            return z.apply([], u);
        },
        guid: 1,
        proxy: function(e, t) {
            var n, r, o;
            if (typeof t == "string") {
                n = e[t], t = e, e = n
            };
            if (X.isFunction(e)) {
                r = H.call(arguments, 2);
                o = function() {
                    return e.apply(t || this, r.concat(H.call(arguments)));
                };
                o.guid = e.guid = e.guid || X.guid++;
                return o;
            }
            return;
        },
        now: Date.now,
        support: Z
    });
    X.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        G["[object " + t + "]"] = t.toLowerCase();
    });
    var oe = function(e) {
        function t(e, t, n, r) {
            var o, i, s, a, u, l, p, h, f, m;
            if ((t ? t.ownerDocument || t : $) !== N) {
                F(t)
            };
            t = t || N;
            n = n || [];
            a = t.nodeType;
            if (typeof e != "string" || !e || 1 !== a && 9 !== a && 11 !== a) {
                return n;
            }
            if (!r && I) {
                if (11 !== a && (o = be.exec(e))) {
                    if (s = o[1]) {
                        if (a === 9) {
                            i = t.getElementById(s);
                            if (!i || !i.parentNode) {
                                return n;
                            }
                            if (i.id === s) {
                                n.push(i);
                                return n;
                            }
                        } else if (t.ownerDocument && (i = t.ownerDocument.getElementById(s)) && B(t, i) && i.id === s) {
                            n.push(i);
                            return n;
                        }
                    } else {
                        if (o[2]) {
                            Q.apply(n, t.getElementsByTagName(e));
                            return n;
                        }
                        if ((s = o[3]) && w.getElementsByClassName) {
                            Q.apply(n, t.getElementsByClassName(s));
                            return n;
                        }
                    }
                }
                if (w.qsa && (!P || !P.test(e))) {
                    h = p = j;
                    f = t;
                    m = 1 !== a && e;
                    if (a === 1 && "object" !== t.nodeName.toLowerCase()) {
                        for (l = E(e), (p = t.getAttribute("id")) ? h = p.replace(_e, "\\$&") : t.setAttribute("id", h), 
                        h = "[id='" + h + "'] ", u = l.length; u--; ) {
                            l[u] = h + d(l[u]);
                        }
                        f = ye.test(e) && c(t.parentNode) || t;
                        m = l.join(",");
                    }
                    if (m) {
                        try {
                            Q.apply(n, f.querySelectorAll(m));
                            return n;
                        } catch (g) {} finally {
                            p || t.removeAttribute("id");
                        }
                    }
                }
            }
            return S(e.replace(ue, "$1"), t, n, r);
        }
        function n() {
            function e(n, r) {
                if (t.push(n + " ") > k.cacheLength) {
                    delete e[t.shift()]
                };
                return e[n + " "] = r;
            }
            var t = [];
            return e;
        }
        function r(e) {
            e[j] = !0;
            return e;
        }
        function o(e) {
            var t = N.createElement("div");
            try {
                return !!e(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null;
            }
        }
        function i(e, t) {
            for (var n = e.split("|"), r = e.length; r--; ) {
                k.attrHandle[n[r]] = t;
            }
        }
        function s(e, t) {
            var n = t && e, r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || G) - (~e.sourceIndex || G);
            if (r) {
                return r;
            }
            if (n) {
                for (;n = n.nextSibling; ) {
                    if (n === t) {
                        return -1;
                    }
                }
            }
            if (e) {
                return 1;
            }
            return -1;
        }
        function a(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return n === "input" && t.type === e;
            };
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return (n === "input" || n === "button") && t.type === e;
            };
        }
        function l(e) {
            return r(function(t) {
                t = +t;
                return r(function(n, r) {
                    for (var o, i = e([], n.length, t), s = i.length; s--; ) {
                        if (n[o = i[s]]) {
                            n[o] = !(r[o] = n[o])
                        };
                    }
                });
            });
        }
        function c(e) {
            return e && typeof e.getElementsByTagName != "undefined" && e;
        }
        function p() {}
        function d(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) {
                r += e[t].value;
            }
            return r;
        }
        function h(e, t, n) {
            var r = t.dir, o = n && r === "parentNode", i = V++;
            if (t.first) {
                return function(t, n, i) {
                    for (;t = t[r]; ) {
                        if (t.nodeType === 1 || o) {
                            return e(t, n, i);
                        }
                    }
                };
            }
            return function(t, n, s) {
                var a, u, l = [ U, i ];
                if (s) {
                    for (;t = t[r]; ) {
                        if ((t.nodeType === 1 || o) && e(t, n, s)) {
                            return !0;
                        }
                    }
                } else for (;t = t[r]; ) {
                    if (t.nodeType === 1 || o) {
                        u = t[j] || (t[j] = {});
                        if ((a = u[r]) && a[0] === U && a[1] === i) {
                            return l[2] = a[2];
                        }
                        u[r] = l;
                        if (l[2] = e(t, n, s)) {
                            return !0;
                        }
                    }
                }
            };
        }
        function f(e) {
            if (e.length > 1) {
                return function(t, n, r) {
                    for (var o = e.length; o--; ) {
                        if (!e[o](t, n, r)) {
                            return !1;
                        }
                    }
                    return !0;
                };
            }
            return e[0];
        }
        function m(e, n, r) {
            for (var o = 0, i = n.length; i > o; o++) {
                t(e, n[o], r);
            }
            return r;
        }
        function g(e, t, n, r, o) {
            for (var i, s = [], a = 0, u = e.length, l = t != null; u > a; a++) {
                if ((i = e[a]) && (!n || n(i, r, o))) {
                    s.push(i), l && t.push(a)
                };
            }
            return s;
        }
        function v(e, t, n, o, i, s) {
            if (o && !o[j]) {
                o = v(o)
            };
            if (i && !i[j]) {
                i = v(i, s)
            };
            return r(function(r, s, a, u) {
                var l, c, p, d = [], h = [], f = s.length, v = r || m(t || "*", a.nodeType ? [ a ] : a, []), b = !e || !r && t ? v : g(v, d, e, a, u), y = n ? i || (r ? e : f || o) ? [] : s : b;
                if (n) {
                    n(b, y, a, u)
                };
                if (o) {
                    for (l = g(y, h), o(l, [], a, u), c = l.length; c--; ) {
                        if (p = l[c]) {
                            y[h[c]] = !(b[h[c]] = p)
                        };
                    }
                }
                if (r) {
                    if (i || e) {
                        if (i) {
                            for (l = [], c = y.length; c--; ) {
                                if (p = y[c]) {
                                    l.push(b[c] = p)
                                };
                            }
                            i(null, y = [], l, u);
                        }
                        for (c = y.length; c--; ) {
                            if ((p = y[c]) && (l = i ? ee(r, p) : d[c]) > -1) {
                                r[l] = !(s[l] = p)
                            };
                        }
                    }
                } else {
                    y = g(y === s ? y.splice(f, y.length) : y);
                    i ? i(null, s, y, u) : Q.apply(s, y);
                }
            });
        }
        function b(e) {
            for (var t, n, r, o = e.length, i = k.relative[e[0].type], s = i || k.relative[" "], a = i ? 1 : 0, u = h(function(e) {
                return e === t;
            }, s, !0), l = h(function(e) {
                return ee(t, e) > -1;
            }, s, !0), c = [ function(e, n, r) {
                var o = !i && (r || n !== D) || ((t = n).nodeType ? u(e, n, r) : l(e, n, r));
                t = null;
                return o;
            } ]; o > a; a++) {
                if (n = k.relative[e[a].type]) {
                    c = [ h(f(c), n) ];
                } else {
                    n = k.filter[e[a].type].apply(null, e[a].matches);
                    if (n[j]) {
                        for (r = ++a; o > r && !k.relative[e[r].type]; r++) {
                        }
                        return v(a > 1 && f(c), a > 1 && d(e.slice(0, a - 1).concat({
                            value: e[a - 2].type === " " ? "*" : ""
                        })).replace(ue, "$1"), n, r > a && b(e.slice(a, r)), o > r && b(e = e.slice(r)), o > r && d(e));
                    }
                    c.push(n);
                }
            }
            return f(c);
        }
        function y(e, n) {
            var o = n.length > 0, i = e.length > 0, s = function(r, s, a, u, l) {
                var c, p, d, h = 0, f = "0", m = r && [], v = [], b = D, y = r || i && k.find.TAG("*", l), _ = U += b == null ? 1 : Math.random() || .1, w = y.length;
                for (l && (D = s !== N && s); f !== w && (c = y[f]) != null; f++) {
                    if (i && c) {
                        for (p = 0; d = e[p++]; ) {
                            if (d(c, s, a)) {
                                u.push(c);
                                break;
                            }
                        }
                        if (l) {
                            U = _
                        };
                    }
                    if (o) {
                        (c = !d && c) && h--, r && m.push(c)
                    };
                }
                h += f;
                if (o && f !== h) {
                    for (p = 0; d = n[p++]; ) {
                        d(m, v, s, a);
                    }
                    if (r) {
                        if (h > 0) {
                            for (;f--; ) {
                                m[f] || v[f] || (v[f] = Z.call(u));
                            }
                        }
                        v = g(v);
                    }
                    Q.apply(u, v);
                    if (l && !r && v.length > 0 && h + n.length > 1) {
                        t.uniqueSort(u)
                    };
                }
                if (l) {
                    U = _, D = b
                };
                return m;
            };
            if (o) {
                return r(s);
            }
            return s;
        }
        var _, w, k, x, C, E, T, S, D, A, M, F, N, O, I, P, L, R, B, j = "sizzle" + 1 * new Date(), $ = e.document, U = 0, V = 0, H = n(), z = n(), q = n(), W = function(e, t) {
            if (e === t) {
                M = !0
            };
            return 0;
        }, G = 1 << 31, Y = {}.hasOwnProperty, K = [], Z = K.pop, J = K.push, Q = K.push, X = K.slice, ee = function(e, t) {
            for (var n = 0, r = e.length; r > n; n++) {
                if (e[n] === t) {
                    return n;
                }
            }
            return -1;
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", oe = re.replace("w", "w#"), ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ne + "*\\]", se = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+", "g"), ue = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), le = new RegExp("^" + ne + "*," + ne + "*"), ce = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), pe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), de = new RegExp(se), he = new RegExp("^" + oe + "$"), fe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + ie),
            PSEUDO: new RegExp("^" + se),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        }, me = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, ve = /^[^{]+\{\s*\[native \w/, be = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, _e = /'|\\/g, we = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), ke = function(e, t, n) {
            var r = "0x" + t - 65536;
            if (r !== r || n) {
                return t;
            }
            if (r < 0) {
                return String.fromCharCode(r + 65536);
            }
            return String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320);
        }, xe = function() {
            F();
        };
        try {
            Q.apply(K = X.call($.childNodes), $.childNodes);
            K[$.childNodes.length].nodeType;
        } catch (Ce) {
            Q = {
                apply: K.length ? function(e, t) {
                    J.apply(e, X.call(t));
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++]; ) ;
                    e.length = n - 1;
                }
            };
        }
        w = t.support = {};
        C = t.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            if (t) {
                return "HTML" !== t.nodeName;
            }
            return !1;
        };
        F = t.setDocument = function(e) {
            var t, n, r = e ? e.ownerDocument || e : $;
            if (r !== N && r.nodeType === 9 && r.documentElement) {
                N = r;
                O = r.documentElement;
                n = r.defaultView;
                if (n && n !== n.top) {
                    n.addEventListener ? n.addEventListener("unload", xe, !1) : n.attachEvent && n.attachEvent("onunload", xe)
                };
                I = !C(r);
                w.attributes = o(function(e) {
                    e.className = "i";
                    return !e.getAttribute("className");
                });
                w.getElementsByTagName = o(function(e) {
                    e.appendChild(r.createComment(""));
                    return !e.getElementsByTagName("*").length;
                });
                w.getElementsByClassName = ve.test(r.getElementsByClassName);
                w.getById = o(function(e) {
                    O.appendChild(e).id = j;
                    return !r.getElementsByName || !r.getElementsByName(j).length;
                });
                w.getById ? (k.find.ID = function(e, t) {
                    if (typeof t.getElementById != "undefined" && I) {
                        var n = t.getElementById(e);
                        if (n && n.parentNode) {
                            return [ n ];
                        }
                        return [];
                    }
                }, k.filter.ID = function(e) {
                    var t = e.replace(we, ke);
                    return function(e) {
                        return e.getAttribute("id") === t;
                    };
                }) : (delete k.find.ID, k.filter.ID = function(e) {
                    var t = e.replace(we, ke);
                    return function(e) {
                        var n = typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id");
                        return n && n.value === t;
                    };
                });
                k.find.TAG = w.getElementsByTagName ? function(e, t) {
                    if (typeof t.getElementsByTagName != "undefined") {
                        return t.getElementsByTagName(e);
                    }
                    if (w.qsa) {
                        return t.querySelectorAll(e);
                    }
                    return;
                } : function(e, t) {
                    var n, r = [], o = 0, i = t.getElementsByTagName(e);
                    if (e === "*") {
                        for (;n = i[o++]; ) {
                            if (n.nodeType === 1) {
                                r.push(n)
                            };
                        }
                        return r;
                    }
                    return i;
                };
                k.find.CLASS = w.getElementsByClassName && function(e, t) {
                    if (I) {
                        return t.getElementsByClassName(e);
                    }
                    return;
                };
                L = [];
                P = [];
                if (w.qsa = ve.test(r.querySelectorAll)) {
                    o(function(e) {
                        O.appendChild(e).innerHTML = "<a id='" + j + "'></a><select id='" + j + "-\f]' msallowcapture=''><option selected=''></option></select>";
                        if (e.querySelectorAll("[msallowcapture^='']").length) {
                            P.push("[*^$]=" + ne + "*(?:''|\"\")")
                        };
                        e.querySelectorAll("[selected]").length || P.push("\\[" + ne + "*(?:value|" + te + ")");
                        e.querySelectorAll("[id~=" + j + "-]").length || P.push("~=");
                        e.querySelectorAll(":checked").length || P.push(":checked");
                        e.querySelectorAll("a#" + j + "+*").length || P.push(".#.+[+~]");
                    }), o(function(e) {
                        var t = r.createElement("input");
                        t.setAttribute("type", "hidden");
                        e.appendChild(t).setAttribute("name", "D");
                        if (e.querySelectorAll("[name=d]").length) {
                            P.push("name" + ne + "*[*^$|!~]?=")
                        };
                        e.querySelectorAll(":enabled").length || P.push(":enabled", ":disabled");
                        e.querySelectorAll("*,:x");
                        P.push(",.*:");
                    })
                };
                if (w.matchesSelector = ve.test(R = O.matches || O.webkitMatchesSelector || O.mozMatchesSelector || O.oMatchesSelector || O.msMatchesSelector)) {
                    o(function(e) {
                        w.disconnectedMatch = R.call(e, "div");
                        R.call(e, "[s!='']:x");
                        L.push("!=", se);
                    })
                };
                P = P.length && new RegExp(P.join("|"));
                L = L.length && new RegExp(L.join("|"));
                t = ve.test(O.compareDocumentPosition);
                B = t || ve.test(O.contains) ? function(e, t) {
                    var n = e.nodeType === 9 ? e.documentElement : e, r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)));
                } : function(e, t) {
                    if (t) {
                        for (;t = t.parentNode; ) {
                            if (t === e) {
                                return !0;
                            }
                        }
                    }
                    return !1;
                };
                W = t ? function(e, t) {
                    if (e === t) {
                        M = !0;
                        return 0;
                    }
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    if (n) {
                        return n;
                    }
                    n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1;
                    if (1 & n || !w.sortDetached && t.compareDocumentPosition(e) === n) {
                        if (e === r || e.ownerDocument === $ && B($, e)) {
                            return -1;
                        }
                        if (t === r || t.ownerDocument === $ && B($, t)) {
                            return 1;
                        }
                        if (A) {
                            return ee(A, e) - ee(A, t);
                        }
                        return 0;
                    }
                    if (4 & n) {
                        return -1;
                    }
                    return 1;
                } : function(e, t) {
                    if (e === t) {
                        M = !0;
                        return 0;
                    }
                    var n, o = 0, i = e.parentNode, a = t.parentNode, u = [ e ], l = [ t ];
                    if (!i || !a) {
                        if (e === r) {
                            return -1;
                        }
                        if (t === r) {
                            return 1;
                        }
                        if (i) {
                            return -1;
                        }
                        if (a) {
                            return 1;
                        }
                        if (A) {
                            return ee(A, e) - ee(A, t);
                        }
                        return 0;
                    }
                    if (i === a) {
                        return s(e, t);
                    }
                    for (n = e; n = n.parentNode; ) {
                        u.unshift(n);
                    }
                    for (n = t; n = n.parentNode; ) {
                        l.unshift(n);
                    }
                    for (;u[o] === l[o]; ) {
                        o++;
                    }
                    if (o) {
                        return s(u[o], l[o]);
                    }
                    if (u[o] === $) {
                        return -1;
                    }
                    if (l[o] === $) {
                        return 1;
                    }
                    return 0;
                };
                return r;
            }
            return N;
        };
        t.matches = function(e, n) {
            return t(e, null, null, n);
        };
        t.matchesSelector = function(e, n) {
            if ((e.ownerDocument || e) !== N) {
                F(e)
            };
            n = n.replace(pe, "='$1']");
            if (w.matchesSelector && I && (!L || !L.test(n)) && (!P || !P.test(n))) {
                try {
                    var r = R.call(e, n);
                    if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType) {
                        return r;
                    }
                } catch (o) {}
            }
            return t(n, N, null, [ e ]).length > 0;
        };
        t.contains = function(e, t) {
            if ((e.ownerDocument || e) !== N) {
                F(e)
            };
            return B(e, t);
        };
        t.attr = function(e, t) {
            if ((e.ownerDocument || e) !== N) {
                F(e)
            };
            var n = k.attrHandle[t.toLowerCase()], r = n && Y.call(k.attrHandle, t.toLowerCase()) ? n(e, t, !I) : void 0;
            if (void 0 !== r) {
                return r;
            }
            if (w.attributes || !I) {
                return e.getAttribute(t);
            }
            if ((r = e.getAttributeNode(t)) && r.specified) {
                return r.value;
            }
            return null;
        };
        t.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        };
        t.uniqueSort = function(e) {
            var t, n = [], r = 0, o = 0;
            M = !w.detectDuplicates;
            A = !w.sortStable && e.slice(0);
            e.sort(W);
            if (M) {
                for (;t = e[o++]; ) {
                    if (t === e[o]) {
                        r = n.push(o)
                    };
                }
                for (;r--; ) {
                    e.splice(n[r], 1);
                }
            }
            A = null;
            return e;
        };
        x = t.getText = function(e) {
            var t, n = "", r = 0, o = e.nodeType;
            if (o) {
                if (o === 1 || o === 9 || o === 11) {
                    if (typeof e.textContent == "string") {
                        return e.textContent;
                    }
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        n += x(e);
                    }
                } else if (o === 3 || o === 4) {
                    return e.nodeValue;
                }
            } else for (;t = e[r++]; ) {
                n += x(t);
            }
            return n;
        };
        k = t.selectors = {
            cacheLength: 50,
            createPseudo: r,
            match: fe,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    e[1] = e[1].replace(we, ke);
                    e[3] = (e[3] || e[4] || e[5] || "").replace(we, ke);
                    if (e[2] === "~=") {
                        e[3] = " " + e[3] + " "
                    };
                    return e.slice(0, 4);
                },
                CHILD: function(e) {
                    e[1] = e[1].toLowerCase();
                    e[1].slice(0, 3) === "nth" ? (e[3] || t.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === "even" || e[3] === "odd")), 
                    e[5] = +(e[7] + e[8] || e[3] === "odd")) : e[3] && t.error(e[0]);
                    return e;
                },
                PSEUDO: function(e) {
                    var t, n = !e[6] && e[2];
                    if (fe.CHILD.test(e[0])) {
                        return null;
                    }
                    e[3] ? e[2] = e[4] || e[5] || "" : n && de.test(n) && (t = E(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), 
                    e[2] = n.slice(0, t));
                    return e.slice(0, 3);
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(we, ke).toLowerCase();
                    if (e === "*") {
                        return function() {
                            return !0;
                        };
                    }
                    return function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t;
                    };
                },
                CLASS: function(e) {
                    var t = H[e + " "];
                    return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && H(e, function(e) {
                        return t.test(typeof e.className == "string" && e.className || typeof e.getAttribute != "undefined" && e.getAttribute("class") || "");
                    });
                },
                ATTR: function(e, n, r) {
                    return function(o) {
                        var i = t.attr(o, e);
                        if (i == null) {
                            return n === "!=";
                        }
                        if (n) {
                            i += "";
                            if (n === "=") {
                                return i === r;
                            }
                            if (n === "!=") {
                                return i !== r;
                            }
                            if (n === "^=") {
                                return r && i.indexOf(r) === 0;
                            }
                            if (n === "*=") {
                                return r && i.indexOf(r) > -1;
                            }
                            if (n === "$=") {
                                return r && i.slice(-r.length) === r;
                            }
                            if (n === "~=") {
                                return (" " + i.replace(ae, " ") + " ").indexOf(r) > -1;
                            }
                            if (n === "|=") {
                                return i === r || i.slice(0, r.length + 1) === r + "-";
                            }
                            return !1;
                        }
                        return !0;
                    };
                },
                CHILD: function(e, t, n, r, o) {
                    var i = "nth" !== e.slice(0, 3), s = "last" !== e.slice(-4), a = t === "of-type";
                    if (r === 1 && o === 0) {
                        return function(e) {
                            return !!e.parentNode;
                        };
                    }
                    return function(t, n, u) {
                        var l, c, p, d, h, f, m = i !== s ? "nextSibling" : "previousSibling", g = t.parentNode, v = a && t.nodeName.toLowerCase(), b = !u && !a;
                        if (g) {
                            if (i) {
                                for (;m; ) {
                                    for (p = t; p = p[m]; ) {
                                        if (a ? p.nodeName.toLowerCase() === v : p.nodeType === 1) {
                                            return !1;
                                        }
                                    }
                                    f = m = e === "only" && !f && "nextSibling";
                                }
                                return !0;
                            }
                            f = [ s ? g.firstChild : g.lastChild ];
                            if (s && b) {
                                for (c = g[j] || (g[j] = {}), l = c[e] || [], h = l[0] === U && l[1], d = l[0] === U && l[2], 
                                p = h && g.childNodes[h]; p = ++h && p && p[m] || (d = h = 0) || f.pop(); ) {
                                    if (p.nodeType === 1 && ++d && p === t) {
                                        c[e] = [ U, h, d ];
                                        break;
                                    }
                                }
                            } else if (b && (l = (t[j] || (t[j] = {}))[e]) && l[0] === U) {
                                d = l[1];
                            } else for (;(p = ++h && p && p[m] || (d = h = 0) || f.pop()) && ((a ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++d || (b && ((p[j] || (p[j] = {}))[e] = [ U, d ]), 
                            p !== t)); ) {
                            }
                            d -= o;
                            return d === r || d % r === 0 && d / r >= 0;
                        }
                    };
                },
                PSEUDO: function(e, n) {
                    var o, i = k.pseudos[e] || k.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                    if (i[j]) {
                        return i(n);
                    }
                    if (i.length > 1) {
                        o = [ e, e, "", n ];
                        if (k.setFilters.hasOwnProperty(e.toLowerCase())) {
                            return r(function(e, t) {
                                for (var r, o = i(e, n), s = o.length; s--; ) {
                                    r = ee(e, o[s]);
                                    e[r] = !(t[r] = o[s]);
                                }
                            });
                        }
                        return function(e) {
                            return i(e, 0, o);
                        };
                    }
                    return i;
                }
            },
            pseudos: {
                not: r(function(e) {
                    var t = [], n = [], o = T(e.replace(ue, "$1"));
                    if (o[j]) {
                        return r(function(e, t, n, r) {
                            for (var i, s = o(e, null, r, []), a = e.length; a--; ) {
                                if (i = s[a]) {
                                    e[a] = !(t[a] = i)
                                };
                            }
                        });
                    }
                    return function(e, r, i) {
                        t[0] = e;
                        o(t, null, i, n);
                        t[0] = null;
                        return !n.pop();
                    };
                }),
                has: r(function(e) {
                    return function(n) {
                        return t(e, n).length > 0;
                    };
                }),
                contains: r(function(e) {
                    e = e.replace(we, ke);
                    return function(t) {
                        return (t.textContent || t.innerText || x(t)).indexOf(e) > -1;
                    };
                }),
                lang: r(function(e) {
                    he.test(e || "") || t.error("unsupported lang: " + e);
                    e = e.replace(we, ke).toLowerCase();
                    return function(t) {
                        var n;
                        do {
                            if (n = I ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang")) {
                                n = n.toLowerCase();
                                return n === e || n.indexOf(e + "-") === 0;
                            }
                        } while ((t = t.parentNode) && t.nodeType === 1);
                        return !1;
                    };
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id;
                },
                root: function(e) {
                    return e === O;
                },
                focus: function(e) {
                    return e === N.activeElement && (!N.hasFocus || N.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                },
                enabled: function(e) {
                    return e.disabled === !1;
                },
                disabled: function(e) {
                    return e.disabled === !0;
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && !!e.checked || t === "option" && !!e.selected;
                },
                selected: function(e) {
                    if (e.parentNode) {
                        e.parentNode.selectedIndex
                    };
                    return e.selected === !0;
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) {
                        if (e.nodeType < 6) {
                            return !1;
                        }
                    }
                    return !0;
                },
                parent: function(e) {
                    return !k.pseudos.empty(e);
                },
                header: function(e) {
                    return ge.test(e.nodeName);
                },
                input: function(e) {
                    return me.test(e.nodeName);
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return t === "input" && e.type === "button" || t === "button";
                },
                text: function(e) {
                    var t;
                    return e.nodeName.toLowerCase() === "input" && e.type === "text" && ((t = e.getAttribute("type")) == null || t.toLowerCase() === "text");
                },
                first: l(function() {
                    return [ 0 ];
                }),
                last: l(function(e, t) {
                    return [ t - 1 ];
                }),
                eq: l(function(e, t, n) {
                    return [ n < 0 ? n + t : n ];
                }),
                even: l(function(e, t) {
                    for (var n = 0; t > n; n += 2) {
                        e.push(n);
                    }
                    return e;
                }),
                odd: l(function(e, t) {
                    for (var n = 1; t > n; n += 2) {
                        e.push(n);
                    }
                    return e;
                }),
                lt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; --r >= 0; ) {
                        e.push(r);
                    }
                    return e;
                }),
                gt: l(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t; ) {
                        e.push(r);
                    }
                    return e;
                })
            }
        };
        k.pseudos.nth = k.pseudos.eq;
        for (_ in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) {
            k.pseudos[_] = a(_);
        }
        for (_ in {
            submit: !0,
            reset: !0
        }) {
            k.pseudos[_] = u(_);
        }
        p.prototype = k.filters = k.pseudos;
        k.setFilters = new p();
        E = t.tokenize = function(e, n) {
            var r, o, i, s, a, u, l, c = z[e + " "];
            if (c) {
                if (n) {
                    return 0;
                }
                return c.slice(0);
            }
            for (a = e, u = [], l = k.preFilter; a; ) {
                if (!r || (o = le.exec(a))) {
                    o && (a = a.slice(o[0].length) || a), u.push(i = [])
                };
                r = !1;
                if (o = ce.exec(a)) {
                    r = o.shift(), i.push({
                        value: r,
                        type: o[0].replace(ue, " ")
                    }), a = a.slice(r.length)
                };
                for (s in k.filter) {
                    !(o = fe[s].exec(a)) || l[s] && !(o = l[s](o)) || (r = o.shift(), i.push({
                        value: r,
                        type: s,
                        matches: o
                    }), a = a.slice(r.length));
                }
                if (!r) {
                    break;
                }
            }
            if (n) {
                return a.length;
            }
            if (a) {
                return t.error(e);
            }
            return z(e, u).slice(0);
        };
        T = t.compile = function(e, t) {
            var n, r = [], o = [], i = q[e + " "];
            if (!i) {
                for (t || (t = E(e)), n = t.length; n--; ) {
                    i = b(t[n]);
                    i[j] ? r.push(i) : o.push(i);
                }
                i = q(e, y(o, r));
                i.selector = e;
            }
            return i;
        };
        S = t.select = function(e, t, n, r) {
            var o, i, s, a, u, l = typeof e == "function" && e, p = !r && E(e = l.selector || e);
            n = n || [];
            if (p.length === 1) {
                i = p[0] = p[0].slice(0);
                if (i.length > 2 && (s = i[0]).type === "ID" && w.getById && t.nodeType === 9 && I && k.relative[i[1].type]) {
                    t = (k.find.ID(s.matches[0].replace(we, ke), t) || [])[0];
                    if (!t) {
                        return n;
                    }
                    if (l) {
                        t = t.parentNode
                    };
                    e = e.slice(i.shift().value.length);
                }
                for (o = fe.needsContext.test(e) ? 0 : i.length; o-- && (s = i[o], !k.relative[a = s.type]); ) {
                    if ((u = k.find[a]) && (r = u(s.matches[0].replace(we, ke), ye.test(i[0].type) && c(t.parentNode) || t))) {
                        i.splice(o, 1);
                        e = r.length && d(i);
                        if (!e) {
                            Q.apply(n, r);
                            return n;
                        }
                        break;
                    }
                }
            }
            (l || T(e, p))(r, t, !I, n, ye.test(e) && c(t.parentNode) || t);
            return n;
        };
        w.sortStable = j.split("").sort(W).join("") === j;
        w.detectDuplicates = !!M;
        F();
        w.sortDetached = o(function(e) {
            return 1 & e.compareDocumentPosition(N.createElement("div"));
        });
        o(function(e) {
            e.innerHTML = "<a href='#'></a>";
            return e.firstChild.getAttribute("href") === "#";
        }) || i("type|href|height|width", function(e, t, n) {
            if (n) {
                return void 0;
            }
            return e.getAttribute(t, t.toLowerCase() === "type" ? 1 : 2);
        });
        w.attributes && o(function(e) {
            e.innerHTML = "<input/>";
            e.firstChild.setAttribute("value", "");
            return e.firstChild.getAttribute("value") === "";
        }) || i("value", function(e, t, n) {
            if (n || "input" !== e.nodeName.toLowerCase()) {
                return void 0;
            }
            return e.defaultValue;
        });
        o(function(e) {
            return e.getAttribute("disabled") == null;
        }) || i(te, function(e, t, n) {
            var r;
            if (n) {
                return void 0;
            }
            if (e[t] === !0) {
                return t.toLowerCase();
            }
            if ((r = e.getAttributeNode(t)) && r.specified) {
                return r.value;
            }
            return null;
        });
        return t;
    }(e);
    X.find = oe;
    X.expr = oe.selectors;
    X.expr[":"] = X.expr.pseudos;
    X.unique = oe.uniqueSort;
    X.text = oe.getText;
    X.isXMLDoc = oe.isXML;
    X.contains = oe.contains;
    var ie = X.expr.match.needsContext, se = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, ae = /^.[^:#\[\.,]*$/;
    X.filter = function(e, t, n) {
        var r = t[0];
        if (n) {
            e = ":not(" + e + ")"
        };
        if (t.length === 1 && r.nodeType === 1) {
            if (X.find.matchesSelector(r, e)) {
                return [ r ];
            }
            return [];
        }
        return X.find.matches(e, X.grep(t, function(e) {
            return e.nodeType === 1;
        }));
    };
    X.fn.extend({
        find: function(e) {
            var t, n = this.length, r = [], o = this;
            if (typeof e != "string") {
                return this.pushStack(X(e).filter(function() {
                    for (t = 0; n > t; t++) {
                        if (X.contains(o[t], this)) {
                            return !0;
                        }
                    }
                }));
            }
            for (t = 0; n > t; t++) {
                X.find(e, o[t], r);
            }
            r = this.pushStack(n > 1 ? X.unique(r) : r);
            r.selector = this.selector ? this.selector + " " + e : e;
            return r;
        },
        filter: function(e) {
            return this.pushStack(r(this, e || [], !1));
        },
        not: function(e) {
            return this.pushStack(r(this, e || [], !0));
        },
        is: function(e) {
            return !!r(this, typeof e == "string" && ie.test(e) ? X(e) : e || [], !1).length;
        }
    });
    var ue, le = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ce = X.fn.init = function(e, t) {
        var n, r;
        if (!e) {
            return this;
        }
        if (typeof e == "string") {
            n = e[0] === "<" && e[e.length - 1] === ">" && e.length >= 3 ? [ null, e, null ] : le.exec(e);
            if (!n || !n[1] && t) {
                if (!t || t.jquery) {
                    return (t || ue).find(e);
                }
                return this.constructor(t).find(e);
            }
            if (n[1]) {
                t = t instanceof X ? t[0] : t;
                X.merge(this, X.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : J, !0));
                if (se.test(n[1]) && X.isPlainObject(t)) {
                    for (n in t) {
                        X.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    }
                }
                return this;
            }
            r = J.getElementById(n[2]);
            if (r && r.parentNode) {
                this.length = 1, this[0] = r
            };
            this.context = J;
            this.selector = e;
            return this;
        }
        if (e.nodeType) {
            this.context = this[0] = e;
            this.length = 1;
            return this;
        }
        if (X.isFunction(e)) {
            if (typeof ue.ready != "undefined") {
                return ue.ready(e);
            }
            return e(X);
        }
        if (void 0 !== e.selector) {
            this.selector = e.selector, this.context = e.context
        };
        return X.makeArray(e, this);
    };
    ce.prototype = X.fn;
    ue = X(J);
    var pe = /^(?:parents|prev(?:Until|All))/, de = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    X.extend({
        dir: function(e, t, n) {
            for (var r = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; ) {
                if (e.nodeType === 1) {
                    if (o && X(e).is(n)) {
                        break;
                    }
                    r.push(e);
                }
            }
            return r;
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) {
                if (e.nodeType === 1 && e !== t) {
                    n.push(e)
                };
            }
            return n;
        }
    });
    X.fn.extend({
        has: function(e) {
            var t = X(e, this), n = t.length;
            return this.filter(function() {
                for (var e = 0; n > e; e++) {
                    if (X.contains(this, t[e])) {
                        return !0;
                    }
                }
            });
        },
        closest: function(e, t) {
            for (var n, r = 0, o = this.length, i = [], s = ie.test(e) || typeof e != "string" ? X(e, t || this.context) : 0; o > r; r++) {
                for (n = this[r]; n && n !== t; n = n.parentNode) {
                    if (n.nodeType < 11 && (s ? s.index(n) > -1 : n.nodeType === 1 && X.find.matchesSelector(n, e))) {
                        i.push(n);
                        break;
                    }
                }
            }
            return this.pushStack(i.length > 1 ? X.unique(i) : i);
        },
        index: function(e) {
            if (e) {
                if (typeof e == "string") {
                    return W.call(X(e), this[0]);
                }
                return W.call(this, e.jquery ? e[0] : e);
            }
            if (this[0] && this[0].parentNode) {
                return this.first().prevAll().length;
            }
            return -1;
        },
        add: function(e, t) {
            return this.pushStack(X.unique(X.merge(this.get(), X(e, t))));
        },
        addBack: function(e) {
            return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
        }
    });
    X.each({
        parent: function(e) {
            var t = e.parentNode;
            if (t && 11 !== t.nodeType) {
                return t;
            }
            return null;
        },
        parents: function(e) {
            return X.dir(e, "parentNode");
        },
        parentsUntil: function(e, t, n) {
            return X.dir(e, "parentNode", n);
        },
        next: function(e) {
            return o(e, "nextSibling");
        },
        prev: function(e) {
            return o(e, "previousSibling");
        },
        nextAll: function(e) {
            return X.dir(e, "nextSibling");
        },
        prevAll: function(e) {
            return X.dir(e, "previousSibling");
        },
        nextUntil: function(e, t, n) {
            return X.dir(e, "nextSibling", n);
        },
        prevUntil: function(e, t, n) {
            return X.dir(e, "previousSibling", n);
        },
        siblings: function(e) {
            return X.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function(e) {
            return X.sibling(e.firstChild);
        },
        contents: function(e) {
            return e.contentDocument || X.merge([], e.childNodes);
        }
    }, function(e, t) {
        X.fn[e] = function(n, r) {
            var o = X.map(this, t, n);
            if ("Until" !== e.slice(-5)) {
                r = n
            };
            if (r && typeof r == "string") {
                o = X.filter(r, o)
            };
            if (this.length > 1) {
                de[e] || X.unique(o), pe.test(e) && o.reverse()
            };
            return this.pushStack(o);
        };
    });
    var he = /\S+/g, fe = {};
    X.Callbacks = function(e) {
        e = typeof e == "string" ? fe[e] || i(e) : X.extend({}, e);
        var t, n, r, o, s, a, u = [], l = !e.once && [], c = function(i) {
            for (t = e.memory && i, n = !0, a = o || 0, o = 0, s = u.length, r = !0; u && s > a; a++) {
                if (u[a].apply(i[0], i[1]) === !1 && e.stopOnFalse) {
                    t = !1;
                    break;
                }
            }
            r = !1;
            if (u) {
                l ? l.length && c(l.shift()) : t ? u = [] : p.disable()
            };
        }, p = {
            add: function() {
                if (u) {
                    var n = u.length;
                    !function i(t) {
                        X.each(t, function(t, n) {
                            var r = X.type(n);
                            r === "function" ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== r && i(n);
                        });
                    }(arguments);
                    r ? s = u.length : t && (o = n, c(t));
                }
                return this;
            },
            remove: function() {
                if (u) {
                    X.each(arguments, function(e, t) {
                        for (var n; (n = X.inArray(t, u, n)) > -1; ) {
                            u.splice(n, 1);
                            if (r) {
                                s >= n && s--, a >= n && a--
                            };
                        }
                    })
                };
                return this;
            },
            has: function(e) {
                if (e) {
                    return X.inArray(e, u) > -1;
                }
                return !(!u || !u.length);
            },
            empty: function() {
                u = [];
                s = 0;
                return this;
            },
            disable: function() {
                u = l = t = void 0;
                return this;
            },
            disabled: function() {
                return !u;
            },
            lock: function() {
                l = void 0;
                t || p.disable();
                return this;
            },
            locked: function() {
                return !l;
            },
            fireWith: function(e, t) {
                !u || n && !l || (t = t || [], t = [ e, t.slice ? t.slice() : t ], r ? l.push(t) : c(t));
                return this;
            },
            fire: function() {
                p.fireWith(this, arguments);
                return this;
            },
            fired: function() {
                return !!n;
            }
        };
        return p;
    };
    X.extend({
        Deferred: function(e) {
            var t = [ [ "resolve", "done", X.Callbacks("once memory"), "resolved" ], [ "reject", "fail", X.Callbacks("once memory"), "rejected" ], [ "notify", "progress", X.Callbacks("memory") ] ], n = "pending", r = {
                state: function() {
                    return n;
                },
                always: function() {
                    o.done(arguments).fail(arguments);
                    return this;
                },
                then: function() {
                    var e = arguments;
                    return X.Deferred(function(n) {
                        X.each(t, function(t, i) {
                            var s = X.isFunction(e[t]) && e[t];
                            o[i[1]](function() {
                                var e = s && s.apply(this, arguments);
                                e && X.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[i[0] + "With"](this === r ? n.promise() : this, s ? [ e ] : arguments);
                            });
                        });
                        e = null;
                    }).promise();
                },
                promise: function(e) {
                    if (e != null) {
                        return X.extend(e, r);
                    }
                    return r;
                }
            }, o = {};
            r.pipe = r.then;
            X.each(t, function(e, i) {
                var s = i[2], a = i[3];
                r[i[1]] = s.add;
                if (a) {
                    s.add(function() {
                        n = a;
                    }, t[1 ^ e][2].disable, t[2][2].lock)
                };
                o[i[0]] = function() {
                    o[i[0] + "With"](this === o ? r : this, arguments);
                    return this;
                };
                o[i[0] + "With"] = s.fireWith;
            });
            r.promise(o);
            if (e) {
                e.call(o, o)
            };
            return o;
        },
        when: function(e) {
            var t, n, r, o = 0, i = H.call(arguments), s = i.length, a = 1 !== s || e && X.isFunction(e.promise) ? s : 0, u = a === 1 ? e : X.Deferred(), l = function(e, n, r) {
                return function(o) {
                    n[e] = this;
                    r[e] = arguments.length > 1 ? H.call(arguments) : o;
                    r === t ? u.notifyWith(n, r) : --a || u.resolveWith(n, r);
                };
            };
            if (s > 1) {
                for (t = new Array(s), n = new Array(s), r = new Array(s); s > o; o++) {
                    i[o] && X.isFunction(i[o].promise) ? i[o].promise().done(l(o, r, i)).fail(u.reject).progress(l(o, n, t)) : --a;
                }
            }
            a || u.resolveWith(r, i);
            return u.promise();
        }
    });
    var me;
    X.fn.ready = function(e) {
        X.ready.promise().done(e);
        return this;
    };
    X.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? X.readyWait++ : X.ready(!0);
        },
        ready: function(e) {
            (e === !0 ? --X.readyWait : X.isReady) || (X.isReady = !0, e !== !0 && --X.readyWait > 0 || (me.resolveWith(J, [ X ]), 
            X.fn.triggerHandler && (X(J).triggerHandler("ready"), X(J).off("ready"))));
        }
    });
    X.ready.promise = function(t) {
        me || (me = X.Deferred(), J.readyState === "complete" ? setTimeout(X.ready) : (J.addEventListener("DOMContentLoaded", s, !1), 
        e.addEventListener("load", s, !1)));
        return me.promise(t);
    };
    X.ready.promise();
    var ge = X.access = function(e, t, n, r, o, i, s) {
        var a = 0, u = e.length, l = n == null;
        if (X.type(n) === "object") {
            o = !0;
            for (a in n) {
                X.access(e, t, a, n[a], !0, i, s);
            }
        } else if (void 0 !== r && (o = !0, X.isFunction(r) || (s = !0), l && (s ? (t.call(e, r), 
        t = null) : (l = t, t = function(e, t, n) {
            return l.call(X(e), n);
        })), t)) {
            for (;u > a; a++) {
                t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            }
        }
        if (o) {
            return e;
        }
        if (l) {
            return t.call(e);
        }
        if (u) {
            return t(e[0], n);
        }
        return i;
    };
    X.acceptData = function(e) {
        return e.nodeType === 1 || e.nodeType === 9 || !+e.nodeType;
    };
    a.uid = 1;
    a.accepts = X.acceptData;
    a.prototype = {
        key: function(e) {
            if (!a.accepts(e)) {
                return 0;
            }
            var t = {}, n = e[this.expando];
            if (!n) {
                n = a.uid++;
                try {
                    t[this.expando] = {
                        value: n
                    };
                    Object.defineProperties(e, t);
                } catch (r) {
                    t[this.expando] = n, X.extend(e, t);
                }
            }
            this.cache[n] || (this.cache[n] = {});
            return n;
        },
        set: function(e, t, n) {
            var r, o = this.key(e), i = this.cache[o];
            if (typeof t == "string") {
                i[t] = n;
            } else if (X.isEmptyObject(i)) {
                X.extend(this.cache[o], t);
            } else for (r in t) {
                i[r] = t[r];
            }
            return i;
        },
        get: function(e, t) {
            var n = this.cache[this.key(e)];
            if (t === void 0) {
                return n;
            }
            return n[t];
        },
        access: function(e, t, n) {
            var r;
            if (t === void 0 || t && typeof t == "string" && n === void 0) {
                r = this.get(e, t);
                if (void 0 !== r) {
                    return r;
                }
                return this.get(e, X.camelCase(t));
            }
            this.set(e, t, n);
            if (void 0 !== n) {
                return n;
            }
            return t;
        },
        remove: function(e, t) {
            var n, r, o, i = this.key(e), s = this.cache[i];
            if (t === void 0) {
                this.cache[i] = {};
            } else {
                X.isArray(t) ? r = t.concat(t.map(X.camelCase)) : (o = X.camelCase(t), t in s ? r = [ t, o ] : (r = o, 
                r = r in s ? [ r ] : r.match(he) || []));
                n = r.length;
                for (;n--; ) {
                    delete s[r[n]];
                }
            }
        },
        hasData: function(e) {
            return !X.isEmptyObject(this.cache[e[this.expando]] || {});
        },
        discard: function(e) {
            if (e[this.expando]) {
                delete this.cache[e[this.expando]]
            };
        }
    };
    var ve = new a(), be = new a(), ye = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, _e = /([A-Z])/g;
    X.extend({
        hasData: function(e) {
            return be.hasData(e) || ve.hasData(e);
        },
        data: function(e, t, n) {
            return be.access(e, t, n);
        },
        removeData: function(e, t) {
            be.remove(e, t);
        },
        _data: function(e, t, n) {
            return ve.access(e, t, n);
        },
        _removeData: function(e, t) {
            ve.remove(e, t);
        }
    });
    X.fn.extend({
        data: function(e, t) {
            var n, r, o, i = this[0], s = i && i.attributes;
            if (e === void 0) {
                if (this.length && (o = be.get(i), i.nodeType === 1 && !ve.get(i, "hasDataAttrs"))) {
                    for (n = s.length; n--; ) {
                        if (s[n]) {
                            r = s[n].name, r.indexOf("data-") === 0 && (r = X.camelCase(r.slice(5)), u(i, r, o[r]))
                        };
                    }
                    ve.set(i, "hasDataAttrs", !0);
                }
                return o;
            }
            if (typeof e == "object") {
                return this.each(function() {
                    be.set(this, e);
                });
            }
            return ge(this, function(t) {
                var n, r = X.camelCase(e);
                if (i && t === void 0) {
                    n = be.get(i, e);
                    if (void 0 !== n) {
                        return n;
                    }
                    n = be.get(i, r);
                    if (void 0 !== n) {
                        return n;
                    }
                    n = u(i, r, void 0);
                    if (void 0 !== n) {
                        return n;
                    }
                } else this.each(function() {
                    var n = be.get(this, r);
                    be.set(this, r, t);
                    if (-1 !== e.indexOf("-") && void 0 !== n) {
                        be.set(this, e, t)
                    };
                });
            }, null, t, arguments.length > 1, null, !0);
        },
        removeData: function(e) {
            return this.each(function() {
                be.remove(this, e);
            });
        }
    });
    X.extend({
        queue: function(e, t, n) {
            var r;
            if (e) {
                t = (t || "fx") + "queue";
                r = ve.get(e, t);
                if (n) {
                    !r || X.isArray(n) ? r = ve.access(e, t, X.makeArray(n)) : r.push(n)
                };
                return r || [];
            }
            return;
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = X.queue(e, t), r = n.length, o = n.shift(), i = X._queueHooks(e, t), s = function() {
                X.dequeue(e, t);
            };
            if (o === "inprogress") {
                o = n.shift(), r--
            };
            if (o) {
                t === "fx" && n.unshift("inprogress"), delete i.stop, o.call(e, s, i)
            };
            if (!r && i) {
                i.empty.fire()
            };
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return ve.get(e, n) || ve.access(e, n, {
                empty: X.Callbacks("once memory").add(function() {
                    ve.remove(e, [ t + "queue", n ]);
                })
            });
        }
    });
    X.fn.extend({
        queue: function(e, t) {
            var n = 2;
            if (typeof e != "string") {
                t = e, e = "fx", n--
            };
            if (arguments.length < n) {
                return X.queue(this[0], e);
            }
            if (t === void 0) {
                return this;
            }
            return this.each(function() {
                var n = X.queue(this, e, t);
                X._queueHooks(this, e);
                if (e === "fx" && "inprogress" !== n[0]) {
                    X.dequeue(this, e)
                };
            });
        },
        dequeue: function(e) {
            return this.each(function() {
                X.dequeue(this, e);
            });
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", []);
        },
        promise: function(e, t) {
            var n, r = 1, o = X.Deferred(), i = this, s = this.length, a = function() {
                --r || o.resolveWith(i, [ i ]);
            };
            for (typeof e != "string" && (t = e, e = void 0), e = e || "fx"; s--; ) {
                n = ve.get(i[s], e + "queueHooks");
                if (n && n.empty) {
                    r++, n.empty.add(a)
                };
            }
            a();
            return o.promise(t);
        }
    });
    var we = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, ke = [ "Top", "Right", "Bottom", "Left" ], xe = function(e, t) {
        e = t || e;
        return X.css(e, "display") === "none" || !X.contains(e.ownerDocument, e);
    }, Ce = /^(?:checkbox|radio)$/i;
    !function() {
        var e = J.createDocumentFragment(), t = e.appendChild(J.createElement("div")), n = J.createElement("input");
        n.setAttribute("type", "radio");
        n.setAttribute("checked", "checked");
        n.setAttribute("name", "t");
        t.appendChild(n);
        Z.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked;
        t.innerHTML = "<textarea>x</textarea>";
        Z.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue;
    }();
    var Ee = "undefined";
    Z.focusinBubbles = "onfocusin" in e;
    var Te = /^key/, Se = /^(?:mouse|pointer|contextmenu)|click/, De = /^(?:focusinfocus|focusoutblur)$/, Ae = /^([^.]*)(?:\.(.+)|)$/;
    X.event = {
        global: {},
        add: function(e, t, n, r, o) {
            var i, s, a, u, l, c, p, d, h, f, m, g = ve.get(e);
            if (g) {
                for (n.handler && (i = n, n = i.handler, o = i.selector), n.guid || (n.guid = X.guid++), 
                (u = g.events) || (u = g.events = {}), (s = g.handle) || (s = g.handle = function(t) {
                    if (typeof X !== Ee && X.event.triggered !== t.type) {
                        return X.event.dispatch.apply(e, arguments);
                    }
                    return;
                }), t = (t || "").match(he) || [ "" ], l = t.length; l--; ) {
                    a = Ae.exec(t[l]) || [];
                    h = m = a[1];
                    f = (a[2] || "").split(".").sort();
                    if (h) {
                        p = X.event.special[h] || {}, h = (o ? p.delegateType : p.bindType) || h, p = X.event.special[h] || {}, 
                        c = X.extend({
                            type: h,
                            origType: m,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: o,
                            needsContext: o && X.expr.match.needsContext.test(o),
                            namespace: f.join(".")
                        }, i), (d = u[h]) || (d = u[h] = [], d.delegateCount = 0, p.setup && p.setup.call(e, r, f, s) !== !1 || e.addEventListener && e.addEventListener(h, s, !1)), 
                        p.add && (p.add.call(e, c), c.handler.guid || (c.handler.guid = n.guid)), o ? d.splice(d.delegateCount++, 0, c) : d.push(c), 
                        X.event.global[h] = !0
                    };
                }
            }
        },
        remove: function(e, t, n, r, o) {
            var i, s, a, u, l, c, p, d, h, f, m, g = ve.hasData(e) && ve.get(e);
            if (g && (u = g.events)) {
                for (t = (t || "").match(he) || [ "" ], l = t.length; l--; ) {
                    a = Ae.exec(t[l]) || [];
                    h = m = a[1];
                    f = (a[2] || "").split(".").sort();
                    if (h) {
                        for (p = X.event.special[h] || {}, h = (r ? p.delegateType : p.bindType) || h, d = u[h] || [], 
                        a = a[2] && new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = i = d.length; i--; ) {
                            c = d[i];
                            !o && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(i, 1), 
                            c.selector && d.delegateCount--, p.remove && p.remove.call(e, c));
                        }
                        if (s && !d.length) {
                            p.teardown && p.teardown.call(e, f, g.handle) !== !1 || X.removeEvent(e, h, g.handle), 
                            delete u[h]
                        };
                    } else for (h in u) {
                        X.event.remove(e, h + t[l], n, r, !0);
                    }
                }
                if (X.isEmptyObject(u)) {
                    delete g.handle, ve.remove(e, "events")
                };
            }
        },
        trigger: function(t, n, r, o) {
            var i, s, a, u, l, c, p, d = [ r || J ], h = K.call(t, "type") ? t.type : t, f = K.call(t, "namespace") ? t.namespace.split(".") : [];
            s = a = r = r || J;
            if (3 !== r.nodeType && 8 !== r.nodeType && !De.test(h + X.event.triggered) && (h.indexOf(".") >= 0 && (f = h.split("."), 
            h = f.shift(), f.sort()), l = h.indexOf(":") < 0 && "on" + h, t = t[X.expando] ? t : new X.Event(h, typeof t == "object" && t), 
            t.isTrigger = o ? 2 : 3, t.namespace = f.join("."), t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, 
            t.result = void 0, t.target || (t.target = r), n = n == null ? [ t ] : X.makeArray(n, [ t ]), 
            p = X.event.special[h] || {}, o || !p.trigger || p.trigger.apply(r, n) !== !1)) {
                if (!o && !p.noBubble && !X.isWindow(r)) {
                    for (u = p.delegateType || h, De.test(u + h) || (s = s.parentNode); s; s = s.parentNode) {
                        d.push(s);
                        a = s;
                    }
                    if (a === (r.ownerDocument || J)) {
                        d.push(a.defaultView || a.parentWindow || e)
                    };
                }
                for (i = 0; (s = d[i++]) && !t.isPropagationStopped(); ) {
                    t.type = i > 1 ? u : p.bindType || h;
                    c = (ve.get(s, "events") || {})[t.type] && ve.get(s, "handle");
                    if (c) {
                        c.apply(s, n)
                    };
                    c = l && s[l];
                    if (c && c.apply && X.acceptData(s)) {
                        t.result = c.apply(s, n), t.result === !1 && t.preventDefault()
                    };
                }
                t.type = h;
                o || t.isDefaultPrevented() || p._default && p._default.apply(d.pop(), n) !== !1 || !X.acceptData(r) || l && X.isFunction(r[h]) && !X.isWindow(r) && (a = r[l], 
                a && (r[l] = null), X.event.triggered = h, r[h](), X.event.triggered = void 0, a && (r[l] = a));
                return t.result;
            }
        },
        dispatch: function(e) {
            e = X.event.fix(e);
            var t, n, r, o, i, s = [], a = H.call(arguments), u = (ve.get(this, "events") || {})[e.type] || [], l = X.event.special[e.type] || {};
            a[0] = e;
            e.delegateTarget = this;
            if (!l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                for (s = X.event.handlers.call(this, e, u), t = 0; (o = s[t++]) && !e.isPropagationStopped(); ) {
                    for (e.currentTarget = o.elem, n = 0; (i = o.handlers[n++]) && !e.isImmediatePropagationStopped(); ) {
                        if (!e.namespace_re || e.namespace_re.test(i.namespace)) {
                            e.handleObj = i, e.data = i.data, r = ((X.event.special[i.origType] || {}).handle || i.handler).apply(o.elem, a), 
                            void 0 !== r && (e.result = r) === !1 && (e.preventDefault(), e.stopPropagation())
                        };
                    }
                }
                if (l.postDispatch) {
                    l.postDispatch.call(this, e)
                };
                return e.result;
            }
        },
        handlers: function(e, t) {
            var n, r, o, i, s = [], a = t.delegateCount, u = e.target;
            if (a && u.nodeType && (!e.button || "click" !== e.type)) {
                for (;u !== this; u = u.parentNode || this) {
                    if (u.disabled !== !0 || "click" !== e.type) {
                        for (r = [], n = 0; a > n; n++) {
                            i = t[n];
                            o = i.selector + " ";
                            if (r[o] === void 0) {
                                r[o] = i.needsContext ? X(o, this).index(u) >= 0 : X.find(o, this, null, [ u ]).length
                            };
                            if (r[o]) {
                                r.push(i)
                            };
                        }
                        if (r.length) {
                            s.push({
                                elem: u,
                                handlers: r
                            })
                        };
                    }
                }
            }
            if (a < t.length) {
                s.push({
                    elem: this,
                    handlers: t.slice(a)
                })
            };
            return s;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                if (e.which == null) {
                    e.which = t.charCode != null ? t.charCode : t.keyCode
                };
                return e;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, t) {
                var n, r, o, i = t.button;
                if (e.pageX == null && t.clientX != null) {
                    n = e.target.ownerDocument || J, r = n.documentElement, o = n.body, e.pageX = t.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), 
                    e.pageY = t.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)
                };
                e.which || i === void 0 || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0);
                return e;
            }
        },
        fix: function(e) {
            if (e[X.expando]) {
                return e;
            }
            var t, n, r, o = e.type, i = e, s = this.fixHooks[o];
            for (s || (this.fixHooks[o] = s = Se.test(o) ? this.mouseHooks : Te.test(o) ? this.keyHooks : {}), 
            r = s.props ? this.props.concat(s.props) : this.props, e = new X.Event(i), t = r.length; t--; ) {
                n = r[t];
                e[n] = i[n];
            }
            e.target || (e.target = J);
            if (e.target.nodeType === 3) {
                e.target = e.target.parentNode
            };
            if (s.filter) {
                return s.filter(e, i);
            }
            return e;
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== p() && this.focus) {
                        this.focus();
                        return !1;
                    }
                    return;
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === p() && this.blur) {
                        this.blur();
                        return !1;
                    }
                    return;
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if (this.type === "checkbox" && this.click && X.nodeName(this, "input")) {
                        this.click();
                        return !1;
                    }
                    return;
                },
                _default: function(e) {
                    return X.nodeName(e.target, "a");
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    if (void 0 !== e.result && e.originalEvent) {
                        e.originalEvent.returnValue = e.result
                    };
                }
            }
        },
        simulate: function(e, t, n, r) {
            var o = X.extend(new X.Event(), n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? X.event.trigger(o, null, t) : X.event.dispatch.call(t, o);
            if (o.isDefaultPrevented()) {
                n.preventDefault()
            };
        }
    };
    X.removeEvent = function(e, t, n) {
        if (e.removeEventListener) {
            e.removeEventListener(t, n, !1)
        };
    };
    X.Event = function(e, t) {
        if (this instanceof X.Event) {
            e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === void 0 && e.returnValue === !1 ? l : c) : this.type = e;
            if (t) {
                X.extend(this, t)
            };
            this.timeStamp = e && e.timeStamp || X.now();
            return void (this[X.expando] = !0);
        }
        return new X.Event(e, t);
    };
    X.Event.prototype = {
        isDefaultPrevented: c,
        isPropagationStopped: c,
        isImmediatePropagationStopped: c,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = l;
            if (e && e.preventDefault) {
                e.preventDefault()
            };
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = l;
            if (e && e.stopPropagation) {
                e.stopPropagation()
            };
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = l;
            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation()
            };
            this.stopPropagation();
        }
    };
    X.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, t) {
        X.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n, r = this, o = e.relatedTarget, i = e.handleObj;
                if (!o || o !== r && !X.contains(r, o)) {
                    e.type = i.origType, n = i.handler.apply(this, arguments), e.type = t
                };
                return n;
            }
        };
    });
    Z.focusinBubbles || X.each({
        focus: "focusin",
        blur: "focusout"
    }, function(e, t) {
        var n = function(e) {
            X.event.simulate(t, e.target, X.event.fix(e), !0);
        };
        X.event.special[t] = {
            setup: function() {
                var r = this.ownerDocument || this, o = ve.access(r, t);
                o || r.addEventListener(e, n, !0);
                ve.access(r, t, (o || 0) + 1);
            },
            teardown: function() {
                var r = this.ownerDocument || this, o = ve.access(r, t) - 1;
                o ? ve.access(r, t, o) : (r.removeEventListener(e, n, !0), ve.remove(r, t));
            }
        };
    });
    X.fn.extend({
        on: function(e, t, n, r, o) {
            var i, s;
            if (typeof e == "object") {
                if (typeof t != "string") {
                    n = n || t, t = void 0
                };
                for (s in e) {
                    this.on(s, t, n, e[s], o);
                }
                return this;
            }
            n == null && r == null ? (r = t, n = t = void 0) : r == null && (typeof t == "string" ? (r = n, 
            n = void 0) : (r = n, n = t, t = void 0));
            if (r === !1) {
                r = c;
            } else if (!r) {
                return this;
            }
            if (o === 1) {
                i = r, r = function(e) {
                    X().off(e);
                    return i.apply(this, arguments);
                }, r.guid = i.guid || (i.guid = X.guid++)
            };
            return this.each(function() {
                X.event.add(this, e, r, n, t);
            });
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1);
        },
        off: function(e, t, n) {
            var r, o;
            if (e && e.preventDefault && e.handleObj) {
                r = e.handleObj;
                X(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler);
                return this;
            }
            if (typeof e == "object") {
                for (o in e) {
                    this.off(o, t, e[o]);
                }
                return this;
            }
            if (t === !1 || typeof t == "function") {
                n = t, t = void 0
            };
            if (n === !1) {
                n = c
            };
            return this.each(function() {
                X.event.remove(this, e, n, t);
            });
        },
        trigger: function(e, t) {
            return this.each(function() {
                X.event.trigger(e, t, this);
            });
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n) {
                return X.event.trigger(e, t, n, !0);
            }
            return;
        }
    });
    var Me = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Fe = /<([\w:]+)/, Ne = /<|&#?\w+;/, Oe = /<(?:script|style|link)/i, Ie = /checked\s*(?:[^=]|=\s*.checked.)/i, Pe = /^$|\/(?:java|ecma)script/i, Le = /^true\/(.*)/, Re = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Be = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        thead: [ 1, "<table>", "</table>" ],
        col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        _default: [ 0, "", "" ]
    };
    Be.optgroup = Be.option;
    Be.tbody = Be.tfoot = Be.colgroup = Be.caption = Be.thead;
    Be.th = Be.td;
    X.extend({
        clone: function(e, t, n) {
            var r, o, i, s, a = e.cloneNode(!0), u = X.contains(e.ownerDocument, e);
            if (!(Z.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || X.isXMLDoc(e))) {
                for (s = v(a), i = v(e), r = 0, o = i.length; o > r; r++) {
                    b(i[r], s[r]);
                }
            }
            if (t) {
                if (n) {
                    for (i = i || v(e), s = s || v(a), r = 0, o = i.length; o > r; r++) {
                        g(i[r], s[r]);
                    }
                } else g(e, a);
            }
            s = v(a, "script");
            if (s.length > 0) {
                m(s, !u && v(e, "script"))
            };
            return a;
        },
        buildFragment: function(e, t, n, r) {
            for (var o, i, s, a, u, l, c = t.createDocumentFragment(), p = [], d = 0, h = e.length; h > d; d++) {
                o = e[d];
                if (o || o === 0) {
                    if (X.type(o) === "object") {
                        X.merge(p, o.nodeType ? [ o ] : o);
                    } else if (Ne.test(o)) {
                        for (i = i || c.appendChild(t.createElement("div")), s = (Fe.exec(o) || [ "", "" ])[1].toLowerCase(), 
                        a = Be[s] || Be._default, i.innerHTML = a[1] + o.replace(Me, "<$1></$2>") + a[2], 
                        l = a[0]; l--; ) {
                            i = i.lastChild;
                        }
                        X.merge(p, i.childNodes);
                        i = c.firstChild;
                        i.textContent = "";
                    } else p.push(t.createTextNode(o));
                }
            }
            for (c.textContent = "", d = 0; o = p[d++]; ) {
                if ((!r || X.inArray(o, r) === -1) && (u = X.contains(o.ownerDocument, o), i = v(c.appendChild(o), "script"), 
                u && m(i), n)) {
                    for (l = 0; o = i[l++]; ) {
                        if (Pe.test(o.type || "")) {
                            n.push(o)
                        };
                    }
                }
            }
            return c;
        },
        cleanData: function(e) {
            for (var t, n, r, o, i = X.event.special, s = 0; void 0 !== (n = e[s]); s++) {
                if (X.acceptData(n) && (o = n[ve.expando], o && (t = ve.cache[o]))) {
                    if (t.events) {
                        for (r in t.events) {
                            i[r] ? X.event.remove(n, r) : X.removeEvent(n, r, t.handle);
                        }
                    }
                    if (ve.cache[o]) {
                        delete ve.cache[o]
                    };
                }
                delete be.cache[n[be.expando]];
            }
        }
    });
    X.fn.extend({
        text: function(e) {
            return ge(this, function(e) {
                if (e === void 0) {
                    return X.text(this);
                }
                return this.empty().each(function() {
                    if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                        this.textContent = e
                    };
                });
            }, null, e, arguments.length);
        },
        append: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = d(this, e);
                    t.appendChild(e);
                }
            });
        },
        prepend: function() {
            return this.domManip(arguments, function(e) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var t = d(this, e);
                    t.insertBefore(e, t.firstChild);
                }
            });
        },
        before: function() {
            return this.domManip(arguments, function(e) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(e, this)
                };
            });
        },
        after: function() {
            return this.domManip(arguments, function(e) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(e, this.nextSibling)
                };
            });
        },
        remove: function(e, t) {
            for (var n, r = e ? X.filter(e, this) : this, o = 0; (n = r[o]) != null; o++) {
                t || 1 !== n.nodeType || X.cleanData(v(n));
                if (n.parentNode) {
                    t && X.contains(n.ownerDocument, n) && m(v(n, "script")), n.parentNode.removeChild(n)
                };
            }
            return this;
        },
        empty: function() {
            for (var e, t = 0; (e = this[t]) != null; t++) {
                if (e.nodeType === 1) {
                    X.cleanData(v(e, !1)), e.textContent = ""
                };
            }
            return this;
        },
        clone: function(e, t) {
            e = e == null ? !1 : e;
            t = t == null ? e : t;
            return this.map(function() {
                return X.clone(this, e, t);
            });
        },
        html: function(e) {
            return ge(this, function(e) {
                var t = this[0] || {}, n = 0, r = this.length;
                if (e === void 0 && t.nodeType === 1) {
                    return t.innerHTML;
                }
                if (typeof e == "string" && !Oe.test(e) && !Be[(Fe.exec(e) || [ "", "" ])[1].toLowerCase()]) {
                    e = e.replace(Me, "<$1></$2>");
                    try {
                        for (;r > n; n++) {
                            t = this[n] || {};
                            if (t.nodeType === 1) {
                                X.cleanData(v(t, !1)), t.innerHTML = e
                            };
                        }
                        t = 0;
                    } catch (o) {}
                }
                if (t) {
                    this.empty().append(e)
                };
            }, null, e, arguments.length);
        },
        replaceWith: function() {
            var e = arguments[0];
            this.domManip(arguments, function(t) {
                e = this.parentNode;
                X.cleanData(v(this));
                if (e) {
                    e.replaceChild(t, this)
                };
            });
            if (e && (e.length || e.nodeType)) {
                return this;
            }
            return this.remove();
        },
        detach: function(e) {
            return this.remove(e, !0);
        },
        domManip: function(e, t) {
            e = z.apply([], e);
            var n, r, o, i, s, a, u = 0, l = this.length, c = this, p = l - 1, d = e[0], m = X.isFunction(d);
            if (m || l > 1 && typeof d == "string" && !Z.checkClone && Ie.test(d)) {
                return this.each(function(n) {
                    var r = c.eq(n);
                    if (m) {
                        e[0] = d.call(this, n, r.html())
                    };
                    r.domManip(e, t);
                });
            }
            if (l && (n = X.buildFragment(e, this[0].ownerDocument, !1, this), r = n.firstChild, 
            n.childNodes.length === 1 && (n = r), r)) {
                for (o = X.map(v(n, "script"), h), i = o.length; l > u; u++) {
                    s = n;
                    if (u !== p) {
                        s = X.clone(s, !0, !0), i && X.merge(o, v(s, "script"))
                    };
                    t.call(this[u], s, u);
                }
                if (i) {
                    for (a = o[o.length - 1].ownerDocument, X.map(o, f), u = 0; i > u; u++) {
                        s = o[u];
                        if (Pe.test(s.type || "") && !ve.access(s, "globalEval") && X.contains(a, s)) {
                            s.src ? X._evalUrl && X._evalUrl(s.src) : X.globalEval(s.textContent.replace(Re, ""))
                        };
                    }
                }
            }
            return this;
        }
    });
    X.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, t) {
        X.fn[e] = function(e) {
            for (var n, r = [], o = X(e), i = o.length - 1, s = 0; i >= s; s++) {
                n = s === i ? this : this.clone(!0);
                X(o[s])[t](n);
                q.apply(r, n.get());
            }
            return this.pushStack(r);
        };
    });
    var je, $e = {}, Ue = /^margin/, Ve = new RegExp("^(" + we + ")(?!px)[a-z%]+$", "i"), He = function(t) {
        if (t.ownerDocument.defaultView.opener) {
            return t.ownerDocument.defaultView.getComputedStyle(t, null);
        }
        return e.getComputedStyle(t, null);
    };
    !function() {
        function t() {
            s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute";
            s.innerHTML = "";
            o.appendChild(i);
            var t = e.getComputedStyle(s, null);
            n = "1%" !== t.top;
            r = t.width === "4px";
            o.removeChild(i);
        }
        var n, r, o = J.documentElement, i = J.createElement("div"), s = J.createElement("div");
        if (s.style) {
            s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", 
            Z.clearCloneStyle = s.style.backgroundClip === "content-box", i.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", 
            i.appendChild(s), e.getComputedStyle && X.extend(Z, {
                pixelPosition: function() {
                    t();
                    return n;
                },
                boxSizingReliable: function() {
                    if (r == null) {
                        t()
                    };
                    return r;
                },
                reliableMarginRight: function() {
                    var t, n = s.appendChild(J.createElement("div"));
                    n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                    n.style.marginRight = n.style.width = "0";
                    s.style.width = "1px";
                    o.appendChild(i);
                    t = !parseFloat(e.getComputedStyle(n, null).marginRight);
                    o.removeChild(i);
                    s.removeChild(n);
                    return t;
                }
            })
        };
    }();
    X.swap = function(e, t, n, r) {
        var o, i, s = {};
        for (i in t) {
            s[i] = e.style[i];
            e.style[i] = t[i];
        }
        o = n.apply(e, r || []);
        for (i in t) {
            e.style[i] = s[i];
        }
        return o;
    };
    var ze = /^(none|table(?!-c[ea]).+)/, qe = new RegExp("^(" + we + ")(.*)$", "i"), We = new RegExp("^([+-])=(" + we + ")", "i"), Ge = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, Ye = {
        letterSpacing: "0",
        fontWeight: "400"
    }, Ke = [ "Webkit", "O", "Moz", "ms" ];
    X.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = w(e, "opacity");
                        if (n === "") {
                            return "1";
                        }
                        return n;
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o, i, s, a = X.camelCase(t), u = e.style;
                t = X.cssProps[a] || (X.cssProps[a] = x(u, a));
                s = X.cssHooks[t] || X.cssHooks[a];
                if (n === void 0) {
                    if (s && "get" in s && void 0 !== (o = s.get(e, !1, r))) {
                        return o;
                    }
                    return u[t];
                }
                i = typeof n;
                if (i === "string" && (o = We.exec(n))) {
                    n = (o[1] + 1) * o[2] + parseFloat(X.css(e, t)), i = "number"
                };
                if (n != null && n === n) {
                    "number" !== i || X.cssNumber[a] || (n += "px"), Z.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (u[t] = "inherit"), 
                    s && "set" in s && (n = s.set(e, n, r)) === void 0 || (u[t] = n)
                };
                return void 0;
            }
        },
        css: function(e, t, n, r) {
            var o, i, s, a = X.camelCase(t);
            t = X.cssProps[a] || (X.cssProps[a] = x(e.style, a));
            s = X.cssHooks[t] || X.cssHooks[a];
            if (s && "get" in s) {
                o = s.get(e, !0, n)
            };
            if (o === void 0) {
                o = w(e, t, r)
            };
            if (o === "normal" && t in Ye) {
                o = Ye[t]
            };
            if (n === "" || n) {
                i = parseFloat(o);
                if (n === !0 || X.isNumeric(i)) {
                    return i || 0;
                }
                return o;
            }
            return o;
        }
    });
    X.each([ "height", "width" ], function(e, t) {
        X.cssHooks[t] = {
            get: function(e, n, r) {
                if (n) {
                    if (ze.test(X.css(e, "display")) && e.offsetWidth === 0) {
                        return X.swap(e, Ge, function() {
                            return T(e, t, r);
                        });
                    }
                    return T(e, t, r);
                }
                return;
            },
            set: function(e, n, r) {
                var o = r && He(e);
                return C(e, n, r ? E(e, t, r, X.css(e, "boxSizing", !1, o) === "border-box", o) : 0);
            }
        };
    });
    X.cssHooks.marginRight = k(Z.reliableMarginRight, function(e, t) {
        if (t) {
            return X.swap(e, {
                display: "inline-block"
            }, w, [ e, "marginRight" ]);
        }
        return;
    });
    X.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(e, t) {
        X.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, o = {}, i = typeof n == "string" ? n.split(" ") : [ n ]; r < 4; r++) {
                    o[e + ke[r] + t] = i[r] || i[r - 2] || i[0];
                }
                return o;
            }
        };
        Ue.test(e) || (X.cssHooks[e + t].set = C);
    });
    X.fn.extend({
        css: function(e, t) {
            return ge(this, function(e, t, n) {
                var r, o, i = {}, s = 0;
                if (X.isArray(t)) {
                    for (r = He(e), o = t.length; o > s; s++) {
                        i[t[s]] = X.css(e, t[s], !1, r);
                    }
                    return i;
                }
                if (void 0 !== n) {
                    return X.style(e, t, n);
                }
                return X.css(e, t);
            }, e, t, arguments.length > 1);
        },
        show: function() {
            return S(this, !0);
        },
        hide: function() {
            return S(this);
        },
        toggle: function(e) {
            if (typeof e == "boolean") {
                if (e) {
                    return this.show();
                }
                return this.hide();
            }
            return this.each(function() {
                xe(this) ? X(this).show() : X(this).hide();
            });
        }
    });
    X.Tween = D;
    D.prototype = {
        constructor: D,
        init: function(e, t, n, r, o, i) {
            this.elem = e;
            this.prop = n;
            this.easing = o || "swing";
            this.options = t;
            this.start = this.now = this.cur();
            this.end = r;
            this.unit = i || (X.cssNumber[n] ? "" : "px");
        },
        cur: function() {
            var e = D.propHooks[this.prop];
            if (e && e.get) {
                return e.get(this);
            }
            return D.propHooks._default.get(this);
        },
        run: function(e) {
            var t, n = D.propHooks[this.prop];
            this.options.duration ? this.pos = t = X.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e;
            this.now = (this.end - this.start) * t + this.start;
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this)
            };
            n && n.set ? n.set(this) : D.propHooks._default.set(this);
            return this;
        }
    };
    D.prototype.init.prototype = D.prototype;
    D.propHooks = {
        _default: {
            get: function(e) {
                var t;
                if (e.elem[e.prop] == null || e.elem.style && e.elem.style[e.prop] != null) {
                    t = X.css(e.elem, e.prop, "");
                    if (t && "auto" !== t) {
                        return t;
                    }
                    return 0;
                }
                return e.elem[e.prop];
            },
            set: function(e) {
                X.fx.step[e.prop] ? X.fx.step[e.prop](e) : e.elem.style && (e.elem.style[X.cssProps[e.prop]] != null || X.cssHooks[e.prop]) ? X.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
            }
        }
    };
    D.propHooks.scrollTop = D.propHooks.scrollLeft = {
        set: function(e) {
            if (e.elem.nodeType && e.elem.parentNode) {
                e.elem[e.prop] = e.now
            };
        }
    };
    X.easing = {
        linear: function(e) {
            return e;
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2;
        }
    };
    X.fx = D.prototype.init;
    X.fx.step = {};
    var Ze, Je, Qe = /^(?:toggle|show|hide)$/, Xe = new RegExp("^(?:([+-])=|)(" + we + ")([a-z%]*)$", "i"), et = /queueHooks$/, tt = [ N ], nt = {
        "*": [ function(e, t) {
            var n = this.createTween(e, t), r = n.cur(), o = Xe.exec(t), i = o && o[3] || (X.cssNumber[e] ? "" : "px"), s = (X.cssNumber[e] || "px" !== i && +r) && Xe.exec(X.css(n.elem, e)), a = 1, u = 20;
            if (s && s[3] !== i) {
                i = i || s[3];
                o = o || [];
                s = +r || 1;
                do {
                    a = a || ".5";
                    s /= a;
                    X.style(n.elem, e, s + i);
                } while (a !== (a = n.cur() / r) && 1 !== a && --u);
            }
            if (o) {
                s = n.start = +s || +r || 0, n.unit = i, n.end = o[1] ? s + (o[1] + 1) * o[2] : +o[2]
            };
            return n;
        } ]
    };
    X.Animation = X.extend(I, {
        tweener: function(e, t) {
            X.isFunction(e) ? (t = e, e = [ "*" ]) : e = e.split(" ");
            for (var n, r = 0, o = e.length; o > r; r++) {
                n = e[r];
                nt[n] = nt[n] || [];
                nt[n].unshift(t);
            }
        },
        prefilter: function(e, t) {
            t ? tt.unshift(e) : tt.push(e);
        }
    });
    X.speed = function(e, t, n) {
        var r = e && typeof e == "object" ? X.extend({}, e) : {
            complete: n || !n && t || X.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !X.isFunction(t) && t
        };
        r.duration = X.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in X.fx.speeds ? X.fx.speeds[r.duration] : X.fx.speeds._default;
        if (r.queue == null || r.queue === !0) {
            r.queue = "fx"
        };
        r.old = r.complete;
        r.complete = function() {
            if (X.isFunction(r.old)) {
                r.old.call(this)
            };
            if (r.queue) {
                X.dequeue(this, r.queue)
            };
        };
        return r;
    };
    X.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(xe).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r);
        },
        animate: function(e, t, n, r) {
            var o = X.isEmptyObject(e), i = X.speed(t, n, r), s = function() {
                var t = I(this, X.extend({}, e), i);
                if (o || ve.get(this, "finish")) {
                    t.stop(!0)
                };
            };
            s.finish = s;
            if (o || i.queue === !1) {
                return this.each(s);
            }
            return this.queue(i.queue, s);
        },
        stop: function(e, t, n) {
            var r = function(e) {
                var t = e.stop;
                delete e.stop;
                t(n);
            };
            if (typeof e != "string") {
                n = t, t = e, e = void 0
            };
            if (t && e !== !1) {
                this.queue(e || "fx", [])
            };
            return this.each(function() {
                var t = !0, o = e != null && e + "queueHooks", i = X.timers, s = ve.get(this);
                if (o) {
                    if (s[o] && s[o].stop) {
                        r(s[o])
                    };
                } else for (o in s) {
                    if (s[o] && s[o].stop && et.test(o)) {
                        r(s[o])
                    };
                }
                for (o = i.length; o--; ) {
                    i[o].elem !== this || e != null && i[o].queue !== e || (i[o].anim.stop(n), t = !1, 
                    i.splice(o, 1));
                }
                if (t || !n) {
                    X.dequeue(this, e)
                };
            });
        },
        finish: function(e) {
            if (e !== !1) {
                e = e || "fx"
            };
            return this.each(function() {
                var t, n = ve.get(this), r = n[e + "queue"], o = n[e + "queueHooks"], i = X.timers, s = r ? r.length : 0;
                for (n.finish = !0, X.queue(this, e, []), o && o.stop && o.stop.call(this, !0), 
                t = i.length; t--; ) {
                    if (i[t].elem === this && i[t].queue === e) {
                        i[t].anim.stop(!0), i.splice(t, 1)
                    };
                }
                for (t = 0; s > t; t++) {
                    if (r[t] && r[t].finish) {
                        r[t].finish.call(this)
                    };
                }
                delete n.finish;
            });
        }
    });
    X.each([ "toggle", "show", "hide" ], function(e, t) {
        var n = X.fn[t];
        X.fn[t] = function(e, r, o) {
            if (e == null || typeof e == "boolean") {
                return n.apply(this, arguments);
            }
            return this.animate(M(t, !0), e, r, o);
        };
    });
    X.each({
        slideDown: M("show"),
        slideUp: M("hide"),
        slideToggle: M("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, t) {
        X.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r);
        };
    });
    X.timers = [];
    X.fx.tick = function() {
        var e, t = 0, n = X.timers;
        for (Ze = X.now(); t < n.length; t++) {
            e = n[t];
            e() || n[t] !== e || n.splice(t--, 1);
        }
        n.length || X.fx.stop();
        Ze = void 0;
    };
    X.fx.timer = function(e) {
        X.timers.push(e);
        e() ? X.fx.start() : X.timers.pop();
    };
    X.fx.interval = 13;
    X.fx.start = function() {
        Je || (Je = setInterval(X.fx.tick, X.fx.interval));
    };
    X.fx.stop = function() {
        clearInterval(Je);
        Je = null;
    };
    X.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    X.fn.delay = function(e, t) {
        e = X.fx ? X.fx.speeds[e] || e : e;
        t = t || "fx";
        return this.queue(t, function(t, n) {
            var r = setTimeout(t, e);
            n.stop = function() {
                clearTimeout(r);
            };
        });
    };
    (function() {
        var e = J.createElement("input"), t = J.createElement("select"), n = t.appendChild(J.createElement("option"));
        e.type = "checkbox";
        Z.checkOn = "" !== e.value;
        Z.optSelected = n.selected;
        t.disabled = !0;
        Z.optDisabled = !n.disabled;
        e = J.createElement("input");
        e.value = "t";
        e.type = "radio";
        Z.radioValue = e.value === "t";
    })();
    var rt, ot, it = X.expr.attrHandle;
    X.fn.extend({
        attr: function(e, t) {
            return ge(this, X.attr, e, t, arguments.length > 1);
        },
        removeAttr: function(e) {
            return this.each(function() {
                X.removeAttr(this, e);
            });
        }
    });
    X.extend({
        attr: function(e, t, n) {
            var r, o, i = e.nodeType;
            if (e && 3 !== i && 8 !== i && 2 !== i) {
                if (typeof e.getAttribute === Ee) {
                    return X.prop(e, t, n);
                }
                i === 1 && X.isXMLDoc(e) || (t = t.toLowerCase(), r = X.attrHooks[t] || (X.expr.match.bool.test(t) ? ot : rt));
                if (n === void 0) {
                    if (r && "get" in r && null !== (o = r.get(e, t))) {
                        return o;
                    }
                    o = X.find.attr(e, t);
                    if (o == null) {
                        return void 0;
                    }
                    return o;
                }
                if (null !== n) {
                    if (r && "set" in r && void 0 !== (o = r.set(e, n, t))) {
                        return o;
                    }
                    e.setAttribute(t, n + "");
                    return n;
                }
                return void X.removeAttr(e, t);
            }
        },
        removeAttr: function(e, t) {
            var n, r, o = 0, i = t && t.match(he);
            if (i && e.nodeType === 1) {
                for (;n = i[o++]; ) {
                    r = X.propFix[n] || n;
                    if (X.expr.match.bool.test(n)) {
                        e[r] = !1
                    };
                    e.removeAttribute(n);
                }
            }
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!Z.radioValue && t === "radio" && X.nodeName(e, "input")) {
                        var n = e.value;
                        e.setAttribute("type", t);
                        if (n) {
                            e.value = n
                        };
                        return t;
                    }
                }
            }
        }
    });
    ot = {
        set: function(e, t, n) {
            t === !1 ? X.removeAttr(e, n) : e.setAttribute(n, n);
            return n;
        }
    };
    X.each(X.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var n = it[t] || X.find.attr;
        it[t] = function(e, t, r) {
            var o, i;
            r || (i = it[t], it[t] = o, o = n(e, t, r) != null ? t.toLowerCase() : null, it[t] = i);
            return o;
        };
    });
    var st = /^(?:input|select|textarea|button)$/i;
    X.fn.extend({
        prop: function(e, t) {
            return ge(this, X.prop, e, t, arguments.length > 1);
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[X.propFix[e] || e];
            });
        }
    });
    X.extend({
        propFix: {
            for: "htmlFor",
            class: "className"
        },
        prop: function(e, t, n) {
            var r, o, i, s = e.nodeType;
            if (e && 3 !== s && 8 !== s && 2 !== s) {
                i = 1 !== s || !X.isXMLDoc(e);
                if (i) {
                    t = X.propFix[t] || t, o = X.propHooks[t]
                };
                if (void 0 !== n) {
                    if (o && "set" in o && void 0 !== (r = o.set(e, n, t))) {
                        return r;
                    }
                    return e[t] = n;
                }
                if (o && "get" in o && null !== (r = o.get(e, t))) {
                    return r;
                }
                return e[t];
            }
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    if (e.hasAttribute("tabindex") || st.test(e.nodeName) || e.href) {
                        return e.tabIndex;
                    }
                    return -1;
                }
            }
        }
    });
    Z.optSelected || (X.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            if (t && t.parentNode) {
                t.parentNode.selectedIndex
            };
            return null;
        }
    });
    X.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
        X.propFix[this.toLowerCase()] = this;
    });
    var at = /[\t\r\n\f]/g;
    X.fn.extend({
        addClass: function(e) {
            var t, n, r, o, i, s, a = typeof e == "string" && e, u = 0, l = this.length;
            if (X.isFunction(e)) {
                return this.each(function(t) {
                    X(this).addClass(e.call(this, t, this.className));
                });
            }
            if (a) {
                for (t = (e || "").match(he) || []; l > u; u++) {
                    n = this[u];
                    if (r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(at, " ") : " ")) {
                        for (i = 0; o = t[i++]; ) {
                            if (r.indexOf(" " + o + " ") < 0) {
                                r += o + " "
                            };
                        }
                        s = X.trim(r);
                        if (n.className !== s) {
                            n.className = s
                        };
                    }
                }
            }
            return this;
        },
        removeClass: function(e) {
            var t, n, r, o, i, s, a = arguments.length === 0 || typeof e == "string" && e, u = 0, l = this.length;
            if (X.isFunction(e)) {
                return this.each(function(t) {
                    X(this).removeClass(e.call(this, t, this.className));
                });
            }
            if (a) {
                for (t = (e || "").match(he) || []; l > u; u++) {
                    n = this[u];
                    if (r = n.nodeType === 1 && (n.className ? (" " + n.className + " ").replace(at, " ") : "")) {
                        for (i = 0; o = t[i++]; ) {
                            for (;r.indexOf(" " + o + " ") >= 0; ) {
                                r = r.replace(" " + o + " ", " ");
                            }
                        }
                        s = e ? X.trim(r) : "";
                        if (n.className !== s) {
                            n.className = s
                        };
                    }
                }
            }
            return this;
        },
        toggleClass: function(e, t) {
            var n = typeof e;
            if (typeof t == "boolean" && n === "string") {
                if (t) {
                    return this.addClass(e);
                }
                return this.removeClass(e);
            }
            if (X.isFunction(e)) {
                return this.each(function(n) {
                    X(this).toggleClass(e.call(this, n, this.className, t), t);
                });
            }
            return this.each(function() {
                if (n === "string") {
                    for (var t, r = 0, o = X(this), i = e.match(he) || []; t = i[r++]; ) {
                        o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                    }
                } else if (n === Ee || n === "boolean") {
                    this.className && ve.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || ""
                };
            });
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) {
                if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(at, " ").indexOf(t) >= 0) {
                    return !0;
                }
            }
            return !1;
        }
    });
    var ut = /\r/g;
    X.fn.extend({
        val: function(e) {
            var t, n, r, o = this[0];
            if (arguments.length) {
                r = X.isFunction(e);
                return this.each(function(n) {
                    var o;
                    if (this.nodeType === 1) {
                        o = r ? e.call(this, n, X(this).val()) : e, o == null ? o = "" : typeof o == "number" ? o += "" : X.isArray(o) && (o = X.map(o, function(e) {
                            if (e == null) {
                                return "";
                            }
                            return e + "";
                        })), t = X.valHooks[this.type] || X.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, o, "value") || (this.value = o)
                    };
                });
            }
            if (o) {
                t = X.valHooks[o.type] || X.valHooks[o.nodeName.toLowerCase()];
                if (t && "get" in t && void 0 !== (n = t.get(o, "value"))) {
                    return n;
                }
                n = o.value;
                if (typeof n == "string") {
                    return n.replace(ut, "");
                }
                if (n == null) {
                    return "";
                }
                return n;
            }
        }
    });
    X.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = X.find.attr(e, "value");
                    if (t != null) {
                        return t;
                    }
                    return X.trim(X.text(e));
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, o = e.selectedIndex, i = e.type === "select-one" || o < 0, s = i ? null : [], a = i ? o + 1 : r.length, u = o < 0 ? a : i ? o : 0; a > u; u++) {
                        n = r[u];
                        if ((n.selected || u === o) && (Z.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !X.nodeName(n.parentNode, "optgroup"))) {
                            t = X(n).val();
                            if (i) {
                                return t;
                            }
                            s.push(t);
                        }
                    }
                    return s;
                },
                set: function(e, t) {
                    for (var n, r, o = e.options, i = X.makeArray(t), s = o.length; s--; ) {
                        r = o[s];
                        if (r.selected = X.inArray(r.value, i) >= 0) {
                            n = !0
                        };
                    }
                    n || (e.selectedIndex = -1);
                    return i;
                }
            }
        }
    });
    X.each([ "radio", "checkbox" ], function() {
        X.valHooks[this] = {
            set: function(e, t) {
                if (X.isArray(t)) {
                    return e.checked = X.inArray(X(e).val(), t) >= 0;
                }
                return;
            }
        };
        Z.checkOn || (X.valHooks[this].get = function(e) {
            if (e.getAttribute("value") === null) {
                return "on";
            }
            return e.value;
        });
    });
    X.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(e, t) {
        X.fn[t] = function(e, n) {
            if (arguments.length > 0) {
                return this.on(t, null, e, n);
            }
            return this.trigger(t);
        };
    });
    X.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e);
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n);
        },
        unbind: function(e, t) {
            return this.off(e, null, t);
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r);
        },
        undelegate: function(e, t, n) {
            if (arguments.length === 1) {
                return this.off(e, "**");
            }
            return this.off(t, e || "**", n);
        }
    });
    var lt = X.now(), ct = /\?/;
    X.parseJSON = function(e) {
        return JSON.parse(e + "");
    };
    X.parseXML = function(e) {
        var t, n;
        if (!e || typeof e != "string") {
            return null;
        }
        try {
            n = new DOMParser();
            t = n.parseFromString(e, "text/xml");
        } catch (r) {
            t = void 0;
        }
        if (!t || t.getElementsByTagName("parsererror").length) {
            X.error("Invalid XML: " + e)
        };
        return t;
    };
    var pt = /#.*$/, dt = /([?&])_=[^&]*/, ht = /^(.*?):[ \t]*([^\r\n]*)$/gm, ft = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, mt = /^(?:GET|HEAD)$/, gt = /^\/\//, vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, bt = {}, yt = {}, _t = "*/".concat("*"), wt = e.location.href, kt = vt.exec(wt.toLowerCase()) || [];
    X.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: wt,
            type: "GET",
            isLocal: ft.test(kt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": _t,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": X.parseJSON,
                "text xml": X.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            if (t) {
                return R(R(e, X.ajaxSettings), t);
            }
            return R(X.ajaxSettings, e);
        },
        ajaxPrefilter: P(bt),
        ajaxTransport: P(yt),
        ajax: function(e, t) {
            function n(e, t, n, s) {
                var u, c, v, b, _, k = t;
                if (2 !== y) {
                    y = 2, a && clearTimeout(a), r = void 0, i = s || "", w.readyState = e > 0 ? 4 : 0, 
                    u = e >= 200 && e < 300 || e === 304, n && (b = B(p, w, n)), b = j(p, b, w, u), 
                    u ? (p.ifModified && (_ = w.getResponseHeader("Last-Modified"), _ && (X.lastModified[o] = _), 
                    _ = w.getResponseHeader("etag"), _ && (X.etag[o] = _)), e === 204 || p.type === "HEAD" ? k = "nocontent" : e === 304 ? k = "notmodified" : (k = b.state, 
                    c = b.data, v = b.error, u = !v)) : (v = k, (e || !k) && (k = "error", e < 0 && (e = 0))), 
                    w.status = e, w.statusText = (t || k) + "", u ? f.resolveWith(d, [ c, k, w ]) : f.rejectWith(d, [ w, k, v ]), 
                    w.statusCode(g), g = void 0, l && h.trigger(u ? "ajaxSuccess" : "ajaxError", [ w, p, u ? c : v ]), 
                    m.fireWith(d, [ w, k ]), l && (h.trigger("ajaxComplete", [ w, p ]), --X.active || X.event.trigger("ajaxStop"))
                };
            }
            if (typeof e == "object") {
                t = e, e = void 0
            };
            t = t || {};
            var r, o, i, s, a, u, l, c, p = X.ajaxSetup({}, t), d = p.context || p, h = p.context && (d.nodeType || d.jquery) ? X(d) : X.event, f = X.Deferred(), m = X.Callbacks("once memory"), g = p.statusCode || {}, v = {}, b = {}, y = 0, _ = "canceled", w = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (y === 2) {
                        if (!s) {
                            for (s = {}; t = ht.exec(i); ) {
                                s[t[1].toLowerCase()] = t[2];
                            }
                        }
                        t = s[e.toLowerCase()];
                    }
                    if (t == null) {
                        return null;
                    }
                    return t;
                },
                getAllResponseHeaders: function() {
                    if (y === 2) {
                        return i;
                    }
                    return null;
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    y || (e = b[n] = b[n] || e, v[e] = t);
                    return this;
                },
                overrideMimeType: function(e) {
                    y || (p.mimeType = e);
                    return this;
                },
                statusCode: function(e) {
                    var t;
                    if (e) {
                        if (y < 2) {
                            for (t in e) {
                                g[t] = [ g[t], e[t] ];
                            }
                        } else w.always(e[w.status]);
                    }
                    return this;
                },
                abort: function(e) {
                    var t = e || _;
                    if (r) {
                        r.abort(t)
                    };
                    n(0, t);
                    return this;
                }
            };
            f.promise(w).complete = m.add;
            w.success = w.done;
            w.error = w.fail;
            p.url = ((e || p.url || wt) + "").replace(pt, "").replace(gt, kt[1] + "//");
            p.type = t.method || t.type || p.method || p.type;
            p.dataTypes = X.trim(p.dataType || "*").toLowerCase().match(he) || [ "" ];
            if (p.crossDomain == null) {
                u = vt.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === kt[1] && u[2] === kt[2] && (u[3] || (u[1] === "http:" ? "80" : "443")) === (kt[3] || (kt[1] === "http:" ? "80" : "443")))
            };
            if (p.data && p.processData && typeof p.data != "string") {
                p.data = X.param(p.data, p.traditional)
            };
            L(bt, p, t, w);
            if (y === 2) {
                return w;
            }
            l = X.event && p.global;
            if (l && X.active++ === 0) {
                X.event.trigger("ajaxStart")
            };
            p.type = p.type.toUpperCase();
            p.hasContent = !mt.test(p.type);
            o = p.url;
            p.hasContent || (p.data && (o = p.url += (ct.test(o) ? "&" : "?") + p.data, delete p.data), 
            p.cache === !1 && (p.url = dt.test(o) ? o.replace(dt, "$1_=" + lt++) : o + (ct.test(o) ? "&" : "?") + "_=" + lt++));
            if (p.ifModified) {
                X.lastModified[o] && w.setRequestHeader("If-Modified-Since", X.lastModified[o]), 
                X.etag[o] && w.setRequestHeader("If-None-Match", X.etag[o])
            };
            if (p.data && p.hasContent && p.contentType !== !1 || t.contentType) {
                w.setRequestHeader("Content-Type", p.contentType)
            };
            w.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + _t + "; q=0.01" : "") : p.accepts["*"]);
            for (c in p.headers) {
                w.setRequestHeader(c, p.headers[c]);
            }
            if (p.beforeSend && (p.beforeSend.call(d, w, p) === !1 || y === 2)) {
                return w.abort();
            }
            _ = "abort";
            for (c in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                w[c](p[c]);
            }
            if (r = L(yt, p, t, w)) {
                w.readyState = 1;
                if (l) {
                    h.trigger("ajaxSend", [ w, p ])
                };
                if (p.async && p.timeout > 0) {
                    a = setTimeout(function() {
                        w.abort("timeout");
                    }, p.timeout)
                };
                try {
                    y = 1;
                    r.send(v, n);
                } catch (k) {
                    if (!(2 > y)) throw k;
                    n(-1, k);
                }
            } else n(-1, "No Transport");
            return w;
        },
        getJSON: function(e, t, n) {
            return X.get(e, t, n, "json");
        },
        getScript: function(e, t) {
            return X.get(e, void 0, t, "script");
        }
    });
    X.each([ "get", "post" ], function(e, t) {
        X[t] = function(e, n, r, o) {
            if (X.isFunction(n)) {
                o = o || r, r = n, n = void 0
            };
            return X.ajax({
                url: e,
                type: t,
                dataType: o,
                data: n,
                success: r
            });
        };
    });
    X._evalUrl = function(e) {
        return X.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        });
    };
    X.fn.extend({
        wrapAll: function(e) {
            var t;
            if (X.isFunction(e)) {
                return this.each(function(t) {
                    X(this).wrapAll(e.call(this, t));
                });
            }
            if (this[0]) {
                t = X(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), 
                t.map(function() {
                    for (var e = this; e.firstElementChild; ) {
                        e = e.firstElementChild;
                    }
                    return e;
                }).append(this)
            };
            return this;
        },
        wrapInner: function(e) {
            if (X.isFunction(e)) {
                return this.each(function(t) {
                    X(this).wrapInner(e.call(this, t));
                });
            }
            return this.each(function() {
                var t = X(this), n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
            });
        },
        wrap: function(e) {
            var t = X.isFunction(e);
            return this.each(function(n) {
                X(this).wrapAll(t ? e.call(this, n) : e);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                X.nodeName(this, "body") || X(this).replaceWith(this.childNodes);
            }).end();
        }
    });
    X.expr.filters.hidden = function(e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0;
    };
    X.expr.filters.visible = function(e) {
        return !X.expr.filters.hidden(e);
    };
    var xt = /%20/g, Ct = /\[\]$/, Et = /\r?\n/g, Tt = /^(?:submit|button|image|reset|file)$/i, St = /^(?:input|select|textarea|keygen)/i;
    X.param = function(e, t) {
        var n, r = [], o = function(e, t) {
            t = X.isFunction(t) ? t() : t == null ? "" : t;
            r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
        };
        if (t === void 0) {
            t = X.ajaxSettings && X.ajaxSettings.traditional
        };
        if (X.isArray(e) || e.jquery && !X.isPlainObject(e)) {
            X.each(e, function() {
                o(this.name, this.value);
            });
        } else for (n in e) {
            $(n, e[n], t, o);
        }
        return r.join("&").replace(xt, "+");
    };
    X.fn.extend({
        serialize: function() {
            return X.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                var e = X.prop(this, "elements");
                if (e) {
                    return X.makeArray(e);
                }
                return this;
            }).filter(function() {
                var e = this.type;
                return this.name && !X(this).is(":disabled") && St.test(this.nodeName) && !Tt.test(e) && (this.checked || !Ce.test(e));
            }).map(function(e, t) {
                var n = X(this).val();
                if (n == null) {
                    return null;
                }
                if (X.isArray(n)) {
                    return X.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(Et, "\r\n")
                        };
                    });
                }
                return {
                    name: t.name,
                    value: n.replace(Et, "\r\n")
                };
            }).get();
        }
    });
    X.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest();
        } catch (e) {}
    };
    var Dt = 0, At = {}, Mt = {
        0: 200,
        1223: 204
    }, Ft = X.ajaxSettings.xhr();
    if (e.attachEvent) {
        e.attachEvent("onunload", function() {
            for (var e in At) {
                At[e]();
            }
        })
    };
    Z.cors = !!Ft && "withCredentials" in Ft;
    Z.ajax = Ft = !!Ft;
    X.ajaxTransport(function(e) {
        var t;
        if (Z.cors || Ft && !e.crossDomain) {
            return {
                send: function(n, r) {
                    var o, i = e.xhr(), s = ++Dt;
                    i.open(e.type, e.url, e.async, e.username, e.password);
                    if (e.xhrFields) {
                        for (o in e.xhrFields) {
                            i[o] = e.xhrFields[o];
                        }
                    }
                    if (e.mimeType && i.overrideMimeType) {
                        i.overrideMimeType(e.mimeType)
                    };
                    e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                    for (o in n) {
                        i.setRequestHeader(o, n[o]);
                    }
                    t = function(e) {
                        return function() {
                            if (t) {
                                delete At[s], t = i.onload = i.onerror = null, e === "abort" ? i.abort() : e === "error" ? r(i.status, i.statusText) : r(Mt[i.status] || i.status, i.statusText, typeof i.responseText == "string" ? {
                                    text: i.responseText
                                } : void 0, i.getAllResponseHeaders())
                            };
                        };
                    };
                    i.onload = t();
                    i.onerror = t("error");
                    t = At[s] = t("abort");
                    try {
                        i.send(e.hasContent && e.data || null);
                    } catch (a) {
                        if (t) throw a;
                    }
                },
                abort: function() {
                    if (t) {
                        t()
                    };
                }
            };
        }
        return;
    });
    X.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                X.globalEval(e);
                return e;
            }
        }
    });
    X.ajaxPrefilter("script", function(e) {
        if (e.cache === void 0) {
            e.cache = !1
        };
        if (e.crossDomain) {
            e.type = "GET"
        };
    });
    X.ajaxTransport("script", function(e) {
        if (e.crossDomain) {
            var t, n;
            return {
                send: function(r, o) {
                    t = X("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", n = function(e) {
                        t.remove();
                        n = null;
                        if (e) {
                            o(e.type === "error" ? 404 : 200, e.type)
                        };
                    });
                    J.head.appendChild(t[0]);
                },
                abort: function() {
                    if (n) {
                        n()
                    };
                }
            };
        }
    });
    var Nt = [], Ot = /(=)\?(?=&|$)|\?\?/;
    X.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Nt.pop() || X.expando + "_" + lt++;
            this[e] = !0;
            return e;
        }
    });
    X.ajaxPrefilter("json jsonp", function(t, n, r) {
        var o, i, s, a = t.jsonp !== !1 && (Ot.test(t.url) ? "url" : typeof t.data == "string" && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Ot.test(t.data) && "data");
        if (a || t.dataTypes[0] === "jsonp") {
            o = t.jsonpCallback = X.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback;
            a ? t[a] = t[a].replace(Ot, "$1" + o) : t.jsonp !== !1 && (t.url += (ct.test(t.url) ? "&" : "?") + t.jsonp + "=" + o);
            t.converters["script json"] = function() {
                s || X.error(o + " was not called");
                return s[0];
            };
            t.dataTypes[0] = "json";
            i = e[o];
            e[o] = function() {
                s = arguments;
            };
            r.always(function() {
                e[o] = i;
                if (t[o]) {
                    t.jsonpCallback = n.jsonpCallback, Nt.push(o)
                };
                if (s && X.isFunction(i)) {
                    i(s[0])
                };
                s = i = void 0;
            });
            return "script";
        }
        return;
    });
    X.parseHTML = function(e, t, n) {
        if (!e || typeof e != "string") {
            return null;
        }
        if (typeof t == "boolean") {
            n = t, t = !1
        };
        t = t || J;
        var r = se.exec(e), o = !n && [];
        if (r) {
            return [ t.createElement(r[1]) ];
        }
        r = X.buildFragment([ e ], t, o);
        if (o && o.length) {
            X(o).remove()
        };
        return X.merge([], r.childNodes);
    };
    var It = X.fn.load;
    X.fn.load = function(e, t, n) {
        if (typeof e != "string" && It) {
            return It.apply(this, arguments);
        }
        var r, o, i, s = this, a = e.indexOf(" ");
        if (a >= 0) {
            r = X.trim(e.slice(a)), e = e.slice(0, a)
        };
        X.isFunction(t) ? (n = t, t = void 0) : t && typeof t == "object" && (o = "POST");
        if (s.length > 0) {
            X.ajax({
                url: e,
                type: o,
                dataType: "html",
                data: t
            }).done(function(e) {
                i = arguments;
                s.html(r ? X("<div>").append(X.parseHTML(e)).find(r) : e);
            }).complete(n && function(e, t) {
                s.each(n, i || [ e.responseText, t, e ]);
            })
        };
        return this;
    };
    X.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(e, t) {
        X.fn[t] = function(e) {
            return this.on(t, e);
        };
    });
    X.expr.filters.animated = function(e) {
        return X.grep(X.timers, function(t) {
            return e === t.elem;
        }).length;
    };
    var Pt = e.document.documentElement;
    X.offset = {
        setOffset: function(e, t, n) {
            var r, o, i, s, a, u, l, c = X.css(e, "position"), p = X(e), d = {};
            if (c === "static") {
                e.style.position = "relative"
            };
            a = p.offset();
            i = X.css(e, "top");
            u = X.css(e, "left");
            l = (c === "absolute" || c === "fixed") && (i + u).indexOf("auto") > -1;
            l ? (r = p.position(), s = r.top, o = r.left) : (s = parseFloat(i) || 0, o = parseFloat(u) || 0);
            if (X.isFunction(t)) {
                t = t.call(e, n, a)
            };
            if (t.top != null) {
                d.top = t.top - a.top + s
            };
            if (t.left != null) {
                d.left = t.left - a.left + o
            };
            "using" in t ? t.using.call(e, d) : p.css(d);
        }
    };
    X.fn.extend({
        offset: function(e) {
            if (arguments.length) {
                if (e === void 0) {
                    return this;
                }
                return this.each(function(t) {
                    X.offset.setOffset(this, e, t);
                });
            }
            var t, n, r = this[0], o = {
                top: 0,
                left: 0
            }, i = r && r.ownerDocument;
            if (i) {
                t = i.documentElement;
                if (X.contains(t, r)) {
                    if (typeof r.getBoundingClientRect !== Ee) {
                        o = r.getBoundingClientRect()
                    };
                    n = U(i);
                    return {
                        top: o.top + n.pageYOffset - t.clientTop,
                        left: o.left + n.pageXOffset - t.clientLeft
                    };
                }
                return o;
            }
        },
        position: function() {
            if (this[0]) {
                var e, t, n = this[0], r = {
                    top: 0,
                    left: 0
                };
                X.css(n, "position") === "fixed" ? t = n.getBoundingClientRect() : (e = this.offsetParent(), 
                t = this.offset(), X.nodeName(e[0], "html") || (r = e.offset()), r.top += X.css(e[0], "borderTopWidth", !0), 
                r.left += X.css(e[0], "borderLeftWidth", !0));
                return {
                    top: t.top - r.top - X.css(n, "marginTop", !0),
                    left: t.left - r.left - X.css(n, "marginLeft", !0)
                };
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || Pt; e && !X.nodeName(e, "html") && X.css(e, "position") === "static"; ) {
                    e = e.offsetParent;
                }
                return e || Pt;
            });
        }
    });
    X.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, n) {
        var r = n === "pageYOffset";
        X.fn[t] = function(o) {
            return ge(this, function(t, o, i) {
                var s = U(t);
                if (i === void 0) {
                    if (s) {
                        return s[n];
                    }
                    return t[o];
                }
                return void (s ? s.scrollTo(r ? e.pageXOffset : i, r ? i : e.pageYOffset) : t[o] = i);
            }, t, o, arguments.length, null);
        };
    });
    X.each([ "top", "left" ], function(e, t) {
        X.cssHooks[t] = k(Z.pixelPosition, function(e, n) {
            if (n) {
                n = w(e, t);
                if (Ve.test(n)) {
                    return X(e).position()[t] + "px";
                }
                return n;
            }
            return;
        });
    });
    X.each({
        Height: "height",
        Width: "width"
    }, function(e, t) {
        X.each({
            padding: "inner" + e,
            content: t,
            "": "outer" + e
        }, function(n, r) {
            X.fn[r] = function(r, o) {
                var i = arguments.length && (n || typeof r != "boolean"), s = n || (r === !0 || o === !0 ? "margin" : "border");
                return ge(this, function(t, n, r) {
                    var o;
                    if (X.isWindow(t)) {
                        return t.document.documentElement["client" + e];
                    }
                    if (t.nodeType === 9) {
                        o = t.documentElement;
                        return Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e]);
                    }
                    if (r === void 0) {
                        return X.css(t, n, s);
                    }
                    return X.style(t, n, r, s);
                }, t, i ? r : void 0, i, null);
            };
        });
    });
    X.fn.size = function() {
        return this.length;
    };
    X.fn.andSelf = X.fn.addBack;
    if (typeof define == "function" && define.amd) {
        define("jquery", [], function() {
            return X;
        })
    };
    var Lt = e.jQuery, Rt = e.$;
    X.noConflict = function(t) {
        if (e.$ === X) {
            e.$ = Rt
        };
        if (t && e.jQuery === X) {
            e.jQuery = Lt
        };
        return X;
    };
    if (typeof t === Ee) {
        e.jQuery = e.$ = X
    };
    return X;
});
