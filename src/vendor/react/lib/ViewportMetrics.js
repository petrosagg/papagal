"use strict";

var r = {
    currentScrollLeft: 0,
    currentScrollTop: 0,
    refreshScrollValues: function(e) {
        r.currentScrollLeft = e.x;
        r.currentScrollTop = e.y;
    }
};

module.exports = r;
