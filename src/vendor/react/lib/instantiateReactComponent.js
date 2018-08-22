"use strict";

function r(e) {
    return typeof e == "function" && typeof e.prototype != "undefined" && typeof e.prototype.mountComponent == "function" && typeof e.prototype.receiveComponent == "function";
}

function o(e, t) {
    var n;
    if (e === null || e === !1) {
        e = s.emptyElement
    }
    if (typeof e == "object") {
        var o = e;
        n = t === o.type && typeof o.type == "string" ? a.createInternalComponent(o) : r(o.type) ? new o.type(o) : new c();
    } else typeof e == "string" || typeof e == "number" ? n = a.createInstanceForText(e) : l(!1);
    n.construct(e);
    n._mountIndex = 0;
    n._mountImage = null;
    return n;
}

var i = require("./ReactCompositeComponent"), s = require("./ReactEmptyComponent"), a = require("./ReactNativeComponent"), u = require("./Object.assign"), l = require("./invariant"), c = (require("./warning"), 
function() {});

u(c.prototype, i.Mixin, {
    _instantiateReactComponent: o
});

module.exports = o;