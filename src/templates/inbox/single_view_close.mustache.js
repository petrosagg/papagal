var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='close-icon' title='Try closing with ESC-ESC'>");
        r.b("\n" + n);
        r.b(r.rp("<closeIcon0", e, t, "  "));
        r.b("</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<closeIcon0": {
            name: "closeIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<span class='close-icon' title='Try closing with ESC-ESC'>\n  {{>closeIcon}}\n</span>\n", r);