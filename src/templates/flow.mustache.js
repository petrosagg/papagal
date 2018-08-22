var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<div class="left-panel"></div>');
        r.b("\n" + n);
        r.b('<div class="right-panel"></div>');
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<div class="left-panel"></div>\n<div class="right-panel"></div>\n', r);