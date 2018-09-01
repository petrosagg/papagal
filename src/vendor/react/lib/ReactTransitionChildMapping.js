"use strict";

var r = require("./ReactChildren"), o = require("./ReactFragment"), i = {
    getChildMapping: function(e) {
        if (e) {
            return o.extract(r.map(e, function(e) {
                return e;
            }));
        }
        return e;
    },
    mergeChildMappings: function(e, t) {
        function n(n) {
            if (t.hasOwnProperty(n)) {
                return t[n];
            }
            return e[n];
        }
        e = e || {};
        t = t || {};
        var r = {}, o = [];
        for (var i in e) {
            if (t.hasOwnProperty(i)) {
                if (o.length) {
                    r[i] = o;
                    o = [];
                };
            } else {
                o.push(i);
            }
        }
        var s, a = {};
        for (var u in t) {
            if (r.hasOwnProperty(u)) {
                for (s = 0; s < r[u].length; s++) {
                    var l = r[u][s];
                    a[r[u][s]] = n(l);
                }
            }
            a[u] = n(u);
        }
        for (s = 0; s < o.length; s++) {
            a[o[s]] = n(o[s]);
        }
        return a;
    }
};

module.exports = i;
