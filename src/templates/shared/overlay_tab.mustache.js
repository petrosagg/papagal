var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<li class='overlay-tab' rel='");
        r.b(r.v(r.f("rel", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b(r.rp("<icon0", e, t, "  "));
        r.b("  ");
        r.b(r.v(r.f("title", e, t, 0)));
        r.b("\n" + n);
        r.b("</li>");
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
}, "<li class='overlay-tab' rel='{{rel}}'>\n  {{> icon}}\n  {{title}}\n</li>\n", r);