"use strict";

var r = require("./EventConstants"), o = require("./emptyFunction"), i = r.topLevelTypes, s = {
    eventTypes: null,
    extractEvents: function(e, t, n, r) {
        if (e === i.topTouchStart) {
            var s = r.target;
            if (s && !s.onclick) {
                s.onclick = o
            };
        }
    }
};

module.exports = s;