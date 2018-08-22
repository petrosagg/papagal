var r;

r = function() {
    if (Flowdock.MessageReceivedNotifier.logging) {
        return console.log.apply(console, arguments);
    }
    return;
};

Flowdock.MessageReceivedNotifier = function() {
    function MessageReceivedNotifier(e) {
        this.user = e;
        this.end = new Bacon.Bus();
        this.messageFilter = new Models.Filter.Chat();
        this.buffer = [];
    }
    MessageReceivedNotifier.INACTIVE_IDLE_THRESHOLD = 12e4;
    MessageReceivedNotifier.ACTIVE_IDLE_THRESHOLD = 3e5;
    MessageReceivedNotifier.ACTIVITY_TIMEOUT = 12e4;
    MessageReceivedNotifier.logging = !1;
    MessageReceivedNotifier.desktopNotificationsEnabled = function() {
        return Flowdock.app.notifications.hasPermission();
    };
    MessageReceivedNotifier.prototype.bufferMessage = function(e) {
        r("Buffering message for message-receive notification", e);
        return this.buffer.push(e);
    };
    MessageReceivedNotifier.prototype.consume = function(e) {
        var t, n;
        t = this.untilEnd(this.userActivity());
        n = this.untilEnd(e).filter(this, "filterHighlights");
        n.takeWhile(t.not()).onValue(this, "bufferMessage");
        return t.flatMapLatest(function(t) {
            return function(o) {
                if (o) {
                    r("Activating message-receive notifications, sending", t.buffer.length, "buffered messages");
                    e = t.buffer.slice();
                    t.buffer = [];
                    return Bacon.fromArray(e).merge(n);
                }
                r("Deactivating message-receive notifications");
                return Bacon.never();
            };
        }(this)).map(this, "formatNotification").doAction(function(e) {
            return r("Sending message-receive notification", e);
        }).onValue(this, "sendNotification");
    };
    MessageReceivedNotifier.prototype.filterHighlights = function(e) {
        if (e.id == null) {
            return !1;
        }
        if (this.messageFilter.matchesTo(e)) {
            if (e.to != null && String(e.to) === String(this.user.id)) {
                return !0;
            }
            return new Models.Message(e).highlights(this.user);
        }
        return !1;
    };
    MessageReceivedNotifier.prototype.formatNotification = function(e) {
        var t;
        t = {
            persist: !1,
            event: "message-receive",
            content: {
                message: e.id
            }
        };
        e.flow != null ? t.flow = e.flow : t.to = String(e.user);
        return t;
    };
    MessageReceivedNotifier.prototype.sendNotification = function(e) {
        return Flowdock.app.connection.sendStream.push(e);
    };
    MessageReceivedNotifier.prototype.userActivity = function() {
        var t;
        t = Flowdock.UserActivity;
        return Bacon.mergeAll([ t.blurs.map(function() {
            return !1;
        }), t.focuses.map(function() {
            return !0;
        }), t.visibility ]).flatMapLatest(function(n) {
            return function(r) {
                if (r) {
                    return Bacon.once(!0).merge(n.untilEnd(Flowdock.userActivity)).flatMapLatest(function() {
                        return Bacon.once(!0).merge(Bacon.later(MessageReceivedNotifier.ACTIVITY_TIMEOUT, !1));
                    }).flatMapLatest(function(t) {
                        if (t) {
                            return Bacon.once(!0);
                        }
                        return Bacon.once(MessageReceivedNotifier.desktopNotificationsEnabled()).merge(Bacon.later(MessageReceivedNotifier.ACTIVE_IDLE_THRESHOLD, !1));
                    });
                }
                return Bacon.once(!1).merge(n.untilEnd(t.mousemoves)).flatMapLatest(function() {
                    return Bacon.once(!0).merge(Bacon.later(MessageReceivedNotifier.ACTIVITY_TIMEOUT, !1));
                }).flatMapLatest(function(t) {
                    if (t) {
                        return Bacon.once(!0);
                    }
                    return Bacon.once(MessageReceivedNotifier.desktopNotificationsEnabled()).merge(Bacon.later(MessageReceivedNotifier.INACTIVE_IDLE_THRESHOLD, !1));
                });
            };
        }(this)).skipDuplicates().toProperty(!0);
    };
    MessageReceivedNotifier.prototype.untilEnd = function(e) {
        return e.takeUntil(this.end.mapEnd(!0));
    };
    MessageReceivedNotifier.prototype.cleanup = function() {
        this.end.end();
        this.buffer = [];
        return this.end = null;
    };
    return MessageReceivedNotifier;
}();