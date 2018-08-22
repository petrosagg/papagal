var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("body", e, t, 1), e, t, 0, 9, 30, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <p>");
                r.b(r.t(r.f("body", e, t, 0)));
                r.b("</p>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.d("propertyList.length", e, t, 1), e, t, 0, 64, 86, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.rp("<propertyList0", e, t, "  "));
            }), e.pop()
        };
        return r.fl();
    },
    partials: {
        "<propertyList0": {
            name: "propertyList",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{#body}}\n  <p>{{& body}}</p>\n{{/body}}\n{{#propertyList.length}}\n  {{> propertyList}}\n{{/propertyList.length}}", r);