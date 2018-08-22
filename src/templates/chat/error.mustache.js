var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<div class="name">Error</div>');
        r.b("\n" + n);
        r.b('<div class="content">Sorry, this message could not be rendered.</div>');
        r.b("\n" + n);
        r.b('<a class="report-link">Report error</a>');
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<div class="name">Error</div>\n<div class="content">Sorry, this message could not be rendered.</div>\n<a class="report-link">Report error</a>\n', r);