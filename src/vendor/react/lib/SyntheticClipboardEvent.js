"use strict";

function r(e, t, n) {
    o.call(this, e, t, n);
}

var o = require("./SyntheticEvent"), i = {
    clipboardData: function(e) {
        if ("clipboardData" in e) {
            return e.clipboardData;
        }
        return window.clipboardData;
    }
};

o.augmentClass(r, i);

module.exports = r;
