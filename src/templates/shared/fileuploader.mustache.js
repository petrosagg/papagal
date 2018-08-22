var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b("<input id='fileupload' name='");
        r.b(r.v(r.f("paramName", e, t, 0)));
        r.b("' type='file'>");
        r.b("\n" + n);
        r.b("<input name='event' type='hidden' value='file'>");
        r.b("\n" + n);
        r.b("<input name='uuid' type='hidden' value=''>");
        r.b("\n" + n);
        r.b("<input name='tags' type='hidden' value=''>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<input id='fileupload' name='{{paramName}}' type='file'>\n<input name='event' type='hidden' value='file'>\n<input name='uuid' type='hidden' value=''>\n<input name='tags' type='hidden' value=''>\n", r);