function r(e, t, n, r, o) {
    var c = e.charAt(0).toUpperCase() + e.slice(1), p = (e + " " + i.join(c + " ") + c).split(" ");
    if (s(t, "string") || s(t, "undefined")) {
        return a(p, t, r, o);
    }
    p = (e + " " + u.join(c + " ") + c).split(" ");
    return l(p, t, n);
}

var o = require("./ModernizrProto"), i = require("./cssomPrefixes"), s = require("./is"), a = require("./testProps"), u = require("./domPrefixes"), l = require("./testDOMProps");

o.testAllProps = r;

module.exports = r;
