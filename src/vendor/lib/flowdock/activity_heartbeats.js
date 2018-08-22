var r, o;

o = require("models/user_presence");

r = function() {
    function e(e, t, n, r) {
        this.flows = r;
        this.connection = t;
        this.lastFlowActivity = {};
        this.userEvents = e;
    }
    e.ACTIVITY_HEARTBEAT_INTERVAL = 12e4;
    e.ACTIVITY_IDLE_TIMEOUT = 6e4;
    e.prototype.start = function() {
        this.stop();
        return this.stopPresence = this.setupPresence();
    };
    e.prototype.stop = function() {
        if (typeof this.stopPresence == "function") {
            this.stopPresence()
        };
        return this.stopPresence = null;
    };
    e.prototype.setupPresence = function() {
        return this.userEvents.toProperty(o.CONNECTED).flatMapLatest(function() {
            return Bacon.once(o.CONNECTED).merge(Bacon.later(e.ACTIVITY_IDLE_TIMEOUT, o.IDLE));
        }).skipDuplicates().onValue(function(e) {
            return function(t) {
                return e.connection.sendStream.push({
                    event: "presence-update",
                    content: {
                        state: t
                    },
                    persist: !1
                });
            };
        }(this));
    };
    return e;
}();

module.exports = r;
