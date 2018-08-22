function r(e) {
    var t = i.className, n = o._config.classPrefix || "";
    if (s) {
        t = t.baseVal
    }
    if (o._config.enableJSClass) {
        var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
        t = t.replace(r, "$1" + n + "js$2");
    }
    if (o._config.enableClasses) {
        t += " " + n + e.join(" " + n), s ? i.className.baseVal = t : i.className = t
    };
}

var o = require("./Modernizr"), i = require("./docElement"), s = require("./isSVG");

module.exports = r;