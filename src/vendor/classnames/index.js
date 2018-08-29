!function() {
    "use strict";
    function e() {
        for (var t = "", n = 0; n < arguments.length; n++) {
            var r = arguments[n];
            if (r) {
                var o = typeof r;
                if (o === "string" || o === "number") {
                    t += " " + r;
                } else if (Array.isArray(r)) {
                    t += " " + e.apply(null, r);
                } else if (o === "object") {
                    for (var i in r) {
                        if (r.hasOwnProperty(i) && r[i]) {
                            t += " " + i
                        };
                    }
                }
            }
        }
        return t.substr(1);
    }
    if (typeof module != "undefined" && module.exports) {
        module.exports = e;
    } else if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define(function() {
            return e;
        });
    } else window.classNames = e;
}();
