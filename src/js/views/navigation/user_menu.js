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

Views.Navigation.UserMenu = function(t) {
    function UserMenu() {
        return UserMenu.__super__.constructor.apply(this, arguments);
    }
    r(UserMenu, t);
    UserMenu.prototype.events = {
        "click #logout": "logout",
        "click .preferences": "openPreferences",
        "click .flow-members": "openPeopleManager",
        "click .inbox-sources": "openInboxSources",
        "click .flow-settings": "openFlowSettings",
        "click .mute a[data-mute]": "mute",
        "click .unmute": "unmute"
    };
    UserMenu.prototype.modelEvents = {
        "change:nick": "renderName"
    };
    UserMenu.prototype.initialize = function(e) {
        return this.flowManager = e.manager;
    };
    UserMenu.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/navigation/user_menu.mustache"))({}));
        this.renderName();
        this.renderAvatar();
        this.dropdown = new Flowdock.Dropdown({
            el: this.$el
        });
        this.initMute();
        return this;
    };
    UserMenu.prototype.initMute = function() {
        var e, t;
        this.$(".mute").delayedHover("open");
        t = new Bacon.Bus();
        e = Bacon.interval(6e4, 1).merge(t);
        this.addStream(Flowdock.app.preferences.asProperty("muted").sampledBy(e).map(Number).map(this.userReadable).assign(this.$(".dropdown-toggle"), "attr", "title"));
        return this.addStream(Flowdock.app.preferences.mute().onValue(function(e) {
            return function(n) {
                e.muted = n;
                t.push(1);
                e.$(".user-menu-name").toggleClass("icon-mute", n);
                e.$(".unmute").toggle(n);
                return e.$(".mute").toggle(!n);
            };
        }(this)));
    };
    UserMenu.prototype.mute = function(e) {
        var t;
        if (this.muted) {
            return this.unmute();
        }
        if (t = $(e.target).data("mute")) {
            if (t === "0") {
                Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.user_menu_unmute_click);
            } else Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.user_menu_mute_click);
            return this.muteFor(1e3 * t * 60);
        }
        return;
    };
    UserMenu.prototype.unmute = function() {
        Flowdock.app.preferences.set("muted", "0");
        return Flowdock.app.preferences.save();
    };
    UserMenu.prototype.quickMute = function() {
        if (this.muted) {
            return this.unmute();
        }
        return this.muteFor(18e5);
    };
    UserMenu.prototype.muteFor = function(e) {
        Flowdock.app.preferences.set("muted", String(e + Date.now()));
        return Flowdock.app.preferences.save();
    };
    UserMenu.prototype.openPreferences = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.user_menu_preferences_click);
        return Flowdock.app.manager.openPreferences("preferences");
    };
    UserMenu.prototype.renderName = function() {
        return this.$(".user-menu-name").text(this.model.get("nick"));
    };
    UserMenu.prototype.renderAvatar = function() {
        var e;
        e = this.subview(new Views.Shared.Avatar({
            model: this.model,
            size: 80,
            className: "user-menu-avatar"
        }));
        this.$(".dropdown-toggle").prepend("<div class='rounded-avatar'>");
        return this.$(".rounded-avatar").append(e.render().$el);
    };
    UserMenu.prototype.userReadable = function(e) {
        var t;
        t = (e - Date.now()) / 1e3 / 60;
        t = Math.ceil(Math.max(t, 0));
        if (t === 0) {
            return "";
        }
        if (t === 1) {
            return "Muted for one more minute";
        }
        return "Muted for " + t + " more minutes";
    };
    UserMenu.prototype.logout = function(e) {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.user_menu_logout_click);
        e.preventDefault();
        return Helpers.postBrowser("/session", "delete");
    };
    UserMenu.prototype.destructor = function() {
        var e;
        if ((e = this.dropdown) != null) {
            e.remove()
        };
        this.dropdown = this.flowManager = null;
        return UserMenu.__super__.destructor.apply(this, arguments);
    };
    return UserMenu;
}(Flowdock.ItemView);

_.extend(Views.Navigation.UserMenu.prototype, Flowdock.KeyboardEvents);
