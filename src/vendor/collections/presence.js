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

o = require("models/user_presence");

r = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    i(t, e);
    t.prototype.model = o;
    t.prototype.consume = function(e) {
        return this.addStream(e.onValue(function(e) {
            return function(t) {
                if (t.event === "presence") {
                    return e.add({
                        id: t.content.user_id,
                        state: t.content.state,
                        updated_at: t.content.updated_at
                    }, {
                        merge: !0
                    });
                }
                return;
            };
        }(this)));
    };
    t.prototype.stateOf = function(e) {
        var t;
        return ((t = this.get(e)) != null ? t.state() : void 0) || "offline";
    };
    t.prototype.user = function(e) {
        return this.get(e) || this.add({
            id: e,
            state: 0,
            updated_at: null
        });
    };
    return t;
}(Flowdock.Collection);

module.exports = r;
