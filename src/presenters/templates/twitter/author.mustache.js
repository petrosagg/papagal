var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='author-name' href='");
        r.b(r.v(r.f("profileLink", e, t, 0)));
        r.b("' target='_blank' rel='noopener noreferrer'>");
        r.b("\n" + n);
        r.b("  <span>");
        r.b(r.v(r.d("author.name", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n" + n);
        r.b("<a class='screen-name' href='");
        r.b(r.v(r.f("profileLink", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  <span>@");
        r.b(r.v(r.d("author.screen_name", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='author-name' href='{{profileLink}}' target='_blank' rel='noopener noreferrer'>\n  <span>{{author.name}}</span>\n</a>\n<a class='screen-name' href='{{profileLink}}'>\n  <span>@{{author.screen_name}}</span>\n</a>\n", r);