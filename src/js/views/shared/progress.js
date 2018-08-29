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

Views.Shared.Progress = function(t) {
    function Progress() {
        return Progress.__super__.constructor.apply(this, arguments);
    }
    r(Progress, t);
    Progress.prototype.className = "progress spinner";
    Progress.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        return this.color = e.color || "green";
    };
    Progress.prototype.show = function(e) {
        if (e == null) {
            e = true
        };
        return this.$el.toggleClass("hidden", !e);
    };
    Progress.prototype.hide = function(e) {
        if (e == null) {
            e = true
        };
        return this.show(!e);
    };
    Progress.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/loaders/arc.mustache"))());
        this.$el.addClass(this.color);
        return this;
    };
    return Progress;
}(Backbone.View);
