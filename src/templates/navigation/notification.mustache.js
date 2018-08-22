var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='notification-avatar' style='background-image: url(");
        r.b(r.v(r.f("avatar", e, t, 0)));
        r.b(");'></div>");
        r.b("\n" + n);
        r.b("<div class='notification-header'>");
        r.b("\n" + n);
        if (r.s(r.f("iconType", e, t, 1), e, t, 0, 132, 194, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <span class='icon-");
                r.b(r.v(r.f("iconType", e, t, 0)));
                r.b(" inline-type-icon'></span>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("iconType", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <span class='notification-author'>"), 
        r.b(r.v(r.d("user.name", e, t, 0))), r.b("</span>"), r.b("\n" + n));
        r.s(r.f("isPrivate", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <span class='notification-flow'>in "), 
        r.b(r.v(r.d("flow.name", e, t, 0))), r.b("</span>"), r.b("\n" + n));
        if (r.s(r.f("isPrivate", e, t, 1), e, t, 0, 405, 523, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                if (r.s(r.f("moreUnreadMessages", e, t, 1), e, t, 0, 431, 497, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("  <span class='unread-count'>and ");
                        r.b(r.v(r.f("moreUnreadMessages", e, t, 0)));
                        r.b("</span>");
                        r.b("\n" + n);
                    }), e.pop()
                };
            }), e.pop()
        };
        r.b("</div>");
        r.b("\n" + n);
        r.b("<div class='notification-content msg-body'>");
        r.b(r.t(r.f("message", e, t, 0)));
        r.b("</div>");
        r.b("\n");
        r.b("\n" + n);
        r.b('<div class="notification-actions">');
        r.b("\n" + n);
        r.b("  ");
        r.b(r.t(r.f("timestamp", e, t, 0)));
        r.b("\n" + n);
        if (r.s(r.f("unread", e, t, 1), e, t, 0, 676, 795, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <a class='notification-action mark-as-read' title='Mark as read'>");
                r.b("\n" + n);
                r.b("    <i class='fa fa-check-circle-o'></i>");
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("canIgnore", e, t, 1), e, t, 0, 823, 964, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b('  <a class="notification-action ignore-team" title="Stop @team notifications from this flow">');
                r.b("\n" + n);
                r.b('    <i class="fa fa-bell-slash"></i>');
                r.b("\n" + n);
                r.b("  </a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</div>");
        r.b("\n" + n);
        r.b("<div class='notification-overflow'></div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='notification-avatar' style='background-image: url({{avatar}});'></div>\n<div class='notification-header'>\n  {{#iconType}}\n  <span class='icon-{{iconType}} inline-type-icon'></span>\n  {{/iconType}}\n  {{^iconType}}\n  <span class='notification-author'>{{user.name}}</span>\n  {{/iconType}}\n  {{^isPrivate}}\n  <span class='notification-flow'>in {{flow.name}}</span>\n  {{/isPrivate}}\n  {{#isPrivate}}\n  {{#moreUnreadMessages}}\n  <span class='unread-count'>and {{moreUnreadMessages}}</span>\n  {{/moreUnreadMessages}}\n  {{/isPrivate}}\n</div>\n<div class='notification-content msg-body'>{{& message}}</div>\n\n<div class=\"notification-actions\">\n  {{& timestamp }}\n  {{#unread}}\n  <a class='notification-action mark-as-read' title='Mark as read'>\n    <i class='fa fa-check-circle-o'></i>\n  </a>\n  {{/unread}}\n  {{#canIgnore}}\n  <a class=\"notification-action ignore-team\" title=\"Stop @team notifications from this flow\">\n    <i class=\"fa fa-bell-slash\"></i>\n  </a>\n  {{/canIgnore}}\n</div>\n<div class='notification-overflow'></div>\n", r);