"use strict";

function r(e, t, n) {
    return n;
}

var o = {
    enableMeasure: false,
    storedMeasure: r,
    measureMethods: function(e, t, n) {},
    measure: function(e, t, n) {
        return n;
    },
    injection: {
        injectMeasure: function(e) {
            o.storedMeasure = e;
        }
    }
};

module.exports = o;
