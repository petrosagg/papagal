var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='close-overlay' title='Close this view.'>");
        r.b("\n" + n);
        r.b("  <span class='fa-stack fa-2x'>");
        r.b("\n" + n);
        r.b("    <i class='fa fa-circle fa-stack-2x'></i>");
        r.b("\n" + n);
        r.b("    <i class='fa fa-times fa-stack-1x fa-inverse'></i>");
        r.b("\n" + n);
        r.b("  </span>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='close-overlay' title='Close this view.'>\n  <span class='fa-stack fa-2x'>\n    <i class='fa fa-circle fa-stack-2x'></i>\n    <i class='fa fa-times fa-stack-1x fa-inverse'></i>\n  </span>\n</a>\n", r);