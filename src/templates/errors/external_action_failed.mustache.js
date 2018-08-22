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
        r.b("    ");
        r.b(r.v(r.f("title", e, t, 0)));
        r.b("\n" + n);
        r.b("  </h4>");
        r.b("\n" + n);
        r.b("  <p class='toast-description'>");
        r.b("\n" + n);
        r.b("    ");
        r.b(r.v(r.f("description", e, t, 0)));
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='toast-continue' title='Close this notification'>\n  <i class='fa fa-times-circle-o'></i>\n</a>\n<div class='toast-icon'>\n  <i class='fa fa-warning'></i>\n</div>\n<div class='toast-content'>\n  <h4 class='toast-title'>\n    {{title}}\n  </h4>\n  <p class='toast-description'>\n    {{description}}\n  </p>\n</div>\n", r);