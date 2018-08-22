"use strict";

function r(e) {
    return "[^" + e.slice(1);
}

function o(e, t, n) {
    return new RegExp("(?:^|$|" + r(n) + ")((?:" + e + ")(?:" + t + ")*(?:" + n + ")+)", "g");
}

function i(e, t, n, r, o) {
    var i = e.content, s = e.level, a = i.match(n);
    if (null !== a) {
        for (var u = [], l = 0; l < a.length; l++) {
            var c = a[l].search(t), p = a[l].slice(c + 1), d = i.indexOf(a[l]) + c;
            if (d > 0) {
                var h = new r("text", "", 0);
                h.content = i.slice(0, d);
                h.level = s;
                u.push(h);
            }
            var f = new r(o, "", 0);
            f.content = p;
            f.markup = a[l][c];
            f.level = s;
            u.push(f);
            i = i.slice(d + 1 + p.length);
        }
        if (i.length > 0) {
            var f = new r("text", "", 0);
            f.content = i;
            f.level = s;
            u.push(f);
        }
        return u;
    }
}

Object.defineProperty(global, "__esModule", {
    value: !0
});

var s = require("./unicode");

global["default"] = function(e, t, n) {
    var r = e.utils.arrayReplaceAt, a = o(n.source, s.tagCharacter, s.tagEnd);
    return function(e) {
        for (var o, s = e.tokens, u = 0; u < s.length; u++) {
            if (s[u].type === "inline") {
                o = s[u].children;
                for (var l = o.length - 1; l >= 0; l--) {
                    var c = o[l];
                    if ("link_close" !== c.type) {
                        if (c.type === "text") {
                            var p = i(c, n, a, e.Token, t);
                            if (p) {
                                s[u].children = o = r(o, l, p)
                            };
                        }
                    } else for (l--; o[l].level !== c.level && "link_open" !== o[l].type; ) {
                        l--;
                    }
                }
            }
        }
    };
};

module.exports = global["default"];