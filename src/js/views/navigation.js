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

Views.Navigation = function(e) {
    function Navigation() {
        return Navigation.__super__.constructor.apply(this, arguments);
    }
    o(Navigation, e);
    Navigation.prototype.id = "tab-bar";
    Navigation.prototype.tagName = "nav";
    Navigation.prototype.keyboardEvents = {
        quickMute: "quickMute"
    };
    Navigation.build = function(e) {
        if (Flowdock.mobile) {
            return new Views.Navigation.Mobile(e);
        }
        return new Views.Navigation.Desktop(e);
    };
    Navigation.prototype.initialize = function(e) {
        this.userMenu = new Views.Navigation.UserMenu({
            model: e.user,
            manager: e.manager
        });
        this.tabs = this.subview(new Views.Navigation.Tabs.build({
            collection: this.collection,
            manager: e.manager
        }));
        this.notificationCenter = this.subview(new Views.Navigation.NotificationCenter({
            collection: e.notifications
        }));
        this.isSpotlightSearchEnabled = Flowdock.app.features.F18968_spotlight_search;
        if (this.isSpotlightSearchEnabled) {
            this.spotlightSearch = new Views.Navigation.SpotlightSearch({
                manager: e.manager
            })
        };
        this.tabListShadowTop = $("<div>").addClass("tab-list-shadow").append($("<i>").addClass("fa fa-chevron-up activity-icon"));
        return this.bindKeyboardEvents();
    };
    Navigation.prototype.render = function() {
        var e, t;
        this.$el.html(Helpers.renderTemplate(this.template)());
        t = this.$(".nav-header");
        e = this.$(".nav-content");
        this.userMenu.setElement(this.$("#user-menu-toggle"));
        this.userMenu.render();
        t.append(this.notificationCenter.render().$el);
        e.append(this.tabListShadowTop);
        if (this.isSpotlightSearchEnabled) {
            e.append(this.spotlightSearch.render().el)
        };
        e.append(this.tabs.render().el);
        return this;
    };
    Navigation.prototype.destructor = function() {
        var e;
        if ((e = this.userMenu) != null) {
            e.trigger("end")
        };
        Navigation.__super__.destructor.apply(this, arguments);
        return this.userMenuToggle = this.userMenu = this.tabs = this.notificationCenter = null;
    };
    Navigation.prototype.quickMute = function() {
        return this.userMenu.quickMute();
    };
    return Navigation;
}(Flowdock.HierarchicalView);

_.extend(Views.Navigation.prototype, Flowdock.KeyboardEvents);
