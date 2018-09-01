"use strict";

function r(e) {
    if ("selectionStart" in e && a.hasSelectionCapabilities(e)) {
        return {
            start: e.selectionStart,
            end: e.selectionEnd
        };
    }
    if (window.getSelection) {
        var t = window.getSelection();
        return {
            anchorNode: t.anchorNode,
            anchorOffset: t.anchorOffset,
            focusNode: t.focusNode,
            focusOffset: t.focusOffset
        };
    }
    if (document.selection) {
        var n = document.selection.createRange();
        return {
            parentElement: n.parentElement(),
            text: n.text,
            top: n.boundingTop,
            left: n.boundingLeft
        };
    }
}

function o(e) {
    if (b || m == null || m !== l()) {
        return null;
    }
    var t = r(m);
    if (!v || !d(v, t)) {
        v = t;
        var n = u.getPooled(f.select, g, e);
        n.type = "select";
        n.target = m;
        s.accumulateTwoPhaseDispatches(n);
        return n;
    }
}

var i = require("./EventConstants"), s = require("./EventPropagators"), a = require("./ReactInputSelection"), u = require("./SyntheticEvent"), l = require("./getActiveElement"), c = require("./isTextInputElement"), p = require("./keyOf"), d = require("./shallowEqual"), h = i.topLevelTypes, f = {
    select: {
        phasedRegistrationNames: {
            bubbled: p({
                onSelect: null
            }),
            captured: p({
                onSelectCapture: null
            })
        },
        dependencies: [ h.topBlur, h.topContextMenu, h.topFocus, h.topKeyDown, h.topMouseDown, h.topMouseUp, h.topSelectionChange ]
    }
}, m = null, g = null, v = null, b = false, y = {
    eventTypes: f,
    extractEvents: function(e, t, n, r) {
        switch (e) {
          case h.topFocus:
            if (c(t) || t.contentEditable === "true") {
                m = t;
                g = n;
                v = null;
            };
            break;

          case h.topBlur:
            m = null;
            g = null;
            v = null;
            break;

          case h.topMouseDown:
            b = true;
            break;

          case h.topContextMenu:
          case h.topMouseUp:
            b = false;
            return o(r);

          case h.topSelectionChange:
          case h.topKeyDown:
          case h.topKeyUp:
            return o(r);
        }
    }
};

module.exports = y;
