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

Flowdock.UnreadMessages = function() {
    function UnreadMessages(e) {
        this.flow = e.flow;
        this.inbox = new t();
        this.chat = new t();
        this.end = new Bacon.Bus();
        this.chat.onValue(function(e) {
            return function() {
                return e.maybeUpdateMarkerWithPeakValue("chat");
            };
        }(this));
        this.inbox.onValue(function(e) {
            return function() {
                return e.maybeUpdateMarkerWithPeakValue("inbox");
            };
        }(this));
    }
    var t;
    t = function(e) {
        function t() {
            this.list = [];
            this.length = 0;
            t.__super__.constructor.apply(this, arguments);
        }
        r(t, e);
        t.prototype.add = function(e) {
            this.list.push(e);
            return this.length = this.list.length;
        };
        t.prototype.first = function() {
            return this.list[0];
        };
        t.prototype.reset = function() {
            this.list = [];
            this.length = this.list.length;
            this.push("reset");
            return this;
        };
        t.prototype.remove = function(e) {
            var t;
            if ((t = this.indexOf(e)) > -1) {
                this.list.splice(t, 1);
                this.length = this.list.length;
                return this.push("remove");
            }
            return;
        };
        t.prototype.indexOf = function(e) {
            var t, n, r, o, i, s;
            for (o = -1, s = this.list.length, n = 0, i = Math.floor(s / 2), t = null, o = -1; i !== t && s > n; ) {
                t = i;
                r = this.list[t];
                if (e > r) {
                    i = Math.floor((t + s) / 2);
                    n = t;
                } else {
                    if (r > e) {
                        i = Math.floor((t + n) / 2);
                        s = t;
                    } else {
                        o = t;
                    }
                }
            }
            return o;
        };
        return t;
    }(Bacon.Bus);
    UnreadMessages.prototype.consume = function(e) {
        var t, n, r;
        n = e.takeUntil(this.end).filter(function(e) {
            return e.event !== "activity.user";
        });
        t = n.filter(function(e) {
            return function(t) {
                return e._getMessageApp(t) === "chat";
            };
        }(this)).filter(function(e) {
            return e.id !== undefined;
        }).filter(this._ignoredChatMessages);
        r = n.filter(function(e) {
            return function(t) {
                return e._getMessageApp(t) === "inbox";
            };
        }(this));
        t.filter(function(e) {
            return function(t) {
                return e._messageIsFromCurrentUser(t);
            };
        }(this)).onValue(function(e) {
            return function(t) {
                return e._setMarker(t);
            };
        }(this));
        t.filter(function(e) {
            return function(t) {
                return !e._messageIsFromCurrentUser(t) && e.needsEyeTracking(t);
            };
        }(this)).onValue(function(e) {
            return function(t) {
                return e.chat.add(t.id);
            };
        }(this));
        return r.onValue(function(e) {
            return function(t) {
                return e.inbox.add(t.id);
            };
        }(this));
    };
    UnreadMessages.prototype.readMessage = function(e) {
        var t;
        t = this._getMessageApp(e);
        this.getUnreadMessages(t).remove(e.id);
        return this._setMarker(e);
    };
    UnreadMessages.prototype.hasUnreadMessages = function(e) {
        return this.getUnreadMessages(e).length > 0;
    };
    UnreadMessages.prototype.clearUnread = function(e) {
        return this.getUnreadMessages(e).reset();
    };
    UnreadMessages.prototype.getUnreadMessages = function(e) {
        if (e === "chat") {
            return this.chat;
        }
        if (e === "inbox") {
            return this.inbox;
        }
        return;
    };
    UnreadMessages.prototype._firstUnread = function(e) {
        return this.getUnreadMessages(e).first();
    };
    UnreadMessages.prototype.needsEyeTracking = function(e) {
        var t, n;
        if ((n = Flowdock.app.markers) != null) {
            t = n.getMarker(this.flow, this._getMessageApp(e));
        } else {
            t = undefined;
        }
        return !t || t < e.id;
    };
    UnreadMessages.prototype.maybeUpdateMarkerWithPeakValue = function(e) {
        var t, n, r, o, i;
        if (!this.hasUnreadMessages(e) && (t = (n = Flowdock.app) != null && (r = n.peaks) != null && (o = r.get(this.flow.id)) != null ? o.get(e) : undefined) && (i = Flowdock.app.markers) != null) {
            return i.setMarker(this.flow, t, e);
        }
        return;
    };
    UnreadMessages.prototype.destructor = function() {
        this.chat.end();
        this.inbox.end();
        this.end.push("end");
        this.end.end();
        return this.chat = this.inbox = this.end = null;
    };
    UnreadMessages.prototype._messageIsFromCurrentUser = function(e) {
        return Flowdock.app.user && e.user && Flowdock.app.user.id.toString() === e.user.toString();
    };
    UnreadMessages.prototype._getMessageApp = function(e) {
        var t;
        t = (typeof e.get == "function" ? e.get("app") : undefined) || e.app;
        if (t === "influx") {
            return "inbox";
        }
        return t;
    };
    UnreadMessages.prototype._setMarker = function(e) {
        var t, n;
        t = this._getMessageApp(e);
        if (this._needsMarkerChange(e) && (n = Flowdock.app.markers) != null) {
            return n.setMarker(this.flow, e.id, t);
        }
        return;
    };
    UnreadMessages.prototype._needsMarkerChange = function(e) {
        var t, n;
        t = this._getMessageApp(e);
        return !(e.id <= ((n = Flowdock.app.markers) != null ? n.getMarker(this.flow, t) : undefined) || this._firstUnread(t) != null && e.id > this._firstUnread(t));
    };
    UnreadMessages.prototype._ignoredChatMessages = function(e) {
        var t;
        return !(e.event === "user-edit" || e.event === "action" && ((t = e.content.type) === "join" || t === "add_people"));
    };
    return UnreadMessages;
}();
