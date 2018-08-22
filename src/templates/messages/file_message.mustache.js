var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.rp("<messageHeader0", e, t, ""));
        r.b("<div class='content'>");
        r.b("\n" + n);
        r.b(r.rp("<attachment1", e, t, "  "));
        r.b("  <ul class='tags'>");
        r.b("\n" + n);
        if (r.s(r.f("tags", e, t, 1), e, t, 0, 94, 118, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <li>");
                r.b(r.v(r.d(".", e, t, 0)));
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("  <ul class='emoji-reactions'>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<messageHeader0": {
            name: "messageHeader",
            partials: {},
            subs: {}
        },
        "<attachment1": {
            name: "attachment",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{> messageHeader}}\n<div class='content'>\n  {{> attachment}}\n  <ul class='tags'>\n    {{#tags}}\n    <li>{{.}}</li>\n    {{/tags}}\n  </ul>\n  <ul class='emoji-reactions'>\n</div>\n", r);