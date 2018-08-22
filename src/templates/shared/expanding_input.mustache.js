var r = require("hogan.js");

module.exports = new r.Template({
    code: function(e, t, n) {
        var r = this;
        r.b(n = n || "");
        r.b('<pre><span class="copy"></span><br></pre>');
        r.b("\n" + n);
        r.b("<textarea class='message-input' data-input-id='");
        r.b(r.v(r.f("persistId", e, t, 0)));
        r.b("' dir='auto' maxlength='");
        r.b(r.v(r.f("maxlength", e, t, 0)));
        r.b("' placeholder='");
        r.b(r.v(r.f("placeholder", e, t, 0)));
        r.b("' rows='1'></textarea>");
        r.b("\n");
        return r.fl();
    },
    partials: {},
    subs: {}
}, "<pre><span class=\"copy\"></span><br></pre>\n<textarea class='message-input' data-input-id='{{persistId}}' dir='auto' maxlength='{{maxlength}}' placeholder='{{placeholder}}' rows='1'></textarea>\n", r);