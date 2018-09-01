"use strict";

function r(e, t) {
    var n = C.hasOwnProperty(t) ? C[t] : null;
    if (T.hasOwnProperty(t)) {
        b(n === k.OVERRIDE_BASE)
    };
    if (e.hasOwnProperty(t)) {
        b(n === k.DEFINE_MANY || n === k.DEFINE_MANY_MERGED)
    };
}

function o(e, t) {
    if (t) {
        b(typeof t != "function");
        b(!d.isValidElement(t));
        var n = e.prototype;
        if (t.hasOwnProperty(w)) {
            E.mixins(e, t.mixins)
        };
        for (var o in t) {
            if (t.hasOwnProperty(o) && o !== w) {
                var i = t[o];
                r(n, o);
                if (E.hasOwnProperty(o)) {
                    E[o](e, i);
                } else {
                    var s = C.hasOwnProperty(o), l = n.hasOwnProperty(o), c = i && i.__reactDontBind, p = typeof i == "function", h = p && !s && !l && !c;
                    if (h) {
                        if (!n.__reactAutoBindMap) {
                            n.__reactAutoBindMap = {}
                        };
                        n.__reactAutoBindMap[o] = i;
                        n[o] = i;
                    } else if (l) {
                        var f = C[o];
                        b(s && (f === k.DEFINE_MANY_MERGED || f === k.DEFINE_MANY));
                        if (f === k.DEFINE_MANY_MERGED) {
                            n[o] = a(n[o], i);
                        } else {
                            if (f === k.DEFINE_MANY) {
                                n[o] = u(n[o], i)
                            };
                        }
                    } else {
                        n[o] = i;
                    }
                }
            }
        }
    }
}

function i(e, t) {
    if (t) {
        for (var n in t) {
            var r = t[n];
            if (t.hasOwnProperty(n)) {
                var o = n in E;
                b(!o);
                var i = n in e;
                b(!i);
                e[n] = r;
            }
        }
    }
}

function s(e, t) {
    b(e && t && typeof e == "object" && typeof t == "object");
    for (var n in t) {
        if (t.hasOwnProperty(n)) {
            b(e[n] === undefined), e[n] = t[n]
        };
    }
    return e;
}

function a(e, t) {
    return function() {
        var n = e.apply(this, arguments), r = t.apply(this, arguments);
        if (n == null) {
            return r;
        }
        if (r == null) {
            return n;
        }
        var o = {};
        s(o, n);
        s(o, r);
        return o;
    };
}

function u(e, t) {
    return function() {
        e.apply(this, arguments);
        t.apply(this, arguments);
    };
}

function l(e, t) {
    var n = t.bind(e);
    return n;
}

function c(e) {
    for (var t in e.__reactAutoBindMap) {
        if (e.__reactAutoBindMap.hasOwnProperty(t)) {
            var n = e.__reactAutoBindMap[t];
            e[t] = l(e, h.guard(n, e.constructor.displayName + "." + t));
        }
    }
}

var p = require("./ReactComponent"), d = (require("./ReactCurrentOwner"), require("./ReactElement")), h = require("./ReactErrorUtils"), f = require("./ReactInstanceMap"), m = require("./ReactLifeCycle"), g = (require("./ReactPropTypeLocations"), 
require("./ReactPropTypeLocationNames"), require("./ReactUpdateQueue")), v = require("./Object.assign"), b = require("./invariant"), y = require("./keyMirror"), _ = require("./keyOf"), w = (require("./warning"), 
_({
    mixins: null
})), k = y({
    DEFINE_ONCE: null,
    DEFINE_MANY: null,
    OVERRIDE_BASE: null,
    DEFINE_MANY_MERGED: null
}), x = [], C = {
    mixins: k.DEFINE_MANY,
    statics: k.DEFINE_MANY,
    propTypes: k.DEFINE_MANY,
    contextTypes: k.DEFINE_MANY,
    childContextTypes: k.DEFINE_MANY,
    getDefaultProps: k.DEFINE_MANY_MERGED,
    getInitialState: k.DEFINE_MANY_MERGED,
    getChildContext: k.DEFINE_MANY_MERGED,
    render: k.DEFINE_ONCE,
    componentWillMount: k.DEFINE_MANY,
    componentDidMount: k.DEFINE_MANY,
    componentWillReceiveProps: k.DEFINE_MANY,
    shouldComponentUpdate: k.DEFINE_ONCE,
    componentWillUpdate: k.DEFINE_MANY,
    componentDidUpdate: k.DEFINE_MANY,
    componentWillUnmount: k.DEFINE_MANY,
    updateComponent: k.OVERRIDE_BASE
}, E = {
    displayName: function(e, t) {
        e.displayName = t;
    },
    mixins: function(e, t) {
        if (t) {
            for (var n = 0; n < t.length; n++) {
                o(e, t[n]);
            }
        }
    },
    childContextTypes: function(e, t) {
        e.childContextTypes = v({}, e.childContextTypes, t);
    },
    contextTypes: function(e, t) {
        e.contextTypes = v({}, e.contextTypes, t);
    },
    getDefaultProps: function(e, t) {
        if (e.getDefaultProps) {
            e.getDefaultProps = a(e.getDefaultProps, t);
        } else {
            e.getDefaultProps = t;
        }
    },
    propTypes: function(e, t) {
        e.propTypes = v({}, e.propTypes, t);
    },
    statics: function(e, t) {
        i(e, t);
    }
}, T = {
    replaceState: function(e, t) {
        g.enqueueReplaceState(this, e);
        if (t) {
            g.enqueueCallback(this, t)
        };
    },
    isMounted: function() {
        var e = f.get(this);
        return e && e !== m.currentlyMountingInstance;
    },
    setProps: function(e, t) {
        g.enqueueSetProps(this, e);
        if (t) {
            g.enqueueCallback(this, t)
        };
    },
    replaceProps: function(e, t) {
        g.enqueueReplaceProps(this, e);
        if (t) {
            g.enqueueCallback(this, t)
        };
    }
}, S = function() {};

v(S.prototype, p.prototype, T);

var D = {
    createClass: function(e) {
        var t = function(e, t) {
            if (this.__reactAutoBindMap) {
                c(this)
            };
            this.props = e;
            this.context = t;
            this.state = null;
            var n = this.getInitialState ? this.getInitialState() : null;
            b(typeof n == "object" && !Array.isArray(n));
            this.state = n;
        };
        t.prototype = new S();
        t.prototype.constructor = t;
        x.forEach(o.bind(null, t));
        o(t, e);
        if (t.getDefaultProps) {
            t.defaultProps = t.getDefaultProps()
        };
        b(t.prototype.render);
        for (var n in C) {
            if (!t.prototype[n]) {
                t.prototype[n] = null
            };
        }
        t.type = t;
        return t;
    },
    injection: {
        injectMixin: function(e) {
            x.push(e);
        }
    }
};

module.exports = D;
