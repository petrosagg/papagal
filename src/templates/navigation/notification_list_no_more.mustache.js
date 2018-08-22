var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<li class='no-more'>");
        r.b("\n" + n);
        r.b("  No more notifications.");
        r.b("\n" + n);
        r.b("</li>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<li class='no-more'>\n  No more notifications.\n</li>\n", r);