var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, o = function(e, t) {
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

Collections.PrivateConversations = function(e) {
    function PrivateConversations() {
        this._onNewPrivateConversation = r(this._onNewPrivateConversation, this);
        return PrivateConversations.__super__.constructor.apply(this, arguments);
    }
    o(PrivateConversations, e);
    PrivateConversations.prototype.model = Models.PrivateConversation;
    PrivateConversations.prototype.initialize = function(e, t) {
        if (t.privatesEmojis) {
            e.forEach(function(e) {
                var n;
                n = _.unique(_.flatten(_.map(e.users, function(e) {
                    return e.organization_ids;
                })));
                return e.emoji = _.flatten(_.map(n, function(e) {
                    return t.privatesEmojis[e];
                }));
            })
        };
        return this.user = t.user;
    };
    PrivateConversations.prototype.url = function() {
        return Helpers.apiUrl("/private?open=1");
    };
    PrivateConversations.prototype.uniqueName = function(e) {
        var t;
        t = this.find(function(t) {
            return e !== t && t.get("open") && t.get("name") === e.get("name");
        });
        if (t) {
            return e.otherParty().get("name");
        }
        return e.get("name");
    };
    PrivateConversations.prototype.consume = function(e) {
        this.stream = e;
        this.each(function(e) {
            return e.consume(this.stream);
        }, this);
        return this.addStream(this.stream.filter(function(e) {
            return function(t) {
                var n;
                return t.to && !((n = t.event) === "tag-change" || n === "activity.user" || n === "message-receive") && !e.get(e._otherUserId([ t.user, t.to ]));
            };
        }(this)).onValue(this._onNewPrivateConversation));
    };
    PrivateConversations.prototype.withUser = function(e) {
        if (!(e instanceof Models.User)) {
            e = Flowdock.app.users.get(e) || new Models.User({
                id: Number(e)
            })
        };
        return this.get(e.id) || this._build(e);
    };
    PrivateConversations.prototype._onNewPrivateConversation = function(e) {
        var t;
        t = new Models.User({
            id: this._otherUserId([ e.user, e.to ])
        });
        return this._build(t, e);
    };
    PrivateConversations.prototype._build = function(e, t) {
        var n, r, o, i;
        if (t == null) {
            t = null
        };
        if (NaN === e.id || e.id == null || e.id === this.user.id) {
            throw new Error("Invalid user");
        }
        o = {
            id: e.id,
            name: e.get("nick") || "…",
            users: [ e, this.user ],
            open: true
        };
        i = function() {
            return n.fullyLoaded.resolve();
        };
        r = function(e, t) {
            return n.fullyLoaded.reject(t.status === 404 ? "private-not-found" : undefined);
        };
        n = this.push(new Models.PrivateConversation(o));
        n.save({}, {
            success: i,
            error: r
        });
        if (this.stream != null) {
            n.consume(this._withInitialMessage(this.stream, t))
        };
        return n;
    };
    PrivateConversations.prototype._withInitialMessage = function(e, t) {
        if (t != null) {
            return Bacon.later(0, t).merge(e);
        }
        return e;
    };
    PrivateConversations.prototype._otherUserId = function(e) {
        var t;
        return function() {
            var n, r, o;
            for (o = [], n = 0, r = e.length; r > n; n++) {
                t = e[n];
                if (t != null && String(t) !== String(this.user.id)) {
                    o.push(Number(t))
                };
            }
            return o;
        }.call(this)[0];
    };
    PrivateConversations.prototype.cleanup = function() {
        this.each(function(e) {
            return e.cleanup();
        });
        PrivateConversations.__super__.cleanup.apply(this, arguments);
        return this.user = undefined;
    };
    PrivateConversations.prototype.forMessage = function(e) {
        if (String(e.get("to")) === String(this.user.id)) {
            return this.withUser(e.get("user"));
        }
        return this.withUser(e.get("to"));
    };
    PrivateConversations.prototype.fetch = function(e) {
        var n;
        if (e == null) {
            e = {}
        };
        n = e.success;
        return PrivateConversations.__super__.fetch.call(this, _.extend(e, {
            success: function(e) {
                return function(t, r) {
                    var o, i, s, a, u;
                    for (a = function() {
                        var e, n, o;
                        for (o = [], e = 0, n = r.length; n > e; e++) {
                            u = r[e];
                            o.push(t.get(u.id));
                        }
                        return o;
                    }(), o = 0, i = a.length; i > o; o++) {
                        s = a[o];
                        if (!s.consumed) {
                            s.consume(e.stream), s.fullyLoaded.resolve()
                        };
                    }
                    if (_.isFunction(n)) {
                        return n(t, r);
                    }
                    return;
                };
            }(this)
        }));
    };
    return PrivateConversations;
}(Flowdock.Collection);
