var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<header class='floating-header'></header>");
        r.b("\n" + n);
        r.b("<section class='single-view-content'>");
        r.b("\n" + n);
        r.b("  <div class='single-view-content-wrap'>");
        r.b("\n" + n);
        r.b("    <div class='single-view-body'>");
        r.b("\n" + n);
        r.b("      <header class='static-header'></header>");
        r.b("\n" + n);
        if (r.s(r.f("report", e, t, 1), e, t, 0, 219, 321, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("      <div class='report center'>");
                r.b("\n" + n);
                r.b("        <a class='report-link'>Report error</a>");
                r.b("\n" + n);
                r.b("      </div>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("    </div>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n" + n);
        r.b(r.rp("<spinner0", e, t, ""));
        return r.fl();
    },
    partials: {
        "<spinner0": {
            name: "spinner",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<header class='floating-header'></header>\n<section class='single-view-content'>\n  <div class='single-view-content-wrap'>\n    <div class='single-view-body'>\n      <header class='static-header'></header>\n      {{#report}}\n      <div class='report center'>\n        <a class='report-link'>Report error</a>\n      </div>\n      {{/report}}\n    </div>\n  </div>\n</section>\n{{> spinner}}\n", r);