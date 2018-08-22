var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='invitation-avatar'></div>");
        r.b("\n" + n);
        r.b("<div class='user-info'>");
        r.b("\n" + n);
        r.b("  <div class='invitation-email' title='");
        r.b(r.v(r.f("email", e, t, 0)));
        r.b("'>");
        r.b(r.v(r.f("email", e, t, 0)));
        r.b("</div>");
        r.b("\n" + n);
        r.b("  <div class='invitation-class'>Invited</div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='invitation-avatar'></div>\n<div class='user-info'>\n  <div class='invitation-email' title='{{email}}'>{{email}}</div>\n  <div class='invitation-class'>Invited</div>\n</div>\n", r);