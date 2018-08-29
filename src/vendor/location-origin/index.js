(function() {
    "use strict";
    var e, t;
    e = window.location;
    if (!e.origin) {
        t = e.protocol + "//" + e.hostname + (e.port ? ":" + e.port : "");
        try {
            Object.defineProperty(e, "origin", {
                value: t,
                enumerable: true
            });
        } catch (n) {
            e.origin = t;
        }
    }
}).call(this);
