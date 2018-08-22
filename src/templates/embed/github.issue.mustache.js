var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='github-issue'>");
        r.b("\n" + n);
        r.b("  <strong>Issue #");
        r.b(r.v(r.f("number", e, t, 0)));
        r.b(": ");
        r.b(r.v(r.f("title", e, t, 0)));
        r.b("</strong> by ");
        r.b(r.v(r.f("author", e, t, 0)));
        r.b("\n" + n);
        r.b("</span><span class='github-meta'>in ");
        r.b(r.v(r.f("repoAuthor", e, t, 0)));
        r.b("/");
        r.b(r.v(r.f("repoName", e, t, 0)));
        r.b(" on GitHub</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='github-issue'>\n  <strong>Issue #{{number}}: {{title}}</strong> by {{author}}\n</span><span class='github-meta'>in {{repoAuthor}}/{{repoName}} on GitHub</span>\n", r);