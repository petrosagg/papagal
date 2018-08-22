var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='thread-actions-toggle dropdown-toggle'>");
        r.b("\n" + n);
        r.b(r.rp("<menuIcon0", e, t, "  "));
        r.b("</a>");
        r.b("\n" + n);
        r.b("<menu class='dropdown-menu dropdown-offset'>");
        r.b("\n" + n);
        r.b("  <ul class='thread-action-list dropdown-actions capitalize'></ul>");
        r.b("\n" + n);
        r.b("  <ul class='item-action-list dropdown-actions capitalize'></ul>");
        r.b("\n" + n);
        r.b("</menu>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<menuIcon0": {
            name: "menuIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<a class='thread-actions-toggle dropdown-toggle'>\n  {{> menuIcon}}\n</a>\n<menu class='dropdown-menu dropdown-offset'>\n  <ul class='thread-action-list dropdown-actions capitalize'></ul>\n  <ul class='item-action-list dropdown-actions capitalize'></ul>\n</menu>\n", r);