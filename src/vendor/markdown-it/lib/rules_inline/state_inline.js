"use strict";

function r(e, t, n, r) {
    this.src = e;
    this.env = n;
    this.md = t;
    this.tokens = r;
    this.pos = 0;
    this.posMax = this.src.length;
    this.level = 0;
    this.pending = "";
    this.pendingLevel = 0;
    this.cache = {};
}

var o = require("../token");

r.prototype.pushPending = function() {
    var e = new o("text", "", 0);
    e.content = this.pending;
    e.level = this.pendingLevel;
    this.tokens.push(e);
    this.pending = "";
    return e;
};

r.prototype.push = function(e, t, n) {
    if (this.pending) {
        this.pushPending()
    };
    var r = new o(e, t, n);
    if (n < 0) {
        this.level--
    };
    r.level = this.level;
    if (n > 0) {
        this.level++
    };
    this.pendingLevel = this.level;
    this.tokens.push(r);
    return r;
};

r.prototype.Token = o;

module.exports = r;
