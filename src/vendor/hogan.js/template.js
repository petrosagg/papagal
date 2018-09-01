var r = {};

!function(e) {
    function t(e, t, n) {
        var r;
        if (t && typeof t == "object") {
            t[e] !== undefined ? r = t[e] : n && t.get && typeof t.get == "function" && (r = t.get(e))
        };
        return r;
    }
    function n(e, t, n, r, o, i) {
        function s() {}
        function a() {}
        s.prototype = e;
        a.prototype = e.subs;
        var u, l = new s();
        l.subs = new a();
        l.subsText = {};
        l.buf = "";
        r = r || {};
        l.stackSubs = r;
        l.subsText = i;
        for (u in t) {
            r[u] || (r[u] = t[u]);
        }
        for (u in r) {
            l.subs[u] = r[u];
        }
        o = o || {};
        l.stackPartials = o;
        for (u in n) {
            o[u] || (o[u] = n[u]);
        }
        for (u in o) {
            l.partials[u] = o[u];
        }
        return l;
    }
    function r(e) {
        return String(e === null || e === undefined ? "" : e);
    }
    function o(e) {
        e = r(e);
        if (c.test(e)) {
            return e.replace(i, "&amp;").replace(s, "&lt;").replace(a, "&gt;").replace(u, "&#39;").replace(l, "&quot;");
        }
        return e;
    }
    e.Template = function(e, t, n, r) {
        e = e || {};
        this.r = e.code || this.r;
        this.c = n;
        this.options = r || {};
        this.text = t || "";
        this.partials = e.partials || {};
        this.subs = e.subs || {};
        this.buf = "";
    };
    e.Template.prototype = {
        r: function(e, t, n) {
            return "";
        },
        v: o,
        t: r,
        render: function(e, t, n) {
            return this.ri([ e ], t || {}, n);
        },
        ri: function(e, t, n) {
            return this.r(e, t, n);
        },
        ep: function(e, t) {
            var r = this.partials[e], o = t[r.name];
            if (r.instance && r.base == o) {
                return r.instance;
            }
            if (typeof o == "string") {
                if (!this.c) {
                    throw new Error("No compiler available.");
                }
                o = this.c.compile(o, this.options);
            }
            if (!o) {
                return null;
            }
            this.partials[e].base = o;
            if (r.subs) {
                t.stackText || (t.stackText = {});
                for (key in r.subs) {
                    t.stackText[key] || (t.stackText[key] = this.activeSub !== undefined && t.stackText[this.activeSub] ? t.stackText[this.activeSub] : this.text);
                }
                o = n(o, r.subs, r.partials, this.stackSubs, this.stackPartials, t.stackText);
            }
            this.partials[e].instance = o;
            return o;
        },
        rp: function(e, t, n, r) {
            var o = this.ep(e, n);
            if (o) {
                return o.ri(t, n, r);
            }
            return "";
        },
        rs: function(e, t, n) {
            var r = e[e.length - 1];
            if (!p(r)) {
                return void n(e, t, this);
            }
            for (var o = 0; o < r.length; o++) {
                e.push(r[o]);
                n(e, t, this);
                e.pop();
            }
        },
        s: function(e, t, n, r, o, i, s) {
            var a;
            if (p(e) && e.length === 0) {
                return false;
            }
            if (typeof e == "function") {
                e = this.ms(e, t, n, r, o, i, s)
            };
            a = !!e;
            if (!r && a && t) {
                t.push(typeof e == "object" ? e : t[t.length - 1])
            };
            return a;
        },
        d: function(e, n, r, o) {
            var i, s = e.split("."), a = this.f(s[0], n, r, o), u = this.options.modelGet, l = null;
            if (e === "." && p(n[n.length - 2])) {
                a = n[n.length - 1];
            } else {
                for (var c = 1; c < s.length; c++) {
                    i = t(s[c], a, u);
                    if (i !== undefined) {
                        l = a;
                        a = i;
                    } else {
                        a = "";
                    }
                }
            }
            if (o && !a) {
                return false;
            }
            o || typeof a != "function" || (n.push(l), a = this.mv(a, n, r), n.pop());
            return a;
        },
        f: function(e, n, r, o) {
            for (var i = false, s = null, a = false, u = this.options.modelGet, l = n.length - 1; l >= 0; l--) {
                s = n[l];
                i = t(e, s, u);
                if (i !== undefined) {
                    a = true;
                    break;
                }
            }
            if (a) {
                o || typeof i != "function" || (i = this.mv(i, n, r));
                return i;
            }
            if (o) {
                return false;
            }
            return "";
        },
        ls: function(e, t, n, o, i) {
            var s = this.options.delimiters;
            this.options.delimiters = i;
            this.b(this.ct(r(e.call(t, o)), t, n));
            this.options.delimiters = s;
            return false;
        },
        ct: function(e, t, n) {
            if (this.options.disableLambda) {
                throw new Error("Lambda features disabled.");
            }
            return this.c.compile(e, this.options).render(t, n);
        },
        b: function(e) {
            this.buf += e;
        },
        fl: function() {
            var e = this.buf;
            this.buf = "";
            return e;
        },
        ms: function(e, t, n, r, o, i, s) {
            var a, u = t[t.length - 1], l = e.call(u);
            if (typeof l == "function") {
                if (r) {
                    return true;
                }
                if (this.activeSub && this.subsText && this.subsText[this.activeSub]) {
                    a = this.subsText[this.activeSub];
                } else {
                    a = this.text;
                }
                return this.ls(l, u, n, a.substring(o, i), s);
            }
            return l;
        },
        mv: function(e, t, n) {
            var o = t[t.length - 1], i = e.call(o);
            if (typeof i == "function") {
                return this.ct(r(i.call(o)), o, n);
            }
            return i;
        },
        sub: function(e, t, n, r) {
            var o = this.subs[e];
            if (o) {
                this.activeSub = e, o(t, n, this, r), this.activeSub = false
            };
        }
    };
    var i = /&/g, s = /</g, a = />/g, u = /\'/g, l = /\"/g, c = /[&<>\"\']/, p = Array.isArray || function(e) {
        return Object.prototype.toString.call(e) === "[object Array]";
    };
}(typeof exports != "undefined" ? exports : r);
