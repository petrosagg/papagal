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

Collections.LegacySources = function(e) {
    function LegacySources() {
        return LegacySources.__super__.constructor.apply(this, arguments);
    }
    r(LegacySources, e);
    LegacySources.prototype.model = Models.LegacySource;
    LegacySources.prototype.sourceFor = function(e) {
        var t;
        t = {
            twitter_user_search: "twitter_user",
            twitter_keyword_search: "twitter_keyword",
            github: "github"
        };
        return t[e] || null;
    };
    LegacySources.prototype.initialize = function(e, t) {
        return this.ready = new $.Deferred();
    };
    LegacySources.prototype.url = function() {
        return this.flow.url() + "/legacy_sources";
    };
    LegacySources.prototype.fetch = function() {
        var e;
        e = LegacySources.__super__.fetch.apply(this, arguments);
        e.done(function(e) {
            return function() {
                return e.ready.resolve();
            };
        }(this)).fail(function(e) {
            return function() {
                return e.ready.reject();
            };
        }(this));
        return e;
    };
    LegacySources.prototype.onAdd = function(e) {
        var t;
        t = new this.model(this.normalize(e), {
            flow: this.flow
        });
        return t.fetch({
            success: function(e) {
                return function() {
                    return e.add(t);
                };
            }(this)
        });
    };
    LegacySources.prototype.onRemove = function(e) {
        var t, n;
        t = e.content.original_message;
        n = this.sourceFor(t.type);
        return this.remove(this.where({
            id: n + "-" + t.id
        }));
    };
    LegacySources.prototype.consume = function(e) {
        if (this.stream) {
            throw new Error("Sources collection is already subscribed to a stream");
        }
        this.stream = e.filter(function(e) {
            return e.event === "action" || e.event === "legacy_source";
        }).filter(function(e) {
            return function(t) {
                var n;
                return e.sourceFor((n = t.content.original_message) != null ? n.type : undefined) != null;
            };
        }(this));
        this.addStream(this.stream.filter(function(e) {
            return e.content.type.indexOf("add_") === 0;
        }).onValue(function(e) {
            return function(t) {
                return e.onAdd(t);
            };
        }(this)));
        return this.addStream(this.stream.filter(function(e) {
            return e.content.type.indexOf("remove_") === 0;
        }).onValue(function(e) {
            return function(t) {
                return e.onRemove(t);
            };
        }(this)));
    };
    LegacySources.prototype.cleanup = function() {
        LegacySources.__super__.cleanup.apply(this, arguments);
        return this.ready = null;
    };
    LegacySources.prototype.findWithConfig = function(e, t, n) {
        var r;
        if (n == null) {
            n = null
        };
        if (n) {
            r = this.where({
                type: n
            });
        } else {
            r = this.models;
        }
        return _.find(r, function(n) {
            var r;
            return ((r = n.getConfig(e)) != null ? r.toLowerCase() : undefined) === (t != null ? t.toLowerCase() : undefined);
        });
    };
    LegacySources.prototype.findSourcesForApplicationId = function(e) {
        return this.find(function(t) {
            var n;
            return ((n = t.getConfig("application")) != null ? n.id : undefined) === e;
        });
    };
    LegacySources.prototype.normalize = function(e) {
        var t, n, r, o;
        r = e.content.original_message;
        o = this.sourceFor(r.type);
        n = o + "-" + r.id;
        return t = {
            id: n,
            url: this.url() + "/" + n,
            config: _.omit(r, "id")
        };
    };
    return LegacySources;
}(Flowdock.Collection);
