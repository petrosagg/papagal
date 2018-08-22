var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='toolbar-link' id='search-toggle' title='Search and filter messages'>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-search fa-lg'></i>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-caret-down'></i>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n" + n);
        r.b("<form id='search-form'>");
        r.b("\n" + n);
        r.b("  <a class='toolbar-link' id='filter-reset'>");
        r.b("\n" + n);
        r.b("    <i class='fa fa-times fa-fw'></i>");
        r.b("\n" + n);
        r.b("  </a>");
        r.b("\n" + n);
        r.b("  <div class='tokenist' id='search-input'></div>");
        r.b("\n" + n);
        r.b("  <div class='full-text'></div>");
        r.b("\n" + n);
        r.b("  <ul class='autocompleter'></ul>");
        r.b("\n" + n);
        r.b("</form>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='toolbar-link' id='search-toggle' title='Search and filter messages'>\n  <i class='fa fa-search fa-lg'></i>\n  <i class='fa fa-caret-down'></i>\n</a>\n<form id='search-form'>\n  <a class='toolbar-link' id='filter-reset'>\n    <i class='fa fa-times fa-fw'></i>\n  </a>\n  <div class='tokenist' id='search-input'></div>\n  <div class='full-text'></div>\n  <ul class='autocompleter'></ul>\n</form>\n", r);