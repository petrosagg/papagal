var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b(r.rp("<messageHeader0", e, t, ""));
        r.b("<div class='content'>");
        r.b("\n" + n);
        r.b("  <progress max='100'>0%</progress>");
        r.b("\n" + n);
        r.b("  <p class='status'>");
        r.b("\n" + n);
        r.b("    <span class='state'>Uploading</span>");
        r.b("\n" + n);
        r.b("    <span class='filename'>");
        r.b(r.v(r.f("fileName", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("    <span class='uploaded'>(0%)</span>");
        r.b("\n" + n);
        r.b("  </p>");
        r.b("\n" + n);
        r.b("  <p class='error'>Upload failed, please try again.</p>");
        r.b("\n" + n);
        r.b("</div>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<messageHeader0": {
            name: "messageHeader",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "{{> messageHeader}}\n<div class='content'>\n  <progress max='100'>0%</progress>\n  <p class='status'>\n    <span class='state'>Uploading</span>\n    <span class='filename'>{{fileName}}</span>\n    <span class='uploaded'>(0%)</span>\n  </p>\n  <p class='error'>Upload failed, please try again.</p>\n</div>\n", r);