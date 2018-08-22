"use strict";

function r() {
    this.reinitializeTransaction();
}

var o = require("./ReactUpdates"), i = require("./Transaction"), s = require("./Object.assign"), a = require("./emptyFunction"), u = {
    initialize: a,
    close: function() {
        d.isBatchingUpdates = !1;
    }
}, l = {
    initialize: a,
    close: o.flushBatchedUpdates.bind(o)
}, c = [ l, u ];

s(r.prototype, i.Mixin, {
    getTransactionWrappers: function() {
        return c;
    }
});

var p = new r(), d = {
    isBatchingUpdates: !1,
    batchedUpdates: function(e, t, n, r, o) {
        var i = d.isBatchingUpdates;
        d.isBatchingUpdates = !0;
        i ? e(t, n, r, o) : p.perform(e, null, t, n, r, o);
    }
};

module.exports = d;
