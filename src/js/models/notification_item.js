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

Models.NotificationItem = function(e) {
    function NotificationItem() {
        return NotificationItem.__super__.constructor.apply(this, arguments);
    }
    r(NotificationItem, e);
    NotificationItem.prototype.defaults = {
        unread: false,
        unreads: []
    };
    NotificationItem.generateId = function(e) {
        var t;
        if (e.get("to")) {
            t = _.sortBy([ "" + e.get("to"), "" + e.get("user") ]);
            return "private:" + t.join(":");
        }
        return "flow:" + e.get("flow") + ":" + e.get("id");
    };
    NotificationItem.prototype.initialize = function(e, n) {
        var r, o, i;
        if (n == null) {
            n = {}
        };
        NotificationItem.__super__.initialize.apply(this, arguments);
        this.userId = i = n.userId;
        r = [ ":unread:" + i, ":user:" + i, ":user:everyone", ":user:team" ];
        o = this.message().asEventStream("tag-change");
        o.filter(function(e) {
            var t;
            t = e.remove;
            return t.indexOf(":unread:" + i) >= 0;
        }).onValue(this, "markAsRead", false);
        o.filter(function(e) {
            var t;
            t = e.add;
            return t.indexOf(":unread:" + i) >= 0;
        }).onValue(this, "markAsUnread", false);
        o.map(this, "message").flatMapLatest(function(e) {
            var t;
            t = Flowdock.app.user.flowGroups().map(function(e) {
                return Models.Tag.groupTagFor(e.id);
            });
            if (_.all(e.get("tags"), function(e) {
                return r.indexOf(e) < 0 && t.indexOf(e) < 0;
            })) {
                return Bacon.once();
            }
            return Bacon.never();
        }).onValue(this, "trigger", "remove-mention", this);
        return this.untilEnd(this.message().asEventStream("message-deleted")).onValue(this, "trigger", "remove-mention", this);
    };
    NotificationItem.prototype.message = function() {
        return this.get("message");
    };
    NotificationItem.prototype.flow = function() {
        return this.message().flow();
    };
    NotificationItem.prototype.markAsRead = function(e) {
        if (e == null) {
            e = true
        };
        this.set({
            unread: false,
            unreads: []
        });
        if (e) {
            return $.ajax({
                url: Helpers.apiUrl("/notifications/unreads/" + this.id),
                method: "DELETE"
            });
        }
        return;
    };
    NotificationItem.prototype.markAsUnread = function(e) {
		console.log('mark as unread!')
        if (e == null) {
            e = !0
        };
        this.set({
            unread: true,
            unreads: []
        });
        if (e) {
            if (this.message().unread(Flowdock.app.user)) {
                return $.ajax({
                    url: Helpers.apiUrl("/notifications/unreads/" + this.id),
                    method: "POST"
                });
            } else {
                this.message().markAsUnread(Flowdock.app.user)
            }
        }
        return;
    };
    NotificationItem.prototype.isUnread = function() {
        return !!this.get("unread");
    };
    NotificationItem.prototype.consume = function(e) {
        this.message().consume(e);
        if (this.isPrivateMessage()) {
            return this.initPrivateStream(e);
        }
        return;
    };
    NotificationItem.prototype.unconsume = function() {
        return this.message().unconsume();
    };
    NotificationItem.prototype.parse = function(e) {
        e.message == null || e.message instanceof Models.Message || (e.message = new Models.Message(e.message));
        return e;
    };
    NotificationItem.prototype.isPrivateMessage = function() {
        return !this.isFlowMessage();
    };
    NotificationItem.prototype.isFlowMessage = function() {
        return this.id.indexOf("flow:") === 0;
    };
    NotificationItem.prototype.isMention = function() {
        return this.isPrivateMessage() || this.message().get("tags").indexOf(":user:" + Flowdock.app.user.id) >= 0;
    };
    NotificationItem.prototype.unreadCount = function() {
        if (this.isPrivateMessage()) {
            return this.get("unreads").length;
        }
        return;
    };
    NotificationItem.prototype.unreadProperty = function() {
        if (this.isPrivateMessage()) {
            return this.untilEnd(this.asEventStream("change:unreads")).map(this, "unreadCount").toProperty(this.unreadCount());
        }
        return Bacon.never();
    };
    NotificationItem.prototype.initPrivateStream = function(e) {
        var t, n;
        t = this.untilEnd(e).filter(this.flow().eventStreamFilter);
        n = ":unread:" + this.userId;
        return t.filter(function(e) {
            return e.event === "tag-change";
        }).filter(function(e) {
            return function(t) {
                var n;
                n = t.content.message;
                return i.call(e.get("unreads"), n) >= 0;
            };
        }(this)).filter(function(e) {
            return e.content.remove.indexOf(n) >= 0;
        }).map(function(e) {
            return e.content.message;
        }).onValue(function(e) {
            return function(t) {
                e.set({
                    unreads: _.without(e.get("unreads"), t)
                });
                if (e.unreadCount() === 0) {
                    return e.set({
                        unread: false
                    });
                }
                return;
            };
        }(this));
    };
    return NotificationItem;
}(Backbone.Model);
