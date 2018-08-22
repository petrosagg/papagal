var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<header class='nav-header'>");
        r.b("\n" + n);
        r.b("  <div class='dropdown' id='user-menu-toggle'></div>");
        r.b("\n" + n);
        r.b("</header>");
        r.b("\n" + n);
        r.b("<div class='nav-content'></div>");
        r.b("\n" + n);
        r.b("<footer class='nav-footer'>");
        r.b("\n" + n);
        r.b("  <ul class='nav-footer-actions'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='search-tab' data-tipsy-title='More flows and people'>");
        r.b("\n" + n);
        r.b("        <i class='fa fa-fw fa-plus'></i>");
        r.b("\n" + n);
        r.b("        <span class='label'>More flows and people</span>");
        r.b("\n" + n);
        r.b("      </a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("    <li class='minimized-only'>");
        r.b("\n" + n);
        r.b("      <a class='open-sidebar' title='Expand'>");
        r.b("\n" + n);
        r.b("        <i class='fa fa-fw fa-caret-square-o-right'></i>");
        r.b("\n" + n);
        r.b("      </a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("    <li class='expanded-only'>");
        r.b("\n" + n);
        r.b("      <a class='close-sidebar' data-tipsy-title='Collapse'>");
        r.b("\n" + n);
        r.b("        <i class='fa fa-fw fa-caret-square-o-left'></i>");
        r.b("\n" + n);
        r.b("      </a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</footer>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<header class='nav-header'>\n  <div class='dropdown' id='user-menu-toggle'></div>\n</header>\n<div class='nav-content'></div>\n<footer class='nav-footer'>\n  <ul class='nav-footer-actions'>\n    <li>\n      <a class='search-tab' data-tipsy-title='More flows and people'>\n        <i class='fa fa-fw fa-plus'></i>\n        <span class='label'>More flows and people</span>\n      </a>\n    </li>\n    <li class='minimized-only'>\n      <a class='open-sidebar' title='Expand'>\n        <i class='fa fa-fw fa-caret-square-o-right'></i>\n      </a>\n    </li>\n    <li class='expanded-only'>\n      <a class='close-sidebar' data-tipsy-title='Collapse'>\n        <i class='fa fa-fw fa-caret-square-o-left'></i>\n      </a>\n    </li>\n  </ul>\n</footer>\n", r);