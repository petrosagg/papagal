"use strict";

function r(e) {
    return e.substring(1, e.indexOf(" "));
}

var o = require("./ExecutionEnvironment"), i = require("./createNodesFromMarkup"), s = require("./emptyFunction"), a = require("./getMarkupWrap"), u = require("./invariant"), l = /^(<[^ \/>]+)/, c = "data-danger-index", p = {
    dangerouslyRenderMarkup: function(e) {
        u(o.canUseDOM);
        for (var t, n = {}, p = 0; p < e.length; p++) {
            u(e[p]);
            t = r(e[p]);
            if (a(t)) {
                t = t;
            } else {
                t = "*";
            }
            n[t] = n[t] || [];
            n[t][p] = e[p];
        }
        var d = [], h = 0;
        for (t in n) {
            if (n.hasOwnProperty(t)) {
                var f, m = n[t];
                for (f in m) {
                    if (m.hasOwnProperty(f)) {
                        var g = m[f];
                        m[f] = g.replace(l, "$1 " + c + '="' + f + '" ');
                    }
                }
                for (var v = i(m.join(""), s), b = 0; b < v.length; ++b) {
                    var y = v[b];
                    if (y.hasAttribute && y.hasAttribute(c)) {
                        f = +y.getAttribute(c), y.removeAttribute(c), u(!d.hasOwnProperty(f)), d[f] = y, 
                        h += 1
                    };
                }
            }
        }
        u(h === d.length);
        u(d.length === e.length);
        return d;
    },
    dangerouslyReplaceNodeWithMarkup: function(e, t) {
        u(o.canUseDOM);
        u(t);
        u("html" !== e.tagName.toLowerCase());
        var n = i(t, s)[0];
        e.parentNode.replaceChild(n, e);
    }
};

module.exports = p;
