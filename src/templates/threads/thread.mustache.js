var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='thread-close-button'></a>");
        r.b("\n" + n);
        r.b("<header class='floating-header'></header>");
        r.b("\n" + n);
        r.b("<section class='thread-content scrollable'>");
        r.b("\n" + n);
        r.b("  <div class='thread-content-wrap'>");
        r.b("\n" + n);
        r.b("    <section class='thread-message'></section>");
        r.b("\n" + n);
        r.b("    <header class='static-header'></header>");
        r.b("\n" + n);
        r.b("    <div class='thread-body'>");
        r.b(r.t(r.f("body", e, t, 0)));
        r.b("</div>");
        r.b("\n" + n);
        r.b("    <div class='updated-fields truncate-wrap'>");
        r.b("\n" + n);
        r.b("      <table class='thread-properties'>");
        r.b(r.rp("<propertyList0", e, t, ""));
        r.b("</table>");
        r.b("\n" + n);
        r.b("    </div>");
        r.b("\n" + n);
        r.b("    <ul class='thread-activities'></ul>");
        r.b("\n" + n);
        r.b(r.rp("<spinner1", e, t, "    "));
        r.b("    <footer class='thread-footer'></footer>");
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<propertyList0": {
            name: "propertyList",
            partials: {},
            subs: {}
        },
        "<spinner1": {
            name: "spinner",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<a class='thread-close-button'></a>\n<header class='floating-header'></header>\n<section class='thread-content scrollable'>\n  <div class='thread-content-wrap'>\n    <section class='thread-message'></section>\n    <header class='static-header'></header>\n    <div class='thread-body'>{{& body }}</div>\n    <div class='updated-fields truncate-wrap'>\n      <table class='thread-properties'>{{> propertyList}}</table>\n    </div>\n    <ul class='thread-activities'></ul>\n    {{> spinner}}\n    <footer class='thread-footer'></footer>\n  </div>\n</section>\n", r);