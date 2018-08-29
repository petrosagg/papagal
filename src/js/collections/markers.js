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

Collections.Markers = function(e) {
    function Markers() {
        return Markers.__super__.constructor.apply(this, arguments);
    }
    r(Markers, e);
    Markers.MARKERS = [ "chat", "inbox" ];
    Markers.LOCALSTORAGE_KEY = "flowdock-markers";
    Markers.VERSION = 1;
    Markers.SYNC_INTERVAL = 2e4;
    Markers.CHANGE_THROTTLE = 100;
    Markers.parseLocalStorage = function(e) {
        var t, n;
        t = function() {
            try {
                n = JSON.parse(localStorage.getItem(e));
                n.markers = _.pick(n.markers, [ "flows", "privates" ]);
                return n;
            } catch (t) {}
        }();
        return _.defaults(t || {}, {
            version: 0,
            id: false,
            markers: {}
        });
    };
    Markers.prototype.model = Models.Marker;
    Markers.prototype.url = function() {
        return Helpers.apiUrl("/notifications/markers");
    };
    Markers.prototype.initialize = function(e, t) {
        if (t == null) {
            t = {}
        };
        this._resetDirtyChanges();
        this.localStorageId = t.localStorageId;
        if (this.localStorageId) {
            this.listenTo(this, "add change remove reset", this.saveLocalStorage)
        };
        this.listenTo(this, "add change", this._trackDirtyChanges);
        this.listenTo(this, "remove", this._removeDirtyChanges);
        this.listenTo(this, "reset", this._resetDirtyChanges);
        return this.listenTo(this, "sync", this._cleanDirtyChanges);
    };
    Markers.prototype.startSync = function() {
        var e, n;
        n = function(e) {
            var n, r;
            r = e[0];
            n = e[1];
            if (r >= n) {
                return Bacon.once(true);
            }
            return Bacon.later(r + Markers.SYNC_INTERVAL - n, true);
        };
        e = this.untilEnd(this.asEventStream("add change")).throttle(Markers.CHANGE_THROTTLE).map(function() {
            return new Date().getTime();
        });
        return e.debounceImmediate(Markers.SYNC_INTERVAL).toProperty().filter(this, "unsaved").sampledBy(e, function(e, t) {
            return [ e, t ];
        }).flatMapLatest(n).assign(this, "save", {
            patch: true
        });
    };
    Markers.prototype.getMarker = function(e, t) {
        var n, r;
        n = e.isFlow() ? "flows:" + e.id : "privates:" + e.id;
        if ((r = this.get(n)) != null && typeof r.get == "function") {
            return r.get(t);
        }
        return;
    };
    Markers.prototype.setMarker = function(e, t, n) {
        var r, o;
        if (n == null) {
            n = "chat"
        };
        o = e.isFlow() ? "flows:" + e.id : "privates:" + e.id;
        if (this.get(o)) {
            return this.get(o).set(n, t, {
                validate: true
            });
        }
        r = {
            id: o
        };
        r[n] = t;
        return this.add(r);
    };
    Markers.prototype.parse = function(e, t) {
        var n, r, o, i, s;
        if (t == null) {
            t = {}
        };
        o = [];
        for (s in e) {
            n = e[s];
            for (i in n) {
                r = n[i];
                o.push(this._parseMarker(s + ":" + i, r, t));
            }
        }
        return o;
    };
    Markers.prototype.save = function(e) {
        var t, n;
        if (e == null) {
            e = {}
        };
        e = _.extend({}, e, {
            merge: true
        });
        t = e.error;
        e.error = function(n) {
            return function(r) {
                if (t) {
                    t(n, r, e)
                };
                return n.trigger("error", n, r, e);
            };
        }(this);
        n = e.success;
        e.success = function(t) {
            return function(r) {
                var o;
                o = t.parse(r, e);
                if (_.isObject(o) && !t.set(o, e)) {
                    return false;
                }
                if (n) {
                    n(t, r, e)
                };
                return t.trigger("sync", t, r, e);
            };
        }(this);
        return this.sync("patch", this, e);
    };
    Markers.prototype.fetchLocalStorage = function(e) {
        var n, r, o, i;
        if (e == null) {
            e = {}
        };
        o = Markers.parseLocalStorage(Markers.LOCALSTORAGE_KEY);
        n = o.id;
        r = o.markers;
        i = o.version;
        if (n === this.localStorageId && i === Markers.VERSION) {
            return this.set(r, _.defaults(e, {
                merge: true,
                remove: false,
                parse: true
            }));
        }
        return;
    };
    Markers.prototype.saveLocalStorage = function() {
        var e;
        e = JSON.stringify({
            id: this.localStorageId,
            version: Markers.VERSION,
            markers: this.toJSON()
        });
        return localStorage.setItem(Markers.LOCALSTORAGE_KEY, e);
    };
    Markers.prototype.toJSON = function(e) {
        var t, n, r, o, i, s, a, u;
        if (e == null) {
            e = {}
        };
        if (e.patch === true) {
            return this.changes;
        }
        for (t = {}, s = this.models, n = 0, o = s.length; o > n; n++) {
            i = s[n];
            a = i.parseId();
            u = a[0];
            r = a[1];
            (t[u] || (t[u] = {}))[r] = _.omit(i.toJSON(e), "id");
        }
        return t;
    };
    Markers.prototype.unsaved = function() {
        var e, t, n;
        t = this.changes;
        for (n in t) {
            e = t[n];
            if (!_.isEmpty(e)) {
                return true;
            }
        }
        return false;
    };
    Markers.prototype._cleanDirtyChanges = function(e, t, n) {
        var r, o, i, s, a, u, l;
        a = [];
        for (u in t) {
            r = t[u];
            a.push(function() {
                var e;
                e = [];
                for (o in r) {
                    s = r[o];
                    e.push(function() {
                        var e, t;
                        t = [];
                        for (i in s) {
                            l = s[i];
                            if (l >= ((e = this.changes[u][o]) != null ? e[i] : undefined)) {
                                delete this.changes[u][o][i];
                                if (_.isEmpty(this.changes[u][o])) {
                                    t.push(delete this.changes[u][o]);
                                } else {
                                    t.push(undefined);
                                }
                            } else {
                                t.push(undefined);
                            }
                        }
                        return t;
                    }.call(this));
                }
                return e;
            }.call(this));
        }
        return a;
    };
    Markers.prototype._removeDirtyChanges = function(e) {
        var t, n, r;
        n = e.parseId();
        r = n[0];
        t = n[1];
        return delete this.changes[r][t];
    };
    Markers.prototype._resetDirtyChanges = function(e) {
        return this.changes = {
            flows: {},
            privates: {}
        };
    };
    Markers.prototype._trackDirtyChanges = function(e) {
        var t, n, r, o, i;
        n = e.hasChanged() ? e.changedAttributes() : _.omit(e.toJSON(), "id");
        o = e.parseId();
        i = o[0];
        r = o[1];
        return _.extend((t = this.changes[i])[r] || (t[r] = {}), n);
    };
    Markers.prototype._maxOrDefined = function(e, t) {
        if (e != null && t != null) {
            return Math.max(e, t);
        }
        if (e != null) {
            return e;
        }
        return t;
    };
    Markers.prototype._merge = function(e, n) {
        var r, o, i, s, a;
        if (e != null && n != null) {
            for (a = {}, s = Markers.MARKERS, r = 0, o = s.length; o > r; r++) {
                i = s[r];
                a[i] = this._maxOrDefined(e[i], n[i]);
            }
            return a;
        }
        if (n) {
            return n;
        }
        return e;
    };
    Markers.prototype._parseMarker = function(e, t, n) {
        var r;
        r = n.merge && this.get(e) ? this._merge(this.get(e).toJSON(), t) : t;
        return _.extend({
            id: e
        }, r);
    };
    return Markers;
}(Flowdock.Collection);
