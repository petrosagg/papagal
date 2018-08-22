var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='instructions-overlay disabled'>");
        r.b("\n" + n);
        r.b("  <div class='instructions-content'>");
        r.b("\n" + n);
        r.b("    <i class='fa fa-lock fa-fw'></i>");
        r.b("\n" + n);
        r.b("    <i>This message can't be dragged into another thread.</i>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='instructions-overlay disabled'>\n  <div class='instructions-content'>\n    <i class='fa fa-lock fa-fw'></i>\n    <i>This message can't be dragged into another thread.</i>\n  </div>\n</div>\n", r);