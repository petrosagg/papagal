var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='org-link'>");
        r.b("\n" + n);
        r.b("  <span class='org-name'>");
        r.b(r.v(r.f("title", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        if (r.s(r.f("url", e, t, 1), e, t, 0, 75, 238, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <a class='external-link' href='");
                r.b(r.v(r.f("url", e, t, 0)));
                r.b("' target='_blank' rel='noopener noreferrer' title='Manage organization'>");
                r.b("\n" + n);
                r.b("    <i class='fa fa-external-link'></i>");
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</div>");
        r.b("\n" + n);
        r.b("<ol class='org-flows'></ol>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='org-link'>\n  <span class='org-name'>{{title}}</span>\n  {{#url}}\n  <a class='external-link' href='{{url}}' target='_blank' rel='noopener noreferrer' title='Manage organization'>\n    <i class='fa fa-external-link'></i>\n  </a>\n  {{/url}}\n</div>\n<ol class='org-flows'></ol>\n", r);