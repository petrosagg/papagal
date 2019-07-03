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

Models.Flow = function(e) {
    function Flow(e, n) {
        if (e == null) {
            e = {}
        };
        if (n == null) {
            n = {}
        };
        this.eventStreamFilter = r(this.eventStreamFilter, this);
        this.isReadUpdateMessage = r(this.isReadUpdateMessage, this);
        this._embedded = n.embedded !== false;
        if (this._embedded) {
            this.users = new Collections.Users([], {
                flow: this
            });
            this.unreadMessages = new Flowdock.UnreadMessages({
                flow: this
            });
            this.tags = new Collections.Tags([], {
                flow: this
            });
            this.invitations = new Collections.Invitations([], {
                flow: this
            });
            this.emoji = new Collections.Emoji([], {
                flow: this
            });
            this.fullyLoaded = new $.Deferred();
            this.legacySources = new Collections.LegacySources([], {
                flow: this
            });
            this.sources = new Collections.Sources([], {
                flow: this
            });
            this.integrations = new Collections.Integrations([], {
                flow: this
            });
            this.groups = new Collections.FlowGroups(e.flow_groups || [], {
                flow: this
            });
        };
        Flow.__super__.constructor.apply(this, arguments);
    }
    o(Flow, e);
    Flow.prototype.isFlow = function() {
        return true;
    };
    Flow.prototype.isPrivate = function() {
        return false;
    };
    Flow.prototype.url = function() {
        return Helpers.apiUrl(this.get("url") || Helpers.apiUrl("/flows/" + this.path()));
    };
    Flow.prototype.email = function() {
        return this.get("email");
    };
    Flow.prototype.initialize = function(e, t) {
        if (t == null) {
            t = {}
        };
        this.stream = new Bacon.Bus();
        this.subscriptions = [];
        if (t.embedded !== false) {
            return this.subscriptions.push(this.stream.filter(function(e) {
                return e.event.indexOf("open-invitation-") === 0;
            }).onValue(function(e) {
                return function(t) {
                    if (t.event === "open-invitation-enable") {
                        return e.set("join_url", t.content.url);
                    }
                    if (t.event === "open-invitation-disable") {
                        return e.unset("join_url");
                    }
                    return;
                };
            }(this)));
        }
        return;
    };
    Flow.prototype.getUserById = function(e) {
        return this.users.get(e);
    };
    Flow.prototype.me = function() {
        return this.users.get(Flowdock.app.user.id);
    };
    Flow.prototype.path = function() {
        if (this.get("url")) {
            return this.get("url").split("/").slice(-2).join("/");
        }
        return this.get("organization_subdomain");
    };
    Flow.prototype.fullName = function() {
        return this.get("name") + " (" + this.get("organization").name + ")";
    };
    Flow.prototype.organization = function() {
        return this.get("organization").id;
    };
    Flow.prototype.consume = function(e) {
        if (this._embedded) {
            this.tags.consume(this.stream);
            this.users.consume(this.stream);
            this.invitations.consume(this.stream);
            this.legacySources.consume(this.stream);
            this.emoji.consume(this.stream);
            this.sources.consume(this.stream);
            this.unreadMessages.consume(this.stream);
            this.groups.consume(this.stream);
            this.stream.plug(e.filter(this.eventStreamFilter));
        };
        return this;
    };
    Flow.prototype.subscribe = function(e) {
        e.subscribe(this.id, true, function(e) {
            return function(t, n) {
                console.log("Subscribed to flow", e.path(), t, n);
                if (t) {
                    e.trigger("subscribe-failed", e);
                } else {
                    e.set(e.parse(_.extend(n, {
                        open: true
                    })));
                }
                if (t) {
                    return e.fullyLoaded.reject();
                }
                return e.fullyLoaded.resolve();
            };
        }(this));
        return this.fullyLoaded.promise();
    };
    Flow.prototype.unsubscribe = function(e) {
        e.unsubscribe(this.id, true);
        return this.reset();
    };
    Flow.prototype.buildMessage = function(e, t) {
        if (t == null) {
            t = Models.Message
        };
        return new t(_.extend({
            flow: this.id
        }, e));
    };
    Flow.prototype.cleanup = function() {
        var e, t, n, r, o, i, s, a, u, l, c;
        for (n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
            (c = n[e])();
        }
        if ((r = this.tags) != null) {
            r.cleanup()
        };
        if ((o = this.users) != null) {
            o.cleanup()
        };
        if ((i = this.invitations) != null) {
            i.cleanup()
        };
        if ((s = this.legacySources) != null) {
            s.cleanup()
        };
        if ((a = this.emoji) != null) {
            a.cleanup()
        };
        if ((u = this.sources) != null) {
            u.cleanup()
        };
        if ((l = this.unreadMessages) != null) {
            l.destructor()
        };
        this.tags = null;
        this.users = null;
        this.invitations = null;
        this.legacySources = null;
        this.emoji = null;
        this.sources = null;
        this.subscriptions = [];
        return this.unreadMessages = null;
    };
    Flow.prototype.reset = function() {
        if (this.fullyLoaded.state() === "pending") {
            this.fullyLoaded.reject()
        };
        this.fullyLoaded = new $.Deferred();
        this.tags.reset();
        this.users.reset();
        this.invitations.reset();
        this.legacySources.reset();
        this.emoji.reset();
        this.sources.reset();
        return this.trigger("flow-unloaded", this);
    };
    Flow.prototype.set = function(e, n) {
        var r, o, i, s, a, u, l, c, p, d, h, f, m, g, v, b;
        if (n == null) {
            n = {}
        };
        if (e.users && (a = this.users) != null) {
            a.reset(e.users)
        };
        if (e.tags && (u = this.tags) != null) {
            u.reset(function() {
                var t, n;
                t = e.tags;
                n = [];
                for (v in t) {
                    r = t[v];
                    n.push({
                        id: v,
                        count: r
                    });
                }
                return n;
            }())
        };
        if (e.invitations && (l = this.invitations) != null) {
            l.reset(e.invitations)
        };
        if (e.emoji && (c = this.emoji) != null) {
            c.reset(e.emoji)
        };
        if (e.sources && (p = this.sources) != null) {
            p.reset(e.sources)
        };
        if (e.integrations && (d = this.integrations) != null) {
            d.reset(e, {
                parse: true
            })
        };
        if (e.flow_groups && (h = this.groups) != null) {
            h.reset(e.flow_groups)
        };
        delete e.tags;
        delete e.users;
        delete e.invitations;
        delete e.sources;
        delete e.emoji;
        delete e.integrations;
        if (e != null && (f = e.url) != null && f.match(/https?:\/\/api\./)) {
            b = e.url.replace("api.", "www.");
            if ((m = b.match(/https?:\/\/[\w\.]+(?=\/)/)) != null) {
                s = m[0];
            } else {
                s = undefined;
            }
            if (s != null) {
                e.url = b.replace(s, s + "/rest")
            };
        };
        if ((e != null ? e.url : undefined) != null && e.url !== this.get("url") && this.get("_links") != null && e._links == null) {
            g = this.get("_links");
            for (o in g) {
                i = g[o];
                if (i.href != null) {
                    i.href = i.href.replace(this.get("url"), e.url)
                };
            }
        }
        return Flow.__super__.set.apply(this, arguments);
    };
    Flow.prototype.isReadUpdateMessage = function(e) {
        return e.content != null && e.content.read != null && e.content.read.flows != null && e.content.read.flows[this.id];
    };
    Flow.prototype.eventStreamFilter = function(e) {
        return e.flow === this.id || this.isReadUpdateMessage(e);
    };
    Flow.prototype.typingUsers = function(e) {
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
    Flow.prototype.enableJoinUrl = function() {
        if (this.can("post", "join_url")) {
            return $.ajax(this.resourceUrl("join_url"), {
                dataType: "json",
                type: "POST",
                success: function(e) {
                    return function(t) {
                        return e.set("join_url", t.join_url);
                    };
                }(this)
            });
        }
        return new $.Deferred().reject();
    };
    Flow.prototype.disableJoinUrl = function() {
        if (this.can("delete", "join_url")) {
            return this.fullyLoaded.then(function(e) {
                return function() {
                    var t;
                    t = e.get("join_url");
                    e.unset("join_url");
                    return $.ajax(e.resourceUrl("join_url"), {
                        type: "POST",
                        data: {
                            _method: "delete"
                        },
                        error: function() {
                            return e.set({
                                join_url: t
                            });
                        }
                    });
                };
            }(this));
        }
        return new $.Deferred().reject();
    };
    Flow.prototype.combinedAccessMode = function() {
        return this.get("access_mode") + ";" + (this.has("join_url") ? "link" : "no-link");
    };
    Flow.prototype.resetToken = function() {
        return $.post(this.resourceUrl("api_token")).done(function(e) {
            return function(t) {
                return e.set("api_token", t.api_token);
            };
        }(this));
    };
    Flow.prototype.renameUrl = function() {
        return this.get("url") + "/rename";
    };
    Flow.prototype.rename = function(e, t) {
        var n;
        if (t == null) {
            t = false
        };
        n = {
            flow: {
                name: e
            }
        };
        if (t) {
            n.flow.parameterized_name = t
        };
        return $.ajax({
            url: this.renameUrl(),
            type: "put",
            data: n,
            dataType: "json"
        });
    };
    Flow.prototype.emojiKeys = function() {
        return this.emoji.keys();
    };
    Flow.prototype.initials = function() {
        var e, t;
        t = emojimoji(this.get("name")).split(" ").map(function(e) {
            return e.replace(/[\W_]/g, "");
        }).filter(function(e) {
            return e.length;
        });
        return e = t.length === 0 ? [ "" ] : t.length === 1 ? [ t[0][0], t[0][1] ] : t.length > 1 ? t.slice(0, 2).map(function(e) {
            return e[0];
        }) : undefined;
    };
    Flow.prototype.receivesTeamNotifications = function() {
        return this.get("team_notifications") !== false;
    };
    return Flow;
}(Backbone.Model);
