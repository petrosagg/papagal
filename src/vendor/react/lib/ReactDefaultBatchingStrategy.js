"use strict";

function r() {
    this.reinitializeTransaction();
}

var o = require("./ReactUpdates"), i = require("./Transaction"), s = require("./Object.assign"), a = require("./emptyFunction"), u = {
    initialize: a,
    close: function() {
        d.isBatchingUpdates = false;
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
    isBatchingUpdates: false,
    batchedUpdates: function(e, t, n, r, o) {
        var i = d.isBatchingUpdates;
        d.isBatchingUpdates = true;
        if (i) {
            e(t, n, r, o);
        } else {
            p.perform(e, null, t, n, r, o);
        }
    }
};

module.exports = d;
