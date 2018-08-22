var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("forced", e, t, 1), e, t, 0, 11, 41, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b('<div class="commits forced">');
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("forced", e, t, 1), e, t, 1, 0, 0, "") || (r.b('<div class="commits">'), 
        r.b("\n" + n));
        r.b('<ul class="commit-list">');
        r.b("\n" + n);
        if (r.s(r.f("commits", e, t, 1), e, t, 0, 138, 158, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.rp("<commit0", e, t, "    "));
            }), e.pop()
        };
        r.b("</ul>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<commit0": {
            name: "commit",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, '{{#forced}}\n<div class="commits forced">\n{{/forced}}\n{{^forced}}\n<div class="commits">\n{{/forced}}\n<ul class="commit-list">\n  {{#commits}}\n    {{> commit}}\n  {{/commits}}\n</ul>\n</div>\n', r);