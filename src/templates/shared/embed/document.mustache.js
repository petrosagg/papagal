var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='document-preview-link' href='");
        r.b(r.v(r.f("url", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  <span class='icon ");
        r.b(r.v(r.f("type", e, t, 0)));
        r.b("'></span>");
        r.b("\n" + n);
        r.b("  ");
        r.b(r.v(r.f("url", e, t, 0)));
        r.b("\n" + n);
        r.b("  <i class='fa fa-external-link'></i>");
        r.b("\n" + n);
        r.b("</a>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='document-preview-link' href='{{url}}'>\n  <span class='icon {{type}}'></span>\n  {{url}}\n  <i class='fa fa-external-link'></i>\n</a>", r);