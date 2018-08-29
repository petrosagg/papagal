function r(e, t, n) {
    var r;
    for (var s in e) {
        if (e[s] in t) {
            if (n === false) {
                return e[s];
            }
            r = t[e[s]];
            if (o(r, "function")) {
                return i(r, n || t);
            }
            return r;
        }
    }
    return false;
}

var o = require("./is"), i = require("./fnBind");

module.exports = r;
