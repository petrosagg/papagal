"use strict";

var r = Math.pow(2, 53), o = {
    createReactRootIndex: function() {
        return Math.ceil(Math.random() * r);
    }
};

module.exports = o;