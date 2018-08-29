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

Views.Toolbar.UserCounter = function(t) {
    function UserCounter() {
        return UserCounter.__super__.constructor.apply(this, arguments);
    }
    r(UserCounter, t);
    UserCounter.prototype.template = require("../../templates/toolbar/user_counter.mustache");
    UserCounter.prototype.tagName = "a";
    UserCounter.prototype.id = "user-counter";
    UserCounter.prototype.modelEvents = {
        "change:access_mode": "privacyChange"
    };
    UserCounter.prototype.collectionEvents = {
        add: "renderContent",
        remove: "renderContent",
        reset: "renderContent",
        change: "renderContent"
    };
    UserCounter.prototype.events = {
        click: "navigate"
    };
    UserCounter.prototype.keyboardEvents = {
        toggleUserList: "navigate"
    };
    UserCounter.prototype.partials = {
        icon: require("../../templates/icons/users.mustache")
    };
    UserCounter.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.untilEnd(this.collection.userPresenceUpdates()).debounce(300).throttle(1e3).onValue(this, "renderContent");
        this.expanded = false;
        return this.bindKeyboardEvents();
    };
    UserCounter.prototype.renderContent = function() {
        this.$(".count-total").text(this.collection.available().length);
        return this.$(".count-online").text(this.collection.online().length);
    };
    UserCounter.prototype.toggleExpanded = function(e) {
        return this.expanded = e;
    };
    UserCounter.prototype.onAfterRender = function() {
        this.renderContent();
        return this.privacyChange();
    };
    UserCounter.prototype.privacyChange = function() {
        return this.$el.toggleClass("invite-only", this.model.get("access_mode") === "invitation");
    };
    UserCounter.prototype.navigate = function() {
        if (Flowdock.app.manager.currentFlow === this.model) {
            if (this.expanded) {
                return this.trigger("close:user-list");
            }
            return this.trigger("open:user-list");
        }
        return;
    };
    return UserCounter;
}(Flowdock.ItemView);

_.extend(Views.Toolbar.UserCounter.prototype, Flowdock.KeyboardEvents);
