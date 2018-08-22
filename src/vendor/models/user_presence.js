var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = require("backbone").Model;

o = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    i(t, e);
    t.STATES = {
        0: "offline",
        1e6: "idle",
        2e6: "active"
    };
    t.OFFLINE = 0;
    t.IDLE = 1e6;
    t.CONNECTED = 2e6;
    t.prototype.state = function() {
        return t.STATES[this.get("state") || 0];
    };
    return t;
}(r);

module.exports = o;