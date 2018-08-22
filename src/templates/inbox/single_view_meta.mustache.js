var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("avatar", e, t, 1), e, t, 0, 11, 96, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<div class='single-message-avatar' style='background-image: url(");
                r.b(r.v(r.f("avatar", e, t, 0)));
                r.b(")'></div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("<div class='meta-content'>");
        r.b("\n" + n);
        r.b("  <span class='single-message-author'>");
        r.b(r.rp("<author0", e, t, ""));
        r.b("</span>");
        r.b("\n" + n);
        r.b("  ");
        r.b(r.t(r.f("timestamp", e, t, 0)));
        r.b("\n" + n);
        r.b("  <ul class='items'>");
        r.b("\n" + n);
        if (r.s(r.f("meta", e, t, 1), e, t, 0, 245, 412, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <li class='item'>");
                r.b("\n" + n);
                if (r.s(r.f("link", e, t, 1), e, t, 0, 283, 328, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <a href='");
                        r.b(r.v(r.f("link", e, t, 0)));
                        r.b("'>");
                        r.b(r.v(r.f("text", e, t, 0)));
                        r.b("</a>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.f("link", e, t, 1), e, t, 1, 0, 0, "") || (r.b("      <span>"), r.b(r.v(r.f("text", e, t, 0))), 
                r.b("</span>"), r.b("\n" + n));
                r.b("    </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<author0": {
            name: "author",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{#avatar}}\n<div class='single-message-avatar' style='background-image: url({{avatar}})'></div>\n{{/avatar}}\n<div class='meta-content'>\n  <span class='single-message-author'>{{> author}}</span>\n  {{& timestamp}}\n  <ul class='items'>\n    {{#meta}}\n    <li class='item'>\n      {{#link}}\n      <a href='{{link}}'>{{text}}</a>\n      {{/link}}\n      {{^link}}\n      <span>{{text}}</span>\n      {{/link}}\n    </li>\n    {{/meta}}\n  </ul>\n</div>\n", r);