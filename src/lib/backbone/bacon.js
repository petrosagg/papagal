var r, o, i = [].slice;

o = function(e, t, n) {
    if (n == null) {
        n = _.identity
    };
    return new Bacon.EventStream(function(r) {
        var o, s;
        o = function() {
            var e, t;
            e = arguments.length >= 1 ? i.call(arguments, 0) : [];
            t = r(new Bacon.Next(n.apply(null, e)));
            if (t === Bacon.noMore) {
                return s();
            }
            return;
        };
        s = function() {
            return e.off(t, o);
        };
        e.on(t, o);
        return s;
    });
};

r = function(e, t) {
    if (t == null) {
        t = _.identity
    };
    return o(this, e, t);
};

Backbone.Model.prototype.asProperty = function(e) {
    if (e) {
        return o(this, "change:" + e).map(this, "get", e).toProperty(this.get(e));
    }
    return o(this, "change").map(this, "toJSON").toProperty(this.toJSON());
};

Backbone.Model.prototype.asEventStream = r;

Backbone.Collection.prototype.asEventStream = r;

Backbone.View.prototype.asEventStream = r;

Backbone.Events.asEventStream = r;

Backbone.Bacon = {
    asEventStream: r
};