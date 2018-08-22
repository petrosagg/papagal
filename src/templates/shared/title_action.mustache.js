var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<a class='");
        r.b(r.v(r.f("class", e, t, 0)));
        r.b("' href='");
        r.b(r.v(r.f("link", e, t, 0)));
        r.b("' target='_blank' rel='noopener noreferrer' title='");
        r.b(r.v(r.f("text", e, t, 0)));
        r.b("'>");
        r.b("\n" + n);
        r.b("  ");
        r.b(r.v(r.f("text", e, t, 0)));
        r.b("\n" + n);
        if (r.s(r.f("icon", e, t, 1), e, t, 0, 119, 152, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <i class='fa ");
                r.b(r.v(r.f("icon", e, t, 0)));
                r.b("'></i>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  <i class='fa fa-fw fa-spin fa-circle-o-notch title-action-spinner'></i>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-fw fa-check title-action-check'></i>");
        r.b("\n" + n);
        r.b("  <i class='fa fa-fw fa-warning title-action-warning'></i>");
        r.b("\n" + n);
        r.b("</a>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<a class='{{class}}' href='{{link}}' target='_blank' rel='noopener noreferrer' title='{{text}}'>\n  {{text}}\n  {{#icon}}\n  <i class='fa {{icon}}'></i>\n  {{/icon}}\n  <i class='fa fa-fw fa-spin fa-circle-o-notch title-action-spinner'></i>\n  <i class='fa fa-fw fa-check title-action-check'></i>\n  <i class='fa fa-fw fa-warning title-action-warning'></i>\n</a>\n", r);