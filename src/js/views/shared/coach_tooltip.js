var r, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

r = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    o(t, e);
    t.prototype.className = "coach-tooltip";
    t.prototype.initialize = function(e) {
        if (e != null) {
            this.options = e;
        } else {
            this.options = {};
        }
    };
    t.prototype.fadeOut = function(e) {
        return Helpers.animate(this.$el, "coach-tooltip-leave", e);
    };
    return t;
}(Flowdock.ItemView);

module.exports = r;
