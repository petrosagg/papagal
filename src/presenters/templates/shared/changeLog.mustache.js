var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<table class='changelog'>");
        r.b("\n" + n);
        r.b("  <tr>");
        r.b("\n" + n);
        r.b("    <th>Field</td>");
        r.b("\n" + n);
        r.b("    <th>Old value</td>");
        r.b("\n" + n);
        r.b("    <th>New value</td>");
        r.b("\n" + n);
        r.b("  </tr>");
        r.b("\n" + n);
        if (r.s(r.f("changeLog", e, t, 1), e, t, 0, 120, 213, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <tr>");
                r.b("\n" + n);
                r.b("    <td>");
                r.b(r.v(r.f("field", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("    <td>");
                r.b(r.v(r.f("old_value", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("    <td>");
                r.b(r.v(r.f("new_value", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("  </tr>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</table>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<table class='changelog'>\n  <tr>\n    <th>Field</td>\n    <th>Old value</td>\n    <th>New value</td>\n  </tr>\n{{#changeLog}}\n  <tr>\n    <td>{{field}}</td>\n    <td>{{old_value}}</td>\n    <td>{{new_value}}</td>\n  </tr>\n{{/changeLog}}\n</table>", r);