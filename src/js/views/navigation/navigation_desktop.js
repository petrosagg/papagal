var r, o = function(e, t) {
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
}, i = {}.hasOwnProperty;

r = require("views/overlays/new_tab");

Views.Navigation.Desktop = function(t) {
    function Desktop() {
        return Desktop.__super__.constructor.apply(this, arguments);
    }
    o(Desktop, t);
    Desktop.prototype.template = require("../../templates/navigation/navigation.mustache");
    Desktop.prototype.className = "desktop";
    Desktop.prototype.events = {
        "click .open-sidebar, .close-sidebar": "toggleSidebar",
        "click .search-tab": "toggleNewTab",
        "blur .nav-filter input": "clearFilter",
        "input .nav-filter input": "filterTabs",
        "mouseenter .close-sidebar, .search-tab": "showTooltip",
        "mouseleave .close-sidebar, .search-tab": "removeTooltip"
    };
    Desktop.prototype.keyboardEvents = _.extend({}, Views.Navigation.prototype.keyboardEvents, {
        filterTabs: "focusFilter"
    })
    Desktop.prototype.initialize = function(e) {
        Desktop.__super__.initialize.apply(this, arguments);
        return this.listenTo(e.manager, "change", this.viewChange);
    };
    Desktop.prototype.render = function() {
        this.$el.toggleClass("minimized", Flowdock.app.preferences.get("sidebar_collapsed"));
        _.defer(function(e) {
            return function() {
                return e.$el.find(".search-tab").toggleClass("open", e.newTabActive);
            };
        }(this));
        return Desktop.__super__.render.apply(this, arguments);
    };
    Desktop.prototype.filterTabs = function(e) {
        this.tabs.filter(e.target.value)
    }
    Desktop.prototype.focusFilter = function(e) {
        this.$el.find(".nav-filter input").focus()
    }
    Desktop.prototype.clearFilter = function(e) {
        this.$el.find(".nav-filter input").val('')
        this.tabs.filter('')
    }
    Desktop.prototype.toggleSidebar = function() {
        var e, t;
        e = !this.$el.hasClass("minimized");
        if (e) {
            t = Flowdock.ANALYTICS_EVENT_TYPES.sidebar_collapse;
        } else {
            t = Flowdock.ANALYTICS_EVENT_TYPES.sidebar_expand;
        }
        Flowdock.analytics.track(t);
        Flowdock.app.preferences.save({
            sidebar_collapsed: e
        });
        return Flowdock.app.manager.preserveScrolling(function(t) {
            return function() {
                t.removeTooltip();
                t.$el.toggleClass("minimized", e);
                return t.tabs.refreshScrollbar();
            };
        }(this));
    };
    Desktop.prototype.toggleNewTab = function(e) {
        if (this.newTabActive) {
            return Flowdock.app.router.activatePrevious();
        }
        return Flowdock.app.router.showNewTab();
    };
    Desktop.prototype.viewChange = function(e) {
        this.newTabActive = e instanceof r;
        return this.$el.find(".search-tab").toggleClass("open", this.newTabActive);
    };
    Desktop.prototype.showTooltip = function(e) {
        var t;
        if (!this.$el.hasClass("minimized")) {
            t = $("<div>").addClass("nav-footer-tooltip");
            t.text($(e.currentTarget).data("tipsy-title"));
            return this.$(".nav-footer").append(t);
        }
    };
    Desktop.prototype.removeTooltip = function() {
        if (this.$el.hasClass("minimized")) {
            return undefined;
        }
        return this.$(".nav-footer-tooltip").remove();
    };
    return Desktop;
}(Views.Navigation);
