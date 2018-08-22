"use strict";

var r = require("./Object.assign"), o = require("./emptyObject"), i = (require("./warning"), 
{
    current: o,
    withContext: function(e, t) {
        var n, o = i.current;
        i.current = r({}, o, e);
        try {
            n = t();
        } finally {
            i.current = o;
        }
        return n;
    }
});

module.exports = i;
