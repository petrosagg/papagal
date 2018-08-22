"use strict";

function r() {
    g(T.ReactReconcileTransaction && _);
}

function o() {
    this.reinitializeTransaction();
    this.dirtyComponentsLength = null;
    this.callbackQueue = c.getPooled();
    this.reconcileTransaction = T.ReactReconcileTransaction.getPooled();
}

function i(e, t, n, o, i) {
    r();
    _.batchedUpdates(e, t, n, o, i);
}

function s(e, t) {
    return e._mountOrder - t._mountOrder;
}

function a(e) {
    var t = e.dirtyComponentsLength;
    g(t === v.length);
    v.sort(s);
    for (var n = 0; t > n; n++) {
        var r = v[n], o = r._pendingCallbacks;
        r._pendingCallbacks = null;
        h.performUpdateIfNecessary(r, e.reconcileTransaction);
        if (o) {
            for (var i = 0; i < o.length; i++) {
                e.callbackQueue.enqueue(o[i], r.getPublicInstance());
            }
        }
    }
}

function u(e) {
    r();
    if (_.isBatchingUpdates) {
        return void v.push(e);
    }
    return void _.batchedUpdates(u, e);
}

function l(e, t) {
    g(_.isBatchingUpdates);
    b.enqueue(e, t);
    y = !0;
}

var c = require("./CallbackQueue"), p = require("./PooledClass"), d = (require("./ReactCurrentOwner"), 
require("./ReactPerf")), h = require("./ReactReconciler"), f = require("./Transaction"), m = require("./Object.assign"), g = require("./invariant"), v = (require("./warning"), 
[]), b = c.getPooled(), y = !1, _ = null, w = {
    initialize: function() {
        this.dirtyComponentsLength = v.length;
    },
    close: function() {
        this.dirtyComponentsLength !== v.length ? (v.splice(0, this.dirtyComponentsLength), 
        C()) : v.length = 0;
    }
}, k = {
    initialize: function() {
        this.callbackQueue.reset();
    },
    close: function() {
        this.callbackQueue.notifyAll();
    }
}, x = [ w, k ];

m(o.prototype, f.Mixin, {
    getTransactionWrappers: function() {
        return x;
    },
    destructor: function() {
        this.dirtyComponentsLength = null;
        c.release(this.callbackQueue);
        this.callbackQueue = null;
        T.ReactReconcileTransaction.release(this.reconcileTransaction);
        this.reconcileTransaction = null;
    },
    perform: function(e, t, n) {
        return f.Mixin.perform.call(this, this.reconcileTransaction.perform, this.reconcileTransaction, e, t, n);
    }
});

p.addPoolingTo(o);

var C = function() {
    for (;v.length || y; ) {
        if (v.length) {
            var e = o.getPooled();
            e.perform(a, null, e);
            o.release(e);
        }
        if (y) {
            y = !1;
            var t = b;
            b = c.getPooled();
            t.notifyAll();
            c.release(t);
        }
    }
};

C = d.measure("ReactUpdates", "flushBatchedUpdates", C);

var E = {
    injectReconcileTransaction: function(e) {
        g(e);
        T.ReactReconcileTransaction = e;
    },
    injectBatchingStrategy: function(e) {
        g(e);
        g(typeof e.batchedUpdates == "function");
        g(typeof e.isBatchingUpdates == "boolean");
        _ = e;
    }
}, T = {
    ReactReconcileTransaction: null,
    batchedUpdates: i,
    enqueueUpdate: u,
    flushBatchedUpdates: C,
    injection: E,
    asap: l
};

module.exports = T;
