var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<div class="attachment-thumbnail" style="background-image: url(\'');
        r.b(r.v(r.d("attachment.thumbnail.path", e, t, 0)));
        r.b("');\"></div>");
        r.b("\n" + n);
        r.b(r.rp("<details0", e, t, ""));
        return r.fl();
    },
    partials: {
        "<details0": {
            name: "details",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, '<div class="attachment-thumbnail" style="background-image: url(\'{{attachment.thumbnail.path}}\');"></div>\n{{> details}}\n', r);