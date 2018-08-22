var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<div class='textarea-autocompleter-area'></div>");
        r.b("\n" + n);
        r.b("<fieldset>");
        r.b("\n" + n);
        r.b("  <ol>");
        r.b("\n" + n);
        r.b("    <li class='left'>");
        r.b("\n" + n);
        r.b(r.rp("<before0", e, t, "      "));
        r.b("    </li>");
        r.b("\n" + n);
        if (r.s(r.f("mobile", e, t, 1), e, t, 0, 132, 412, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("      <li class='send right'>");
                r.b("\n" + n);
                r.b("        <a class='input-button send-button' type='submit'>Send</a>");
                r.b("\n" + n);
                r.b("        <a class='input-button tipsy-tooltip upload-button enabled' data-tipsy-gravity='s' title='Upload a file'>");
                r.b("\n" + n);
                r.b("          <i class='fa fa-upload'></i>");
                r.b("\n" + n);
                r.b("        </a>");
                r.b("\n" + n);
                r.b("      </li>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("    <li class='textarea no-overflow'>");
        r.b("\n" + n);
        r.b("      <div class='expanding-input'></div>");
        r.b("\n" + n);
        r.b("    </li>");
        r.b("\n" + n);
        r.b("  </ol>");
        r.b("\n" + n);
        r.b("</fieldset>");
        r.b("\n" + n);
        r.s(r.f("mobile", e, t, 1), e, t, 1, 0, 0, "") || (r.b('  <a class="upload-button-web message-building-button" title="Upload attachments">'), 
        r.b("\n" + n), r.b('    <div class="multi-button-wrapper">'), r.b("\n" + n), r.b(r.rp("<paperclipSVGIcon1", e, t, "      ")), 
        r.b("    </div>"), r.b("\n" + n), r.b("  </a>"), r.b("\n" + n), r.b('  <a class="slash-commands-toggle message-building-button" title="Command menu">'), 
        r.b("\n" + n), r.b('    <div class="multi-button-wrapper">'), r.b("\n" + n), r.b(r.rp("<slashSVGIcon2", e, t, "      ")), 
        r.b("    </div>"), r.b("\n" + n), r.b("  </a>"), r.b("\n" + n), r.b('  <a class="emoji-picker-toggle message-building-button" title="Emoji menu"><i class="fa fa-smile-o"></i></a>'), 
        r.b("\n" + n));
        return r.fl();
    },
    partials: {
        "<before0": {
            name: "before",
            partials: {},
            subs: {}
        },
        "<paperclipSVGIcon1": {
            name: "paperclipSVGIcon",
            partials: {},
            subs: {}
        },
        "<slashSVGIcon2": {
            name: "slashSVGIcon",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<div class='textarea-autocompleter-area'></div>\n<fieldset>\n  <ol>\n    <li class='left'>\n      {{> before}}\n    </li>\n    {{#mobile}}\n      <li class='send right'>\n        <a class='input-button send-button' type='submit'>Send</a>\n        <a class='input-button tipsy-tooltip upload-button enabled' data-tipsy-gravity='s' title='Upload a file'>\n          <i class='fa fa-upload'></i>\n        </a>\n      </li>\n    {{/mobile}}\n    <li class='textarea no-overflow'>\n      <div class='expanding-input'></div>\n    </li>\n  </ol>\n</fieldset>\n{{^mobile}}\n  <a class=\"upload-button-web message-building-button\" title=\"Upload attachments\">\n    <div class=\"multi-button-wrapper\">\n      {{> paperclipSVGIcon}}\n    </div>\n  </a>\n  <a class=\"slash-commands-toggle message-building-button\" title=\"Command menu\">\n    <div class=\"multi-button-wrapper\">\n      {{> slashSVGIcon}}\n    </div>\n  </a>\n  <a class=\"emoji-picker-toggle message-building-button\" title=\"Emoji menu\"><i class=\"fa fa-smile-o\"></i></a>\n{{/mobile}}\n", r);