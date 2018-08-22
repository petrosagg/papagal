var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.rp("<icon0", e, t, ""));
        r.b("<div class='title-body'>");
        r.b("\n" + n);
        r.b("  ");
        r.b(r.t(r.f("body", e, t, 0)));
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<icon0": {
            name: "icon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{> icon}}\n<div class='title-body'>\n  {{& body }}\n</div>\n", r);