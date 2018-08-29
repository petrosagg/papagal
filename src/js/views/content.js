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

Views.Content = function(e) {
    function Content() {
        return Content.__super__.constructor.apply(this, arguments);
    }
    r(Content, e);
    Content.prototype.events = {
        "click #flow-overlay": "slideAsideOut"
    };
    Content.prototype.initialize = function() {
        return this.instantiatedAt = new Date();
    };
    Content.prototype.onDetach = function() {
        this.attached = false;
        return this.$el.detach();
    };
    Content.prototype.onAttach = function() {
        return this.attached = true;
    };
    Content.prototype.slideAsideOut = function() {
        var e;
        e = $("body").hasClass("navigation-in");
        return Flowdock.eventBus.trigger(e ? "mobile:hide-navigation" : "mobile:hide:userlist");
    };
    return Content;
}(Flowdock.HierarchicalView);
