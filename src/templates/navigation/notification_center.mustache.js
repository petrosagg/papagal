var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='dropdown-toggle' id='notification-center-toggle' title='");
        r.b(r.v(r.f("toolTip", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  <div class='notification-container'>");
        r.b("\n" + n);
        r.b("    <i class='fa fa-bell'></i>");
        r.b("\n" + n);
        r.b("    <div class='notification-badge'>");
        r.b(r.v(r.f("count", e, t, 0)));
        r.b("</div>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n" + n);
        r.b("<div class='dropdown-menu' id='notification-menu'>");
        r.b("\n" + n);
        r.b("  <header>");
        r.b("\n" + n);
        r.b("    <a class='mark-all-read'><i class=\"fa fa-check-circle-o\"></i> Mark all read</a>");
        r.b("\n" + n);
        r.b("    <ul class='notification-center-filters'>");
        r.b("\n" + n);
        r.b("      <li>");
        r.b("\n" + n);
        r.b("        <a class='all notification-center-filter link-grey selected' title='Show all notifications'>All notifications<span class='allMentions' style='display: none'></span></a>");
        r.b("\n" + n);
        r.b("      </li>");
        r.b("\n" + n);
        r.b("      <li>");
        r.b("\n" + n);
        r.b("        <a class='for-me notification-center-filter link-grey unselected' title='Show only notifications that mention me by name'>");
        r.b("\n" + n);
        r.b("          Only for me");
        r.b("\n" + n);
        r.b("          <span class='atMentions' style='display: none'></span>");
        r.b("\n" + n);
        r.b("        </a>");
        r.b("\n" + n);
        r.b("      </li>");
        r.b("\n" + n);
        r.b("    </ul>");
        r.b("\n" + n);
        r.b("  </header>");
        r.b("\n" + n);
        r.b("  <ul id='notification-list' class='touch-scrollable'></ul>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='dropdown-toggle' id='notification-center-toggle' title='{{toolTip}}'>\n  <div class='notification-container'>\n    <i class='fa fa-bell'></i>\n    <div class='notification-badge'>{{count}}</div>\n  </div>\n</a>\n<div class='dropdown-menu' id='notification-menu'>\n  <header>\n    <a class='mark-all-read'><i class=\"fa fa-check-circle-o\"></i> Mark all read</a>\n    <ul class='notification-center-filters'>\n      <li>\n        <a class='all notification-center-filter link-grey selected' title='Show all notifications'>All notifications<span class='allMentions' style='display: none'></span></a>\n      </li>\n      <li>\n        <a class='for-me notification-center-filter link-grey unselected' title='Show only notifications that mention me by name'>\n          Only for me\n          <span class='atMentions' style='display: none'></span>\n        </a>\n      </li>\n    </ul>\n  </header>\n  <ul id='notification-list' class='touch-scrollable'></ul>\n</div>\n", r);