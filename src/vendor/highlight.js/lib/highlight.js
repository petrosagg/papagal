!function(e) {
    typeof exports != "undefined" ? e(exports) : (window.hljs = e({}), typeof define == "function" && define.amd && define("hljs", [], function() {
        return window.hljs;
    }));
}(function(e) {
    function t(e) {
        return e.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;");
    }
    function n(e) {
        return e.nodeName.toLowerCase();
    }
    function r(e, t) {
        var n = e && e.exec(t);
        return n && n.index == 0;
    }
    function o(e) {
        return /^(no-?highlight|plain|text)$/i.test(e);
    }
    function i(e) {
        var t, n, r, i = e.className + " ";
        i += e.parentNode ? e.parentNode.className : ""
        if (n = /\blang(?:uage)?-([\w-]+)\b/i.exec(i)) {
            if (_(n[1])) {
                return n[1];
            }
            return "no-highlight";
        }
        for (i = i.split(/\s+/), t = 0, r = i.length; r > t; t++) {
            if (_(i[t]) || o(i[t])) {
                return i[t];
            }
        }
    }
    function s(e, t) {
        var n, r = {};
        for (n in e) {
            r[n] = e[n];
        }
        if (t) {
            for (n in t) {
                r[n] = t[n];
            }
        }
        return r;
    }
    function a(e) {
        var t = [];
        (function r(e, o) {
            for (var i = e.firstChild; i; i = i.nextSibling) {
                i.nodeType == 3 ? o += i.nodeValue.length : i.nodeType == 1 && (t.push({
                    event: "start",
                    offset: o,
                    node: i
                }), o = r(i, o), n(i).match(/br|hr|img|input/) || t.push({
                    event: "stop",
                    offset: o,
                    node: i
                }));
            }
            return o;
        })(e, 0);
        return t;
    }
    function u(e, r, o) {
        function i() {
            if (e.length && r.length) {
                if (e[0].offset != r[0].offset) {
                    if (e[0].offset < r[0].offset) {
                        return e;
                    }
                    return r;
                }
                if (r[0].event == "start") {
                    return e;
                }
                return r;
            }
            if (e.length) {
                return e;
            }
            return r;
        }
        function s(e) {
            function r(e) {
                return " " + e.nodeName + '="' + t(e.value) + '"';
            }
            c += "<" + n(e) + Array.prototype.map.call(e.attributes, r).join("") + ">";
        }
        function a(e) {
            c += "</" + n(e) + ">";
        }
        function u(e) {
            (e.event == "start" ? s : a)(e.node);
        }
        for (var l = 0, c = "", p = []; e.length || r.length; ) {
            var d = i();
            c += t(o.substr(l, d[0].offset - l))
            l = d[0].offset
            if (d == e) {
                p.reverse().forEach(a);
                do {
                    u(d.splice(0, 1)[0]);
                    d = i();
                } while (d == e && d.length && d[0].offset == l);
                p.reverse().forEach(s);
            } else d[0].event == "start" ? p.push(d[0].node) : p.pop(), u(d.splice(0, 1)[0]);
        }
        return c + t(o.substr(l));
    }
    function l(e) {
        function t(e) {
            return e && e.source || e;
        }
        function n(n, r) {
            return new RegExp(t(n), "m" + (e.case_insensitive ? "i" : "") + (r ? "g" : ""));
        }
        function r(o, i) {
            if (!o.compiled) {
                o.compiled = !0
                o.keywords = o.keywords || o.beginKeywords
                if (o.keywords) {
                    var a = {}, u = function(t, n) {
                        if (e.case_insensitive) {
                            n = n.toLowerCase()
                        };
                        n.split(" ").forEach(function(e) {
                            var n = e.split("|");
                            a[n[0]] = [ t, n[1] ? Number(n[1]) : 1 ];
                        });
                    };
                    typeof o.keywords == "string" ? u("keyword", o.keywords) : Object.keys(o.keywords).forEach(function(e) {
                        u(e, o.keywords[e]);
                    });
                    o.keywords = a;
                }
                o.lexemesRe = n(o.lexemes || /\b\w+\b/, !0);
                if (i) {
                    o.beginKeywords && (o.begin = "\\b(" + o.beginKeywords.split(" ").join("|") + ")\\b"), 
                    o.begin || (o.begin = /\B|\b/), o.beginRe = n(o.begin), o.end || o.endsWithParent || (o.end = /\B|\b/), 
                    o.end && (o.endRe = n(o.end)), o.terminator_end = t(o.end) || "", o.endsWithParent && i.terminator_end && (o.terminator_end += (o.end ? "|" : "") + i.terminator_end)
                };
                if (o.illegal) {
                    o.illegalRe = n(o.illegal)
                };
                if (o.relevance === void 0) {
                    o.relevance = 1
                };
                o.contains || (o.contains = []);
                var l = [];
                o.contains.forEach(function(e) {
                    e.variants ? e.variants.forEach(function(t) {
                        l.push(s(e, t));
                    }) : l.push(e == "self" ? o : e);
                });
                o.contains = l;
                o.contains.forEach(function(e) {
                    r(e, o);
                });
                if (o.starts) {
                    r(o.starts, i)
                };
                var c = o.contains.map(function(e) {
                    if (e.beginKeywords) {
                        return "\\.?(" + e.begin + ")\\.?";
                    }
                    return e.begin;
                }).concat([ o.terminator_end, o.illegal ]).map(t).filter(Boolean);
                o.terminators = c.length ? n(c.join("|"), !0) : {
                    exec: function() {
                        return null;
                    }
                };
            }
        }
        r(e);
    }
    function c(e, n, o, i) {
        function s(e, t) {
            for (var n = 0; n < t.contains.length; n++) {
                if (r(t.contains[n].beginRe, e)) {
                    return t.contains[n];
                }
            }
        }
        function a(e, t) {
            if (r(e.endRe, t)) {
                for (;e.endsParent && e.parent; ) {
                    e = e.parent;
                }
                return e;
            }
            if (e.endsWithParent) {
                return a(e.parent, t);
            }
            return;
        }
        function u(e, t) {
            return !o && r(t.illegalRe, e);
        }
        function d(e, t) {
            var n = y.case_insensitive ? t[0].toLowerCase() : t[0];
            return e.keywords.hasOwnProperty(n) && e.keywords[n];
        }
        function h(e, t, n, r) {
            var o = r ? "" : w.classPrefix, i = '<span class="' + o, s = n ? "" : "</span>";
            i += e + '">';
            return i + t + s;
        }
        function f() {
            if (!C.keywords) {
                return t(S);
            }
            var e = "", n = 0;
            C.lexemesRe.lastIndex = 0;
            for (var r = C.lexemesRe.exec(S); r; ) {
                e += t(S.substr(n, r.index - n));
                var o = d(C, r);
                o ? (D += o[1], e += h(o[0], t(r[0]))) : e += t(r[0]);
                n = C.lexemesRe.lastIndex;
                r = C.lexemesRe.exec(S);
            }
            return e + t(S.substr(n));
        }
        function m() {
            var e = typeof C.subLanguage == "string";
            if (e && !k[C.subLanguage]) {
                return t(S);
            }
            var n = e ? c(C.subLanguage, S, !0, E[C.subLanguage]) : p(S, C.subLanguage.length ? C.subLanguage : void 0);
            if (C.relevance > 0) {
                D += n.relevance
            };
            if (e) {
                E[C.subLanguage] = n.top
            };
            return h(n.language, n.value, !1, !0);
        }
        function g() {
            if (void 0 !== C.subLanguage) {
                return m();
            }
            return f();
        }
        function v(e, n) {
            var r = e.className ? h(e.className, "", !0) : "";
            e.returnBegin ? (T += r, S = "") : e.excludeBegin ? (T += t(n) + r, S = "") : (T += r, 
            S = n);
            C = Object.create(e, {
                parent: {
                    value: C
                }
            });
        }
        function b(e, n) {
            S += e
            if (n === void 0) {
                T += g();
                return 0;
            }
            var r = s(n, C);
            if (r) {
                T += g();
                v(r, n);
                if (r.returnBegin) {
                    return 0;
                }
                return n.length;
            }
            var o = a(C, n);
            if (o) {
                var i = C;
                i.returnEnd || i.excludeEnd || (S += n);
                T += g();
                do {
                    if (C.className) {
                        T += "</span>"
                    };
                    D += C.relevance;
                    C = C.parent;
                } while (C != o.parent);
                if (i.excludeEnd) {
                    T += t(n)
                };
                S = "";
                if (o.starts) {
                    v(o.starts, "")
                };
                if (i.returnEnd) {
                    return 0;
                }
                return n.length;
            }
            if (u(n, C)) {
                throw new Error('Illegal lexeme "' + n + '" for mode "' + (C.className || "<unnamed>") + '"');
            }
            S += n;
            return n.length || 1;
        }
        var y = _(e);
        if (!y) {
            throw new Error('Unknown language: "' + e + '"');
        }
        l(y);
        var x, C = i || y, E = {}, T = "";
        for (x = C; x != y; x = x.parent) {
            if (x.className) {
                T = h(x.className, "", !0) + T
            };
        }
        var S = "", D = 0;
        try {
            for (var A, M, F = 0; ;) {
                C.terminators.lastIndex = F
                A = C.terminators.exec(n)
                if (!A) {
                    break;
                }
                M = b(n.substr(F, A.index - F), A[0]);
                F = A.index + M;
            }
            for (b(n.substr(F)), x = C; x.parent; x = x.parent) {
                if (x.className) {
                    T += "</span>"
                };
            }
            return {
                relevance: D,
                value: T,
                language: e,
                top: C
            };
        } catch (N) {
            if (-1 != N.message.indexOf("Illegal")) return {
                relevance: 0,
                value: t(n)
            };
            throw N;
        }
    }
    function p(e, n) {
        n = n || w.languages || Object.keys(k);
        var r = {
            relevance: 0,
            value: t(e)
        }, o = r;
        n.forEach(function(t) {
            if (_(t)) {
                var n = c(t, e, !1);
                n.language = t;
                if (n.relevance > o.relevance) {
                    o = n
                };
                if (n.relevance > r.relevance) {
                    o = r, r = n
                };
            }
        });
        if (o.language) {
            r.second_best = o
        };
        return r;
    }
    function d(e) {
        if (w.tabReplace) {
            e = e.replace(/^((<[^>]+>|\t)+)/gm, function(e, t) {
                return t.replace(/\t/g, w.tabReplace);
            })
        };
        if (w.useBR) {
            e = e.replace(/\n/g, "<br>")
        };
        return e;
    }
    function h(e, t, n) {
        var r = t ? x[t] : n, o = [ e.trim() ];
        e.match(/\bhljs\b/) || o.push("hljs");
        if (e.indexOf(r) === -1) {
            o.push(r)
        };
        return o.join(" ").trim();
    }
    function f(e) {
        var t = i(e);
        if (!o(t)) {
            var n;
            w.useBR ? (n = document.createElementNS("http://www.w3.org/1999/xhtml", "div"), 
            n.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ \/]*>/g, "\n")) : n = e;
            var r = n.textContent, s = t ? c(t, r, !0) : p(r), l = a(n);
            if (l.length) {
                var f = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
                f.innerHTML = s.value;
                s.value = u(l, a(f), r);
            }
            s.value = d(s.value);
            e.innerHTML = s.value;
            e.className = h(e.className, t, s.language);
            e.result = {
                language: s.language,
                re: s.relevance
            };
            if (s.second_best) {
                e.second_best = {
                    language: s.second_best.language,
                    re: s.second_best.relevance
                }
            };
        }
    }
    function m(e) {
        w = s(w, e);
    }
    function g() {
        if (!g.called) {
            g.called = !0;
            var e = document.querySelectorAll("pre code");
            Array.prototype.forEach.call(e, f);
        }
    }
    function v() {
        addEventListener("DOMContentLoaded", g, !1);
        addEventListener("load", g, !1);
    }
    function b(t, n) {
        var r = k[t] = n(e);
        if (r.aliases) {
            r.aliases.forEach(function(e) {
                x[e] = t;
            })
        };
    }
    function y() {
        return Object.keys(k);
    }
    function _(e) {
        e = e.toLowerCase();
        return k[e] || k[x[e]];
    }
    var w = {
        classPrefix: "hljs-",
        tabReplace: null,
        useBR: !1,
        languages: void 0
    }, k = {}, x = {};
    e.highlight = c;
    e.highlightAuto = p;
    e.fixMarkup = d;
    e.highlightBlock = f;
    e.configure = m;
    e.initHighlighting = g;
    e.initHighlightingOnLoad = v;
    e.registerLanguage = b;
    e.listLanguages = y;
    e.getLanguage = _;
    e.inherit = s;
    e.IDENT_RE = "[a-zA-Z]\\w*";
    e.UNDERSCORE_IDENT_RE = "[a-zA-Z_]\\w*";
    e.NUMBER_RE = "\\b\\d+(\\.\\d+)?";
    e.C_NUMBER_RE = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
    e.BINARY_NUMBER_RE = "\\b(0b[01]+)";
    e.RE_STARTERS_RE = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
    e.BACKSLASH_ESCAPE = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    };
    e.APOS_STRING_MODE = {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [ e.BACKSLASH_ESCAPE ]
    };
    e.QUOTE_STRING_MODE = {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [ e.BACKSLASH_ESCAPE ]
    };
    e.PHRASAL_WORDS_MODE = {
        begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
    };
    e.COMMENT = function(t, n, r) {
        var o = e.inherit({
            className: "comment",
            begin: t,
            end: n,
            contains: []
        }, r || {});
        o.contains.push(e.PHRASAL_WORDS_MODE);
        o.contains.push({
            className: "doctag",
            begin: "(?:TODO|FIXME|NOTE|BUG|XXX):",
            relevance: 0
        });
        return o;
    };
    e.C_LINE_COMMENT_MODE = e.COMMENT("//", "$");
    e.C_BLOCK_COMMENT_MODE = e.COMMENT("/\\*", "\\*/");
    e.HASH_COMMENT_MODE = e.COMMENT("#", "$");
    e.NUMBER_MODE = {
        className: "number",
        begin: e.NUMBER_RE,
        relevance: 0
    };
    e.C_NUMBER_MODE = {
        className: "number",
        begin: e.C_NUMBER_RE,
        relevance: 0
    };
    e.BINARY_NUMBER_MODE = {
        className: "number",
        begin: e.BINARY_NUMBER_RE,
        relevance: 0
    };
    e.CSS_NUMBER_MODE = {
        className: "number",
        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
        relevance: 0
    };
    e.REGEXP_MODE = {
        className: "regexp",
        begin: /\//,
        end: /\/[gimuy]*/,
        illegal: /\n/,
        contains: [ e.BACKSLASH_ESCAPE, {
            begin: /\[/,
            end: /\]/,
            relevance: 0,
            contains: [ e.BACKSLASH_ESCAPE ]
        } ]
    };
    e.TITLE_MODE = {
        className: "title",
        begin: e.IDENT_RE,
        relevance: 0
    };
    e.UNDERSCORE_TITLE_MODE = {
        className: "title",
        begin: e.UNDERSCORE_IDENT_RE,
        relevance: 0
    };
    return e;
});