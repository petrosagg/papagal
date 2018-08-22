"use strict";

function r() {
    this.listenersToPut = [];
}

var o = require("./PooledClass"), i = require("./ReactBrowserEventEmitter"), s = require("./Object.assign");

s(r.prototype, {
    enqueuePutListener: function(e, t, n) {
        this.listenersToPut.push({
            rootNodeID: e,
            propKey: t,
            propValue: n
        });
    },
    putListeners: function() {
        for (var e = 0; e < this.listenersToPut.length; e++) {
            var t = this.listenersToPut[e];
            i.putListener(t.rootNodeID, t.propKey, t.propValue);
        }
    },
    reset: function() {
        this.listenersToPut.length = 0;
    },
    destructor: function() {
        this.reset();
    }
});

o.addPoolingTo(r);

module.exports = r;