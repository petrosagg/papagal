var r = require("./tests"), o = {
    _version: "__VERSION__",
    _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
    },
    _q: [],
    on: function(e, t) {
        var n = this;
        setTimeout(function() {
            t(n[e]);
        }, 0);
    },
    addTest: function(e, t, n) {
        r.push({
            name: e,
            fn: t,
            options: n
        });
    },
    addAsyncTest: function(e) {
        r.push({
            name: null,
            fn: e
        });
    }
};

module.exports = o;
