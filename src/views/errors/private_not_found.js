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

Views.Errors.PrivateNotFound = function(e) {
    function PrivateNotFound() {
        return PrivateNotFound.__super__.constructor.apply(this, arguments);
    }
    r(PrivateNotFound, e);
    PrivateNotFound.prototype.errorName = "private-not-found";
    return PrivateNotFound;
}(Views.Errors.Error);
