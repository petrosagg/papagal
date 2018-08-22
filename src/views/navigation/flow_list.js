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

Views.Navigation.FlowList = function(t) {
    function FlowList() {
        return FlowList.__super__.constructor.apply(this, arguments);
    }
    r(FlowList, t);
    FlowList.prototype.template = require("../../templates/navigation/flow_list.mustache");
    FlowList.prototype.itemViewContainer = ".org-flows";
    FlowList.prototype.className = "flow-list";
    FlowList.prototype.modelEvents = {
        change: "onChange"
    };
    FlowList.prototype.collectionEvents = {
        add: "onAdd",
        remove: "onRemove"
    };
    FlowList.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        if (e.title) {
            this.title = e.title
        };
        this.hideIfEmpty = e.hideIfEmpty;
        this.reorderable = e.reorderable;
        return this.collection.each(this.handleLoaded, this);
    };
    FlowList.prototype.prependOrAppendTab = function(e, t) {
        var n;
        n = t.isFlow() ? "append" : "prepend";
        return this.$(this.itemViewContainer)[n](e.render().el);
    };
    FlowList.prototype.onAdd = function(e) {
        var t;
        this.handleLoaded(e);
        t = this.renderOne(e);
        this.prependOrAppendTab(t, e);
        t.triggerAttach();
        return this.$el.show();
    };
    FlowList.prototype.onRemove = function(e) {
        var t, n, r, o;
        for (r = this.findSubviews(e), t = 0, n = r.length; n > t; t++) {
            o = r[t];
            this.removeSubview(o);
        }
        if (this.isVisible()) {
            return void 0;
        }
        return this.$el.hide();
    };
    FlowList.prototype.onChange = function() {
        var e;
        e = this.serializeData();
        this.$(".org-name").text(e.title);
        if (e.url) {
            return this.$(".external-link").attr({
                href: e.url
            });
        }
        return;
    };
    FlowList.prototype.handleLoaded = function(e) {
        if (e.isPrivate()) {
            return e.fullyLoaded.fail(function(t) {
                return function() {
                    return t.onRemove(e);
                };
            }(this));
        }
        if (this.model) {
            return this.model.set(e.get("organization"));
        }
        return;
    };
    FlowList.prototype.serializeData = function() {
        return {
            title: this.title || this.model.get("name"),
            url: this.model ? "/organizations/" + this.model.id : null
        };
    };
    FlowList.prototype.isVisible = function() {
        return this.collection.length > 0 || !this.hideIfEmpty;
    };
    FlowList.prototype._findTabIndex = function(e) {
        var t, n;
        t = String(e.get("id"));
        n = this.initialTabOrder.indexOf(t);
        if (n < 0) {
            return this.initialTabOrder.push(t);
        }
        return n;
    };
    FlowList.prototype._tabTypeOrder = function(e) {
        var t, n;
        t = e.isFlow() ? "flows" : "privates";
        if ((n = Flowdock.app.tabOrder) != null) {
            return n[t][e.id];
        }
        return;
    };
    FlowList.prototype.render = function() {
        var e;
        this.initialTabOrder = this.collection.sortBy(this._tabTypeOrder).map(function(e) {
            return String(e.get("id"));
        });
        this.$el.html(Helpers.renderTemplate(this.template)(this.serializeData()));
        e = this.collection.sortBy(this._findTabIndex, this).map(function(e) {
            return function(t) {
                return e.renderOne(t).render().el;
            };
        }(this));
        this.$(this.itemViewContainer).append(e);
        this.$el.toggle(this.collection.length > 0 || !this.hideIfEmpty);
        return this;
    };
    FlowList.prototype.renderOne = function(e) {
        var t;
        t = this.subview(new Views.Navigation.Tab({
            model: e
        }));
        t.consume(e.stream);
        t.on("closing", this.navigateIfActive, this);
        this.listenTo(t, "scroll", function(e) {
            return function(t) {
                return e.trigger("scroll", t);
            };
        }(this));
        this.listenTo(t, "reorder", this.reorder);
        return t;
    };
    FlowList.prototype.reorder = function(e, t) {
        var n;
        n = this._findTabIndex(t);
        if (n !== e) {
            this.initialTabOrder.splice(n, 1);
            this.initialTabOrder.splice(e, 0, String(t.get("id")));
            return t.saveWithRetry({
                group_tab_index: e
            }, {
                patch: !0
            });
        }
        return;
    };
    FlowList.prototype.removeReorderable = function() {
        return this.$el.reorderable("destroy");
    };
    FlowList.prototype.makeReorderable = function() {
        if (this.reorderable) {
            this.removeReorderable();
            return this.$el.reorderable({
                className: "reorderable-flow-list",
                drop: function(e) {
                    return function(t) {
                        return e.trigger("reorder", t, e.model);
                    };
                }(this)
            });
        }
        return;
    };
    FlowList.prototype.navigateIfActive = function(e) {
        var t;
        if (e.$el.hasClass("current")) {
            t = e.$el.index(".tab") + 1;
            if (t === 1) {
                return this.trigger("navigate", t + 1);
            }
            return this.trigger("navigate", t - 1);
        }
        return;
    };
    return FlowList;
}(Flowdock.HierarchicalView);