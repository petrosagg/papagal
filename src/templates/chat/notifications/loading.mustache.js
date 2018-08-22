var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.rp("<spinner0", e, t, ""));
        return r.fl();
    },
    partials: {
        "<spinner0": {
            name: "spinner",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{> spinner}}\n", r);