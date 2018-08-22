var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.t(r.f("body", e, t, 0)));
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{& body}}", r);