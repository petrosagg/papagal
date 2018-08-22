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

Views.Thread.ThreadActionList = function(e) {
    function ThreadActionList() {
        return ThreadActionList.__super__.constructor.apply(this, arguments);
    }
    r(ThreadActionList, e);
    ThreadActionList.prototype.tagName = "ul";
    ThreadActionList.prototype.className = "thread-action-list dropdown-actions capitalize";
    ThreadActionList.prototype.initialize = function() {
        return this.listenTo(this.model, "change:actions", function(e) {
            return function() {
                e.actions = e.getActions();
                return e.render();
            };
        }(this));
    };
    ThreadActionList.prototype.render = function() {
        var e;
        e = _.map(this.model.get("actions"), function(e) {
            return function(t) {
                return e.renderOne(t);
            };
        }(this));
        this.$el.empty();
        this.$el.append(e);
        return this;
    };
    ThreadActionList.prototype.renderOne = function(e) {
        var t;
        t = this.subview(new Views.Thread.Action({
            action: e,
            thread: this.model
        }));
        return t.render().$el;
    };
    ThreadActionList.prototype.getActions = function() {
        return this.model.get("actions") || [];
    };
    return ThreadActionList;
}(Flowdock.HierarchicalView);
