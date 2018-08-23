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

Views.Errors.RoutingError = function(e) {
    function RoutingError() {
        return RoutingError.__super__.constructor.apply(this, arguments);
    }
    r(RoutingError, e);
    RoutingError.prototype.errorName = "routing-error";
    return RoutingError;
}(Views.Errors.Error);
