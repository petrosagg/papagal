var r, o = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, i = function(e, t) {
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
}, s = {}.hasOwnProperty, a = [].slice, u = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = require("models/user_presence");

Collections.Users = function(e) {
    function Users() {
        this.handleMessage = o(this.handleMessage, this);
        return Users.__super__.constructor.apply(this, arguments);
    }
    i(Users, e);
    Users.TYPING_TIMEOUT = 3e4;
    Users.prototype.model = Models.User;
    Users.prototype.url = function() {
        if (this.flow) {
            return this.flow.url() + "/users";
        }
        return Helpers.apiUrl("/users");
    };
    Users.prototype.initialize = function() {
        var e, n;
        this._fetching = null;
        e = function(e, t, n) {
            return [ e, t, n ];
        };
        n = this.asEventStream("typing", e).scan({}, function(e, t) {
            var n, r, o, i;
            i = t[0];
            o = t[1];
            r = t[2];
            if (r === false) {
                return _.omit(e, String(i.id));
            }
            n = {};
            n[i.id] = {
                user: i,
                time: o,
                id: r
            };
            return _.extend({}, e, n);
        });
        return this.typing = n.combine(n.delay(Users.TYPING_TIMEOUT), function(e, t) {
            var n, r, o, i;
            o = [];
            for (i in e) {
                n = e[i];
                if (n.time > (((r = t[i]) != null ? r.time : undefined) || 0)) {
                    o.push(n)
                };
            }
            return o;
        }).skipDuplicates(_.isEqual).changes().toProperty([]);
    };
    Users.prototype.consume = function(e) {
        if (this.stream) {
            throw new Error("Users collection is already subscribed to a stream");
        }
        this.stream = e;
        this.addStream(this.stream.onValue(this.handleMessage));
        return this.addStream(this.updateFlowUser(this.stream.filter(function(e) {
            return e.event === "user-change";
        })));
    };
    Users.prototype.updateFlowUser = function(e) {
        return e.filter(function(e) {
            return function(t) {
                return e.get(t.user);
            };
        }(this)).onValue(function(e) {
            return function(t) {
                var n, r, o, i;
                i = e.get(t.user);
                n = t.content;
                i.set(_.omit(n, "team_notifications", "in_flow"));
                o = n.team_notifications;
                i.set({
                    in_flow: n.in_flow
                });
                if (null !== o && (i.set("team_notifications", o), Flowdock.app.user.id.toString() === i.id.toString()) && (r = e.flow) != null) {
                    return r.set("team_notifications", o);
                }
                return;
            };
        }(this));
    };
    Users.prototype.handleMessage = function(e) {
        var t, n;
        if (typeof (t = Collections.Users.messageHandlers)[n = e.event] == "function") {
            return t[n](this, e);
        }
        return;
    };
    Users.unsetTyping = function(e, t) {
        var n;
        n = e.get(t.user);
        if (n != null) {
            return n.trigger("typing", n, t.sent, false);
        }
        return;
    };
    Users.messageHandlers = {
        "activity.user": function(e, n) {
            var r, o, i;
            if (n.user && (i = e.get(n.user), i != null)) {
                r = Users.currentTimestamp();
                o = n.content;
                if (o.typing != null && i.id !== Flowdock.app.user.id) {
                    return i.trigger("typing", i, r, o.typing);
                }
                return;
            }
        },
        "backend.rejoin.user": function(e, t) {
            var n, r;
            n = t.content.user.id;
            if ((r = e.get(n)) != null) {
                r.set({
                    disabled: false
                })
            };
            return e.trigger("rejoin");
        },
        "backend.join.user": function(e, t) {
            return e.add(new Models.User(t.content.user));
        },
        "backend.user.block": function(e, t) {
            var n, r;
            n = Number(t.content);
            if ((r = e.get(n)) != null) {
                return r.set({
                    disabled: true
                });
            }
            return;
        },
        "user-edit": function(e, t) {
            var n, r;
            n = t.content.user.id;
            if ((r = e.get(n)) != null) {
                return r.set(t.content.user);
            }
            return;
        },
        message: Users.unsetTyping,
        comment: Users.unsetTyping,
        status: function(e, t) {
            var n, r;
            n = Number(t.user);
            if ((r = e.get(n)) != null) {
                return r.set({
                    status: t.content
                });
            }
            return;
        }
    };
    Users.prototype.startingWith = function(e) {
        if (e) {
            e = e.toLowerCase();
            return this.filter(function(t) {
                var n, r;
                n = [ t.get("email"), t.get("nick") ].concat(function() {
                    var e, n, o, i;
                    for (o = t.get("name").split(" "), i = [], e = 0, n = o.length; n > e; e++) {
                        r = o[e];
                        if (r.length) {
                            i.push(r)
                        };
                    }
                    return i;
                }());
                return _.any(n, function(t) {
                    return t.toLowerCase().indexOf(e.toLowerCase()) === 0;
                });
            });
        }
        return [];
    };
    Users.prototype.enabled = function() {
        return this.filter(function(e) {
            return e.enabled();
        });
    };
    Users.prototype.available = function() {
        if (this.flow.isFlow()) {
            return this.filter(function(e) {
                return e.available();
            });
        }
        return this.enabled();
    };
    Users.prototype.online = function() {
        return this.byState("active", "idle");
    };
    Users.prototype.byState = function() {
        var e;
        if (arguments.length >= 1) {
            e = a.call(arguments, 0);
        } else {
            e = [];
        }
        return this.filter(function(t) {
            var n;
            return t.available() && (n = t.presence(), u.call(e, n) >= 0);
        });
    };
    Users.prototype.notifiableByTeam = function() {
        return this.filter(function(e) {
            return e.available() && e.get("team_notifications");
        });
    };
    Users.prototype.getOrAdd = function(e) {
        var t;
        t = this.get(e);
        if (t == null) {
            t = new Models.User({
                id: e
            }), this.add(t), this.singleFetch()
        };
        return t;
    };
    Users.prototype.singleFetch = function() {
        var e;
        if (this._fetching != null) {
            return this._fetching.promise();
        }
        this._fetching = new $.Deferred();
        e = function(e) {
            return function() {
                e._fetching.resolve();
                return e._fetching = null;
            };
        }(this);
        this.fetch({
            success: e,
            error: e
        });
        return this._fetching.promise();
    };
    Users.prototype.comparator = function(e) {
        var t;
        if ((t = e.nick()) != null && typeof t.toLowerCase == "function") {
            return t.toLowerCase();
        }
        return;
    };
    Users.currentTimestamp = function() {
        return new Date().getTime();
    };
    Users.prototype.userPresenceUpdates = function() {
        if (Flowdock.app.presence != null) {
            return this.untilEnd(Flowdock.app.presence.asEventStream("change add")).map(".id").filter(this, "get");
        }
        return Bacon.never();
    };
    Users.prototype.usersPropertyByState = function() {
        var e;
        if (arguments.length >= 1) {
            e = a.call(arguments, 0);
        } else {
            e = [];
        }
        return Bacon.mergeAll([ this.userPresenceUpdates(), this.untilEnd(this.asEventStream("add change")).map(".id"), this.untilEnd(this.asEventStream("remove").map(".id").map(function(e) {
            return {
                remove: e
            };
        })), this.untilEnd(this.asEventStream("reset").flatMapLatest(function(e) {
            return function() {
                return Bacon.fromArray(e.pluck("id"));
            };
        }(this))) ]).scan(this.byState.apply(this, e), function(t) {
            return function(n, r) {
                var o, i, s, a, l;
                if (r.remove != null) {
                    l = undefined;
                    r = r.remove;
                } else {
                    l = t.get(r);
                }
                if (l != null) {
                    a = l.presence();
                } else {
                    a = undefined;
                }
                i = u.call(e, a) >= 0;
                o = l != null && l.available();
                if (o && i && !_.find(n, function(e) {
                    return e.id === r;
                })) {
                    n = [ l ].concat(n);
                } else {
                    o && i || (s = _.findIndex(n, function(e) {
                        return e.id === r;
                    }), s < 0 || (n = n.slice(0, s).concat(n.slice(s + 1))));
                }
                return n;
            };
        }(this));
    };
    return Users;
}(Flowdock.Collection);
