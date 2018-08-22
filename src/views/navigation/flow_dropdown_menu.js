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

Views.Navigation.FlowDropdownMenu = function(t) {
    function FlowDropdownMenu() {
        return FlowDropdownMenu.__super__.constructor.apply(this, arguments);
    }
    r(FlowDropdownMenu, t);
    FlowDropdownMenu.prototype.template = require("../../templates/navigation/flow_dropdown_menu.mustache");
    FlowDropdownMenu.prototype.partials = {
        usersIcon: require("../../templates/icons/users.mustache"),
        toggleTeam: require("../../templates/navigation/toggle_team.mustache")
    };
    FlowDropdownMenu.prototype.serializeData = function() {
        return {
            toggledOn: !this.atTeamEnabled()
        };
    };
    FlowDropdownMenu.prototype.onAfterRender = function() {
        return this.listenTo(this.model, "change:team_notifications", function(e) {
            return function() {
                return e.renderTeamNotificationToggle();
            };
        }(this));
    };
    FlowDropdownMenu.prototype.atTeamEnabled = function() {
        return this.model.receivesTeamNotifications();
    };
    FlowDropdownMenu.prototype.events = _.extend({
        "click .show-users": "openPeopleManager",
        "click .show-sources": "openInboxSources",
        "click .show-settings": "openFlowSettings",
        "click .toggle-ignore-team": "toggleIgnoreTeam"
    }, Views.Navigation.SidebarDropdownMenu.prototype.events);
    FlowDropdownMenu.prototype.openPeopleManager = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.flow_menu_members_click);
        return Flowdock.app.manager.openFlowSettings(this.model, "preferences");
    };
    FlowDropdownMenu.prototype.openInboxSources = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.flow_menu_integrations_click);
        return Flowdock.app.manager.openFlowSettings(this.model, "integrations");
    };
    FlowDropdownMenu.prototype.openFlowSettings = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.flow_menu_settings_click);
        return Flowdock.app.manager.openFlowSettings(this.model);
    };
    FlowDropdownMenu.prototype.toggleIgnoreTeam = function(e) {
        var t, n;
        n = !this.model.receivesTeamNotifications();
        n ? Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.flow_menu_unmute_team_click) : Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.flow_menu_mute_team_click);
        e.preventDefault();
        e.stopImmediatePropagation();
        setTimeout(function(e) {
            return function() {
                return e.$el.parent().click();
            };
        }(this), 100);
        if (typeof (t = this.model).saveWithRetry == "function") {
            return t.saveWithRetry({
                team_notifications: !this.model.receivesTeamNotifications()
            }, {
                patch: !0
            });
        }
        return;
    };
    FlowDropdownMenu.prototype.renderTeamNotificationToggle = function() {
        return this.$el.find(".toggle-ignore-team").html(Helpers.renderTemplate(require("../../templates/navigation/toggle_team.mustache"))({
            toggledOn: !this.atTeamEnabled()
        }));
    };
    return FlowDropdownMenu;
}(Views.Navigation.SidebarDropdownMenu);
