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

Presenters.ChatMessage.LineMessage = function(e) {
    function LineMessage() {
        return LineMessage.__super__.constructor.apply(this, arguments);
    }
    r(LineMessage, e);
    LineMessage.prototype.author = function() {
        return this.data.user;
    };
    return LineMessage;
}(Presenters.ChatMessage);
