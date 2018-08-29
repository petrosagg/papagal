var r, o, i;

i = require("../lib/syntax_highlight");

o = /(^|\n)((?:[ ]{4}|\t).*\n?)+/g;

r = /(^|\n)(?:[ ]{4}|\t)/g;

Helpers.IndentationHelper = {
    indented: function(e) {
        return e.search(r) >= 0;
    },
    pasteRegion: function(e) {
        var t, n, r, o, i, s, a, u, l, c, p, d, h, f, m;
        m = e.text;
        d = e.start;
        t = e.end;
        if (m.slice(d, t).split("\n").length <= 1) {
            return {
                text: m,
                start: d,
                end: t
            };
        }
        p = this.dropLeadingWhitespace(m, d, t);
        m = p.text;
        d = p.start;
        t = p.end;
        l = m.slice(d, t);
        s = m.match(/(^|\n)```/) ? false : !!l.match(/\n/) && SourceDetector.detect(l);
        h = d > 0 ? m.slice(0, +(d - 1) + 1 || 9e9).split("\n").slice(-1)[0] : "";
        o = h.match(/(^|\n)[\s]{4}$/);
        if (o) {
            d -= o[0].length, s = true
        }
        if (s) {
            c = m.slice(0, d), f = m.slice(t, m.length), n = o && (a = f[0]) && "\n" !== a, 
            i = l.split("\n"), r = i.map(function(e, t) {
                if (t === i.length - 1 && e.trim().length === 0) {
                    return e;
                }
                return "    " + e;
            }).join("\n"), u = r[r.length - 1], "\n" !== u && (r += "\n", f[0] === "\n" && (f = f.slice(1, f.length))), 
            h.trim().length > 0 && (r = "\n" + r), n && (r += "    "), 0 !== d && (c += "\n"), 
            m = c + r + f, t = c.length + r.length
        };
        return {
            text: m,
            start: d,
            end: t
        };
    },
    dropLeadingWhitespace: function(e, t, n) {
        var r, o, i, s;
        s = e.slice(t, n);
        r = null;
        o = s.replace(/\t/g, "    ").split("\n");
        o.forEach(function(e) {
            var t, n;
            if ((n = e.match(/(^\s*)/)) && (t = e.length === n[1].length, !t && (r === null || n[1].length < r.length))) {
                return r = n[1];
            }
            return;
        });
        i = r && r.length > 0 ? o.map(function(e) {
            return e.slice(r.length, e.length);
        }).join("\n") : o.join("\n");
        e = e.slice(0, t) + i + e.slice(n, e.length);
        return {
            end: n + (i.length - s.length),
            start: t,
            text: e
        };
    },
    highlight: function(e) {
        var t;
        t = document.createElement("div");
        t.innerHTML = e;
        return i.highlightAuto(t.textContent);
    },
    formatIndented: function(e) {
        var t;
        try {
            return e.replace(o, function(e) {
                var t, n;
                e = e.replace(/^\n/, "").replace(r, function(e, t) {
                    if (t === "\n") {
                        return t;
                    }
                    return "";
                });
                t = SourceDetector.detect(e) ? (n = Helpers.IndentationHelper.highlight(e), e = n.value, 
                " code " + n.language) : "";
                if ($.trim(e).length === 0) {
                    return "";
                }
                return "<pre class='formatted" + t + "' data-no-text-emoji><code>" + e + "</code></pre>";
            }).replace(/\n/g, "<br />").replace(/[ ]{2}/g, " &nbsp;");
        } catch (n) {
            return t = n, e;
        }
    }
};
