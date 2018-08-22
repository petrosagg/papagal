var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='jump-to-marker above icon-arrow-up-3'>");
        r.b("\n" + n);
        r.b("  <span data-marker-jump>Jump to last read message</span>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-times remove-marker' data-marker-remove></i>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='jump-to-marker above icon-arrow-up-3'>\n  <span data-marker-jump>Jump to last read message</span>\n  <i class='fa fa-times remove-marker' data-marker-remove></i>\n</div>\n", r);