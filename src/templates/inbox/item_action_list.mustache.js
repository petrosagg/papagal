var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.d("presenter.actions", e, t, 1), e, t, 0, 22, 291, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<li>");
                r.b("\n" + n);
                r.b("  <a href='");
                r.b(r.v(r.f("link", e, t, 0)));
                r.b("' target='_blank' rel='noopener noreferrer'>");
                r.b("\n" + n);
                if (r.s(r.f("className", e, t, 1), e, t, 0, 110, 166, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("    <i class='fa fa-fw fa-");
                        r.b(r.v(r.f("className", e, t, 0)));
                        r.b(" icon'></i>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.f("className", e, t, 1), e, t, 1, 0, 0, "") || (r.b("    <i class='fa fa-fw fa-"), 
                r.b(r.v(r.f("text", e, t, 0))), r.b(" icon'></i>"), r.b("\n" + n));
                r.b("    ");
                r.b(r.v(r.f("text", e, t, 0)));
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("hasContext", e, t, 1), e, t, 0, 329, 433, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<li>");
                r.b("\n" + n);
                r.b("  <a class='context'>");
                r.b("\n" + n);
                r.b("    <i class='icon fa fa-fw fa-comments'></i>");
                r.b("\n" + n);
                r.b("    Show in Chat");
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("mainLink", e, t, 1), e, t, 0, 462, 646, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<li>");
                r.b("\n" + n);
                r.b("  <a class='original' href='");
                r.b(r.v(r.f("mainLink", e, t, 0)));
                r.b("' target='_blank' rel='noopener noreferrer'>");
                r.b("\n" + n);
                r.b("    <i class='icon fa fa-fw fa-external-link-square'></i>");
                r.b("\n" + n);
                r.b("    ");
                r.b(r.v(r.f("mainLinkTitle", e, t, 0)));
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("removable", e, t, 1), e, t, 0, 674, 770, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<li>");
                r.b("\n" + n);
                r.b("  <a class='delete'>");
                r.b("\n" + n);
                r.b("    <i class='icon fa fa-fw fa-trash-o'></i>");
                r.b("\n" + n);
                r.b("    Delete");
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
                r.b("</li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("<li class='permalink-item' data-close-delay='250'>");
        r.b("\n" + n);
        r.b("  <a class='permalink' data-clipboard-text='");
        r.b(r.v(r.f("url", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("    <i class='icon fa fa-fw fa-link'></i>");
        r.b("\n" + n);
        r.b("    Copy Link");
        r.b("\n" + n);
        r.b("  </a>");
        r.b("\n" + n);
        r.b("</li>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#presenter.actions}}\n<li>\n  <a href='{{link}}' target='_blank' rel='noopener noreferrer'>\n    {{#className}}\n    <i class='fa fa-fw fa-{{className}} icon'></i>\n    {{/className}}\n    {{^className}}\n    <i class='fa fa-fw fa-{{text}} icon'></i>\n    {{/className}}\n    {{text}}\n  </a>\n</li>\n{{/presenter.actions}}\n{{#hasContext}}\n<li>\n  <a class='context'>\n    <i class='icon fa fa-fw fa-comments'></i>\n    Show in Chat\n  </a>\n</li>\n{{/hasContext}}\n{{#mainLink}}\n<li>\n  <a class='original' href='{{mainLink}}' target='_blank' rel='noopener noreferrer'>\n    <i class='icon fa fa-fw fa-external-link-square'></i>\n    {{mainLinkTitle}}\n  </a>\n</li>\n{{/mainLink}}\n{{#removable}}\n<li>\n  <a class='delete'>\n    <i class='icon fa fa-fw fa-trash-o'></i>\n    Delete\n  </a>\n</li>\n{{/removable}}\n<li class='permalink-item' data-close-delay='250'>\n  <a class='permalink' data-clipboard-text='{{url}}'>\n    <i class='icon fa fa-fw fa-link'></i>\n    Copy Link\n  </a>\n</li>\n", r);