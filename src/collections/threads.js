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

Collections.Threads = function(e) {
    function Threads() {
        return Threads.__super__.constructor.apply(this, arguments);
    }
    r(Threads, e);
    Threads.prototype.model = Models.Threads;
    Threads.prototype.url = function() {
        return this.flow.url() + "/threads";
    };
    return Threads;
}(Flowdock.Collection);