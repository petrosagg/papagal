var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.b("  <div class='image not-found'></div>");
        r.b("\n" + n);
        r.b("  <h3 class='stripe-title'>");
        r.b("\n" + n);
        r.b("    Welcome to ");
        r.b(r.v(r.f("flowName", e, t, 0)));
        r.b("\n" + n);
        r.b("  </h3>");
        r.b("\n" + n);
        if (r.s(r.f("description", e, t, 1), e, t, 0, 155, 191, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <p>");
                r.b("\n" + n);
                r.b("    ");
                r.b(r.v(r.f("description", e, t, 0)));
                r.b("\n" + n);
                r.b("  </p>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    This flow has ");
        r.b(r.v(r.f("flowMembersCount", e, t, 0)));
        r.b(" members. ");
        r.b(r.v(r.f("accessModeCopy", e, t, 0)));
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b('  <p class="avatar-strip">');
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <hr>");
        r.b("\n" + n);
        r.b("  <p />");
        r.b("\n" + n);
        r.b("  <h5 class='stripe-title'>");
        r.b("\n" + n);
        r.b("    Do you want to receive @team notifications in this flow?");
        r.b("\n" + n);
        r.b("  </h5>");
        r.b("\n" + n);
        r.b("  <a class='button primary-button join-team'>Yes, I'm part of @team</a>");
        r.b("\n" + n);
        r.b("  <a class='button hang-around'>No thanks, I'm just spectating</a>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content clearfix'>\n  <div class='image not-found'></div>\n  <h3 class='stripe-title'>\n    Welcome to {{flowName}}\n  </h3>\n  {{#description}}\n  <p>\n    {{description}}\n  </p>\n  {{/description}}\n  <p>\n    This flow has {{flowMembersCount}} members. {{accessModeCopy}}\n  </p>\n  <p class=\"avatar-strip\">\n  </p>\n  <hr>\n  <p />\n  <h5 class='stripe-title'>\n    Do you want to receive @team notifications in this flow?\n  </h5>\n  <a class='button primary-button join-team'>Yes, I'm part of @team</a>\n  <a class='button hang-around'>No thanks, I'm just spectating</a>\n</section>\n", r);