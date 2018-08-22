var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.rp("<messageHeader0", e, t, ""));
        r.b("<div class='content' dir='auto'>");
        r.b("\n" + n);
        if (r.s(r.f("emptied", e, t, 1), e, t, 0, 67, 146, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <span class='deleted'>This message was deleted at</span>");
                r.b("\n" + n);
                r.b("  ");
                r.b(r.t(r.f("editTime", e, t, 0)));
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <div class='msg-body'>"), 
        r.b(r.t(r.f("content", e, t, 0))), r.b("</div>"), r.b("\n" + n), r.b(r.rp("<messageFooter1", e, t, "  ")));
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<messageHeader0": {
            name: "messageHeader",
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
}, "{{> messageHeader}}\n<div class='content' dir='auto'>\n  {{#emptied}}\n  <span class='deleted'>This message was deleted at</span>\n  {{& editTime}}\n  {{/emptied}}\n  {{^emptied}}\n  <div class='msg-body'>{{& content}}</div>\n  {{> messageFooter}}\n  {{/emptied}}\n</div>\n", r);