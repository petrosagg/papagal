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

Models.PrivateConversation = function(e) {
    function PrivateConversation(e) {
        if (e == null) {
            e = {}
        };
        this.eventStreamFilter = r(this.eventStreamFilter, this);
        this.users = new Collections.Users(e.users || [], {
            flow: this
        });
        this.tags = new Collections.Tags([], {
            flow: this
        });
        this.emoji = new Collections.Emoji([], {
            flow: this
        });
        this.subscriptions = [];
        this.unreadMessages = new Flowdock.UnreadMessages({
            flow: this
        });
        PrivateConversation.__super__.constructor.apply(this, arguments);
    }
    o(PrivateConversation, e);
    PrivateConversation.prototype.isFlow = function() {
        return false;
    };
    PrivateConversation.prototype.isPrivate = function() {
        return true;
    };
    PrivateConversation.prototype.defaults = function() {
        return {
            open: true
        };
    };
    PrivateConversation.prototype.path = function() {
        return "private/" + this.id;
    };
    PrivateConversation.prototype.url = function() {
        if (this.get("url")) {
            return Helpers.apiUrl(this.get("url"));
        }
        return Helpers.apiUrl("/private/" + this.id);
    };
    PrivateConversation.prototype.getUserById = function(e) {
        return this.users.get(e);
    };
    PrivateConversation.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.consumed = false;
        this.stream = new Bacon.Bus();
        this.fullyLoaded = $.Deferred();
        return this.listenTo(this.users, "change:nick", this._onNickChange);
    };
    PrivateConversation.prototype.consume = function(e) {
        var t;
        this.consumed = true;
        t = this.asEventStream("change:open").merge(Bacon.once(this)).flatMapLatest(function(t) {
            if (t.get("open")) {
                return e.filter(function(e) {
                    var n;
                    return String(e.user) === String(t.id) && ((n = e.event) === "activity.user" || n === "message" || n === "user-edit");
                });
            }
            return Bacon.never();
        });
        this.users.consume(t);
        this.stream.plug(e.filter(this.eventStreamFilter));
        this.subscriptions.push(this.stream.filter(function(e) {
            var t;
            return !((t = e != null ? e.event : undefined) === "tag-change" || t === "activity.user" || t === "message-receive");
        }).onValue(function(e) {
            return function(t) {
                if (e.get("open")) {
                    return undefined;
                }
                return e.save({
                    open: true
                }, {
                    wait: true,
                    patch: true
                });
            };
        }(this)));
        this.emoji.consume(e);
        this.tags.consume(this.stream);
        this.unreadMessages.consume(this.stream);
        return this;
    };
    PrivateConversation.prototype._onNickChange = function(e, t) {
        if (this.otherParty().id === Number(e.get("id"))) {
            return this.set("name", t);
        }
        return;
    };
    PrivateConversation.prototype.parse = function(e) {
        var t, n;
        t = function(e, t) {
            var n, r;
            return _.extend({}, e, {
                last_activity: (n = t.get(e.id)) != null ? n.get("last_activity") : undefined,
                last_ping: (r = t.get(e.id)) != null ? r.get("last_ping") : undefined
            });
        };
        this.users.reset(function() {
            var r, o, i, s;
            for (i = e.users, s = [], r = 0, o = i.length; o > r; r++) {
                n = i[r];
                s.push(t(n, this.users));
            }
            return s;
        }.call(this));
        return e;
    };
    PrivateConversation.prototype.buildMessage = function(e, t) {
        if (t == null) {
            t = Models.Message
        };
        return new t(_.extend({
            to: "" + this.id
        }, e, {
            tags: _.uniq((e.tags || []).concat([ ":unread:" + this.id ]))
        }), {
            private: this
        });
    };
    PrivateConversation.prototype.eventStreamFilter = function(e) {
        var t;
        return e.to && ((t = String(this.id)) === String(e.user) || t === String(e.to));
    };
    PrivateConversation.prototype.otherParty = function() {
        return this.users.find(function(e) {
            return function(t) {
                return String(t.id) !== String(e.me().id);
            };
        }(this));
    };
    PrivateConversation.prototype.me = function() {
        return this.collection.user || Flowdock.app.user;
    };
    PrivateConversation.prototype.cleanup = function() {
        var e, t, n, r, o;
        for (n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
            (o = n[e])();
        }
        this.subscriptions = null;
        this.users.cleanup();
        this.tags.cleanup();
        this.emoji.cleanup();
        if ((r = this.unreadMessages) != null) {
            r.destructor()
        };
        this.users = null;
        this.tags = null;
        this.emoji = null;
        return this.unreadMessages = null;
    };
    PrivateConversation.prototype.subscribe = function(e) {
        if (e != null) {
            e.subscribe(this.id, false, function(e) {
                return function(t, n) {
                    console.log("Subscribed to private conversation", e.path(), t, n);
                    if (t) {
                        e.trigger("subscribe-failed", e);
                    } else {
                        e.set(e.parse(_.extend(n, {
                            open: true,
                            subscribed: true
                        })));
                    }
                    if (t) {
                        return e.fullyLoaded.reject();
                    }
                    return e.fullyLoaded.resolve();
                };
            }(this))
        };
        return this.fullyLoaded.promise();
    };
    PrivateConversation.prototype.unsubscribe = function(e) {
        e.unsubscribe(this.id, false);
        return this.reset();
    };
    PrivateConversation.prototype.isBetweenUsers = function(e) {
        var t, n, r;
        for (t = 0, n = e.length; n > t; t++) {
            r = e[t];
            if (!this.users.get(parseInt(r, 10))) {
                return false;
            }
        }
        return true;
    };
    PrivateConversation.prototype.typingUsers = function(e) {
        return this.users.typing.map(function(t) {
            var n, r, o, i;
            for (i = [], r = 0, o = t.length; o > r; r++) {
                n = t[r];
                if (n.id === e) {
                    i.push(n.user)
                };
            }
            return i;
        });
    };
    PrivateConversation.prototype.emojiKeys = function() {
        return this.emoji.keys();
    };
    PrivateConversation.prototype.set = function(e, n) {
        var r, o, i;
        if (n == null) {
            n = {}
        };
        if (e.emoji) {
            this.emoji.reset(e.emoji)
        };
        if (e.tags && (o = this.tags) != null) {
            o.reset(function() {
                var t, n;
                t = e.tags;
                n = [];
                for (i in t) {
                    r = t[i];
                    n.push({
                        id: i,
                        count: r
                    });
                }
                return n;
            }())
        };
        return PrivateConversation.__super__.set.apply(this, arguments);
    };
    PrivateConversation.prototype.reset = function() {
        return this.tags.reset();
    };
    PrivateConversation.prototype.initials = function() {
        return [];
    };
    PrivateConversation.prototype.opened = function() {
        return $.ajax({
            type: "POST",
            url: this.url() + "/opened"
        });
    };
    return PrivateConversation;
}(Backbone.Model);
