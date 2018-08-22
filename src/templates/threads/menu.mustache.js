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
        r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <li>"), r.b("\n" + n), 
        r.b("    <a class='edit-tags' title='Edit message tags.'>"), r.b("\n" + n), r.b(r.rp("<editTagsSVGIcon3", e, t, "      ")), 
        r.b("    </a>"), r.b("\n" + n), r.b("  </li>"), r.b("\n" + n), r.b("  <li>"), r.b("\n" + n), 
        r.b("    <a class='emoji-reaction-button' title='Add emoji reaction.'>"), r.b("\n" + n), 
        r.b(r.rp("<emojiReactionSymbolSVGIcon4", e, t, "      ")), r.b("    </a>"), r.b("\n" + n), 
        r.b("  </li>"), r.b("\n" + n));
        r.b("</menu>");
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
        "<editTagsSVGIcon3": {
            name: "editTagsSVGIcon",
            partials: {},
            subs: {}
        },
        "<emojiReactionSymbolSVGIcon4": {
            name: "emojiReactionSymbolSVGIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<menu class='message-actions clean'>\n  {{#removable}}\n  <li>\n    <a class='delete' title='Delete message'>\n      {{> deleteSVGIcon}}\n    </a>\n  </li>\n  {{/removable}}\n  {{#editable}}\n  <li>\n    <a class='edit-message' title='Edit this message.'>\n      {{> editSVGIcon}}\n    </a>\n  </li>\n  {{/editable}}\n  {{#sendableToRally}}\n  <li>\n    <a class='share-with-rally' title='Share with Rally.'>\n      {{> shareSVGIcon}}\n    </a>\n  </li>\n  {{/sendableToRally}}\n  {{^emptied}}\n  <li>\n    <a class='edit-tags' title='Edit message tags.'>\n      {{> editTagsSVGIcon}}\n    </a>\n  </li>\n  <li>\n    <a class='emoji-reaction-button' title='Add emoji reaction.'>\n      {{> emojiReactionSymbolSVGIcon}}\n    </a>\n  </li>\n  {{/emptied}}\n</menu>\n", r);