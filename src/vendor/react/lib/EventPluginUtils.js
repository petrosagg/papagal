"use strict";

function r(e) {
    return e === g.topMouseUp || e === g.topTouchEnd || e === g.topTouchCancel;
}

function o(e) {
    return e === g.topMouseMove || e === g.topTouchMove;
}

function i(e) {
    return e === g.topMouseDown || e === g.topTouchStart;
}

function s(e, t) {
    var n = e._dispatchListeners, r = e._dispatchIDs;
    if (Array.isArray(n)) {
        for (var o = 0; o < n.length && !e.isPropagationStopped(); o++) {
            t(e, n[o], r[o]);
        }
    } else {
        if (n) {
            t(e, n, r)
        };
    }
}

function a(e, t, n) {
    e.currentTarget = m.Mount.getNode(n);
    var r = t(e, n);
    e.currentTarget = null;
    return r;
}

function u(e, t) {
    s(e, t);
    e._dispatchListeners = null;
    e._dispatchIDs = null;
}

function l(e) {
    var t = e._dispatchListeners, n = e._dispatchIDs;
    if (Array.isArray(t)) {
        for (var r = 0; r < t.length && !e.isPropagationStopped(); r++) {
            if (t[r](e, n[r])) {
                return n[r];
            }
        }
    } else if (t && t(e, n)) {
        return n;
    }
    return null;
}

function c(e) {
    var t = l(e);
    e._dispatchIDs = null;
    e._dispatchListeners = null;
    return t;
}

function p(e) {
    var t = e._dispatchListeners, n = e._dispatchIDs;
    f(!Array.isArray(t));
    var r = t ? t(e, n) : null;
    e._dispatchListeners = null;
    e._dispatchIDs = null;
    return r;
}

function d(e) {
    return !!e._dispatchListeners;
}

var h = require("./EventConstants"), f = require("./invariant"), m = {
    Mount: null,
    injectMount: function(e) {
        m.Mount = e;
    }
}, g = h.topLevelTypes, v = {
    isEndish: r,
    isMoveish: o,
    isStartish: i,
    executeDirectDispatch: p,
    executeDispatch: a,
    executeDispatchesInOrder: u,
    executeDispatchesInOrderStopAtTrue: c,
    hasDispatches: d,
    injection: m,
    useTouchEvents: false
};

module.exports = v;
