"use strict";

function r(e, t) {
    if (!i.canUseDOM || t && !("addEventListener" in document)) {
        return !1;
    }
    var n = "on" + e, r = n in document;
    if (!r) {
        var s = document.createElement("div");
        s.setAttribute(n, "return;");
        r = typeof s[n] == "function";
    }
    if (!r && o && e === "wheel") {
        r = document.implementation.hasFeature("Events.wheel", "3.0")
    };
    return r;
}

var o, i = require("./ExecutionEnvironment");

if (i.canUseDOM) {
    o = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0
};

module.exports = r;