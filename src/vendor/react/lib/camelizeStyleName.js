"use strict";

function r(e) {
    return o(e.replace(i, "ms-"));
}

var o = require("./camelize"), i = /^-ms-/;

module.exports = r;
