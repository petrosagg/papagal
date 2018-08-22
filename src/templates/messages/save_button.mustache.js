var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='save-message' title=\"Click to save. Press 'Esc' to cancel.\">");
        r.b("\n" + n);
        r.b(r.rp("<checkSVGIcon0", e, t, "  "));
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<checkSVGIcon0": {
            name: "checkSVGIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<a class='save-message' title=\"Click to save. Press 'Esc' to cancel.\">\n  {{> checkSVGIcon}}\n</a>\n", r);