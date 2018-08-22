"use strict";

function r(e, t, n) {
    var r = t.dispatchConfig.phasedRegistrationNames[n];
    return g(e, r);
}

function o(e, t, n) {
    var o = t ? m.bubbled : m.captured, i = r(e, n, o);
    if (i) {
        n._dispatchListeners = h(n._dispatchListeners, i), n._dispatchIDs = h(n._dispatchIDs, e)
    };
}

function i(e) {
    if (e && e.dispatchConfig.phasedRegistrationNames) {
        d.injection.getInstanceHandle().traverseTwoPhase(e.dispatchMarker, o, e)
    };
}

function s(e, t, n) {
    if (n && n.dispatchConfig.registrationName) {
        var r = n.dispatchConfig.registrationName, o = g(e, r);
        if (o) {
            n._dispatchListeners = h(n._dispatchListeners, o), n._dispatchIDs = h(n._dispatchIDs, e)
        };
    }
}

function a(e) {
    if (e && e.dispatchConfig.registrationName) {
        s(e.dispatchMarker, null, e)
    };
}

function u(e) {
    f(e, i);
}

function l(e, t, n, r) {
    d.injection.getInstanceHandle().traverseEnterLeave(n, r, s, e, t);
}

function c(e) {
    f(e, a);
}

var p = require("./EventConstants"), d = require("./EventPluginHub"), h = require("./accumulateInto"), f = require("./forEachAccumulated"), m = p.PropagationPhases, g = d.getListener, v = {
    accumulateTwoPhaseDispatches: u,
    accumulateDirectDispatches: c,
    accumulateEnterLeaveDispatches: l
};

module.exports = v;
