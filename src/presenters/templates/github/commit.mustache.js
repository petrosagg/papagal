var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<li class="commit">');
        r.b("\n" + n);
        r.b(r.rp("<commit_summary0", e, t, "  "));
        r.b('  <ul class="commit-changes details">');
        r.b("\n" + n);
        if (r.s(r.f("furthermore", e, t, 1), e, t, 0, 102, 183, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b('    <li class="commit-message-furthermore">');
                r.b("\n" + n);
                r.b("      ");
                r.b(r.v(r.f("furthermore", e, t, 0)));
                r.b("\n" + n);
                r.b("    </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("\n" + n);
        if (r.s(r.d("changes.modified", e, t, 1), e, t, 0, 226, 544, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                if (r.s(r.f("link", e, t, 1), e, t, 0, 240, 402, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b('    <li class="modified"><a target="_blank" rel="noopener noreferrer" href="');
                        r.b(r.v(r.f("link", e, t, 0)));
                        r.b('">');
                        r.b("\n" + n);
                        r.b('      <span class="fa fa-pencil"></span>');
                        r.b("\n" + n);
                        r.b("      ");
                        r.b(r.v(r.f("file", e, t, 0)));
                        r.b("\n" + n);
                        r.b("    </a></li>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.f("link", e, t, 1), e, t, 1, 0, 0, "") || (r.b('      <li class="modified">'), 
                r.b("\n" + n), r.b('        <span class="fa fa-pencil"></span>'), r.b("\n" + n), 
                r.b("        "), r.b(r.v(r.f("file", e, t, 0))), r.b("\n" + n), r.b("      </li>"), 
                r.b("\n" + n));
            }), e.pop()
        };
        r.b("\n" + n);
        if (r.s(r.d("changes.added", e, t, 1), e, t, 0, 589, 905, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                if (r.s(r.f("link", e, t, 1), e, t, 0, 603, 768, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b('      <li class="added"><a target="_blank" rel="noopener noreferrer" href="');
                        r.b(r.v(r.f("link", e, t, 0)));
                        r.b('">');
                        r.b("\n" + n);
                        r.b('        <span class="fa fa-plus"></span>');
                        r.b("\n" + n);
                        r.b("        ");
                        r.b(r.v(r.f("file", e, t, 0)));
                        r.b("\n" + n);
                        r.b("      </a></li>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.f("link", e, t, 1), e, t, 1, 0, 0, "") || (r.b('      <li class="added">'), 
                r.b("\n" + n), r.b('        <span class="fa fa-plus"></span>'), r.b("\n" + n), r.b("        "), 
                r.b(r.v(r.f("file", e, t, 0))), r.b("\n" + n), r.b("      </li>"), r.b("\n" + n));
            }), e.pop()
        };
        r.b("\n" + n);
        if (r.s(r.d("changes.removed", e, t, 1), e, t, 0, 949, 1263, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                if (r.s(r.f("link", e, t, 1), e, t, 0, 963, 1123, "{{ }}")) {
                    r.rs(e, t, function(e, t, r) {
                        r.b('    <li class="removed"><a target="_blank" rel="noopener noreferrer" href="');
                        r.b(r.v(r.f("link", e, t, 0)));
                        r.b('">');
                        r.b("\n" + n);
                        r.b('      <span class="fa fa-minus"></span>');
                        r.b("\n" + n);
                        r.b("      ");
                        r.b(r.v(r.f("file", e, t, 0)));
                        r.b("\n" + n);
                        r.b("    </a></li>");
                        r.b("\n" + n);
                    }), e.pop()
                };
                r.s(r.f("link", e, t, 1), e, t, 1, 0, 0, "") || (r.b('      <li class="removed">'), 
                r.b("\n" + n), r.b('        <span class="fa fa-minus"></span>'), r.b("\n" + n), 
                r.b("        "), r.b(r.v(r.f("file", e, t, 0))), r.b("\n" + n), r.b("      </li>"), 
                r.b("\n" + n));
            }), e.pop()
        };
        r.b("  </ul>");
        r.b("\n" + n);
        r.b("</li>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<commit_summary0": {
            name: "commit_summary",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, '<li class="commit">\n  {{> commit_summary }}\n  <ul class="commit-changes details">\n    {{#furthermore}}\n    <li class="commit-message-furthermore">\n      {{furthermore}}\n    </li>\n    {{/furthermore}}\n\n    {{#changes.modified}}\n    {{#link}}\n    <li class="modified"><a target="_blank" rel="noopener noreferrer" href="{{link}}">\n      <span class="fa fa-pencil"></span>\n      {{file}}\n    </a></li>\n    {{/link}}\n    {{^link}}\n      <li class="modified">\n        <span class="fa fa-pencil"></span>\n        {{file}}\n      </li>\n    {{/link}}\n    {{/changes.modified}}\n\n    {{#changes.added}}\n    {{#link}}\n      <li class="added"><a target="_blank" rel="noopener noreferrer" href="{{link}}">\n        <span class="fa fa-plus"></span>\n        {{file}}\n      </a></li>\n    {{/link}}\n    {{^link}}\n      <li class="added">\n        <span class="fa fa-plus"></span>\n        {{file}}\n      </li>\n    {{/link}}\n    {{/changes.added}}\n\n    {{#changes.removed}}\n    {{#link}}\n    <li class="removed"><a target="_blank" rel="noopener noreferrer" href="{{link}}">\n      <span class="fa fa-minus"></span>\n      {{file}}\n    </a></li>\n    {{/link}}\n    {{^link}}\n      <li class="removed">\n        <span class="fa fa-minus"></span>\n        {{file}}\n      </li>\n    {{/link}}\n    {{/changes.removed}}\n  </ul>\n</li>\n', r);