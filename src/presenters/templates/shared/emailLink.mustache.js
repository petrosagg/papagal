var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<a href="mailto:');
        r.b(r.v(r.f("email", e, t, 0)));
        r.b('">');
        r.b(r.v(r.f("name", e, t, 0)));
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<a href="mailto:{{email}}">{{name}}</a>\n', r);