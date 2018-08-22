"use strict";

function r(e, t) {
    if (e != null && t != null) {
        var n = typeof e, r = typeof t;
        if (n === "string" || n === "number") {
            return r === "string" || r === "number";
        }
        if (r === "object" && e.type === t.type && e.key === t.key) {
            var o = e._owner === t._owner;
            return o;
        }
    }
    return !1;
}

require("./warning");

module.exports = r;