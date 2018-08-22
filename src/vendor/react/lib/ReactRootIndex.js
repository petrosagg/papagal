"use strict";

var r = {
    injectCreateReactRootIndex: function(e) {
        o.createReactRootIndex = e;
    }
}, o = {
    createReactRootIndex: null,
    injection: r
};

module.exports = o;