var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<ol class="inbox-thread-list">');
        r.b("\n" + n);
        if (r.s(r.f("messages", e, t, 1), e, t, 0, 46, 568, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                if (r.s(r.f("single", e, t, 1), e, t, 0, 62, 129, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b('      <li class="inbox-thread-item inbox-thread-item-single">');
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.f("single", e, t, 1), e, t, 1, 0, 0, "") || (r.b('      <li class="inbox-thread-item">'), 
                r.b("\n" + n));
                r.b("\n" + n);
                r.b('      <img class="inbox-thread-author-avatar" src="');
                r.b(r.v(r.f("avatar", e, t, 0)));
                r.b('" />');
                r.b("\n" + n);
                r.b('      <span class="inbox-thread-author-name">');
                r.b(r.v(r.f("author", e, t, 0)));
                r.b("</span>");
                r.b("\n" + n);
                if (r.s(r.f("title", e, t, 1), e, t, 0, 356, 447, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b('      <span class="inbox-thread-title">');
                        r.b(r.t(r.f("title", e, t, 0)));
                        if (r.s(r.f("excerpt", e, t, 1), e, t, 0, 420, 421, "{{ }}")) {
                            r.rs(e, t, function(e, t, n) {
                                n.b(":");
                            }), e.pop()
                        };
                        r.b("</span>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                if (r.s(r.f("excerpt", e, t, 1), e, t, 0, 476, 543, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b('      <span class="inbox-thread-excerpt">');
                        r.b(r.v(r.f("excerpt", e, t, 0)));
                        r.b("</span>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.b("    </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</ol>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<ol class="inbox-thread-list">\n  {{#messages}}\n    {{#single}}\n      <li class="inbox-thread-item inbox-thread-item-single">\n    {{/single}}\n    {{^single}}\n      <li class="inbox-thread-item">\n    {{/single}}\n\n      <img class="inbox-thread-author-avatar" src="{{avatar}}" />\n      <span class="inbox-thread-author-name">{{author}}</span>\n      {{#title}}\n      <span class="inbox-thread-title">{{& title }}{{#excerpt}}:{{/excerpt}}</span>\n      {{/title}}\n      {{#excerpt}}\n      <span class="inbox-thread-excerpt">{{excerpt}}</span>\n      {{/excerpt}}\n    </li>\n  {{/messages}}\n</ol>\n', r);