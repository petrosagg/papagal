var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='user-info'>");
        r.b("\n" + n);
        r.b("  <div class='user-name'>");
        r.b(r.v(r.f("name", e, t, 0)));
        r.b(" (");
        r.b(r.v(r.f("nick", e, t, 0)));
        r.b(")</div>");
        r.b("\n" + n);
        r.b("  <div class='user-activity'>");
        r.b("\n" + n);
        r.b("    <span class='activity'>");
        r.b(r.t(r.f("activity", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("  <ul class='user-actions'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b('      <span class="user-in-team" title="They will be notified of @team mentions">team</span>');
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        if (r.s(r.f("linkToPrivate", e, t, 1), e, t, 0, 326, 468, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <li>");
                r.b("\n" + n);
                r.b("      <a class='text-button chat' href='");
                r.b(r.v(r.f("privateUrl", e, t, 0)));
                r.b("'>");
                r.b("\n" + n);
                r.b("        <i class='fa fa-user'></i>");
                r.b("\n" + n);
                r.b("        1-To-1");
                r.b("\n" + n);
                r.b("      </a>");
                r.b("\n" + n);
                r.b("    </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <a class='text-button mail' href='mailto:");
        r.b(r.v(r.f("email", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("        <i class='fa fa-envelope'></i>");
        r.b("\n" + n);
        r.b("        Mail");
        r.b("\n" + n);
        r.b("      </a>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='user-info'>\n  <div class='user-name'>{{name}} ({{nick}})</div>\n  <div class='user-activity'>\n    <span class='activity'>{{& activity }}</span>\n  </div>\n  <ul class='user-actions'>\n    <li>\n      <span class=\"user-in-team\" title=\"They will be notified of @team mentions\">team</span>\n    </li>\n    {{#linkToPrivate}}\n    <li>\n      <a class='text-button chat' href='{{privateUrl}}'>\n        <i class='fa fa-user'></i>\n        1-To-1\n      </a>\n    </li>\n    {{/linkToPrivate}}\n    <li>\n      <a class='text-button mail' href='mailto:{{email}}'>\n        <i class='fa fa-envelope'></i>\n        Mail\n      </a>\n    </li>\n  </ul>\n</div>\n", r);