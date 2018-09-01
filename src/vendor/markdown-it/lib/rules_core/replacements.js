"use strict";

function r(e, t) {
    return l[t.toLowerCase()];
}

function o(e) {
    var t, n;
    for (t = e.length - 1; t >= 0; t--) {
        n = e[t];
        if (n.type === "text") {
            n.content = n.content.replace(u, r)
        };
    }
}

function i(e) {
    var t, n;
    for (t = e.length - 1; t >= 0; t--) {
        n = e[t];
        if (n.type === "text" && s.test(n.content)) {
            n.content = n.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])\u2026/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---([^-]|$)/gm, "$1—$2").replace(/(^|\s)--(\s|$)/gm, "$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm, "$1–$2")
        };
    }
}

var s = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, a = /\((c|tm|r|p)\)/i, u = /\((c|tm|r|p)\)/gi, l = {
    c: "©",
    r: "®",
    p: "§",
    tm: "™"
};

module.exports = function(e) {
    var t;
    if (e.md.options.typographer) {
        for (t = e.tokens.length - 1; t >= 0; t--) {
            if (e.tokens[t].type === "inline") {
                if (a.test(e.tokens[t].content)) {
                    o(e.tokens[t].children)
                };
                if (s.test(e.tokens[t].content)) {
                    i(e.tokens[t].children)
                };
            };
        }
    }
};
