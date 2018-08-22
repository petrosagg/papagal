function r(e, t) {
    var n = e.length;
    if ("CSS" in window && "supports" in window.CSS) {
        for (;n--; ) {
            if (window.CSS.supports(i(e[n]), t)) {
                return !0;
            }
        }
        return !1;
    }
    if ("CSSSupportsRule" in window) {
        for (var r = []; n--; ) {
            r.push("(" + i(e[n]) + ":" + t + ")");
        }
        r = r.join(" or ");
        return o("@supports (" + r + ") { #modernizr { position: absolute; } }", function(e) {
            return getComputedStyle(e, null).position == "absolute";
        });
    }
    return void 0;
}

var o = require("./injectElementWithStyles"), i = require("./domToCSS");

module.exports = r;