var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='spotify-icon'><img src='");
        r.b(r.v(r.f("icon", e, t, 0)));
        r.b("'></span>");
        r.b("\n" + n);
        r.b("<span class='spotify-album'>");
        r.b("\n" + n);
        r.b("  <strong>");
        r.b(r.v(r.f("album", e, t, 0)));
        r.b("</strong>");
        r.b("\n" + n);
        r.b("  by ");
        r.b(r.v(r.f("artist", e, t, 0)));
        r.b("\n" + n);
        r.b("</span><span class='spotify-meta'>on Spotify</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='spotify-icon'><img src='{{icon}}'></span>\n<span class='spotify-album'>\n  <strong>{{album}}</strong>\n  by {{artist}}\n</span><span class='spotify-meta'>on Spotify</span>\n", r);