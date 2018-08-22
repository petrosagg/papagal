"use strict";

function r(e) {
    var t = p.getID(e), n = c.getReactRootIDFromNodeID(t), r = p.findReactContainerForID(n), o = p.getFirstReactDOM(r);
    return o;
}

function o(e, t) {
    this.topLevelType = e;
    this.nativeEvent = t;
    this.ancestors = [];
}

function i(e) {
    for (var t = p.getFirstReactDOM(f(e.nativeEvent)) || window, n = t; n; ) {
        e.ancestors.push(n);
        n = r(n);
    }
    for (var o = 0, i = e.ancestors.length; i > o; o++) {
        t = e.ancestors[o];
        var s = p.getID(t) || "";
        g._handleTopLevel(e.topLevelType, t, s, e.nativeEvent);
    }
}

function s(e) {
    var t = m(window);
    e(t);
}

var a = require("./EventListener"), u = require("./ExecutionEnvironment"), l = require("./PooledClass"), c = require("./ReactInstanceHandles"), p = require("./ReactMount"), d = require("./ReactUpdates"), h = require("./Object.assign"), f = require("./getEventTarget"), m = require("./getUnboundedScrollPosition");

h(o.prototype, {
    destructor: function() {
        this.topLevelType = null;
        this.nativeEvent = null;
        this.ancestors.length = 0;
    }
});

l.addPoolingTo(o, l.twoArgumentPooler);

var g = {
    _enabled: !0,
    _handleTopLevel: null,
    WINDOW_HANDLE: u.canUseDOM ? window : null,
    setHandleTopLevel: function(e) {
        g._handleTopLevel = e;
    },
    setEnabled: function(e) {
        g._enabled = !!e;
    },
    isEnabled: function() {
        return g._enabled;
    },
    trapBubbledEvent: function(e, t, n) {
        var r = n;
        if (r) {
            return a.listen(r, t, g.dispatchEvent.bind(null, e));
        }
        return null;
    },
    trapCapturedEvent: function(e, t, n) {
        var r = n;
        if (r) {
            return a.capture(r, t, g.dispatchEvent.bind(null, e));
        }
        return null;
    },
    monitorScrollValue: function(e) {
        var t = s.bind(null, e);
        a.listen(window, "scroll", t);
    },
    dispatchEvent: function(e, t) {
        if (g._enabled) {
            var n = o.getPooled(e, t);
            try {
                d.batchedUpdates(i, n);
            } finally {
                o.release(n);
            }
        }
    }
};

module.exports = g;