var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='");
        r.b(r.v(r.f("iconClass", e, t, 0)));
        r.b("'></span>");
        r.b("\n" + n);
        if (r.s(r.f("count", e, t, 1), e, t, 0, 46, 97, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<span>");
                r.b(r.v(r.f("count", e, t, 0)));
                r.b(" new messages ");
                r.b(r.v(r.f("direction", e, t, 0)));
                r.b("</span>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("count", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<span>1 new message "), r.b(r.v(r.f("direction", e, t, 0))), 
        r.b("</span>"), r.b("\n" + n));
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='{{iconClass}}'></span>\n{{#count}}\n<span>{{count}} new messages {{direction}}</span>\n{{/count}}\n{{^count}}\n<span>1 new message {{direction}}</span>\n{{/count}}\n", r);