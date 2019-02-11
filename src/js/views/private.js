var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, o = function(e, t) {
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

Views.Private = function(t) {
    function Private() {
        this.error = r(this.error, this);
        return Private.__super__.constructor.apply(this, arguments);
    }
    o(Private, t);
    Private.prototype.className = "flow private";
    Private.prototype.events = _.extend({}, Views.Content.prototype.events, {
        "click #flow-overlay": "slideAsideOut"
    });
    Private.prototype.id = function() {
        return "private-" + this.model.id;
    };
    Private.prototype.template = require("../templates/flow.mustache");
    Private.prototype.initialize = function(e) {
        this.viewModel = e.viewModel;
        Private.__super__.initialize.apply(this, arguments);
        this.isPrivateSearchEnabled = Flowdock.app.features.F18656_search_1To1;
        this.chat = this.subview(new Views.Chat({
            fileUpload: true,
            model: this.model,
            tags: this.isPrivateSearchEnabled,
            inbox: false,
            expandable: false,
            settings: false,
            viewModel: this.viewModel
        }));
        this.toolbar = this.subview(new Views.Chat.PrivateToolbar({
            model: this.model,
            viewModel: this.viewModel
        }));
        this.inbox = this.subview(new Views.Inbox({
            model: this.model,
            viewModel: this.viewModel
        }));
        this.model.fullyLoaded.fail(this.error);
        this.listenTo(this.viewModel, "change", function() {
            return this.updatePanes();
        });
        this.listenTo(this.toolbar, "search:change", function(e) {
            this.onSearchChange(e);
            return this.viewModel.setSearch(e);
        });
        this.listenTo(this.inbox, "closePrivateSearch", function() {
            return this.toolbar.closePrivateSearch();
        });
        return this.untilEnd(this.attachedProperty("after", "before").and(Flowdock.appFocus).filter(function(e) {
            return e;
        })).onValue(function(e) {
            return function() {
                return e.model.unreadMessages.clearUnread("chat");
            };
        }(this));
    };
    Private.prototype.render = function() {
        if (this.errorState) {
            return undefined;
        }
        this.$el.empty().append(Helpers.renderTemplate(this.template)());
        this.$el.append(this.toolbar.render().$el, this.chat.render().$el, $("<div id='flow-overlay'>"), $("<div class='flow-notifications'></div>"));
        this.updatePanes();
        return this;
    };
    Private.prototype.toggleAndDetach = function(e, t) {
        var n;
        this.$el.find("." + t).toggle(!!this.viewModel.get(e));
        n = this.currentViewInPanel(this.$el.find("." + t));
        if (this.viewModel.get(e) === null && n != null) {
            return n.detach();
        }
        return;
    };
    Private.prototype.currentViewInPanel = function(e) {
        return _.find(this.subviews, function(t) {
            return t.$el.parent().is(e);
        });
    };
    Private.prototype.updatePanes = function() {
        this.paneled("inbox", this.inbox, "inbox-panel");
        this.paneled("chat", this.chat, "chat-panel");
        this.paneled("single", this.getSingle(), "single-panel");
        this.toggleAndDetach("lhs", "left-panel");
        return this.toggleAndDetach("rhs", "right-panel");
    };
    Private.prototype.error = function(e) {
        var t, n;
        t = function() {
            switch (e) {
              case "private-not-found":
                return Views.Errors.PrivateNotFound;

              case "private-subscribe-failed":
                return Views.Errors.PrivateSubscribeFailed;

              default:
                return Views.Errors.Error;
            }
        }();
        this.errorState = true;
        this.$el.children().hide();
        n = new t({
            model: this
        });
        return this.$el.append(n.render().$el);
    };
    Private.prototype.destructor = function() {
        Private.__super__.destructor.apply(this, arguments);
        return this.chat = this.toolbar = null;
    };
    Private.prototype.findMessage = function() {
        return this.chat.findLastMessage();
    };
    Private.prototype.onSearchChange = function(e) {
        if (this.errorState) {
            return undefined;
        }
        this.inbox.onSearchChange(e);
        return this.toolbar.onSearchChange(e);
    };
    Private.prototype.getSingle = function() {
        var e;
        if (!this.errorState) {
            if (this.viewModel.get("lhs") !== "single" && this.viewModel.get("rhs") !== "single") {
                return this.single;
            }
            e = this.viewModel.get("thread");
            if (e) {
                return this.getThread(e);
            }
            return null;
        }
    };
    Private.prototype.paneled = function(e, t, n) {
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
    Private.prototype.renderInPanel = function(e, t, n) {
        var r;
        if (!(t.$el.children().length > 0)) {
            t.render()
        };
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
    Private.prototype.preserveScrolling = function(e) {
        return this.chat.messageList.preserveScrolling({}, function(t) {
            return function() {
                return t.inbox.messageList.preserveScrolling({}, e);
            };
        }(this));
    };
    return Private;
}(Views.Content);
