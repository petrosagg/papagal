var r, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

r = require("tether");

Views.Chat.UserCard = function(t) {
    function UserCard() {
        return UserCard.__super__.constructor.apply(this, arguments);
    }
    o(UserCard, t);
    UserCard.prototype.className = "user-card";
    UserCard.prototype.events = {
        "click .user-card-wrapper": "preventClose",
        "click .private-chat-link": "openPrivate",
        mouseleave: "delayedRemove",
        mouseenter: "cancelRemove"
    };
    UserCard.prototype.modelEvents = {
        change: "render"
    };
    UserCard.prototype.initialize = function(e) {
        if (e != null) {
            this.options = e;
        } else {
            this.options = {};
        }
        this.timeout = null;
        this.me = this.options.me;
        this.listenTo(this.model.presenceModel(), "change", this.render);
        return _.defer(function(e) {
            return function() {
                return $(window).asEventStream("blur click").takeUntil(e.asEventStream("destructor")).onValue(function() {
                    return e.destructor();
                });
            };
        }(this));
    };
    UserCard.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/users/user_card.mustache"))(_.extend(this.model.toJSON(), {
            isYou: this.model.id === Flowdock.app.user.id
        })));
        this.$(".user-card-activity").html(Helpers.TimeHelper.userPresence(this.model, {
            since: true
        }));
        if (this.me === this.model) {
            this.$(".private-chat-link").hide()
        };
        if (this.timeout == null) {
            this.delayedRemove()
        };
        if (this.model.get("status")) {
            this.$el.attr("title", 'Status: "' + this.model.get("status") + '"')
        };
        return this;
    };
    UserCard.prototype.destructor = function() {
        var e;
        this.cancelRemove();
        if ((e = this.tether) != null) {
            e.destroy()
        };
        this.me = this.presence = this.tether = null;
        return UserCard.__super__.destructor.call(this, {
            removeDomElement: true
        });
    };
    UserCard.prototype.delayedRemove = function() {
        this.cancelRemove();
        return this.timeout = setTimeout(function(e) {
            return function() {
                return e.destructor();
            };
        }(this), 2e3);
    };
    UserCard.prototype.cancelRemove = function() {
        return clearTimeout(this.timeout);
    };
    UserCard.prototype.preventClose = function(e) {
        if ($(e.target).closest("a").length === 0) {
            return e.stopPropagation();
        }
        return;
    };
    UserCard.prototype.openPrivate = function() {
        if (this.model.canChatWith(this.me)) {
            Flowdock.app.router.navigateTo({
                private: this.model
            });
            return this.destructor();
        }
        return;
    };
    UserCard.prototype.addTether = function(e) {
        var t;
        t = {
            element: this.$el,
            target: e,
            attachment: "top left",
            targetAttachment: "bottom left",
            constraints: [ {
                to: "scrollParent",
                attachment: "together",
                pin: [ "left", "right" ]
            } ]
        };
        this.options.alwaysVisible || (t.outOfBoundsClass = "out-of-bounds");
        return this.tether = new r(t);
    };
    return UserCard;
}(Flowdock.HierarchicalView);
