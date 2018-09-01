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

window.Router = function(e) {
    function Router() {
        this.removeFlow = o(this.removeFlow, this);
        this.storeFlowState = o(this.storeFlowState, this);
        this.routeProperty = Bacon.fromBinder(function(e) {
            return function(t) {
                var n, r;
                r = function() {
                    return e.stopListening(e, "route", n);
                };
                n = function(e, n) {
                    if (t({
                        route: e,
                        params: n
                    }) === Bacon.noMore) {
                        return r();
                    }
                    return;
                };
                e.listenTo(e, "route", n);
                return r;
            };
        }(this)).toProperty();
        this.routeProperty.onValue(function() {});
        this.route(/^(.+)$/, "catchall", function() {
            return this.navigate("", {
                trigger: true,
                replace: true
            });
        });
        Router.__super__.constructor.apply(this, arguments);
    }
    i(Router, e);
    Router.root = "/app/";
    Router.prototype.routes = {
        "": "activateFirst",
        "new-tab": "showNewTab",
        "private(/:id)": "routePrivate",
        ":org/:name/welcome": "welcome",
        ":org/:name/welcome/:type": "welcome",
        "preferences/:initialTab": "viewPreferences",
        preferences: "viewPreferences",
        "create-flow(/:organizationId)": "viewCreateFlow",
        ":org/:name": "routeFlow",
        ":org/:name/users": "viewUsers",
        ":org/:name/messages/:id": "viewSingleMessage",
        ":org/:name/threads/:id": "viewThread",
        ":org/:name/*invalid": "routeInvalid",
        "create-organization": "viewCreateOrganization",
        "new-1-to-1": "viewNewPrivateDialog"
    };
    Router.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.flows = e.flows;
        this.privates = e.privates;
        this.manager = e.manager;
        this.flowStates = {};
        this.flows.each(function(e) {
            return function(t) {
                return e.storeFlowState(t);
            };
        }(this));
        this.listenTo(this.flows, "add", function(e) {
            return this.storeFlowState(e);
        });
        this.listenTo(this.flows, "remove", function(e) {
            return this.removeFlow(e);
        });
        this.route(/^(.+)\/$/, "removeTrailingSlash", function(e) {
            return this.navigate(e, {
                trigger: true,
                replace: true
            });
        });
        return this.route(":org/:name/inbox/:id", function(e, t, n) {
            return this.navigate(e + "/" + t + "/messages/" + n, {
                trigger: true,
                replace: true
            });
        });
    };
    Router.prototype.findFlow = function(e, t) {
        var n;
        n = e + "/" + t;
        return this.flows.find(function(e) {
            return e.path() === n;
        });
    };
    Router.prototype.findPrivate = function(e) {
        return this.privates.withUser(parseInt(e, 10));
    };
    Router.prototype.activateFlow = function(e, t, n) {
        var r, o, i;
        if (n == null) {
            n = function() {}
        };
        if (this.navigationDisabled) {
            return undefined;
        }
        if (e && t) {
            r = this.findFlow(e, t);
        } else {
            r = this.findPrivate(e);
        }
        if (r) {
            if (((o = this.currentFlow) != null ? o.id : undefined) === r.id) {
                n(r);
                return r;
            }
            this.currentFlow = r;
            i = function(e) {
                return function() {
                    e.trigger("flowActivated", r);
                    e.manager.activate(r);
                    return n(r);
                };
            }(this);
            if (r.isFlow() && !r.get("joined")) {
                r.save({
                    open: true
                }, {
                    wait: true,
                    patch: true,
                    success: i
                });
            } else {
                if (!r.get("open")) {
                    if (typeof r.saveWithRetry == "function") {
                        r.saveWithRetry({
                            open: true
                        }, {
                            patch: true
                        })
                    }
                };
                i();
            }
            return r;
        }
        this.currentFlow = null;
        this.trigger("flowActivated", null);
        return void this.flowNotFound(e, t);
    };
    Router.prototype.routeFlow = function(e, t, n) {
        if (n == null) {
            n = {}
        };
        t = t.replace(/\?.*$/, "");
        return this.activateFlow(e, t, function(e) {
            return function(t) {
                var r;
                r = e.maybeFilterInbox(t, n);
                e.manager.thread(null);
                e.manager.single(null);
                e.manager.users(false);
                return e.storeFlowState(t, r);
            };
        }(this));
    };
    Router.prototype.routePrivate = function(e) {
        var t;
        if (e) {
            this.manager.closeOverlay();
            t = this.activateFlow(e);
            return this.trigger("flowState", {
                flow: t
            });
        }
        return this.viewNewPrivateDialog();
    };
    Router.prototype.routeInvalid = function(e, t) {
        return this.navigateToFlow(this.findFlow(e, t));
    };
    Router.prototype.viewSingleMessage = function(e, t, n, r) {
        if (r == null) {
            r = {}
        };
        return this.activateFlow(e, t, function(e) {
            return function(t) {
                var o;
                if (t != null) {
                    e.manager.single(n);
                    o = e.maybeFilterInbox(t, r);
                    return e.storeFlowState(t, o, {
                        message: n
                    });
                }
            };
        }(this));
    };
    Router.prototype.viewThread = function(e, t, n, r) {
        if (r == null) {
            r = {}
        };
        return this.activateFlow(e, t, function(e) {
            return function(t) {
                var o;
                if (t != null) {
                    e.manager.thread(n);
                    o = e.maybeFilterInbox(t, r);
                    return e.storeFlowState(t, o, {
                        thread: n
                    });
                }
            };
        }(this));
    };
    Router.prototype.viewUsers = function(e, t, n) {
        if (n == null) {
            n = {}
        };
        return this.activateFlow(e, t, function(e) {
            return function(t) {
                var r;
                if (t != null) {
                    e.manager.users(true);
                    r = e.maybeFilterInbox(t, n);
                    return e.storeFlowState(t, r, {
                        users: true
                    });
                }
            };
        }(this));
    };
    Router.prototype.maybeFilterInbox = function(e, t) {
        var n;
        if (t == null || _.isEmpty(t)) {
            n = new Models.Filter.Inbox();
        } else {
            n = Models.Filter.fromQuery(t);
        }
        e.fullyLoaded.done(function(t) {
            return function() {
                n.normalize(e);
                return t.manager.filterInbox(n, false);
            };
        }(this));
        return n;
    };
    Router.prototype.welcome = function(e, t, n) {
        this.navigate(e + "/" + t, {
            trigger: true,
            replace: true
        });
        return this.manager.restartWalkthrough({
            type: n
        });
    };
    Router.prototype.viewCreateFlow = function(e) {
        return this.manager.openCreateFlow(e);
    };
    Router.prototype.viewCreateOrganization = function() {
        return this.manager.openCreateOrganization();
    };
    Router.prototype.viewNewPrivateDialog = function() {
        return this.manager.openNewPrivateDialog();
    };
    Router.prototype.viewPreferences = function(e) {
        return Flowdock.app.ready.done(function(t) {
            return function() {
                return t.manager.openPreferences(e);
            };
        }(this));
    };
    Router.prototype.storeFlowState = function(e, t, n) {
        if (n == null) {
            n = {}
        };
        this.flowStates[e.id] = {
            flow: e,
            inbox: t,
            chat: n
        };
        if (n.message) {
            this.lastRoute = this.viewSingleMessage;
        } else {
            if (n.thread) {
                this.lastRoute = this.viewThread;
            } else {
                this.lastRoute = this.routeFlow;
            }
        }
        return this.trigger("flowState", this.flowStates[e.id]);
    };
    Router.prototype.reloadFlow = function() {
        var e, t, n, r;
        console.log("Router: Reloading flow", (n = this.currentFlow) != null ? n.path() : undefined);
        if (this.currentFlow) {
            e = this.currentFlow;
            t = e.path().split("/");
            r = this.flowStates[e.id];
            return e.fullyLoaded.then(function(n) {
                return function() {
                    var o;
                    if (r.chat.message) {
                        t.push(r.chat.message)
                    };
                    if (r.chat.thread) {
                        t.push(r.chat.thread)
                    };
                    if (r.inbox != null) {
                        t.push(r.inbox.asVisibleParams(e))
                    };
                    if (((o = n.currentFlow) != null ? o.id : undefined) === e.id) {
                        n.currentFlow = null;
                        return n.lastRoute.apply(n, t);
                    }
                    return;
                };
            }(this));
        }
        return this.activateFirst();
    };
    Router.prototype.removeFlow = function(e) {
        var t, n;
        console.log("Router: removing flow", e != null ? e.path() : undefined);
        delete this.flowStates[e.id];
        if (e.id === ((n = this.currentFlow) != null ? n.id : undefined)) {
            this.currenFlow = null;
            t = this.flows.find(function(t) {
                return t.get("open") && t.id !== e.id;
            });
            if (t) {
                return this.navigateBackToFlow(t);
            }
            return this.showNewTab();
        }
        return;
    };
    Router.prototype.activateFirst = function() {
        var e;
        this.manager.closeOverlay();
        e = this.flows.firstOpen();
        if (e) {
            return this.navigateToFlow(e);
        }
        return this.showNewTab();
    };
    Router.prototype.activatePrevious = function() {
        return Flowdock.app.flows.lastActive.take(1).onValue(function(e) {
            if (e) {
                return Flowdock.app.router.navigateBackToFlow(e);
            }
            return Flowdock.app.router.activateFirst();
        });
    };
    Router.prototype.navigateTo = function(e, t) {
        if (t == null) {
            t = {}
        };
        if (this.navigationDisabled) {
            return undefined;
        }
        t = _.extend({}, r, t);
        return this.navigate(Helpers.pathFor(e), t);
    };
    Router.prototype.navigateToFlow = function(e, t, n) {
        var o, i, s, a;
        if (t == null) {
            t = {}
        };
        if (n == null) {
            n = {}
        };
        if (this.navigationDisabled) {
            return undefined;
        }
        n = _.extend({}, r, n);
        o = this.flowStates[e.id || e] || {};
        s = _.pick(t, "thread", "message", "users", "jump");
        a = _.pick(t, "filter");
        i = {
            flow: e
        };
        if (_.isEmpty(a)) {
            _.extend(i, {
                filter: o.inbox
            });
        } else {
            _.extend(i, a);
        }
        if (_.isEmpty(s)) {
            _.extend(i, o.chat);
        } else {
            _.extend(i, s);
        }
        if (!n.trigger) {
            this.storeFlowState(e, i.filter, _.pick(i, "thread", "message", "users"))
        };
        return this.navigate(Helpers.pathFor(i), n);
    };
    Router.prototype.navigateBackToFlow = function(e, t) {
        var n, r;
        if (t == null) {
            t = {}
        };
        if (e) {
            if (e.isFlow()) {
                if (t.closeSingleIfCurrentFlow && ((r = this.currentFlow) != null ? r.id : undefined) === e.id) {
                    n = {
                        message: null,
                        thread: null,
                        users: null
                    };
                } else {
                    n = {};
                }
                return this.navigateToFlow(e, n, t);
            }
            return this.navigateToPrivate(e, t);
        }
        return;
    };
    Router.prototype.navigateToPrivate = function(e, t) {
        return this.navigateTo({
            private: e
        }, t);
    };
    Router.prototype.flowNotFound = function(e, t) {
        this.manager.error("flow-not-found", {
            org: e,
            name: t
        });
        return this.trigger("flowActivated", undefined);
    };
    Router.prototype.routingError = function() {
        this.manager.error("routing-error");
        return this.trigger("flowActivated", undefined);
    };
    Router.prototype.showNewTab = function() {
        this.manager.openNewTab();
        this.currentFlow = null;
        Flowdock.eventBus.trigger("mobile:hide-navigation");
        this.trigger("flowActivated", undefined);
        return this.navigate(Helpers.pathFor({
            showNewTab: true
        }));
    };
    Router.prototype.disableNavigation = function() {
        return this.navigationDisabled = true;
    };
    Router.prototype.isMessageOpen = function() {
        return this.currentFlow != null && this.flowStates[this.currentFlow.id].message != null;
    };
    return Router;
}(Backbone.Router);

_.extend(window.Router.prototype, Backbone.Bacon);

r = {
    trigger: true
};
