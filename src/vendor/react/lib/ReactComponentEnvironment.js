"use strict";

var r = require("./invariant"), o = false, i = {
    unmountIDFromEnvironment: null,
    replaceNodeWithMarkupByID: null,
    processChildrenUpdates: null,
    injection: {
        injectEnvironment: function(e) {
            r(!o);
            i.unmountIDFromEnvironment = e.unmountIDFromEnvironment;
            i.replaceNodeWithMarkupByID = e.replaceNodeWithMarkupByID;
            i.processChildrenUpdates = e.processChildrenUpdates;
            o = true;
        }
    }
};

module.exports = i;
