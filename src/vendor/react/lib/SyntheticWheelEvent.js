"use strict";

function r(e, t, n) {
    o.call(this, e, t, n);
}

var o = require("./SyntheticMouseEvent"), i = {
    deltaX: function(e) {
        if ("deltaX" in e) {
            return e.deltaX;
        }
        if ("wheelDeltaX" in e) {
            return -e.wheelDeltaX;
        }
        return 0;
    },
    deltaY: function(e) {
        if ("deltaY" in e) {
            return e.deltaY;
        }
        if ("wheelDeltaY" in e) {
            return -e.wheelDeltaY;
        }
        if ("wheelDelta" in e) {
            return -e.wheelDelta;
        }
        return 0;
    },
    deltaZ: null,
    deltaMode: null
};

o.augmentClass(r, i);

module.exports = r;
