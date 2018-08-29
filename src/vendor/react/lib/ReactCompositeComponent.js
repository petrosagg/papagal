"use strict";

function r(e) {
    var t = e._currentElement._owner || null;
    if (t) {
        var n = t.getName();
        if (n) {
            return " Check the render method of `" + n + "`.";
        }
    }
    return "";
}

var o = require("./ReactComponentEnvironment"), i = require("./ReactContext"), s = require("./ReactCurrentOwner"), a = require("./ReactElement"), u = (require("./ReactElementValidator"), 
require("./ReactInstanceMap")), l = require("./ReactLifeCycle"), c = require("./ReactNativeComponent"), p = require("./ReactPerf"), d = require("./ReactPropTypeLocations"), h = (require("./ReactPropTypeLocationNames"), 
require("./ReactReconciler")), f = require("./ReactUpdates"), m = require("./Object.assign"), g = require("./emptyObject"), v = require("./invariant"), b = require("./shouldUpdateReactComponent"), y = (require("./warning"), 
1), _ = {
    construct: function(e) {
        this._currentElement = e;
        this._rootNodeID = null;
        this._instance = null;
        this._pendingElement = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = !1;
        this._pendingForceUpdate = !1;
        this._renderedComponent = null;
        this._context = null;
        this._mountOrder = 0;
        this._isTopLevel = !1;
        this._pendingCallbacks = null;
    },
    mountComponent: function(e, t, n) {
        this._context = n;
        this._mountOrder = y++;
        this._rootNodeID = e;
        var r = this._processProps(this._currentElement.props), o = this._processContext(this._currentElement._context), i = c.getComponentClassForElement(this._currentElement), s = new i(r, o);
        s.props = r;
        s.context = o;
        s.refs = g;
        this._instance = s;
        u.set(s, this);
        var a = s.state;
        if (a === void 0) {
            s.state = a = null
        };
        v(typeof a == "object" && !Array.isArray(a));
        this._pendingStateQueue = null;
        this._pendingReplaceState = !1;
        this._pendingForceUpdate = !1;
        var p, d, f = l.currentlyMountingInstance;
        l.currentlyMountingInstance = this;
        try {
            if (s.componentWillMount) {
                s.componentWillMount(), this._pendingStateQueue && (s.state = this._processPendingState(s.props, s.context))
            };
            p = this._getValidatedChildContext(n);
            d = this._renderValidatedComponent(p);
        } finally {
            l.currentlyMountingInstance = f;
        }
        this._renderedComponent = this._instantiateReactComponent(d, this._currentElement.type);
        var m = h.mountComponent(this._renderedComponent, e, t, this._mergeChildContext(n, p));
        if (s.componentDidMount) {
            t.getReactMountReady().enqueue(s.componentDidMount, s)
        };
        return m;
    },
    unmountComponent: function() {
        var e = this._instance;
        if (e.componentWillUnmount) {
            var t = l.currentlyUnmountingInstance;
            l.currentlyUnmountingInstance = this;
            try {
                e.componentWillUnmount();
            } finally {
                l.currentlyUnmountingInstance = t;
            }
        }
        h.unmountComponent(this._renderedComponent);
        this._renderedComponent = null;
        this._pendingStateQueue = null;
        this._pendingReplaceState = !1;
        this._pendingForceUpdate = !1;
        this._pendingCallbacks = null;
        this._pendingElement = null;
        this._context = null;
        this._rootNodeID = null;
        u.remove(e);
    },
    _setPropsInternal: function(e, t) {
        var n = this._pendingElement || this._currentElement;
        this._pendingElement = a.cloneAndReplaceProps(n, m({}, n.props, e));
        f.enqueueUpdate(this, t);
    },
    _maskContext: function(e) {
        var t = null;
        if (typeof this._currentElement.type == "string") {
            return g;
        }
        var n = this._currentElement.type.contextTypes;
        if (!n) {
            return g;
        }
        t = {};
        for (var r in n) {
            t[r] = e[r];
        }
        return t;
    },
    _processContext: function(e) {
        var t = this._maskContext(e);
        return t;
    },
    _getValidatedChildContext: function(e) {
        var t = this._instance, n = t.getChildContext && t.getChildContext();
        if (n) {
            v(typeof t.constructor.childContextTypes == "object");
            for (var r in n) {
                v(r in t.constructor.childContextTypes);
            }
            return n;
        }
        return null;
    },
    _mergeChildContext: function(e, t) {
        if (t) {
            return m({}, e, t);
        }
        return e;
    },
    _processProps: function(e) {
        return e;
    },
    _checkPropTypes: function(e, t, n) {
        var o = this.getName();
        for (var i in e) {
            if (e.hasOwnProperty(i)) {
                var s;
                try {
                    v(typeof e[i] == "function");
                    s = e[i](t, i, o, n);
                } catch (a) {
                    s = a;
                }
                if (s instanceof Error) {
                    r(this);
                    n === d.prop;
                }
            }
        }
    },
    receiveComponent: function(e, t, n) {
        var r = this._currentElement, o = this._context;
        this._pendingElement = null;
        this.updateComponent(t, r, e, o, n);
    },
    performUpdateIfNecessary: function(e) {
        if (this._pendingElement != null) {
            h.receiveComponent(this, this._pendingElement || this._currentElement, e, this._context)
        };
        if (null !== this._pendingStateQueue || this._pendingForceUpdate) {
            this.updateComponent(e, this._currentElement, this._currentElement, this._context, this._context)
        };
    },
    _warnIfContextsDiffer: function(e, t) {
        e = this._maskContext(e);
        t = this._maskContext(t);
        for (var n = Object.keys(t).sort(), r = (this.getName() || "ReactCompositeComponent", 
        0); r < n.length; r++) {
            n[r];
        }
    },
    updateComponent: function(e, t, n, r, o) {
        var i = this._instance, s = i.context, a = i.props;
        if (t !== n) {
            s = this._processContext(n._context), a = this._processProps(n.props), i.componentWillReceiveProps && i.componentWillReceiveProps(a, s)
        };
        var u = this._processPendingState(a, s), l = this._pendingForceUpdate || !i.shouldComponentUpdate || i.shouldComponentUpdate(a, u, s);
        if (l) {
            this._pendingForceUpdate = !1;
            this._performComponentUpdate(n, a, u, s, e, o);
        } else {
            this._currentElement = n;
            this._context = o;
            i.props = a;
            i.state = u;
            i.context = s;
        }
    },
    _processPendingState: function(e, t) {
        var n = this._instance, r = this._pendingStateQueue, o = this._pendingReplaceState;
        this._pendingReplaceState = !1;
        this._pendingStateQueue = null;
        if (!r) {
            return n.state;
        }
        if (o && r.length === 1) {
            return r[0];
        }
        for (var i = m({}, o ? r[0] : n.state), s = o ? 1 : 0; s < r.length; s++) {
            var a = r[s];
            m(i, typeof a == "function" ? a.call(n, i, e, t) : a);
        }
        return i;
    },
    _performComponentUpdate: function(e, t, n, r, o, i) {
        var s = this._instance, a = s.props, u = s.state, l = s.context;
        if (s.componentWillUpdate) {
            s.componentWillUpdate(t, n, r)
        };
        this._currentElement = e;
        this._context = i;
        s.props = t;
        s.state = n;
        s.context = r;
        this._updateRenderedComponent(o, i);
        if (s.componentDidUpdate) {
            o.getReactMountReady().enqueue(s.componentDidUpdate.bind(s, a, u, l), s)
        };
    },
    _updateRenderedComponent: function(e, t) {
        var n = this._renderedComponent, r = n._currentElement, o = this._getValidatedChildContext(), i = this._renderValidatedComponent(o);
        if (b(r, i)) {
            h.receiveComponent(n, i, e, this._mergeChildContext(t, o));
        } else {
            var s = this._rootNodeID, a = n._rootNodeID;
            h.unmountComponent(n);
            this._renderedComponent = this._instantiateReactComponent(i, this._currentElement.type);
            var u = h.mountComponent(this._renderedComponent, s, e, this._mergeChildContext(t, o));
            this._replaceNodeWithMarkupByID(a, u);
        }
    },
    _replaceNodeWithMarkupByID: function(e, t) {
        o.replaceNodeWithMarkupByID(e, t);
    },
    _renderValidatedComponentWithoutOwnerOrContext: function() {
        var e = this._instance, t = e.render();
        return t;
    },
    _renderValidatedComponent: function(e) {
        var t, n = i.current;
        i.current = this._mergeChildContext(this._currentElement._context, e);
        s.current = this;
        try {
            t = this._renderValidatedComponentWithoutOwnerOrContext();
        } finally {
            i.current = n, s.current = null;
        }
        v(t === null || t === !1 || a.isValidElement(t));
        return t;
    },
    attachRef: function(e, t) {
        var n = this.getPublicInstance(), r = n.refs === g ? n.refs = {} : n.refs;
        r[e] = t.getPublicInstance();
    },
    detachRef: function(e) {
        var t = this.getPublicInstance().refs;
        delete t[e];
    },
    getName: function() {
        var e = this._currentElement.type, t = this._instance && this._instance.constructor;
        return e.displayName || t && t.displayName || e.name || t && t.name || null;
    },
    getPublicInstance: function() {
        return this._instance;
    },
    _instantiateReactComponent: null
};

p.measureMethods(_, "ReactCompositeComponent", {
    mountComponent: "mountComponent",
    updateComponent: "updateComponent",
    _renderValidatedComponent: "_renderValidatedComponent"
});

var w = {
    Mixin: _
};

module.exports = w;
