"use strict";

function r() {
    this.ruler = new o();
    for (var e = 0; e < i.length; e++) {
        this.ruler.push(i[e][0], i[e][1]);
    }
}

var o = require("./ruler"), i = [ [ "normalize", require("./rules_core/normalize") ], [ "block", require("./rules_core/block") ], [ "inline", require("./rules_core/inline") ], [ "linkify", require("./rules_core/linkify") ], [ "replacements", require("./rules_core/replacements") ], [ "smartquotes", require("./rules_core/smartquotes") ] ];

r.prototype.process = function(e) {
    var t, n, r;
    for (r = this.ruler.getRules(""), t = 0, n = r.length; n > t; t++) {
        r[t](e);
    }
};

r.prototype.State = require("./rules_core/state_core");

module.exports = r;