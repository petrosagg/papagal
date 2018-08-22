var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='toolbar-toggle'>");
        r.b("\n" + n);
        r.b(r.rp("<icon0", e, t, "  "));
        r.b("  <i class='fa fa-lock'></i>");
        r.b("\n" + n);
        r.b("  <span class='count'><span class='count-online'>0</span><span class='count-rest'>/<span class='count-total'>0</span></span>");
        r.b("\n" + n);
        r.b("  <span class='count-description'>online</span></span>");
        r.b("\n" + n);
        r.b("</span>");
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
}, "<span class='toolbar-toggle'>\n  {{> icon}}\n  <i class='fa fa-lock'></i>\n  <span class='count'><span class='count-online'>0</span><span class='count-rest'>/<span class='count-total'>0</span></span>\n  <span class='count-description'>online</span></span>\n</span>\n", r);