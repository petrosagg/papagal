"use strict";

function r(e) {
    p(i.isValidElement(e));
    var t;
    try {
        var n = s.createReactRootID();
        t = u.getPooled(!1);
        return t.perform(function() {
            var r = c(e, null), o = r.mountComponent(n, t, l);
            return a.addChecksumToMarkup(o);
        }, null);
    } finally {
        u.release(t);
    }
}

function o(e) {
    p(i.isValidElement(e));
    var t;
    try {
        var n = s.createReactRootID();
        t = u.getPooled(!0);
        return t.perform(function() {
            var r = c(e, null);
            return r.mountComponent(n, t, l);
        }, null);
    } finally {
        u.release(t);
    }
}

var i = require("./ReactElement"), s = require("./ReactInstanceHandles"), a = require("./ReactMarkupChecksum"), u = require("./ReactServerRenderingTransaction"), l = require("./emptyObject"), c = require("./instantiateReactComponent"), p = require("./invariant");

module.exports = {
    renderToString: r,
    renderToStaticMarkup: o
};