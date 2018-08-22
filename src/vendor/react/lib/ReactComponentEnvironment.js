"use strict";

var r = require("./invariant"), o = !1, i = {
    unmountIDFromEnvironment: null,
    replaceNodeWithMarkupByID: null,
    processChildrenUpdates: null,
    injection: {
        injectEnvironment: function(e) {
            r(!o);
            i.unmountIDFromEnvironment = e.unmountIDFromEnvironment;
            i.replaceNodeWithMarkupByID = e.replaceNodeWithMarkupByID;
            i.processChildrenUpdates = e.processChildrenUpdates;
            o = !0;
        }
    }
};

module.exports = i;
