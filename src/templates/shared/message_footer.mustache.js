var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<footer class='msg-footer'>");
        r.b("\n" + n);
        r.b("  ");
        if (r.s(r.f("editTime", e, t, 1), e, t, 0, 43, 57, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.t(n.f("editTime", e, t, 0)));
            }), e.pop()
        };
        r.b("\n" + n);
        r.b("  <ul class='tags'>");
        r.b("\n" + n);
        if (r.s(r.f("tags", e, t, 1), e, t, 0, 104, 140, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <li class='tag'>");
                r.b(r.v(r.d(".", e, t, 0)));
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("  <ul class='emoji-reactions'>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</footer>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<footer class='msg-footer'>\n  {{#editTime}}{{& editTime}}{{/editTime}}\n  <ul class='tags'>\n    {{#tags}}\n    <li class='tag'>{{.}}</li>\n    {{/tags}}\n  </ul>\n  <ul class='emoji-reactions'>\n  </ul>\n</footer>\n", r);