"use strict";

function r(e, t) {
    var n = t == null || typeof t == "boolean" || t === "";
    if (n) {
        return "";
    }
    var r = isNaN(t);
    if (r || t === 0 || i.hasOwnProperty(e) && i[e]) {
        return "" + t;
    }
    if (typeof t == "string") {
        t = t.trim()
    };
    return t + "px";
}

var o = require("./CSSProperty"), i = o.isUnitlessNumber;

module.exports = r;