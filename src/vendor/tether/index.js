!function(r, o) {
    typeof define == "function" && define.amd ? define(o) : typeof exports == "object" ? module.exports = o(require, exports, module) : r.Tether = o();
}(this, function(e, t, n) {
    "use strict";
    function r(e, t) {
        if (!(e instanceof t)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function o(e) {
        var t = getComputedStyle(e), n = t.position;
        if (n === "fixed") {
            return e;
        }
        for (var r = e; r = r.parentNode; ) {
            var o = void 0;
            try {
                o = getComputedStyle(r);
            } catch (i) {}
            if (typeof o == "undefined" || o === null) {
                return r;
            }
            var s = o.overflow, a = o.overflowX, u = o.overflowY;
            if (/(auto|scroll)/.test(s + u + a) && ("absolute" !== n || [ "relative", "absolute", "fixed" ].indexOf(o.position) >= 0)) {
                return r;
            }
        }
        return document.body;
    }
    function i(e) {
        var t = void 0;
        e === document ? (t = document, e = document.documentElement) : t = e.ownerDocument;
        var n = t.documentElement, r = {}, o = e.getBoundingClientRect();
        for (var i in o) {
            r[i] = o[i];
        }
        var s = C(t);
        r.top -= s.top;
        r.left -= s.left;
        if (typeof r.width == "undefined") {
            r.width = document.body.scrollWidth - r.left - r.right
        };
        if (typeof r.height == "undefined") {
            r.height = document.body.scrollHeight - r.top - r.bottom
        };
        r.top = r.top - n.clientTop;
        r.left = r.left - n.clientLeft;
        r.right = t.body.clientWidth - r.width - r.left;
        r.bottom = t.body.clientHeight - r.height - r.top;
        return r;
    }
    function s(e) {
        return e.offsetParent || document.documentElement;
    }
    function a() {
        var e = document.createElement("div");
        e.style.width = "100%";
        e.style.height = "200px";
        var t = document.createElement("div");
        u(t.style, {
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none",
            visibility: "hidden",
            width: "200px",
            height: "150px",
            overflow: "hidden"
        });
        t.appendChild(e);
        document.body.appendChild(t);
        var n = e.offsetWidth;
        t.style.overflow = "scroll";
        var r = e.offsetWidth;
        if (n === r) {
            r = t.clientWidth
        };
        document.body.removeChild(t);
        var o = n - r;
        return {
            width: o,
            height: o
        };
    }
    function u() {
        var e = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0], t = [];
        Array.prototype.push.apply(t, arguments);
        t.slice(1).forEach(function(t) {
            if (t) {
                for (var n in t) {
                    if ({}.hasOwnProperty.call(t, n)) {
                        e[n] = t[n]
                    };
                }
            }
        });
        return e;
    }
    function l(e, t) {
        if (typeof e.classList != "undefined") {
            t.split(" ").forEach(function(t) {
                if (t.trim()) {
                    e.classList.remove(t)
                };
            });
        } else {
            var n = new RegExp("(^| )" + t.split(" ").join("|") + "( |$)", "gi"), r = d(e).replace(n, " ");
            h(e, r);
        }
    }
    function c(e, t) {
        if (typeof e.classList != "undefined") {
            t.split(" ").forEach(function(t) {
                if (t.trim()) {
                    e.classList.add(t)
                };
            });
        } else {
            l(e, t);
            var n = d(e) + (" " + t);
            h(e, n);
        }
    }
    function p(e, t) {
        if (typeof e.classList != "undefined") {
            return e.classList.contains(t);
        }
        var n = d(e);
        return new RegExp("(^| )" + t + "( |$)", "gi").test(n);
    }
    function d(e) {
        if (e.className instanceof SVGAnimatedString) {
            return e.className.baseVal;
        }
        return e.className;
    }
    function h(e, t) {
        e.setAttribute("class", t);
    }
    function f(e, t, n) {
        n.forEach(function(n) {
            if (t.indexOf(n) === -1 && p(e, n)) {
                l(e, n)
            };
        });
        t.forEach(function(t) {
            p(e, t) || c(e, t);
        });
    }
    function r(e, t) {
        if (!(e instanceof t)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function m(e, t) {
        var n = arguments.length <= 2 || arguments[2] === void 0 ? 1 : arguments[2];
        return e + n >= t && t >= e - n;
    }
    function g() {
        if (typeof performance != "undefined" && typeof performance.now != "undefined") {
            return performance.now();
        }
        return +new Date();
    }
    function v() {
        for (var e = {
            top: 0,
            left: 0
        }, t = arguments.length, n = Array(t), r = 0; t > r; r++) {
            n[r] = arguments[r];
        }
        n.forEach(function(t) {
            var n = t.top, r = t.left;
            if (typeof n == "string") {
                n = parseFloat(n, 10)
            };
            if (typeof r == "string") {
                r = parseFloat(r, 10)
            };
            e.top += n;
            e.left += r;
        });
        return e;
    }
    function b(e, t) {
        if (typeof e.left == "string" && -1 !== e.left.indexOf("%")) {
            e.left = parseFloat(e.left, 10) / 100 * t.width
        };
        if (typeof e.top == "string" && -1 !== e.top.indexOf("%")) {
            e.top = parseFloat(e.top, 10) / 100 * t.height
        };
        return e;
    }
    function y(e, t) {
        t === "scrollParent" ? t = e.scrollParent : t === "window" && (t = [ pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset ]);
        if (t === document) {
            t = t.documentElement
        };
        if (typeof t.nodeType != "undefined") {
            !function() {
                var e = i(t), n = e, r = getComputedStyle(t);
                t = [ n.left, n.top, e.width + n.left, e.height + n.top ];
                H.forEach(function(e, n) {
                    e = e[0].toUpperCase() + e.substr(1);
                    e === "Top" || e === "Left" ? t[n] += parseFloat(r["border" + e + "Width"]) : t[n] -= parseFloat(r["border" + e + "Width"]);
                });
            }()
        };
        return t;
    }
    var _ = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1;
                r.configurable = !0;
                if ("value" in r) {
                    r.writable = !0
                };
                Object.defineProperty(e, r.key, r);
            }
        }
        return function(t, n, r) {
            if (n) {
                e(t.prototype, n)
            };
            if (r) {
                e(t, r)
            };
            return t;
        };
    }(), w = void 0;
    if (typeof w == "undefined") {
        w = {
            modules: []
        }
    };
    var k = function() {
        var e = 0;
        return function() {
            return ++e;
        };
    }(), x = {}, C = function(e) {
        var t = e._tetherZeroElement;
        if (typeof t == "undefined") {
            t = e.createElement("div"), t.setAttribute("data-tether-id", k()), u(t.style, {
                top: 0,
                left: 0,
                position: "absolute"
            }), e.body.appendChild(t), e._tetherZeroElement = t
        };
        var n = t.getAttribute("data-tether-id");
        if (typeof x[n] == "undefined") {
            x[n] = {};
            var r = t.getBoundingClientRect();
            for (var o in r) {
                x[n][o] = r[o];
            }
            T(function() {
                delete x[n];
            });
        }
        return x[n];
    }, E = [], T = function(e) {
        E.push(e);
    }, S = function() {
        for (var e = void 0; e = E.pop(); ) {
            e();
        }
    }, D = function() {
        function e() {
            r(this, e);
        }
        _(e, [ {
            key: "on",
            value: function(e, t, n) {
                var r = arguments.length <= 3 || arguments[3] === void 0 ? !1 : arguments[3];
                if (typeof this.bindings == "undefined") {
                    this.bindings = {}
                };
                if (typeof this.bindings[e] == "undefined") {
                    this.bindings[e] = []
                };
                this.bindings[e].push({
                    handler: t,
                    ctx: n,
                    once: r
                });
            }
        }, {
            key: "once",
            value: function(e, t, n) {
                this.on(e, t, n, !0);
            }
        }, {
            key: "off",
            value: function(e, t) {
                if (typeof this.bindings == "undefined" || typeof this.bindings[e] == "undefined") {
                    if (typeof t == "undefined") {
                        delete this.bindings[e];
                    } else for (var n = 0; n < this.bindings[e].length; ) {
                        this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : ++n;
                    }
                }
            }
        }, {
            key: "trigger",
            value: function(e) {
                if (typeof this.bindings != "undefined" && this.bindings[e]) {
                    for (var t = 0; t < this.bindings[e].length; ) {
                        var n = this.bindings[e][t], r = n.handler, o = n.ctx, i = n.once, s = o;
                        if (typeof s == "undefined") {
                            s = this
                        };
                        for (var a = arguments.length, u = Array(a > 1 ? a - 1 : 0), l = 1; a > l; l++) {
                            u[l - 1] = arguments[l];
                        }
                        r.apply(s, u);
                        i ? this.bindings[e].splice(t, 1) : ++t;
                    }
                }
            }
        } ]);
        return e;
    }();
    w.Utils = {
        getScrollParent: o,
        getBounds: i,
        getOffsetParent: s,
        extend: u,
        addClass: c,
        removeClass: l,
        hasClass: p,
        updateClasses: f,
        defer: T,
        flush: S,
        uniqueId: k,
        Evented: D,
        getScrollBarSize: a
    };
    var A = function() {
        function e(e, t) {
            var n = [], r = !0, o = !1, i = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), 
                !t || n.length !== t); r = !0) {
                }
            } catch (u) {
                o = !0, i = u;
            } finally {
                try {
                    !r && a["return"] && a["return"]();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }
        return function(t, n) {
            if (Array.isArray(t)) {
                return t;
            }
            if (Symbol.iterator in Object(t)) {
                return e(t, n);
            }
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }(), _ = function() {
        function e(e, t) {
            for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1;
                r.configurable = !0;
                if ("value" in r) {
                    r.writable = !0
                };
                Object.defineProperty(e, r.key, r);
            }
        }
        return function(t, n, r) {
            if (n) {
                e(t.prototype, n)
            };
            if (r) {
                e(t, r)
            };
            return t;
        };
    }();
    if (typeof w == "undefined") {
        throw new Error("You must include the utils.js file before tether.js");
    }
    var M = w.Utils, o = M.getScrollParent, i = M.getBounds, s = M.getOffsetParent, u = M.extend, c = M.addClass, l = M.removeClass, f = M.updateClasses, T = M.defer, S = M.flush, a = M.getScrollBarSize, F = function() {
        for (var e = document.createElement("div"), t = [ "transform", "webkitTransform", "OTransform", "MozTransform", "msTransform" ], n = 0; n < t.length; ++n) {
            var r = t[n];
            if (void 0 !== e.style[r]) {
                return r;
            }
        }
    }(), N = [], O = function() {
        N.forEach(function(e) {
            e.position(!1);
        });
        S();
    };
    !function() {
        var e = null, t = null, n = null, r = function o() {
            if (typeof t != "undefined" && t > 16) {
                t = Math.min(t - 16, 250);
                return void (n = setTimeout(o, 250));
            }
            return void (typeof e != "undefined" && g() - e < 10 || (typeof n != "undefined" && (clearTimeout(n), 
            n = null), e = g(), O(), t = g() - e));
        };
        [ "resize", "scroll", "touchmove" ].forEach(function(e) {
            window.addEventListener(e, r);
        });
    }();
    var I = {
        center: "center",
        left: "right",
        right: "left"
    }, P = {
        middle: "middle",
        top: "bottom",
        bottom: "top"
    }, L = {
        top: 0,
        left: 0,
        middle: "50%",
        center: "50%",
        bottom: "100%",
        right: "100%"
    }, R = function(e, t) {
        var n = e.left, r = e.top;
        if (n === "auto") {
            n = I[t.left]
        };
        if (r === "auto") {
            r = P[t.top]
        };
        return {
            left: n,
            top: r
        };
    }, B = function(e) {
        var t = e.left, n = e.top;
        if (typeof L[e.left] != "undefined") {
            t = L[e.left]
        };
        if (typeof L[e.top] != "undefined") {
            n = L[e.top]
        };
        return {
            left: t,
            top: n
        };
    }, j = function(e) {
        var t = e.split(" "), n = A(t, 2), r = n[0], o = n[1];
        return {
            top: r,
            left: o
        };
    }, $ = j, U = function() {
        function e(t) {
            var n = this;
            r(this, e);
            this.position = this.position.bind(this);
            N.push(this);
            this.history = [];
            this.setOptions(t, !1);
            w.modules.forEach(function(e) {
                if (typeof e.initialize != "undefined") {
                    e.initialize.call(n)
                };
            });
            this.position();
        }
        _(e, [ {
            key: "getClass",
            value: function() {
                var e = arguments.length <= 0 || arguments[0] === void 0 ? "" : arguments[0], t = this.options.classes;
                if (typeof t != "undefined" && t[e]) {
                    return this.options.classes[e];
                }
                if (this.options.classPrefix) {
                    return this.options.classPrefix + "-" + e;
                }
                return e;
            }
        }, {
            key: "setOptions",
            value: function(e) {
                var t = this, n = arguments.length <= 1 || arguments[1] === void 0 ? !0 : arguments[1], r = {
                    offset: "0 0",
                    targetOffset: "0 0",
                    targetAttachment: "auto auto",
                    classPrefix: "tether"
                };
                this.options = u(r, e);
                var i = this.options, s = i.element, a = i.target, l = i.targetModifier;
                this.element = s
                this.target = a
                this.targetModifier = l
                this.target === "viewport" ? (this.target = document.body, this.targetModifier = "visible") : this.target === "scroll-handle" && (this.target = document.body, 
                this.targetModifier = "scroll-handle")
                [ "element", "target" ].forEach(function(e) {
                    if (typeof t[e] == "undefined") {
                        throw new Error("Tether Error: Both element and target must be defined");
                    }
                    typeof t[e].jquery != "undefined" ? t[e] = t[e][0] : typeof t[e] == "string" && (t[e] = document.querySelector(t[e]));
                })
                c(this.element, this.getClass("element"))
                if (this.options.addTargetClasses !== !1) {
                    c(this.target, this.getClass("target"))
                }
                if (!this.options.attachment) {
                    throw new Error("Tether Error: You must provide an attachment");
                }
                this.targetAttachment = $(this.options.targetAttachment);
                this.attachment = $(this.options.attachment);
                this.offset = j(this.options.offset);
                this.targetOffset = j(this.options.targetOffset);
                if (typeof this.scrollParent != "undefined") {
                    this.disable()
                };
                this.targetModifier === "scroll-handle" ? this.scrollParent = this.target : this.scrollParent = o(this.target);
                if (this.options.enabled !== !1) {
                    this.enable(n)
                };
            }
        }, {
            key: "getTargetBounds",
            value: function() {
                if (typeof this.targetModifier == "undefined") {
                    return i(this.target);
                }
                if (this.targetModifier === "visible") {
                    if (this.target === document.body) {
                        return {
                            top: pageYOffset,
                            left: pageXOffset,
                            height: innerHeight,
                            width: innerWidth
                        };
                    }
                    var e = i(this.target), t = {
                        height: e.height,
                        width: e.width,
                        top: e.top,
                        left: e.left
                    };
                    t.height = Math.min(t.height, e.height - (pageYOffset - e.top));
                    t.height = Math.min(t.height, e.height - (e.top + e.height - (pageYOffset + innerHeight)));
                    t.height = Math.min(innerHeight, t.height);
                    t.height -= 2;
                    t.width = Math.min(t.width, e.width - (pageXOffset - e.left));
                    t.width = Math.min(t.width, e.width - (e.left + e.width - (pageXOffset + innerWidth)));
                    t.width = Math.min(innerWidth, t.width);
                    t.width -= 2;
                    if (t.top < pageYOffset) {
                        t.top = pageYOffset
                    };
                    if (t.left < pageXOffset) {
                        t.left = pageXOffset
                    };
                    return t;
                }
                if (this.targetModifier === "scroll-handle") {
                    var e = void 0, n = this.target;
                    n === document.body ? (n = document.documentElement, e = {
                        left: pageXOffset,
                        top: pageYOffset,
                        height: innerHeight,
                        width: innerWidth
                    }) : e = i(n);
                    var r = getComputedStyle(n), o = n.scrollWidth > n.clientWidth || [ r.overflow, r.overflowX ].indexOf("scroll") >= 0 || this.target !== document.body, s = 0;
                    if (o) {
                        s = 15
                    };
                    var a = e.height - parseFloat(r.borderTopWidth) - parseFloat(r.borderBottomWidth) - s, t = {
                        width: 15,
                        height: .975 * a * (a / n.scrollHeight),
                        left: e.left + e.width - parseFloat(r.borderLeftWidth) - 15
                    }, u = 0;
                    if (a < 408 && this.target === document.body) {
                        u = -11e-5 * Math.pow(a, 2) - .00727 * a + 22.58
                    };
                    if (this.target !== document.body) {
                        t.height = Math.max(t.height, 24)
                    };
                    var l = this.target.scrollTop / (n.scrollHeight - a);
                    t.top = l * (a - t.height - u) + e.top + parseFloat(r.borderTopWidth);
                    if (this.target === document.body) {
                        t.height = Math.max(t.height, 24)
                    };
                    return t;
                }
            }
        }, {
            key: "clearCache",
            value: function() {
                this._cache = {};
            }
        }, {
            key: "cache",
            value: function(e, t) {
                if (typeof this._cache == "undefined") {
                    this._cache = {}
                };
                if (typeof this._cache[e] == "undefined") {
                    this._cache[e] = t.call(this)
                };
                return this._cache[e];
            }
        }, {
            key: "enable",
            value: function() {
                var e = arguments.length <= 0 || arguments[0] === void 0 ? !0 : arguments[0];
                if (this.options.addTargetClasses !== !1) {
                    c(this.target, this.getClass("enabled"))
                };
                c(this.element, this.getClass("enabled"));
                this.enabled = !0;
                if (this.scrollParent !== document) {
                    this.scrollParent.addEventListener("scroll", this.position)
                };
                if (e) {
                    this.position()
                };
            }
        }, {
            key: "disable",
            value: function() {
                l(this.target, this.getClass("enabled"));
                l(this.element, this.getClass("enabled"));
                this.enabled = !1;
                if (typeof this.scrollParent != "undefined") {
                    this.scrollParent.removeEventListener("scroll", this.position)
                };
            }
        }, {
            key: "destroy",
            value: function() {
                var e = this;
                this.disable();
                N.forEach(function(t, n) {
                    if (t === e) {
                        return void N.splice(n, 1);
                    }
                    return;
                });
            }
        }, {
            key: "updateAttachClasses",
            value: function(e, t) {
                var n = this;
                e = e || this.attachment;
                t = t || this.targetAttachment;
                var r = [ "left", "top", "bottom", "right", "middle", "center" ];
                if (typeof this._addAttachClasses != "undefined" && this._addAttachClasses.length) {
                    this._addAttachClasses.splice(0, this._addAttachClasses.length)
                };
                if (typeof this._addAttachClasses == "undefined") {
                    this._addAttachClasses = []
                };
                var o = this._addAttachClasses;
                if (e.top) {
                    o.push(this.getClass("element-attached") + "-" + e.top)
                };
                if (e.left) {
                    o.push(this.getClass("element-attached") + "-" + e.left)
                };
                if (t.top) {
                    o.push(this.getClass("target-attached") + "-" + t.top)
                };
                if (t.left) {
                    o.push(this.getClass("target-attached") + "-" + t.left)
                };
                var i = [];
                r.forEach(function(e) {
                    i.push(n.getClass("element-attached") + "-" + e);
                    i.push(n.getClass("target-attached") + "-" + e);
                });
                T(function() {
                    if (typeof n._addAttachClasses != "undefined") {
                        f(n.element, n._addAttachClasses, i), n.options.addTargetClasses !== !1 && f(n.target, n._addAttachClasses, i), 
                        delete n._addAttachClasses
                    };
                });
            }
        }, {
            key: "position",
            value: function() {
                var e = this, t = arguments.length <= 0 || arguments[0] === void 0 ? !0 : arguments[0];
                if (this.enabled) {
                    this.clearCache();
                    var n = R(this.targetAttachment, this.attachment);
                    this.updateAttachClasses(this.attachment, n);
                    var r = this.cache("element-bounds", function() {
                        return i(e.element);
                    }), o = r.width, u = r.height;
                    if (o === 0 && u === 0 && typeof this.lastSize != "undefined") {
                        var l = this.lastSize;
                        o = l.width;
                        u = l.height;
                    } else this.lastSize = {
                        width: o,
                        height: u
                    };
                    var c = this.cache("target-bounds", function() {
                        return e.getTargetBounds();
                    }), p = c, d = b(B(this.attachment), {
                        width: o,
                        height: u
                    }), h = b(B(n), p), f = b(this.offset, {
                        width: o,
                        height: u
                    }), m = b(this.targetOffset, p);
                    d = v(d, f);
                    h = v(h, m);
                    for (var g = c.left + h.left - d.left, y = c.top + h.top - d.top, _ = 0; _ < w.modules.length; ++_) {
                        var k = w.modules[_], x = k.position.call(this, {
                            left: g,
                            top: y,
                            targetAttachment: n,
                            targetPos: c,
                            elementPos: r,
                            offset: d,
                            targetOffset: h,
                            manualOffset: f,
                            manualTargetOffset: m,
                            scrollbarSize: E,
                            attachment: this.attachment
                        });
                        if (x === !1) {
                            return !1;
                        }
                        if (typeof x != "undefined" && typeof x == "object") {
                            y = x.top, g = x.left
                        };
                    }
                    var C = {
                        page: {
                            top: y,
                            left: g
                        },
                        viewport: {
                            top: y - pageYOffset,
                            bottom: pageYOffset - y - u + innerHeight,
                            left: g - pageXOffset,
                            right: pageXOffset - g - o + innerWidth
                        }
                    }, E = void 0;
                    if (document.body.scrollWidth > window.innerWidth) {
                        E = this.cache("scrollbar-size", a), C.viewport.bottom -= E.height
                    };
                    if (document.body.scrollHeight > window.innerHeight) {
                        E = this.cache("scrollbar-size", a), C.viewport.right -= E.width
                    };
                    if ([ "", "static" ].indexOf(document.body.style.position) === -1 || [ "", "static" ].indexOf(document.body.parentElement.style.position) === -1) {
                        C.page.bottom = document.body.scrollHeight - y - u, C.page.right = document.body.scrollWidth - g - o
                    };
                    if (typeof this.options.optimizations != "undefined" && this.options.optimizations.moveElement !== !1 && typeof this.targetModifier == "undefined") {
                        !function() {
                            var t = e.cache("target-offsetparent", function() {
                                return s(e.target);
                            }), n = e.cache("target-offsetparent-bounds", function() {
                                return i(t);
                            }), r = getComputedStyle(t), o = n, a = {};
                            [ "Top", "Left", "Bottom", "Right" ].forEach(function(e) {
                                a[e.toLowerCase()] = parseFloat(r["border" + e + "Width"]);
                            })
                            n.right = document.body.scrollWidth - n.left - o.width + a.right
                            n.bottom = document.body.scrollHeight - n.top - o.height + a.bottom
                            if (C.page.top >= n.top + a.top && C.page.bottom >= n.bottom && C.page.left >= n.left + a.left && C.page.right >= n.right) {
                                var u = t.scrollTop, l = t.scrollLeft;
                                C.offset = {
                                    top: C.page.top - n.top + u - a.top,
                                    left: C.page.left - n.left + l - a.left
                                };
                            }
                        }()
                    };
                    this.move(C);
                    this.history.unshift(C);
                    if (this.history.length > 3) {
                        this.history.pop()
                    };
                    if (t) {
                        S()
                    };
                    return !0;
                }
            }
        }, {
            key: "move",
            value: function(e) {
                var t = this;
                if (typeof this.element.parentNode != "undefined") {
                    var n = {};
                    for (var r in e) {
                        n[r] = {};
                        for (var o in e[r]) {
                            for (var i = !1, a = 0; a < this.history.length; ++a) {
                                var l = this.history[a];
                                if (typeof l[r] != "undefined" && !m(l[r][o], e[r][o])) {
                                    i = !0;
                                    break;
                                }
                            }
                            i || (n[r][o] = !0);
                        }
                    }
                    var c = {
                        top: "",
                        left: "",
                        right: "",
                        bottom: ""
                    }, p = function(e, n) {
                        var r = typeof t.options.optimizations != "undefined", o = r ? t.options.optimizations.gpu : null;
                        if (o !== !1) {
                            var i = void 0, s = void 0;
                            e.top ? (c.top = 0, i = n.top) : (c.bottom = 0, i = -n.bottom);
                            e.left ? (c.left = 0, s = n.left) : (c.right = 0, s = -n.right);
                            c[F] = "translateX(" + Math.round(s) + "px) translateY(" + Math.round(i) + "px)";
                            if ("msTransform" !== F) {
                                c[F] += " translateZ(0)"
                            };
                        } else e.top ? c.top = n.top + "px" : c.bottom = n.bottom + "px", e.left ? c.left = n.left + "px" : c.right = n.right + "px";
                    }, d = !1;
                    (n.page.top || n.page.bottom) && (n.page.left || n.page.right) ? (c.position = "absolute", 
                    p(n.page, e.page)) : (n.viewport.top || n.viewport.bottom) && (n.viewport.left || n.viewport.right) ? (c.position = "fixed", 
                    p(n.viewport, e.viewport)) : typeof n.offset != "undefined" && n.offset.top && n.offset.left ? !function() {
                        c.position = "absolute";
                        var r = t.cache("target-offsetparent", function() {
                            return s(t.target);
                        });
                        if (s(t.element) !== r) {
                            T(function() {
                                t.element.parentNode.removeChild(t.element);
                                r.appendChild(t.element);
                            })
                        };
                        p(n.offset, e.offset);
                        d = !0;
                    }() : (c.position = "absolute", p({
                        top: !0,
                        left: !0
                    }, e.page))
                    if (!d) {
                        for (var h = !0, f = this.element.parentNode; f && "BODY" !== f.tagName; ) {
                            if ("static" !== getComputedStyle(f).position) {
                                h = !1;
                                break;
                            }
                            f = f.parentNode;
                        }
                        h || (this.element.parentNode.removeChild(this.element), document.body.appendChild(this.element));
                    }
                    var g = {}, v = !1;
                    for (var o in c) {
                        var b = c[o], y = this.element.style[o];
                        if ("" !== y && "" !== b && [ "top", "left", "bottom", "right" ].indexOf(o) >= 0) {
                            y = parseFloat(y), b = parseFloat(b)
                        };
                        if (y !== b) {
                            v = !0, g[o] = b
                        };
                    }
                    if (v) {
                        T(function() {
                            u(t.element.style, g);
                        })
                    };
                }
            }
        } ]);
        return e;
    }();
    U.modules = [];
    w.position = O;
    var V = u(U, w), A = function() {
        function e(e, t) {
            var n = [], r = !0, o = !1, i = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), 
                !t || n.length !== t); r = !0) {
                }
            } catch (u) {
                o = !0, i = u;
            } finally {
                try {
                    !r && a["return"] && a["return"]();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }
        return function(t, n) {
            if (Array.isArray(t)) {
                return t;
            }
            if (Symbol.iterator in Object(t)) {
                return e(t, n);
            }
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }(), M = w.Utils, i = M.getBounds, u = M.extend, f = M.updateClasses, T = M.defer, H = [ "left", "top", "right", "bottom" ];
    w.modules.push({
        position: function(e) {
            var t = this, n = e.top, r = e.left, o = e.targetAttachment;
            if (!this.options.constraints) {
                return !0;
            }
            var s = this.cache("element-bounds", function() {
                return i(t.element);
            }), a = s.height, l = s.width;
            if (l === 0 && a === 0 && typeof this.lastSize != "undefined") {
                var c = this.lastSize;
                l = c.width;
                a = c.height;
            }
            var p = this.cache("target-bounds", function() {
                return t.getTargetBounds();
            }), d = p.height, h = p.width, m = [ this.getClass("pinned"), this.getClass("out-of-bounds") ];
            this.options.constraints.forEach(function(e) {
                var t = e.outOfBoundsClass, n = e.pinnedClass;
                if (t) {
                    m.push(t)
                };
                if (n) {
                    m.push(n)
                };
            });
            m.forEach(function(e) {
                [ "left", "top", "right", "bottom" ].forEach(function(t) {
                    m.push(e + "-" + t);
                });
            });
            var g = [], v = u({}, o), b = u({}, this.attachment);
            this.options.constraints.forEach(function(e) {
                var i = e.to, s = e.attachment, u = e.pin;
                if (typeof s == "undefined") {
                    s = ""
                };
                var c = void 0, p = void 0;
                if (s.indexOf(" ") >= 0) {
                    var f = s.split(" "), m = A(f, 2);
                    p = m[0];
                    c = m[1];
                } else c = p = s;
                var _ = y(t, i);
                if (p === "target" || p === "both") {
                    n < _[1] && v.top === "top" && (n += d, v.top = "bottom"), n + a > _[3] && v.top === "bottom" && (n -= d, 
                    v.top = "top")
                };
                if (p === "together") {
                    n < _[1] && v.top === "top" && (b.top === "bottom" ? (n += d, v.top = "bottom", 
                    n += a, b.top = "top") : b.top === "top" && (n += d, v.top = "bottom", n -= a, b.top = "bottom")), 
                    n + a > _[3] && v.top === "bottom" && (b.top === "top" ? (n -= d, v.top = "top", 
                    n -= a, b.top = "bottom") : b.top === "bottom" && (n -= d, v.top = "top", n += a, 
                    b.top = "top")), v.top === "middle" && (n + a > _[3] && b.top === "top" ? (n -= a, 
                    b.top = "bottom") : n < _[1] && b.top === "bottom" && (n += a, b.top = "top"))
                };
                if (c === "target" || c === "both") {
                    r < _[0] && v.left === "left" && (r += h, v.left = "right"), r + l > _[2] && v.left === "right" && (r -= h, 
                    v.left = "left")
                };
                if (c === "together") {
                    r < _[0] && v.left === "left" ? b.left === "right" ? (r += h, v.left = "right", 
                    r += l, b.left = "left") : b.left === "left" && (r += h, v.left = "right", r -= l, 
                    b.left = "right") : r + l > _[2] && v.left === "right" ? b.left === "left" ? (r -= h, 
                    v.left = "left", r -= l, b.left = "right") : b.left === "right" && (r -= h, v.left = "left", 
                    r += l, b.left = "left") : v.left === "center" && (r + l > _[2] && b.left === "left" ? (r -= l, 
                    b.left = "right") : r < _[0] && b.left === "right" && (r += l, b.left = "left"))
                };
                if (p === "element" || p === "both") {
                    n < _[1] && b.top === "bottom" && (n += a, b.top = "top"), n + a > _[3] && b.top === "top" && (n -= a, 
                    b.top = "bottom")
                };
                if (c === "element" || c === "both") {
                    r < _[0] && b.left === "right" && (r += l, b.left = "left"), r + l > _[2] && b.left === "left" && (r -= l, 
                    b.left = "right")
                };
                typeof u == "string" ? u = u.split(",").map(function(e) {
                    return e.trim();
                }) : u === !0 && (u = [ "top", "left", "right", "bottom" ]);
                u = u || [];
                var w = [], k = [];
                if (n < _[1]) {
                    u.indexOf("top") >= 0 ? (n = _[1], w.push("top")) : k.push("top")
                };
                if (n + a > _[3]) {
                    u.indexOf("bottom") >= 0 ? (n = _[3] - a, w.push("bottom")) : k.push("bottom")
                };
                if (r < _[0]) {
                    u.indexOf("left") >= 0 ? (r = _[0], w.push("left")) : k.push("left")
                };
                if (r + l > _[2]) {
                    u.indexOf("right") >= 0 ? (r = _[2] - l, w.push("right")) : k.push("right")
                };
                if (w.length) {
                    !function() {
                        var e = void 0;
                        e = typeof t.options.pinnedClass != "undefined" ? t.options.pinnedClass : t.getClass("pinned");
                        g.push(e);
                        w.forEach(function(t) {
                            g.push(e + "-" + t);
                        });
                    }()
                };
                if (k.length) {
                    !function() {
                        var e = void 0;
                        e = typeof t.options.outOfBoundsClass != "undefined" ? t.options.outOfBoundsClass : t.getClass("out-of-bounds");
                        g.push(e);
                        k.forEach(function(t) {
                            g.push(e + "-" + t);
                        });
                    }()
                };
                if (w.indexOf("left") >= 0 || w.indexOf("right") >= 0) {
                    b.left = v.left = !1
                };
                if (w.indexOf("top") >= 0 || w.indexOf("bottom") >= 0) {
                    b.top = v.top = !1
                };
                if (v.top !== o.top || v.left !== o.left || b.top !== t.attachment.top || b.left !== t.attachment.left) {
                    t.updateAttachClasses(b, v)
                };
            });
            T(function() {
                if (t.options.addTargetClasses !== !1) {
                    f(t.target, g, m)
                };
                f(t.element, g, m);
            });
            return {
                top: n,
                left: r
            };
        }
    });
    var M = w.Utils, i = M.getBounds, f = M.updateClasses, T = M.defer;
    w.modules.push({
        position: function(e) {
            var t = this, n = e.top, r = e.left, o = this.cache("element-bounds", function() {
                return i(t.element);
            }), s = o.height, a = o.width, u = this.getTargetBounds(), l = n + s, c = r + a, p = [];
            if (n <= u.bottom && l >= u.top) {
                [ "left", "right" ].forEach(function(e) {
                    var t = u[e];
                    if (t === r || t === c) {
                        p.push(e)
                    };
                })
            };
            if (r <= u.right && c >= u.left) {
                [ "top", "bottom" ].forEach(function(e) {
                    var t = u[e];
                    if (t === n || t === l) {
                        p.push(e)
                    };
                })
            };
            var d = [], h = [], m = [ "left", "top", "right", "bottom" ];
            d.push(this.getClass("abutted"));
            m.forEach(function(e) {
                d.push(t.getClass("abutted") + "-" + e);
            });
            if (p.length) {
                h.push(this.getClass("abutted"))
            };
            p.forEach(function(e) {
                h.push(t.getClass("abutted") + "-" + e);
            });
            T(function() {
                if (t.options.addTargetClasses !== !1) {
                    f(t.target, h, d)
                };
                f(t.element, h, d);
            });
            return !0;
        }
    });
    var A = function() {
        function e(e, t) {
            var n = [], r = !0, o = !1, i = void 0;
            try {
                for (var s, a = e[Symbol.iterator](); !(r = (s = a.next()).done) && (n.push(s.value), 
                !t || n.length !== t); r = !0) {
                }
            } catch (u) {
                o = !0, i = u;
            } finally {
                try {
                    !r && a["return"] && a["return"]();
                } finally {
                    if (o) throw i;
                }
            }
            return n;
        }
        return function(t, n) {
            if (Array.isArray(t)) {
                return t;
            }
            if (Symbol.iterator in Object(t)) {
                return e(t, n);
            }
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        };
    }();
    w.modules.push({
        position: function(e) {
            var t = e.top, n = e.left;
            if (this.options.shift) {
                var r = this.options.shift;
                if (typeof this.options.shift == "function") {
                    r = this.options.shift.call(this, {
                        top: t,
                        left: n
                    })
                };
                var o = void 0, i = void 0;
                if (typeof r == "string") {
                    r = r.split(" ");
                    r[1] = r[1] || r[0];
                    var s = A(r, 2);
                    o = s[0];
                    i = s[1];
                    o = parseFloat(o, 10);
                    i = parseFloat(i, 10);
                } else o = r.top, i = r.left;
                t += o;
                n += i;
                return {
                    top: t,
                    left: n
                };
            }
        }
    });
    return V;
});
