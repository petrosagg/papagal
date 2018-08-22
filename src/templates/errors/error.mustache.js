var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.b("  <div class='image'></div>");
        r.b("\n" + n);
        r.b("  <h3>There was an error</h3>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    There was an unexpected error which could not be resolved.<br>");
        r.b("\n" + n);
        r.b('    Reload the page and contact <a href="mailto:team@flowdock.com">team@flowdock.com</a> if it happens again.');
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <ul class='buttons clean'>");
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
}, "<section class='content clearfix'>\n  <div class='image'></div>\n  <h3>There was an error</h3>\n  <p>\n    There was an unexpected error which could not be resolved.<br>\n    Reload the page and contact <a href=\"mailto:team@flowdock.com\">team@flowdock.com</a> if it happens again.\n  </p>\n  <ul class='buttons clean'>\n    <li>\n      <button class='primary-button reload'>Reload</button>\n    </li>\n  </ul>\n</section>\n", r);