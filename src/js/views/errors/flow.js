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

Views.Errors.Flow = function(e) {
    function Flow() {
        return Flow.__super__.constructor.apply(this, arguments);
    }
    r(Flow, e);
    Flow.prototype.errorType = "flow";
    return Flow;
}(Views.Errors.Error);
