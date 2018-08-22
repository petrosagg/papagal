var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("Load more messages");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "Load more messages\n", r);