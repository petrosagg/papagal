var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.rp("<messageMenu0", e, t, ""));
        if (r.s(r.f("renderSource", e, t, 1), e, t, 0, 36, 168, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <div class='thread-source-indicator'>");
                r.b("\n" + n);
                r.b("    <img class='thread-action-source-icon' src='");
                r.b(r.v(r.d("source.application.icon_url", e, t, 0)));
                r.b("'>");
                r.b("\n" + n);
                r.b("  </div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("\n" + n);
        if (r.s(r.f("bubble", e, t, 1), e, t, 0, 198, 240, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <div class='bubble-container'></div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("<img alt='");
        r.b(r.v(r.f("author", e, t, 0)));
        r.b("' class='thread-avatar thread-comment-avatar' src='");
        r.b(r.v(r.f("avatar", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        if (r.s(r.f("displayableUserCard", e, t, 1), e, t, 0, 360, 433, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b("<span class='message-author' data-user='");
                n.b(n.v(n.d("user.id", e, t, 0)));
                n.b("'>");
                n.b(n.v(n.d("user.nick", e, t, 0)));
                n.b("</span>");
            }), e.pop()
        };
        r.b("\n" + n);
        r.s(r.f("displayableUserCard", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<span class='thread-author'>"), 
        r.b(r.v(r.f("author", e, t, 0))), r.b("</span>"));
        r.b("\n" + n);
        r.b("<span class='thread-action' dir='auto'>");
        r.b(r.t(r.f("title", e, t, 0)));
        r.b("\n" + n);
        if (r.s(r.f("renderSource", e, t, 1), e, t, 0, 621, 653, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("on");
                r.b("\n" + n);
                r.b(r.v(r.d("source.application.name", e, t, 0)));
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<a class='timestamp-link' href='"), 
        r.b(r.v(r.f("permalink", e, t, 0))), r.b("'><date class='timestamp' datetime='"), 
        r.b(r.v(r.f("datetime", e, t, 0))), r.b("' title='"), r.b(r.v(r.f("longTime", e, t, 0))), 
        r.b("'>"), r.b(r.v(r.f("timeFromNow", e, t, 0))), r.b("</date></a>"));
        r.b("</span>");
        r.b("\n");
        r.b("\n" + n);
        r.b("<div class='thread-comment content' dir='auto'>");
        r.b("\n" + n);
        if (r.s(r.f("emptied", e, t, 1), e, t, 0, 908, 971, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <span>This message was deleted at</span>");
                r.b("\n" + n);
                r.b("  ");
                r.b(r.t(r.f("editTime", e, t, 0)));
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.s(r.f("body", e, t, 1), e, t, 0, 1010, 1055, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("  <div class='msg-body'>");
            r.b(r.t(r.f("body", e, t, 0)));
            r.b("</div>");
            r.b("\n" + n);
        }), e.pop()), r.b(r.rp("<messageFooter1", e, t, "  ")), r.s(r.f("hasAttachments", e, t, 1), e, t, 0, 1108, 1234, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("  <hr class='thread-activity-attachments-separator'>");
            r.b("\n" + n);
            r.b("  <section class='thread-activity-attachments attachments'></section>");
            r.b("\n" + n);
        }), e.pop()));
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
}, "{{> messageMenu }}\n{{#renderSource}}\n  <div class='thread-source-indicator'>\n    <img class='thread-action-source-icon' src='{{source.application.icon_url}}'>\n  </div>\n{{/renderSource}}\n\n{{#bubble}}\n    <div class='bubble-container'></div>\n{{/bubble}}\n<img alt='{{author}}' class='thread-avatar thread-comment-avatar' src='{{avatar}}'>\n{{#displayableUserCard}}<span class='message-author' data-user='{{user.id}}'>{{user.nick}}</span>{{/displayableUserCard}}\n{{^displayableUserCard}}<span class='thread-author'>{{author}}</span>{{/displayableUserCard}}\n<span class='thread-action' dir='auto'>{{& title }}\n{{#renderSource}}\non\n{{source.application.name}}\n{{/renderSource}}\n{{^emptied}}<a class='timestamp-link' href='{{permalink}}'><date class='timestamp' datetime='{{datetime}}' title='{{longTime}}'>{{timeFromNow}}</date></a>{{/emptied}}</span>\n\n<div class='thread-comment content' dir='auto'>\n  {{#emptied}}\n  <span>This message was deleted at</span>\n  {{& editTime}}\n  {{/emptied}}\n  {{^emptied}}\n  {{#body}}\n  <div class='msg-body'>{{& body }}</div>\n  {{/body}}\n  {{> messageFooter}}\n  {{#hasAttachments}}\n  <hr class='thread-activity-attachments-separator'>\n  <section class='thread-activity-attachments attachments'></section>\n  {{/hasAttachments}}\n  {{/emptied}}\n</div>\n", r);