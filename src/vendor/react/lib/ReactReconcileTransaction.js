"use strict";

function r() {
    this.reinitializeTransaction();
    this.renderToStaticMarkup = !1;
    this.reactMountReady = o.getPooled(null);
    this.putListenerQueue = u.getPooled();
}

var o = require("./CallbackQueue"), i = require("./PooledClass"), s = require("./ReactBrowserEventEmitter"), a = require("./ReactInputSelection"), u = require("./ReactPutListenerQueue"), l = require("./Transaction"), c = require("./Object.assign"), p = {
    initialize: a.getSelectionInformation,
    close: a.restoreSelection
}, d = {
    initialize: function() {
        var e = s.isEnabled();
        s.setEnabled(!1);
        return e;
    },
    close: function(e) {
        s.setEnabled(e);
    }
}, h = {
    initialize: function() {
        this.reactMountReady.reset();
    },
    close: function() {
        this.reactMountReady.notifyAll();
    }
}, f = {
    initialize: function() {
        this.putListenerQueue.reset();
    },
    close: function() {
        this.putListenerQueue.putListeners();
    }
}, m = [ f, p, d, h ], g = {
    getTransactionWrappers: function() {
        return m;
    },
    getReactMountReady: function() {
        return this.reactMountReady;
    },
    getPutListenerQueue: function() {
        return this.putListenerQueue;
    },
    destructor: function() {
        o.release(this.reactMountReady);
        this.reactMountReady = null;
        u.release(this.putListenerQueue);
        this.putListenerQueue = null;
    }
};

c(r.prototype, l.Mixin, g);

i.addPoolingTo(r);

module.exports = r;
