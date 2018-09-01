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
}, o = {}.hasOwnProperty, i = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Views.Toolbar.Search = function(t) {
    function Search() {
        return Search.__super__.constructor.apply(this, arguments);
    }
    var o;
    r(Search, t);
    o = 6;
    Search.prototype.template = require("../../templates/toolbar/search.mustache");
    Search.prototype.id = "search-form-item";
    Search.prototype.events = {
        submit: function(e) {
            return e.preventDefault();
        },
        "mousedown #filter-reset": "clearFilter",
        "mousedown #search-toggle": "openSearch"
    };
    Search.prototype.keyboardEvents = {
        focusSearch: "openSearch"
    };
    Search.applicationFilter = function(e) {
        var t;
        t = e.get("application");
        return new Models.Filter.Application({
            label: t.name,
            application: t.id,
            iconUrl: t.icon_url
        });
    };
    Search.prototype.initialize = function() {
        var e, t, n, r, o, s, a, u, l, c, p, d;
        for (n = [], p = [ "mail" ], o = 0, u = p.length; u > o; o++) {
            t = p[o];
            n.push(new Models.Filter.Inbox({
                event: t
            }));
        }
        for (d = this.model.integrations.models || [], a = 0, l = d.length; l > a; a++) {
            s = d[a];
            if (_.isString(s.get("service"))) {
                c = s.get("service"), n.push(new Models.Filter.Inbox({
                    event: c
                }))
            };
        }
        this.mainFilters = _.map(_.values(Models.Filter.filterMap()), function(e) {
            return new e();
        });
        r = _.uniq(_.flatten(_.pluck(n, "event")));
        e = this.mainFilters.concat(n);
        this._setupDynamicFilters(e);
        this.addStream(this.model.stream.filter(function(e) {
            return e.app === "influx" && e.event !== "activity";
        }).map(".event").filter(function(e) {
            return Models.Filter.labelMap()[e] != null && !(i.call(r, e) >= 0);
        }).onValue(function(t) {
            return function(n) {
                r.push(n);
                e.push(new Models.Filter.Inbox({
                    event: n
                }));
                return t.autocompleter.refresh();
            };
        }(this)));
        this.bindKeyboardEvents();
        this.initiallyFiltered = false;
        this.current = new Models.Filter();
        this.autocompleter = new Views.Inbox.SearchAutocompleter({
            flow: this.model,
            collection: this.model.tags,
            defaultOptions: e
        });
        this.tokenist = new Views.Shared.Tokenist({
            autocompleter: this.autocompleter,
            placeholder: "Search in " + this.model.get("name") + "..."
        });
        return this.fullText = this.subview(new Views.Inbox.FullText({
            model: this.model
        }));
    };
    Search.prototype._setupDynamicFilters = function(e) {
        var t;
        t = this.untilEnd(this.model.sources.asEventStream("remove"));
        this.listenTo(this.model.integrations, "add", function(t) {
            return this.onLegacyIntegrationAdd(e, t);
        });
        this.listenTo(this.model.integrations, "reset", function(t) {
            var n, r, o, i, s;
            for (i = t.models, s = [], n = 0, o = i.length; o > n; n++) {
                r = i[n];
                s.push(this.onLegacyIntegrationAdd(e, r));
            }
            return s;
        });
        this.listenTo(this.model.sources, "add", function(t) {
            return this.onSourceAdd(e, t);
        });
        this.listenTo(this.model.sources, "reset", function(t) {
            var n, r, o, i, s;
            for (this._resetApplicationFilters(e), o = t.models, i = [], n = 0, r = o.length; r > n; n++) {
                s = o[n];
                i.push(this.onSourceAdd(e, s));
            }
            return i;
        });
        this.listenTo(this.model.sources, "remove", function(t) {
            var n, r, o;
            if (!this.model.sources.some(function(e) {
                return e.get("application").id === t.get("application").id;
            }) && (n = _.find(e, function(e) {
                return e.application.indexOf(t.get("application").id) >= 0;
            }))) {
                r = _.indexOf(e, n);
                e.splice(r, 1);
                if ((o = this.autocompleter) != null) {
                    return o.refresh();
                }
                return;
            }
            return;
        });
        return this.listenTo(this.model.sources, "change", function(t) {
            var n, r;
            n = _.find(e, function(e) {
                return e.application.indexOf(t.get("application").id) >= 0;
            });
            if (n) {
                n.label = t.get("application").name;
                if ((r = this.autocompleter) != null) {
                    return r.refresh();
                }
                return;
            }
            return;
        });
    };
    Search.prototype.onSourceAdd = function(e, t) {
        var r, i;
        r = Search.applicationFilter(t);
        if (_.some(e, function(e) {
            return e.application.indexOf(t.get("application").id) >= 0;
        })) {
            return undefined;
        }
        e.splice(o, 0, r);
        if ((i = this.autocompleter) != null) {
            return i.refresh();
        }
        return;
    };
    Search.prototype.onLegacyIntegrationAdd = function(e, t) {
        var n, r;
        if (_.some(e, function(e) {
            var n;
            return ((n = e.events) != null ? n.length : undefined) === 1 && e.events[0] === t.get("service");
        })) {
            return undefined;
        }
        n = new Models.Filter.Inbox({
            event: t.get("service")
        });
        e.push(n);
        if ((r = this.autocompleter) != null) {
            return r.refresh();
        }
        return;
    };
    Search.prototype._resetApplicationFilters = function(e) {
        var t, n, r;
        for (t = 0; t < e.length; ) {
            if (((n = e[t].application) != null ? n.length : undefined) > 0) {
                e.splice(t, 1);
            } else {
                t++;
            }
        }
        if ((r = this.autocompleter) != null) {
            return r.refresh();
        }
        return;
    };
    Search.prototype.destructor = function() {
        this.tokenist.unbindBehavior();
        this.tokenist.remove();
        Search.__super__.destructor.apply(this, arguments);
        return this.tokenist = this.autocompleter = this.mainFilters = this.current = this.fullText = null;
    };
    Search.prototype.openSearch = function(e) {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_button_click);
        this.focusSearch(e);
        return this.autocompleter.toggle();
    };
    Search.prototype.focusSearch = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        this.trigger("search:open");
        if (this.$("input").val()) {
            return this.fullText.focus();
        }
        return this.tokenist.focus();
    };
    Search.prototype.blurSearch = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        this.autocompleter.hide();
        if (this.current.isAll()) {
            return this.trigger("search:close");
        }
        return;
    };
    Search.prototype.onBeforeRender = function() {
        this.stopListening(this.tokenist);
        return this.stopListening(this.fullText);
    };
    Search.prototype.onAfterRender = function() {
        var e;
        e = this.untilEnd(this.$el.asEventStream("focusout").takeUntil(this.asEventStream("render")).delay(50).filter(function(e) {
            return function(t) {
                return !e.focused(t);
            };
        }(this)));
        e.onValue(function(e) {
            return function(t) {
                return e.blurSearch(t);
            };
        }(this));
        this.autocompleter.setElement(this.$(".autocompleter")).render().hide();
        this.tokenist.setElement(this.$(".tokenist")).render();
        this.fullText.setElement(this.$(".full-text")).render();
        this.listenTo(this.tokenist, "token-add", this.onTokenAdd);
        this.listenTo(this.tokenist, "token-remove", this.onTokenRemove);
        this.listenTo(this.tokenist, "tokenist-blur", function() {
            return window.lastFocusedInput = "search";
        });
        this.listenTo(this.fullText, "close", function(e) {
            return function(t) {
                e.filterChange();
                e.focusSearch(t);
                return e.autocompleter.show();
            };
        }(this));
        this.listenTo(this.fullText, "focus", this.focusSearch);
        return this.listenTo(this.fullText, "search", this.filterChange);
    };
    Search.prototype.focused = function(e) {
        return this.$el.find(document.activeElement).length > 0;
    };
    Search.prototype.onTokenAdd = function(e) {
        if (e.type() === "full-text") {
            this.enableFullText(e.query)
        };
        return this.filterChange();
    };
    Search.prototype.onTokenRemove = function(e) {
        this.filterChange();
        if (this.isEmpty()) {
            return this.autocompleter.render().show();
        }
        return;
    };
    Search.prototype.clearFilter = function(e) {
        var t;
        if (e != null) {
            e.preventDefault()
        };
        if (this.isEmpty()) {
            return this.blurSearch(e);
        }
        t = this.focused();
        this.fullText.setQuery("");
        this.tokenist.reset([]);
        this.tokenist.$el.blur();
        if (!this.current.isAll()) {
            this.filterChange()
        };
        this.tokenist.stopEditor();
        this.autocompleter.refreshQuery("");
        if (t) {
            return this.focusSearch(e);
        }
        return this.blurSearch(e);
    };
    Search.prototype.setFilter = function(e, t) {
        var r, o, i, s, a;
        if (t == null) {
            t = {}
        };
        _.defaults(t, {
            trigger: true
        });
        this.preventFilterEvent = !t.trigger;
        a = _.chain(e.tags || []).map(function(e) {
            return function(t) {
                return e.model.tags.getOrAdd(t);
            };
        }(this)).filter(function(e) {
            return e.humanize() || e.humanizeSpecial();
        }).value();
        s = _.reject(e.event, function(e) {
            return e === "activity";
        }).map(function(e) {
            return new Models.Filter({
                event: e
            });
        });
        i = (e.application || []).map(function(e) {
            return function(t) {
                var r;
                r = e.model.sources.find(function(e) {
                    return e.get("application").id === t;
                });
                if (r) {
                    return Search.applicationFilter(r);
                }
                return;
            };
        }(this)).filter(function(e) {
            return e;
        });
        if (e.application && i.length !== e.application.length) {
            e = new Models.Filter.Inbox()
        };
        if (!e.isEqual(new Models.Filter.Inbox())) {
            a = a.concat(s, i)
        };
        if (a.length !== this.tokenist.tokens.length || _.any(this.tokenist.tokens, function(e) {
            return !_.find(a, function(t) {
                if (e instanceof Models.Filter) {
                    if (t instanceof Models.Filter) {
                        return e.isEqual(t);
                    }
                    return e.tags[0] === t.id;
                }
                return e.id === t.id;
            });
        })) {
            r = true, this.tokenist.reset(a), this.setCurrent()
        };
        this.autocompleter.filter = e;
        this.autocompleter.render().hide();
        o = e.toString();
        if (o === "Search") {
            Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_filter_full_text);
        } else {
            if (o === undefined && a.length > 0) {
                Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_filter_tag);
            } else {
                if (a.length > 0) {
                    Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_filter_source)
                };
            }
        }
        if (e.query) {
            this.enableFullText(e.query);
        } else {
            this.fullText.setQuery("");
            this.enableTokenist(r);
        }
        this.preventFilterEvent = null;
        return this.initiallyFiltered = true;
    };
    Search.prototype.enableFullText = function(e) {
        var t;
        t = e !== this.fullText.query;
        this.tokenist.$el.hide();
        this.tokenist.reset([]);
        this.fullText.setQuery(e, this.initiallyFiltered && t);
        return this.setCurrent();
    };
    Search.prototype.enableTokenist = function(e) {
        this.tokenist.$el.show();
        if (e && this.initiallyFiltered && !Flowdock.mobile && !this.isEmpty()) {
            return this.tokenist.focus();
        }
        return;
    };
    Search.prototype.filterChange = function() {
        var e, t, n, r, o;
        e = this.setCurrent();
        t = {
            filter: e
        };
        if ((n = Flowdock.app.manager) != null && (r = n.currentView) != null && (o = r.viewModel) != null && o.isSingleViewInFrontOfInbox()) {
            t.message = null, t.thread = null
        };
        return Flowdock.app.router.navigateToFlow(this.model, t, {
            trigger: true
        });
    };
    Search.prototype.setCurrent = function() {
        var e, t, n, r, o, s, a;
        s = _.partition(this.tokenist.tokens, function(e) {
            return function(t) {
                return t.id && i.call(e.mainFilters, t) < 0;
            };
        }(this));
        a = s[0];
        n = s[1];
        if (a.length || n.length || this.fullText.query.length) {
            for (e = Models.Filter.build({
                query: this.fullText.query,
                tags: _.map(a, function(e) {
                    return e.id || e;
                })
            }), r = 0, o = n.length; o > r; r++) {
                t = n[r];
                e = e.merge(t);
            }
        } else {
            e = new Models.Filter();
        }
        this.current = e;
        return this.autocompleter.filter = this.current;
    };
    Search.prototype.isEmpty = function() {
        return this.tokenist.isEmpty() && this.fullText.$("input").val() === "";
    };
    Search.prototype.onSearchChange = function(e) {
        return this.setFilter(e);
    };
    return Search;
}(Flowdock.ItemView);

_.extend(Views.Toolbar.Search.prototype, Flowdock.KeyboardEvents);
