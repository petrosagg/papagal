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

Models.Emoji = function(e) {
    function Emoji() {
        return Emoji.__super__.constructor.apply(this, arguments);
    }
    r(Emoji, e);
    Emoji.prototype.colonized = function() {
        return ":" + this.id + ":";
    };
    return Emoji;
}(Backbone.Model);