"use strict";

function r(e) {
    e.remove();
}

var o = require("./ReactBrowserEventEmitter"), i = require("./accumulateInto"), s = require("./forEachAccumulated"), a = require("./invariant"), u = {
    trapBubbledEvent: function(e, t) {
        a(this.isMounted());
        var n = this.getDOMNode();
        a(n);
        var r = o.trapBubbledEvent(e, t, n);
        this._localEventListeners = i(this._localEventListeners, r);
    },
    componentWillUnmount: function() {
        if (this._localEventListeners) {
            s(this._localEventListeners, r)
        };
    }
};

module.exports = u;