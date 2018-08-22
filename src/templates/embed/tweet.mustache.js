var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='fa fa-fw fa-twitter'></span>");
        r.b("\n" + n);
        r.b("<span class='author'><a class='external tweet-preview' href='");
        r.b(r.v(r.f("authorLink", e, t, 0)));
        r.b("'>");
        r.b(r.v(r.f("author", e, t, 0)));
        r.b("</a>");
        if (r.s(r.f("isRetweet", e, t, 1), e, t, 0, 147, 278, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("\n" + n);
                r.b("  retweeted");
                r.b("\n" + n);
                r.b("  <a class='external tweet-preview' href='http://twitter.com/");
                r.b(r.v(r.f("originalAuthorUsername", e, t, 0)));
                r.b("'>");
                r.b(r.v(r.f("originalAuthorName", e, t, 0)));
                r.b("</a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  :");
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n" + n);
        r.b("<span class='tweet'>");
        r.b("\n" + n);
        r.b('  "');
        r.b(r.t(r.f("tweet", e, t, 0)));
        r.b('"');
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n" + n);
        r.b("<time>");
        r.b("\n" + n);
        r.b("  on ");
        r.b(r.t(r.f("time", e, t, 0)));
        r.b("\n" + n);
        r.b("</time>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='fa fa-fw fa-twitter'></span>\n<span class='author'><a class='external tweet-preview' href='{{authorLink}}'>{{author}}</a>{{#isRetweet}}\n  retweeted\n  <a class='external tweet-preview' href='http://twitter.com/{{originalAuthorUsername}}'>{{originalAuthorName}}</a>\n  {{/isRetweet}}\n  :\n</span>\n<span class='tweet'>\n  \"{{& tweet }}\"\n</span>\n<time>\n  on {{& time }}\n</time>\n", r);