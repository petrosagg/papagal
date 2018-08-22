var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content'>");
        r.b("\n" + n);
        r.b("  <div class='image not-found'></div>");
        r.b("\n" + n);
        r.b("  <h3>Whoops! You don't seem to have any Flows open.</h3>");
        r.b("\n" + n);
        r.b("  <ul>");
        r.b("\n" + n);
        r.b("    <p>");
        r.b("\n" + n);
        r.b("      This can happen if you've closed all of your flows or your subscription has expired. You can try opening a flow from the top left corner or reloading the page.");
        r.b("\n" + n);
        r.b("    </p>");
        r.b("\n" + n);
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("  <p>");
        r.b("\n" + n);
        r.b('    If you keep seeing this error, please contact us at <a href="mailto:team@flowdock.com">team@flowdock.com</a>');
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <a class='button primary-button account' href='/account'>See Account Details</a>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content'>\n  <div class='image not-found'></div>\n  <h3>Whoops! You don't seem to have any Flows open.</h3>\n  <ul>\n    <p>\n      This can happen if you've closed all of your flows or your subscription has expired. You can try opening a flow from the top left corner or reloading the page.\n    </p>\n  </ul>\n  <p>\n    If you keep seeing this error, please contact us at <a href=\"mailto:team@flowdock.com\">team@flowdock.com</a>\n  </p>\n  <a class='button primary-button account' href='/account'>See Account Details</a>\n</section>\n", r);