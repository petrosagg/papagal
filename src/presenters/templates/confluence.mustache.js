var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<p>");
        r.b(r.t(r.f("body", e, t, 0)));
        r.b("</p>");
        r.b("\n" + n);
        if (r.s(r.f("diff", e, t, 1), e, t, 0, 27, 119, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b('  <table class="diff">');
                r.b("\n" + n);
                r.b("    <tr>");
                r.b("\n" + n);
                r.b("      <th>Changes:<th>");
                r.b("\n" + n);
                r.b("    </tr>");
                r.b("\n" + n);
                r.b("    ");
                r.b(r.t(r.f("diff", e, t, 0)));
                r.b("\n" + n);
                r.b("  </table>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<p>{{& body}}</p>\n{{#diff}}\n  <table class="diff">\n    <tr>\n      <th>Changes:<th>\n    </tr>\n    {{& diff}}\n  </table>\n{{/diff}}\n', r);