var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<menu class='message-actions clean'>");
        r.b("\n" + n);
        if (r.s(r.f("removable", e, t, 1), e, t, 0, 53, 152, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <li>");
                r.b("\n" + n);
                r.b("    <a class='delete' title='Delete message'>");
                r.b("\n" + n);
                r.b(r.rp("<deleteSVGIcon0", e, t, "      "));
                r.b("    </a>");
                r.b("\n" + n);
                r.b("  </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("editable", e, t, 1), e, t, 0, 182, 289, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <li>");
                r.b("\n" + n);
                r.b("    <a class='edit-message' title='Edit this message.'>");
                r.b("\n" + n);
                r.b(r.rp("<editSVGIcon1", e, t, "      "));
                r.b("    </a>");
                r.b("\n" + n);
                r.b("  </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <li>"), r.b("\n" + n), 
        r.b("    <a class='edit-tags' title='Edit message tags.'>"), r.b("\n" + n), r.b(r.rp("<editTagsSVGIcon2", e, t, "      ")), 
        r.b("    </a>"), r.b("\n" + n), r.b("  </li>"), r.b("\n" + n), r.b("  <li>"), r.b("\n" + n), 
        r.b("    <a class='emoji-reaction-button' title='Add emoji reaction.'>"), r.b("\n" + n), 
        r.b(r.rp("<emojiReactionSymbolSVGIcon3", e, t, "      ")), r.b("    </a>"), r.b("\n" + n), 
        r.b("  </li>"), r.b("\n" + n));
        r.b("</menu>");
        r.b("\n" + n);
        if (r.s(r.f("renderSource", e, t, 1), e, t, 0, 592, 718, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<div class='thread-source-indicator'>");
                r.b("\n" + n);
                r.b("  <img class='thread-action-source-icon' src='");
                r.b(r.v(r.d("source.application.icon_url", e, t, 0)));
                r.b("'>");
                r.b("\n" + n);
                r.b("</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("<img alt='");
        r.b(r.v(r.f("author", e, t, 0)));
        r.b("' class='thread-avatar thread-action-avatar' src='");
        r.b(r.v(r.f("avatar", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("<div class='thread-action-body'>");
        r.b("\n" + n);
        r.b("  <span class='thread-author'>");
        r.b(r.v(r.f("author", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("  <span class='thread-action'>");
        r.b("\n" + n);
        r.b("    ");
        r.b(r.t(r.f("title", e, t, 0)));
        r.b("\n" + n);
        r.b("    <date class='timestamp' datetime='");
        r.b(r.v(r.f("datetime", e, t, 0)));
        r.b("' title='");
        r.b(r.v(r.f("longTime", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("      ");
        r.b(r.v(r.f("timeFromNow", e, t, 0)));
        r.b("\n" + n);
        r.b("    </date>");
        r.b("\n" + n);
        r.b("  </span>");
        r.b("\n" + n);
        if (r.s(r.f("body", e, t, 1), e, t, 0, 1077, 1172, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <div class='thread-comment content'>");
                r.b("\n" + n);
                r.b("    <div class='msg-body'>");
                r.b(r.t(r.f("body", e, t, 0)));
                r.b("</div>");
                r.b("\n" + n);
                r.b("  </div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b(r.rp("<messageFooter4", e, t, "  "));
        if (r.s(r.f("hasAttachments", e, t, 1), e, t, 0, 1225, 1351, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <hr class='thread-activity-attachments-separator'>");
                r.b("\n" + n);
                r.b("  <section class='thread-activity-attachments attachments'></section>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<deleteSVGIcon0": {
            name: "deleteSVGIcon",
            partials: {},
            subs: {}
        },
        "<editSVGIcon1": {
            name: "editSVGIcon",
            partials: {},
            subs: {}
        },
        "<editTagsSVGIcon2": {
            name: "editTagsSVGIcon",
            partials: {},
            subs: {}
        },
        "<emojiReactionSymbolSVGIcon3": {
            name: "emojiReactionSymbolSVGIcon",
            partials: {},
            subs: {}
        },
        "<messageFooter4": {
            name: "messageFooter",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<menu class='message-actions clean'>\n  {{#removable}}\n  <li>\n    <a class='delete' title='Delete message'>\n      {{> deleteSVGIcon}}\n    </a>\n  </li>\n  {{/removable}}\n  {{#editable}}\n  <li>\n    <a class='edit-message' title='Edit this message.'>\n      {{> editSVGIcon}}\n    </a>\n  </li>\n  {{/editable}}\n  {{^emptied}}\n  <li>\n    <a class='edit-tags' title='Edit message tags.'>\n      {{> editTagsSVGIcon}}\n    </a>\n  </li>\n  <li>\n    <a class='emoji-reaction-button' title='Add emoji reaction.'>\n      {{> emojiReactionSymbolSVGIcon}}\n    </a>\n  </li>\n  {{/emptied}}\n</menu>\n{{#renderSource}}\n<div class='thread-source-indicator'>\n  <img class='thread-action-source-icon' src='{{source.application.icon_url}}'>\n</div>\n{{/renderSource}}\n<img alt='{{author}}' class='thread-avatar thread-action-avatar' src='{{avatar}}'>\n<div class='thread-action-body'>\n  <span class='thread-author'>{{author}}</span>\n  <span class='thread-action'>\n    {{& title }}\n    <date class='timestamp' datetime='{{datetime}}' title='{{longTime}}'>\n      {{timeFromNow}}\n    </date>\n  </span>\n  {{#body}}\n  <div class='thread-comment content'>\n    <div class='msg-body'>{{& body }}</div>\n  </div>\n  {{/body}}\n  {{> messageFooter}}\n  {{#hasAttachments}}\n  <hr class='thread-activity-attachments-separator'>\n  <section class='thread-activity-attachments attachments'></section>\n  {{/hasAttachments}}\n</div>\n", r);