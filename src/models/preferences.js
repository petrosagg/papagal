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

r = require("./notification_preferences");

Models.Preferences = function(e) {
    function Preferences() {
        return Preferences.__super__.constructor.apply(this, arguments);
    }
    o(Preferences, e);
    Preferences.prototype.url = Helpers.apiUrl("/preferences");
    Preferences.prototype.defaults = {
        locale: "en-24h",
        link_previews: !0,
        audio_volume: "0.9",
        typing_activity: !0,
        push_email: !0,
        keyboard_shortcuts: !0,
        muted: "0",
        emphasize_own_nick: !0,
        enter_sends_message: !0,
        sidebar_collapsed: !1,
        inbox_only: !1,
        fade_on_back: !1,
        single_view_in_inbox: !1,
        emoji_size: "0",
        theme: "classic"
    };
    Preferences.prototype.initialize = function(e, t) {
        if (t == null) {
            t = {}
        };
        this.user = t.user;
        this._initFlowPreferences(e != null ? e.flows : void 0);
        this._setNotificationPreferences(e != null ? e.notifications : void 0);
        this.subscriptions = [];
        if (this.collection) {
            this.listenTo(this.collection, "add", this.flowAdded);
            return this.listenTo(this.collection, "change:open", this.flowOpenChanged);
        }
        return;
    };
    Preferences.prototype.consume = function(e) {
        return this.subscriptions.push(e.onValue(function(e) {
            return function(t) {
                var n;
                if (t.event === "preference-change") {
                    e.set(e.parse(t.content.preferences));
                    return e._setNotificationPreferences((n = t.content.preferences) != null ? n.notifications : void 0);
                }
                return;
            };
        }(this)));
    };
    Preferences.prototype.cleanup = function() {
        var e, t, n, r;
        for (n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
            (r = n[e])();
        }
        return this.subscriptions = null;
    };
    Preferences.prototype.parse = function(e, t) {
        var n, r, o, i, s;
        for (o in e) {
            s = e[o];
            e[o] = this.mapBooleanValue(s);
        }
        i = e.flows;
        for (n in i) {
            r = i[n];
            for (o in r) {
                s = r[o];
                e.flows[n][o] = this.mapBooleanValue(s);
            }
        }
        return e;
    };
    Preferences.prototype.mapBooleanValue = function(e) {
        switch (e) {
          case "true":
            return !0;

          case "false":
            return !1;

          default:
            return e;
        }
    };
    Preferences.prototype.flip = function(e) {
        var t;
        t = {};
        t[e] = !this.get(e);
        this.save(t);
        return this;
    };
    Preferences.prototype.toJSON = function() {
        var e, t, n, r, o, i, s;
        e = _.clone(this.attributes);
        o = _.omit(e, [ "flows", "notifications" ]);
        for (r in o) {
            s = o[r];
            e[r] = String(s);
        }
        e.flows = {};
        i = this._flowPreferences;
        for (t in i) {
            n = i[t];
            e.flows[t] = n.toJSON();
        }
        return {
            preferences: e
        };
    };
    Preferences.prototype.hasChanged = function() {
        return Backbone.Model.prototype.hasChanged.apply(this, arguments) || _.reduce(this._flowPreferences, function(e, t) {
            return t.hasChanged() || e;
        }, !1);
    };
    Preferences.prototype.linkPreviews = function() {
        return this.get("link_previews");
    };
    Preferences.prototype.use12HourClock = function() {
        return this.get("locale") === "en-12h";
    };
    Preferences.prototype.emojiSize = function() {
        return this.get("emoji_size");
    };
    Preferences.prototype.theme = function() {
        return this.get("theme");
    };
    Preferences.prototype.typingActivity = function() {
        return this.asProperty("typing_activity");
    };
    Preferences.prototype.notificationAllowed = function(e, t) {
        var n;
        if (t.get("event") === "message" || t.get("event") === "comment" || t.get("app") === "influx") {
            n = this._notificationPreferenceKey(e, t);
            return this.notificationPreference(n, t.get("flow"));
        }
        return !1;
    };
    Preferences.prototype.filterMessages = function(e, t) {
        return e.filter(function(e) {
            return e.id;
        }).filter(function(e) {
            return function(n) {
                var r;
                r = new Models.Message(n, {
                    comments: !1
                });
                return e.notificationAllowed(t, r) && n.user !== e.user.get("id");
            };
        }(this));
    };
    Preferences.prototype.keyboardShortcuts = function() {
        return this.get("keyboard_shortcuts");
    };
    Preferences.prototype.mute = function() {
        var e;
        e = function(e) {
            return parseInt(e) > Date.now();
        };
        return this.asProperty("muted").flatMapLatest(function(t) {
            if (e(t)) {
                return Bacon.later(parseInt(t, 10) - Date.now(), !1).merge(Bacon.once(!0));
            }
            return Bacon.once(!1);
        }).skipDuplicates().toProperty(!1);
    };
    Preferences.prototype.shouldSendMessageWith = function(e) {
        if (this.enterSendsMessage()) {
            return KeyEvent.is("enter")(e);
        }
        return KeyEvent.is("shift+enter")(e) || KeyEvent.is("alt+enter")(e);
    };
    Preferences.prototype.enterSendsMessage = function() {
        return this.get("enter_sends_message");
    };
    Preferences.prototype.flowPreferences = function(e) {
        var t;
        t = _.isString(e) ? e : e.get("id");
        this._flowPreferences[t] || (this._flowPreferences[t] = new Models.FlowPreferences());
        return this._flowPreferences[t];
    };
    Preferences.prototype.flowAdded = function(e) {
        return this.fetch().done(function(t) {
            return function(n) {
                var r;
                r = e.get("id");
                if (n.flows[r]) {
                    return t._addFlowPreferences(r, n.flows[r]);
                }
                return;
            };
        }(this));
    };
    Preferences.prototype.flowOpenChanged = function(e) {
        if (e.get("open")) {
            return e.once("sync", function(t) {
                return function() {
                    return t.flowAdded(e);
                };
            }(this));
        }
        return;
    };
    Preferences.prototype.isNew = function() {
        return !1;
    };
    Preferences.prototype.notificationPreference = function(e, t) {
        return this._notificationPreferences.get(e, t);
    };
    Preferences.prototype._initFlowPreferences = function(e) {
        var t, n, r;
        this._flowPreferences = {};
        if (e) {
            r = [];
            for (t in e) {
                n = e[t];
                r.push(this._addFlowPreferences(t, n));
            }
            return r;
        }
    };
    Preferences.prototype._addFlowPreferences = function(e, t) {
        if (this._flowPreferences[e]) {
            return this._flowPreferences[e].set(t);
        }
        return this._flowPreferences[e] = new Models.FlowPreferences(t);
    };
    Preferences.prototype._setNotificationPreferences = function(e) {
        return this._notificationPreferences = new r(e);
    };
    Preferences.prototype._notificationPreferenceKey = function(e, t) {
        var n;
        n = this._messageSource(t);
        return n + "_" + e + "_notifications";
    };
    Preferences.prototype._messageSource = function(e) {
        var t;
        if (e.isPrivate()) {
            return "private";
        }
        if (e.highlights(this.user)) {
            return "mentions";
        }
        t = e.get("app");
        if (t === "influx") {
            t = "inbox"
        };
        return t;
    };
    return Preferences;
}(Backbone.Model);
