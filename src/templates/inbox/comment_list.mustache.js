var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.s(r.f("hasContext", e, t, 1), e, t, 1, 0, 0, "") || (r.b("<header class='comment-list-header'><i class=\"fa fa-comment\"></i> Comments</header>"), 
        r.b("\n" + n));
        r.b("<ul class='comment-list'></ul>");
        r.b("\n" + n);
        r.b("<div class='comment-list-footer'></div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{^hasContext}}\n<header class='comment-list-header'><i class=\"fa fa-comment\"></i> Comments</header>\n{{/hasContext}}\n<ul class='comment-list'></ul>\n<div class='comment-list-footer'></div>\n", r);