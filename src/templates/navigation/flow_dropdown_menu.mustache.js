var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<menu class='dropdown-menu open'>");
        r.b("\n" + n);
        r.b("  <ul class='dropdown-actions'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='show-users'>");
        r.b("\n" + n);
        r.b("        <i class='icon fa-fw'>");
        r.b(r.rp("<usersIcon0", e, t, ""));
        r.b("</i>");
        r.b("\n" + n);
        r.b("        Flow Members");
        r.b("\n" + n);
        r.b("      </a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='show-sources'><i class=\"icon fa fa-fw fa-inbox\"></i> Integrations</a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='show-settings'><i class=\"icon fa fa-fw fa-list\"></i> Settings</a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("  <ul class='dropdown-actions'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='toggle-ignore-team'>");
        r.b(r.rp("<toggleTeam1", e, t, ""));
        r.b("</a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("  <ul class='dropdown-actions'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='close'><i class=\"icon fa fa-fw fa-times\"></i> Close</a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</menu>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<usersIcon0": {
            name: "usersIcon",
            partials: {},
            subs: {}
        },
        "<toggleTeam1": {
            name: "toggleTeam",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<menu class='dropdown-menu open'>\n  <ul class='dropdown-actions'>\n    <li>\n      <a class='show-users'>\n        <i class='icon fa-fw'>{{> usersIcon}}</i>\n        Flow Members\n      </a>\n    </li>\n    <li>\n      <a class='show-sources'><i class=\"icon fa fa-fw fa-inbox\"></i> Integrations</a>\n    </li>\n    <li>\n      <a class='show-settings'><i class=\"icon fa fa-fw fa-list\"></i> Settings</a>\n    </li>\n  </ul>\n  <ul class='dropdown-actions'>\n    <li>\n      <a class='toggle-ignore-team'>{{> toggleTeam }}</a>\n    </li>\n  </ul>\n  <ul class='dropdown-actions'>\n    <li>\n      <a class='close'><i class=\"icon fa fa-fw fa-times\"></i> Close</a>\n    </li>\n  </ul>\n</menu>\n", r);