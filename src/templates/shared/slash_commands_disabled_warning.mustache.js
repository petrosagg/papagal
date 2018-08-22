var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='coach-tooltip-content'><div class='coach-tooltip-title replace-plain-text-with-command-warning'>Are you sure you want to replace text input with this command?</div></div>");
        r.b("\n" + n);
        r.b("<div class='coach-tooltip-footer'>");
        r.b("\n" + n);
        r.b("  <a class='coach-tooltip-next replace-plain-text-with-command-yes'>Yes</a>");
        r.b("\n" + n);
        r.b("  <a class='coach-tooltip-stop replace-plain-text-with-command-no'>No</a>");
        r.b("\n" + n);
        r.b("</div>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='coach-tooltip-content'><div class='coach-tooltip-title replace-plain-text-with-command-warning'>Are you sure you want to replace text input with this command?</div></div>\n<div class='coach-tooltip-footer'>\n  <a class='coach-tooltip-next replace-plain-text-with-command-yes'>Yes</a>\n  <a class='coach-tooltip-stop replace-plain-text-with-command-no'>No</a>\n</div>", r);