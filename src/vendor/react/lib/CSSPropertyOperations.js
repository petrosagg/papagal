"use strict";

var r = require("./CSSProperty"), o = require("./ExecutionEnvironment"), i = (require("./camelizeStyleName"), 
require("./dangerousStyleValue")), s = require("./hyphenateStyleName"), a = require("./memoizeStringOnly"), u = (require("./warning"), 
a(function(e) {
    return s(e);
})), l = "cssFloat";

if (o.canUseDOM && document.documentElement.style.cssFloat === void 0) {
    l = "styleFloat"
};

var c = {
    createMarkupForStyles: function(e) {
        var t = "";
        for (var n in e) {
            if (e.hasOwnProperty(n)) {
                var r = e[n];
                if (r != null) {
                    t += u(n) + ":", t += i(n, r) + ";"
                };
            }
        }
        return t || null;
    },
    setValueForStyles: function(e, t) {
        var n = e.style;
        for (var o in t) {
            if (t.hasOwnProperty(o)) {
                var s = i(o, t[o]);
                if (o === "float") {
                    o = l
                }
                if (s) {
                    n[o] = s;
                } else {
                    var a = r.shorthandPropertyExpansions[o];
                    if (a) {
                        for (var u in a) {
                            n[u] = "";
                        }
                    } else n[o] = "";
                }
            }
        }
    }
};

module.exports = c;
