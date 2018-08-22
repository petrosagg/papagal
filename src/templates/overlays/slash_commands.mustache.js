var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.b("  <h3 class='stripe-title'>Flowdock chat /commands</h3>");
        r.b("\n" + n);
        r.b("  <hr>");
        r.b("\n" + n);
        r.b("  <p>These commands can be typed into any chat or comment input in Flowdock.</p>");
        r.b("\n" + n);
        r.b("  <dl class='help-list command-list'>");
        r.b("\n" + n);
        r.b("    <dt>/help OR /?</dt>");
        r.b("\n" + n);
        r.b("    <dd>Display this help.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/status [message] OR /away [message]</dt>");
        r.b("\n" + n);
        r.b("    <dd>Send status message or clear status if no message is given.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/me message</dt>");
        r.b("\n" + n);
        r.b("    <dd>Send an action message that does not change your status.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/appear [room name] OR /appear</dt>");
        r.b("\n" + n);
        r.b("    <dd>Start a new appear.in video call with your flow. If you don't pass in a room name, one will be generated for you.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/query @Nick</dt>");
        r.b("\n" + n);
        r.b("    <dd>Start a 1-to-1 conversation with Nick.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/slap Nick</dt>");
        r.b("\n" + n);
        r.b("    <dd>Slap Nick with a fish.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/giphy [search terms]</dt>");
        r.b("\n" + n);
        r.b("    <dd>Show an animated image from Giphy that matches the search terms.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/meme help</dt>");
        r.b("\n" + n);
        r.b("    <dd>Show detailed help for the /meme command.</dd>");
        r.b("\n" + n);
        r.b("    <dt>/ /text</dt>");
        r.b("\n" + n);
        r.b("    <dd>Send a normal message that starts with /text.</dd>");
        r.b("\n" + n);
        r.b("  </dl>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content clearfix'>\n  <h3 class='stripe-title'>Flowdock chat /commands</h3>\n  <hr>\n  <p>These commands can be typed into any chat or comment input in Flowdock.</p>\n  <dl class='help-list command-list'>\n    <dt>/help OR /?</dt>\n    <dd>Display this help.</dd>\n    <dt>/status [message] OR /away [message]</dt>\n    <dd>Send status message or clear status if no message is given.</dd>\n    <dt>/me message</dt>\n    <dd>Send an action message that does not change your status.</dd>\n    <dt>/appear [room name] OR /appear</dt>\n    <dd>Start a new appear.in video call with your flow. If you don't pass in a room name, one will be generated for you.</dd>\n    <dt>/query @Nick</dt>\n    <dd>Start a 1-to-1 conversation with Nick.</dd>\n    <dt>/slap Nick</dt>\n    <dd>Slap Nick with a fish.</dd>\n    <dt>/giphy [search terms]</dt>\n    <dd>Show an animated image from Giphy that matches the search terms.</dd>\n    <dt>/meme help</dt>\n    <dd>Show detailed help for the /meme command.</dd>\n    <dt>/ /text</dt>\n    <dd>Send a normal message that starts with /text.</dd>\n  </dl>\n</section>\n", r);