"use strict";

function r(e, t, n, r) {
    return e === n && t === r;
}

function o(e) {
    var t = document.selection, n = t.createRange(), r = n.text.length, o = n.duplicate();
    o.moveToElementText(e);
    o.setEndPoint("EndToStart", n);
    var i = o.text.length, s = i + r;
    return {
        start: i,
        end: s
    };
}

function i(e) {
    var t = window.getSelection && window.getSelection();
    if (!t || t.rangeCount === 0) {
        return null;
    }
    var n = t.anchorNode, o = t.anchorOffset, i = t.focusNode, s = t.focusOffset, a = t.getRangeAt(0), u = r(t.anchorNode, t.anchorOffset, t.focusNode, t.focusOffset), l = u ? 0 : a.toString().length, c = a.cloneRange();
    c.selectNodeContents(e);
    c.setEnd(a.startContainer, a.startOffset);
    var p = r(c.startContainer, c.startOffset, c.endContainer, c.endOffset), d = p ? 0 : c.toString().length, h = d + l, f = document.createRange();
    f.setStart(n, o);
    f.setEnd(i, s);
    var m = f.collapsed;
    return {
        start: m ? h : d,
        end: m ? d : h
    };
}

function s(e, t) {
    var n, r, o = document.selection.createRange().duplicate();
    if (typeof t.end == "undefined") {
        n = t.start;
        r = n;
    } else if (t.start > t.end) {
        n = t.end;
        r = t.start;
    } else {
        n = t.start;
        r = t.end;
    }
    o.moveToElementText(e);
    o.moveStart("character", n);
    o.setEndPoint("EndToStart", o);
    o.moveEnd("character", r - n);
    o.select();
}

function a(e, t) {
    if (window.getSelection) {
        var n = window.getSelection(), r = e[c()].length, o = Math.min(t.start, r), i = typeof t.end == "undefined" ? o : Math.min(t.end, r);
        if (!n.extend && o > i) {
            var s = i;
            i = o;
            o = s;
        }
        var a = l(e, o), u = l(e, i);
        if (a && u) {
            var p = document.createRange();
            p.setStart(a.node, a.offset);
            n.removeAllRanges();
            if (o > i) {
                n.addRange(p);
                n.extend(u.node, u.offset);
            } else {
                p.setEnd(u.node, u.offset);
                n.addRange(p);
            }
        }
    }
}

var u = require("./ExecutionEnvironment"), l = require("./getNodeForCharacterOffset"), c = require("./getTextContentAccessor"), p = u.canUseDOM && "selection" in document && !("getSelection" in window), d = {
    getOffsets: p ? o : i,
    setOffsets: p ? s : a
};

module.exports = d;
