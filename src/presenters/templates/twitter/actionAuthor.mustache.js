var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<a class="twitter-profile-link" href="https://twitter.com/');
        r.b(r.v(r.f("screen_name", e, t, 0)));
        r.b('">');
        r.b("\n" + n);
        r.b('<span class="screen-name">@');
        r.b(r.v(r.f("screen_name", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b('<span class="real-name">(');
        r.b(r.v(r.f("name", e, t, 0)));
        r.b(")</span></a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<a class="twitter-profile-link" href="https://twitter.com/{{screen_name}}">\n<span class="screen-name">@{{screen_name}}</span>\n<span class="real-name">({{name}})</span></a>\n', r);