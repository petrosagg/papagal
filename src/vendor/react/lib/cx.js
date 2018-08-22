"use strict";

function r(e) {
    if (typeof e == "object") {
        return Object.keys(e).filter(function(t) {
            return e[t];
        }).join(" ");
    }
    return Array.prototype.join.call(arguments, " ");
}

require("./warning");

module.exports = r;
