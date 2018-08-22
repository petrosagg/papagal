"use strict";

var r = require("./adler32"), o = {
    CHECKSUM_ATTR_NAME: "data-react-checksum",
    addChecksumToMarkup: function(e) {
        var t = r(e);
        return e.replace(">", " " + o.CHECKSUM_ATTR_NAME + '="' + t + '">');
    },
    canReuseMarkup: function(e, t) {
        var n = t.getAttribute(o.CHECKSUM_ATTR_NAME);
        n = n && parseInt(n, 10);
        var i = r(e);
        return i === n;
    }
};

module.exports = o;
