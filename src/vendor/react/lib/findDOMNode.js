"use strict";

function r(e) {
    if (e == null) {
        return null;
    }
    if (a(e)) {
        return e;
    }
    if (o.has(e)) {
        return i.getNodeFromInstance(e);
    }
    s(e.render == null || typeof e.render != "function");
    return void s(false);
}

var o = (require("./ReactCurrentOwner"), require("./ReactInstanceMap")), i = require("./ReactMount"), s = require("./invariant"), a = require("./isNode");

require("./warning");

module.exports = r;
