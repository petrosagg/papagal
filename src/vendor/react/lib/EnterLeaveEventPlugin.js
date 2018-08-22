"use strict";

var r = require("./EventConstants"), o = require("./EventPropagators"), i = require("./SyntheticMouseEvent"), s = require("./ReactMount"), a = require("./keyOf"), u = r.topLevelTypes, l = s.getFirstReactDOM, c = {
    mouseEnter: {
        registrationName: a({
            onMouseEnter: null
        }),
        dependencies: [ u.topMouseOut, u.topMouseOver ]
    },
    mouseLeave: {
        registrationName: a({
            onMouseLeave: null
        }),
        dependencies: [ u.topMouseOut, u.topMouseOver ]
    }
}, p = [ null, null ], d = {
    eventTypes: c,
    extractEvents: function(e, t, n, r) {
        if (e === u.topMouseOver && (r.relatedTarget || r.fromElement)) {
            return null;
        }
        if (e !== u.topMouseOut && e !== u.topMouseOver) {
            return null;
        }
        var a;
        if (t.window === t) {
            a = t;
        } else {
            var d = t.ownerDocument;
            a = d ? d.defaultView || d.parentWindow : window;
        }
        var h, f;
        e === u.topMouseOut ? (h = t, f = l(r.relatedTarget || r.toElement) || a) : (h = a, 
        f = t);
        if (h === f) {
            return null;
        }
        var m = h ? s.getID(h) : "", g = f ? s.getID(f) : "", v = i.getPooled(c.mouseLeave, m, r);
        v.type = "mouseleave";
        v.target = h;
        v.relatedTarget = f;
        var b = i.getPooled(c.mouseEnter, g, r);
        b.type = "mouseenter";
        b.target = f;
        b.relatedTarget = h;
        o.accumulateEnterLeaveDispatches(v, b, m, g);
        p[0] = v;
        p[1] = b;
        return p;
    }
};

module.exports = d;
