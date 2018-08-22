var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='commit-details'>");
        r.b("\n" + n);
        r.b("  <span class='author-info'>");
        r.b("\n" + n);
        r.b("    <span class='commit-author-name'>");
        r.b(r.v(r.d("author.name", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("    <img class='commit-avatar' src='");
        r.b(r.v(r.d("author.avatar", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  </span>");
        r.b("\n" + n);
        r.b("  <a class='commit-sha' href='");
        r.b(r.v(r.f("url", e, t, 0)));
        r.b("' target='_blank' rel='noopener noreferrer'>");
        r.b(r.v(r.f("id", e, t, 0)));
        r.b("</a>");
        r.b("\n" + n);
        r.b('  <span class="commit-message">');
        r.b(r.v(r.f("message", e, t, 0)));
        if (r.s(r.f("furthermore", e, t, 1), e, t, 0, 335, 389, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b('<span class="commit-ellipsis fa fa-ellipsis-h"></span>');
            }), e.pop()
        };
        r.b("</span>");
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='commit-details'>\n  <span class='author-info'>\n    <span class='commit-author-name'>{{author.name}}</span>\n    <img class='commit-avatar' src='{{author.avatar}}'>\n  </span>\n  <a class='commit-sha' href='{{url}}' target='_blank' rel='noopener noreferrer'>{{id}}</a>\n  <span class=\"commit-message\">{{message}}{{#furthermore}}<span class=\"commit-ellipsis fa fa-ellipsis-h\"></span>{{/furthermore}}</span>\n</span>\n", r);