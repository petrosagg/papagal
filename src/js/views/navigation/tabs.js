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

Views.Navigation.Tabs = function(e) {
    function Tabs() {
        return Tabs.__super__.constructor.apply(this, arguments);
    }
    r(Tabs, e);
    Tabs.DROPDOWN_DELAY = 500;
    Tabs.prototype.id = "tab-list";
    Tabs.prototype.events = {
        "click .tab-list-shadow.activity": "scrollToActivity"
    };
    Tabs.build = function(e) {
        if (Flowdock.mobile) {
            return new Views.Navigation.Tabs.Mobile(e);
        }
        return new Views.Navigation.Tabs.Desktop(e);
    };
    Tabs.prototype.initialize = function() {
        var e;
        e = this.collection.getCollectionOfType(Collections.Flows);
        this.listenTo(e, "add change:open", this.flowOpenChanged);
        this.renderedOrganizations = {};
        this.$tabListContent = $("<div>").addClass("tab-list-content scroll-content touch-scrollable");
        this.$tabListShadowTop = $("<div>").addClass("tab-list-shadow top").append($("<i>").addClass("fa fa-chevron-up activity-icon"));
        this.$tabListShadowBottom = $("<div>").addClass("tab-list-shadow bottom").append($("<i>").addClass("fa fa-chevron-down activity-icon"));
        return this.listenToOnce(this, "view:attach:after", function(e) {
            return function() {
                var t;
                t = e.$tabListContent.asEventStream("scroll");
                return e.tabListScrollStream = e.untilEnd(t.merge(Flowdock.resize.window.move));
            };
        }(this));
    };
    Tabs.prototype.render = function() {
        var e, t, n, r, o, i, s, a, u, l, c;
        for (this.initialTabOrder = _.sortBy(_.keys((u = Flowdock.app.tabOrder) != null ? u.organizations : undefined), function(e) {
            var t;
            if ((t = Flowdock.app.tabOrder) != null) {
                return t.organizations[e];
            }
            return;
        }).map(function(e) {
            return String(e);
        }), this.$el.empty(), this.$el.append(this.$tabListContent), this.scrollbar && this.$tabListContent.append(this.scrollbar.render().$el), 
        n = this.collection.getCollectionOfType(Collections.Flows), a = this.collection.getCollectionOfType(Collections.PrivateConversations), 
        e = _.uniq(n.pluck("organization"), function(e) {
            return e.id;
        }), t = _.keys((l = Flowdock.app.tabOrder) != null ? l.organizations : undefined).filter(function(t) {
            return !_.any(e, function(e) {
                return String(e.id) === String(t);
            });
        }).map(function(e) {
            return {
                id: e
            };
        }), c = e.concat(t), r = 0, o = c.length; o > r; r++) {
            s = c[r];
            this.renderOrganization(s);
        }
        i = new BackboneProjections.Sorted(new BackboneProjections.Filtered(a, {
            filter: function(e) {
                return e.get("open");
            }
        }), {
            comparator: function(e) {
                return e.get("name");
            }
        });
        this.privateList = this.subview(new Views.Navigation.FlowList({
            className: "privates-list",
            title: "1-to-1s",
            collection: i,
            reorderable: false,
            hideIfEmpty: true
        }));
        this.listenTo(this.privateList, "scroll", this.scrollTo, this);
        this.listenTo(this.privateList, "navigate", this.navigateToNthTab, this);
        this.$tabListContent.append(this.privateList.render().$el);
        this.rendered = true;
        this.sortOrganizations();
        this.$el.append(this.$tabListShadowTop);
        this.$el.append(this.$tabListShadowBottom);
        this.toggleReorderables();
        return this;
    };
    Tabs.prototype._findTabIndex = function(e) {
        var t;
        t = this.initialTabOrder.indexOf(String(e));
        if (t < 0) {
            return this.initialTabOrder.push(String(e));
        }
        return t;
    };
    Tabs.prototype.renderOrganization = function(e) {
        var t, n, r;
        if (this.renderedOrganizations[e.id] == null) {
            e = new Models.Organization(e);
            n = this.collection.getCollectionOfType(Collections.Flows);
            t = new Collections.OrganizationFlows(n, {
                organization: e.id,
                comparator: "name"
            });
            r = this.subview(new Views.Navigation.FlowList({
                model: e,
                collection: t,
                hideIfEmpty: true,
                reorderable: true
            }));
            this.renderedOrganizations[e.id] = {
                view: r,
                organization: e
            };
            this.listenTo(t, "add remove", this.toggleReorderables);
            this.listenTo(r, "scroll", this.scrollTo);
            this.listenTo(r, "navigate", this.navigateToNthTab);
            this.listenTo(r, "reorder", this.reorderOrganization);
            return this.$tabListContent.append(r.render().el);
        }
    };
    Tabs.prototype.reorderOrganization = function(e, t) {
        var n, r, o;
        n = String(t.get("id"));
        o = t.get("url");
        r = this._findTabIndex(n);
        if (e !== r) {
            this.initialTabOrder.splice(r, 1);
            this.initialTabOrder.splice(e, 0, n);
            return $.ajax({
                url: Helpers.apiUrl(o + "/reorder"),
                type: "POST",
                data: {
                    tab_index: e
                }
            });
        }
        return;
    };
    Tabs.prototype.sortOrganizations = function() {
        var e;
        if (this.rendered) {
            e = _.sortBy(_.keys(this.renderedOrganizations), this._findTabIndex, this);
            this.$tabListContent.prepend(e.map(function(e) {
                return function(t) {
                    return e.renderedOrganizations[t].view.el;
                };
            }(this)));
            return this.$tabListContent.append(this.privateList.el);
        }
    };
    Tabs.prototype.toggleReorderables = function() {
        var e, t, n, r, o, i, s;
        t = _.filter(this.renderedOrganizations, function(e, t) {
            return e.view.isVisible();
        }).length;
        if (t === 1) {
            n = this.renderedOrganizations;
            o = [];
            for (e in n) {
                s = n[e];
                o.push(s.view.removeReorderable());
            }
            return o;
        }
        r = this.renderedOrganizations;
        i = [];
        for (e in r) {
            s = r[e];
            i.push(s.view.makeReorderable());
        }
        return i;
    };
    Tabs.prototype.toggleShadow = function() {
        var e, t, n, r, o;
        t = e = r = n = false;
        o = this.$tabListContent[0].getBoundingClientRect();
        this.$(".activity-indicator-chat, .activity-indicator-mentions").each(function() {
            var i, s;
            i = this.getBoundingClientRect();
            s = $(this).hasClass("activity-indicator-mentions");
            if (i.bottom < o.top) {
                t = true, s && (r = true)
            };
            if (i.bottom > o.bottom && (e = true, s)) {
                return n = true;
            }
            return;
        });
        this.$tabListShadowBottom.toggle(!this._isContentAtBottom());
        this.$tabListShadowBottom.toggleClass("activity", e);
        this.$tabListShadowBottom.toggleClass("mention", n);
        this.$tabListShadowTop.toggle(t);
        this.$tabListShadowTop.toggleClass("activity", t);
        return this.$tabListShadowTop.toggleClass("mention", r);
    };
    Tabs.prototype.scrollToActivity = function(e) {
        var t;
        t = this.$(".has-activity a.tab-link");
        if ($(e.target).hasClass("top")) {
            return this.scrollTo(t.first());
        }
        return this.scrollTo(t.last());
    };
    Tabs.prototype.flowOpenChanged = function(e) {
        if (this.rendered && e.get("open")) {
            this.renderOrganization(e.get("organization"));
            return this.sortOrganizations();
        }
        return;
    };
    Tabs.prototype.scrollTo = function(e) {
        var t, n, r;
        n = e[0].getBoundingClientRect();
        r = this.$tabListContent[0].getBoundingClientRect();
        t = n.top > r.top && n.bottom - 10 < r.bottom;
        if (t) {
            return undefined;
        }
        return this.$tabListContent.animate({
            scrollTop: e[0].parentNode.offsetTop + e[0].offsetTop
        }, 300);
    };
    Tabs.prototype.navigateToNthTab = function(e) {
        var t, n;
        if (e != null) {
            if (_.isNumber(e)) {
                t = e;
            } else {
                if (typeof e.preventDefault == "function") {
                    e.preventDefault()
                };
                t = Number(String.fromCharCode(this._normalizedNumberKeyCode(e)));
                if (t === 0) {
                    t = 10
                };
            }
            n = this.$(".tab").eq(t - 1);
            if (n.length !== 0) {
                return n.find("a.tab-link").click();
            }
            return Flowdock.app.router.navigateTo({
                showNewTab: true,
                trigger: true
            });
        }
        return;
    };
    Tabs.prototype._normalizedNumberKeyCode = function(e) {
        var t, n;
        t = 57;
        n = 48;
        if (e.originalEvent.which > t) {
            return e.originalEvent.which - n;
        }
        return e.originalEvent.which;
    };
    Tabs.prototype._isContentAtBottom = function() {
        return this.$tabListContent.scrollTop() + this.$tabListContent.innerHeight() >= this.$tabListContent[0].scrollHeight;
    };
    Tabs.prototype.destructor = function() {
        Tabs.__super__.destructor.apply(this, arguments);
        return this.$tabListContent = this.$tabListShadowTop = this.$tabListShadowBottom = this.renderedOrganizations = this.initialTabOrder = this.privateList = null;
    };
    return Tabs;
}(Flowdock.HierarchicalView);

_.extend(Views.Navigation.Tabs.prototype, Flowdock.KeyboardEvents);
