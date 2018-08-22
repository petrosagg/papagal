var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<table class='property-list'>");
        r.b("\n" + n);
        if (r.s(r.f("propertyList", e, t, 1), e, t, 0, 47, 110, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <tr>");
                r.b("\n" + n);
                r.b("    <td>");
                r.b(r.v(r.f("key", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("    <td>");
                r.b(r.t(r.f("value", e, t, 0)));
                r.b("</td>");
                r.b("\n" + n);
                r.b("  </tr>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</table>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<table class='property-list'>\n{{#propertyList}}\n  <tr>\n    <td>{{key}}</td>\n    <td>{{& value }}</td>\n  </tr>\n{{/propertyList}}\n</table>\n", r);