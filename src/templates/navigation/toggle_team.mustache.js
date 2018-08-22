var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<i class='icon fa fa-fw fa-bell'></i>");
        r.b("\n" + n);
        r.b("Mute @team");
        r.b("\n" + n);
        if (r.s(r.f("toggledOn", e, t, 1), e, t, 0, 63, 115, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("<i class='fa fa-fw fa-check icon icon-active'></i>");
                r.b("\n" + n);
            }), e.pop()
        };
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<i class='icon fa fa-fw fa-bell'></i>\nMute @team\n{{#toggledOn}}\n<i class='fa fa-fw fa-check icon icon-active'></i>\n{{/toggledOn}}\n", r);