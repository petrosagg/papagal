"use strict";

function r() {
    this.ruler = new o();
    for (var e = 0; e < i.length; e++) {
        this.ruler.push(i[e][0], i[e][1]);
    }
}

var o = require("./ruler"), i = [ [ "text", require("./rules_inline/text") ], [ "newline", require("./rules_inline/newline") ], [ "escape", require("./rules_inline/escape") ], [ "backticks", require("./rules_inline/backticks") ], [ "strikethrough", require("./rules_inline/strikethrough") ], [ "emphasis", require("./rules_inline/emphasis") ], [ "link", require("./rules_inline/link") ], [ "image", require("./rules_inline/image") ], [ "autolink", require("./rules_inline/autolink") ], [ "html_inline", require("./rules_inline/html_inline") ], [ "entity", require("./rules_inline/entity") ] ];

r.prototype.skipToken = function(e) {
    var t, n = e.pos, r = this.ruler.getRules(""), o = r.length, i = e.md.options.maxNesting, s = e.cache;
    if (typeof s[n] != "undefined") {
        return void (e.pos = s[n]);
    }
    if (e.level < i) {
        for (t = 0; o > t; t++) {
            if (r[t](e, !0)) {
                return void (s[n] = e.pos);
            }
        }
    }
    e.pos++;
    s[n] = e.pos;
};

r.prototype.tokenize = function(e) {
    for (var t, n, r = this.ruler.getRules(""), o = r.length, i = e.posMax, s = e.md.options.maxNesting; e.pos < i; ) {
        if (e.level < s) {
            for (n = 0; o > n && !(t = r[n](e, !1)); n++) {
            }
        }
        if (t) {
            if (e.pos >= i) {
                break;
            }
        } else e.pending += e.src[e.pos++];
    }
    if (e.pending) {
        e.pushPending()
    };
};

r.prototype.parse = function(e, t, n, r) {
    var o = new this.State(e, t, n, r);
    this.tokenize(o);
};

r.prototype.State = require("./rules_inline/state_inline");

module.exports = r;