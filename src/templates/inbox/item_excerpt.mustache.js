var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.d("excerpt.html", e, t, 1), e, t, 0, 17, 162, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<div class='excerpt'>");
                r.b("\n" + n);
                r.b("  ");
                r.b(r.t(r.d("excerpt.html", e, t, 0)));
                r.b(" ");
                if (r.s(r.f("editTime", e, t, 1), e, t, 0, 74, 88, "{{ }}")) {
                    r.rs(e, t, function(e, t, n) {
                        n.b(n.t(n.f("editTime", e, t, 0)));
                    }), e.pop()
                };
                r.b("\n" + n);
                if (r.s(r.f("metaInExcerpt", e, t, 1), e, t, 0, 122, 136, "{{ }}")) {
                    r.rs(e, t, function(e, t, n) {
                        n.b(n.rp("<itemMeta0", e, t, ""));
                    }), e.pop()
                };
                r.b("</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.d("excerpt.html", e, t, 1), e, t, 1, 0, 0, "") || (r.s(r.f("emptied", e, t, 1), e, t, 0, 210, 281, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("<div class='excerpt'>This message was deleted at ");
            r.b(r.t(r.f("editTime", e, t, 0)));
            r.b("</div>");
            r.b("\n" + n);
        }), e.pop()), r.s(r.f("emptied", e, t, 1), e, t, 1, 0, 0, "") || r.s(r.f("excerpt", e, t, 1), e, t, 0, 319, 402, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("<p class='excerpt'>");
            r.b("\n" + n);
            r.b("  ");
            r.b(r.v(r.f("excerpt", e, t, 0)));
            r.b("\n" + n);
            r.b("  ");
            if (r.s(r.f("editTime", e, t, 1), e, t, 0, 369, 383, "{{ }}")) {
                r.rs(e, t, function(e, t, n) {
                    n.b(n.t(n.f("editTime", e, t, 0)));
                }), e.pop()
            };
            r.b("\n" + n);
            r.b("</p>");
            r.b("\n" + n);
        }), e.pop()));
        return r.fl();
    },
    partials: {
        "<itemMeta0": {
            name: "itemMeta",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{#excerpt.html}}\n<div class='excerpt'>\n  {{& excerpt.html}} {{#editTime}}{{& editTime}}{{/editTime}}\n  {{#metaInExcerpt}}{{> itemMeta}}{{/metaInExcerpt}}\n</div>\n{{/excerpt.html}}\n{{^excerpt.html}}\n{{#emptied}}\n<div class='excerpt'>This message was deleted at {{& editTime}}</div>\n{{/emptied}}\n{{^emptied}}\n{{#excerpt}}\n<p class='excerpt'>\n  {{excerpt}}\n  {{#editTime}}{{& editTime}}{{/editTime}}\n</p>\n{{/excerpt}}\n{{/emptied}}\n{{/excerpt.html}}\n", r);