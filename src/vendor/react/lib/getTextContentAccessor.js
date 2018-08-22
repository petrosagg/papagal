"use strict";

function r() {
    if (!i && o.canUseDOM) {
        i = "textContent" in document.documentElement ? "textContent" : "innerText"
    };
    return i;
}

var o = require("./ExecutionEnvironment"), i = null;

module.exports = r;