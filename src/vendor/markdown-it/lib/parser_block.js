"use strict";

function r() {
    this.ruler = new o();
    for (var e = 0; e < i.length; e++) {
        this.ruler.push(i[e][0], i[e][1], {
            alt: (i[e][2] || []).slice()
        });
    }
}

var o = require("./ruler"), i = [ [ "code", require("./rules_block/code") ], [ "fence", require("./rules_block/fence"), [ "paragraph", "reference", "blockquote", "list" ] ], [ "blockquote", require("./rules_block/blockquote"), [ "paragraph", "reference", "list" ] ], [ "hr", require("./rules_block/hr"), [ "paragraph", "reference", "blockquote", "list" ] ], [ "list", require("./rules_block/list"), [ "paragraph", "reference", "blockquote" ] ], [ "reference", require("./rules_block/reference") ], [ "heading", require("./rules_block/heading"), [ "paragraph", "reference", "blockquote" ] ], [ "lheading", require("./rules_block/lheading") ], [ "html_block", require("./rules_block/html_block"), [ "paragraph", "reference", "blockquote" ] ], [ "table", require("./rules_block/table"), [ "paragraph", "reference" ] ], [ "paragraph", require("./rules_block/paragraph") ] ];

r.prototype.tokenize = function(e, t, n) {
    for (var r, o, i = this.ruler.getRules(""), s = i.length, a = t, u = !1, l = e.md.options.maxNesting; n > a && (e.line = a = e.skipEmptyLines(a), 
    !(a >= n)) && !(e.tShift[a] < e.blkIndent); ) {
        if (e.level >= l) {
            e.line = n;
            break;
        }
        for (o = 0; s > o && !(r = i[o](e, a, n, !1)); o++) {
        }
        e.tight = !u;
        if (e.isEmpty(e.line - 1)) {
            u = !0
        };
        a = e.line;
        if (n > a && e.isEmpty(a)) {
            u = !0;
            a++;
            if (n > a && e.parentType === "list" && e.isEmpty(a)) {
                break;
            }
            e.line = a;
        }
    }
};

r.prototype.parse = function(e, t, n, r) {
    var o;
    if (e) {
        o = new this.State(e, t, n, r);
        return void this.tokenize(o, o.line, o.lineMax);
    }
    return [];
};

r.prototype.State = require("./rules_block/state_block");

module.exports = r;
