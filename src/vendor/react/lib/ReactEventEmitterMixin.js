"use strict";

function r(e) {
    o.enqueueEvents(e);
    o.processEventQueue();
}

var o = require("./EventPluginHub"), i = {
    handleTopLevel: function(e, t, n, i) {
        var s = o.extractEvents(e, t, n, i);
        r(s);
    }
};

module.exports = i;
