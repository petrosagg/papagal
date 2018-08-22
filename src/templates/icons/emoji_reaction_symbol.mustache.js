var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<span class='fa-stack'>");
        r.b("\n" + n);
        r.b('\t<svg class="icon-container" width="20px" height="20px" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" stroke="#777" xml:space="preserve">');
        r.b("\n" + n);
        r.b('        <rect x="0" y="0" fill="none" stroke="none" width="20" height="20"/>');
        r.b("\n" + n);
        r.b("        <g>");
        r.b("\n" + n);
        r.b('        \t<path style="fill: none" stroke-miterlimit="10" d="M16.5,10.2c0,3.7-3,6.8-6.8,6.8C6,17,3,13.9,3,10.2S6,3.5,9.7,3.5"/>');
        r.b("\n" + n);
        r.b("        \t<g>");
        r.b("\n" + n);
        r.b('        \t\t<path fill="none" stroke-width="0.75" stroke-miterlimit="10" d="M6.9,11.1c0,1.4,1.3,2.5,2.8,2.5"/>');
        r.b("\n" + n);
        r.b('        \t\t<path fill="none" stroke-width="0.75" stroke-miterlimit="10" d="M12.5,11.1c0,1.4-1.2,2.5-2.8,2.5"/>');
        r.b("\n" + n);
        r.b("        \t</g>");
        r.b("\n" + n);
        r.b("        \t<g>");
        r.b("\n" + n);
        r.b('        \t\t<line fill="none" stroke-miterlimit="10" x1="15.2" y1="1.7" x2="15.2" y2="7"/>');
        r.b("\n" + n);
        r.b('        \t\t<line fill="none" stroke-miterlimit="10" x1="12.6" y1="4.3" x2="17.9" y2="4.3"/>');
        r.b("\n" + n);
        r.b("        \t</g>");
        r.b("\n" + n);
        r.b('        \t<circle cx="7.5" cy="8" r="0.7"/>');
        r.b("\n" + n);
        r.b('        \t<circle cx="12" cy="8" r="0.7"/>');
        r.b("\n" + n);
        r.b("        </g>");
        r.b("\n" + n);
        r.b("    </svg>");
        r.b("\n" + n);
        r.b("</span>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<span class=\'fa-stack\'>\n\t<svg class="icon-container" width="20px" height="20px" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" stroke="#777" xml:space="preserve">\n        <rect x="0" y="0" fill="none" stroke="none" width="20" height="20"/>\n        <g>\n        \t<path style="fill: none" stroke-miterlimit="10" d="M16.5,10.2c0,3.7-3,6.8-6.8,6.8C6,17,3,13.9,3,10.2S6,3.5,9.7,3.5"/>\n        \t<g>\n        \t\t<path fill="none" stroke-width="0.75" stroke-miterlimit="10" d="M6.9,11.1c0,1.4,1.3,2.5,2.8,2.5"/>\n        \t\t<path fill="none" stroke-width="0.75" stroke-miterlimit="10" d="M12.5,11.1c0,1.4-1.2,2.5-2.8,2.5"/>\n        \t</g>\n        \t<g>\n        \t\t<line fill="none" stroke-miterlimit="10" x1="15.2" y1="1.7" x2="15.2" y2="7"/>\n        \t\t<line fill="none" stroke-miterlimit="10" x1="12.6" y1="4.3" x2="17.9" y2="4.3"/>\n        \t</g>\n        \t<circle cx="7.5" cy="8" r="0.7"/>\n        \t<circle cx="12" cy="8" r="0.7"/>\n        </g>\n    </svg>\n</span>\n', r);