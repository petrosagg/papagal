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

Views.Navigation.Tab = function(t) {
    function Tab() {
        return Tab.__super__.constructor.apply(this, arguments);
    }
    r(Tab, t);
    Tab.prototype.template = require("../../templates/navigation/tab.mustache");
    Tab.prototype.tagName = "li";
    Tab.prototype.className = "tab";
    Tab.prototype.events = {
        "click .tab-link": "navigate",
        "click .close-tab": "close",
        "click .open-inbox-settings": "openInboxSettings"
    };
    Tab.prototype.modelEvents = {
        activate: "onActivate",
        deactivate: "onDeactivate",
        "change:name": "updateName",
        "change:url": "render"
    };
    Tab.prototype.keyboardEvents = {
        closeTab: "closeTab"
    };
    Tab.prototype.initialize = function() {
        var e;
        Tab.__super__.initialize.apply(this, arguments);
        this.bindKeyboardEvents();
        this.listenTo(Flowdock.app.preferences, "change:sidebar_collapsed", this.updateTitle);
        e = this.model.sources;
        if (e) {
            return this.listenTo(e, "change:error_message add remove reset", this.render);
        }
        return;
    };
    Tab.prototype.renderActivity = function() {
        if (Flowdock.app.flowActivities != null && this.model != null) {
            return this.untilEnd(Flowdock.app.flowActivities.activityFor(this.model)).debounce(400).onValue(this, "updateActivity");
        }
        return;
    };
    Tab.prototype.renderOnlineState = function() {
        var e;
        if (this.model.isPrivate()) {
            e = Flowdock.app.presence.user(this.model.otherParty().id);
            this.updateOnlineState();
            return this.untilEnd(e.asProperty("state").toEventStream()).onValue(this, "updateOnlineState");
        }
    };
    Tab.prototype.onActivate = function() {
        this.$el.addClass("current");
        return this.trigger("scroll", this.$el);
    };
    Tab.prototype.onDeactivate = function() {
        return this.$el.removeClass("current");
    };
    Tab.prototype.consume = function(e) {
        var t, n;
        n = Flowdock.app.user;
        t = e.filter(function(e) {
            return e.user !== n.id && (_.include(Models.Filter.Chat.prototype.event, e.event) || new Models.Message(e).highlights(n));
        });
        return this.addStream(t.onValue(function(e) {
            return function() {
                if (e.$(".tab").hasClass("current")) {
                    return undefined;
                }
                return e.blink();
            };
        }(this)));
    };
    Tab.prototype.blink = function() {
        $("#tab-list").addClass("blink");
        this.$(".activity-indicator").addClass("activity-indicator-blink").one(Helpers.animationend(), function() {
            $(this).removeClass("activity-indicator-blink");
            return $("#tab-list").removeClass("blink");
        });
        return this;
    };
    Tab.prototype.updateName = function() {
        var e;
        e = this.serializeData();
        this.$(".tab-name").text(e.name);
        this.$(".tab-avatar").replaceWith(this.partials().avatar.render(e));
        if (this.tabType() === "flow") {
            this.renderColor()
        };
        return this.render();
    };
    Tab.prototype.updateActivity = function(e) {
        var t, n, r;
        t = e.chat;
        n = e.inbox;
        r = e.mentions;
        this.$(".activity-indicator").toggleClass("activity-indicator-inbox", n).toggleClass("activity-indicator-mentions", r > 0).attr("data-mention-count", r).text(r);
        return this.$el.toggleClass("has-activity", t);
    };
    Tab.prototype.updateTitle = function(e, t) {
        var n;
        if (t) {
            if (this.model.isPrivate()) {
                n = this.model.otherParty().get("nick");
            } else {
                n = this.model.fullName();
            }
        } else {
            n = "";
        }
        return this.$(".tab-link").attr("title", n);
    };
    Tab.prototype.updateOnlineState = function() {
        var e, t, n, r;
        this.$el.attr("data-presence", (n = this.model) != null && typeof n.otherParty == "function" && typeof (e = n.otherParty()).presence == "function" ? e.presence() : undefined);
        return this.$el.toggleClass("online", (r = this.model) != null && typeof r.otherParty == "function" && typeof (t = r.otherParty()).isOnline == "function" ? t.isOnline() : undefined);
    };
    Tab.prototype.serializeData = function() {
        var e, t;
        return {
            avatar: typeof (e = this.model).otherParty == "function" ? e.otherParty().avatar(40) : undefined,
            initials: this.model.initials(),
            isPrivate: this.model.isPrivate(),
            link: Helpers.urlFor(this.model.isFlow() ? {
                flow: this.model
            } : {
                private: this.model
            }),
            name: emojimoji(typeof (t = this.model.collection).uniqueName == "function" ? t.uniqueName(this.model) : undefined)
        };
    };
    Tab.prototype.partials = function() {
        return {
            avatar: require("../../templates/navigation/tab_avatar.mustache")
        };
    };
    Tab.prototype.onBeforeRender = function() {
        var e;
        if ((e = this.dropdown) != null) {
            return e.remove();
        }
        return;
    };
    Tab.prototype.onAfterRender = function() {
        var e, t;
        t = this.tabType();
        this.$el.addClass(this.tabType() + "-tab");
        if (this.model.id === ((e = Flowdock.app.manager.currentFlow) != null ? e.id : undefined)) {
            this.$el.addClass("current"), this.listenToOnce(this, "view:attach:after", function(e) {
                return function() {
                    return e.trigger("scroll", e.$el);
                };
            }(this))
        };
        this.renderActivity();
        this.renderOnlineState();
        this.$el.emojie() != null;
        if (t === "flow") {
            this.renderColor()
        };
        this.$el.reorderable({
            className: "tab",
            drop: function(e) {
                return function(t) {
                    return e.trigger("reorder", t, e.model);
                };
            }(this)
        });
        this.updateTitle(null, Flowdock.app.preferences.get("sidebar_collapsed"));
        this.renderErrorIndicator();
        if (this.model.isFlow()) {
            this.renderSettingsButton()
        };
        if (!this.model.isFlow() || Flowdock.mobile) {
            this.renderCloseButton()
        };
        return this;
    };
    Tab.prototype.renderErrorIndicator = function() {
        var e, t, n;
        if ((n = this.model.sources) != null && n.hasErrors()) {
            t = $("<span>").addClass("fa fa-warning small-icon");
            e = $("<a>").addClass("tab-error-link open-inbox-settings").append(t);
            return this.$el.addClass("error").append(e);
        }
        return this.$el.removeClass("error");
    };
    Tab.prototype.renderSettingsButton = function() {
        var e, t;
        if (Flowdock.mobile) {
            t = $("<span>").addClass("fa fa-cog small-icon");
            e = $("<a>").addClass("tab-menu-link open-inbox-settings").append(t);
        } else {
            this.dropdown = this.subview(new Views.Navigation.SidebarDropdown({
                model: this.model
            }));
            e = this.dropdown.render().$el;
            this.listenTo(this.dropdown, "closing", function() {
                return this.trigger("closing", this);
            });
            this.addStream($(document).asEventStream("close-open-dropdowns").onValue(function(e) {
                return function() {
                    return e.dropdown.close();
                };
            }(this)));
        }
        return this.$el.append(e);
    };
    Tab.prototype.renderCloseButton = function() {
        var e, t;
        t = $("<span>").addClass("fa fa-times small-icon");
        e = $("<a>").addClass("tab-menu-link close-tab").append(t);
        return this.$el.append(e);
    };
    Tab.prototype.close = function(e) {
        var t;
        if (e != null) {
            e.stopImmediatePropagation()
        };
        if (e != null) {
            e.preventDefault()
        };
        this.trigger("closing", this);
        if (typeof (t = this.model).saveWithRetry == "function") {
            return t.saveWithRetry({
                open: false
            }, {
                patch: true
            });
        }
        return;
    };
    Tab.prototype.navigate = function(e) {
        var t, n;
        if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            Flowdock.analytics.trackHighVolume(Flowdock.ANALYTICS_EVENT_TYPES.flows_change);
            if (this.model.isFlow()) {
                if ((t = Flowdock.app.router) != null) {
                    return t.navigateBackToFlow(this.model, {
                        closeSingleIfCurrentFlow: true
                    });
                }
                return;
            }
            if ((n = Flowdock.app.router) != null) {
                return n.navigateToPrivate(this.model);
            }
            return;
        }
    };
    Tab.prototype.openInboxSettings = function() {
        return Flowdock.app.manager.openFlowSettings(this.model, "integrations");
    };
    Tab.prototype.destructor = function() {
        Tab.__super__.destructor.apply(this, arguments);
        return this.activityModel = this.dropdown = null;
    };
    Tab.prototype.tabType = function() {
        if (this.model.isFlow()) {
            return "flow";
        }
        return "private";
    };
    Tab.prototype.renderColor = function(e) {
        var t;
        t = Helpers.stringToColor(this.model.collection.uniqueName(this.model));
        if (t.length > 7) {
            t = t.substring(2);
        } else {
            t = t.substring(1);
        }
        return this.$(".tab-avatar").css("background-color", "#" + t);
    };
    Tab.prototype.closeTab = function(e) {
        if ((e != null ? e.isPropagationStopped() : undefined) !== true && this.$el.hasClass("current")) {
            return this.close(e);
        }
        return;
    };
    return Tab;
}(Flowdock.ItemView);

_.extend(Views.Navigation.Tab.prototype, Flowdock.KeyboardEvents);
