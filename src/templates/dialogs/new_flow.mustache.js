var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<section class='content clearfix'>");
        r.b("\n" + n);
        r.b("  <h3>Create a new flow</h3>");
        r.b("\n" + n);
        r.b("  <hr class='short'>");
        r.b("\n" + n);
        if (r.s(r.f("noFlows", e, t, 1), e, t, 0, 99, 252, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("  <p>");
                r.b("\n" + n);
                r.b("    <strong>");
                r.b("\n" + n);
                r.b("      <i class='fa fa-warning'></i>");
                r.b("\n" + n);
                r.b("      Looks like you don't have any accessible flows. Create a flow here.");
                r.b("\n" + n);
                r.b("    </strong>");
                r.b("\n" + n);
                r.b("  </p>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("  <p><strong>Flows</strong> are team workspaces with an inbox and a chat. Create one for each team and invite people to join.</p>");
        r.b("\n" + n);
        r.b("  <form class='create-new-flow'>");
        r.b("\n" + n);
        r.b("    <fieldset class='clearfix'>");
        r.b("\n" + n);
        r.b("      <ol>");
        r.b("\n" + n);
        r.b("        <li class='select organization'>");
        r.b("\n" + n);
        r.b("          <label for='organization'>Organization<br></label>");
        r.b("\n" + n);
        r.b("          <select class='flat-select' id='organization-select' name='organization' required>");
        r.b("\n" + n);
        if (r.s(r.f("organizations", e, t, 1), e, t, 0, 696, 762, "{{ }}")) {
            r.rs(e, t, function(e, t, r) {
                r.b("            <option value='");
                r.b(r.v(r.f("id", e, t, 0)));
                r.b("'>");
                r.b(r.v(r.f("name", e, t, 0)));
                r.b("</option>");
                r.b("\n" + n);
            }), e.pop()
        };
        r.b("            <optgroup label='-----------'></optgroup>");
        r.b("\n" + n);
        r.b("            <option value=''>Create new…</option>");
        r.b("\n" + n);
        r.b("          </select>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("        <li class='input name'>");
        r.b("\n" + n);
        r.b("          <label for='name'>What is it called?</label>");
        r.b("\n" + n);
        r.b("          <input autofocus name='name' pattern='.{2,}' placeholder='Flow name' required type='text'>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("        <li class='input description'>");
        r.b("\n" + n);
        r.b("          <label for='description'>What is its purpose and who is it meant for?</label>");
        r.b("\n" + n);
        r.b("          <textarea class='low' maxlength='255' name='description' placeholder='Flow description'></textarea>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("        <li class='input open-flow'>");
        r.b("\n" + n);
        r.b("          <input checked id='new-flow-open' name='open-flow' type='radio'>");
        r.b("\n" + n);
        r.b("          <label for='new-flow-open'>Allow anyone in the organization to join this flow</label><br />");
        r.b("\n" + n);
        r.b("          <input id='new-flow-inviteonly' name='open-flow' type='radio'>");
        r.b("\n" + n);
        r.b("          <label for='new-flow-inviteonly'>Hide this flow from others &#8212; invitation only</label>");
        r.b("\n" + n);
        r.b("        </li>");
        r.b("\n" + n);
        r.b("      </ol>");
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
        r.b("          <input class='primary-button' id='createFlow' type='submit' value='Create flow'>");
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
    partials: {},
    subs: {}
}, "<section class='content clearfix'>\n  <h3>Create a new flow</h3>\n  <hr class='short'>\n  {{#noFlows}}\n  <p>\n    <strong>\n      <i class='fa fa-warning'></i>\n      Looks like you don't have any accessible flows. Create a flow here.\n    </strong>\n  </p>\n  {{/noFlows}}\n  <p><strong>Flows</strong> are team workspaces with an inbox and a chat. Create one for each team and invite people to join.</p>\n  <form class='create-new-flow'>\n    <fieldset class='clearfix'>\n      <ol>\n        <li class='select organization'>\n          <label for='organization'>Organization<br></label>\n          <select class='flat-select' id='organization-select' name='organization' required>\n            {{#organizations}}\n            <option value='{{id}}'>{{name}}</option>\n            {{/organizations}}\n            <optgroup label='-----------'></optgroup>\n            <option value=''>Create new…</option>\n          </select>\n        </li>\n        <li class='input name'>\n          <label for='name'>What is it called?</label>\n          <input autofocus name='name' pattern='.{2,}' placeholder='Flow name' required type='text'>\n        </li>\n        <li class='input description'>\n          <label for='description'>What is its purpose and who is it meant for?</label>\n          <textarea class='low' maxlength='255' name='description' placeholder='Flow description'></textarea>\n        </li>\n        <li class='input open-flow'>\n          <input checked id='new-flow-open' name='open-flow' type='radio'>\n          <label for='new-flow-open'>Allow anyone in the organization to join this flow</label><br />\n          <input id='new-flow-inviteonly' name='open-flow' type='radio'>\n          <label for='new-flow-inviteonly'>Hide this flow from others &#8212; invitation only</label>\n        </li>\n      </ol>\n      <ul class='buttons right'>\n        <li>\n          <a class='button close'>Cancel</a>\n        </li>\n        <li>\n          <input class='primary-button' id='createFlow' type='submit' value='Create flow'>\n        </li>\n      </ul>\n    </fieldset>\n  </form>\n</section>\n", r);