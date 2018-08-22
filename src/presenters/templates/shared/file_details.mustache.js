var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<p class="attachment-description">');
        r.b("\n" + n);
        r.b("  ");
        r.b(r.v(r.d("attachment.file.name", e, t, 0)));
        r.b("<br>");
        r.b("\n" + n);
        r.b("  ");
        r.b(r.v(r.d("attachment.file.size", e, t, 0)));
        r.b("\n" + n);
        if (r.s(r.d("attachment.thumbnail", e, t, 1), e, t, 0, 120, 182, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  (");
                r.b(r.v(r.d("attachment.image.width", e, t, 0)));
                r.b("x");
                r.b(r.v(r.d("attachment.image.height", e, t, 0)));
                r.b(")");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</p>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<p class="attachment-description">\n  {{attachment.file.name}}<br>\n  {{attachment.file.size}}\n  {{#attachment.thumbnail}}\n  ({{attachment.image.width}}x{{attachment.image.height}})\n  {{/attachment.thumbnail}}\n</p>\n', r);