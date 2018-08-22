var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='external' href='");
        r.b(r.v(r.d("file.path", e, t, 0)));
        r.b("' target='_blank' rel='noopener noreferrer'>");
        r.b("\n" + n);
        r.b("  <div class='icon ");
        r.b(r.v(r.d("file.type", e, t, 0)));
        r.b("'></div>");
        r.b("\n" + n);
        r.b("  <span class='file-properties'>");
        r.b("\n" + n);
        if (r.s(r.f("meta", e, t, 1), e, t, 0, 171, 189, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    ");
                r.b(r.v(r.f("text", e, t, 0)));
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </span>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='external' href='{{file.path}}' target='_blank' rel='noopener noreferrer'>\n  <div class='icon {{file.type}}'></div>\n  <span class='file-properties'>\n    {{#meta}}\n    {{text}}\n    {{/meta}}\n  </span>\n</a>\n", r);