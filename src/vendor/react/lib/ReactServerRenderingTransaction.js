"use strict";

function r(e) {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = e;
    this.reactMountReady = i.getPooled(null);
    this.putListenerQueue = s.getPooled();
}

var o = require("./PooledClass"), i = require("./CallbackQueue"), s = require("./ReactPutListenerQueue"), a = require("./Transaction"), u = require("./Object.assign"), l = require("./emptyFunction"), c = {
    initialize: function() {
        this.reactMountReady.reset();
    },
    close: l
}, p = {
    initialize: function() {
        this.putListenerQueue.reset();
    },
    close: l
}, d = [ p, c ], h = {
    getTransactionWrappers: function() {
        return d;
    },
    getReactMountReady: function() {
        return this.reactMountReady;
    },
    getPutListenerQueue: function() {
        return this.putListenerQueue;
    },
    destructor: function() {
        i.release(this.reactMountReady);
        this.reactMountReady = null;
        s.release(this.putListenerQueue);
        this.putListenerQueue = null;
    }
};

u(r.prototype, a.Mixin, h);

o.addPoolingTo(r);

module.exports = r;