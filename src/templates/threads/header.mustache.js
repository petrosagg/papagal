var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='thread-actions dropdown sw'></div>");
        r.b("\n" + n);
        r.b("<div class='thread-title'></div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='thread-actions dropdown sw'></div>\n<div class='thread-title'></div>\n", r);