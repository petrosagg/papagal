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

Views.Errors.Alert = function(e) {
    function Alert() {
        return Alert.__super__.constructor.apply(this, arguments);
    }
    r(Alert, e);
    Alert.prototype.errorName = "alert";
    return Alert;
}(Views.Errors.Inline);
