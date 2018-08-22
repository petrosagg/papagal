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

Views.Shared.List = function(e) {
    function List() {
        return List.__super__.constructor.apply(this, arguments);
    }
    r(List, e);
    List.prototype.tagName = "ul";
    List.prototype.collectionEvents = {
        reset: "render",
        add: "addItem",
        remove: "removeItem",
        "change:disabled": "editItem"
    };
    List.prototype.initialize = function(e) {
        this.filter = e.filter;
        this.modelView = e.modelView;
        this.reversed = e.reversed;
    };
    List.prototype.destructor = function() {
        this.modelView = this.filter = void 0;
        return List.__super__.destructor.apply(this, arguments);
    };
    List.prototype.render = function() {
        var e, t, n, r;
        for (r = this.filter ? this.collection.filter(this.filter) : this.collection.models, 
        this.$el.empty(), e = 0, t = r.length; t > e; e++) {
            n = r[e];
            this.removeSubview(n);
            this.reversed ? this.$el.prepend(this.subview(new this.modelView({
                model: n
            })).render().el) : this.$el.append(this.subview(new this.modelView({
                model: n
            })).render().el);
        }
        return this;
    };
    List.prototype.addItem = function(e, t) {
        var n;
        n = this.subview(new this.modelView({
            model: e
        }));
        this.reversed ? this.$el.prepend(this.expand(n.render()).el) : this.$el.append(this.expand(n.render()).el);
        return this.trigger("addItem");
    };
    List.prototype.removeItem = function(e, t) {
        var n, r, o, i;
        for (o = this.removeSubview(e), n = 0, r = o.length; r > n; n++) {
            i = o[n];
            this.collapse(i);
        }
        return this.trigger("removeItem");
    };
    List.prototype.expand = function(e) {
        var t;
        t = e.$el;
        t.on(Helpers.animationend(), function() {
            t.off(Helpers.animationend());
            return t.removeClass("expanding");
        });
        t.addClass("expanding");
        return e;
    };
    List.prototype.collapse = function(e) {
        var t;
        t = e.$el.addClass("collapsing");
        return t.on(Helpers.animationend(), function() {
            return e.remove();
        });
    };
    List.prototype.editItem = function(e, t, n) {
        if (t === !1) {
            return this.addItem(e);
        }
        return this.removeItem(e);
    };
    return List;
}(Flowdock.HierarchicalView);