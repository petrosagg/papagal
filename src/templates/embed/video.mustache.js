var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='video-image'>");
        r.b("\n" + n);
        r.b("  <img src='");
        r.b(r.v(r.f("image", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-play video-play-button'></i>");
        r.b("\n" + n);
        r.b("  <span class='video-duration'>");
        r.b(r.v(r.f("duration", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n" + n);
        r.b("<span>");
        r.b("\n" + n);
        r.b("  <strong class='video-title'>");
        r.b(r.v(r.f("title", e, t, 0)));
        r.b("</strong>");
        r.b("\n" + n);
        r.b("  <br>");
        r.b("\n" + n);
        r.b("  ");
        r.b(r.v(r.d("author.name", e, t, 0)));
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='video-image'>\n  <img src='{{image}}'>\n  <i class='fa fa-play video-play-button'></i>\n  <span class='video-duration'>{{duration}}</span>\n</div>\n<span>\n  <strong class='video-title'>{{title}}</strong>\n  <br>\n  {{author.name}}\n</span>\n", r);