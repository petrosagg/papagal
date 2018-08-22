var r = require("./emptyFunction"), o = {
    listen: function(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, !1);
            return {
                remove: function() {
                    e.removeEventListener(t, n, !1);
                }
            };
        }
        if (e.attachEvent) {
            e.attachEvent("on" + t, n);
            return {
                remove: function() {
                    e.detachEvent("on" + t, n);
                }
            };
        }
        return;
    },
    capture: function(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, !0);
            return {
                remove: function() {
                    e.removeEventListener(t, n, !0);
                }
            };
        }
        return {
            remove: r
        };
    },
    registerDefault: function() {}
};

module.exports = o;