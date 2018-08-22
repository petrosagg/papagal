var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("status", e, t, 1), e, t, 0, 11, 67, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<span class='thread-status ");
                r.b(r.v(r.f("color", e, t, 0)));
                r.b("'>");
                r.b(r.v(r.f("value", e, t, 0)));
                r.b("</span>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("link", e, t, 1), e, t, 0, 88, 151, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<a class='thread-title-link' href='");
                r.b(r.v(r.f("link", e, t, 0)));
                r.b("'>");
                r.b(r.t(r.f("title", e, t, 0)));
                r.b("</a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("link", e, t, 1), e, t, 1, 0, 0, "") || (r.b(r.t(r.f("title", e, t, 0))), 
        r.b("\n" + n));
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#status}}\n<span class='thread-status {{color}}'>{{value}}</span>\n{{/status}}\n{{#link}}\n<a class='thread-title-link' href='{{link}}'>{{& title }}</a>\n{{/link}}\n{{^link}}\n{{& title }}\n{{/link}}\n", r);