var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='stripe'>");
        r.b("\n" + n);
        r.b("  <div class='error'>");
        r.b("\n" + n);
        r.b("    Error fetching organizations. Please try again.");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='stripe'>\n  <div class='error'>\n    Error fetching organizations. Please try again.\n  </div>\n</div>\n", r);