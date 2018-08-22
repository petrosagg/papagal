"use strict";

function r(e) {
    var t = !0;
    e: for (;t; ) {
        var n = e;
        r = o = i = void 0;
        t = !1;
        var r = n.match(/(\(<[^>]+>\))|<([^>]+)>\)/);
        if (void 0 !== r && null !== r) {
            var o = r[2];
            if (void 0 !== o && null !== o) {
                var i = n.replace("<" + r[2] + ">)", "<" + r[2] + ")>");
                e = i;
                t = !0;
                continue e;
            }
        }
        return n;
    }
}

function o(e) {
    var t = /([a-z-_.:]+:\/\/\S+[^)\W]-?\/?)/gi, n = e.replace(t, "<$1>");
    return r(n).replace(/(<_([^>]+)_>)/, "_[$2]($2)_").replace(/\[([^\]]+)\]\(<([^>]+)>\)/, "[$1]($2)").replace(/<(onenote:[^>]+)>/, "[$1]($1)").replace(/<<([^>]+)>>/gi, "<$1>");
}

function i(e) {
    var t = e.indexOf("`");
    if (t === -1) {
        return o(e);
    }
    var n = e.slice(0, t), r = e.indexOf("`", t + 1), s = r === -1 ? e.length : r + 1, a = e.slice(t, s);
    return o(n) + a + i(e.slice(s));
}

function s(e) {
    for (var t = e.tokens, n = 0; n < t.length; n++) {
        var r = t[n];
        if (r.type === "inline") {
            r.content = i(r.content)
        };
    }
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

exports["default"] = function(e, t) {
    e.core.ruler.after("block", "flowdock-url", s);
};

module.exports = exports["default"];
