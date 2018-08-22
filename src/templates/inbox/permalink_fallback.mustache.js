var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='sub-menu-wrapper pull-down'>");
        r.b("\n" + n);
        r.b("  <menu class='dropdown-menu s sub-menu'>");
        r.b("\n" + n);
        r.b("    <ul class='dropdown-actions'>");
        r.b("\n" + n);
        r.b("      <li>");
        r.b("\n" + n);
        r.b("        <input class='permalink-input dropdown-input' readonly type='text' value='");
        r.b(r.v(r.f("permalink", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("      </li>");
        r.b("\n" + n);
        r.b("    </ul>");
        r.b("\n" + n);
        r.b("  </menu>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='sub-menu-wrapper pull-down'>\n  <menu class='dropdown-menu s sub-menu'>\n    <ul class='dropdown-actions'>\n      <li>\n        <input class='permalink-input dropdown-input' readonly type='text' value='{{permalink}}'>\n      </li>\n    </ul>\n  </menu>\n</div>\n", r);