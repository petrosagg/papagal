"use strict";

function r(e, t, n) {
    this.type = e;
    this.tag = t;
    this.attrs = null;
    this.map = null;
    this.nesting = n;
    this.level = 0;
    this.children = null;
    this.content = "";
    this.markup = "";
    this.info = "";
    this.meta = null;
    this.block = !1;
    this.hidden = !1;
}

r.prototype.attrIndex = function(e) {
    var t, n, r;
    if (!this.attrs) {
        return -1;
    }
    for (t = this.attrs, n = 0, r = t.length; r > n; n++) {
        if (t[n][0] === e) {
            return n;
        }
    }
    return -1;
};

r.prototype.attrPush = function(e) {
    if (this.attrs) {
        this.attrs.push(e);
    } else this.attrs = [ e ];
};

module.exports = r;
