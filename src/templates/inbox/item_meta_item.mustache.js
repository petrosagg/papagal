var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<li class='item'>");
        r.b("\n" + n);
        if (r.s(r.f("linkify_meta", e, t, 1), e, t, 0, 37, 74, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <a href='");
                r.b(r.v(r.f("link", e, t, 0)));
                r.b("'>");
                r.b(r.v(r.f("text", e, t, 0)));
                r.b("</a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("linkify_meta", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <span>"), r.b(r.v(r.f("text", e, t, 0))), 
        r.b("</span>"), r.b("\n" + n));
        r.b("</li>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<li class='item'>\n  {{#linkify_meta}}\n  <a href='{{link}}'>{{text}}</a>\n  {{/linkify_meta}}\n  {{^linkify_meta}}\n  <span>{{text}}</span>\n  {{/linkify_meta}}\n</li>\n", r);