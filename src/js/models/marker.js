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
}, o = {}.hasOwnProperty, i = [].slice;

Models.Marker = function(e) {
    function Marker() {
        return Marker.__super__.constructor.apply(this, arguments);
    }
    r(Marker, e);
    Marker.prototype.parseId = function() {
        var e, t, n;
        t = this.id.split(":");
        n = t[0];
        if (t.length >= 2) {
            e = i.call(t, 1);
        } else {
            e = [];
        }
        return [ n, e.join(":") ];
    };
    Marker.prototype.validate = function(e, t) {
        var n, r;
        for (n in e) {
            r = e[n];
            if (n !== "id" && this.get(n) > r) {
                return "Markers cannot be downgraded";
            }
        }
        return false;
    };
    return Marker;
}(Backbone.Model);
