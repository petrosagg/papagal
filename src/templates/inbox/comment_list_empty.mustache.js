var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='empty-message'>");
        r.b("\n" + n);
        r.b("  <div class='help-message-title'>");
        r.b("\n" + n);
        r.b("    Start a discussion on this topic below.");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("  <p class='help-message-subtitle'>");
        r.b("\n" + n);
        r.b("    The comments will appear as chat messages.");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <div class='help-message-icon'>");
        r.b("\n" + n);
        r.b("    <span class='fa-stack'>");
        r.b("\n" + n);
        r.b("      <i class='fa fa-circle fa-stack-2x'></i>");
        r.b("\n" + n);
        r.b("      <i class='fa fa-comments fa-stack-1x fa-inverse'></i>");
        r.b("\n" + n);
        r.b("    </span>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='empty-message'>\n  <div class='help-message-title'>\n    Start a discussion on this topic below.\n  </div>\n  <p class='help-message-subtitle'>\n    The comments will appear as chat messages.\n  </p>\n  <div class='help-message-icon'>\n    <span class='fa-stack'>\n      <i class='fa fa-circle fa-stack-2x'></i>\n      <i class='fa fa-comments fa-stack-1x fa-inverse'></i>\n    </span>\n  </div>\n</div>\n", r);