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

Views.FlowViewModel = function(e) {
    function FlowViewModel() {
        return FlowViewModel.__super__.constructor.apply(this, arguments);
    }
    r(FlowViewModel, e);
    FlowViewModel.prototype.defaults = {
        narrow: false,
        thread: null,
        single: null,
        inbox: false,
        chat: true,
        users: false,
        single_view_in_inbox: false,
        rhs: null,
        lhs: null,
        selected_message: null,
        filter: JSON.stringify({})
    };
    FlowViewModel.prototype.initialize = function(e, t) {
        var n;
        n = t.resize;
        this.preferences = t.preferences;
        this.flowPreferences = t.flowPreferences;
        if (n != null) {
            n.moves.debounce(100).onValue(function(e) {
                return function() {
                    return e.set({
                        narrow: e._narrow()
                    });
                };
            }(this))
        };
        this.set({
            narrow: this._narrow()
        });
        this.bindBeforechange();
        this.listenTo(this, "change:search", function() {
            return this._searchUpdate();
        });
        this.listenTo(this, "change:single change:thread change:rhs change:lhs", function() {
            if (this.get("rhs") === "single" || this.get("lhs") === "single") {
                return this.set({
                    selected_message: this.get("single") || this.get("thread")
                });
            }
            return this.set({
                selected_message: null
            });
        });
        this.listenTo(this, "change:thread", function() {
            if (this.get("thread")) {
                return this.set({
                    single: null,
                    users: false
                });
            }
            return;
        });
        this.listenTo(this, "change:single", function() {
            if (this.get("single")) {
                return this.set({
                    thread: null,
                    users: false
                });
            }
            return;
        });
        this.listenTo(this.preferences, "change:single_view_in_inbox", function() {
            return this.set({
                single_view_in_inbox: this.preferences.get("single_view_in_inbox")
            });
        });
        this.listenTo(this, "change:narrow change:thread change:single change:users change:single_view_in_inbox", this._update);
        this.listenTo(this, "change:narrow", function() {
            if (this.get("narrow")) {
                return undefined;
            }
            return this.preferences.set({
                inbox_only: false
            });
        });
        this.listenTo(this.flowPreferences, "change", this._update);
        this.listenTo(this.preferences, "change:inbox_only", this._update);
        this.set("single_view_in_inbox", this.preferences.get("single_view_in_inbox"));
        return this._update();
    };
    FlowViewModel.prototype.bindBeforechange = function() {
        var e, t;
        e = function() {
            var e, n, r, o;
            for (r = _.keys(this.defaults), o = [], e = 0, n = r.length; n > e; e++) {
                t = r[e];
                o.push("change:" + t);
            }
            return o;
        }.call(this).join(" ");
        return this.listenTo(this, e, function(e, t) {
            return e.trigger("beforechange", e, t);
        });
    };
    FlowViewModel.prototype.thread = function(e) {
        if (e != null) {
            this.set({
                users: false
            })
        };
        return this.set({
            thread: e
        });
    };
    FlowViewModel.prototype.single = function(e) {
        if (e != null) {
            this.set({
                users: false
            })
        };
        return this.set({
            single: e
        });
    };
    FlowViewModel.prototype.stateProperty = function() {
        return this.untilEnd(this.asEventStream("change")).map(this, "fullState").skipDuplicates(_.isEqual).toProperty(this.fullState());
    };
    FlowViewModel.prototype.fullState = function() {
        return {
            single: this._single(),
            inbox: this._inboxVisible(),
            chat: this._chatVisible()
        };
    };
    FlowViewModel.prototype.showInbox = function(e) {
        if (e == null) {
            e = {}
        };
        if (this.get("narrow")) {
            this.set({
                lhs: "inbox"
            });
            if (e.savePreference) {
                this.preferences.set({
                    inbox_only: true
                })
            };
        } else {
            this.set({
                rhs: "inbox"
            });
            if (e.savePreference) {
                this.flowPreferences.set({
                    inbox_visible: true
                })
            };
        }
        if (e.scroll) {
            return this.trigger("inbox-scroll-top");
        }
        return;
    };
    FlowViewModel.prototype.setSearch = function(e, t) {
        var n;
        if (t == null) {
            t = true
        };
        n = JSON.stringify(e.asParams());
        if (e instanceof Models.Filter.Inbox) {
            n = JSON.stringify({})
        };
        if (this.get("filter") !== n) {
            this.set({
                filter: n
            });
            if (e.isEmpty() || !t && this.isSingleViewInFrontOfInbox()) {
                return this._update();
            }
            return this.showInbox();
        }
        return;
    };
    FlowViewModel.prototype.rhsPreference = function() {
        if (this.get("narrow")) {
            return undefined;
        }
        return this.flowPreferences.get("inbox_visible");
    };
    FlowViewModel.prototype.toggleRhs = function() {
        var e;
        e = this._mustNavigateOnRhsToggle();
        if (this.get("narrow")) {
            if (this.get("lhs") === "inbox") {
                if (this.preferences.get("inbox_only")) {
                    this.preferences.set({
                        inbox_only: false
                    });
                } else {
                    this._update();
                }
            } else {
                this.preferences.set({
                    inbox_only: true
                });
                this.flowPreferences.set({
                    inbox_visible: true
                });
                this.set({
                    lhs: "inbox"
                });
            }
        } else {
            if (this.get("rhs") === null) {
                this.flowPreferences.set({
                    inbox_visible: true
                });
                this.set({
                    rhs: "inbox"
                });
            } else {
                this.preferences.set({
                    inbox_only: false
                });
                this.flowPreferences.set({
                    inbox_visible: false
                });
                this.set({
                    rhs: null
                });
            }
        }
        if (e) {
            return this.trigger("navigate");
        }
        return;
    };
    FlowViewModel.prototype.setRhsToNull = function() {
        this.flowPreferences.set({
            inbox_visible: false
        });
        return this.set({
            rhs: null
        });
    };
    FlowViewModel.prototype.singleOrThreadOpen = function() {
        return this.get("lhs") === "single" || this.get("rhs") === "single";
    };
    FlowViewModel.prototype.isSingleViewInFrontOfInbox = function() {
        if (this.get("narrow")) {
            return this.get("lhs") === "single";
        }
        return this.get("rhs") === "single";
    };
    FlowViewModel.prototype._rhs = function() {
        if (this.get("narrow")) {
            return null;
        }
        if (this._single() && this.get("single_view_in_inbox")) {
            return "single";
        }
        if (this.flowPreferences.get("inbox_visible")) {
            return "inbox";
        }
        return null;
    };
    FlowViewModel.prototype._lhs = function() {
        if (this.get("users")) {
            return "users";
        }
        if (this.get("narrow")) {
            if (this._single()) {
                return "single";
            }
            if (this.preferences.get("inbox_only")) {
                return "inbox";
            }
            return "chat";
        }
        if (this._single() && !this.get("single_view_in_inbox")) {
            return "single";
        }
        return "chat";
    };
    FlowViewModel.prototype._mustNavigateOnRhsToggle = function() {
        if (this.get("narrow")) {
            return this.get("users");
        }
        return this.get("rhs") === "single";
    };
    FlowViewModel.prototype._update = function() {
        return this.set({
            inbox: this._inboxVisible(),
            chat: this._chatVisible(),
            rhs: this._rhs(),
            lhs: this._lhs()
        });
    };
    FlowViewModel.prototype._single = function() {
        return this.get("thread") || this.get("single");
    };
    FlowViewModel.prototype._inboxVisible = function() {
        if (this.get("narrow")) {
            return !(!this.preferences.get("inbox_only") || this._single() || this.get("users"));
        }
        return this.flowPreferences.get("inbox_visible") && !(this.get("single_view_in_inbox") && this._single());
    };
    FlowViewModel.prototype._chatVisible = function() {
        if (this.get("narrow")) {
            return !(this.preferences.get("inbox_only") || this._single() || this.get("users"));
        }
        return !this.get("users") && (this.get("single_view_in_inbox") || !this._single());
    };
    FlowViewModel.prototype._narrow = function() {
        return !window.matchMedia("only screen and (min-width: 833px)").matches;
    };
    return FlowViewModel;
}(Backbone.Model);
