var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<span class="unsent">');
        r.b("\n" + n);
        r.b("  Message too long or invalid");
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<span class="unsent">\n  Message too long or invalid\n</span>\n', r);