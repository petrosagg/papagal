var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='github-repo'>");
        r.b("\n" + n);
        r.b("  <strong>");
        r.b(r.v(r.f("repoAuthor", e, t, 0)));
        r.b("/");
        r.b(r.v(r.f("repoName", e, t, 0)));
        r.b("</strong>");
        if (r.s(r.f("repoDescription", e, t, 1), e, t, 0, 93, 114, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(": ");
                n.b(n.v(n.f("repoDescription", e, t, 0)));
            }), e.pop()
        };
        r.b("\n" + n);
        r.b("</span><span class='github-meta'>on GitHub</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='github-repo'>\n  <strong>{{repoAuthor}}/{{repoName}}</strong>{{#repoDescription}}: {{repoDescription}}{{/repoDescription}}\n</span><span class='github-meta'>on GitHub</span>\n", r);