var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<script src='https://www.google.com/recaptcha/api.js'><\/script>");
        r.b("\n" + n);
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.s(r.f("canBeDismissed", e, t, 1), e, t, 1, 0, 0, "") || (r.b("  <h2>Oops!</h2>"), 
        r.b("\n" + n), r.b("  <p>"), r.b("\n" + n), r.b("    It seems that your Flowdock user account does not belong to an active organization. To proceed, you need to create a new organization"), 
        r.s(r.f("noOrganizations", e, t, 1), e, t, 1, 0, 0, "") || r.b(" or restore an expired one below"), 
        r.b(". If you wish to join an existing organization, ask a member for an invitation."), 
        r.b("\n" + n), r.b("  </p>"), r.b("\n" + n), r.b(r.rp("<noEnabledOrganizations0", e, t, "  ")), 
        r.b("  Logged in as "), r.b(r.v(r.d("user.name", e, t, 0))), r.b(" ("), r.b(r.v(r.d("user.email", e, t, 0))), 
        r.b(")"), r.b("\n" + n), r.b("  <input class='primary-button switch-accounts' type='button' value='Switch to another account'>"), 
        r.b("\n" + n));
        r.b("  <h3>Create a new organization</h3>");
        r.b("\n" + n);
        r.b("  <hr class='short'>");
        r.b("\n" + n);
        r.b('  <p>Creating a new organization will start a new 30-day trial. You can set up payments from the <a href="/account" target="_blank" rel="noopener noreferrer">account</a> page.</p>');
        r.b("\n" + n);
        r.b("  <form class='new-organization'>");
        r.b("\n" + n);
        r.b("    <fieldset class='clearfix'>");
        r.b("\n" + n);
        r.b("      <ol>");
        r.b("\n" + n);
        r.b("        <li class='input name'>");
        r.b("\n" + n);
        r.b("          <label for='organization-name'>What will it be called?</label>");
        r.b("\n" + n);
        r.b("          <input autofocus name='organization-name' placeholder='Organization name' required type='text'>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("        <li class='input subdomain email-example'>");
        r.b("\n" + n);
        r.b("          <label for='subdomain-name'>Subdomain for e-mails</label>");
        r.b("\n" + n);
        r.b('          <a href="#" class="edit-subdomain">Edit</a>');
        r.b("\n" + n);
        r.b("          <div class='flow-email'>");
        r.b("\n" + n);
        r.b('            <span class="local-part">flow_name@</span><span class="organization-part">acme</span><input type="text" required name="subdomain-name"></input>.<span class="flowdock-domain">');
        r.b(r.v(r.f("host", e, t, 0)));
        r.b("</span>");
        r.b("\n" + n);
        r.b("          </div>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("      </ol>");
        r.b("\n" + n);
        r.b("      <div class='g-recaptcha' data-sitekey='6LdXfCIUAAAAAIkS2PW7C9PXbzLvQfsFcDVWzFzg'></div>      ");
        r.b("\n" + n);
        r.b("      <ul class='validation-errors'></ul>");
        r.b("\n" + n);
        r.b("      <ul class='buttons right'>");
        r.b("\n" + n);
        r.b("        <li>");
        r.b("\n" + n);
        r.b("          <a class='button close'>Cancel</a>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("        <li>");
        r.b("\n" + n);
        r.b("          <input class='primary-button create-organization' type='submit' value='Create organization'>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("      </ul>");
        r.b("\n" + n);
        r.b("    </fieldset>");
        r.b("\n" + n);
        r.b("  </form>");
        r.b("\n" + n);
        r.b("</section>");
        r.b("\n");
        return r.fl();
    },
    partials: {
        "<noEnabledOrganizations0": {
            name: "noEnabledOrganizations",
            partials: {},
            subs: {}
        }
    },
    subs: {}
}, "<script src='https://www.google.com/recaptcha/api.js'><\/script>\n<section class='content clearfix'>\n  {{^canBeDismissed}}\n  <h2>Oops!</h2>\n  <p>\n    It seems that your Flowdock user account does not belong to an active organization. To proceed, you need to create a new organization{{^noOrganizations}} or restore an expired one below{{/noOrganizations}}. If you wish to join an existing organization, ask a member for an invitation.\n  </p>\n  {{> noEnabledOrganizations}}\n  Logged in as {{user.name}} ({{user.email}})\n  <input class='primary-button switch-accounts' type='button' value='Switch to another account'>\n  {{/canBeDismissed}}\n  <h3>Create a new organization</h3>\n  <hr class='short'>\n  <p>Creating a new organization will start a new 30-day trial. You can set up payments from the <a href=\"/account\" target=\"_blank\" rel=\"noopener noreferrer\">account</a> page.</p>\n  <form class='new-organization'>\n    <fieldset class='clearfix'>\n      <ol>\n        <li class='input name'>\n          <label for='organization-name'>What will it be called?</label>\n          <input autofocus name='organization-name' placeholder='Organization name' required type='text'>\n        </li>\n        <li class='input subdomain email-example'>\n          <label for='subdomain-name'>Subdomain for e-mails</label>\n          <a href=\"#\" class=\"edit-subdomain\">Edit</a>\n          <div class='flow-email'>\n            <span class=\"local-part\">flow_name@</span><span class=\"organization-part\">acme</span><input type=\"text\" required name=\"subdomain-name\"></input>.<span class=\"flowdock-domain\">{{host}}</span>\n          </div>\n        </li>\n      </ol>\n      <div class='g-recaptcha' data-sitekey='6LdXfCIUAAAAAIkS2PW7C9PXbzLvQfsFcDVWzFzg'></div>      \n      <ul class='validation-errors'></ul>\n      <ul class='buttons right'>\n        <li>\n          <a class='button close'>Cancel</a>\n        </li>\n        <li>\n          <input class='primary-button create-organization' type='submit' value='Create organization'>\n        </li>\n      </ul>\n    </fieldset>\n  </form>\n</section>\n", r);