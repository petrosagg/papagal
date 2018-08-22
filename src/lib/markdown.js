var r, o, i, s, a, u, l, c, p, d, h, f, m, g = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

a = require("../lib/syntax_highlight");

u = require("markdown-it");

o = require("lib/markdown/text_renderer");

m = new o();

l = u({
    breaks: !0,
    linkify: !0,
    langPrefix: "",
    highlight: function(e, t) {
        if (t && a.getLanguage(t)) {
            try {
                a.highlight(t, e).value;
            } catch (n) {}
        }
        try {
            return a.highlightAuto(e).value;
        } catch (n) {
            return null;
        }
    }
}).disable([ "heading", "table", "hr", "image", "entity" ]).use(require("markdown-it-flowdock"));

i = u("zero").enable([ "backticks", "code", "fence" ]);

d = l.renderer.rules.code_inline;

p = l.renderer.rules.code_block;

h = l.renderer.rules.fence;

l.renderer.rules.fence = function(e, t, n, r, o) {
    return h(e, t, n, r, o).toString().replace(/^<pre>/, "<pre class='formatted code' data-no-text-emoji>");
};

l.renderer.rules.code_inline = function(e, t) {
    return d(e, t).replace(/^<code>/, "<code data-no-text-emoji>");
};

l.renderer.rules.code_block = function(e, t, n, r) {
    if (SourceDetector.detect(e[t].content)) {
        return l.renderer.rules.fence(e, t, n, r, l.renderer);
    }
    return p(e, t, n, r).replace(/^<pre>/, "<pre class='formatted' data-no-text-emoji>");
};

l.renderer.rules.mention = function(e, t, n, r) {
    var o, i, s, a, u, l, c, p;
    u = e[t].markup;
    c = e[t].content;
    if (r.groups && c[0] === "@") {
        o = r.groups.getByHandle(c.slice(1));
        if (o) {
            s = o.isMember(Flowdock.app.user) ? "highlight" : "";
            return "<a data-group='@" + c + "' class='tag mention " + s + "'>" + u + c + "</a>";
        }
        return u + c;
    }
    l = "@" + c.toLowerCase();
    a = g.call(Collections.Tags.teamTags, l) >= 0;
    if (g.call(Collections.Tags.everyoneTags, l) >= 0 || a) {
        s = !a || r.inTeam ? "highlight" : "";
        return "<a data-tag-search='" + l + "' class='tag mention " + s + "'>" + u + c + "</a>";
    }
    p = _.find(r.users, function(e) {
        var t;
        return ((t = e.nick) != null ? t.toLowerCase() : void 0) === c.toLowerCase();
    });
    if (p) {
        i = p.id === Flowdock.app.user.id ? "highlight" : "";
        return "<a data-user='" + p.id + "' class='tag mention " + i + "'>" + u + c + "</a>";
    }
    return u + c;
};

l.renderer.rules.hashtag = function(e, t, n, r) {
    var o, i, s;
    s = e[t].content;
    i = e[t].markup;
    o = Helpers.absoluteUrlFor({
        flow: n.flowPath
    }) + "?filter=all&tags=" + s;
    return "<a href='" + o + "' data-tag-search='" + s + "' class='tag'>" + i + s + "</a>";
};

c = function(e) {
    var t;
    if (e.match(/^[a-zA-Z\-]+:/)) {
        return e;
    }
    if (t = l.linkify.match(e)) {
        return t[0].url;
    }
    return "http://" + e;
};

l.renderer.rules.link_open = function(e, t, n, r) {
    var o, i, s;
    s = e[t];
    s.attrs = function() {
        var e, t, n, r;
        for (n = s.attrs, r = [], e = 0, t = n.length; t > e; e++) {
            o = n[e];
            o[0] === "href" ? (i = c(o[1]), r.push([ "href", i ])) : r.push(o);
        }
        return r;
    }();
    s.attrs.push([ "class", "external embeddable" ]);
    if (i != null) {
        s.attrs.push([ "title", i ])
    };
    return l.renderer.renderToken(e, t, n, r);
};

s = function(e) {
    var t, n, r, o, i, s, a, u, l;
    for (t = {}, r = 0, i = e.length; i > r; r++) {
        l = e[r];
        if ((s = l.type) === "fence" || s === "code_block") {
            for (n = o = a = l.map[0], u = l.map[1]; u >= a ? u > o : o > u; n = u >= a ? ++o : --o) {
                t[n] = !0;
            }
        }
    }
    return t;
};

f = function(e) {
    var t, n, r, o, s;
    for (o = "", r = i.parseInline(e)[0].children, t = 0, n = r.length; n > t; t++) {
        s = r[t];
        o += s.type === "code_inline" ? s.markup + s.content + s.markup : emojimoji(s.markup + s.content);
    }
    return o;
};

module.exports = r = {
    replaceEmojiInline: f,
    replaceEmoji: function(e) {
        var t, n, r, o, a;
        a = i.parse(e, {});
        t = s(a);
        o = function() {
            var o, i, s, a;
            for (s = e.split("\n"), a = [], n = o = 0, i = s.length; i > o; n = ++o) {
                r = s[n];
                t[n] ? a.push(r) : a.push(f(r));
            }
            return a;
        }();
        return o.join("\n");
    },
    tags: function(e) {
        var t, n, r, o, i, s, a, u, l;
        for (u = [], n = 0, o = e.length; o > n; n++) {
            l = e[n];
            if (l.type === "inline") {
                for (s = l.children, r = 0, i = s.length; i > r; r++) {
                    t = s[r];
                    if ((a = t.type) === "mention" || a === "hashtag") {
                        t.type === "mention" ? u.push("@" + t.content) : t.type === "hashtag" && u.push("#" + t.content)
                    };
                }
            }
        }
        return u;
    },
    parse: function(e, t) {
        return l.parse(e, t || {});
    },
    text: function(e) {
        return m.render(e, {}, {}).trim();
    },
    render: function(e, t) {
        return l.render(e, t).replace(/[ ]{2}/g, " &nbsp;").replace(/\n+$/, "");
    },
    renderInline: function(e, t) {
        return l.renderInline(e, t).replace(/[ ]{2}/g, " &nbsp;").replace(/\n+$/, "");
    }
};
