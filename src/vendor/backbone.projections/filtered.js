var r, o, i, s = {}.hasOwnProperty, a = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
};

r = ((typeof window != "undefined" && null !== window ? window.Backbone : void 0) || require("backbone")).Collection;

o = ((typeof window != "undefined" && null !== window ? window._ : void 0) || require("underscore")).extend;

i = function(e) {
    var t;
    t = function(t) {
        return e.indexOf(t);
    };
    t.induced = !0;
    return t;
};

global.Filtered = function(e) {
    function Filtered(e, n) {
        var r = this;
        if (n == null) {
            n = {}
        };
        this.underlying = e;
        this.model = e.model;
        this.comparator = n.comparator || i(e);
        this.options = o({}, e.options, n);
        Filtered.__super__.constructor.call(this, this.underlying.models.filter(this.options.filter), n);
        this.listenTo(this.underlying, {
            reset: function() {
                return r.reset(r.underlying.models.filter(r.options.filter));
            },
            remove: function(e) {
                if (r.contains(e)) {
                    return r.remove(e);
                }
                return;
            },
            add: function(e) {
                if (r.options.filter(e)) {
                    return r.add(e);
                }
                return;
            },
            change: function(e) {
                return r.decideOn(e);
            },
            sort: function() {
                if (r.comparator.induced) {
                    return r.sort();
                }
                return;
            }
        });
    }
    a(Filtered, e);
    Filtered.prototype.update = function() {
        var e, t, n, r, o;
        for (r = this.underlying.models, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            o.push(this.decideOn(e));
        }
        return o;
    };
    Filtered.prototype.decideOn = function(e) {
        if (this.contains(e)) {
            if (!this.options.filter(e)) {
                return this.remove(e);
            }
        } else if (this.options.filter(e)) {
            return this.add(e);
        }
    };
    return Filtered;
}(r);

global.FilteredCollection = global.Filtered;