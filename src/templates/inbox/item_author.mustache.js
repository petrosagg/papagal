var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("hasAuthor", e, t, 1), e, t, 0, 14, 295, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                if (r.s(r.d("author.partial", e, t, 1), e, t, 0, 34, 56, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b(r.t(r.d("author.partial", e, t, 0)));
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.d("author.partial", e, t, 1), e, t, 1, 0, 0, "") || (r.s(r.f("linkify_author", e, t, 1), e, t, 0, 115, 162, "{{ }}") && (r.rs(e, t, function(e, t, r) {
                    r.b("<a href='");
                    r.b(r.v(r.d("author.link", e, t, 0)));
                    r.b("'>");
                    r.b(r.v(r.d("author.name", e, t, 0)));
                    r.b("</a>");
                    r.b("\n" + n);
                }), e.pop()), r.s(r.f("linkify_author", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<strong class='author-name'>"), 
                r.b(r.v(r.d("author.name", e, t, 0))), r.b("</strong>"), r.b("\n" + n)));
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#hasAuthor}}\n{{#author.partial}}\n{{& author.partial}}\n{{/author.partial}}\n{{^author.partial}}\n{{#linkify_author}}\n<a href='{{author.link}}'>{{author.name}}</a>\n{{/linkify_author}}\n{{^linkify_author}}\n<strong class='author-name'>{{author.name}}</strong>\n{{/linkify_author}}\n{{/author.partial}}\n{{/hasAuthor}}\n", r);