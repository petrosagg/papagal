var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("fields", e, t, 1), e, t, 0, 11, 99, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<tr>");
                r.b("\n" + n);
                r.b("  <td class='label'>");
                r.b(r.t(r.f("label", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("  <td class='value'>");
                r.b(r.t(r.f("value", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("</tr>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#fields}}\n<tr>\n  <td class='label'>{{& label }}</td>\n  <td class='value'>{{& value }}</td>\n</tr>\n{{/fields}}\n", r);