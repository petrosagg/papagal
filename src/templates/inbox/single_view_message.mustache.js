var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("showMeta", e, t, 1), e, t, 0, 13, 203, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<div class='single-message-meta'>");
                r.b("\n" + n);
                r.b(r.rp("<meta0", e, t, "  "));
                r.b("</div>");
                r.b("\n" + n);
                r.b("<div class='single-message-tags'>");
                r.b("\n" + n);
                r.b("  <a class='tag-edit-link'><i class=\"fa fa-pencil\"></i> Edit tags</a>");
                r.b("\n" + n);
                r.b("  <ul class='tags'></ul>");
                r.b("\n" + n);
                r.b("</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("deprecated", e, t, 1), e, t, 0, 232, 423, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<br>");
                r.b("\n" + n);
                r.b("<div class='warning-green'>");
                r.b("\n" + n);
                r.b("  <i class='fa fa-fw fa-warning'></i>");
                r.b("\n" + n);
                r.b('  A new version of this integration is available. <a class="upgrade-integration">Upgrade</a> to start using it!');
                r.b("\n" + n);
                r.b("</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("<section class='single-message-body body'>");
        if (r.s(r.f("body", e, t, 1), e, t, 0, 490, 500, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.t(n.f("body", e, t, 0)));
            }), e.pop()
        };
        r.b("</section>");
        r.b("\n" + n);
        if (r.s(r.f("hasAttachments", e, t, 1), e, t, 0, 539, 607, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<section class='single-message-attachments attachments'></section>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {
        "<meta0": {
            name: "meta",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{#showMeta}}\n<div class='single-message-meta'>\n  {{>meta}}\n</div>\n<div class='single-message-tags'>\n  <a class='tag-edit-link'><i class=\"fa fa-pencil\"></i> Edit tags</a>\n  <ul class='tags'></ul>\n</div>\n{{/showMeta}}\n{{#deprecated}}\n<br>\n<div class='warning-green'>\n  <i class='fa fa-fw fa-warning'></i>\n  A new version of this integration is available. <a class=\"upgrade-integration\">Upgrade</a> to start using it!\n</div>\n{{/deprecated}}\n<section class='single-message-body body'>{{#body}}{{& body}}{{/body}}</section>\n{{#hasAttachments}}\n<section class='single-message-attachments attachments'></section>\n{{/hasAttachments}}\n", r);