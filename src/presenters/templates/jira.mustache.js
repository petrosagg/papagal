var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.t(r.f("body", e, t, 0)));
        r.b("\n" + n);
        if (r.s(r.d("propertyList.length", e, t, 1), e, t, 0, 35, 57, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.rp("<propertyList0", e, t, "  "));
            }), e.pop()
        };
        if (r.s(r.d("changeLog.length", e, t, 1), e, t, 0, 103, 122, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.rp("<changeLog1", e, t, "  "));
            }), e.pop()
        };
        return r.fl();
    },
    partials: {
        "<propertyList0": {
            name: "propertyList",
            partials: {},
            subs: {}
        },
        "<changeLog1": {
            name: "changeLog",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{& body}}\n{{#propertyList.length}}\n  {{> propertyList}}\n{{/propertyList.length}}\n{{#changeLog.length}}\n  {{> changeLog}}\n{{/changeLog.length}}", r);