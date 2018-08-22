var r, o = function(e, t) {
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

r = require("../lib/trie");

Collections.Tags = function(e) {
    function Tags() {
        return Tags.__super__.constructor.apply(this, arguments);
    }
    o(Tags, e);
    Tags.everyoneTags = [ "@all", "@everybody", "@everyone", "@anybody", "@anyone" ];
    Tags.teamTags = [ "@team" ];
    Tags.prototype.model = Models.Tag;
    Tags.prototype.consume = function(e) {
        var t, n, r, o, i;
        t = e.filter(function(e) {
            return e.id && e.tags;
        });
        i = t.filter(function(e) {
            return e.tags.length > 0;
        }).map(function(e) {
            return e.tags;
        });
        r = t.filter(function(e) {
            return e.event === "tag-change";
        });
        n = r.filter(function(e) {
            return e.content.add.length > 0;
        }).map(function(e) {
            return e.content.add;
        });
        o = r.filter(function(e) {
            return e.content.remove.length > 0;
        }).map(function(e) {
            return e.content.remove;
        });
        this.addStream(n.merge(i).onValue(function(e) {
            return function(t) {
                var n, r, o, i, s;
                for (o = [], n = 0, r = t.length; r > n; n++) {
                    s = t[n];
                    i = e.getOrAdd(s);
                    i ? o.push(i.increment()) : o.push(void 0);
                }
                return o;
            };
        }(this)));
        return this.addStream(o.onValue(function(e) {
            return function(t) {
                var n, r, o, i, s, a;
                for (s = [], o = 0, i = t.length; i > o; o++) {
                    a = t[o];
                    r = e.get(a);
                    r ? (n = r.decrement(), n <= 0 ? s.push(e.remove(r)) : s.push(void 0)) : s.push(void 0);
                }
                return s;
            };
        }(this)));
    };
    Tags.prototype.cleanup = function() {
        Tags.__super__.cleanup.apply(this, arguments);
        return this.trie = null;
    };
    Tags.prototype.initialize = function(e, t) {
        this._buildTrie();
        return this.listenTo(this, "add", function(e) {
            return this.trie.set(e.id, e);
        });
    };
    Tags.prototype.getOrAdd = function(e, t) {
        var n;
        if (t == null) {
            t = Models.Tag.prototype.defaults.count
        };
        n = e.toString().toLowerCase();
        if (Models.Tag.regularTag(n)) {
            return this.get(n) || this.push({
                id: n,
                count: t
            });
        }
        return new Models.Tag({
            id: n,
            flow: this.flow
        });
    };
    Tags.prototype.getByHumanized = function(e) {
        return this.getOrAdd(this.dehumanize(e));
    };
    Tags.prototype.everyone = function() {
        return new Models.Tag({
            id: Models.Tag.userTagFor("everyone")
        });
    };
    Tags.prototype.team = function() {
        return new Models.Tag({
            id: Models.Tag.userTagFor("team")
        });
    };
    Tags.prototype.startingWith = function(e) {
        var t, n, r;
        if (e) {
            r = e[0];
            if ((n = e[0]) === "#" || n === "@") {
                e = e.slice(1)
            };
            e = e.toLowerCase();
            t = [];
            if ("#" !== r) {
                this._matchesEveryone(e) && t.push(this.everyone()), this._matchesTeam(e) && t.push(this.team()), 
                t = t.concat(this._userMatches(e))
            };
            "@" !== r ? t = t.concat(this._tagMatches(e)) : e[0] === "@" && (e = e.slice(1), 
            t = t.concat(this._groupMatches(e)));
            return t.sort(function(t, n) {
                var r, o;
                r = e.length > 0 && t.humanize().slice(1).toLowerCase() === e;
                o = e.length > 0 && n.humanize().slice(1).toLowerCase() === e;
                return o - r || n.get("count") - t.get("count") || t.humanize().toLowerCase().localeCompare(n.humanize().toLowerCase());
            });
        }
        return [];
    };
    Tags.prototype.dehumanize = function(e) {
        var t, n;
        if (e != null) {
            if (Collections.Tags.everyoneTags.indexOf(e.toLowerCase()) >= 0) {
                return Models.Tag.userTagFor("everyone");
            }
            if (Collections.Tags.teamTags.indexOf(e.toLowerCase()) >= 0) {
                return Models.Tag.userTagFor("team");
            }
            if (e.slice(0, 2) === "@@") {
                t = this.flow.groups.getByHandle(e.slice(2))
                if (t != null) {
                    return Models.Tag.groupTagFor(t.get("id"));
                }
            } else {
                if ("@" !== e[0]) {
                    if (e[0] === "#") {
                        return e.slice(1);
                    }
                    return e;
                }
                n = this.flow.users.find(function(t) {
                    return t.get("nick").toLowerCase() === e.slice(1).toLowerCase();
                })
                if (n != null) {
                    return Models.Tag.userTagFor(n.get("id"));
                }
            }
        }
    };
    Tags.prototype.reset = function(e, n) {
        if (e == null) {
            e = []
        };
        if (n == null) {
            n = {}
        };
        Tags.__super__.reset.apply(this, arguments);
        return this._buildTrie();
    };
    Tags.prototype._reset = function() {
        Tags.__super__._reset.apply(this, arguments);
        return this._byId = Object.create(null);
    };
    Tags.prototype._buildTrie = function() {
        this.trie = new r();
        return this.each(function(e) {
            return function(t) {
                return e.trie.set(t.id, t);
            };
        }(this));
    };
    Tags.prototype._matchesEveryone = function(e) {
        return _.any(Collections.Tags.everyoneTags, function(t) {
            return t.indexOf("@" + e) === 0;
        });
    };
    Tags.prototype._matchesTeam = function(e) {
        return _.any(Collections.Tags.teamTags, function(t) {
            return t.indexOf("@" + e) === 0;
        });
    };
    Tags.prototype._userMatches = function(e) {
        return this.flow.users.reduce(function(t) {
            return function(n, r) {
                r.get("disabled") || 0 !== r.get("nick").toLowerCase().indexOf(e) || n.push(new Models.Tag({
                    flow: t.flow,
                    id: Models.Tag.userTagFor(r.id)
                }));
                return n;
            };
        }(this), []);
    };
    Tags.prototype._groupMatches = function(e) {
        return this.flow.groups.models.reduce(function(t) {
            return function(n, r) {
                if (r.get("handle").toLowerCase().indexOf(e) === 0) {
                    n.push(new Models.Tag({
                        flow: t.flow,
                        id: Models.Tag.groupTagFor(r.get("id"))
                    }))
                };
                return n;
            };
        }(this), []);
    };
    Tags.prototype._tagMatches = function(e) {
        if (e === "") {
            return this.models.slice(0);
        }
        return this.trie.prefixed(e).values();
    };
    Tags.prototype.get = function(e) {
        var t;
        if (e != null) {
            t = this.modelId(this._isModel(e) && e.attributes || e);
            return this._byId[e] || t && this._byId[t] || e.cid && this._byId[e.cid];
        }
    };
    return Tags;
}(Flowdock.Collection);