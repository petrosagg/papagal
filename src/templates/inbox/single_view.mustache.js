var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='thread-close-button'></a>");
        r.b("\n" + n);
        r.b("<header class='floating-header'></header>");
        r.b("\n" + n);
        r.b("<section class='single-view-content'>");
        r.b("\n" + n);
        r.b("  <div class='single-view-content-wrap'>");
        r.b("\n" + n);
        r.b("    <div class='single-view-body'>");
        r.b("\n" + n);
        r.b("      <header class='static-header'></header>");
        r.b("\n" + n);
        r.b("    </div>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n" + n);
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
}, "<a class='thread-close-button'></a>\n<header class='floating-header'></header>\n<section class='single-view-content'>\n  <div class='single-view-content-wrap'>\n    <div class='single-view-body'>\n      <header class='static-header'></header>\n    </div>\n  </div>\n</section>\n{{> spinner}}\n", r);