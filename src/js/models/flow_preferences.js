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

Models.FlowPreferences = function(e) {
    function FlowPreferences() {
        return FlowPreferences.__super__.constructor.apply(this, arguments);
    }
    r(FlowPreferences, e);
    FlowPreferences.prototype.defaults = {
        inbox_visible: !0
    };
    FlowPreferences.prototype.inboxVisible = function() {
        return this.get("inbox_visible");
    };
    return FlowPreferences;
}(Backbone.Model);
