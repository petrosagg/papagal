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
}, i = {}.hasOwnProperty, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Views.Inbox.SearchAutocompleter = function(e) {
    function SearchAutocompleter() {
        this.loadMore = r(this.loadMore, this);
        this.isAtEnd = r(this.isAtEnd, this);
        return SearchAutocompleter.__super__.constructor.apply(this, arguments);
    }
    o(SearchAutocompleter, e);
    SearchAutocompleter.prototype.initialize = function() {
        SearchAutocompleter.__super__.initialize.apply(this, arguments);
        this.maxOptions = 100;
        return this.addStream(this.$el.asEventStream("scroll").throttle(50).filter(this.isAtEnd).onValue(this.loadMore));
    };
    SearchAutocompleter.prototype.completionKey = function(e) {
        var t;
        if ((t = e.which) === 9 || t === 13) {
            e.preventDefault();
            return this.chooseSelection();
        }
        return;
    };
    SearchAutocompleter.prototype.excludeTokens = function() {
        if (this.filter) {
            return this.filter.tags;
        }
        return [];
    };
    SearchAutocompleter.prototype.selectNext = function() {
        SearchAutocompleter.__super__.selectNext.apply(this, arguments);
        if (this.$el.children().length) {
            this.show();
            return this.scrollToSelection();
        }
        return;
    };
    SearchAutocompleter.prototype.selectPrev = function() {
        SearchAutocompleter.__super__.selectPrev.apply(this, arguments);
        if (this.$el.children().length) {
            this.show();
            return this.scrollToSelection();
        }
        return;
    };
    SearchAutocompleter.prototype.inScrollTop = function(e) {
        return e[0].offsetTop < this.$el.scrollTop();
    };
    SearchAutocompleter.prototype.inScrollBottom = function(e) {
        return e[0].offsetTop + e.outerHeight() > this.$el.height() + this.$el.scrollTop();
    };
    SearchAutocompleter.prototype.isAtEnd = function() {
        return this.$el[0].scrollHeight - this.$el[0].scrollTop - this.$el.height() < 100;
    };
    SearchAutocompleter.prototype.loadMore = function() {
        var e;
        e = this.$(".option.tag-choice, .option.user-choice").length;
        return _.forEach(this.models(e, e + 100), function(e) {
            return function(t) {
                return e.$(".option:last").after(e.renderOption(t));
            };
        }(this));
    };
    SearchAutocompleter.prototype.scrollToSelection = function() {
        if (this.inScrollTop(this.selection)) {
            return this.$el.scrollTop(this.selection[0].offsetTop);
        }
        if (this.inScrollBottom(this.selection)) {
            return this.$el.scrollTop(this.selection[0].offsetTop + this.selection.outerHeight() - this.$el.height());
        }
        return;
    };
    SearchAutocompleter.prototype.models = function(e, t) {
        var n;
        n = this.excludeTokens();
        return this.collection.startingWith(this.query).filter(function(e) {
            var t;
            return (e.id.indexOf(":") === 0 || e.get("count")) && (t = e.id, s.call(n, t) < 0);
        }).slice(e, t);
    };
    SearchAutocompleter.prototype.filterModels = function() {
        var e, n, r, o, i, s, a, u;
        if ((i = this.query) != null) {
            n = i.length;
        } else {
            n = undefined;
        }
        if ((s = this.filter) != null) {
            r = s.tags.length;
        } else {
            r = undefined;
        }
        o = !((a = this.filter) != null ? a.isCustom() : undefined) || ((u = this.filter) != null ? u.isEqual(new Models.Filter.Inbox()) : undefined);
        e = SearchAutocompleter.__super__.filterModels.call(this, o);
        if (!n && o) {
            e.push({
                count: 0,
                type: function() {
                    return "settings";
                },
                tag: "Add more sources...",
                toString: function() {
                    return this.tag;
                },
                query: this.query,
                icon: "fa fa-fw fa-plus"
            })
        };
        if (n >= 3 && !r) {
            e.unshift({
                count: 0,
                type: function() {
                    return "full-text";
                },
                tag: "Full-text search for '" + this.query + "'",
                toString: function() {
                    return this.tag;
                },
                query: this.query
            })
        };
        return e;
    };
    SearchAutocompleter.prototype.chooseSelection = function() {
        var e;
        if (this.selection && this.selection.length && (typeof (e = this.selection.data("token")).type == "function" ? e.type() : undefined) === "settings") {
            return void Flowdock.app.manager.openFlowSettings(this.flow, "integrations");
        }
        return SearchAutocompleter.__super__.chooseSelection.apply(this, arguments);
    };
    return SearchAutocompleter;
}(Views.Shared.Autocompleter);
