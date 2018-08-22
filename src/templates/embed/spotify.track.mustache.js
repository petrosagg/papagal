var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='spotify-icon'><img src='");
        r.b(r.v(r.f("icon", e, t, 0)));
        r.b("'></span>");
        r.b("\n" + n);
        r.b("<span class='spotify-track'>");
        r.b("\n" + n);
        r.b("  <strong>");
        r.b(r.v(r.f("track", e, t, 0)));
        r.b("</strong>");
        r.b("\n" + n);
        r.b("  on ");
        r.b(r.v(r.f("album", e, t, 0)));
        r.b(" by ");
        r.b(r.v(r.f("artist", e, t, 0)));
        r.b("\n" + n);
        r.b("</span><span class='spotify-meta'>on Spotify</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<span class='spotify-icon'><img src='{{icon}}'></span>\n<span class='spotify-track'>\n  <strong>{{track}}</strong>\n  on {{album}} by {{artist}}\n</span><span class='spotify-meta'>on Spotify</span>\n", r);