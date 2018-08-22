"use strict";

function r() {
    this._callbacks = null;
    this._contexts = null;
}

var o = require("./PooledClass"), i = require("./Object.assign"), s = require("./invariant");

i(r.prototype, {
    enqueue: function(e, t) {
        this._callbacks = this._callbacks || [];
        this._contexts = this._contexts || [];
        this._callbacks.push(e);
        this._contexts.push(t);
    },
    notifyAll: function() {
        var e = this._callbacks, t = this._contexts;
        if (e) {
            s(e.length === t.length);
            this._callbacks = null;
            this._contexts = null;
            for (var n = 0, r = e.length; r > n; n++) {
                e[n].call(t[n]);
            }
            e.length = 0;
            t.length = 0;
        }
    },
    reset: function() {
        this._callbacks = null;
        this._contexts = null;
    },
    destructor: function() {
        this.reset();
    }
});

o.addPoolingTo(r);

module.exports = r;