var r, o, i, s, a, u = {}.hasOwnProperty, l = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (u.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
};

r = ((typeof window != "undefined" && null !== window ? window.Backbone : void 0) || require("backbone")).Collection;

a = (typeof window != "undefined" && null !== window ? window._ : void 0) || require("underscore");

s = a.toArray;

o = a.extend;

i = function(e) {
    var t;
    t = function(t) {
        return e.indexOf(t);
    };
    t.induced = !0;
    return t;
};

exports.Capped = function(e) {
    function Capped(e, n) {
        var r = this;
        if (n == null) {
            n = {}
        };
        this.underlying = e;
        this.model = e.model;
        this.comparator = n.comparator || i(e);
        this.options = o({
            cap: 5
        }, e.options, n);
        Capped.__super__.constructor.call(this, this._capped(this.underlying.models), n);
        this.listenTo(this.underlying, {
            reset: function() {
                return r.reset(r._capped(r.underlying.models));
            },
            remove: function(e) {
                var t;
                if (r.contains(e)) {
                    r.remove(e);
                    t = r._capped(r.underlying.models);
                    return r.add(t[r.options.cap - 1]);
                }
                return;
            },
            add: function(e) {
                if (r.length < r.options.cap) {
                    return r.add(e);
                }
                if (r.comparator(e) < r.comparator(r.last())) {
                    r.add(e);
                    return r.remove(r.at(r.options.cap));
                }
                return;
            },
            sort: function() {
                if (r.comparator.induced) {
                    return r.reset(r._capped(r.underlying.models));
                }
                return;
            }
        });
    }
    l(Capped, e);
    Capped.prototype._capped = function(e) {
        var t = this;
        e = s(e);
        e.sort(function(e, n) {
            e = t.comparator(e);
            n = t.comparator(n);
            if (e > n) {
                return 1;
            }
            if (n > e) {
                return -1;
            }
            return 0;
        });
        return e.slice(0, this.options.cap);
    };
    Capped.prototype.resize = function(e) {
        var t, n, r, o, i;
        if (this.options.cap > e) {
            for (this.options.cap = e, i = this.models, n = o = i.length - 1; o >= 0 && (r = i[n], 
            !(e > n)); n = o += -1) {
                this.remove(r);
            }
        } else if (this.options.cap < e) {
            this.options.cap = e, t = this._capped(this.underlying.models), this.add(t.slice(this.length, this.options.cap))
        };
        return this.trigger("resize");
    };
    return Capped;
}(r);

exports.CappedCollection = exports.Capped;
