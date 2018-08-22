"use strict";

function r(e) {
    return o(e).replace(i, "-ms-");
}

var o = require("./hyphenate"), i = /^ms-/;

module.exports = r;