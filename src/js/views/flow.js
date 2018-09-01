var r, o, i = function(e, t) {
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

r = require("views/overlays/flow_welcome_overlay");

o = require("views/chat/team_notifications_feedback");

Views.Flow = function(t) {
    function Flow() {
        return Flow.__super__.constructor.apply(this, arguments);
    }
    i(Flow, t);
    Flow.prototype.className = "flow";
    Flow.prototype.events = _.extend({}, Views.Content.prototype.events, {
        "jump-thread:up": "jumpPreviousThread",
        "jump-thread:down": "jumpNextThread"
    });
    Flow.prototype.template = require("../templates/flow.mustache");
    Flow.prototype.modelEvents = {
        "subscribe-failed": "onSubscribeFailed"
    };
    Flow.prototype.keyboardEvents = {
        nextThread: "jumpNextThread",
        previousThread: "jumpPreviousThread"
    };
    Flow.prototype.initialize = function(e) {
        var t, r, o;
        this.viewModel = e.viewModel;
        Flow.__super__.initialize.apply(this, arguments);
        this.attached = false;
        this.bindKeyboardEvents();
        this.inbox = this.subview(new Views.Inbox({
            model: this.model,
            viewModel: this.viewModel
        }));
        this.chat = this.subview(new Views.Chat({
            model: this.model,
            viewModel: this.viewModel,
            fileUpload: true,
            tags: true,
            inbox: true,
            expandable: true,
            settings: true
        }));
        this.listenTo(this.chat, "jump-last-open-thread", this.jumpLastOpenThread);
        o = this.viewModel.asEventStream("change").debounce(0).toProperty(this.viewModel);
        t = this.attachedProperty("after", "before").and(Flowdock.appFocus).skipDuplicates().combine(o, function(e, t) {
            var n;
            n = [];
            if (e) {
                t.get("chat") && n.push("chat"), t.get("inbox") && t.get("filter") === "{}" && n.push("inbox")
            };
            return n;
        }).flatMap(function(e) {
            return Bacon.fromArray(e);
        });
        this.untilEnd(this.viewModel.asEventStream("change:rhs").delay(0).filter(function() {
            var e, t, n, r;
            return !((e = Flowdock.app.manager) != null && (t = e.currentView) != null && (n = t.toolbar) != null && (r = n.search) != null ? r.focused() : undefined);
        })).onValue(this, "_focusLastMessageInput");
        this.untilEnd(t).onValue((r = this.model) != null ? r.unreadMessages : undefined, "clearUnread");
        this.listenTo(this.viewModel, "change", function() {
            return this.updatePanes();
        });
        this.toolbar = this.subview(Views.Toolbar.build({
            model: this.model,
            viewModel: this.viewModel
        }));
        this.listenTo(this.toolbar, "close:user-list", function() {
            return this._closeUserList();
        });
        this.listenTo(this.toolbar, "open:user-list", function() {
            return this._openUserList();
        });
        this.listenTo(this.toolbar, "search:change", function(e) {
            this.onSearchChange(e);
            return this.viewModel.setSearch(e);
        });
        this.setupBackHighlights();
        this._initThreadCache();
        return this._initFlowNotifications();
    };
    Flow.prototype.renderFlowWelcome = function() {
        var e, t, n;
        e = this;
        n = function(n) {
            e.model.saveWithRetry({
                team_notifications: n
            }, {
                patch: true
            });
            return t.close();
        };
        return t = this.subview(new r({
            target: $("body"),
            model: this.model,
            onJoinTeam: function() {
                return n(true);
            },
            onHangAround: function() {
                return n(false);
            }
        }).attach());
    };
    Flow.prototype.renderTeamFeedback = function() {
        var e, t, n, r, i;
        n = this.model.receivesTeamNotifications();
        r = null;
        e = null;
        t = this;
        i = function() {
            t.removeSubview(e);
            return clearTimeout(r);
        };
        r = setTimeout(i, 5e3);
        e = this.subview(new o({
            flowName: this.model.get("name"),
            teamNotificationsOn: n,
            onUndo: function() {
                t.model.saveWithRetry({
                    team_notifications: !n
                }, {
                    patch: true
                });
                return i();
            },
            onClose: i
        }));
        return this.$(".flow-notifications").append(e.render().$el);
    };
    Flow.prototype._initThreadCache = function() {
        var e, t;
        t = this._threadCache = new Cache.Threads({
            flow: this.model,
            preloadedCollections: [ this.inbox.messageList.collection, this.chat.messageList.collection ]
        });
        e = function(e) {
            return _.flatten([ e ]).forEach(function(e) {
                var n;
                n = e.get("thread_id");
                if (n) {
                    return t.load(n);
                }
                return;
            });
        };
        this.listenTo(this.inbox.messageList.collection, "add historyAdd", e);
        return this.listenTo(this.chat.messageList.collection, "add historyAdd", e);
    };
    Flow.prototype._jumpTo = function(e) {
        if (e && e.get("id")) {
            if (e.get("thread_id")) {
                return Flowdock.app.router.navigateToFlow(e.flow(), {
                    thread: e.get("thread_id")
                });
            }
            return Flowdock.app.router.navigateToFlow(e.flow(), {
                message: e.parent() || e
            });
        }
        return;
    };
    Flow.prototype.jumpNextThread = function(e) {
        var t, n;
        if (e != null) {
            e.stopPropagation()
        };
        if (this.single && this.viewModel.singleOrThreadOpen()) {
            if ((n = this.chat) != null) {
                t = n.messageList.collection.threadAfter(this.single.model.threadId());
            } else {
                t = undefined;
            }
        } else {
            t = null;
        }
        if (t) {
            return this._jumpTo(t);
        }
        if (this.single) {
            return this.single.returnToList();
        }
        return;
    };
    Flow.prototype.jumpPreviousThread = function(e) {
        var t, n, r;
        if (e != null) {
            e.stopPropagation()
        };
        if (this.single && this.viewModel.singleOrThreadOpen()) {
            if ((n = this.chat) != null) {
                t = n.messageList.collection.threadBefore(this.single.model.threadId());
            } else {
                t = undefined;
            }
        } else {
            if ((r = this.chat) != null) {
                t = r.messageList.collection.last();
            } else {
                t = undefined;
            }
        }
        if (t) {
            return this._jumpTo(t);
        }
        return;
    };
    Flow.prototype.jumpLastOpenThread = function() {
        if (this.single) {
            return this._jumpTo(this.single.model);
        }
        return;
    };
    Flow.prototype.destructor = function() {
        Flow.__super__.destructor.apply(this, arguments);
        this._threadCache.cleanup();
        return this.inbox = this.chat = this.organizations = this.$inboxPanel = this.single = this.viewModel = this._threadCache = this.toolbar = this.expandedUserList = null;
    };
    Flow.prototype.id = function() {
        return "flow-" + this.model.id;
    };
    Flow.prototype.onSearchChange = function(e) {
        if (this.errorState) {
            return undefined;
        }
        this.inbox.onSearchChange(e);
        return this.toolbar.onSearchChange(e);
    };
    Flow.prototype.findMessage = function(e) {
        return this.inbox.findMessage(e) || this.chat.findMessage(e);
    };
    Flow.prototype.toggleAndDetach = function(e, t) {
        var n;
        this.$el.find("." + t).toggle(!!this.viewModel.get(e));
        n = this.currentViewInPanel(this.$el.find("." + t));
        if (this.viewModel.get(e) === null && n != null) {
            return n.detach();
        }
        return;
    };
    Flow.prototype.updatePanes = function() {
        this.paneled("inbox", this.inbox, "inbox-panel");
        this.paneled("chat", this.chat, "chat-panel");
        this.paneled("single", this.getSingle(), "single-panel");
        this.paneled("users", this.getUsers(), "users-panel");
        this.toggleAndDetach("lhs", "left-panel");
        return this.toggleAndDetach("rhs", "right-panel");
    };
    Flow.prototype.getSingle = function() {
        var e, t, n, r;
        if (!this.errorState) {
            if (this.viewModel.get("lhs") !== "single" && this.viewModel.get("rhs") !== "single") {
                return this.single;
            }
            e = this.viewModel.get("thread");
            if (e) {
                return this.getThread(e);
            }
            e = this.viewModel.get("single");
            if (e) {
                t = this.getMessage(e);
                if (typeof t.markAsRead == "function") {
                    t.markAsRead()
                };
                if (((n = this.single) != null ? n.dirty : undefined) || "" + ((r = this.single) != null ? r.model.threadId() : undefined) != "" + e) {
                    this.renewSingleView(t, e);
                } else {
                    this.single || this.setSingleView(t, e);
                }
                return this.single;
            }
            return null;
        }
    };
    Flow.prototype.renewThreadView = function(e) {
        this._destroySingle();
        return this.setThreadView(e);
    };
    Flow.prototype.setThreadView = function(e) {
        var t;
        t = this._threadCache.find(e);
        this.single = this.subview(new Views.Thread({
            model: t,
            flow: this.model,
            viewModel: this.viewModel
        }));
        this.listenTo(this.single, "return-to-list", function() {
            return Flowdock.app.router.navigateToFlow(this.model, {
                thread: null
            });
        });
        return this.listenTo(this.single, "show-context", function(e) {
            if (this.viewModel.get("lhs") === "single") {
                this.single.returnToList()
            };
            return this.chat.jumpToMessage(e);
        });
    };
    Flow.prototype.getThread = function(e) {
        var t, n;
        if (!this.errorState) {
            ((t = this.single) != null ? t.model.threadId() : undefined) === e && ((n = this.single) != null ? !n.dirty : true) && this.single instanceof Views.Thread || this.renewThreadView(e);
            return this.single;
        }
    };
    Flow.prototype.getMessage = function(e) {
        if (_.isString(e)) {
            e = parseInt(e, 10)
        };
        return this.singleViewMessage(e);
    };
    Flow.prototype.renewSingleView = function(e, t) {
        var n;
        n = e.parent();
        if (n) {
            return void Flowdock.app.router.navigateToFlow(this.model, {
                message: n
            });
        }
        this._destroySingle();
        return this.setSingleView(e, t);
    };
    Flow.prototype.setSingleView = function(e, t) {
        this.single = this.subview(new Views.Inbox.SingleView({
            model: e,
            flow: this.model,
            viewModel: this.viewModel
        }));
        this.listenTo(this.single, "return-to-list", function() {
            return Flowdock.app.router.navigateToFlow(this.model, {
                message: null
            });
        });
        return this.listenTo(this.single, "show-context", function(e) {
            if (this.viewModel.get("lhs") === "single") {
                this.single.returnToList()
            };
            return this.chat.jumpToMessage(e);
        });
    };
    Flow.prototype.jumpTo = function(e) {
        var t;
        if ((t = this.single) != null) {
            return t.scrollToMessage(e);
        }
        return;
    };
    Flow.prototype.getUsers = function() {
        if (this.errorState) {
            return undefined;
        }
        if (this.viewModel.get("lhs") !== "users" && this.viewModel.get("rhs") !== "users") {
            this.toolbar.toggleUserList(false);
            return this.expandedUserList;
        }
        this.toolbar.toggleUserList(true);
        this.expandedUserList || (this.expandedUserList = this.subview(new Views.Chat.UserList({
            collection: this.model.users,
            flow: this.model
        })), this.listenTo(this.expandedUserList, "close:user:list", function() {
            return this._closeUserList();
        }));
        return this.expandedUserList;
    };
    Flow.prototype._openUserList = function() {
        return Flowdock.app.router.navigateToFlow(this.model, {
            users: true
        });
    };
    Flow.prototype._closeUserList = function() {
        return Flowdock.app.router.navigateToFlow(this.model, {
            users: false,
            thread: this.viewModel.get("thread"),
            message: this.viewModel.get("single")
        });
    };
    Flow.prototype._destroySingle = function() {
        var e, t;
        if (this.single) {
            if (typeof (e = this.single.model).unlockCleanup == "function") {
                e.unlockCleanup()
            };
            if (this.single.model.collection == null && typeof (t = this.single.model).cleanup == "function") {
                t.cleanup()
            };
            this.single.detach();
            this.removeSubview(this.single);
            return this.single = undefined;
        }
    };
    Flow.prototype.render = function() {
        if (this.errorState) {
            return undefined;
        }
        this.$el.empty().append(Helpers.renderTemplate(this.template)());
        this.$el.append(this.toolbar.render().$el, $("<div id='flow-overlay'>"), $("<div class='flow-notifications'></div>"));
        this.showAlerts();
        this.inbox.render();
        this.chat.render();
        this.updatePanes();
        this.model.fullyLoaded.done(function(e) {
            return function() {
                return e.checkForDuplicateNicks();
            };
        }(this));
        return this;
    };
    Flow.prototype.currentViewInPanel = function(e) {
        return _.find(this.subviews, function(t) {
            return t.$el.parent().is(e);
        });
    };
    Flow.prototype.renderInPanel = function(e, t, n) {
        var r;
        t.$el.children().length > 0 || t.render();
        r = this.currentViewInPanel(e);
        if (r !== t) {
            if (r != null) {
                r.detach()
            };
            e.addClass(n).append(t.$el);
            return t.attach(this.attached);
        }
        return;
    };
    Flow.prototype.paneled = function(e, t, n) {
        if (t) {
            if (this.viewModel.get("rhs") === e) {
                this.renderInPanel(this.$el.children(".right-panel"), t, n);
                return this.$el.children(".left-panel").removeClass(n);
            }
            if (this.viewModel.get("lhs") === e) {
                this.renderInPanel(this.$el.children(".left-panel"), t, n);
                return this.$el.children(".right-panel").removeClass(n);
            }
            return this.$el.children("." + n).removeClass(n);
        }
        return;
    };
    Flow.prototype.error = function(e, t) {
        var n, r;
        this.errorState = true;
        this.$el.children().hide();
        n = Views.Errors.get(e, "flow");
        r = new n({
            model: t
        });
        return this.$el.append(r.render().$el);
    };
    Flow.prototype.onSubscribeFailed = function(e) {
        return this.error("flow-subscribe-failed", {
            flow: e
        });
    };
    Flow.prototype.singleViewMessage = function(e) {
        var t, n;
        n = function(e) {
            return function(t) {
                t.comments.consume(e.model.stream);
                t.consume(e.model.stream);
                return t;
            };
        }(this);
        t = this.findMessage(e);
        return (t || n(new Models.InboxMessage({
            id: e,
            flow: this.model
        }))).lockCleanup();
    };
    Flow.prototype.showAlerts = function() {
        var e, t, n, r, o;
        t = this.model.get("alerts");
        if (t != null && t.length) {
            o = [];
            for (r in t) {
                e = t[r];
                n = new Views.Errors.Alert({
                    model: e
                });
                this.$el.append(n.render().el);
                o.push(n.$el.css({
                    "margin-bottom": 110 * r
                }));
            }
            return o;
        }
    };
    Flow.prototype.checkForDuplicateNicks = function() {
        var e, t;
        t = Flowdock.app.user.get("nick").toLowerCase();
        e = this.model.users.find(function(e) {
            var n;
            return !e.get("disabled") && e.id !== Flowdock.app.user.id && ((n = e.get("nick")) != null ? n.toLowerCase() : undefined) === t;
        });
        if (e) {
            return new Views.Overlays.NickConflict({
                target: $("body"),
                model: e
            }).attach();
        }
        return;
    };
    Flow.prototype.preserveScrolling = function(e) {
        return this.chat.messageList.preserveScrolling({}, function(t) {
            return function() {
                return t.inbox.messageList.preserveScrolling({}, e);
            };
        }(this));
    };
    Flow.prototype.setupBackHighlights = function() {
        var e;
        e = this.attachedProperty();
        return e.changes().take(1).onValue(function(t) {
            return function() {
                var n;
                n = e.and(Flowdock.app.preferences.asProperty("fade_on_back")).and(t.viewModel.asProperty("single_view_in_inbox").not().or(t.viewModel.asProperty("narrow")));
                return t.untilEnd(Flowdock.app.router.routeProperty).changes().filter(n).slidingWindow(2).filter(function(e) {
                    var t, n, r;
                    n = e[0];
                    t = e[1];
                    return n && t && t.route === "routeFlow" && ((r = n.route) === "viewSingleMessage" || r === "viewThread");
                }).map(function(e) {
                    var t, n, r;
                    n = e[0];
                    t = e[1];
                    if ((r = n.params) != null) {
                        return r[2];
                    }
                    return;
                }).onValue(function(e) {
                    return t.chat.messageList.highlightAccessed(e);
                });
            };
        }(this));
    };
    Flow.prototype._focusLastMessageInput = function() {
        var e;
        if (this.viewModel.singleOrThreadOpen()) {
            if ((e = this.single) != null) {
                return e.focusCommentInput();
            }
            return;
        }
        return this.chat.focusInput();
    };
    Flow.prototype._initFlowNotifications = function() {
        return this.model.fullyLoaded.done(function(e) {
            return function() {
                if (e.model.isFlow()) {
                    return e.listenTo(e.model, "change:team_notifications", function(t, n) {
                        if (n !== null) {
                            return e.renderTeamFeedback();
                        }
                        return;
                    });
                }
                return;
            };
        }(this));
    };
    Flow.prototype.onAttach = function() {
        var e;
        Flow.__super__.onAttach.apply(this, arguments);
        if (this.model.get("team_notifications") === null) {
            e = this.model.users.notifiableByTeam().length - 1;
            if (e >= 10) {
                return this.renderFlowWelcome();
            }
            return this.model.save({
                team_notifications: true
            }, {
                silent: true,
                patch: true
            });
        }
        return;
    };
    return Flow;
}(Views.Content);

_.extend(Views.Flow.prototype, Flowdock.KeyboardEvents);
