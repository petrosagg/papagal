var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<div class="commands-content">');
        r.b("\n" + n);
        r.b('  <p class="commands-menu-header">Commands</p>');
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<div class="commands-content">\n  <p class="commands-menu-header">Commands</p>\n</div>\n', r);