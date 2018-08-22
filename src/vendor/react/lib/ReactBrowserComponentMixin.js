"use strict";

var r = require("./findDOMNode"), o = {
    getDOMNode: function() {
        return r(this);
    }
};

module.exports = o;