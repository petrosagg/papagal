"use strict";

function r(e) {
    return '"' + o(e) + '"';
}

var o = require("./escapeTextContentForBrowser");

module.exports = r;
