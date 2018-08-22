var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content'>");
        r.b("\n" + n);
        r.b("  <div class='image connection'></div>");
        r.b("\n" + n);
        r.b("  <h3>Could not connect to flow</h3>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    Connection was established to Flowdock's servers.<br>");
        r.b("\n" + n);
        r.b("    However, we could not connect to this specific private chat.<br>");
        r.b("\n" + n);
        r.b("    <strong>Reload</strong> to restore connections.");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <ul class='buttons'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <button class='primary-button reload'>Reload</button>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content'>\n  <div class='image connection'></div>\n  <h3>Could not connect to flow</h3>\n  <p>\n    Connection was established to Flowdock's servers.<br>\n    However, we could not connect to this specific private chat.<br>\n    <strong>Reload</strong> to restore connections.\n  </p>\n  <ul class='buttons'>\n    <li>\n      <button class='primary-button reload'>Reload</button>\n    </li>\n  </ul>\n</section>\n", r);