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

Models.FlowGroup = function(e) {
    function FlowGroup() {
        return FlowGroup.__super__.constructor.apply(this, arguments);
    }
    r(FlowGroup, e);
    FlowGroup.prototype.defaults = function() {
        return {
            members: []
        };
    };
    FlowGroup.prototype.isMember = function(e) {
        return 0 !== this.get("members").filter(function(t) {
            return t.id === e.id;
        }).length;
    };
    return FlowGroup;
}(Backbone.Model);