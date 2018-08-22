var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='toast-continue' title='Close this notification'>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-times-circle-o'></i>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n" + n);
        r.b("<div class='toast-icon'>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-warning'></i>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n" + n);
        r.b("<div class='toast-content'>");
        r.b("\n" + n);
        r.b("  <h4 class='toast-title'>");
        r.b("\n" + n);
        r.b("    You must connect to ");
        r.b(r.v(r.f("application", e, t, 0)));
        r.b(" first");
        r.b("\n" + n);
        r.b("  </h4>");
        r.b("\n" + n);
        r.b("  <p class='toast-description'>");
        r.b("\n" + n);
        r.b("    <a class='authenticate' href='");
        r.b(r.v(r.f("url", e, t, 0)));
        r.b("' title='Authenticate'>Click here to authenticate</a>");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='toast-continue' title='Close this notification'>\n  <i class='fa fa-times-circle-o'></i>\n</a>\n<div class='toast-icon'>\n  <i class='fa fa-warning'></i>\n</div>\n<div class='toast-content'>\n  <h4 class='toast-title'>\n    You must connect to {{application}} first\n  </h4>\n  <p class='toast-description'>\n    <a class='authenticate' href='{{url}}' title='Authenticate'>Click here to authenticate</a>\n  </p>\n</div>\n", r);