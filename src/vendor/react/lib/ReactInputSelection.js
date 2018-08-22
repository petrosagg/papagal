"use strict";

function r(e) {
    return i(document.documentElement, e);
}

var o = require("./ReactDOMSelection"), i = require("./containsNode"), s = require("./focusNode"), a = require("./getActiveElement"), u = {
    hasSelectionCapabilities: function(e) {
        return e && (e.nodeName === "INPUT" && e.type === "text" || e.nodeName === "TEXTAREA" || e.contentEditable === "true");
    },
    getSelectionInformation: function() {
        var e = a();
        return {
            focusedElem: e,
            selectionRange: u.hasSelectionCapabilities(e) ? u.getSelection(e) : null
        };
    },
    restoreSelection: function(e) {
        var t = a(), n = e.focusedElem, o = e.selectionRange;
        if (t !== n && r(n)) {
            u.hasSelectionCapabilities(n) && u.setSelection(n, o), s(n)
        };
    },
    getSelection: function(e) {
        var t;
        if ("selectionStart" in e) {
            t = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
        } else if (document.selection && e.nodeName === "INPUT") {
            var n = document.selection.createRange();
            if (n.parentElement() === e) {
                t = {
                    start: -n.moveStart("character", -e.value.length),
                    end: -n.moveEnd("character", -e.value.length)
                }
            };
        } else t = o.getOffsets(e);
        return t || {
            start: 0,
            end: 0
        };
    },
    setSelection: function(e, t) {
        var n = t.start, r = t.end;
        if (typeof r == "undefined") {
            r = n
        }
        if ("selectionStart" in e) {
            e.selectionStart = n;
            e.selectionEnd = Math.min(r, e.value.length);
        } else if (document.selection && e.nodeName === "INPUT") {
            var i = e.createTextRange();
            i.collapse(!0);
            i.moveStart("character", n);
            i.moveEnd("character", r - n);
            i.select();
        } else o.setOffsets(e, t);
    }
};

module.exports = u;