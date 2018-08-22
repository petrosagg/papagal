"use strict";

function r() {
    var e = window.opera;
    return typeof e == "object" && typeof e.version == "function" && parseInt(e.version(), 10) <= 12;
}

function o(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && !(e.ctrlKey && e.altKey);
}

function i(e) {
    switch (e) {
      case D.topCompositionStart:
        return A.compositionStart;

      case D.topCompositionEnd:
        return A.compositionEnd;

      case D.topCompositionUpdate:
        return A.compositionUpdate;
    }
}

function s(e, t) {
    return e === D.topKeyDown && t.keyCode === w;
}

function a(e, t) {
    switch (e) {
      case D.topKeyUp:
        return -1 !== _.indexOf(t.keyCode);

      case D.topKeyDown:
        return t.keyCode !== w;

      case D.topKeyPress:
      case D.topMouseDown:
      case D.topBlur:
        return !0;

      default:
        return !1;
    }
}

function u(e) {
    var t = e.detail;
    if (typeof t == "object" && "data" in t) {
        return t.data;
    }
    return null;
}

function l(e, t, n, r) {
    var o, l;
    k ? o = i(e) : F ? a(e, r) && (o = A.compositionEnd) : s(e, r) && (o = A.compositionStart);
    if (!o) {
        return null;
    }
    if (E) {
        F || o !== A.compositionStart ? o === A.compositionEnd && F && (l = F.getData()) : F = g.getPooled(t)
    };
    var c = v.getPooled(o, n, r);
    if (l) {
        c.data = l;
    } else {
        var p = u(r);
        if (null !== p) {
            c.data = p
        };
    }
    f.accumulateTwoPhaseDispatches(c);
    return c;
}

function c(e, t) {
    switch (e) {
      case D.topCompositionEnd:
        return u(t);

      case D.topKeyPress:
        var n = t.which;
        if (n !== T) {
            return null;
        }
        M = !0;
        return S;

      case D.topTextInput:
        var r = t.data;
        if (r === S && M) {
            return null;
        }
        return r;

      default:
        return null;
    }
}

function p(e, t) {
    if (F) {
        if (e === D.topCompositionEnd || a(e, t)) {
            var n = F.getData();
            g.release(F);
            F = null;
            return n;
        }
        return null;
    }
    switch (e) {
      case D.topPaste:
        return null;

      case D.topKeyPress:
        if (t.which && !o(t)) {
            return String.fromCharCode(t.which);
        }
        return null;

      case D.topCompositionEnd:
        if (E) {
            return null;
        }
        return t.data;

      default:
        return null;
    }
}

function d(e, t, n, r) {
    var o;
    o = C ? c(e, r) : p(e, r);
    if (!o) {
        return null;
    }
    var i = b.getPooled(A.beforeInput, n, r);
    i.data = o;
    f.accumulateTwoPhaseDispatches(i);
    return i;
}

var h = require("./EventConstants"), f = require("./EventPropagators"), m = require("./ExecutionEnvironment"), g = require("./FallbackCompositionState"), v = require("./SyntheticCompositionEvent"), b = require("./SyntheticInputEvent"), y = require("./keyOf"), _ = [ 9, 13, 27, 32 ], w = 229, k = m.canUseDOM && "CompositionEvent" in window, x = null;

if (m.canUseDOM && "documentMode" in document) {
    x = document.documentMode
};

var C = m.canUseDOM && "TextEvent" in window && !x && !r(), E = m.canUseDOM && (!k || x && x > 8 && x <= 11), T = 32, S = String.fromCharCode(T), D = h.topLevelTypes, A = {
    beforeInput: {
        phasedRegistrationNames: {
            bubbled: y({
                onBeforeInput: null
            }),
            captured: y({
                onBeforeInputCapture: null
            })
        },
        dependencies: [ D.topCompositionEnd, D.topKeyPress, D.topTextInput, D.topPaste ]
    },
    compositionEnd: {
        phasedRegistrationNames: {
            bubbled: y({
                onCompositionEnd: null
            }),
            captured: y({
                onCompositionEndCapture: null
            })
        },
        dependencies: [ D.topBlur, D.topCompositionEnd, D.topKeyDown, D.topKeyPress, D.topKeyUp, D.topMouseDown ]
    },
    compositionStart: {
        phasedRegistrationNames: {
            bubbled: y({
                onCompositionStart: null
            }),
            captured: y({
                onCompositionStartCapture: null
            })
        },
        dependencies: [ D.topBlur, D.topCompositionStart, D.topKeyDown, D.topKeyPress, D.topKeyUp, D.topMouseDown ]
    },
    compositionUpdate: {
        phasedRegistrationNames: {
            bubbled: y({
                onCompositionUpdate: null
            }),
            captured: y({
                onCompositionUpdateCapture: null
            })
        },
        dependencies: [ D.topBlur, D.topCompositionUpdate, D.topKeyDown, D.topKeyPress, D.topKeyUp, D.topMouseDown ]
    }
}, M = !1, F = null, N = {
    eventTypes: A,
    extractEvents: function(e, t, n, r) {
        return [ l(e, t, n, r), d(e, t, n, r) ];
    }
};

module.exports = N;
