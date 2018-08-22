!function() {
    function e(e, t) {
        var o = document.createElement("div");
        o.id = "input-textarea-caret-position-mirror-div";
        document.body.appendChild(o);
        var i = o.style, s = window.getComputedStyle ? getComputedStyle(e) : e.currentStyle;
        i.whiteSpace = "pre-wrap";
        if ("INPUT" !== e.nodeName) {
            i.wordWrap = "break-word"
        };
        i.position = "absolute";
        i.visibility = "hidden";
        n.forEach(function(e) {
            i[e] = s[e];
        });
        r ? e.scrollHeight > parseInt(s.height) && (i.overflowY = "scroll") : i.overflow = "hidden";
        o.textContent = e.value.substring(0, t);
        if (e.nodeName === "INPUT") {
            o.textContent = o.textContent.replace(/\s/g, " ")
        };
        var a = document.createElement("span");
        a.textContent = e.value.substring(t) || ".";
        o.appendChild(a);
        var u = {
            top: a.offsetTop + parseInt(s.borderTopWidth),
            left: a.offsetLeft + parseInt(s.borderLeftWidth)
        };
        document.body.removeChild(o);
        return u;
    }
    var n = [ "direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "borderStyle", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing", "tabSize", "MozTabSize" ], r = window.mozInnerScreenX != null;
    typeof module != "undefined" && typeof module.exports != "undefined" ? module.exports = e : window.getCaretCoordinates = e;
}();