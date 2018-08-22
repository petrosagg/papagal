var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='overlay-container'>");
        r.b("\n" + n);
        r.b("  <article class='stripe'>");
        r.b("\n" + n);
        r.b("    <div class='content center'>");
        r.b("\n" + n);
        r.b("      <h2 class='promo-title'>Open in Flowdock for Android</h2>");
        r.b("\n" + n);
        r.b("      <p class='promo-description'>");
        r.b("\n" + n);
        r.b("        If you have Flowdock for Android installed, you can open this flow in the app. No extra log-in required.");
        r.b("\n" + n);
        r.b("      </p>");
        r.b("\n" + n);
        r.b("      <ul class='promo-button-list'>");
        r.b("\n" + n);
        r.b("        <li>");
        r.b("\n" + n);
        r.b("          <a class='button close'>No thanks</a>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("        <li>");
        r.b("\n" + n);
        r.b("          <a class='primary-button promotion-link' href='");
        r.b(r.v(r.f("content", e, t, 0)));
        r.b("'>Open in Flowdock for Android</a>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("      </ul>");
        r.b("\n" + n);
        r.b("    </div>");
        r.b("\n" + n);
        r.b("  </article>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='overlay-container'>\n  <article class='stripe'>\n    <div class='content center'>\n      <h2 class='promo-title'>Open in Flowdock for Android</h2>\n      <p class='promo-description'>\n        If you have Flowdock for Android installed, you can open this flow in the app. No extra log-in required.\n      </p>\n      <ul class='promo-button-list'>\n        <li>\n          <a class='button close'>No thanks</a>\n        </li>\n        <li>\n          <a class='primary-button promotion-link' href='{{content}}'>Open in Flowdock for Android</a>\n        </li>\n      </ul>\n    </div>\n  </article>\n</div>\n", r);