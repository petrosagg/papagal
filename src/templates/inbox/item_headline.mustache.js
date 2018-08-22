var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("emptiedAt", e, t, 1), e, t, 0, 14, 109, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<span class='detailed message-delete-time'>This message was deleted at</span>");
                r.b("\n" + n);
                r.b(r.t(r.f("emptiedAt", e, t, 0)));
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("emptiedAt", e, t, 1), e, t, 1, 0, 0, "") || (r.s(r.f("htmlHeadline", e, t, 1), e, t, 0, 156, 206, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("<span class='headline'>");
            r.b(r.t(r.f("htmlHeadline", e, t, 0)));
            r.b("</span>");
            r.b("\n" + n);
        }), e.pop()), r.s(r.f("htmlHeadline", e, t, 1), e, t, 1, 0, 0, "") || (r.s(r.f("headlineLink", e, t, 1), e, t, 0, 259, 417, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("<a href='");
            r.b(r.v(r.f("headlineLink", e, t, 0)));
            r.b("'>");
            r.b("\n" + n);
            r.b("  <span class='action'>");
            r.b(r.v(r.f("action", e, t, 0)));
            r.b("</span>");
            r.b("\n" + n);
            r.b("  <span class='headline'>");
            r.b(r.v(r.f("headline", e, t, 0)));
            r.b("</span>");
            r.b("\n" + n);
            r.b("  <i class='fa fa-external-link'></i>");
            r.b("\n" + n);
            r.b("</a>");
            r.b("\n" + n);
        }), e.pop()), r.s(r.f("headlineLink", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<span class='action'>"), 
        r.b(r.v(r.f("action", e, t, 0))), r.b("</span>"), r.b("\n" + n), r.b("<span class='headline'>"), 
        r.b(r.v(r.f("headline", e, t, 0))), r.b("</span>"), r.b("\n" + n))));
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#emptiedAt}}\n<span class='detailed message-delete-time'>This message was deleted at</span>\n{{& emptiedAt}}\n{{/emptiedAt}}\n{{^emptiedAt}}\n{{#htmlHeadline}}\n<span class='headline'>{{& htmlHeadline}}</span>\n{{/htmlHeadline}}\n{{^htmlHeadline}}\n{{#headlineLink}}\n<a href='{{headlineLink}}'>\n  <span class='action'>{{action}}</span>\n  <span class='headline'>{{headline}}</span>\n  <i class='fa fa-external-link'></i>\n</a>\n{{/headlineLink}}\n{{^headlineLink}}\n<span class='action'>{{action}}</span>\n<span class='headline'>{{headline}}</span>\n{{/headlineLink}}\n{{/htmlHeadline}}\n{{/emptiedAt}}\n", r);