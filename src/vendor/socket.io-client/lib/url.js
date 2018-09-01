(function(n) {
    function r(e, t) {
        var r = e, t = t || n.location;
        if (e == null) {
            e = t.protocol + "//" + t.host
        };
        if (typeof e == "string") {
            if (e.charAt(0) == "/") {
                e = e.charAt(1) == "/" ? t.protocol + e : t.hostname + e
            };
            if (!/^(https?|wss?):\/\//.test(e)) {
                i("protocol-less url %s", e);
                if (typeof t != "undefined") {
                    e = t.protocol + "//" + e;
                } else {
                    e = "https://" + e;
                }
            };
            i("parse %s", e);
            r = o(e);
        };
        if (!r.port) {
            /^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")
        };
        r.path = r.path || "/";
        r.id = r.protocol + "://" + r.host + ":" + r.port;
        r.href = r.protocol + "://" + r.host + (t && t.port == r.port ? "" : ":" + r.port);
        return r;
    }
    var o = require("parseuri"), i = require("debug")("socket.io-client:url");
    module.exports = r;
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
