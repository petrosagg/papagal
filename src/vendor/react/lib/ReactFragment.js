"use strict";

var r = (require("./ReactElement"), require("./warning"), {
    create: function(e) {
        return e;
    },
    extract: function(e) {
        return e;
    },
    extractIfFragment: function(e) {
        return e;
    }
});

module.exports = r;
