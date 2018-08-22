"use strict";

function r(e, t, n) {
    this.src = e;
    this.env = n;
    this.tokens = [];
    this.inlineMode = !1;
    this.md = t;
}

var o = require("../token");

r.prototype.Token = o;

module.exports = r;
