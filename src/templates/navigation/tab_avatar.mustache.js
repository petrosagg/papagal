var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.s(r.f("isPrivate", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<div class='tab-avatar-container'>"), 
        r.b("\n" + n), r.b("  <div class='tab-avatar'>"), r.b("\n" + n), r.b("    "), r.s(r.f("initials", e, t, 1), e, t, 0, 94, 132, "{{ }}") && (r.rs(e, t, function(e, t, n) {
            n.b("<span class='tab-initial'>");
            n.b(n.v(n.d(".", e, t, 0)));
            n.b("</span>");
        }), e.pop()), r.b("\n" + n), r.b("  </div>"), r.b("\n" + n), r.b("</div>"), r.b("\n" + n));
        if (r.s(r.f("isPrivate", e, t, 1), e, t, 0, 191, 307, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b('<div class="rounded-avatar">');
                r.b("\n" + n);
                r.b("  <div class='tab-avatar' style='background-image: url(");
                r.b(r.v(r.f("avatar", e, t, 0)));
                r.b(");'>");
                r.b("\n" + n);
                r.b("  </div>");
                r.b("\n" + n);
                r.b("</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{^isPrivate}}\n<div class='tab-avatar-container'>\n  <div class='tab-avatar'>\n    {{#initials}}<span class='tab-initial'>{{.}}</span>{{/initials}}\n  </div>\n</div>\n{{/isPrivate}}\n{{#isPrivate}}\n<div class=\"rounded-avatar\">\n  <div class='tab-avatar' style='background-image: url({{avatar}});'>\n  </div>\n</div>\n{{/isPrivate}}\n", r);