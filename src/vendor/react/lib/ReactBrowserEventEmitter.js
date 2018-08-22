"use strict";

function r(e) {
    Object.prototype.hasOwnProperty.call(e, m) || (e[m] = h++, p[e[m]] = {});
    return p[e[m]];
}

var o = require("./EventConstants"), i = require("./EventPluginHub"), s = require("./EventPluginRegistry"), a = require("./ReactEventEmitterMixin"), u = require("./ViewportMetrics"), l = require("./Object.assign"), c = require("./isEventSupported"), p = {}, d = !1, h = 0, f = {
    topBlur: "blur",
    topChange: "change",
    topClick: "click",
    topCompositionEnd: "compositionend",
    topCompositionStart: "compositionstart",
    topCompositionUpdate: "compositionupdate",
    topContextMenu: "contextmenu",
    topCopy: "copy",
    topCut: "cut",
    topDoubleClick: "dblclick",
    topDrag: "drag",
    topDragEnd: "dragend",
    topDragEnter: "dragenter",
    topDragExit: "dragexit",
    topDragLeave: "dragleave",
    topDragOver: "dragover",
    topDragStart: "dragstart",
    topDrop: "drop",
    topFocus: "focus",
    topInput: "input",
    topKeyDown: "keydown",
    topKeyPress: "keypress",
    topKeyUp: "keyup",
    topMouseDown: "mousedown",
    topMouseMove: "mousemove",
    topMouseOut: "mouseout",
    topMouseOver: "mouseover",
    topMouseUp: "mouseup",
    topPaste: "paste",
    topScroll: "scroll",
    topSelectionChange: "selectionchange",
    topTextInput: "textInput",
    topTouchCancel: "touchcancel",
    topTouchEnd: "touchend",
    topTouchMove: "touchmove",
    topTouchStart: "touchstart",
    topWheel: "wheel"
}, m = "_reactListenersID" + String(Math.random()).slice(2), g = l({}, a, {
    ReactEventListener: null,
    injection: {
        injectReactEventListener: function(e) {
            e.setHandleTopLevel(g.handleTopLevel);
            g.ReactEventListener = e;
        }
    },
    setEnabled: function(e) {
        if (g.ReactEventListener) {
            g.ReactEventListener.setEnabled(e)
        };
    },
    isEnabled: function() {
        return !(!g.ReactEventListener || !g.ReactEventListener.isEnabled());
    },
    listenTo: function(e, t) {
        for (var n = t, i = r(n), a = s.registrationNameDependencies[e], u = o.topLevelTypes, l = 0, p = a.length; p > l; l++) {
            var d = a[l];
            i.hasOwnProperty(d) && i[d] || (d === u.topWheel ? c("wheel") ? g.ReactEventListener.trapBubbledEvent(u.topWheel, "wheel", n) : c("mousewheel") ? g.ReactEventListener.trapBubbledEvent(u.topWheel, "mousewheel", n) : g.ReactEventListener.trapBubbledEvent(u.topWheel, "DOMMouseScroll", n) : d === u.topScroll ? c("scroll", !0) ? g.ReactEventListener.trapCapturedEvent(u.topScroll, "scroll", n) : g.ReactEventListener.trapBubbledEvent(u.topScroll, "scroll", g.ReactEventListener.WINDOW_HANDLE) : d === u.topFocus || d === u.topBlur ? (c("focus", !0) ? (g.ReactEventListener.trapCapturedEvent(u.topFocus, "focus", n), 
            g.ReactEventListener.trapCapturedEvent(u.topBlur, "blur", n)) : c("focusin") && (g.ReactEventListener.trapBubbledEvent(u.topFocus, "focusin", n), 
            g.ReactEventListener.trapBubbledEvent(u.topBlur, "focusout", n)), i[u.topBlur] = !0, 
            i[u.topFocus] = !0) : f.hasOwnProperty(d) && g.ReactEventListener.trapBubbledEvent(d, f[d], n), 
            i[d] = !0);
        }
    },
    trapBubbledEvent: function(e, t, n) {
        return g.ReactEventListener.trapBubbledEvent(e, t, n);
    },
    trapCapturedEvent: function(e, t, n) {
        return g.ReactEventListener.trapCapturedEvent(e, t, n);
    },
    ensureScrollValueMonitoring: function() {
        if (!d) {
            var e = u.refreshScrollValues;
            g.ReactEventListener.monitorScrollValue(e);
            d = !0;
        }
    },
    eventNameDispatchConfigs: i.eventNameDispatchConfigs,
    registrationNameModules: i.registrationNameModules,
    putListener: i.putListener,
    getListener: i.getListener,
    deleteListener: i.deleteListener,
    deleteAllListeners: i.deleteAllListeners
});

module.exports = g;