var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<h3>Upload ");
        r.b(r.v(r.f("fileCount", e, t, 0)));
        r.b(" files to ");
        r.b(r.v(r.f("targetName", e, t, 0)));
        r.b("?</h3>");
        r.b("\n" + n);
        r.b('<button class="primary-button" data-confirm-upload>Continue</button>');
        r.b("\n" + n);
        r.b('<button class="secondary-button" data-cancel-upload>Cancel</button>');
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<h3>Upload {{fileCount}} files to {{targetName}}?</h3>\n<button class="primary-button" data-confirm-upload>Continue</button>\n<button class="secondary-button" data-cancel-upload>Cancel</button>\n', r);