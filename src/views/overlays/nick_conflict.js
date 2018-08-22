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

Views.Overlays.NickConflict = function(t) {
    function NickConflict() {
        return NickConflict.__super__.constructor.apply(this, arguments);
    }
    r(NickConflict, t);
    NickConflict.prototype.id = "nick-conflict";
    NickConflict.prototype.classsName = "nick-conflict";
    NickConflict.prototype.events = {
        "click .open-private": "openPrivate",
        "click a.button": "close"
    };
    NickConflict.prototype.render = function() {
        this.$el.html(require("../../templates/overlays/nick_conflict.mustache").render({
            name: this.model.get("name")
        }));
        return this;
    };
    NickConflict.prototype.openPrivate = function() {
        return Flowdock.app.router.navigateTo({
            private: this.model
        });
    };
    NickConflict.prototype.close = function() {
        return NickConflict.__super__.close.call(this);
    };
    return NickConflict;
}(Views.Shared.Overlay);