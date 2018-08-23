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

Views.Navigation.NotificationCenter = function(t) {
    function NotificationCenter() {
        return NotificationCenter.__super__.constructor.apply(this, arguments);
    }
    r(NotificationCenter, t);
    NotificationCenter.prototype.template = require("../../templates/navigation/notification_center.mustache");
    NotificationCenter.prototype.id = "notification-center";
    NotificationCenter.prototype.className = "dropdown e";
    NotificationCenter.prototype.events = {
        "click .mark-all-read": "markAllRead",
        "click .notification-center-filter.unselected": "toggleSelection",
        "click .notification-center-filter": function(e) {
            if (e != null) {
                return e.stopPropagation();
            }
            return;
        }
    };
    NotificationCenter.prototype.initialize = function() {
        this.untilEnd(this.collection.unreadProperty()).onValue(this, "updateCount");
        return NotificationCenter.__super__.initialize.apply(this, arguments);
    };
    NotificationCenter.prototype.onBeforeRender = function() {
        var e;
        if ((e = this.dropdown) != null) {
            e.remove()
        };
        return this.removeSubview(this.notificationList);
    };
    NotificationCenter.prototype.onAfterRender = function() {
        this.dropdown = new Flowdock.Dropdown({
            el: this.$el
        });
        this.notificationList = this.subview(new Views.Navigation.NotificationList({
            el: this.$("#notification-list"),
            collection: this.collection,
            users: this.users
        }));
        this.notificationList.render();
        this.listenTo(this.notificationList, "navigate", function() {
            return this.dropdown.close();
        });
        this.listenTo(this.dropdown, "open close", function() {
            return this.onToggle();
        });
        this.toggleMarkAllLink();
        this.$("#notification-center-toggle").tipsy();
        return this.notificationList.changeSelectionTo(this.currentListSelection());
    };
    NotificationCenter.prototype.onToggle = function() {
        var e;
        e = this.$("#notification-menu");
        e.removeClass("compact");
        if (e[0].getBoundingClientRect().right > $(window).width()) {
            return e.addClass("compact");
        }
        return;
    };
    NotificationCenter.prototype.toggleMarkAllLink = function() {
        return this.$(".mark-all-read").toggleClass("disabled", !this.collection.hasUnreads());
    };
    NotificationCenter.prototype.serializeData = function() {
        return {
            count: this.collection.unreadCount(),
            toolTip: this.toolTipText()
        };
    };
    NotificationCenter.prototype.destructor = function() {
        var e;
        if ((e = this.dropdown) != null) {
            e.remove()
        };
        NotificationCenter.__super__.destructor.apply(this, arguments);
        return this.dropdown = this.notificationList = null;
    };
    NotificationCenter.prototype.updateCount = function(e) {
        var t;
        this.$(".notification-badge").text(e);
        this.$el.toggleClass("new-mentions", e > 0);
        this.toggleMarkAllLink();
        this.$("#notification-center-toggle").attr("title", this.toolTipText());
        t = this.collection.unreadMentionCount();
        this.$(".atMentions").text("(" + t + ")").toggle(t > 0);
        return this.$(".allMentions").text("(" + e + ")").toggle(e > 0);
    };
    NotificationCenter.prototype.markAllRead = function(e) {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.mark_all_read);
        if (e != null) {
            e.preventDefault()
        };
        if (e != null) {
            e.stopImmediatePropagation()
        };
        return this.collection.markAllRead();
    };
    NotificationCenter.prototype.toolTipText = function() {
        var e;
        e = this.collection.unreadCount();
        if (e === 0) {
            return "No unread notifications";
        }
        if (e > 1) {
            return e + " unread notifications";
        }
        return e + " unread notification";
    };
    NotificationCenter.prototype.toggleSelection = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        if (e != null) {
            e.stopPropagation()
        };
        this.$(".notification-center-filter").toggleClass("selected unselected");
        return this.notificationList.changeSelectionTo(this.currentListSelection());
    };
    NotificationCenter.prototype.currentListSelection = function() {
        if (this.$(".notification-center-filter.selected").hasClass("all")) {
            return "all";
        }
        return "mentions";
    };
    return NotificationCenter;
}(Flowdock.ItemView);
