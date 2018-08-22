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

Flowdock.Collection = function(e) {
    function Collection(e, n) {
        if (n != null && n.flow) {
            this.flow = n.flow
        };
        this._unsubscribers = [];
        Collection.__super__.constructor.apply(this, arguments);
    }
    r(Collection, e);
    Collection.prototype.addStream = function(e) {
        this._unsubscribers.push(e);
        return e;
    };
    Collection.prototype.untilEnd = function(e) {
        this._end || (this._end = this.asEventStream("cleanup"));
        return e.takeUntil(this._end);
    };
    Collection.prototype.consume = function(e) {
        this.stream = e;
    };
    Collection.prototype.unconsume = function() {
        var e, t, n, r;
        for (this.trigger("cleanup"), n = this._unsubscribers, e = 0, t = n.length; t > e; e++) {
            (r = n[e])();
        }
        this._unsubscribers = [];
        this.stream = null;
        return this;
    };
    Collection.prototype.cleanup = function() {
        this.stopListening();
        this.unconsume();
        this.reset();
        if (this.flow != null) {
            this.flow = null
        };
        if (this._end != null) {
            this._end = null
        };
        return this;
    };
    return Collection;
}(Backbone.Collection);