var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("errors", e, t, 1), e, t, 0, 11, 70, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<li class='error new-organization-error'>");
                r.b(r.v(r.f("message", e, t, 0)));
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#errors}}\n<li class='error new-organization-error'>{{message}}</li>\n{{/errors}}\n", r);