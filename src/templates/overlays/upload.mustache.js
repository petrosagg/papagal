var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<h3>Drop files to ");
        r.b(r.v(r.f("targetName", e, t, 0)));
        r.b("</h3>");
        r.b("\n" + n);
        r.b("<p>Single file size is limited to 200MB.</p>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<h3>Drop files to {{targetName}}</h3>\n<p>Single file size is limited to 200MB.</p>\n", r);