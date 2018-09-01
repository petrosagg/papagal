(function(t) {
    function r(e) {
        var n, r = false, a = false, u = e.jsonp !== false;
        if (t.location) {
            var l = location.protocol == "https:", c = location.port;
            c || (c = l ? 443 : 80);
            r = e.hostname != location.hostname || c != e.port;
            a = e.secure != l;
        }
        e.xdomain = r;
        e.xscheme = a;
        n = new o(e);
        if ("open" in n && !e.forceJSONP) {
            return new i(e);
        }
        if (!u) {
            throw new Error("JSONP disabled");
        }
        return new s(e);
    }
    var o = require("xmlhttprequest"), i = require("./polling-xhr"), s = require("./polling-jsonp"), a = require("./websocket");
    exports.polling = r;
    exports.websocket = a;
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
