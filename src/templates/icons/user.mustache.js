var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<svg class="icon-container" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"');
        r.b("\n" + n);
        r.b('\t viewBox="0 0 128 128" enable-background="new 0 0 128 128" xml:space="preserve">');
        r.b("\n" + n);
        r.b("<g>");
        r.b("\n" + n);
        r.b('\t<path class="icon-path" d="M91.2,88.6C78.6,84,74.6,80.1,74.6,71.8c0-5,3.8-3.4,5.5-12.5c0.7-3.8,4.1-0.1,4.7-8.7c0-3.5-1.9-4.3-1.9-4.3');
        r.b("\n" + n);
        r.b("\t\ts0.9-5.1,1.3-9.1c0.5-4.9-2.8-17.6-20.3-17.6S43.3,32.2,43.7,37.1c0.4,3.9,1.3,9.1,1.3,9.1s-1.9,0.9-1.9,4.3c0.6,8.7,4,4.9,4.7,8.7");
        r.b("\n" + n);
        r.b("\t\tc1.7,9.2,5.5,7.5,5.5,12.5c0,8.3-4,12.2-16.6,16.9C24.2,93.2,16,98,16,101.2c0,3.2,0,10.8,0,10.8h48h48c0,0,0-7.6,0-10.8");
        r.b("\n" + n);
        r.b('\t\tC112,98,103.8,93.2,91.2,88.6z"/>');
        r.b("\n" + n);
        r.b("</g>");
        r.b("\n" + n);
        r.b("</svg>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, '<svg class="icon-container" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n\t viewBox="0 0 128 128" enable-background="new 0 0 128 128" xml:space="preserve">\n<g>\n\t<path class="icon-path" d="M91.2,88.6C78.6,84,74.6,80.1,74.6,71.8c0-5,3.8-3.4,5.5-12.5c0.7-3.8,4.1-0.1,4.7-8.7c0-3.5-1.9-4.3-1.9-4.3\n\t\ts0.9-5.1,1.3-9.1c0.5-4.9-2.8-17.6-20.3-17.6S43.3,32.2,43.7,37.1c0.4,3.9,1.3,9.1,1.3,9.1s-1.9,0.9-1.9,4.3c0.6,8.7,4,4.9,4.7,8.7\n\t\tc1.7,9.2,5.5,7.5,5.5,12.5c0,8.3-4,12.2-16.6,16.9C24.2,93.2,16,98,16,101.2c0,3.2,0,10.8,0,10.8h48h48c0,0,0-7.6,0-10.8\n\t\tC112,98,103.8,93.2,91.2,88.6z"/>\n</g>\n</svg>\n', r);