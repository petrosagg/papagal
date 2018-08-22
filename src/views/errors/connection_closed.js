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

Views.Errors.ConnectionClosed = function(e) {
    function ConnectionClosed() {
        return ConnectionClosed.__super__.constructor.apply(this, arguments);
    }
    r(ConnectionClosed, e);
    ConnectionClosed.prototype.errorName = "connection-closed";
    return ConnectionClosed;
}(Views.Errors.Inline);