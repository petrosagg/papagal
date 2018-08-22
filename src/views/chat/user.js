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

Views.Chat.User = function(t) {
    function User() {
        return User.__super__.constructor.apply(this, arguments);
    }
    r(User, t);
    User.prototype.tagName = "li";
    User.prototype.className = "user clearfix tipsy-tooltip";
    User.prototype.modelEvents = {
        change: "onChange"
    };
    User.prototype.initialize = function(e) {
        this.options = e;
        return this.listenTo(this.model.presenceModel(), "change", function(e) {
            return function() {
                e.setPresenceClass();
                return e.setActivity();
            };
        }(this));
    };
    User.prototype.destructor = function() {
        User.__super__.destructor.apply(this, arguments);
        return this.options = null;
    };
    User.prototype.onChange = function() {
        var e;
        e = _.keys(this.model.changedAttributes());
        if (_.all(e, function(e) {
            return e === "status";
        })) {
            return this.setStatus();
        }
        return this.renderData();
    };
    User.prototype.setActivity = function() {
        var e;
        e = this.$(".activity");
        return e.html(this.activeTimeHtml()).toggle(!e.is(":empty"));
    };
    User.prototype.setPresenceClass = function() {
        return this.$el.removeClass("active offline idle").addClass(this.model.presence());
    };
    User.prototype.renderData = function() {
        var e;
        this.setPresenceClass();
        this.setStatus();
        this.setActivity();
        this.$(".mail").attr({
            href: "mailto:" + this.model.get("email"),
            title: this.model.get("email")
        });
        this.$(".user-name").attr({
            title: this.model.get("name")
        }).text(this.model.get("nick") + " (" + this.model.get("name") + ")");
        e = this.model.avatar(72) || "";
        if (e) {
            this.$(".user-avatar").css("background-image", "url(" + e + ")")
        };
        return this.$(".user-in-team").add(this.$(".user-in-team").closest("li")).toggleClass("hidden", !this.model.get("team_notifications"));
    };
    User.prototype.setStatus = function() {
        if (this.model.get("status")) {
            return this.$el.attr("title", this.model.nick() + ': "' + this.model.get("status") + '"');
        }
        return;
    };
    User.prototype.render = function() {
        var t;
        t = this.subview(new Views.Shared.Avatar({
            model: this.model,
            size: 72,
            className: "user-avatar",
            avatarOnly: this.options.avatarOnly
        }).render());
        this.$el.html(t.$el);
        this.options.avatarOnly || this.$el.append(Helpers.renderTemplate(require("../../templates/users/user.mustache"))({
            idle: this.activeTimeHtml(),
            privateUrl: Helpers.urlFor({
                private: this.model
            }),
            linkToPrivate: this.model.get("id") !== Flowdock.app.user.id
        }));
        this.renderData();
        return this;
    };
    User.prototype.activeTimeHtml = function() {
        return Helpers.TimeHelper.userPresence(this.model, {
            since: !0
        });
    };
    return User;
}(Flowdock.HierarchicalView);