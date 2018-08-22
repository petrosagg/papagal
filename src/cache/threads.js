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

Cache.Threads = function(e) {
    function Threads(e) {
        this.flow = e.flow;
        this.preloadedCollections = e.preloadedCollections;
        this.insert = r(this.insert, this);
        Threads.__super__.constructor.apply(this, arguments);
    }
    o(Threads, e);
    Threads.prototype.maxLength = 100;
    Threads.prototype.drop = function(e) {
        return e.cleanup();
    };
    Threads.prototype._preloaded = function(e) {
        if (this._fullyLoaded(e)) {
            return e.map(function(e) {
                return e.clone();
            });
        }
        return [];
    };
    Threads.prototype._messagesForThread = function(e) {
        return _.sortBy(_.flatten(this.preloadedCollections.map(function(t) {
            return t.where({
                thread_id: e
            });
        })), "id");
    };
    Threads.prototype._fullyLoaded = function(e) {
        var t, n, r, o, i;
        if (i = (o = _.last(e)) != null ? o.get("thread") : void 0) {
            r = i.internal_comments;
            t = i.activities;
            n = i.external_comments;
            return (Number(r) || 0) + (Number(n) || 0) + (Number(t) || 0) <= e.length;
        }
        return !1;
    };
    Threads.prototype.insert = function(e) {
        var t, n, r;
        n = this._messagesForThread(e);
        r = this._preloaded(n);
        t = new Collections.Activities(r, {
            flow: this.flow,
            thread: e,
            maximumMessages: 30
        });
        r.length > 0 ? t.historyComplete.backward = !0 : t.fetchHistory({
            delayed: !0
        }).fail(function(t) {
            return function() {
                return t["delete"](e);
            };
        }(this));
        t.consume(this.flow.stream);
        return t;
    };
    Threads.prototype.find = function(e) {
        var t, n;
        t = this.load(e);
        n = new Models.Thread({
            activities: t.models.map(function(e) {
                return e.clone();
            }),
            flow: this.flow,
            thread_id: e,
            id: e
        });
        n.activities.consume(this.flow.stream);
        n.activities.historyComplete.backward = t.historyComplete.backward;
        if (!t.historyComplete.backward && t.length < t.limit) {
            n.activities.fetchHistory()
        };
        return n;
    };
    return Threads;
}(Cache.LRU);