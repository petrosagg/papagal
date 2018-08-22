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
        if (r.s(r.f("sendableToRally", e, t, 1), e, t, 0, 325, 436, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <li>");
                r.b("\n" + n);
                r.b("    <a class='share-with-rally' title='Share with Rally.'>");
                r.b("\n" + n);
                r.b(r.rp("<shareSVGIcon2", e, t, "      "));
                r.b("    </a>");
                r.b("\n" + n);
                r.b("  </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("rethreadable", e, t, 1), e, t, 0, 476, 595, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <li>");
                r.b("\n" + n);
                r.b("    <a class='rethread-message' title='Rethread this message.'>");
                r.b("\n" + n);
                r.b(r.rp("<rethreadSVGIcon3", e, t, "      "));
                r.b("    </a>");
                r.b("\n" + n);
                r.b("  </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("private", e, t, 1), e, t, 1, 0, 0, "") || r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <li>"), 
        r.b("\n" + n), r.b("    <a class='edit-tags' title='Edit message tags.'>"), r.b("\n" + n), 
        r.b(r.rp("<editTagsSVGIcon4", e, t, "      ")), r.b("    </a>"), r.b("\n" + n), 
        r.b("  </li>"), r.b("\n" + n), r.b("  <li>"), r.b("\n" + n), r.b("    <a class='emoji-reaction-button' title='Add emoji reaction.'>"), 
        r.b("\n" + n), r.b(r.rp("<emojiReactionSymbolSVGIcon5", e, t, "      ")), r.b("    </a>"), 
        r.b("\n" + n), r.b("  </li>"), r.b("\n" + n));
        r.b("</menu>");
        r.b("\n" + n);
        r.s(r.f("noLeftSideMessageComponents", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<div class='bubble-container'></div>"), 
        r.b("\n" + n), r.b("<div class='avatar-container'></div>"), r.b("\n" + n));
        if (r.s(r.f("withoutNick", e, t, 1), e, t, 0, 1071, 1136, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<div class='message-author' data-user='");
                r.b(r.v(r.d("user.id", e, t, 0)));
                r.b("'>&nbsp</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("withoutNick", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<div class='message-author' data-user='"), 
        r.b(r.v(r.d("user.id", e, t, 0))), r.b("'>"), r.b(r.v(r.d("user.nick", e, t, 0))), 
        r.b("</div>"), r.b("\n" + n));
        r.b(r.t(r.f("timestamp", e, t, 0)));
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
        "<shareSVGIcon2": {
            name: "shareSVGIcon",
            partials: {},
            subs: {}
        },
        "<rethreadSVGIcon3": {
            name: "rethreadSVGIcon",
            partials: {},
            subs: {}
        },
        "<editTagsSVGIcon4": {
            name: "editTagsSVGIcon",
            partials: {},
            subs: {}
        },
        "<emojiReactionSymbolSVGIcon5": {
            name: "emojiReactionSymbolSVGIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<menu class='message-actions clean'>\n  {{#removable}}\n  <li>\n    <a class='delete' title='Delete message'>\n      {{> deleteSVGIcon}}\n    </a>\n  </li>\n  {{/removable}}\n  {{#editable}}\n  <li>\n    <a class='edit-message' title='Edit this message.'>\n      {{> editSVGIcon}}\n    </a>\n  </li>\n  {{/editable}}\n  {{#sendableToRally}}\n  <li>\n    <a class='share-with-rally' title='Share with Rally.'>\n      {{> shareSVGIcon}}\n    </a>\n  </li>\n  {{/sendableToRally}}\n  {{#rethreadable}}\n  <li>\n    <a class='rethread-message' title='Rethread this message.'>\n      {{> rethreadSVGIcon}}\n    </a>\n  </li>\n  {{/rethreadable}}\n  {{^private}}\n  {{^emptied}}\n  <li>\n    <a class='edit-tags' title='Edit message tags.'>\n      {{> editTagsSVGIcon}}\n    </a>\n  </li>\n  <li>\n    <a class='emoji-reaction-button' title='Add emoji reaction.'>\n      {{> emojiReactionSymbolSVGIcon}}\n    </a>\n  </li>\n  {{/emptied}}\n  {{/private}}\n</menu>\n{{^noLeftSideMessageComponents}}\n<div class='bubble-container'></div>\n<div class='avatar-container'></div>\n{{/noLeftSideMessageComponents}}\n{{#withoutNick}}\n<div class='message-author' data-user='{{user.id}}'>&nbsp</div>\n{{/withoutNick}}\n{{^withoutNick}}\n<div class='message-author' data-user='{{user.id}}'>{{user.nick}}</div>\n{{/withoutNick}}\n{{& timestamp}}\n", r);