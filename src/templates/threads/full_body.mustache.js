var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='thread-comment-unexcerpt' dir='auto'>");
        r.b("\n" + n);
        if (r.s(r.f("bubble", e, t, 1), e, t, 0, 63, 109, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("      <div class='bubble-container'></div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b(r.rp("<messageMenu0", e, t, "  "));
        r.b("  ");
        r.b(r.t(r.f("full_body", e, t, 0)));
        r.b("\n" + n);
        r.b(r.rp("<messageFooter1", e, t, "  "));
        if (r.s(r.f("hasAttachments", e, t, 1), e, t, 0, 204, 334, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <hr class='thread-activity-attachments-separator'>");
                r.b("\n" + n);
                r.b("    <section class='thread-activity-attachments attachments'></section>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<messageMenu0": {
            name: "messageMenu",
            partials: {},
            subs: {}
        },
        "<messageFooter1": {
            name: "messageFooter",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<div class='thread-comment-unexcerpt' dir='auto'>\n  {{#bubble}}\n      <div class='bubble-container'></div>\n  {{/bubble}}\n  {{> messageMenu }}\n  {{& full_body }}\n  {{> messageFooter}}\n  {{#hasAttachments}}\n    <hr class='thread-activity-attachments-separator'>\n    <section class='thread-activity-attachments attachments'></section>\n  {{/hasAttachments}}\n</div>\n", r);