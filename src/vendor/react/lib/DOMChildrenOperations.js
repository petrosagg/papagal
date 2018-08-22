"use strict";

function r(e, t, n) {
    e.insertBefore(t, e.childNodes[n] || null);
}

var o = require("./Danger"), i = require("./ReactMultiChildUpdateTypes"), s = require("./setTextContent"), a = require("./invariant"), u = {
    dangerouslyReplaceNodeWithMarkup: o.dangerouslyReplaceNodeWithMarkup,
    updateTextContent: s,
    processUpdates: function(e, t) {
        for (var n, u = null, l = null, c = 0; c < e.length; c++) {
            n = e[c]
            if (n.type === i.MOVE_EXISTING || n.type === i.REMOVE_NODE) {
                var p = n.fromIndex, d = n.parentNode.childNodes[p], h = n.parentID;
                a(d);
                u = u || {};
                u[h] = u[h] || [];
                u[h][p] = d;
                l = l || [];
                l.push(d);
            }
        }
        var f = o.dangerouslyRenderMarkup(t);
        if (l) {
            for (var m = 0; m < l.length; m++) {
                l[m].parentNode.removeChild(l[m]);
            }
        }
        for (var g = 0; g < e.length; g++) {
            switch (n = e[g], n.type) {
              case i.INSERT_MARKUP:
                r(n.parentNode, f[n.markupIndex], n.toIndex);
                break;

              case i.MOVE_EXISTING:
                r(n.parentNode, u[n.parentID][n.fromIndex], n.toIndex);
                break;

              case i.TEXT_CONTENT:
                s(n.parentNode, n.textContent);
                break;

              case i.REMOVE_NODE:
            }
        }
    }
};

module.exports = u;