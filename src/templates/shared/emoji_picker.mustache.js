var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<ul class='emoji-groups'>");
        r.b("\n" + n);
        r.b('  <li><a class="open-help" target="_blank" rel="noopener noreferrer" href="/help/chat_input"><i class=\'fa fa-question-circle\'></i></a></li>');
        r.b("\n" + n);
        r.b("</ul>");
        r.b("\n" + n);
        r.b('<div class="emoji-content">');
        r.b("\n" + n);
        r.b('  <div class="filter">');
        r.b("\n" + n);
        r.b('    <input class="emoji-filter" type="text" placeholder="Search..." required>');
        r.b("\n" + n);
        r.b('    <a class="clear fa fa-times"></a>');
        r.b("\n" + n);
        r.b('    <ul class="results" data-emoji-group="Results"></ul>');
        r.b("\n" + n);
        r.b("  </div>");
        r.b("\n" + n);
        r.b('  <div class="emojis"></div>');
        r.b("\n" + n);
        r.b('  <a href="');
        r.b(r.v(r.f("preferencesUrl", e, t, 0)));
        r.b('" target="_blank" rel="noopener noreferrer" class="add-custom-emoji">');
        r.b("\n" + n);
        r.b('    <i class="fa fa-plus"></i> Add your own emoji...</a>');
        r.b("\n" + n);
        r.b("</div>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<ul class=\'emoji-groups\'>\n  <li><a class="open-help" target="_blank" rel="noopener noreferrer" href="/help/chat_input"><i class=\'fa fa-question-circle\'></i></a></li>\n</ul>\n<div class="emoji-content">\n  <div class="filter">\n    <input class="emoji-filter" type="text" placeholder="Search..." required>\n    <a class="clear fa fa-times"></a>\n    <ul class="results" data-emoji-group="Results"></ul>\n  </div>\n  <div class="emojis"></div>\n  <a href="{{preferencesUrl}}" target="_blank" rel="noopener noreferrer" class="add-custom-emoji">\n    <i class="fa fa-plus"></i> Add your own emoji...</a>\n</div>', r);