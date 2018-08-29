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
}, o = {}.hasOwnProperty, i = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Views.Navigation.Notification = function(t) {
    function Notification() {
        return Notification.__super__.constructor.apply(this, arguments);
    }
    r(Notification, t);
    Notification.prototype.template = require("../../templates/navigation/notification.mustache");
    Notification.prototype.tagName = "li";
    Notification.prototype.className = "notification";
    Notification.prototype.events = {
        click: "goToFlow",
        "click .mark-as-read": "markAsRead",
        "click .ignore-team": "ignoreTeam"
    };
    Notification.prototype.modelEvents = {
        "change:unread": "render",
        "change:unreads": "render",
        "change:message": "render"
    };
    Notification.prototype.initialize = function(e) {
        var t;
        Notification.__super__.initialize.apply(this, arguments);
        if (t = this.model.message().user()) {
            this.listenTo(t, "change", this.render)
        };
        this.listenTo(this.model.message(), "change", this.render);
        this.onModelLoad(function(e) {
            return function() {
                return e.listenTo(e.model.flow(), "change:team_notifications", e.render);
            };
        }(this));
        return this.onIgnore = e.onIgnore;
    };
    Notification.prototype.serializeData = function() {
        var e, t, n, r, o;
        r = this.model.message().presenter();
        t = this.model.unreadCount();
        n = this.model.message().hasTag(Models.Tag.userTagFor("team"));
        o = this.model.flow().get("team_notifications");
        e = n && o;
        return {
            message: this.getMessageContent(r),
            timestamp: function(e) {
                return function() {
                    var n;
                    n = {
                        calendar: true,
                        before: e.model.isPrivateMessage() && t > 1 ? "latest" : ""
                    };
                    return Helpers.TimeHelper.timestamp(e.model.message().get("sent"), n)();
                };
            }(this),
            flow: this.model.flow().toJSON(),
            avatar: r.avatar(80),
            user: r.author(),
            isPrivate: this.model.isPrivateMessage(),
            iconType: this.iconType(),
            moreUnreadMessages: t > 1 ? this.additionalUnreadMessages(t - 1) : null,
            unread: this.model.isUnread(),
            canIgnore: e
        };
    };
    Notification.prototype.additionalUnreadMessages = function(e) {
        return e + " earlier message" + (e === 1 ? "" : "s");
    };
    Notification.prototype.iconType = function() {
        if (this.isChatMessage() || this.isActivityMessage()) {
            return null;
        }
        return this.model.message().get("event");
    };
    Notification.prototype.isFileMessage = function() {
        return this.model.message().get("event") === "file";
    };
    Notification.prototype.isChatMessage = function() {
        var e;
        e = this.model.message().get("event");
        return i.call(Models.Filter.Chat.prototype.event, e) >= 0;
    };
    Notification.prototype.isActivityMessage = function() {
        return this.model.message().get("event") === "activity";
    };
    Notification.prototype.getMessageContent = function(e) {
        var t;
        if (this.isFileMessage()) {
            t = e.body();
            return $("<span>").text(t).html();
        }
        if (this.isChatMessage()) {
            return e.body();
        }
        if (this.isActivityMessage()) {
            return e.data.title || e.data.thread.title;
        }
        return e.summary();
    };
    Notification.prototype.onAfterRender = function() {
        this.toggleUnread();
        return this.$el.addClass(this.model.isMention() ? "mention" : "everyone");
    };
    Notification.prototype.goToFlow = function(e) {
        var t, n;
        n = $(e.target);
        if (n.is(".mark-as-read")) {
            return undefined;
        }
        t = this.model.message();
        this.trigger("navigate");
        if (t.flow().isPrivate()) {
            return Flowdock.app.router.navigateToPrivate(t.flow());
        }
        if (Helpers.textSelected() || n.attr("href") || n.closest("a[href]").length > 0) {
            return undefined;
        }
        if (t.get("thread_id")) {
            return Flowdock.app.router.navigateToFlow(t.flow(), {
                thread: t.threadId()
            });
        }
        return Flowdock.app.router.navigateToFlow(t.flow(), {
            message: t.threadId()
        });
    };
    Notification.prototype.markAsRead = function(e) {
        e.stopImmediatePropagation();
        return this.model.markAsRead();
    };
    Notification.prototype.ignoreTeam = function(e) {
        e.stopImmediatePropagation();
        return this.onIgnore(this.model.message().flow(), this.model);
    };
    Notification.prototype.toggleUnread = function() {
        return this.$el.toggleClass("unread", this.model.isUnread());
    };
    Notification.prototype.render = function() {
        this.onModelLoad(function(e) {
            return function() {
                if (e.model.flow().get("open")) {
                    return e.model.flow().fullyLoaded.done(function() {
                        return Notification.__super__.render.call(e);
                    });
                }
                return Notification.__super__.render.apply(e, arguments);
            };
        }(this));
        return this;
    };
    Notification.prototype.onModelLoad = function(e) {
        if (this.model.isFlowMessage()) {
            return Flowdock.app.flows.getOrFetch(this.model.message().get("flow")).done(e);
        }
        return e();
    };
    return Notification;
}(Flowdock.ItemView);
