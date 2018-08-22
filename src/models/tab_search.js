var r;

r = require("fuse.js");

Models.TabSearch = function() {
    function TabSearch(e, t) {
        this.collection = e;
        this.options = t;
        this.loading = this.collection.isLoadingStream().toProperty(!1);
    }
    TabSearch.inBatches = function(t, n, r) {
        if (r == null) {
            r = 0
        };
        if (t.length <= r + n) {
            return [ t ];
        }
        return [ t.slice(0, n + r) ].concat(TabSearch.inBatches(t, n, r + n));
    };
    TabSearch.prototype.filterCollection = function(e) {
        var t, n, r, o, i, s, a, u, l, c;
        if (e.input.length) {
            for (a = e.fuse.search(Helpers.replaceDiacritics(e.input)), c = [], n = 0, o = a.length; o > n; n++) {
                u = a[n];
                c.push({
                    item: this.collection.get(u.item),
                    score: u.score
                });
            }
            return c;
        }
        for (s = this.collection.models, l = [], t = 0, r = s.length; r > t; t++) {
            i = s[t];
            l.push({
                item: i,
                score: 0
            });
        }
        return l;
    };
    TabSearch.prototype.rebuildIndex = function() {
        return new r(this.sanitize(this.collection, this.options.fields), {
            keys: this.options.fields,
            id: "id",
            threshold: this.options.threshold || .6,
            includeScore: !0
        });
    };
    TabSearch.prototype.sanitize = function(e, t) {
        var n, r, o, i, s, a;
        for (e = e.toJSON(), n = 0, i = e.length; i > n; n++) {
            for (a = e[n], r = 0, s = t.length; s > r; r++) {
                o = t[r];
                if (a[o] != null) {
                    a[o] = Helpers.replaceDiacritics(a[o])
                };
            }
        }
        return e;
    };
    TabSearch.prototype.fetch = function(e) {
        return this.collection.fetch(e);
    };
    TabSearch.prototype.filter = function(t) {
        var n;
        n = this.collection.asEventStream("add remove change").debounce(100).map(function(e) {
            return function() {
                return e.rebuildIndex();
            };
        }(this)).toProperty(this.rebuildIndex());
        return Bacon.combineTemplate({
            input: t,
            fuse: n
        }).map(function(e) {
            return function(t) {
                return e.filterCollection(t);
            };
        }(this)).flatMapLatest(function(t) {
            var n;
            n = TabSearch.inBatches(t, 100);
            if (n.length === 0) {
                return Bacon.once(t);
            }
            return Bacon.once(n[0]).merge(Bacon.sequentially(200, n.slice(1)));
        }).toProperty();
    };
    TabSearch.prototype.cleanup = function() {
        return this.options = void 0;
    };
    return TabSearch;
}();