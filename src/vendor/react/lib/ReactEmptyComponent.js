"use strict";

function r(e) {
    c[e] = true;
}

function o(e) {
    delete c[e];
}

function i(e) {
    return !!c[e];
}

var s, a = require("./ReactElement"), u = require("./ReactInstanceMap"), l = require("./invariant"), c = {}, p = {
    injectEmptyComponent: function(e) {
        s = a.createFactory(e);
    }
}, d = function() {};

d.prototype.componentDidMount = function() {
    var e = u.get(this);
    if (e) {
        r(e._rootNodeID)
    };
};

d.prototype.componentWillUnmount = function() {
    var e = u.get(this);
    if (e) {
        o(e._rootNodeID)
    };
};

d.prototype.render = function() {
    l(s);
    return s();
};

var h = a.createElement(d), f = {
    emptyElement: h,
    injection: p,
    isNullComponentID: i
};

module.exports = f;
