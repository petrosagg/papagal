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
        r.b("    <span class='fa fa-copy'></span>");
        r.b("\n" + n);
        r.b("    Whoa! Identical display names detected");
        r.b("\n" + n);
        r.b("  </h3>");
        r.b("\n" + n);
        r.b("  <hr>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    Looks like another person in this flow (");
        r.b(r.v(r.f("name", e, t, 0)));
        r.b(") has the same display name as you. This might");
        r.b("\n" + n);
        r.b("    lead to some confusion within the flow.");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    There are two ways to resolve this. You can either change your own display name by editing your");
        r.b("\n" + n);
        r.b("    profile, or you can discuss it with ");
        r.b(r.v(r.f("name", e, t, 0)));
        r.b(" to figure out who should change their display name.");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <a class='button primary-button close' href='/account/edit' target='_blank' rel='noopener noreferrer'>Edit your profile</a>");
        r.b("\n" + n);
        r.b("  <a class='button open-private'>Start a 1-to-1 chat with ");
        r.b(r.v(r.f("name", e, t, 0)));
        r.b("</a>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content clearfix'>\n  <div class='image not-found'></div>\n  <h3 class='stripe-title'>\n    <span class='fa fa-copy'></span>\n    Whoa! Identical display names detected\n  </h3>\n  <hr>\n  <p>\n    Looks like another person in this flow ({{name}}) has the same display name as you. This might\n    lead to some confusion within the flow.\n  </p>\n  <p>\n    There are two ways to resolve this. You can either change your own display name by editing your\n    profile, or you can discuss it with {{name}} to figure out who should change their display name.\n  </p>\n  <a class='button primary-button close' href='/account/edit' target='_blank' rel='noopener noreferrer'>Edit your profile</a>\n  <a class='button open-private'>Start a 1-to-1 chat with {{name}}</a>\n</section>\n", r);