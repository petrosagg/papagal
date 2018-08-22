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

Views.Errors.ExternalActionFailed = function(e) {
    function ExternalActionFailed() {
        return ExternalActionFailed.__super__.constructor.apply(this, arguments);
    }
    r(ExternalActionFailed, e);
    ExternalActionFailed.prototype.errorName = "external-action-failed";
    return ExternalActionFailed;
}(Views.Errors.Inline);