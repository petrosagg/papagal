"use strict";

function r(e) {
    if (e !== i.currentlyMountingInstance) {
        l.enqueueUpdate(e)
    };
}

function o(e, t) {
    p(s.current == null);
    var n = u.get(e);
    if (n) {
        if (n === i.currentlyUnmountingInstance) {
            return null;
        }
        return n;
    }
    return null;
}

var i = require("./ReactLifeCycle"), s = require("./ReactCurrentOwner"), a = require("./ReactElement"), u = require("./ReactInstanceMap"), l = require("./ReactUpdates"), c = require("./Object.assign"), p = require("./invariant"), d = (require("./warning"), 
{
    enqueueCallback: function(e, t) {
        p(typeof t == "function");
        var n = o(e);
        if (n && n !== i.currentlyMountingInstance) {
            n._pendingCallbacks ? n._pendingCallbacks.push(t) : n._pendingCallbacks = [ t ];
            return void r(n);
        }
        return null;
    },
    enqueueCallbackInternal: function(e, t) {
        p(typeof t == "function");
        e._pendingCallbacks ? e._pendingCallbacks.push(t) : e._pendingCallbacks = [ t ];
        r(e);
    },
    enqueueForceUpdate: function(e) {
        var t = o(e, "forceUpdate");
        if (t) {
            t._pendingForceUpdate = !0, r(t)
        };
    },
    enqueueReplaceState: function(e, t) {
        var n = o(e, "replaceState");
        if (n) {
            n._pendingStateQueue = [ t ], n._pendingReplaceState = !0, r(n)
        };
    },
    enqueueSetState: function(e, t) {
        var n = o(e, "setState");
        if (n) {
            var i = n._pendingStateQueue || (n._pendingStateQueue = []);
            i.push(t);
            r(n);
        }
    },
    enqueueSetProps: function(e, t) {
        var n = o(e, "setProps");
        if (n) {
            p(n._isTopLevel);
            var i = n._pendingElement || n._currentElement, s = c({}, i.props, t);
            n._pendingElement = a.cloneAndReplaceProps(i, s);
            r(n);
        }
    },
    enqueueReplaceProps: function(e, t) {
        var n = o(e, "replaceProps");
        if (n) {
            p(n._isTopLevel);
            var i = n._pendingElement || n._currentElement;
            n._pendingElement = a.cloneAndReplaceProps(i, t);
            r(n);
        }
    },
    enqueueElementInternal: function(e, t) {
        e._pendingElement = t;
        r(e);
    }
});

module.exports = d;
