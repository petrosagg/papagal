var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='meta'>");
        r.b("\n" + n);
        r.b("  <ul class='items clean'>");
        r.b("\n" + n);
        r.b("    <li class='item'>");
        r.b("\n" + n);
        r.b("      <div class='type-icon ");
        r.b(r.v(r.f("iconType", e, t, 0)));
        r.b("'></div>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("    <li class='item'>");
        r.b("\n" + n);
        r.b(r.rp("<author0", e, t, "      "));
        r.b("      ");
        r.b(r.t(r.f("timestamp", e, t, 0)));
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        if (r.s(r.f("meta", e, t, 1), e, t, 0, 213, 227, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.rp("<metaItem1", e, t, ""));
            }), e.pop()
        };
        if (r.s(r.f("mainLink", e, t, 1), e, t, 0, 254, 450, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <li class='item main-link'>");
                r.b("\n" + n);
                r.b("      <a href='");
                r.b(r.v(r.f("mainLink", e, t, 0)));
                r.b("'>");
                r.b("\n" + n);
                r.b("        <span class='main-link-text'>");
                r.b(r.v(r.f("actionLinkTitle", e, t, 0)));
                r.b("</span>");
                r.b("\n" + n);
                r.b("        <i class='fa fa-external-link'></i>");
                r.b("\n" + n);
                r.b("      </a>");
                r.b("\n" + n);
                r.b("    </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("  <ul class='tags clean'></ul>");
        r.b("\n" + n);
        r.b("  <ul class='emoji-reactions'>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<author0": {
            name: "author",
            partials: {},
            subs: {}
        },
        "<metaItem1": {
            name: "metaItem",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<div class='meta'>\n  <ul class='items clean'>\n    <li class='item'>\n      <div class='type-icon {{iconType}}'></div>\n    </li>\n    <li class='item'>\n      {{> author}}\n      {{& timestamp}}\n    </li>\n    {{#meta}}{{> metaItem}}{{/meta}}\n    {{#mainLink}}\n    <li class='item main-link'>\n      <a href='{{mainLink}}'>\n        <span class='main-link-text'>{{actionLinkTitle}}</span>\n        <i class='fa fa-external-link'></i>\n      </a>\n    </li>\n    {{/mainLink}}\n  </ul>\n  <ul class='tags clean'></ul>\n  <ul class='emoji-reactions'>\n</div>\n", r);