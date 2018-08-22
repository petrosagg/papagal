"use strict";

function r() {
    o.attachRefs(this, this._currentElement);
}

var o = require("./ReactRef"), i = (require("./ReactElementValidator"), {
    mountComponent: function(e, t, n, o) {
        var i = e.mountComponent(t, n, o);
        n.getReactMountReady().enqueue(r, e);
        return i;
    },
    unmountComponent: function(e) {
        o.detachRefs(e, e._currentElement);
        e.unmountComponent();
    },
    receiveComponent: function(e, t, n, i) {
        var s = e._currentElement;
        if (t !== s || t._owner == null) {
            var a = o.shouldUpdateRefs(s, t);
            if (a) {
                o.detachRefs(e, s)
            };
            e.receiveComponent(t, n, i);
            if (a) {
                n.getReactMountReady().enqueue(r, e)
            };
        }
    },
    performUpdateIfNecessary: function(e, t) {
        e.performUpdateIfNecessary(t);
    }
});

module.exports = i;