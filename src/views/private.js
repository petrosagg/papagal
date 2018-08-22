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

Views.Private = function(e) {
    function Private() {
        this.error = r(this.error, this);
        return Private.__super__.constructor.apply(this, arguments);
    }
    o(Private, e);
    Private.prototype.className = "flow private";
    Private.prototype.events = _.extend({}, Views.Content.prototype.events, {
        "click #flow-overlay": "slideAsideOut"
    });
    Private.prototype.id = function() {
        return "private-" + this.model.id;
    };
    Private.prototype.updatePanes = function() {};
    Private.prototype.initialize = function(e) {
        this.viewModel = e.viewModel;
        Private.__super__.initialize.apply(this, arguments);
        this.chat = this.subview(new Views.Chat({
            fileUpload: !0,
            model: this.model,
            tags: !1,
            inbox: !1,
            expandable: !1,
            settings: !1,
            viewModel: this.viewModel
        }));
        this.toolbar = this.subview(new Views.Chat.PrivateToolbar({
            model: this.model
        }));
        this.model.fullyLoaded.fail(this.error);
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
            return void 0;
        }
        this.$el.append(this.toolbar.render().$el, this.chat.render().$el, $("<div id='flow-overlay'>"));
        return this;
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
        this.errorState = !0;
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
    Private.prototype.preserveScrolling = function(e) {
        return this.chat.messageList.preserveScrolling({}, e);
    };
    return Private;
}(Views.Content);
