var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a>");
        r.b("\n" + n);
        if (r.s(r.f("icon", e, t, 1), e, t, 0, 15, 57, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <i class='option-icon ");
                r.b(r.v(r.f("icon", e, t, 0)));
                r.b("'></i>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("iconUrl", e, t, 1), e, t, 0, 81, 157, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <i class='option-icon' style='background-image: url(");
                r.b(r.v(r.f("iconUrl", e, t, 0)));
                r.b(")'></i>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  <span class='id'>");
        r.b(r.v(r.f("tag", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        if (r.s(r.f("count", e, t, 1), e, t, 0, 216, 258, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <span class='count'>");
                r.b(r.v(r.f("count", e, t, 0)));
                r.b("</span>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a>\n  {{#icon}}\n  <i class='option-icon {{icon}}'></i>\n  {{/icon}}\n  {{#iconUrl}}\n  <i class='option-icon' style='background-image: url({{iconUrl}})'></i>\n  {{/iconUrl}}\n  <span class='id'>{{tag}}</span>\n  {{#count}}\n  <span class='count'>{{count}}</span>\n  {{/count}}\n</a>\n", r);