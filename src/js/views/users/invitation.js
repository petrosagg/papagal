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

Views.Chat.Invitation = function(t) {
    function Invitation() {
        return Invitation.__super__.constructor.apply(this, arguments);
    }
    r(Invitation, t);
    Invitation.prototype.tagName = "li";
    Invitation.prototype.className = "user invitation clearfix tipsy-tooltip";
    Invitation.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/users/invitation.mustache"))({
            email: this.model.get("email")
        }));
        this.$el.find(".avatar").css("background-image", "url(" + Presenters.Helper.avatarFromEmail(this.model.get("email"), 72) + ")");
        return this;
    };
    return Invitation;
}(Flowdock.HierarchicalView);
