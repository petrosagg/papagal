"use strict";

var r = require("./ReactDOMIDOperations"), o = require("./ReactMount"), i = {
    processChildrenUpdates: r.dangerouslyProcessChildrenUpdates,
    replaceNodeWithMarkupByID: r.dangerouslyReplaceNodeWithMarkupByID,
    unmountIDFromEnvironment: function(e) {
        o.purgeID(e);
    }
};

module.exports = i;
