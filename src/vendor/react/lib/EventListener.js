var r = require("./emptyFunction"), o = {
    listen: function(e, t, n) {
        if (e.addEventListener) {
            e.addEventListener(t, n, false);
            return {
                remove: function() {
                    e.removeEventListener(t, n, false);
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
            e.addEventListener(t, n, true);
            return {
                remove: function() {
                    e.removeEventListener(t, n, true);
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
