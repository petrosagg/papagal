"use strict";

var r, o = require("./ExecutionEnvironment");

if (o.canUseDOM) {
    r = window.performance || window.msPerformance || window.webkitPerformance
};

module.exports = r || {};
