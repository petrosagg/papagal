!function(e) {
    function t(e) {
        if (e.n.substr(e.n.length - 1) === "}") {
            e.n = e.n.substring(0, e.n.length - 1)
        };
    }
    function n(e) {
        if (e.trim) {
            return e.trim();
        }
        return e.replace(/^\s*|\s*$/g, "");
    }
    function r(e, t, n) {
        if (t.charAt(n) != e.charAt(0)) {
            return false;
        }
        for (var r = 1, o = e.length; o > r; r++) {
            if (t.charAt(n + r) != e.charAt(r)) {
                return false;
            }
        }
        return true;
    }
    function o(t, n, r, a) {
        var u = [], l = null, c = null, p = null;
        for (c = r[r.length - 1]; t.length > 0; ) {
            p = t.shift();
            if (c && c.tag == "<" && !(p.tag in w)) {
                throw new Error("Illegal content in < super tag.");
            }
            if (e.tags[p.tag] <= e.tags.$ || i(p, a)) {
                r.push(p);
                p.nodes = o(t, p.tag, r, a);
            } else {
                if (p.tag == "/") {
                    if (r.length === 0) {
                        throw new Error("Closing tag without opener: /" + p.n);
                    }
                    l = r.pop();
                    if (p.n != l.n && !s(p.n, l.n, a)) {
                        throw new Error("Nesting error: " + l.n + " vs. " + p.n);
                    }
                    l.end = p.i;
                    return u;
                }
                if (p.tag == "\n") {
                    p.last = t.length == 0 || t[0].tag == "\n"
                };
            }
            u.push(p);
        }
        if (r.length > 0) {
            throw new Error("missing closing tag: " + r.pop().n);
        }
        return u;
    }
    function i(e, t) {
        for (var n = 0, r = t.length; r > n; n++) {
            if (t[n].o == e.n) {
                e.tag = "#";
                return true;
            }
        }
    }
    function s(e, t, n) {
        for (var r = 0, o = n.length; o > r; r++) {
            if (n[r].c == e && n[r].o == t) {
                return true;
            }
        }
    }
    function a(e) {
        var t = [];
        for (var n in e) {
            t.push('"' + l(n) + '": function(c,p,t,i) {' + e[n] + "}");
        }
        return "{ " + t.join(",") + " }";
    }
    function u(e) {
        var t = [];
        for (var n in e.partials) {
            t.push('"' + l(n) + '":{name:"' + l(e.partials[n].name) + '", ' + u(e.partials[n]) + "}");
        }
        return "partials: {" + t.join(",") + "}, subs: " + a(e.subs);
    }
    function l(e) {
        return e.replace(b, "\\\\").replace(m, '\\"').replace(g, "\\n").replace(v, "\\r").replace(y, "\\u2028").replace(_, "\\u2029");
    }
    function c(e) {
        if (~e.indexOf(".")) {
            return "d";
        }
        return "f";
    }
    function p(e, t) {
        var n = "<" + (t.prefix || ""), r = n + e.n + k++;
        t.partials[r] = {
            name: e.n,
            partials: {}
        };
        t.code += 't.b(t.rp("' + l(r) + '",c,p,"' + (e.indent || "") + '"));';
        return r;
    }
    function d(e, t) {
        t.code += "t.b(t.t(t." + c(e.n) + '("' + l(e.n) + '",c,p,0)));';
    }
    function h(e) {
        return "t.b(" + e + ");";
    }
    var f = /\S/, m = /\"/g, g = /\n/g, v = /\r/g, b = /\\/g, y = /\u2028/, _ = /\u2029/;
    e.tags = {
        "#": 1,
        "^": 2,
        "<": 3,
        $: 4,
        "/": 5,
        "!": 6,
        ">": 7,
        "=": 8,
        _v: 9,
        "{": 10,
        "&": 11,
        _t: 12
    };
    e.scan = function(o, i) {
        function s() {
            if (b.length > 0) {
                y.push({
                    tag: "_t",
                    text: new String(b)
                });
                b = "";
            };
        }
        function a() {
            for (var t = true, n = k; n < y.length; n++) {
                t = e.tags[y[n].tag] < e.tags._v || y[n].tag == "_t" && y[n].text.match(f) === null;
                if (!t) {
                    return false;
                }
            }
            return t;
        }
        function u(e, t) {
            s();
            if (e && a()) {
                for (var n, r = k; r < y.length; r++) {
                    if (y[r].text) {
                        if ((n = y[r + 1]) && n.tag == ">") {
                            n.indent = y[r].text.toString()
                        };
                        y.splice(r, 1);
                    };
                }
            } else {
                if (!t) {
                    y.push({
                        tag: "\n"
                    })
                };
            }
            _ = false;
            k = y.length;
        }
        function l(e, t) {
            var r = "=" + C, o = e.indexOf(r, t), i = n(e.substring(e.indexOf("=", t) + 1, o)).split(" ");
            x = i[0];
            C = i[i.length - 1];
            return o + r.length - 1;
        }
        var c = o.length, p = 0, d = 1, h = 2, m = p, g = null, v = null, b = "", y = [], _ = false, w = 0, k = 0, x = "{{", C = "}}";
        for (i && (i = i.split(" "), x = i[0], C = i[1]), w = 0; c > w; w++) {
            if (m == p) {
                if (r(x, o, w)) {
                    --w;
                    s();
                    m = d;
                } else {
                    if (o.charAt(w) == "\n") {
                        u(_);
                    } else {
                        b += o.charAt(w);
                    }
                }
            } else {
                if (m == d) {
                    w += x.length - 1;
                    v = e.tags[o.charAt(w + 1)];
                    if (v) {
                        g = o.charAt(w + 1);
                    } else {
                        g = "_v";
                    }
                    if (g == "=") {
                        w = l(o, w);
                        m = p;
                    } else {
                        if (v) {
                            w++
                        };
                        m = h;
                    }
                    _ = w;
                } else {
                    if (r(C, o, w)) {
                        y.push({
                            tag: g,
                            n: n(b),
                            otag: x,
                            ctag: C,
                            i: g == "/" ? _ - x.length : w + C.length
                        });
                        b = "";
                        w += C.length - 1;
                        m = p;
                        if (g == "{") {
                            C == "}}" ? w++ : t(y[y.length - 1])
                        };
                    } else {
                        b += o.charAt(w);
                    }
                }
            }
        }
        u(_, true);
        return y;
    };
    var w = {
        _t: true,
        "\n": true,
        $: true,
        "/": true
    };
    e.stringify = function(t, n, r) {
        return "{code: function (c,p,i) { " + e.wrapMain(t.code) + " }," + u(t) + "}";
    };
    var k = 0;
    e.generate = function(t, n, r) {
        k = 0;
        var o = {
            code: "",
            subs: {},
            partials: {}
        };
        e.walk(t, o);
        if (r.asString) {
            return this.stringify(o, n, r);
        }
        return this.makeTemplate(o, n, r);
    };
    e.wrapMain = function(e) {
        return 'var t=this;t.b(i=i||"");' + e + "return t.fl();";
    };
    e.template = e.Template;
    e.makeTemplate = function(e, t, n) {
        var r = this.makePartials(e);
        r.code = new Function("c", "p", "i", this.wrapMain(e.code));
        return new this.template(r, t, this, n);
    };
    e.makePartials = function(e) {
        var t, n = {
            subs: {},
            partials: e.partials,
            name: e.name
        };
        for (t in n.partials) {
            n.partials[t] = this.makePartials(n.partials[t]);
        }
        for (t in e.subs) {
            n.subs[t] = new Function("c", "p", "t", "i", e.subs[t]);
        }
        return n;
    };
    e.codegen = {
        "#": function(t, n) {
            n.code += "if(t.s(t." + c(t.n) + '("' + l(t.n) + '",c,p,1),c,p,0,' + t.i + "," + t.end + ',"' + t.otag + " " + t.ctag + '")){t.rs(c,p,function(c,p,t){';
            e.walk(t.nodes, n);
            n.code += "});c.pop();}";
        },
        "^": function(t, n) {
            n.code += "if(!t.s(t." + c(t.n) + '("' + l(t.n) + '",c,p,1),c,p,1,0,0,"")){';
            e.walk(t.nodes, n);
            n.code += "};";
        },
        ">": p,
        "<": function(t, n) {
            var r = {
                partials: {},
                code: "",
                subs: {},
                inPartial: true
            };
            e.walk(t.nodes, r);
            var o = n.partials[p(t, n)];
            o.subs = r.subs;
            o.partials = r.partials;
        },
        $: function(t, n) {
            var r = {
                subs: {},
                code: "",
                partials: n.partials,
                prefix: t.n
            };
            e.walk(t.nodes, r);
            n.subs[t.n] = r.code;
            if (!n.inPartial) {
                n.code += 't.sub("' + l(t.n) + '",c,p,i);'
            };
        },
        "\n": function(e, t) {
            t.code += h('"\\n"' + (e.last ? "" : " + i"));
        },
        _v: function(e, t) {
            t.code += "t.b(t.v(t." + c(e.n) + '("' + l(e.n) + '",c,p,0)));';
        },
        _t: function(e, t) {
            t.code += h('"' + l(e.text) + '"');
        },
        "{": d,
        "&": d
    };
    e.walk = function(t, n) {
        for (var r, o = 0, i = t.length; i > o; o++) {
            r = e.codegen[t[o].tag];
            if (r) {
                r(t[o], n)
            };
        }
        return n;
    };
    e.parse = function(e, t, n) {
        n = n || {};
        return o(e, "", [], n.sectionTags || []);
    };
    e.cache = {};
    e.cacheKey = function(e, t) {
        return [ e, !!t.asString, !!t.disableLambda, t.delimiters, !!t.modelGet ].join("||");
    };
    e.compile = function(t, n) {
        n = n || {};
        var r = e.cacheKey(t, n), o = this.cache[r];
        if (o) {
            var i = o.partials;
            for (var s in i) {
                delete i[s].instance;
            }
            return o;
        }
        o = this.generate(this.parse(this.scan(t, n.delimiters), t, n), t, n);
        return this.cache[r] = o;
    };
}(typeof exports != "undefined" ? exports : Hogan);
