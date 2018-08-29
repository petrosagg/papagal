var r, o = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = require("./ignore_confirm.coffee");

Views.Navigation.NotificationList = function(t) {
    function NotificationList() {
        this.onIgnore = o(this.onIgnore, this);
        return NotificationList.__super__.constructor.apply(this, arguments);
    }
    i(NotificationList, t);
    NotificationList.prototype.id = "notification-list";
    NotificationList.prototype.tagName = "ul";
    NotificationList.prototype.collectionEvents = {
        add: "addItem",
        remove: "removeSubview",
        historyAdd: "addItems",
        reset: "onReset"
    };
    NotificationList.prototype.initialize = function() {
        this.rendered = !1;
        this.messageLoader = new Views.Shared.MessageLoader({
            collection: this.collection,
            direction: "backward"
        });
        return NotificationList.__super__.initialize.apply(this, arguments);
    };
    NotificationList.prototype.render = function() {
        this.rendered = !0;
        if (this.collection.length === 0 && this.collection.historyComplete.backward) {
            this.addEmptyMessage();
        } else {
            this.clearEmptyMessage();
            this.$el.append(this.renderItems(this.collection.models));
        }
        this.$el.append(this.messageLoader.render().el);
        return this;
    };
    NotificationList.prototype.renderItems = function(e) {
        var t, n, r, o;
        for (o = [], t = 0, n = e.length; n > t; t++) {
            r = e[t];
            o.push(this.renderItem(r));
        }
        return o;
    };
    NotificationList.prototype.renderItem = function(e) {
        var t;
        t = this.subview(new Views.Navigation.Notification({
            model: e,
            onIgnore: this.onIgnore
        }));
        this.listenTo(t, "navigate", function() {
            return this.trigger("navigate");
        });
        return t.render().$el;
    };
    NotificationList.prototype.addItem = function(e) {
        this.clearEmptyMessage();
        return this.$el.prepend(this.renderItem(e));
    };
    NotificationList.prototype.addItems = function(t) {
        if (this.rendered) {
            this.clearEmptyMessage();
            this.messageLoader.$el.detach();
            this.$el.append(this.renderItems(t));
            if (this.collection.historyComplete.backward) {
                this.messageLoader.remove();
                if (this.collection.length === 0) {
                    return this.addEmptyMessage();
                }
                return this.$el.append(Helpers.renderTemplate(require("../../templates/navigation/notification_list_no_more.mustache"))());
            }
            return this.$el.append(this.messageLoader.el);
        }
        return;
    };
    NotificationList.prototype.onReset = function() {
        var e, t, n, r;
        for (n = this.subviews.slice(), e = 0, t = n.length; t > e; e++) {
            r = n[e];
            this.removeSubview(r);
        }
        return this.render();
    };
    NotificationList.prototype.addEmptyMessage = function() {
        var t;
        t = require("../../templates/navigation/notification_list_empty.mustache");
        this.$empty = $(t.render({
            nick: Flowdock.app.user.get("nick")
        }));
        return this.$el.html(this.$empty);
    };
    NotificationList.prototype.clearEmptyMessage = function() {
        var e;
        if ((e = this.$empty) != null) {
            e.remove()
        };
        return this.$empty = null;
    };
    NotificationList.prototype.destructor = function() {
        NotificationList.__super__.destructor.apply(this, arguments);
        return this.messageLoader = this.$empty = this.confirmation = null;
    };
    NotificationList.prototype.changeSelectionTo = function(e) {
        return this.$el.toggleClass("mentions-only", e === "mentions");
    };
    NotificationList.prototype.onIgnore = function(e, t) {
        var n, o, i, s;
        i = function(e) {
            return function() {
                return e.removeSubview(e.confirmation);
            };
        }(this);
        s = function(t) {
            if (typeof e.saveWithRetry == "function") {
                return e.saveWithRetry({
                    team_notifications: t
                }, {
                    patch: !0
                });
            }
            return;
        };
        if (this.confirmation) {
            i()
        };
        this.confirmation = this.subview(new r({
            flowName: e.get("name"),
            onConfirm: function() {
                return s(!1);
            },
            onUndo: function() {
                s(!0);
                return i();
            },
            onCancel: i
        }));
        n = this.confirmation.render().$el;
        o = this.findSubviews(t)[0].$el;
        o.before(n);
        return Helpers.transitionIn(n, "expand");
    };
    return NotificationList;
}(Flowdock.HierarchicalView);
