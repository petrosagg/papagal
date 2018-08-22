var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<svg class="slash-icon" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">');
        r.b("\n" + n);
        r.b('    <g stroke-width="1" fill-rule="evenodd">');
        r.b("\n" + n);
        r.b('      <rect transform="translate(10.000000, 10.000000) rotate(-333.000000) translate(-10.000000, -10.000000)" x="9" y="3" width="2" height="14" rx="1"></rect>');
        r.b("\n" + n);
        r.b("    </g>");
        r.b("\n" + n);
        r.b("</svg>");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<svg class="slash-icon" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n    <g stroke-width="1" fill-rule="evenodd">\n      <rect transform="translate(10.000000, 10.000000) rotate(-333.000000) translate(-10.000000, -10.000000)" x="9" y="3" width="2" height="14" rx="1"></rect>\n    </g>\n</svg>', r);