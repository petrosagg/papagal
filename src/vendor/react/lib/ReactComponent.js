"use strict";

function r(e, t) {
    this.props = e;
    this.context = t;
}

var o = require("./ReactUpdateQueue"), i = require("./invariant");

require("./warning");

r.prototype.setState = function(e, t) {
    i(typeof e == "object" || typeof e == "function" || e == null);
    o.enqueueSetState(this, e);
    if (t) {
        o.enqueueCallback(this, t)
    };
};

r.prototype.forceUpdate = function(e) {
    o.enqueueForceUpdate(this);
    if (e) {
        o.enqueueCallback(this, e)
    };
};

module.exports = r;