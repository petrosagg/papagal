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

Views.SlashCommands = function(t) {
    function SlashCommands() {
        return SlashCommands.__super__.constructor.apply(this, arguments);
    }
    r(SlashCommands, t);
    SlashCommands.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/overlays/slash_commands.mustache"))());
        return this;
    };
    return SlashCommands;
}(Views.Shared.Overlay);