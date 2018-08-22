var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("Error loading messages.");
        r.b("\n" + n);
        r.b("<span>");
        r.b("\n" + n);
        r.b("  <a href='#'>Retry</a>");
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "Error loading messages.\n<span>\n  <a href='#'>Retry</a>\n</span>\n", r);