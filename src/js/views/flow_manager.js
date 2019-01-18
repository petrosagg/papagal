var r, o, i = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, s = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (a.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, a = {}.hasOwnProperty;

r = require("views/overlays/new_tab");

o = require("views/overlays/spot_search");

Views.FlowManager = function(t) {
    function FlowManager() {
        this.createWalkthrough = i(this.createWalkthrough, this);
        return FlowManager.__super__.constructor.apply(this, arguments);
    }
    s(FlowManager, t);
    FlowManager.prototype.events = {
        "click a[href]": "followLink"
    };
    FlowManager.prototype.collectionEvents = {
        add: "addFlow",
        remove: "removeFlow",
        "change:open": "flowOpenChanged",
        "change:url": "onFlowUrlChange"
    };
    FlowManager.prototype.keyboardEvents = {
        openPreferences: function() {
            return setTimeout(function(e) {
                return function() {
                    return e.openPreferences("preferences");
                };
            }(this), 50);
        },
        openHelp: "openShortcutOverlay",
        openChatCommandHelp: "openChatCommandOverlay",
        closeTab: "closeTab",
        switchSingleViewSide: "switchSingleViewSide"
    };
    FlowManager.prototype.switchSingleViewSide = function() {
        var e;
        e = this.currentView.viewModel;
        if (e.get("narrow") || !e.get("single") && !e.get("thread")) {
            return undefined;
        }
        return this.app.preferences.flip("single_view_in_inbox");
    };
    FlowManager.prototype.initialize = function(e) {
        var t, n, r, o, i;
        for (this.app = e.app, i = e.user, this.flowViews = {}, this.rendered = {}, o = this.collection.where({
            open: true
        }), n = 0, r = o.length; r > n; n++) {
            t = o[n];
            this.addFlow(t);
        }
        this.navigation = this.subview(Views.Navigation.build({
            collection: this.collection,
            manager: this,
            notifications: this.app.notificationItems,
            preferences: this.app.preferences,
            user: i
        }));
        return setInterval(function(e) {
            return function() {
                return e._clearCache();
            };
        }(this), 6e4);
    };
    FlowManager.prototype.addFlow = function(e) {
        if (e.get("open")) {
            return this._initFlowView(e);
        }
        return;
    };
    FlowManager.prototype.removeFlow = function(e) {
        return this._removeFlowView(e);
    };
    FlowManager.prototype.firstOpenFlow = function() {
        return this.collection.find(function(e) {
            return e.get("open") && !e.isPrivate();
        });
    };
    FlowManager.prototype.flowOpenChanged = function(e) {
        if (e.get("open")) {
            return this._initFlowView(e);
        }
        return this._removeFlowView(e);
    };
    FlowManager.prototype.buildFlowViewModel = function(e) {
        var t;
        t = new Views.FlowViewModel({}, {
            resize: Flowdock.resize,
            preferences: this.app.preferences,
            flowPreferences: this.app.preferences.flowPreferences(e)
        });
        this.listenTo(t, "navigate", function() {
            if (this.currentFlow) {
                return this.app.router.navigateToFlow(this.currentFlow, {
                    users: false
                });
            }
            return;
        });
        this.listenTo(t, "change:rhs", this.rhsStyleToggle);
        return t;
    };
    FlowManager.prototype.activate = function(e) {
        var t, n, r, o, i, s;
        if (((t = this.currentFlow) != null ? t.id : undefined) === e.id) {
            return this;
        }
        if (this.walkthrough) {
            i = this.walkthrough.unmount();
            this.walkthrough = null;
        };
        if ((n = this.currentView) != null) {
            n.triggerDetach()
        };
        s = this.flowViews[e.id];
        this.append(s);
        this.currentFlow = e;
        this.currentView = s;
        if ((r = this.currentView) != null) {
            r.viewModel.set({
                thread: null,
                single: null,
                users: false
            })
        };
        this.rhsStyleToggle();
        if ((o = this.currentView) != null) {
            o.updatePanes()
        };
        this.trigger("change", this.currentView);
        this.bindKeyboardEvents();
        return this;
    };
    FlowManager.prototype.bindKeyboardEvents = function() {
        return this.untilEnd(Flowdock.app.shortcutStream).filter(function(e) {
            return function(t) {
                return e.keyboardEvents[t.action] != null;
            };
        }(this)).takeUntil(this.asEventStream("change")).onValue(function(e) {
            return function(t) {
                var n;
                n = e.keyboardEvents[t.action];
                if (!_.isFunction(n)) {
                    n = e[e.keyboardEvents[t.action]]
                };
                if (n != null) {
                    return n.call(e, t);
                }
                return;
            };
        }(this));
    };
    FlowManager.prototype.filterInbox = function(e, t) {
        var n, r;
        if (t == null) {
            t = true
        };
        this.closeOverlay();
        if ((n = this.currentView) != null) {
            n.onSearchChange(e)
        };
        if ((r = this.currentView) != null) {
            return r.viewModel.setSearch(e, t);
        }
        return;
    };
    FlowManager.prototype.openCreateFlow = function(e) {
        var t, n, r;
        t = {
            collection: this.collection,
            model: new Models.Flow(),
            organizations: Flowdock.app.getOrganizations(),
            target: $("body"),
            loader: true,
            preselect: ((n = this.currentFlow) != null ? n.isPrivate() : undefined) ? undefined : e || ((r = this.currentFlow) != null && typeof r.organization == "function" ? r.organization() : undefined)
        };
        return this.openOverlay(Views.NewFlow, t);
    };
    FlowManager.prototype.openFlowRename = function(e) {
        return this.openOverlay(Views.Overlays.FlowName, {
            model: this.collection.get(e),
            target: $("body")
        });
    };
    FlowManager.prototype.openNewTab = function() {
        var e, t;
        this.closeOverlay();
        if ((e = this.currentView) != null) {
            e.triggerDetach()
        };
        this.currentFlow = null;
        t = new r({
            collection: Flowdock.app.flows,
            privates: Flowdock.app.privates
        });
        this.currentView = t;
        this.$el.append(t.el);
        t.render();
        t.triggerAttach();
        this.trigger("change", this.currentView);
        this.bindKeyboardEvents();
        return this;
    };
    FlowManager.prototype.openSpotlightSearch = function(e) {
        var t, n;
        if (!$("#spot-search-overlay").length) {
            t = this;
            n = this.subview(new o({
                target: $("body"),
                model: this.model,
                isShortcutKeyUsed: e
            }).attach());
            n.triggerAttach();
            return this.trigger("change", n);
        }
    };
    FlowManager.prototype.openCreateOrganization = function() {
        return this.openOverlay(Views.NewOrganization, {
            model: new Models.Organization(),
            collection: Flowdock.app.getOrganizations(),
            target: $("body"),
            loader: true
        });
    };
    FlowManager.prototype.openNewPrivateDialog = function() {
        return this.openOverlay(Views.NewPrivateDialog, {
            target: $("body"),
            loader: true
        });
    };
    FlowManager.prototype.openFlowSettings = function(e, t) {
        var n, r;
        if (t == null) {
            t = "preferences"
        };
        r = e.get("organization").parameterized_name;
        n = e.get("parameterized_name");
        return this.openPreferences(r + "/flows/" + n + "/" + t);
    };
    FlowManager.prototype.openPreferences = function(e) {
        var t, n;
        if (e == null) {
            e = "profile"
        };
        if (window.macgap != null) {
            n = window.open(location.origin + "/settings/" + e, "", "width=1280,height=800");
        } else {
            n = (t = "settings/" + e, window.open(location.origin + "/" + t, t));
        }
        return n.focus();
    };
    FlowManager.prototype.openShortcutOverlay = function() {
        return this.openOverlay(Views.KeyboardShortcuts, {
            model: Flowdock.app.preferences,
            target: $("body"),
            removeOnHide: true
        });
    };
    FlowManager.prototype.openChatCommandOverlay = function() {
        var e;
        return e = this.openOverlay(Views.SlashCommands, {
            target: $("body"),
            removeOnHide: true
        });
    };
    FlowManager.prototype.openOverlay = function(e, t) {
        if (this.overlay == null) {
            this.overlay = new e(t).attach();
            this.overlay.triggerAttach();
            this.listenToOnce(this.overlay, "close", function() {
                this.overlay = null;
                return this.trigger("overlay:close");
            });
            return this.overlay;
        }
        return;
    };
    FlowManager.prototype.closeOverlay = function() {
        if (this.overlay) {
            return this.overlay.close();
        }
        return;
    };
    FlowManager.prototype.users = function(e) {
        this.closeOverlay();
        return this.currentView.viewModel.set({
            users: e
        });
    };
    FlowManager.prototype.single = function(e, t) {
        var n;
        if (e == null) {
            e = null
        };
        if (t == null) {
            t = null
        };
        this.closeOverlay();
        if ((n = this.currentView) != null) {
            return n.viewModel.single(e);
        }
        return;
    };
    FlowManager.prototype.thread = function(e, t) {
        var n;
        if (e == null) {
            e = null
        };
        if (t == null) {
            t = null
        };
        this.closeOverlay();
        if ((n = this.currentView) != null) {
            return n.viewModel.thread(e);
        }
        return;
    };
    FlowManager.prototype.closeTab = function(e) {
        if (this.overlay) {
            this.closeOverlay();
            e.stopPropagation();
            return e.preventDefault();
        }
        if (this.currentView.constructor === r) {
            return Flowdock.app.router.activatePrevious();
        }
        return;
    };
    FlowManager.prototype.append = function(e) {
        this.renderOnce(e);
        this.$el.append(e.el);
        e.triggerAttach();
        return this;
    };
    FlowManager.prototype.renderOnce = function(e) {
        if (!this.rendered[e.model.id]) {
            e.render();
            this.rendered[e.model.id] = true;
        };
        return e;
    };
    FlowManager.prototype.render = function() {
        if (Flowdock.mobile) {
            this.$el.addClass("mobile")
        };
        this.$el.prepend(this.navigation.render().$el);
        this.navigation.triggerAttach();
        this.rhsStyleToggle();
        return this;
    };
    FlowManager.prototype.rhsStyleToggle = function() {
        var e;
        if (((e = this.currentView) != null ? e.viewModel : undefined) != null) {
            return this.$el.toggleClass("rhs-hidden", !this.currentView.viewModel.get("rhs"));
        }
    };
    FlowManager.prototype.resetFlow = function(e) {
        var t, n, r, o;
        if (e.get("open")) {
            n = this.currentFlow === e;
            if ((r = this.flowViews[e.id]) != null) {
                o = r.viewModel;
            } else {
                o = undefined;
            }
            this._removeFlowView(e, {
                viewModel: false
            });
            t = this._viewClassFor(e);
            this.flowViews[e.id] = this.subview(new t({
                model: e,
                viewModel: o || this.buildFlowViewModel(e)
            }));
            if (n) {
                this.activate(e)
            };
            return this.flowViews[e.id];
        }
    };
    FlowManager.prototype.followLink = function(e) {
        var t, n, r, o, i, s;
        if (!e.isDefaultPrevented() && (t = e.target.tagName.toLowerCase() === "a" ? e.target : e.currentTarget, 
        $(t).attr("target") !== "_blank" && !$(t).hasClass("no-follow-link"))) {
            o = Helpers.absoluteUrlFor();
            if (t.href.indexOf(o) === 0) {
                if (e.metaKey || e.ctrlKey) {
                    return;
                }
                if (this.permanentError) {
                    return void e.preventDefault();
                }
                if (Flowdock.app.manager.currentFlow != null && Flowdock.app.manager.currentFlow.isFlow()) {
                    n = {};
                    i = $(t).data("tag-search");
                    if (i) {
                        n.filter = new Models.Filter.All({
                            tags: [ i ]
                        });
                    } else {
                        r = $(t).data("message");
                        if (r) {
                            n.message = r;
                        } else {
                            s = $(t).data("thread");
                            if (s) {
                                n.thread = s
                            }
                        }
                    }
                };
                if (_.isEmpty(n)) {
                    Flowdock.app.router.navigate(t.href.replace(o, ""), {
                        trigger: true
                    });
                } else {
                    Flowdock.app.router.navigateToFlow(Flowdock.app.manager.currentFlow, n, {
                        trigger: true
                    });
                }
                return e.preventDefault();
            }
            if ($(t).attr("target") !== "_blank") {
                return $(t).attr("target", "_blank").attr("rel", "noopener noreferrer");
            }
            return;
        }
    };
    FlowManager.prototype.error = function(e, t, n) {
        var r, o;
        if (n == null) {
            n = {}
        };
        r = Views.Errors.get(e, "global");
        if ((o = this.currentView) != null) {
            o.triggerDetach()
        };
        this.currentFlow = null;
        this.currentView = new r({
            model: t
        });
        this.$el.append(this.currentView.render().$el);
        if (n.permanent) {
            Flowdock.app.router.disableNavigation();
            this.permanentError = true;
        };
        return this.trigger("change", this.currentView);
    };
    FlowManager.prototype.toastError = function(e, t) {
        var n, r;
        n = Views.Errors.get(e, "inline");
        r = new n({
            model: t
        });
        this.$el.append(r.render().$el);
        return function() {
            return r.triggerDetach();
        };
    };
    FlowManager.prototype.destructor = function() {
        var e, t, r;
        t = this.flowViews;
        for (e in t) {
            r = t[e];
            this._removeFlowView(r.model);
        }
        this.stopListening();
        return FlowManager.__super__.destructor.apply(this, arguments);
    };
    FlowManager.prototype.remove = function() {
        this.$el = this.el = null;
        return this;
    };
    FlowManager.prototype.onFlowUrlChange = function(e) {
        if (e === this.currentFlow) {
            return Flowdock.app.router.navigate(Helpers.pathFor({
                flow: e
            }));
        }
        return;
    };
    FlowManager.prototype.findMessage = function(e, t) {
        var n, r;
        n = this.collection.get(e);
        r = this.findSubviews(n)[0];
        if (r != null) {
            return r.findMessage(t);
        }
        return;
    };
    FlowManager.prototype.preserveScrolling = function(e) {
        if ((typeof currentView != "undefined" && currentView !== null ? currentView.preserveScrolling : undefined) != null) {
            return currentView.preserveScrolling(e);
        }
        return e();
    };
    FlowManager.prototype.createWalkthrough = function(e) {
        var t, n;
        if ((n = this.currentFlow) != null && n.isFlow()) {
            t = this.currentView.chat.messageList;
            return this.currentView.chat.messageList.onceMessagesRendered(function(t) {
                return function() {
                    return t._initWalkthrough(e);
                };
            }(this));
        }
    };
    FlowManager.prototype.restartWalkthrough = function(t) {
        var n, r;
        n = require("models/tutorial");
        r = n.create(t);
        r.done(this.createWalkthrough);
        return r;
    };
    FlowManager.prototype._clearCache = function() {
        var e, t, n, r, o, i, s;
        r = this.flowViews;
        i = [];
        for (n in r) {
            s = r[n];
            e = (new Date() - s.instantiatedAt) / 864e5;
            if (n !== ((o = this.currentFlow) != null ? o.id : undefined) && e > 1) {
                t = s.model;
                this._removeFlowView(t);
                i.push(this._initFlowView(t));
            };
        }
        return i;
    };
    FlowManager.prototype._initFlowView = function(e) {
        var t, n;
        t = this._viewClassFor(e);
        n = this.subview(new t({
            model: e,
            viewModel: this.buildFlowViewModel(e)
        }));
        return this.flowViews[e.id] = n;
    };
    FlowManager.prototype._initWalkthrough = function(t) {
        var n, r, o, i, s, a, u, l, c, p, d, h;
        if ((p = this.walkthrough) != null) {
            p.skip()
        };
        n = require("lib/flowdock/walkthrough");
        this.walkthrough = new n({
            model: t
        }, function(e) {
            return function() {
                return delete e.walkthrough;
            };
        }(this));
        u = function(e) {
            return function() {
                var t;
                t = e.navigation.userMenu.dropdown;
                return t.asEventStream("open").map(1).merge(t.asEventStream("close").map(-1)).scan(0, function(e, t) {
                    return e + t;
                });
            };
        }(this);
        s = function(e) {
            return function() {
                var t;
                if (e.currentView.viewModel.get("inbox")) {
                    t = 1;
                } else {
                    t = 0;
                }
                return e.currentView.viewModel.asEventStream("change:inbox").map(function(e) {
                    if (e.get("inbox")) {
                        return 1;
                    }
                    return -1;
                }).scan(t, function(e, t) {
                    return e + t;
                });
            };
        }(this);
        l = function(e) {
            return function() {
                var t;
                t = e.currentView.model;
                return t.stream.filter(function(e) {
                    return e.flow === t.id && e.id;
                });
            };
        }(this);
        a = function(e) {
            return function() {
                return e.currentView.chat.input.textarea.textarea.asEventStream("focus blur").map(function(e) {
                    return e.type === "blur";
                }).toProperty();
            };
        }(this);
        r = function(e) {
            return function() {
                return e.currentView.toolbar.$("#user-add").asEventStream("click");
            };
        }(this);
        c = function(e) {
            return function() {
                return e.navigation.userMenu.$(".preferences").asEventStream("click");
            };
        }(this);
        i = function(e) {
            return function() {
                var t;
                t = e.currentView.viewModel;
                return t.asEventStream("change:inbox").map(function(e) {
                    return e.get("inbox");
                }).toProperty(t.get("inbox")).filter(function(e) {
                    return e === true;
                });
            };
        }(this);
        h = null;
        o = function(e, t) {
            return t.complete();
        };
        d = function(e, t) {
            return t.skip();
        };
        h = this.walkthrough.model.getTaskMatching("inbox");
        if (h) {
            this.walkthrough.addStep({
                task: h,
                target: this.currentView.toolbar.$el,
                actionTarget: this.currentView.toolbar.$("#inbox-toggle"),
                success: i,
                autoContinue: true,
                onSkip: d,
                onSuccess: function(e) {
                    return function(t, n) {
                        o(t, n);
                        return e.currentView.inbox.messageList.onceMessagesRendered(function() {
                            return t.positionAtNode($(".setup-sources-button")[0], "bottom");
                        });
                    };
                }(this)
            })
        }
        h = this.walkthrough.model.getTaskMatching("menu");
        if (h) {
            this.walkthrough.addStep({
                task: h,
                target: this.navigation.$("#user-menu-toggle"),
                actionTarget: this.navigation.userMenu.$(".user-menu-toggle"),
                currentStep: function() {
                    return u();
                },
                success: c,
                onSkip: d,
                onSuccess: o
            })
        }
        h = this.walkthrough.model.getTaskMatching("invite");
        if (h) {
            this.walkthrough.addStep({
                task: h,
                target: this.currentView.toolbar.$("#user-add-item"),
                actionTarget: this.currentView.toolbar.$("#user-add"),
                shouldSkip: function(e) {
                    return function() {
                        var t;
                        return !((t = e.currentFlow) != null ? t.can("post", "invitations") : undefined);
                    };
                }(this),
                success: r,
                onSkip: d,
                onSuccess: o
            })
        }
        h = this.walkthrough.model.getTaskMatching("chat");
        if (h) {
            this.walkthrough.addStep({
                task: h,
                target: this.currentView.chat.input.$el,
                success: function(e) {
                    return function() {
                        return e._whenChatMessagePosted(l());
                    };
                }(this),
                onSkip: d,
                onSuccess: o
            })
        }
        return this._startWalkthrough();
    };
    FlowManager.prototype._removeFlowView = function(e, t) {
        var n, r, o;
        if (t == null) {
            t = {}
        };
        n = ((r = this.currentFlow) != null ? r.id : undefined) === e.id;
        o = this.flowViews[e.id];
        if (o) {
            if (n) {
                o.triggerDetach()
            };
            if (t.viewModel !== false) {
                o.viewModel.stopListening();
                this.stopListening(o.viewModel);
            };
            this.removeSubview(o);
            if (n) {
                this.currentView = this.currentFlow = undefined
            };
            this.rendered[e.id] = false;
            return delete this.flowViews[e.id];
        }
        return;
    };
    FlowManager.prototype._startWalkthrough = function() {
        return this.walkthrough.start();
    };
    FlowManager.prototype._viewClassFor = function(e) {
        if (e.isFlow()) {
            return Views.Flow;
        }
        return Views.Private;
    };
    FlowManager.prototype._whenChatMessagePosted = function(e) {
        return e.filter(function(e) {
            var t;
            return ((t = e.event) === "message" || t === "comment" || t === "file") && e.user === Flowdock.app.user.id;
        }).take(1);
    };
    return FlowManager;
}(Flowdock.HierarchicalView);
