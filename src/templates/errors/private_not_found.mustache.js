var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content'>");
        r.b("\n" + n);
        r.b("  <div class='image not-found'></div>");
        r.b("\n" + n);
        r.b("  <h3>Unknown User</h3>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b("    The user you tried to chat with wasn't found.<br>");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <ul class='buttons'>");
        r.b("\n" + n);
        r.b("    <li>");
        r.b("\n" + n);
        r.b("      <button class='button back'>Back</button>");
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
}, "<section class='content'>\n  <div class='image not-found'></div>\n  <h3>Unknown User</h3>\n  <p>\n    The user you tried to chat with wasn't found.<br>\n  </p>\n  <ul class='buttons'>\n    <li>\n      <button class='button back'>Back</button>\n    </li>\n  </ul>\n</section>\n", r);