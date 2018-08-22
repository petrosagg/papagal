var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<menu class='message-actions clean'>");
        r.b("\n" + n);
        r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <li>"), r.b("\n" + n), 
        r.b("    <a class='edit-tags'>"), r.b("\n" + n), r.b(r.rp("<editTagsSVGIcon0", e, t, "      ")), 
        r.b("    </a>"), r.b("\n" + n), r.b("  </li>"), r.b("\n" + n), r.b("  <li>"), r.b("\n" + n), 
        r.b("    <a class='emoji-reaction-button' title='Add emoji reaction.'>"), r.b("\n" + n), 
        r.b(r.rp("<emojiReactionSymbolSVGIcon1", e, t, "      ")), r.b("    </a>"), r.b("\n" + n), 
        r.b("  </li>"), r.b("\n" + n));
        r.b("  <li class='dropdown sw'>");
        r.b("\n" + n);
        r.b("    <a class='more dropdown-toggle'>");
        r.b("\n" + n);
        r.b("      <span class='fa-stack'>");
        r.b("\n" + n);
        r.b(r.rp("<menuIcon2", e, t, "        "));
        r.b("      </span>");
        r.b("\n" + n);
        r.b("    </a>");
        r.b("\n" + n);
        r.b("    <menu class='dropdown-menu capitalize'></menu>");
        r.b("\n" + n);
        r.b("  </li>");
        r.b("\n" + n);
        r.b("</menu>");
        r.b("\n" + n);
        r.b("<div class='avatar' title='");
        r.b(r.v(r.d("author.name", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  <div class='comment-count'>");
        r.b(r.v(r.f("commentCount", e, t, 0)));
        r.b("</div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n" + n);
        r.b("<header>");
        r.b("\n" + n);
        r.s(r.f("hideTitle", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <p class='title'>"), 
        r.b("\n" + n), r.s(r.f("status", e, t, 1), e, t, 0, 646, 744, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("    <span class='thread-status thread-status-small ");
            r.b(r.v(r.d("status.color", e, t, 0)));
            r.b("'>");
            r.b(r.v(r.d("status.value", e, t, 0)));
            r.b("</span>");
            r.b("\n" + n);
        }), e.pop()), r.s(r.f("hideHeadline", e, t, 1), e, t, 1, 0, 0, "") || r.b(r.rp("<headline3", e, t, "    ")), 
        r.b("  </p>"), r.b("\n" + n));
        r.b(r.rp("<excerpt4", e, t, "  "));
        r.s(r.f("metaInExcerpt", e, t, 1), e, t, 1, 0, 0, "") || r.b(r.rp("<itemMeta5", e, t, "  "));
        r.b("</header>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<editTagsSVGIcon0": {
            name: "editTagsSVGIcon",
            partials: {},
            subs: {}
        },
        "<emojiReactionSymbolSVGIcon1": {
            name: "emojiReactionSymbolSVGIcon",
            partials: {},
            subs: {}
        },
        "<menuIcon2": {
            name: "menuIcon",
            partials: {},
            subs: {}
        },
        "<headline3": {
            name: "headline",
            partials: {},
            subs: {}
        },
        "<excerpt4": {
            name: "excerpt",
            partials: {},
            subs: {}
        },
        "<itemMeta5": {
            name: "itemMeta",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<menu class='message-actions clean'>\n  {{^emptied}}\n  <li>\n    <a class='edit-tags'>\n      {{> editTagsSVGIcon}}\n    </a>\n  </li>\n  <li>\n    <a class='emoji-reaction-button' title='Add emoji reaction.'>\n      {{> emojiReactionSymbolSVGIcon}}\n    </a>\n  </li>\n  {{/emptied}}\n  <li class='dropdown sw'>\n    <a class='more dropdown-toggle'>\n      <span class='fa-stack'>\n        {{> menuIcon}}\n      </span>\n    </a>\n    <menu class='dropdown-menu capitalize'></menu>\n  </li>\n</menu>\n<div class='avatar' title='{{author.name}}'>\n  <div class='comment-count'>{{commentCount}}</div>\n</div>\n<header>\n  {{^hideTitle}}\n  <p class='title'>\n    {{#status}}\n    <span class='thread-status thread-status-small {{status.color}}'>{{status.value}}</span>\n    {{/status}}\n    {{^hideHeadline}}\n    {{> headline}}\n    {{/hideHeadline}}\n  </p>\n  {{/hideTitle}}\n  {{> excerpt}}\n  {{^metaInExcerpt}}\n  {{> itemMeta}}\n  {{/metaInExcerpt}}\n</header>\n", r);