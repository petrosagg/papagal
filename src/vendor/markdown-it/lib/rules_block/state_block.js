"use strict";

function r(e, t, n, r) {
    var o, i, s, a, u, l, c;
    for (this.src = e, this.md = t, this.env = n, this.tokens = r, this.bMarks = [], 
    this.eMarks = [], this.tShift = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, 
    this.tight = false, this.parentType = "root", this.ddIndent = -1, this.level = 0, 
    this.result = "", i = this.src, l = 0, c = false, s = a = l = 0, u = i.length; u > a; a++) {
        o = i.charCodeAt(a);
        if (!c) {
            if (o === 32) {
                l++;
                continue;
            }
            c = true;
        }
        if (o === 10 || a === u - 1) {
            10 !== o && a++, this.bMarks.push(s), this.eMarks.push(a), this.tShift.push(l), 
            c = false, l = 0, s = a + 1
        };
    }
    this.bMarks.push(i.length);
    this.eMarks.push(i.length);
    this.tShift.push(0);
    this.lineMax = this.bMarks.length - 1;
}

var o = require("../token");

r.prototype.push = function(e, t, n) {
    var r = new o(e, t, n);
    r.block = true;
    if (n < 0) {
        this.level--
    };
    r.level = this.level;
    if (n > 0) {
        this.level++
    };
    this.tokens.push(r);
    return r;
};

r.prototype.isEmpty = function(e) {
    return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};

r.prototype.skipEmptyLines = function(e) {
    for (var t = this.lineMax; t > e && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++) {
    }
    return e;
};

r.prototype.skipSpaces = function(e) {
    for (var t = this.src.length; t > e && this.src.charCodeAt(e) === 32; e++) {
    }
    return e;
};

r.prototype.skipChars = function(e, t) {
    for (var n = this.src.length; n > e && this.src.charCodeAt(e) === t; e++) {
    }
    return e;
};

r.prototype.skipCharsBack = function(e, t, n) {
    if (n >= e) {
        return e;
    }
    for (;e > n; ) {
        if (t !== this.src.charCodeAt(--e)) {
            return e + 1;
        }
    }
    return e;
};

r.prototype.getLines = function(e, t, n, r) {
    var o, i, s, a, u, l = e;
    if (e >= t) {
        return "";
    }
    if (l + 1 === t) {
        i = this.bMarks[l] + Math.min(this.tShift[l], n);
        s = this.eMarks[t - 1] + (r ? 1 : 0);
        return this.src.slice(i, s);
    }
    for (a = new Array(t - e), o = 0; t > l; l++, o++) {
        u = this.tShift[l];
        if (u > n) {
            u = n
        };
        if (u < 0) {
            u = 0
        };
        i = this.bMarks[l] + u;
        s = t > l + 1 || r ? this.eMarks[l] + 1 : this.eMarks[l];
        a[o] = this.src.slice(i, s);
    }
    return a.join("");
};

r.prototype.Token = o;

module.exports = r;
