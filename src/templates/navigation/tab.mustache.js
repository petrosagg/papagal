var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='tab-link' href='");
        r.b(r.v(r.f("link", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b(r.rp("<avatar0", e, t, "  "));
        r.b("  <span class='tab-name'>");
        r.b(r.v(r.f("name", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("  <i class='activity-indicator'>");
        r.b(r.v(r.f("count", e, t, 0)));
        r.b("</i>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<avatar0": {
            name: "avatar",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<a class='tab-link' href='{{link}}'>\n  {{> avatar}}\n  <span class='tab-name'>{{name}}</span>\n  <i class='activity-indicator'>{{count}}</i>\n</a>\n", r);