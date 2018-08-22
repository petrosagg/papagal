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

Collections.Integrations = function(e) {
    function Integrations() {
        return Integrations.__super__.constructor.apply(this, arguments);
    }
    r(Integrations, e);
    Integrations.prototype.model = Models.Integration;
    Integrations.prototype.url = function() {
        return this.flow.url();
    };
    Integrations.prototype.parse = function(e) {
        var t, n, r, o, i;
        for (o = e.integrations, i = [], t = 0, r = o.length; r > t; t++) {
            n = o[t];
            if (n.source === "event") {
                i.push(n)
            };
        }
        return i;
    };
    Integrations.prototype.deprecated = function() {
        return this.filter(function(e) {
            return e.get("deprecated");
        });
    };
    return Integrations;
}(Flowdock.Collection);
