var r, o, i = {}.hasOwnProperty, s = function(e, t) {
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
};

r = ((typeof window != "undefined" && null !== window ? window.Backbone : void 0) || require("backbone")).Collection;

o = ((typeof window != "undefined" && null !== window ? window._ : void 0) || require("underscore")).extend;

global.Sorted = function(e) {
    function Sorted(e, n) {
        var r = this;
        if (n == null) {
            n = {}
        }
        if (!n.comparator) {
            throw new Error("provide a comparator");
        }
        this.underlying = e;
        this.model = e.model;
        this.comparator = n.comparator;
        this.options = o({}, e.options, n);
        Sorted.__super__.constructor.call(this, this.underlying.models, n);
        this.listenTo(this.underlying, {
            reset: function() {
                return r.reset(r.underlying.models);
            },
            remove: function(e) {
                return r.remove(e);
            },
            add: function(e) {
                return r.add(e);
            }
        });
    }
    s(Sorted, e);
    return Sorted;
}(r);

global.Reversed = function(e) {
    function Reversed(e, n) {
        if (n == null) {
            n = {}
        };
        n.comparator = function(t) {
            return -e.indexOf(t);
        };
        Reversed.__super__.constructor.call(this, e, n);
        this.listenTo(this.underlying, {
            sort: this.sort
        });
    }
    s(Reversed, e);
    return Reversed;
}(global.Sorted);

global.SortedCollection = global.Sorted;

global.ReversedCollection = global.Reversed;