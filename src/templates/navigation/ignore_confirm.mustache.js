var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<div class="ignore-confirm-content">');
        r.b("\n" + n);
        r.s(r.f("success", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  Would you like to turn off @team notifications in the "), 
        r.b(r.v(r.f("flowName", e, t, 0))), r.b(" flow?"), r.b("\n" + n), r.b('  <ul class="inline-list">'), 
        r.b("\n" + n), r.b('    <li><a class="primary-button mini-button confirm">Mute @team in '), 
        r.b(r.v(r.f("flowName", e, t, 0))), r.b("</a></li>"), r.b("\n" + n), r.b('    <li><a class="button mini-button cancel">Cancel</a></li>'), 
        r.b("\n" + n), r.b("  </ul>"), r.b("\n" + n));
        if (r.s(r.f("success", e, t, 1), e, t, 0, 342, 438, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  You will no longer be notified of @team messages in ");
                r.b(r.v(r.f("flowName", e, t, 0)));
                r.b('. <a class="undo">Undo</a>');
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("</div>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<div class="ignore-confirm-content">\n  {{^success}}\n  Would you like to turn off @team notifications in the {{flowName}} flow?\n  <ul class="inline-list">\n    <li><a class="primary-button mini-button confirm">Mute @team in {{flowName}}</a></li>\n    <li><a class="button mini-button cancel">Cancel</a></li>\n  </ul>\n  {{/success}}\n  {{#success}}\n  You will no longer be notified of @team messages in {{flowName}}. <a class="undo">Undo</a>\n  {{/success}}\n</div>', r);