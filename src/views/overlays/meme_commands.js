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

Views.MemeCommands = function(t) {
    function MemeCommands() {
        return MemeCommands.__super__.constructor.apply(this, arguments);
    }
    r(MemeCommands, t);
    MemeCommands.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/overlays/meme_commands.mustache"))());
        return this;
    };
    return MemeCommands;
}(Views.Shared.Overlay);