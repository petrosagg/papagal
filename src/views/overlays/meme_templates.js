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

Views.MemeTemplates = function(t) {
    function MemeTemplates() {
        return MemeTemplates.__super__.constructor.apply(this, arguments);
    }
    r(MemeTemplates, t);
    MemeTemplates.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/overlays/meme_templates.mustache"))());
        return this;
    };
    return MemeTemplates;
}(Views.Shared.Overlay);