var r, o, i, s, a, u = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (l.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, l = {}.hasOwnProperty;

i = function(e) {
    return e.app != null && e.id != null;
};

s = function(e) {
    return e.event === "tag-change";
};

a = function(e) {
    var t;
    t = ":unread:" + e;
    return function(e) {
        return e.indexOf(t) >= 0;
    };
};

r = function(e) {
    var t;
    t = a(e);
    return function(e) {
        var n;
        n = e.message.get != null ? e.message.get("tags") : e.message.tags || [];
        e.unread = t(n);
        return e;
    };
};

o = function(e) {
    return function(t) {
        return String(t.user) !== String(e) || _.all(t.tags, function(e) {
            return ":user:everyone" !== e && ":user:team" !== e;
        });
    };
};

Collections.NotificationItems = function(e) {
    function NotificationItems() {
        return NotificationItems.__super__.constructor.apply(this, arguments);
    }
    u(NotificationItems, e);
    NotificationItems.prototype.model = Models.NotificationItem;
    NotificationItems.prototype.url = Helpers.apiUrl("/notifications/mentions");
    NotificationItems.rawItemFromMessage = function(e) {
        var t;
        e instanceof Models.Message || (e = new Models.Message(e));
        t = e.get("to") != null ? [ e.id ] : [];
        return {
            id: Models.NotificationItem.generateId(e),
            message: e,
            unreads: t
        };
    };
    NotificationItems.findFlowMessage = function(e, t) {
        var n, r, o;
        r = (o = Flowdock.app.manager.findMessage(e, t)) != null ? o.toJSON() : undefined;
        if (r != null) {
            n = new Models.Message(r);
        } else {
            n = new Models.Message({
                id: t,
                flow: e
            });
            n.fetch();
        }
        return n;
    };
    NotificationItems.prototype.initialize = function(e, n) {
        this.userId = n.userId;
        this.listenTo(this, "remove-mention", function(e) {
            return this.remove(e);
        });
        this.historyComplete = {
            forward: true,
            backward: false
        };
        this.resyncs = new Bacon.Bus();
        this.bufferMutations = this.resyncs.flatMapLatest(function(e) {
            return Bacon.mergeAll(Bacon.once(true), Bacon.fromPromise(e).map(false).mapError(false));
        }).skipDuplicates().toProperty(false);
        this.untilEnd(this.resyncs).flatMapLatest(function(e) {
            return Bacon.fromPromise(e).errors().mapError();
        }).delay(5e3).onValue(this, "resync");
        return NotificationItems.__super__.initialize.apply(this, arguments);
    };
    NotificationItems.prototype.consume = function(e, n, u) {
        var l, c, p, d, h, f, m, g, v;
        for (c = this.untilEnd(e), this.stream = this.bufferMutations.flatMapLatest(function(e) {
            return function(t) {
                var n, r;
                if (t) {
                    e._buffer = [];
                    c.takeUntil(e.bufferMutations.filter(function(e) {
                        return !e;
                    })).onValue(function(t) {
                        return e._buffer.push(t);
                    });
                    return Bacon.never();
                }
                n = ((r = e._buffer) != null ? r.slice() : undefined) || [];
                e._buffer = [];
                return Bacon.fromArray(n).merge(c);
            };
        }(this)), v = function(e) {
            var t;
            if ((t = u.get(e.flow)) != null) {
                return t.receivesTeamNotifications();
            }
            return;
        }, m = function(e) {
            return function(t) {
                var n;
                n = [ ":user:" + e.userId, ":unread:" + e.userId, ":user:everyone" ];
                if (v(t)) {
                    n.push(":user:team")
                };
                return n;
            };
        }(this), this.stream.filter(i).filter(function(e) {
            return _.intersection(e.tags, m(e)).length > 0;
        }).filter(o(this.userId)).map(NotificationItems.rawItemFromMessage).map(r(this.userId)).onValue(this, "addNewItem"), 
        this.stream.filter(s).filter(function(e) {
            return _.intersection(e.content.add, m(e)).length > 0;
        }).map(function(e) {
            return function(t) {
                return {
                    message: t.content.message,
                    flow: t.flow,
                    unread: a(e.userId)(t.content.add)
                };
            };
        }(this)).map(function(e) {
            var n, r, o;
            r = e.message;
            n = e.flow;
            o = e.unread;
            return {
                message: NotificationItems.findFlowMessage(n, r),
                unread: o
            };
        }).map(function(e) {
            var n, r, o;
            r = e.message;
            o = e.unread;
            n = NotificationItems.rawItemFromMessage(r);
            n.unread = o;
            return n;
        }).onValue(this, "addNewItem"), this.untilEnd(n).filter(_.identity).filter(".isPrivate").map(".id").map(this, "_buildId").map(this, "get").filter(_.identity).delay(2e3).filter(".unreadCount").onValue(function(e) {
            e.flow().opened();
            return e.markAsRead(false);
        }), g = this.stream.filter(function(e) {
            var t;
            t = e.event;
            return t === "notification-center-update";
        }), g.filter(function(e) {
            var t;
            t = e.content;
            return t.type === "mark-all-read";
        }).onValue(this, "markAllRead", false), g.filter(function(e) {
            var t;
            t = e.content;
            return t.type === "mark-as-read";
        }).map(".content").map(".item").onValue(this, "markAsRead"), h = this.models, f = [], 
        l = 0, p = h.length; p > l; l++) {
            d = h[l];
            f.push(d.consume(this.stream));
        }
        return f;
    };
    NotificationItems.prototype.markAllRead = function(e) {
        var t, n, r, o;
        for (e == null && (e = true), o = this.models, t = 0, n = o.length; n > t; t++) {
            r = o[t];
            if (r.isUnread()) {
                r.markAsRead(false)
            };
        }
        if (e) {
            return $.ajax({
                url: Helpers.apiUrl("/notifications/unreads"),
                method: "DELETE"
            });
        }
        return;
    };
    NotificationItems.prototype.markAsRead = function(e) {
        var t;
        if ((t = this.get(e)) != null) {
            return t.markAsRead(false);
        }
        return;
    };
    NotificationItems.prototype.fetchUnreads = function(e) {
        if (e == null) {
            e = {}
        };
        return this.fetch({
            add: false,
            remove: false,
            merge: false,
            url: Helpers.apiUrl("/notifications/unreads"),
            success: function(e) {
                return function(t, n) {
                    var r, o, i, s;
                    for (r = 0, i = n.length; i > r; r++) {
                        o = n[r];
                        o.unread = true;
                    }
                    s = e.add(n, {
                        silent: true,
                        parse: true,
                        at: 0,
                        userId: e.userId
                    });
                    if (s.length > 0) {
                        return e.trigger("historyAdd", s);
                    }
                    return;
                };
            }(this),
            error: e.error
        });
    };
    NotificationItems.prototype.fetchMentions = function(e) {
        var t;
        if (e == null) {
            e = {}
        };
        t = {
            limit: e.limit || 30,
            before_id: this.lastMentionId
        };
        return this.fetch({
            add: false,
            remove: false,
            merge: false,
            data: t,
            success: function(n) {
                return function(r, o) {
                    var i, s, a, u;
                    n.lastMentionId = (u = _.last(o)) != null ? u.id : undefined;
                    a = function() {
                        var e, t, n;
                        for (n = [], e = 0, t = o.length; t > e; e++) {
                            i = o[e];
                            if (this.get(i.id) == null) {
                                n.push(i)
                            };
                        }
                        return n;
                    }.call(n);
                    s = n.add(a, {
                        silent: true,
                        parse: true,
                        userId: n.userId
                    });
                    if (o.length < t.limit) {
                        n.historyComplete.backward = true, n.trigger("historyComplete", "backward")
                    };
                    n.trigger("historyAdd", s);
                    if (e.success != null) {
                        return e.success(s);
                    }
                    return;
                };
            }(this),
            error: e.error
        });
    };
    NotificationItems.prototype._addReference = function(e, n) {
        NotificationItems.__super__._addReference.apply(this, arguments);
        if (this.stream != null) {
            return e.consume(this.stream);
        }
        return;
    };
    NotificationItems.prototype._removeReference = function(e, n) {
        NotificationItems.__super__._removeReference.apply(this, arguments);
        e.unconsume();
        return e.cleanup();
    };
    NotificationItems.prototype.hasUnreads = function() {
        return this.findWhere({
            unread: true
        }) != null;
    };
    NotificationItems.prototype.addNewItem = function(e) {
        var t, n;
        if (t = this.get(e.id)) {
            this.remove(t, {
                silent: true
            });
            this.add(t, {
                at: 0,
                silent: true
            });
            n = t.get("unreads");
            t.set({
                unread: e.unread
            });
            t.set({
                unreads: n.concat(e.unreads)
            });
            t.get("message").set(e.message.toJSON());
            t.trigger("change:message", t, t.get("message"));
        } else {
            t = this.add(e, {
                at: 0,
                userId: this.userId
            });
        }
        return this.trigger("reorder", t, 0);
    };
    NotificationItems.prototype.cleanup = function() {
        var e;
        if ((e = this.resyncs) != null) {
            e.end()
        };
        this.each(function(e) {
            return e.cleanup();
        });
        this.bufferMutations = null;
        this.resyncs = null;
        return NotificationItems.__super__.cleanup.apply(this, arguments);
    };
    NotificationItems.prototype.resync = function() {
        var e;
        this.reset();
        this.lastMentionId = undefined;
        this.historyComplete = {
            forward: true,
            backward: false
        };
        e = this.fetchUnreads();
        this.resyncs.push(e);
        return e;
    };
    NotificationItems.prototype.unreadCount = function(e) {
        var t, n;
        if (e != null) {
            if (e.isPrivate()) {
                t = this._buildId(e.id);
                return ((n = this.get(t)) != null ? n.unreadCount() : undefined) || 0;
            }
            return _.filter(this.where({
                unread: true
            }), function(t) {
                return t.id.indexOf("flow:" + e.id + ":") === 0;
            }).length;
        }
        return this.where({
            unread: true
        }).length;
    };
    NotificationItems.prototype.unreadProperty = function(e) {
        if (e != null && e.isPrivate()) {
            return this._privateUnreadProperty(e);
        }
        return this.untilEnd(this.asEventStream("update reset change:unread historyAdd")).map(this, "unreadCount", e).skipDuplicates().toProperty(this.unreadCount(e));
    };
    NotificationItems.prototype.unreadMentionCount = function() {
        return _.filter(this.where({
            unread: true
        }), function(e) {
            return e.isMention();
        }).length;
    };
    NotificationItems.prototype._privateUnreadProperty = function(e) {
        var t, n;
        t = this._buildId(e.id);
        return this.untilEnd(this.asEventStream("update reset change:unreads change:unread historyAdd")).map(function(e) {
            return function() {
                var n;
                return ((n = e.get(t)) != null ? n.unreadCount() : undefined) || 0;
            };
        }(this)).skipDuplicates().mapEnd(0).toProperty(((n = this.get(t)) != null ? n.unreadCount() : undefined) || 0);
    };
    NotificationItems.prototype._buildId = function(e) {
        return "private:" + _.sortBy([ "" + e, "" + this.userId ]).join(":");
    };
    return NotificationItems;
}(Flowdock.Collection);

Collections.NotificationItems.prototype.fetchHistory = Collections.NotificationItems.prototype.fetchMentions;
