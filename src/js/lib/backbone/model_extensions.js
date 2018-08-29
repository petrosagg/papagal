var r;

r = {
    update: "put",
    destroy: "delete",
    create: "post",
    read: "get"
};

_.extend(Backbone.Model.prototype, {
    saveWithRetry: function(e, t) {
        var n, r, o;
        if (t == null) {
            t = {}
        };
        o = t.retries != null ? t.retries : 3;
        n = {
            success: function(e, n) {
                if (_.isFunction(t.success)) {
                    return t.success(e, n);
                }
                return;
            },
            error: function(n, r) {
                if (o <= 0) {
                    if (_.isFunction(t.error)) {
                        return t.error(n, r);
                    }
                    return;
                }
                return setTimeout(function() {
                    return n.saveWithRetry(e, _.extend({}, t, {
                        retries: o - 1
                    }));
                }, 1e4);
            }
        };
        r = _.extend({}, t);
        r.retries = undefined;
        return this.save(e, _.extend(r, n));
    },
    can: function(e, t, n) {
        var o, i, s;
        e = r[e] || e;
        o = function(n) {
            return function() {
                var r, o;
                return !!(((r = n.get("_links")) != null && (o = r[t]) != null ? o.methods.indexOf(e.toUpperCase()) : undefined) >= 0);
            };
        }(this);
        if (n != null) {
            n = _.flatten([ n ]);
            return o() && _.difference(n, (i = this.get("_links")) != null && (s = i[t]) != null ? s.fields : undefined).length === 0;
        }
        return o();
    },
    resourceUrl: function(e) {
        var t, n, r;
        r = e === "self" ? this.get("url") || (_.isFunction(this.url) ? this.url() : this.url) : (t = this.get("_links")) != null && (n = t[e]) != null ? n.href : undefined;
        if (r != null) {
            return Helpers.apiUrl(r);
        }
        return;
    },
    cleanup: function() {
        this.trigger("cleanup");
        if (this._end != null) {
            return this._end = null;
        }
        return;
    },
    untilEnd: function(e) {
        this._end || (this._end = this.asEventStream("cleanup").take(1));
        return e.takeUntil(this._end);
    }
});
