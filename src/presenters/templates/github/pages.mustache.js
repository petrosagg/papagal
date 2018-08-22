var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("pages", e, t, 1), e, t, 0, 10, 139, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b('<h3><a href="');
                r.b(r.v(r.f("url", e, t, 0)));
                r.b('" target="_blank" rel="noopener noreferrer">');
                r.b(r.v(r.f("title", e, t, 0)));
                r.b("</a></h3>");
                r.b("\n" + n);
                if (r.s(r.f("summary", e, t, 1), e, t, 0, 106, 126, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("<p>");
                        r.b(r.v(r.f("summary", e, t, 0)));
                        r.b("</p>");
                        r.b("\n" + n);
                    }), e.pop()
                };
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, '{{#pages}}\n<h3><a href="{{url}}" target="_blank" rel="noopener noreferrer">{{title}}</a></h3>\n{{#summary}}\n<p>{{summary}}</p>\n{{/summary}}\n{{/pages}}\n', r);