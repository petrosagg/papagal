"use strict";

function r(e) {
    var t = true;
    e: for (;t; ) {
        var n = e;
        t = false;
        var r = n.match(/(\(<[^>]+>\))|<([^>]+)>\)/);
        if (r !== undefined && r !== null) {
            var o = r[2];
            if (o !== undefined && o !== null) {
                var i = n.replace("<" + r[2] + ">)", "<" + r[2] + ")>");
                e = i;
                t = true;
                r = o = i = undefined;
                continue e;
            }
        }
        return n;
    }
}

function o(e) {
    var t = /([\x2D\.:_a-z\u017F\u212A]+:\/\/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u180D\u180F-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])+[0-9A-JL-RT-Z_a-z]\x2D?\/?)/gi, n = e.replace(t, "<$1>");
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
    value: true
});

exports["default"] = function(e, t) {
    e.core.ruler.after("block", "flowdock-url", s);
};

module.exports = exports["default"];
