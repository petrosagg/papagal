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

Views.Errors.HandshakeFailed = function(e) {
    function HandshakeFailed() {
        return HandshakeFailed.__super__.constructor.apply(this, arguments);
    }
    r(HandshakeFailed, e);
    HandshakeFailed.prototype.errorName = "handshake-failed";
    return HandshakeFailed;
}(Views.Errors.Error);