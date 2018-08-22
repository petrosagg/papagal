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

Collections.Flows = function(e) {
    function Flows() {
        return Flows.__super__.constructor.apply(this, arguments);
    }
    r(Flows, e);
    Flows.prototype.model = Models.Flow;
    Flows.prototype.initialize = function(e, t) {
        if (t == null) {
            t = {}
        };
        this._url = t.url;
        this._fetching = {};
        this.listenTo(this, "add", function(e) {
            if (this.stream) {
                return e.consume(this.stream);
            }
            return;
        });
        this.listenTo(this, "change:parameterized_name", this._onFlowRename);
        return this.listenTo(this, "change:disabled", this._removeDisabled);
    };
    Flows.prototype.uniqueName = function(e) {
        return e.get("name");
    };
    Flows.prototype.firstOpen = function() {
        return this.find(function(e) {
            return e.get("open") && e.get("joined");
        });
    };
    Flows.prototype.consume = function(e, t) {
        this.stream = e;
        this.each(function(e) {
            return function(t) {
                return t.consume(e.stream);
            };
        }(this));
        this.addStream(this.stream.filter(function(e) {
            var t;
            return (t = e.event) === "flow-add" || t === "flow-change";
        }).onValue(function(e) {
            return function(n) {
                var r;
                if (r = e.get(n.content.id)) {
                    if (r.get("open") && n.content.open === !1) {
                        e.trigger("external-close", r)
                    };
                    return r.set(n.content);
                }
                if (n.event === "flow-add") {
                    r = new Models.Flow(n.content, t);
                    return r.fetch().done(function() {
                        return e.add(r);
                    });
                }
                return;
            };
        }(this)));
        return this.addStream(this.stream.filter(function(e) {
            return e.event === "flow-remove";
        }).onValue(function(e) {
            return function(t) {
                var n;
                n = e.get(t.content.id);
                if (n != null) {
                    e.remove(n);
                    return _.defer(function() {
                        return n.cleanup();
                    });
                }
                return;
            };
        }(this)));
    };
    Flows.prototype.url = function() {
        return this._url || Helpers.apiUrl("/flows");
    };
    Flows.prototype.cleanup = function() {
        this.stopListening();
        this.each(function(e) {
            return e.cleanup();
        });
        this._fetching = {};
        return Flows.__super__.cleanup.apply(this, arguments);
    };
    Flows.prototype._onFlowRename = function(e) {
        return e.fetch({
            success: function() {
                return e.trigger("flow-unloaded", e);
            }
        });
    };
    Flows.prototype._removeDisabled = function(e, t) {
        if (t) {
            return this.remove(e);
        }
        return;
    };
    Flows.prototype.getOrFetch = function(e) {
        var t, n;
        if (e == null) {
            return new $.Deferred().reject();
        }
        n = this.get(e);
        if (n != null) {
            return new $.Deferred().resolve(n);
        }
        if (this._fetching[e]) {
            return this._fetching[e];
        }
        t = new Models.Flow({
            id: e,
            open: !1
        });
        this._fetching[e] = new $.Deferred();
        t.fetch({
            url: Helpers.apiUrl("/flows/find?id=" + e)
        }).done(function(n) {
            return function() {
                n.add(t);
                return n._fetching[e].resolve(t);
            };
        }(this)).fail(function(t) {
            return function() {
                return t._fetching[e].reject();
            };
        }(this)).always(function(t) {
            return function() {
                return t._fetching[e] = null;
            };
        }(this));
        return this._fetching[e];
    };
    return Flows;
}(Flowdock.Collection);