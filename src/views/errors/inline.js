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

Views.Errors.Inline = function(e) {
    function Inline() {
        return Inline.__super__.constructor.apply(this, arguments);
    }
    r(Inline, e);
    Inline.prototype.className = "toast-error";
    Inline.prototype.errorType = "inline";
    Inline.prototype.remove = function() {
        this.$el.on(Helpers.animationend(), function(e) {
            return function() {
                e.$el.off();
                return e.$el.remove();
            };
        }(this));
        this.$el.addClass("hide");
        this.ellipsisAnimation = clearInterval(this.ellipsisAnimation);
        return this.stopListening();
    };
    return Inline;
}(Views.Errors.Error);