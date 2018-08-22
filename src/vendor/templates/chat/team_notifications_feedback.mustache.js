var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<a class="chat-notification-close dark-link close"><i class="fa fa-times"></i></a>');
        r.b("\n" + n);
        r.b(r.rp("<content0", e, t, ""));
        return r.fl();
    },
    partials: {
        "<content0": {
            name: "content",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, '<a class="chat-notification-close dark-link close"><i class="fa fa-times"></i></a>\n{{> content}}\n', r);