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
        r.b("  <li class='user-counter-item'>");
        r.b("\n" + n);
        r.b("    <a class='toolbar-link' id='user-counter'></a>");
        r.b("\n" + n);
        r.b("  </li>");
        r.b("\n" + n);
        r.b("  <li class='avatar-list-item'></li>");
        r.b("\n" + n);
        r.b("  <li class='user-add-item' id='user-add-item'>");
        r.b("\n" + n);
        r.b("    <a class='toolbar-link' id='user-add'>");
        r.b("\n" + n);
        r.b("      <span class='toolbar-toggle'>");
        r.b("\n" + n);
        r.b("        <i class='fa fa-plus'></i>");
        r.b("\n" + n);
        r.b("        Add people");
        r.b("\n" + n);
        r.b("      </span>");
        r.b("\n" + n);
        r.b("    </a>");
        r.b("\n" + n);
        r.b("  </li>");
        r.b("\n" + n);
        r.b("</ul>");
        r.b("\n" + n);
        r.b("<ul class='right-item-group'>");
        r.b("\n" + n);
        r.b("  <li id='inbox-toggle-item'>");
        r.b("\n" + n);
        r.b("    <a class='toolbar-link active' id='inbox-toggle'>");
        r.b("\n" + n);
        r.b("      <span class='toolbar-toggle'>");
        r.b("\n" + n);
        r.b("        <span class='fa-stack inbox-notification-container'>");
        r.b("\n" + n);
        r.b("          <i class='fa fa-stack-2x fa-inbox'></i>");
        r.b("\n" + n);
        r.b("          <i class='fa fa-stack-1x fa-arrow-down inbox-notification-arrow'></i>");
        r.b("\n" + n);
        r.b("        </span>");
        r.b("\n" + n);
        r.b("        Inbox");
        r.b("\n" + n);
        r.b("      </span>");
        r.b("\n" + n);
        r.b("    </a>");
        r.b("\n" + n);
        r.b("  </li>");
        r.b("\n" + n);
        r.b("  <li id='search-form-item' class=");
        r.b(r.v(r.f("searchFormInlineStyle", e, t, 0)));
        r.b("></li>");
        r.b("\n" + n);
        r.b("</ul>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<ul class='left-item-group'>\n  <li class='sidebar-toggle-item'>\n    <a class='toolbar-link' id='sidebar-button'>\n      <i class='fa fa-fw fa-lg fa-reorder'></i>\n    </a>\n  </li>\n  <li class='user-counter-item'>\n    <a class='toolbar-link' id='user-counter'></a>\n  </li>\n  <li class='avatar-list-item'></li>\n  <li class='user-add-item' id='user-add-item'>\n    <a class='toolbar-link' id='user-add'>\n      <span class='toolbar-toggle'>\n        <i class='fa fa-plus'></i>\n        Add people\n      </span>\n    </a>\n  </li>\n</ul>\n<ul class='right-item-group'>\n  <li id='inbox-toggle-item'>\n    <a class='toolbar-link active' id='inbox-toggle'>\n      <span class='toolbar-toggle'>\n        <span class='fa-stack inbox-notification-container'>\n          <i class='fa fa-stack-2x fa-inbox'></i>\n          <i class='fa fa-stack-1x fa-arrow-down inbox-notification-arrow'></i>\n        </span>\n        Inbox\n      </span>\n    </a>\n  </li>\n  <li id='search-form-item' class={{searchFormInlineStyle}}></li>\n</ul>\n", r);