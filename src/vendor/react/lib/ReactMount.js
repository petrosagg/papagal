"use strict";

function r(e, t) {
    for (var n = Math.min(e.length, t.length), r = 0; n > r; r++) {
        if (e.charAt(r) !== t.charAt(r)) {
            return r;
        }
    }
    if (e.length === t.length) {
        return -1;
    }
    return n;
}

function o(e) {
    var t = A(e);
    return t && H.getID(t);
}

function i(e) {
    var t = s(e);
    if (t) {
        if (L.hasOwnProperty(t)) {
            var n = L[t];
            if (n !== e) {
                F(!c(n, t)), L[t] = e
            };
        } else L[t] = e;
    }
    return t;
}

function s(e) {
    return e && e.getAttribute && e.getAttribute(P) || "";
}

function a(e, t) {
    var n = s(e);
    if (n !== t) {
        delete L[n]
    };
    e.setAttribute(P, t);
    L[t] = e;
}

function u(e) {
    L.hasOwnProperty(e) && c(L[e], e) || (L[e] = H.findReactNodeByID(e));
    return L[e];
}

function l(e) {
    var t = w.get(e)._rootNodeID;
    if (y.isNullComponentID(t)) {
        return null;
    }
    L.hasOwnProperty(t) && c(L[t], t) || (L[t] = H.findReactNodeByID(t));
    return L[t];
}

function c(e, t) {
    if (e) {
        F(s(e) === t);
        var n = H.findReactContainerForID(t);
        if (n && D(n, e)) {
            return !0;
        }
    }
    return !1;
}

function p(e) {
    delete L[e];
}

function d(e) {
    var t = L[e];
    if (t && c(t, e)) {
        return void (V = t);
    }
    return !1;
}

function h(e) {
    V = null;
    _.traverseAncestors(e, d);
    var t = V;
    V = null;
    return t;
}

function f(e, t, n, r, o) {
    var i = C.mountComponent(e, t, r, S);
    e._isTopLevel = !0;
    H._mountImageIntoNode(i, n, o);
}

function m(e, t, n, r) {
    var o = T.ReactReconcileTransaction.getPooled();
    o.perform(f, null, e, t, n, o, r);
    T.ReactReconcileTransaction.release(o);
}

var g = require("./DOMProperty"), v = require("./ReactBrowserEventEmitter"), b = (require("./ReactCurrentOwner"), 
require("./ReactElement")), y = (require("./ReactElementValidator"), require("./ReactEmptyComponent")), _ = require("./ReactInstanceHandles"), w = require("./ReactInstanceMap"), k = require("./ReactMarkupChecksum"), x = require("./ReactPerf"), C = require("./ReactReconciler"), E = require("./ReactUpdateQueue"), T = require("./ReactUpdates"), S = require("./emptyObject"), D = require("./containsNode"), A = require("./getReactRootElementInContainer"), M = require("./instantiateReactComponent"), F = require("./invariant"), N = require("./setInnerHTML"), O = require("./shouldUpdateReactComponent"), I = (require("./warning"), 
_.SEPARATOR), P = g.ID_ATTRIBUTE_NAME, L = {}, R = 1, B = 9, j = {}, $ = {}, U = [], V = null, H = {
    _instancesByReactRootID: j,
    scrollMonitor: function(e, t) {
        t();
    },
    _updateRootComponent: function(e, t, n, r) {
        H.scrollMonitor(n, function() {
            E.enqueueElementInternal(e, t);
            if (r) {
                E.enqueueCallbackInternal(e, r)
            };
        });
        return e;
    },
    _registerComponent: function(e, t) {
        F(t && (t.nodeType === R || t.nodeType === B));
        v.ensureScrollValueMonitoring();
        var n = H.registerContainer(t);
        j[n] = e;
        return n;
    },
    _renderNewRootComponent: function(e, t, n) {
        var r = M(e, null), o = H._registerComponent(r, t);
        T.batchedUpdates(m, r, o, t, n);
        return r;
    },
    render: function(e, t, n) {
        F(b.isValidElement(e));
        var r = j[o(t)];
        if (r) {
            var i = r._currentElement;
            if (O(i, e)) {
                return H._updateRootComponent(r, e, t, n).getPublicInstance();
            }
            H.unmountComponentAtNode(t);
        }
        var s = A(t), a = s && H.isRenderedByReact(s), u = a && !r, l = H._renderNewRootComponent(e, t, u).getPublicInstance();
        if (n) {
            n.call(l)
        };
        return l;
    },
    constructAndRenderComponent: function(e, t, n) {
        var r = b.createElement(e, t);
        return H.render(r, n);
    },
    constructAndRenderComponentByID: function(e, t, n) {
        var r = document.getElementById(n);
        F(r);
        return H.constructAndRenderComponent(e, t, r);
    },
    registerContainer: function(e) {
        var t = o(e);
        if (t) {
            t = _.getReactRootIDFromNodeID(t)
        };
        t || (t = _.createReactRootID());
        $[t] = e;
        return t;
    },
    unmountComponentAtNode: function(e) {
        F(e && (e.nodeType === R || e.nodeType === B));
        var t = o(e), n = j[t];
        if (n) {
            H.unmountComponentFromNode(n, e);
            delete j[t];
            delete $[t];
            return !0;
        }
        return !1;
    },
    unmountComponentFromNode: function(e, t) {
        for (C.unmountComponent(e), t.nodeType === B && (t = t.documentElement); t.lastChild; ) {
            t.removeChild(t.lastChild);
        }
    },
    findReactContainerForID: function(e) {
        var t = _.getReactRootIDFromNodeID(e), n = $[t];
        return n;
    },
    findReactNodeByID: function(e) {
        var t = H.findReactContainerForID(e);
        return H.findComponentRoot(t, e);
    },
    isRenderedByReact: function(e) {
        if (1 !== e.nodeType) {
            return !1;
        }
        var t = H.getID(e);
        if (t) {
            return t.charAt(0) === I;
        }
        return !1;
    },
    getFirstReactDOM: function(e) {
        for (var t = e; t && t.parentNode !== t; ) {
            if (H.isRenderedByReact(t)) {
                return t;
            }
            t = t.parentNode;
        }
        return null;
    },
    findComponentRoot: function(e, t) {
        var n = U, r = 0, o = h(t) || e;
        for (n[0] = o.firstChild, n.length = 1; r < n.length; ) {
            for (var i, s = n[r++]; s; ) {
                var a = H.getID(s);
                a ? t === a ? i = s : _.isAncestorIDOf(a, t) && (n.length = r = 0, n.push(s.firstChild)) : n.push(s.firstChild);
                s = s.nextSibling;
            }
            if (i) {
                n.length = 0;
                return i;
            }
        }
        n.length = 0;
        F(!1);
    },
    _mountImageIntoNode: function(e, t, n) {
        F(t && (t.nodeType === R || t.nodeType === B))
        if (n) {
            var o = A(t);
            if (k.canReuseMarkup(e, o)) {
                return;
            }
            var i = o.getAttribute(k.CHECKSUM_ATTR_NAME);
            o.removeAttribute(k.CHECKSUM_ATTR_NAME);
            var s = o.outerHTML;
            o.setAttribute(k.CHECKSUM_ATTR_NAME, i);
            var a = r(e, s);
            " (client) " + e.substring(a - 20, a + 20) + "\n (server) " + s.substring(a - 20, a + 20);
            F(t.nodeType !== B);
        }
        F(t.nodeType !== B);
        N(t, e);
    },
    getReactRootID: o,
    getID: i,
    setID: a,
    getNode: u,
    getNodeFromInstance: l,
    purgeID: p
};

x.measureMethods(H, "ReactMount", {
    _renderNewRootComponent: "_renderNewRootComponent",
    _mountImageIntoNode: "_mountImageIntoNode"
});

module.exports = H;