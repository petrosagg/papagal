"use strict";

function r(e, t, n) {
    f.push({
        parentID: e,
        parentNode: null,
        type: c.INSERT_MARKUP,
        markupIndex: m.push(t) - 1,
        textContent: null,
        fromIndex: null,
        toIndex: n
    });
}

function o(e, t, n) {
    f.push({
        parentID: e,
        parentNode: null,
        type: c.MOVE_EXISTING,
        markupIndex: null,
        textContent: null,
        fromIndex: t,
        toIndex: n
    });
}

function i(e, t) {
    f.push({
        parentID: e,
        parentNode: null,
        type: c.REMOVE_NODE,
        markupIndex: null,
        textContent: null,
        fromIndex: t,
        toIndex: null
    });
}

function s(e, t) {
    f.push({
        parentID: e,
        parentNode: null,
        type: c.TEXT_CONTENT,
        markupIndex: null,
        textContent: t,
        fromIndex: null,
        toIndex: null
    });
}

function a() {
    if (f.length) {
        l.processChildrenUpdates(f, m), u()
    };
}

function u() {
    f.length = 0;
    m.length = 0;
}

var l = require("./ReactComponentEnvironment"), c = require("./ReactMultiChildUpdateTypes"), p = require("./ReactReconciler"), d = require("./ReactChildReconciler"), h = 0, f = [], m = [], g = {
    Mixin: {
        mountChildren: function(e, t, n) {
            var r = d.instantiateChildren(e, t, n);
            this._renderedChildren = r;
            var o = [], i = 0;
            for (var s in r) {
                if (r.hasOwnProperty(s)) {
                    var a = r[s], u = this._rootNodeID + s, l = p.mountComponent(a, u, t, n);
                    a._mountIndex = i;
                    o.push(l);
                    i++;
                }
            }
            return o;
        },
        updateTextContent: function(e) {
            h++;
            var t = !0;
            try {
                var n = this._renderedChildren;
                d.unmountChildren(n);
                for (var r in n) {
                    if (n.hasOwnProperty(r)) {
                        this._unmountChildByName(n[r], r)
                    };
                }
                this.setTextContent(e);
                t = !1;
            } finally {
                h--, h || (t ? u() : a());
            }
        },
        updateChildren: function(e, t, n) {
            h++;
            var r = !0;
            try {
                this._updateChildren(e, t, n);
                r = !1;
            } finally {
                h--, h || (r ? u() : a());
            }
        },
        _updateChildren: function(e, t, n) {
            var r = this._renderedChildren, o = d.updateChildren(r, e, t, n);
            this._renderedChildren = o
            if (o || r) {
                var i, s = 0, a = 0;
                for (i in o) {
                    if (o.hasOwnProperty(i)) {
                        var u = r && r[i], l = o[i];
                        u === l ? (this.moveChild(u, a, s), s = Math.max(u._mountIndex, s), u._mountIndex = a) : (u && (s = Math.max(u._mountIndex, s), 
                        this._unmountChildByName(u, i)), this._mountChildByNameAtIndex(l, i, a, t, n));
                        a++;
                    }
                }
                for (i in r) {
                    !r.hasOwnProperty(i) || o && o.hasOwnProperty(i) || this._unmountChildByName(r[i], i);
                }
            }
        },
        unmountChildren: function() {
            var e = this._renderedChildren;
            d.unmountChildren(e);
            this._renderedChildren = null;
        },
        moveChild: function(e, t, n) {
            if (e._mountIndex < n) {
                o(this._rootNodeID, e._mountIndex, t)
            };
        },
        createChild: function(e, t) {
            r(this._rootNodeID, t, e._mountIndex);
        },
        removeChild: function(e) {
            i(this._rootNodeID, e._mountIndex);
        },
        setTextContent: function(e) {
            s(this._rootNodeID, e);
        },
        _mountChildByNameAtIndex: function(e, t, n, r, o) {
            var i = this._rootNodeID + t, s = p.mountComponent(e, i, r, o);
            e._mountIndex = n;
            this.createChild(e, s);
        },
        _unmountChildByName: function(e, t) {
            this.removeChild(e);
            e._mountIndex = null;
        }
    }
};

module.exports = g;
