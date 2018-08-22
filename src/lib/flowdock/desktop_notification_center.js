var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
};

Flowdock.DesktopNotificationCenter = function() {
    function DesktopNotificationCenter(e, t) {
        var n;
        this.Notification = e;
        this.throttled = t != null ? t : !0;
        this.beforeUnload = r(this.beforeUnload, this);
        this.subscriptions = [];
        this.notifications = [];
        n = Flowdock.app.preferences.mute();
        this.mutedQueue = [];
        this.noteBus = new Bacon.Bus();
        n.diff(!1, function(e, t) {
            return e && !t;
        }).filter(function(e) {
            return e;
        }).onValue(this, "muteEnded");
        this.noteBus.filter(n).onValue(this, "queueNotification");
        this.addStream(this.noteBus.filter(n.not()).filter(this, "hasPermission").filter(function(e) {
            return function() {
                return !e.throttlingRequired();
            };
        }(this)).onValue(this, "dispatchNotification"));
        $(window).on("beforeunload", this.beforeUnload);
    }
    DesktopNotificationCenter.prototype.notificationLimit = 3;
    DesktopNotificationCenter.prototype.addStream = function(e) {
        return this.subscriptions.push(e);
    };
    DesktopNotificationCenter.prototype.closingNotification = function(e, t) {
        if (t == null) {
            t = {}
        };
        return this.noteBus.push({
            title: e,
            options: t
        });
    };
    DesktopNotificationCenter.prototype.dispatchNotification = function(e) {
        var t, n, r, o, i, s;
        n = ((i = e.options) != null ? i.onclick : void 0) || function() {};
        o = this.createNotification(e.title, _.omit(e.options, "onclick"));
        t = function(e) {
            clearTimeout(s);
            return setTimeout(function() {
                return o.close();
            }, 5e3);
        };
        s = setTimeout(function() {
            return o.close();
        }, 3e4);
        if (n) {
            o.addEventListener("click", n)
        };
        o.addEventListener("show", t);
        o.addEventListener("close", r = function(e) {
            return function() {
                e.notifications = _.reject(e.notifications, function(e) {
                    return e === o;
                });
                return setTimeout(function() {
                    if (n) {
                        o.removeEventListener("click", n)
                    };
                    o.removeEventListener("show", t);
                    return o.removeEventListener("close", r);
                }, 0);
            };
        }(this));
        this.notifications.push(o);
        return o;
    };
    DesktopNotificationCenter.prototype.createNotification = function(e, t) {
        return new this.Notification(e, t);
    };
    DesktopNotificationCenter.prototype.queueNotification = function(e, t) {
        return this.mutedQueue.push({
            title: e,
            options: t
        });
    };
    DesktopNotificationCenter.prototype.throttlingRequired = function() {
        return this.throttled && this.notifications.length >= this.notificationLimit;
    };
    DesktopNotificationCenter.prototype.hasPermission = function() {
        return this.permissionLevel() === "granted";
    };
    DesktopNotificationCenter.prototype.requestPermission = function(e) {
        if (this.Notification == null) {
            return void (e && e("denied"));
        }
        return this.Notification.requestPermission(function(t) {
            return function() {
                return e(t.permissionLevel());
            };
        }(this));
    };
    DesktopNotificationCenter.prototype.permissionLevel = function() {
        var e, t;
        if (((e = this.Notification) != null ? e.permission : void 0) != null) {
            return this.Notification.permission;
        }
        if ((t = this.Notification) != null && t.permissionLevel) {
            return this.Notification.permissionLevel();
        }
        return "denied";
    };
    DesktopNotificationCenter.prototype.muteEnded = function() {
        var e, t, n, r;
        if (this.mutedQueue.length < 5) {
            for (r = this.mutedQueue, e = 0, t = r.length; t > e; e++) {
                n = r[e];
                this.dispatchNotification(n.title, n.options);
            }
        } else this.dispatchNotification({
            title: this.mutedQueue.length + " new messages",
            options: {
                body: "Sent while you were in Do Not Disturb mode.",
                onclick: function() {}
            }
        });
        return this.mutedQueue = [];
    };
    DesktopNotificationCenter.prototype.destructor = function() {
        var e, t, n, r;
        for (n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
            (r = n[e])();
        }
        this.mutedQueue = this.notifications = null;
        return $(window).off("beforeunload", this.beforeUnload);
    };
    DesktopNotificationCenter.prototype.beforeUnload = function() {
        return void this.close();
    };
    DesktopNotificationCenter.prototype.close = function() {
        var e, t, n, r;
        for (r = this.notifications, e = 0, t = r.length; t > e; e++) {
            n = r[e];
            n.close();
        }
        return this.notifications = [];
    };
    DesktopNotificationCenter.create = function(e) {
        var t;
        t = new Flowdock.DesktopNotificationCenter(NotificationPolyfill.bestAlternative());
        $(e).bind("beforeunload", function() {
            return t.close();
        });
        return t;
    };
    return DesktopNotificationCenter;
}();
