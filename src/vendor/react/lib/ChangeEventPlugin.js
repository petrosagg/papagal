"use strict";

function r(e) {
    return e.nodeName === "SELECT" || e.nodeName === "INPUT" && e.type === "file";
}

function o(e) {
    var t = x.getPooled(D.change, M, e);
    _.accumulateTwoPhaseDispatches(t);
    k.batchedUpdates(i, t);
}

function i(e) {
    y.enqueueEvents(e);
    y.processEventQueue();
}

function s(e, t) {
    A = e;
    M = t;
    A.attachEvent("onchange", o);
}

function a() {
    if (A) {
        A.detachEvent("onchange", o), A = null, M = null
    };
}

function u(e, t, n) {
    if (e === S.topChange) {
        return n;
    }
    return;
}

function l(e, t, n) {
    e === S.topFocus ? (a(), s(t, n)) : e === S.topBlur && a();
}

function c(e, t) {
    A = e;
    M = t;
    F = e.value;
    N = Object.getOwnPropertyDescriptor(e.constructor.prototype, "value");
    Object.defineProperty(A, "value", P);
    A.attachEvent("onpropertychange", d);
}

function p() {
    if (A) {
        delete A.value, A.detachEvent("onpropertychange", d), A = null, M = null, F = null, 
        N = null
    };
}

function d(e) {
    if (e.propertyName === "value") {
        var t = e.srcElement.value;
        if (t !== F) {
            F = t, o(e)
        };
    }
}

function h(e, t, n) {
    if (e === S.topInput) {
        return n;
    }
    return;
}

function f(e, t, n) {
    e === S.topFocus ? (p(), c(t, n)) : e === S.topBlur && p();
}

function m(e, t, n) {
    if (e !== S.topSelectionChange && e !== S.topKeyUp && e !== S.topKeyDown || !A || A.value === F) {
        return void 0;
    }
    F = A.value;
    return M;
}

function g(e) {
    return e.nodeName === "INPUT" && (e.type === "checkbox" || e.type === "radio");
}

function v(e, t, n) {
    if (e === S.topClick) {
        return n;
    }
    return;
}

var b = require("./EventConstants"), y = require("./EventPluginHub"), _ = require("./EventPropagators"), w = require("./ExecutionEnvironment"), k = require("./ReactUpdates"), x = require("./SyntheticEvent"), C = require("./isEventSupported"), E = require("./isTextInputElement"), T = require("./keyOf"), S = b.topLevelTypes, D = {
    change: {
        phasedRegistrationNames: {
            bubbled: T({
                onChange: null
            }),
            captured: T({
                onChangeCapture: null
            })
        },
        dependencies: [ S.topBlur, S.topChange, S.topClick, S.topFocus, S.topInput, S.topKeyDown, S.topKeyUp, S.topSelectionChange ]
    }
}, A = null, M = null, F = null, N = null, O = !1;

if (w.canUseDOM) {
    O = C("change") && (!("documentMode" in document) || document.documentMode > 8)
};

var I = !1;

if (w.canUseDOM) {
    I = C("input") && (!("documentMode" in document) || document.documentMode > 9)
};

var P = {
    get: function() {
        return N.get.call(this);
    },
    set: function(e) {
        F = "" + e;
        N.set.call(this, e);
    }
}, L = {
    eventTypes: D,
    extractEvents: function(e, t, n, o) {
        var i, s;
        r(t) ? O ? i = u : s = l : E(t) ? I ? i = h : (i = m, s = f) : g(t) && (i = v);
        if (i) {
            var a = i(e, t, n);
            if (a) {
                var c = x.getPooled(D.change, a, o);
                _.accumulateTwoPhaseDispatches(c);
                return c;
            }
        }
        if (s) {
            s(e, t, n)
        };
    }
};

module.exports = L;
