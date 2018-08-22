var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        if (r.s(r.f("headers", e, t, 1), e, t, 0, 12, 1311, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <table class='headers'>");
                r.b("\n" + n);
                if (r.s(r.d("from.length", e, t, 1), e, t, 0, 59, 276, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <tr>");
                        r.b("\n" + n);
                        r.b("        <th>From:</th>");
                        r.b("\n" + n);
                        r.b("        <td class='list comma-delimited'>");
                        r.b("\n" + n);
                        if (r.s(r.f("from", e, t, 1), e, t, 0, 155, 236, "{{ }}")) {
                            r.rs(e, t, function(e, t, r) {
                                r.b('          <a href="mailto:');
                                r.b(r.v(r.f("address", e, t, 0)));
                                r.b("\" class='list-item'>");
                                r.b(r.v(r.f("name", e, t, 0)));
                                r.b("</a>");
                                r.b("\n" + n);
                            }), e.pop()
                        };
                        r.b("        </td>");
                        r.b("\n" + n);
                        r.b("      </tr>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                if (r.s(r.d("to.length", e, t, 1), e, t, 0, 311, 522, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <tr>");
                        r.b("\n" + n);
                        r.b("        <th>To:</th>");
                        r.b("\n" + n);
                        r.b("        <td class='list comma-delimited'>");
                        r.b("\n" + n);
                        if (r.s(r.f("to", e, t, 1), e, t, 0, 403, 484, "{{ }}")) {
                            r.rs(e, t, function(e, t, r) {
                                r.b('          <a href="mailto:');
                                r.b(r.v(r.f("address", e, t, 0)));
                                r.b("\" class='list-item'>");
                                r.b(r.v(r.f("name", e, t, 0)));
                                r.b("</a>");
                                r.b("\n" + n);
                            }), e.pop()
                        };
                        r.b("        </td>");
                        r.b("\n" + n);
                        r.b("      </tr>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                if (r.s(r.d("cc.length", e, t, 1), e, t, 0, 555, 766, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <tr>");
                        r.b("\n" + n);
                        r.b("        <th>CC:</th>");
                        r.b("\n" + n);
                        r.b("        <td class='list comma-delimited'>");
                        r.b("\n" + n);
                        if (r.s(r.f("cc", e, t, 1), e, t, 0, 647, 728, "{{ }}")) {
                            r.rs(e, t, function(e, t, r) {
                                r.b('          <a href="mailto:');
                                r.b(r.v(r.f("address", e, t, 0)));
                                r.b("\" class='list-item'>");
                                r.b(r.v(r.f("name", e, t, 0)));
                                r.b("</a>");
                                r.b("\n" + n);
                            }), e.pop()
                        };
                        r.b("        </td>");
                        r.b("\n" + n);
                        r.b("      </tr>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                if (r.s(r.d("bcc.length", e, t, 1), e, t, 0, 800, 1014, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <tr>");
                        r.b("\n" + n);
                        r.b("        <th>BCC:</th>");
                        r.b("\n" + n);
                        r.b("        <td class='list comma-delimited'>");
                        r.b("\n" + n);
                        if (r.s(r.f("bcc", e, t, 1), e, t, 0, 894, 975, "{{ }}")) {
                            r.rs(e, t, function(e, t, r) {
                                r.b('          <a href="mailto:');
                                r.b(r.v(r.f("address", e, t, 0)));
                                r.b("\" class='list-item'>");
                                r.b(r.v(r.f("name", e, t, 0)));
                                r.b("</a>");
                                r.b("\n" + n);
                            }), e.pop()
                        };
                        r.b("        </td>");
                        r.b("\n" + n);
                        r.b("      </tr>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                if (r.s(r.d("replyTo.length", e, t, 1), e, t, 0, 1053, 1280, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b("      <tr>");
                        r.b("\n" + n);
                        r.b("        <th>Reply to:</th>");
                        r.b("\n" + n);
                        r.b("        <td class='list comma-delimited'>");
                        r.b("\n" + n);
                        if (r.s(r.f("replyTo", e, t, 1), e, t, 0, 1156, 1237, "{{ }}")) {
                            r.rs(e, t, function(e, t, r) {
                                r.b('          <a href="mailto:');
                                r.b(r.v(r.f("address", e, t, 0)));
                                r.b("\" class='list-item'>");
                                r.b(r.v(r.f("name", e, t, 0)));
                                r.b("</a>");
                                r.b("\n" + n);
                            }), e.pop()
                        };
                        r.b("        </td>");
                        r.b("\n" + n);
                        r.b("      </tr>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.b("  </table>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b(r.t(r.f("body", e, t, 0)));
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "{{#headers}}\n  <table class='headers'>\n    {{#from.length}}\n      <tr>\n        <th>From:</th>\n        <td class='list comma-delimited'>\n          {{#from}}\n          <a href=\"mailto:{{address}}\" class='list-item'>{{name}}</a>\n          {{/from}}\n        </td>\n      </tr>\n    {{/from.length}}\n    {{#to.length}}\n      <tr>\n        <th>To:</th>\n        <td class='list comma-delimited'>\n          {{#to}}\n          <a href=\"mailto:{{address}}\" class='list-item'>{{name}}</a>\n          {{/to}}\n        </td>\n      </tr>\n    {{/to.length}}\n    {{#cc.length}}\n      <tr>\n        <th>CC:</th>\n        <td class='list comma-delimited'>\n          {{#cc}}\n          <a href=\"mailto:{{address}}\" class='list-item'>{{name}}</a>\n          {{/cc}}\n        </td>\n      </tr>\n    {{/cc.length}}\n    {{#bcc.length}}\n      <tr>\n        <th>BCC:</th>\n        <td class='list comma-delimited'>\n          {{#bcc}}\n          <a href=\"mailto:{{address}}\" class='list-item'>{{name}}</a>\n          {{/bcc}}\n        </td>\n      </tr>\n    {{/bcc.length}}\n    {{#replyTo.length}}\n      <tr>\n        <th>Reply to:</th>\n        <td class='list comma-delimited'>\n          {{#replyTo}}\n          <a href=\"mailto:{{address}}\" class='list-item'>{{name}}</a>\n          {{/replyTo}}\n        </td>\n      </tr>\n    {{/replyTo.length}}\n  </table>\n{{/headers}}\n{{& body}}\n", r);