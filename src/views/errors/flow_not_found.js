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

Views.Errors.FlowNotFound = function(e) {
    function FlowNotFound() {
        return FlowNotFound.__super__.constructor.apply(this, arguments);
    }
    r(FlowNotFound, e);
    FlowNotFound.prototype.errorName = "flow-not-found";
    FlowNotFound.prototype.render = function() {
        this.showLoadingIndicator();
        this.loadFlow().onValue(function(e) {
            return function(t) {
                if (t.get("id")) {
                    Flowdock.app.flows.add(t);
                    return Backbone.history.loadUrl();
                }
                return Views.Errors.Error.prototype.render.call(e);
            };
        }(this));
        return this;
    };
    FlowNotFound.prototype.showLoadingIndicator = function() {
        var e;
        e = new Views.Shared.Progress({
            el: this.el
        });
        return e.render();
    };
    FlowNotFound.prototype.loadFlow = function() {
        var e;
        e = new Models.Flow({
            url: "/flows/" + this.model.org + "/" + this.model.name
        });
        return this.untilEnd(Bacon.fromPromise(e.fetch(), !0)).map(e).mapError(e);
    };
    return FlowNotFound;
}(Views.Errors.Error);