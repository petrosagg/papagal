var r = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (o.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, o = {}.hasOwnProperty;

Views.Errors.FlowSubscribeFailed = function(e) {
    function FlowSubscribeFailed() {
        return FlowSubscribeFailed.__super__.constructor.apply(this, arguments);
    }
    r(FlowSubscribeFailed, e);
    FlowSubscribeFailed.prototype.errorName = "private-subscribe-failed";
    return FlowSubscribeFailed;
}(Views.Errors.Flow);