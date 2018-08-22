var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.b("  <h3 class='stripe-title'>Meme Help</h3>");
        r.b("\n" + n);
        r.b("  <hr>");
        r.b("\n" + n);
        r.b("  <p>All Meme commands begin with /meme</p>");
        r.b("\n" + n);
        r.b("  <p>An example usage: /meme /oprah /You get a meme /And you get a meme");
        r.b("\n" + n);
        r.b("  <dl class='help-list command-list meme-commands'>");
        r.b("\n" + n);
        r.b("    <dt>/meme OR /meme help</dt>");
        r.b("\n" + n);
        r.b("    <br /><dd>Display this help.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/meme templates</dt>");
        r.b("\n" + n);
        r.b("    <br /><dd>Show the list of all available meme image templates.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/meme /[template]</dt>");
        r.b("\n" + n);
        r.b("    <br /><dd>Display the meme image specified by [template].</dd>");
        r.b("\n" + n);
        r.b("    <dt>/meme /[template] /[top line text]</dt>");
        r.b("\n" + n);
        r.b("    <br /><dd>Display the meme image specified by [template] with text on the top of the image specified by [top line text].</dd>");
        r.b("\n" + n);
        r.b("    <dt>/meme /[template] /[top line text] /[bottom line text]</dt>");
        r.b("\n" + n);
        r.b("    <br /><dd>Display the meme image specified by [template] with text on the top of the image specified by [top line text] and text on the bottom specified by [bottom line text].</dd>");
        r.b("\n" + n);
        r.b("  </dl>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content clearfix'>\n  <h3 class='stripe-title'>Meme Help</h3>\n  <hr>\n  <p>All Meme commands begin with /meme</p>\n  <p>An example usage: /meme /oprah /You get a meme /And you get a meme\n  <dl class='help-list command-list meme-commands'>\n    <dt>/meme OR /meme help</dt>\n    <br /><dd>Display this help.</dd>\n    <dt>/meme templates</dt>\n    <br /><dd>Show the list of all available meme image templates.</dd>\n    <dt>/meme /[template]</dt>\n    <br /><dd>Display the meme image specified by [template].</dd>\n    <dt>/meme /[template] /[top line text]</dt>\n    <br /><dd>Display the meme image specified by [template] with text on the top of the image specified by [top line text].</dd>\n    <dt>/meme /[template] /[top line text] /[bottom line text]</dt>\n    <br /><dd>Display the meme image specified by [template] with text on the top of the image specified by [top line text] and text on the bottom specified by [bottom line text].</dd>\n  </dl>\n</section>\n", r);