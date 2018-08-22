var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='user-card-wrapper'>");
        r.b("\n" + n);
        r.b("  <div class='user-card-avatar' style='background-image: url(");
        r.b(r.v(r.f("avatar", e, t, 0)));
        r.b("160);'></div>");
        r.b("\n" + n);
        r.b("  <div class='user-card-content'>");
        r.b("\n" + n);
        r.b("    <div class='user-card-name'>");
        r.b(r.v(r.f("nick", e, t, 0)));
        r.b(" (");
        r.b(r.v(r.f("name", e, t, 0)));
        r.b(")</div>");
        r.b("\n" + n);
        r.b("    <div class='user-card-activity'></div>");
        r.b("\n" + n);
        r.b("    <a class='private-chat-link'>");
        r.b("\n" + n);
        r.b("      <i class='fa fa-user'></i>");
        r.b("\n" + n);
        r.b("      Start 1-to-1");
        r.b("\n" + n);
        r.b("    </a>");
        r.b("\n" + n);
        r.b("    <a class='email-link' href='mailto:");
        r.b(r.v(r.f("email", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("      <i class='fa fa-envelope'></i>");
        r.b("\n" + n);
        r.b("      Mail");
        r.b("\n" + n);
        r.b("    </a>");
        r.b("\n" + n);
        if (r.s(r.f("website", e, t, 1), e, t, 0, 471, 619, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <a class='profile-link' href='");
                r.b(r.v(r.f("website", e, t, 0)));
                r.b("' target='_blank' rel='noopener noreferrer'>");
                r.b("\n" + n);
                r.b("      <i class='fa fa-globe'></i>");
                r.b("\n" + n);
                r.b("      Web");
                r.b("\n" + n);
                r.b("    </a>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("isYou", e, t, 1), e, t, 0, 646, 780, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <a class='account' href='/account' target='_blank' rel='noopener noreferrer'>");
                r.b("\n" + n);
                r.b(r.rp("<userSVGIcon0", e, t, "      "));
                r.b("      Account");
                r.b("\n" + n);
                r.b("    </a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<userSVGIcon0": {
            name: "userSVGIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<div class='user-card-wrapper'>\n  <div class='user-card-avatar' style='background-image: url({{avatar}}160);'></div>\n  <div class='user-card-content'>\n    <div class='user-card-name'>{{nick}} ({{name}})</div>\n    <div class='user-card-activity'></div>\n    <a class='private-chat-link'>\n      <i class='fa fa-user'></i>\n      Start 1-to-1\n    </a>\n    <a class='email-link' href='mailto:{{email}}'>\n      <i class='fa fa-envelope'></i>\n      Mail\n    </a>\n    {{#website}}\n    <a class='profile-link' href='{{website}}' target='_blank' rel='noopener noreferrer'>\n      <i class='fa fa-globe'></i>\n      Web\n    </a>\n    {{/website}}\n    {{#isYou}}\n    <a class='account' href='/account' target='_blank' rel='noopener noreferrer'>\n      {{> userSVGIcon}}\n      Account\n    </a>\n    {{/isYou}}\n  </div>\n</div>\n", r);