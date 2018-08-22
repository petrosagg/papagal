var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='loader'>");
        r.b("\n" + n);
        r.b("  <div class='box1'></div>");
        r.b("\n" + n);
        r.b("  <div class='box2'></div>");
        r.b("\n" + n);
        r.b("  <div class='box3'></div>");
        r.b("\n" + n);
        r.b("  <div class='box4'></div>");
        r.b("\n" + n);
        r.b("  <div class='box5'></div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='loader'>\n  <div class='box1'></div>\n  <div class='box2'></div>\n  <div class='box3'></div>\n  <div class='box4'></div>\n  <div class='box5'></div>\n</div>\n", r);