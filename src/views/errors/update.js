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

Views.Errors.Update = function(e) {
    function Update() {
        return Update.__super__.constructor.apply(this, arguments);
    }
    r(Update, e);
    Update.prototype.errorName = "update";
    return Update;
}(Views.Errors.Inline);