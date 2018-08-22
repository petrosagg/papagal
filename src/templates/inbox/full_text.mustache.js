var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<input type='text'>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<input type='text'>\n", r);