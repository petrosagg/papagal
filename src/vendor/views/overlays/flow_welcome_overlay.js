var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = React.createFactory(require("components/users/avatar_list"));

o = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    i(n, t);
    n.prototype.id = "flow-welcome";
    n.prototype.classsName = "flow-welcome-overlay";
    n.prototype.events = {
        "click a.join-team": "onJoinTeam",
        "click a.hang-around": "onHangAround"
    };
    n.prototype.initialize = function(e) {
        this.options = e;
        return n.__super__.initialize.call(this, this.options);
    };
    n.prototype.render = function() {
        var t;
        this.$el.html(Helpers.renderTemplate(require("templates/overlays/flow_welcome_overlay.mustache"))({
            description: this.model.get("description"),
            flowName: this.model.get("name"),
            flowMembersCount: this.model.users.length,
            accessModeCopy: this.generateAccessModeCopy()
        }));
        t = new Collections.Users(_.sample(this.model.users.models, 15));
        this.component(this.$(".avatar-strip")[0], r({
            collection: t
        }));
        return this;
    };
    n.prototype.close = function() {
        if (this.model.get("team_notifications") === null) {
            this.model.saveWithRetry({
                team_notifications: !0
            }, {
                patch: !0
            })
        };
        return n.__super__.close.call(this);
    };
    n.prototype.onJoinTeam = function() {
        return this.options.onJoinTeam();
    };
    n.prototype.onHangAround = function() {
        return this.options.onHangAround();
    };
    n.prototype.generateAccessModeCopy = function() {
        if (this.model.get("access_mode") === "organization") {
            return "Anyone in " + this.model.get("organization").name + " can join.";
        }
        return "Only for invited members.";
    };
    return n;
}(Views.Shared.Overlay);

module.exports = o;