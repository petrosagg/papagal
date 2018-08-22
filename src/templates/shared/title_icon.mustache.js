var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("iconAttributes", e, t, 1), e, t, 0, 19, 78, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<div class='thread-source-icon ");
                r.b(r.v(r.f("iconAttributes", e, t, 0)));
                r.b("'></div>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#iconAttributes}}\n<div class='thread-source-icon {{iconAttributes}}'></div>\n{{/iconAttributes}}\n", r);