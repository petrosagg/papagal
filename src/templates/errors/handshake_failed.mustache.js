var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content'>");
        r.b("\n" + n);
        r.b("  <div class='image authentication'></div>");
        r.b("\n" + n);
        r.b("  <h3>Could not authenticate</h3>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    Your connection to Flowdock could not be properly authenticated.<br>");
        r.b("\n" + n);
        r.b("    <strong>Reload</strong> and if this happens again, try <strong>logging out</strong> and then back in.");
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
}, "<section class='content'>\n  <div class='image authentication'></div>\n  <h3>Could not authenticate</h3>\n  <p>\n    Your connection to Flowdock could not be properly authenticated.<br>\n    <strong>Reload</strong> and if this happens again, try <strong>logging out</strong> and then back in.\n  </p>\n  <ul class='buttons'>\n    <li>\n      <button class='primary-button reload'>Reload</button>\n    </li>\n  </ul>\n</section>\n", r);