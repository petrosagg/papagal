(function(e) {
    var n = /^[\],:{}\s]*$/, r = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, o = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, i = /(?:^|:|,)(?:\s*\[)+/g, s = /^\s+/, a = /\s+$/;
    module.exports = function(t) {
        if (typeof t == "string" && t) {
            t = t.replace(s, "").replace(a, "");
            if (e.JSON && JSON.parse) {
                return JSON.parse(t);
            }
            if (n.test(t.replace(r, "@").replace(o, "]").replace(i, ""))) {
                return new Function("return " + t)();
            }
            return;
        }
        return null;
    };
}).call(this, typeof global != "undefined" ? global : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});