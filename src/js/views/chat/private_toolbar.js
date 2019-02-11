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

Views.Chat.PrivateToolbar = function(t) {
    function PrivateToolbar() {
        this.toggleInbox = r(this.toggleInbox, this);
        return PrivateToolbar.__super__.constructor.apply(this, arguments);
    }
    o(PrivateToolbar, t);
    PrivateToolbar.prototype.template = require("../../templates/toolbar/private_toolbar.mustache");
    PrivateToolbar.prototype.id = "toolbar";
    PrivateToolbar.prototype.className = "private-toolbar";
    PrivateToolbar.prototype.events = {
        "click #sidebar-button": "openSidebar"
    };
    PrivateToolbar.prototype.initialize = function(e) {
        this.viewModel = e.viewModel;
    };
    PrivateToolbar.prototype.onAfterRender = function() {
        return this.model.fullyLoaded.done(function(e) {
            return function() {
                e.userView = e.subview(new Views.Chat.User({
                    model: e.model.otherParty(),
                    size: 72,
                    className: "user-avatar",
                    avatarOnly: false
                }));
                e.userView.setElement(e.$(".private-user"));
                e.userView.render();
                e.isSearchEnabled = Flowdock.app.features.F18656_search_1To1;
                if (e.isSearchEnabled) {
                    e.privateSearch = e.subview(new Views.Toolbar.Search({
                        model: e.model
                    }));
                    e.privateSearch.setElement(e.$("#private-search-form-item"));
                    e.privateSearch.render();
                    e.untilEnd(e.viewModel.asProperty("rhs")).onValue(e.toggleInbox);
                    e.untilEnd(e.viewModel.asProperty("lhs")).onValue(e.toggleInbox);
                    e.listenTo(e.privateSearch, "search:change", function(t) {
                        return e.trigger("search:change", t);
                    });
                    e.listenTo(e.privateSearch, "search:open", function() {
                        return e.$el.addClass("search-open");
                    });
                    e.listenTo(e.privateSearch, "search:close", function() {
                        return e.$el.removeClass("search-open");
                    });
                    return e.listenTo(e.privateSearch, "triggerPrivateSearchToggle", e.triggerToggle);
                }
                return;
            };
        }(this));
    };
    PrivateToolbar.prototype.onSearchChange = function(e) {
        this.privateSearch.onSearchChange(e);
        return this.toggleFocus();
    };
    PrivateToolbar.prototype.closePrivateSearch = function() {
        return this.privateSearch.clearFilter();
    };
    PrivateToolbar.prototype.triggerToggle = function() {
        var e;
        this.viewModel.setRhsToNull();
        e = $(".right-panel").hasClass("inbox-panel");
        if (e) {
            return Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.inbox_toggle_on);
        }
        return Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.inbox_toggle_off);
    };
    PrivateToolbar.prototype.toggleFocus = function() {
        var e, t;
        t = document.activeElement;
        e = s.call(this.$(".tokenist, input"), t) >= 0;
        return this.$el.toggleClass("search-open", e || !this.privateSearch.isEmpty());
    };
    PrivateToolbar.prototype.toggleInbox = function() {
        var e;
        e = this.viewModel.get("rhs") || this.viewModel.get("lhs") === "inbox";
        return this.$("#inbox-toggle").toggleClass("active", !!e);
    };
    PrivateToolbar.prototype.openSidebar = function() {
        return Flowdock.eventBus.trigger("mobile:show-navigation");
    };
    PrivateToolbar.prototype.destructor = function() {
        PrivateToolbar.__super__.destructor.apply(this, arguments);
        return this.userView = null;
    };
    return PrivateToolbar;
}(Flowdock.ItemView);
