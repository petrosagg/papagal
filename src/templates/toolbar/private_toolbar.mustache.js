var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<ul class='left-item-group'>");
        r.b("\n" + n);
        r.b("  <li class='sidebar-toggle-item'>");
        r.b("\n" + n);
        r.b("    <a class='toolbar-link' id='sidebar-button'>");
        r.b("\n" + n);
        r.b("      <i class='fa fa-fw fa-lg fa-reorder'></i>");
        r.b("\n" + n);
        r.b("    </a>");
        r.b("\n" + n);
        r.b("  </li>");
        r.b("\n" + n);
        r.b("  <li>");
        r.b("\n" + n);
        r.b("    <div class='private-user'></div>");
        r.b("\n" + n);
        r.b("  </li>");
        r.b("\n" + n);
        r.b("</ul>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<ul class='left-item-group'>\n  <li class='sidebar-toggle-item'>\n    <a class='toolbar-link' id='sidebar-button'>\n      <i class='fa fa-fw fa-lg fa-reorder'></i>\n    </a>\n  </li>\n  <li>\n    <div class='private-user'></div>\n  </li>\n</ul>\n", r);