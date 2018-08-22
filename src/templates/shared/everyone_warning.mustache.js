var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='coach-tooltip-content'><div class='coach-tooltip-title'>Do you want to alert ");
        r.b(r.v(r.f("userCount", e, t, 0)));
        r.b(" people?</div><div class='coach-tooltip-description'><span class=\"tag mention highlight\">");
        r.b(r.v(r.f("usedTag", e, t, 0)));
        r.b("</span> will notify all the people in the <em>");
        r.b(r.v(r.f("flowName", e, t, 0)));
        r.b('</em> flow. <span class="tag highlight mention">@team</span> will only alert the people who want to be notified. Consider using it instead.</div></div>');
        r.b("\n" + n);
        r.b("<div class='coach-tooltip-footer'>");
        r.b("\n" + n);
        r.b("  <a class='coach-tooltip-next'>Send anyway <span class=\"keycode-small\">&crarr;</span></a>");
        r.b("\n" + n);
        r.b("  <a class='coach-tooltip-stop'>Edit message <span class=\"keycode\">ESC</span></a>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='coach-tooltip-content'><div class='coach-tooltip-title'>Do you want to alert {{userCount}} people?</div><div class='coach-tooltip-description'><span class=\"tag mention highlight\">{{usedTag}}</span> will notify all the people in the <em>{{flowName}}</em> flow. <span class=\"tag highlight mention\">@team</span> will only alert the people who want to be notified. Consider using it instead.</div></div>\n<div class='coach-tooltip-footer'>\n  <a class='coach-tooltip-next'>Send anyway <span class=\"keycode-small\">&crarr;</span></a>\n  <a class='coach-tooltip-stop'>Edit message <span class=\"keycode\">ESC</span></a>\n</div>\n", r);