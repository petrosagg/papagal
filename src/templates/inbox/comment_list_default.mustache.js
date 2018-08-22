var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='help-message'>");
        r.b("\n" + n);
        r.b("  <div class='help-message-subtitle'>");
        r.b("\n" + n);
        r.b("    Tip: ");
        r.b(r.t(r.f("tip", e, t, 0)));
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='help-message'>\n  <div class='help-message-subtitle'>\n    Tip: {{& tip }}\n  </div>\n</div>\n", r);