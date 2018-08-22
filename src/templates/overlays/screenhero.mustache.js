var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.b("  <h3 class='stripe-title'>Initiating Screenhero call with ");
        r.b(r.v(r.f("toUser", e, t, 0)));
        r.b("</h3>");
        r.b("\n" + n);
        r.b("  <hr class='short'>");
        r.b("\n" + n);
        r.b("  <p class='screenhero-message'>");
        if (r.s(r.f("message", e, t, 1), e, t, 0, 175, 189, "{{ }}")) {
            r.rs(e, t, function(e, t, n) {
                n.b(n.t(n.f("message", e, t, 0)));
            }), e.pop()
        };
        r.b("</p>");
        r.b("\n" + n);
        r.b("  <form>");
        r.b("\n" + n);
        r.b("    <ul class='buttons right'>");
        r.b("\n" + n);
        r.s(r.f("callSucceeded", e, t, 1), e, t, 1, 0, 0, "") || (r.b("      <li>"), r.b("\n" + n), 
        r.b("        <button class='button close'>Cancel</button>"), r.b("\n" + n), r.b("      </li>"), 
        r.b("\n" + n));
        r.b("      <li>");
        r.b("\n" + n);
        if (r.s(r.f("callSucceeded", e, t, 1), e, t, 0, 409, 496, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("        <button class='primary-button' id='make-call'>Return to flow</button>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.s(r.f("callSucceeded", e, t, 1), e, t, 1, 0, 0, "") || (r.s(r.f("isCalling", e, t, 1), e, t, 0, 564, 656, "{{ }}") && (r.rs(e, t, function(e, t, r) {
            r.b("        <button class='primary-button' disabled id='make-call'>Calling...</button>");
            r.b("\n" + n);
        }), e.pop()), r.s(r.f("isCalling", e, t, 1), e, t, 1, 0, 0, "") || (r.b("        <button class='primary-button' id='make-call'>Retry</button>"), 
        r.b("\n" + n)));
        r.b("      </li>");
        r.b("\n" + n);
        r.b("    </ul>");
        r.b("\n" + n);
        r.b("  </form>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<section class='content clearfix'>\n  <h3 class='stripe-title'>Initiating Screenhero call with {{toUser}}</h3>\n  <hr class='short'>\n  <p class='screenhero-message'>{{#message}}{{& message }}{{/message}}</p>\n  <form>\n    <ul class='buttons right'>\n      {{^callSucceeded}}\n      <li>\n        <button class='button close'>Cancel</button>\n      </li>\n      {{/callSucceeded}}\n      <li>\n        {{#callSucceeded}}\n        <button class='primary-button' id='make-call'>Return to flow</button>\n        {{/callSucceeded}}\n        {{^callSucceeded}}\n        {{#isCalling}}\n        <button class='primary-button' disabled id='make-call'>Calling...</button>\n        {{/isCalling}}\n        {{^isCalling}}\n        <button class='primary-button' id='make-call'>Retry</button>\n        {{/isCalling}}\n        {{/callSucceeded}}\n      </li>\n    </ul>\n  </form>\n</section>\n", r);