var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='toast-icon'>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-warning'></i>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n" + n);
        r.b("<div class='toast-content'>");
        r.b("\n" + n);
        r.b("  <h4 class='toast-title'>Unable to connect to Flowdock</h4>");
        r.b("\n" + n);
        r.b("  <p class='toast-description'>");
        r.b("\n" + n);
        r.b("    Trying to reconnect");
        r.b("\n" + n);
        r.b("    <span class='animate-ellipsis'>...</span>");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='toast-icon'>\n  <i class='fa fa-warning'></i>\n</div>\n<div class='toast-content'>\n  <h4 class='toast-title'>Unable to connect to Flowdock</h4>\n  <p class='toast-description'>\n    Trying to reconnect\n    <span class='animate-ellipsis'>...</span>\n  </p>\n</div>\n", r);