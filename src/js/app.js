var r, o, i = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
};

o = require("collections/presence");

r = require("lib/flowdock/activity_heartbeats");

Flowdock.App = function() {
    function App(e) {
        this.removeFlow = i(this.removeFlow, this);
        this.setupNewFlow = i(this.setupNewFlow, this);
        this.features = e.features || {};
        this.end = new Bacon.Bus();
        this.presence = new o([]);
        this.user = new Models.User(e.user);
        if (e.flows instanceof Collections.Flows) {
            this.flows = e.flows;
        } else {
            this.flows = new Collections.Flows(e.flows);
        }
        if (e.privates instanceof Collections.PrivateConversations) {
            this.privates = e.privates;
        } else {
            this.privates = new Collections.PrivateConversations(e.privates, {
                privatesEmojis: e.privatesEmojis,
                user: this.user
            });
        }
        this.preferences = new Models.Preferences(e.preferences, {
            user: this.user,
            parse: true,
            collection: this.flows
        });
        this.privates.each(function(e) {
            return e.fullyLoaded.resolve();
        });
        if (e.tabOrder != null) {
            this.tabOrder = e.tabOrder
        };
        this.combinedCollection = new Collections.Combined(this.flows, this.privates);
        this.users = function(e, t, n) {
            n.prototype = e.prototype;
            var r = new n(), o = e.apply(r, t);
            if (Object(o) === o) {
                return o;
            }
            return r;
        }(Collections.Combined, this.flows.map(function(e) {
            return e.users;
        }), function() {});
        this.notificationItems = new Collections.NotificationItems(null, {
            userId: this.user.id
        });
        this.markers = new Collections.Markers(e.markers, {
            localStorageId: this.user.id,
            parse: true
        });
        this.markers.fetchLocalStorage();
        this.ready = new $.Deferred();
        this.activeFlows = new Bacon.Bus();
        this.flows.active = this.activeFlows.toProperty();
        this.flows.lastActive = this.flows.active.filter(_.identity).toEventStream().toProperty(null);
        this.untilEnd(this.flows.active).onValue(this, "activateFlow");
        this.untilEnd(this.flows.lastActive).onValue(function() {});
        this.peaks = new Collections.Peaks();
        this.peaks.fetch({
            reset: true
        });
        this.flowActivities = new Flowdock.FlowActivities({
            peaks: this.peaks,
            markers: this.markers,
            notificationItems: this.notificationItems,
            flows: this.flows,
            privates: this.privates
        });
        this.flows.loaded = new $.Deferred();
        this.flows.on("add", this.setupNewFlow, this);
        this.flows.on("remove", this.removeFlow, this);
        this.flows.on("external-close", function(e) {
            return function(t) {
                return e.router.removeFlow(t);
            };
        }(this), this);
        this.combinedCollection.on("change:open", function(e) {
            return function(t, n) {
                if (n || e.activeFlow == null || t.id !== e.activeFlow.id) {
                    return undefined;
                }
                console.log("Closed active tab, need to open another.", t, n);
                return e.router.removeFlow(t);
            };
        }(this));
        this.flows.on("flow-unloaded", function(e) {
            return function(t) {
                var n;
                e.manager.resetFlow(t);
                if (((n = e.activeFlow) != null ? n.id : undefined) === t.id) {
                    return e.router.reloadFlow();
                }
                return;
            };
        }(this), this);
        this.activeFlow = null;
        this.user.on("change", function(e) {
            return function(t) {
                return _.each(e.users.where({
                    id: t.id
                }), function(e) {
                    return e.set(t.changedAttributes());
                });
            };
        }(this));
        this.initKeyboardShortcuts();
        this.messageReceivedNotifier = new Flowdock.MessageReceivedNotifier(this.user);
        this.setupEmojiControl();
        this.setupLocaleControl();
        this.setupThemeControl();
    }
    App.CONNECTION_ERROR_THRESHOLD = 5e3;
    App.prototype.initUi = function() {
        this.manager = new Views.FlowManager({
            el: $("body")[0],
            collection: this.combinedCollection,
            app: this,
            user: this.user
        });
        this.router = new Router({
            flows: this.flows,
            privates: this.privates,
            manager: this.manager
        });
        return this.activeFlows.plug(this.router.asEventStream("flowActivated"));
    };
    App.prototype.initConnection = function() {
        var e;
        this.connection = new Models.Connection();
        this.untilEnd(this.connection.state).onError(function(e) {
            return function(t) {
                if (t === "handshake error") {
                    return e.manager.error("handshake-failed", null, {
                        permanent: true
                    });
                }
                if (t === "handshake unauthorized") {
                    return window.location.reload();
                }
                return;
            };
        }(this));
        e = null;
        this.untilEnd(this.connection.state).filter(function(e) {
            return e === Models.Connection.CLOSED;
        }).onValue(function(t) {
            return function(n) {
                var r;
                r = t.connection.state.changes().filter(function(e) {
                    return e === Models.Connection.OPEN;
                }).take(1).map(true);
                return Bacon.later(Flowdock.App.CONNECTION_ERROR_THRESHOLD, false).merge(r).takeWhile(function(e) {
                    return !e;
                }).merge(r).onValue(function(n) {
                    if (typeof e == "function") {
                        e()
                    };
                    if (n) {
                        return e = null;
                    }
                    if (e == null) {
                        return e = t.manager.toastError("connection-closed");
                    }
                    return;
                });
            };
        }(this));
        this.untilEnd(this.connection.state).filter(function(e) {
            return e === Models.Connection.CLOSED;
        }).flatMapLatest(function(e) {
            return function() {
                return e.connection.state.filter(function(e) {
                    return e === Models.Connection.OPEN;
                });
            };
        }(this)).onValue(function(e) {
            return function() {
                e.privates.each(function(t) {
                    return e.manager.resetFlow(t);
                });
                return e.privates.fetch({
                    update: true
                });
            };
        }(this));
        this.untilEnd(this.connection.state).filter(function(e) {
            return e === Models.Connection.OPEN;
        }).take(1).onValue(this.notificationItems, "resync");
        this.user.consume(this.connection.messages);
        return this.messageReceivedNotifier.consume(this.connection.messages);
    };
    App.prototype.start = function(t) {
        var n, r;
        this.initPostMessages();
        Backbone.history.start({
            root: Router.root,
            pushState: true
        });
        this.subscribeToConnections();
        this.setupTitleManager();
        this.manager.render();
        if (t.tutorial) {
            n = require("models/tutorial"), r = new n(t.tutorial, {
                user: this.user
            }), this.manager.createWalkthrough(r)
        };
        this.setupFocusTracking();
        this.setupUserActivityHeartbeats();
        this.initDesktopNotifications();
        this.initAudioPlayer();
        this.initAudioNotifications();
        this.checkForFluid();
        this.initTypingActivity();
        this.markers.startSync();
        this.untilEnd(this.combinedCollection.asEventStream("add")).onValue(function(e) {
            return function() {
                return e.peaks.fetch({
                    reset: true
                });
            };
        }(this));
        return this.ready.resolve();
    };
    App.prototype.initPostMessages = function() {
        return this.postMessages = Bacon.fromEventTarget(window, "message").takeUntil(this.end).filter(function(e) {
            return Helpers.url.parseHostname(e.origin) === document.location.hostname;
        }).map(function(e) {
            return JSON.parse(e.data);
        });
    };
    App.prototype.initTypingActivity = function() {
        var e, t;
        t = Flowdock.TypingActivity.build($("body"), "textarea.message-input", 1e4);
        e = t.when(this.preferences.typingActivity()).toMessages(this.flows.active, 15e3);
        return this.connection.sendStream.plug(e.takeUntil(this.end));
    };
    App.prototype.initAudioPlayer = function() {
        var t, n, r;
        r = this.preferences.asProperty("audio_volume").map(Number);
        if ((t = window.macgap) != null && (n = t.sound) != null && n.play) {
            this.audioPlayer = require("./lib/flowdock/mac_audio_player.coffee").load(r);
        } else {
            this.audioPlayer = require("./lib/flowdock/audio_player.coffee").load(r);
        }
        return this.untilEnd(this.preferences.mute()).assign(this.audioPlayer, "mute");
    };
    App.prototype.initAudioNotifications = function() {
        var e;
        e = this.preferences.filterMessages(this.connection.messages, "sound");
        this.audioNotifications = Flowdock.AudioNotifications.create(this.flows.active, this.user, e);
        if (this.audioNotifications && this.audioPlayer) {
            return this.untilEnd(this.audioNotifications).onValue(this.audioPlayer, "play");
        }
        return;
    };
    App.prototype.initDesktopNotifications = function() {
        this.notifications = Flowdock.DesktopNotificationCenter.create();
        return this.withNotificationPermission(function(e) {
            return function() {
                var t, n, r, o, i;
                t = e.router.flowStates[(n = e.activeFlow) != null ? n.id : undefined] || {
                    flow: e.activeFlow
                };
                o = e.router.asEventStream("flowState").toProperty(t);
                r = e.untilEnd(o).map(function(e) {
                    var t, n;
                    return {
                        flow: e != null ? e.flow : undefined,
                        messageId: (e != null && (t = e.chat) != null ? t.message : undefined) || (e != null && (n = e.chat) != null ? n.thread : undefined)
                    };
                });
                i = e.preferences.filterMessages(e.connection.messages, "desktop");
                return Flowdock.messageDesktopNotifications(e.notifications, i, e.flows, e.flows.active, r);
            };
        }(this));
    };
    App.prototype.initKeyboardShortcuts = function() {
        var e, t, n;
        t = Flowdock.KeyboardShortcuts.keyStream();
        e = this.preferences.asEventStream("change:keyboard_shortcuts").map(function(e) {
            return e.keyboardShortcuts();
        }).toProperty(this.preferences.keyboardShortcuts());
        n = [ new Flowdock.KeyboardShortcuts(t, Flowdock.shortcutMap.web).when(e).toStream(), new Flowdock.KeyboardShortcuts(t, Flowdock.shortcutMap.alwaysAvailable).toStream(e), Flowdock.KeyboardShortcuts.toggleSingleViewStream() ];
        if (window.macgap != null) {
            n.push(Flowdock.KeyboardShortcuts.forMacGap())
        };
        if (window.windowsApp != null) {
            n.push(Flowdock.KeyboardShortcuts.forWinApp())
        };
        return this.shortcutStream = Bacon.mergeAll(n);
    };
    App.prototype.withNotificationPermission = function(e) {
        switch (this.notifications.permissionLevel()) {
          case "granted":
            return e();

          case "default":
            return this.setupRequestToNotify(e);
        }
    };
    App.prototype.setupRequestToNotify = function(e) {
        return $(document).one("click", ".expanding-input", function(t) {
            return function() {
                return t.notifications.requestPermission(function(t) {
                    if (t === "granted") {
                        return e();
                    }
                    return;
                });
            };
        }(this));
    };
    App.prototype.activateFlow = function(e) {
        var t, n;
        if ((t = this.activeFlow) != null) {
            t.trigger("deactivate")
        };
        this.activeFlow = e;
        if ((n = this.activeFlow) != null) {
            return n.trigger("activate");
        }
        return;
    };
    App.prototype.subscribeToConnections = function() {
        var e, t, n;
        e = Flowdock.appFocus.and(this.flows.active);
        this.presence.consume(this.connection.messages);
        this.preferences.consume(this.connection.messages);
        this.flows.consume(this.connection.messages);
        this.privates.consume(this.connection.messages);
        this.peaks.consume(this.connection.messages);
        this.notificationItems.consume(this.connection.messages, e, this.flows);
        n = null;
        if (this.activeFlow && this.activeFlow.id && this.activeFlow.isFlow()) {
            n = this.activeFlow.subscribe(this.connection)
        };
        if (this.activeFlow) {
            t = this.activeFlow.id
        };
        _.each(this.flows.where({
            open: true
        }), function(e) {
            return function(r) {
                if (t !== r.id) {
                    if (n != null) {
                        n.always(function() {
                            return r.subscribe(e.connection);
                        })
                    };
                    return n || (n = r.subscribe(e.connection));
                }
                return;
            };
        }(this));
        $.when.apply($, _.map(this.flows.where({
            open: true
        }), function(e) {
            return e.fullyLoaded;
        })).always(function(e) {
            return function() {
                return e.flows.loaded.resolve();
            };
        }(this));
        this.untilEnd(this.flows.asEventStream("change:open")).onValue(function(e) {
            return function(t) {
                if (t.get("open")) {
                    return t.subscribe(e.connection);
                }
                return t.unsubscribe(e.connection);
            };
        }(this));
        return this.connection.messages.errors().mapError(function(e) {
            return e;
        }).filter(function(e) {
            return (e != null ? e.error : undefined) === "flow sync failed";
        }).skipDuplicates().onValue(function(e) {
            return function(t) {
                var n, r, o, i, s, a, u;
                for (u = e.flows.filter(function(e) {
                    return e.get("open") === true && e.fullyLoaded.state() === "pending";
                }), r = _.unique(function() {
                    var e, n, r, o;
                    for (r = t.flows, o = [], e = 0, n = r.length; n > e; e++) {
                        i = r[e];
                        o.push(this.flows.get(i));
                    }
                    return o;
                }.call(e).concat(u)), console.log("Resubscribe to flows", r), o = function(t) {
                    console.log(new Date(), "Resetting flow", t.id, "after resync failed");
                    t.reset();
                    return t.subscribe(e.connection);
                }, s = 0, a = r.length; a > s; s++) {
                    n = r[s];
                    o(n);
                }
                e.notificationItems.resync();
                e.markers.fetch({
                    merge: true
                });
                return e.peaks.fetch({
                    reset: true
                });
            };
        }(this));
    };
    App.prototype.setupFocusTracking = function() {
        var e;
        e = this.router.asEventStream("route").flatMapLatest(function() {
            return Bacon.once(true).merge(Bacon.later(100, false));
        }).toProperty(false);
        return this.untilEnd(Bacon.mergeAll([ $(document).asEventStream("visibilitychange").map(function() {
            return !document.hidden;
        }).filter(_.identity), $(window).asEventStream("focus").map(true) ])).bufferWithTime(50).skipWhile(e).onValue(this, "documentBecameVisible");
    };
    App.prototype.documentBecameVisible = function() {
        var e, t, n, r, o;
        e = $("#chat textarea.message-input")[0];
        o = $("#thread textarea.message-input")[0];
        r = $("#single textarea.message-input")[0];
        if (window.lastFocusedInput === "chat") {
            n = [ e, o, r ];
        } else {
            if (window.lastFocusedInput === "thread") {
                n = [ o, r, e ];
            } else {
                n = [];
            }
        }
        return $(function() {
            var e, r, o;
            for (o = [], e = 0, r = n.length; r > e; e++) {
                t = n[e];
                if (t != null) {
                    o.push(t)
                };
            }
            return o;
        }()).first().focus();
    };
    App.prototype.setupUserActivityHeartbeats = function() {
        var e;
        e = new r(Flowdock.userActivity, this.connection, this.flows.active, this.combinedCollection);
        e.start();
        return e;
    };
    App.prototype.setupTitleManager = function() {
        this.titleManager = new Flowdock.TitleManager(this.flowActivities.combinedActivity, this.flows.active, this.user);
        return this.titleManager.start();
    };
    App.prototype.setupEmojiControl = function() {
        this.emojiControl = new Flowdock.EmojiControl(this.preferences.asProperty("emoji_size"));
        return this.emojiControl.start();
    };
    App.prototype.setupLocaleControl = function() {
        return this.preferences.asProperty("locale").skipDuplicates().onValue(function(e) {
            return Helpers.TimeHelper.updateGlobalLocale(e);
        });
    };
    App.prototype.setupThemeControl = function() {
        this.themeControl = new Flowdock.ThemeControl(this.preferences.asProperty("theme"));
        return this.themeControl.start();
    };
    App.prototype.checkForFluid = function() {
        if (navigator.userAgent.match(/fluid/i)) {
            return this.manager.toastError("use-mac-app");
        }
        return;
    };
    App.prototype.setupNewFlow = function(e) {
        if (e.get("open")) {
            e.subscribe(this.connection)
        };
        return this.users.collections.push(e.users);
    };
    App.prototype.removeFlow = function(e) {
        var t;
        this.users.collections.splice(this.users.collections.indexOf(e.users), 1);
        if ((t = this.connection) != null && t.unsubscribe) {
            e.unsubscribe(this.connection)
        };
        e.off(this);
        return e.cleanup();
    };
    App.prototype.allFlows = function(e) {
        if (e == null) {
            e = {}
        };
        if (!this._allFlows) {
            this._allFlows = new Collections.Flows([], {
                url: Helpers.apiUrl("/flows/all"),
                embedded: false
            }), this._allFlows.consume(this.connection.messages, {
                embedded: false
            })
        };
        if (e.fetch) {
            this._allFlows.fetch({
                embedded: false
            })
        };
        return this._allFlows;
    };
    App.prototype.destructor = function() {
        var e, t, n, r, o;
        this.end.end();
        if ((e = this.markers) != null) {
            e.cleanup()
        };
        this.flows.off();
        this.flows.each(this.removeFlow);
        this.flows.cleanup();
        this.presence.cleanup();
        if ((t = this.organizations) != null) {
            t.cleanup()
        };
        this.combinedCollection.cleanup();
        this.combinedCollection.off();
        this.privates.cleanup();
        this.privates.off();
        this.user.off();
        this.manager.destructor();
        this.notificationItems.cleanup();
        if ((n = this.flowActivities) != null) {
            n.destructor()
        };
        if ((r = this.peaks) != null) {
            r.cleanup()
        };
        if ((o = this.readMessagesNotifier) != null) {
            o.cleanup()
        };
        return this.activeFlows.end();
    };
    App.prototype.getOrganizations = function(e) {
        if (!this.organizations) {
            this.organizations = new Collections.Organizations(), this.organizations.consume(this.connection.messages), 
            this.organizations.fetch({
                update: true,
                success: e
            })
        };
        return this.organizations;
    };
    App.prototype.untilEnd = function(e) {
        return e.takeUntil(this.end.mapEnd());
    };
    return App;
}();
