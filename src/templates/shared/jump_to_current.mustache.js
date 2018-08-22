var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='jump-to-current below'>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-arrow-down'></i>");
        r.b("\n" + n);
        r.b("  <span>Jump to present</span>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='jump-to-current below'>\n  <i class='fa fa-arrow-down'></i>\n  <span>Jump to present</span>\n</div>\n", r);