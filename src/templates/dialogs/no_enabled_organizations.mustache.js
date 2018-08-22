var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<ul class='expired-organization-list'>");
        r.b("\n" + n);
        if (r.s(r.f("expiredOrganizations", e, t, 1), e, t, 0, 66, 637, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <li class='expired-organization'>");
                r.b("\n" + n);
                r.b("    <ul class='actions block-list'>");
                r.b("\n" + n);
                if (r.s(r.d("subscription.trial", e, t, 1), e, t, 0, 168, 301, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <li>");
                        r.b("\n" + n);
                        r.b("        <a class='help-link' href='/trials' target='_blank' rel='noopener noreferrer'>Extend trial</a>");
                        r.b("\n" + n);
                        r.b("      </li>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.b("      <li>");
                r.b("\n" + n);
                r.b("        <a class='help-link' href='/organizations/");
                r.b(r.v(r.f("id", e, t, 0)));
                r.b("/payments' target='_blank' rel='noopener noreferrer'>Configure payments</a>");
                r.b("\n" + n);
                r.b("      </li>");
                r.b("\n" + n);
                r.b("    </ul>");
                r.b("\n" + n);
                r.b("    <div class='name-row'>");
                r.b("\n" + n);
                r.b("      <span class='name'>");
                r.b(r.v(r.f("name", e, t, 0)));
                r.b("</span>");
                r.b("\n" + n);
                r.b("    </div>");
                r.b("\n" + n);
                r.b("    <div class='description'>");
                r.b("\n" + n);
                r.b("      ");
                r.b(r.v(r.f("reason", e, t, 0)));
                r.b("\n" + n);
                r.b("    </div>");
                r.b("\n" + n);
                r.b("  </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</ul>");
        r.b("\n" + n);
        r.b("<br>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<ul class='expired-organization-list'>\n  {{#expiredOrganizations}}\n  <li class='expired-organization'>\n    <ul class='actions block-list'>\n      {{#subscription.trial}}\n      <li>\n        <a class='help-link' href='/trials' target='_blank' rel='noopener noreferrer'>Extend trial</a>\n      </li>\n      {{/subscription.trial}}\n      <li>\n        <a class='help-link' href='/organizations/{{id}}/payments' target='_blank' rel='noopener noreferrer'>Configure payments</a>\n      </li>\n    </ul>\n    <div class='name-row'>\n      <span class='name'>{{name}}</span>\n    </div>\n    <div class='description'>\n      {{reason}}\n    </div>\n  </li>\n  {{/expiredOrganizations}}\n</ul>\n<br>\n", r);