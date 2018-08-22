var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<div class="thread-indicator" ');
        if (r.s(r.f("threadColor", e, t, 1), e, t, 0, 46, 130, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b('style="border-color: ');
                n.b(n.v(n.f("threadColor", e, t, 0)));
                n.b("; color: ");
                n.b(n.v(n.f("threadColor", e, t, 0)));
                n.b("; fill: ");
                n.b(n.v(n.f("threadColor", e, t, 0)));
                n.b('"');
            }), e.pop()
        };
        r.b(' title="Commenting on a thread">');
        r.b("\n" + n);
        r.b(r.rp("<commentsIcon0", e, t, "  "));
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<commentsIcon0": {
            name: "commentsIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, '<div class="thread-indicator" {{#threadColor}}style="border-color: {{threadColor}}; color: {{threadColor}}; fill: {{threadColor}}"{{/threadColor}} title="Commenting on a thread">\n  {{> commentsIcon}}\n</div>\n', r);