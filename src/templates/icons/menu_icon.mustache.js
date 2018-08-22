var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<svg class="icon-container" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">');
        r.b("\n" + n);
        r.b('  <g id="Assets" stroke="none" stroke-width="1" fill-rule="evenodd">');
        r.b("\n" + n);
        r.b('    <g id="menu">');
        r.b("\n" + n);
        r.b('        <path d="M10,6 C8.8954305,6 8,5.1045695 8,4 C8,2.8954305 8.8954305,2 10,2 C11.1045695,2 12,2.8954305 12,4 C12,5.1045695 11.1045695,6 10,6 Z M10,12 C8.8954305,12 8,11.1045695 8,10 C8,8.8954305 8.8954305,8 10,8 C11.1045695,8 12,8.8954305 12,10 C12,11.1045695 11.1045695,12 10,12 Z M10,18 C8.8954305,18 8,17.1045695 8,16 C8,14.8954305 8.8954305,14 10,14 C11.1045695,14 12,14.8954305 12,16 C12,17.1045695 11.1045695,18 10,18 Z" id="Combined-Shape"></path>');
        r.b("\n" + n);
        r.b("    </g>");
        r.b("\n" + n);
        r.b("  </g>");
        r.b("\n" + n);
        r.b("</svg>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<svg class="icon-container" x="0px" y="0px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">\n  <g id="Assets" stroke="none" stroke-width="1" fill-rule="evenodd">\n    <g id="menu">\n        <path d="M10,6 C8.8954305,6 8,5.1045695 8,4 C8,2.8954305 8.8954305,2 10,2 C11.1045695,2 12,2.8954305 12,4 C12,5.1045695 11.1045695,6 10,6 Z M10,12 C8.8954305,12 8,11.1045695 8,10 C8,8.8954305 8.8954305,8 10,8 C11.1045695,8 12,8.8954305 12,10 C12,11.1045695 11.1045695,12 10,12 Z M10,18 C8.8954305,18 8,17.1045695 8,16 C8,14.8954305 8.8954305,14 10,14 C11.1045695,14 12,14.8954305 12,16 C12,17.1045695 11.1045695,18 10,18 Z" id="Combined-Shape"></path>\n    </g>\n  </g>\n</svg>', r);