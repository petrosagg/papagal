var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<li class='list-empty-message'>");
        r.b("\n" + n);
        r.b("  You'll see notifications here when someone mentions <strong>@");
        r.b(r.v(r.f("nick", e, t, 0)));
        r.b("</strong> or <strong>@everyone</strong> in one of your flows or sends you a 1-to-1 message.");
        r.b("\n" + n);
        r.b("</li>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<li class='list-empty-message'>\n  You'll see notifications here when someone mentions <strong>@{{nick}}</strong> or <strong>@everyone</strong> in one of your flows or sends you a 1-to-1 message.\n</li>\n", r);