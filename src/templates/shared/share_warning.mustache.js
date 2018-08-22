var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='coach-tooltip-content'><div class='coach-tooltip-title'>Are you sure you want to share this with Rally?</div></div>");
        r.b("\n" + n);
        r.b("<div class='coach-tooltip-footer'>");
        r.b("\n" + n);
        r.b("  <a class='coach-tooltip-next'>Yes</a>");
        r.b("\n" + n);
        r.b("  <a class='coach-tooltip-stop'>No</a>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='coach-tooltip-content'><div class='coach-tooltip-title'>Are you sure you want to share this with Rally?</div></div>\n<div class='coach-tooltip-footer'>\n  <a class='coach-tooltip-next'>Yes</a>\n  <a class='coach-tooltip-stop'>No</a>\n</div>\n", r);