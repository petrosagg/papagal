var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content'>");
        r.b("\n" + n);
        r.b("  <div class='image not-found'></div>");
        r.b("\n" + n);
        r.b("  <h3>Flow not found</h3>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    The Flow you tried to access cannot be found.<br>");
        r.b("\n" + n);
        r.b("    It either does not exist or you're not authorized to access it.<br>");
        r.b("\n" + n);
        r.b("    You can <strong>select another flow</strong> from the navigation bar");
        r.b("\n" + n);
        r.b("    or <strong>go back</strong</a>.");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <ul class='buttons'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <button class='button back'>Go back</button>");
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
}, "<section class='content'>\n  <div class='image not-found'></div>\n  <h3>Flow not found</h3>\n  <p>\n    The Flow you tried to access cannot be found.<br>\n    It either does not exist or you're not authorized to access it.<br>\n    You can <strong>select another flow</strong> from the navigation bar\n    or <strong>go back</strong</a>.\n  </p>\n  <ul class='buttons'>\n    <li>\n      <button class='button back'>Go back</button>\n    </li>\n  </ul>\n</section>\n", r);