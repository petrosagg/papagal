var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='coach-tooltip-content'>");
        r.b("\n" + n);
        r.b("  <div class='coach-tooltip-title'>");
        r.b(r.v(r.f("tag", e, t, 0)));
        r.b("</div>");
        r.b("\n" + n);
        r.b("  <div class='coach-tooltip-description'>");
        r.b("\n" + n);
        r.b("    ");
        r.b(r.t(r.f("childPillsHTML", e, t, 0)));
        r.b("\n" + n);
        if (r.s(r.f("noMembers", e, t, 1), e, t, 0, 170, 228, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("      <div>There are no members in this group.</div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n" + n);
        r.b("<div class='coach-tooltip-footer'>");
        r.b("\n" + n);
        if (r.s(r.f("isGroup", e, t, 1), e, t, 0, 308, 366, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <a class='coach-tooltip-next group'>Edit Group</a>");
                r.b("\n" + n);
            }), e.pop()
        };
        if (r.s(r.f("isTeam", e, t, 1), e, t, 0, 392, 470, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("    <a class='coach-tooltip-next team'>");
                r.b(r.v(r.f("muteVerb", e, t, 0)));
                r.b(" @team in this flow</a>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  <a class='coach-tooltip-stop'>Close</a>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<div class='coach-tooltip-content'>\n  <div class='coach-tooltip-title'>{{tag}}</div>\n  <div class='coach-tooltip-description'>\n    {{{childPillsHTML}}}\n    {{#noMembers}}\n      <div>There are no members in this group.</div>\n    {{/noMembers}}\n  </div>\n</div>\n<div class='coach-tooltip-footer'>\n  {{#isGroup}}\n    <a class='coach-tooltip-next group'>Edit Group</a>\n  {{/isGroup}}\n  {{#isTeam}}\n    <a class='coach-tooltip-next team'>{{muteVerb}} @team in this flow</a>\n  {{/isTeam}}\n  <a class='coach-tooltip-stop'>Close</a>\n</div>\n", r);