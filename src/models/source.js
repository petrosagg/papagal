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

Models.Source = function(e) {
    function Source() {
        return Source.__super__.constructor.apply(this, arguments);
    }
    r(Source, e);
    return Source;
}(Backbone.Model);
