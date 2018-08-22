var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='instructions-overlay enabled'>");
        r.b("\n" + n);
        r.b("  <div class='instructions-content'>");
        r.b("\n" + n);
        r.b("    <i class='fa fa-hand-o-up fa-fw'></i>");
        r.b("\n" + n);
        r.b("    <i>Drop message on a thread to add to thread. Esc to cancel.</i>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='instructions-overlay enabled'>\n  <div class='instructions-content'>\n    <i class='fa fa-hand-o-up fa-fw'></i>\n    <i>Drop message on a thread to add to thread. Esc to cancel.</i>\n  </div>\n</div>\n", r);