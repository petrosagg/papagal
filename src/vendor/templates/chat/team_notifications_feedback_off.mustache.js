var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<i class="icon fa fa-fw fa-bell-slash"/>');
        r.b("\n" + n);
        r.b("You will no longer be notified of @team mentions in ");
        r.b(r.v(r.f("flowName", e, t, 0)));
        r.b(".");
        r.b("\n" + n);
        r.b('<a class="chat-notification-action undo">Turn back on</a>');
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<i class="icon fa fa-fw fa-bell-slash"/>\nYou will no longer be notified of @team mentions in {{flowName}}.\n<a class="chat-notification-action undo">Turn back on</a>\n', r);