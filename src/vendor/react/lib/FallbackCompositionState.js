"use strict";

function r(e) {
    this._root = e;
    this._startText = this.getText();
    this._fallbackText = null;
}

var o = require("./PooledClass"), i = require("./Object.assign"), s = require("./getTextContentAccessor");

i(r.prototype, {
    getText: function() {
        if ("value" in this._root) {
            return this._root.value;
        }
        return this._root[s()];
    },
    getData: function() {
        if (this._fallbackText) {
            return this._fallbackText;
        }
        var e, t, n = this._startText, r = n.length, o = this.getText(), i = o.length;
        for (e = 0; r > e && n[e] === o[e]; e++) {
        }
        var s = r - e;
        for (t = 1; s >= t && n[r - t] === o[i - t]; t++) {
        }
        var a = t > 1 ? 1 - t : undefined;
        this._fallbackText = o.slice(e, a);
        return this._fallbackText;
    }
});

o.addPoolingTo(r);

module.exports = r;
