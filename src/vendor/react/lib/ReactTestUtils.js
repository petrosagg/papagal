"use strict";

function r(e) {}

function o(e) {
    return function(t, n) {
        var o;
        if (x.isDOMComponent(t)) {
            o = t.getDOMNode();
        } else {
            if (t.tagName) {
                o = t
            };
        }
        var i = new r();
        i.target = o;
        var s = new y(h.eventNameDispatchConfigs[e], v.getID(o), i);
        _(s, n);
        l.accumulateTwoPhaseDispatches(s);
        b.batchedUpdates(function() {
            u.enqueueEvents(s);
            u.processEventQueue();
        });
    };
}

function i() {
    x.Simulate = {};
    var e;
    for (e in h.eventNameDispatchConfigs) {
        x.Simulate[e] = o(e);
    }
}

function s(e) {
    return function(t, n) {
        var o = new r(e);
        _(o, n);
        if (x.isDOMComponent(t)) {
            x.simulateNativeEventOnDOMComponent(e, t, o);
        } else {
            if (t.tagName) {
                x.simulateNativeEventOnNode(e, t, o)
            };
        }
    };
}

var a = require("./EventConstants"), u = require("./EventPluginHub"), l = require("./EventPropagators"), c = require("./React"), p = require("./ReactElement"), d = require("./ReactEmptyComponent"), h = require("./ReactBrowserEventEmitter"), f = require("./ReactCompositeComponent"), m = require("./ReactInstanceHandles"), g = require("./ReactInstanceMap"), v = require("./ReactMount"), b = require("./ReactUpdates"), y = require("./SyntheticEvent"), _ = require("./Object.assign"), w = require("./emptyObject"), k = a.topLevelTypes, x = {
    renderIntoDocument: function(e) {
        var t = document.createElement("div");
        return c.render(e, t);
    },
    isElement: function(e) {
        return p.isValidElement(e);
    },
    isElementOfType: function(e, t) {
        return p.isValidElement(e) && e.type === t;
    },
    isDOMComponent: function(e) {
        return !!(e && e.tagName && e.getDOMNode);
    },
    isDOMComponentElement: function(e) {
        return !!(e && p.isValidElement(e) && e.tagName);
    },
    isCompositeComponent: function(e) {
        return typeof e.render == "function" && typeof e.setState == "function";
    },
    isCompositeComponentWithType: function(e, t) {
        return !(!x.isCompositeComponent(e) || e.constructor !== t);
    },
    isCompositeComponentElement: function(e) {
        if (!p.isValidElement(e)) {
            return false;
        }
        var t = e.type.prototype;
        return typeof t.render == "function" && typeof t.setState == "function";
    },
    isCompositeComponentElementWithType: function(e, t) {
        return !(!x.isCompositeComponentElement(e) || e.constructor !== t);
    },
    getRenderedChildOfCompositeComponent: function(e) {
        if (!x.isCompositeComponent(e)) {
            return null;
        }
        var t = g.get(e);
        return t._renderedComponent.getPublicInstance();
    },
    findAllInRenderedTree: function(e, t) {
        if (!e) {
            return [];
        }
        var n = t(e) ? [ e ] : [];
        if (x.isDOMComponent(e)) {
            var r, o = g.get(e), i = o._renderedComponent._renderedChildren;
            for (r in i) {
                if (i.hasOwnProperty(r) && i[r].getPublicInstance) {
                    n = n.concat(x.findAllInRenderedTree(i[r].getPublicInstance(), t))
                };
            }
        } else {
            if (x.isCompositeComponent(e)) {
                n = n.concat(x.findAllInRenderedTree(x.getRenderedChildOfCompositeComponent(e), t))
            };
        }
        return n;
    },
    scryRenderedDOMComponentsWithClass: function(e, t) {
        return x.findAllInRenderedTree(e, function(e) {
            var n = e.props.className;
            return x.isDOMComponent(e) && n && (" " + n + " ").indexOf(" " + t + " ") !== -1;
        });
    },
    findRenderedDOMComponentWithClass: function(e, t) {
        var n = x.scryRenderedDOMComponentsWithClass(e, t);
        if (n.length !== 1) {
            throw new Error("Did not find exactly one match (found: " + n.length + ") for class:" + t);
        }
        return n[0];
    },
    scryRenderedDOMComponentsWithTag: function(e, t) {
        return x.findAllInRenderedTree(e, function(e) {
            return x.isDOMComponent(e) && e.tagName === t.toUpperCase();
        });
    },
    findRenderedDOMComponentWithTag: function(e, t) {
        var n = x.scryRenderedDOMComponentsWithTag(e, t);
        if (n.length !== 1) {
            throw new Error("Did not find exactly one match for tag:" + t);
        }
        return n[0];
    },
    scryRenderedComponentsWithType: function(e, t) {
        return x.findAllInRenderedTree(e, function(e) {
            return x.isCompositeComponentWithType(e, t);
        });
    },
    findRenderedComponentWithType: function(e, t) {
        var n = x.scryRenderedComponentsWithType(e, t);
        if (n.length !== 1) {
            throw new Error("Did not find exactly one match for componentType:" + t);
        }
        return n[0];
    },
    mockComponent: function(e, t) {
        t = t || e.mockTagName || "div";
        e.prototype.render.mockImplementation(function() {
            return c.createElement(t, null, this.props.children);
        });
        return this;
    },
    simulateNativeEventOnNode: function(e, t, n) {
        n.target = t;
        h.ReactEventListener.dispatchEvent(e, n);
    },
    simulateNativeEventOnDOMComponent: function(e, t, n) {
        x.simulateNativeEventOnNode(e, t.getDOMNode(), n);
    },
    nativeTouchData: function(e, t) {
        return {
            touches: [ {
                pageX: e,
                pageY: t
            } ]
        };
    },
    createRenderer: function() {
        return new C();
    },
    Simulate: null,
    SimulateNative: {}
}, C = function() {
    this._instance = null;
};

C.prototype.getRenderOutput = function() {
    return this._instance && this._instance._renderedComponent && this._instance._renderedComponent._renderedOutput || null;
};

var E = function(e) {
    this._renderedOutput = e;
    if (e === null || e === false) {
        this._currentElement = d.emptyElement;
    } else {
        this._currentElement = e;
    }
};

E.prototype = {
    mountComponent: function() {},
    receiveComponent: function(e) {
        this._renderedOutput = e;
        if (e === null || e === false) {
            this._currentElement = d.emptyElement;
        } else {
            this._currentElement = e;
        }
    },
    unmountComponent: function() {}
};

var T = function() {};

_(T.prototype, f.Mixin, {
    _instantiateReactComponent: function(e) {
        return new E(e);
    },
    _replaceNodeWithMarkupByID: function() {},
    _renderValidatedComponent: f.Mixin._renderValidatedComponentWithoutOwnerOrContext
});

C.prototype.render = function(e, t) {
    if (!t) {
        t = w
    };
    var n = b.ReactReconcileTransaction.getPooled();
    this._render(e, n, t);
    b.ReactReconcileTransaction.release(n);
};

C.prototype.unmount = function() {
    if (this._instance) {
        this._instance.unmountComponent()
    };
};

C.prototype._render = function(e, t, n) {
    if (this._instance) {
        this._instance.receiveComponent(e, t, n);
    } else {
        var r = m.createReactRootID(), o = new T(e.type);
        o.construct(e);
        o.mountComponent(r, t, n);
        this._instance = o;
    }
};

var S = u.injection.injectEventPluginOrder;

u.injection.injectEventPluginOrder = function() {
    S.apply(this, arguments);
    i();
};

var D = u.injection.injectEventPluginsByName;

u.injection.injectEventPluginsByName = function() {
    D.apply(this, arguments);
    i();
};

i();

var A;

for (A in k) {
    var M = A.indexOf("top") === 0 ? A.charAt(3).toLowerCase() + A.substr(4) : A;
    x.SimulateNative[M] = s(A);
}

module.exports = x;
