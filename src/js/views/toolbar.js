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

Views.Toolbar = function(t) {
    function Toolbar() {
        this.toggleInbox = r(this.toggleInbox, this);
        this.toggleUsers = r(this.toggleUsers, this);
        return Toolbar.__super__.constructor.apply(this, arguments);
    }
    o(Toolbar, t);
    Toolbar.prototype.template = require("../templates/toolbar/toolbar.mustache");
    Toolbar.prototype.id = "toolbar";
    Toolbar.prototype.events = {
        "click #user-add": "openPeopleManager",
        "click #inbox-toggle": "triggerToggle"
    };
    Toolbar.build = function(e) {
        if (Flowdock.mobile) {
            return new Views.Toolbar.Mobile(e);
        }
        return new Views.Toolbar.Desktop(e);
    };
    Toolbar.prototype.initialize = function(e) {
        this.viewModel = e.viewModel;
        this.search = this.subview(new Views.Toolbar.Search({
            model: this.model
        }));
        return this.userCounter = this.subview(new Views.Toolbar.UserCounter({
            model: this.model,
            collection: this.model.users
        }));
    };
    Toolbar.prototype.onBeforeRender = function() {
        return this.stopListening(this.search);
    };
    Toolbar.prototype.onAfterRender = function(e) {
        this.search.setElement(this.$("#search-form-item"));
        this.search.render();
        this.userCounter.setElement(this.$("#user-counter"));
        this.userCounter.render();
        this.untilEnd(this.viewModel.asProperty("users")).onValue(this.toggleUsers);
        this.untilEnd(this.viewModel.asProperty("rhs")).onValue(this.toggleInbox);
        this.untilEnd(this.viewModel.asProperty("lhs")).onValue(this.toggleInbox);
        this.listenTo(this.search, "search:change", function(e) {
            return function(t) {
                return e.trigger("search:change", t);
            };
        }(this));
        this.listenTo(this.search, "search:open", function(e) {
            return function() {
                return e.$el.addClass("search-open");
            };
        }(this));
        this.listenTo(this.search, "search:close", function(e) {
            return function() {
                return e.$el.removeClass("search-open");
            };
        }(this));
        this.listenTo(this.userCounter, "close:user-list", function() {
            return this.trigger("close:user-list");
        });
        this.listenTo(this.userCounter, "open:user-list", function() {
            return this.trigger("open:user-list");
        });
        return this.renderInboxActivity();
    };
    Toolbar.prototype.toggleUserList = function(e) {
        return this.userCounter.toggleExpanded(e);
    };
    Toolbar.prototype.onSearchChange = function(e) {
        this.search.onSearchChange(e);
        return this.toggleFocus();
    };
    Toolbar.prototype.toggleFocus = function() {
        var e, t;
        t = document.activeElement;
        e = s.call(this.$(".tokenist, input"), t) >= 0;
        return this.$el.toggleClass("search-open", e || !this.search.isEmpty());
    };
    Toolbar.prototype.openPeopleManager = function() {
        return Flowdock.app.manager.openFlowSettings(this.model, "preferences?add_people=true");
    };
    Toolbar.prototype.triggerToggle = function() {
        var e, t;
        this.$("#inbox-toggle").hasClass("activity") ? (this.search.clearFilter(), this.viewModel.showInbox({
            savePreference: !0,
            scroll: !0
        }), this.$("#inbox-toggle").removeClass("activity")) : this.viewModel.toggleRhs();
        t = Flowdock.app.preferences;
        if (t.hasChanged()) {
            t.saveWithRetry()
        };
        e = $(".right-panel").hasClass("inbox-panel");
        if (e) {
            return Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.inbox_toggle_on);
        }
        return Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.inbox_toggle_off);
    };
    Toolbar.prototype.toggleUsers = function(e) {
        return this.$("#user-counter").toggleClass("active", !!e);
    };
    Toolbar.prototype.toggleInbox = function() {
        var e;
        e = this.viewModel.get("rhs") || this.viewModel.get("lhs") === "inbox";
        return this.$("#inbox-toggle").toggleClass("active", !!e);
    };
    Toolbar.prototype.renderInboxActivity = function() {
        return this.model.fullyLoaded.done(function(e) {
            return function() {
                var t;
                t = e.viewModel.stateProperty().map(".inbox");
                return e.untilEnd(Flowdock.app.flowActivities.activityFor(e.model)).filter(t.not()).map(".inbox").onValue(e, "updateInboxActivity");
            };
        }(this));
    };
    Toolbar.prototype.updateInboxActivity = function(e) {
        return this.$("#inbox-toggle").toggleClass("activity", e);
    };
    Toolbar.prototype.destructor = function() {
        Toolbar.__super__.destructor.apply(this, arguments);
        return this.search = this.userCounter = null;
    };
    Toolbar.prototype.serializeData = function() {
        return {
            searchFormInlineStyle: ""
        };
    };
    return Toolbar;
}(Flowdock.ItemView);
