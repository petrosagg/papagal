"use strict";

var r = require("./ExecutionEnvironment"), o = require("./escapeTextContentForBrowser"), i = require("./setInnerHTML"), s = function(e, t) {
    e.textContent = t;
};

if (r.canUseDOM) {
    if (!("textContent" in document.documentElement)) {
        s = function(e, t) {
            i(e, o(t));
        }
    }
};

module.exports = s;
