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
}, i = {}.hasOwnProperty, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = require("./shared/file_uploader");

Views.Chat = function(e) {
    function Chat() {
        return Chat.__super__.constructor.apply(this, arguments);
    }
    o(Chat, e);
    Chat.prototype.id = "chat";
    Chat.prototype.events = {
        "click .jump-to-current": "jumpToCurrent"
    };
    Chat.prototype.keyboardEvents = {
        toggleSingleView: "jumpLastOpenThread"
    };
    Chat.prototype.initialize = function(e) {
        this.bindKeyboardEvents();
        this.options = _.extend({
            placeholder: this.buildInputPlaceholder()
        }, e);
        this.viewModel = e.viewModel;
        this.input = this.subview(new Views.Chat.Input(this.options));
        this.$indicators = $("<div>").addClass("indicators");
        this.messageList = this.buildMessageList(this.model, this.options);
        this.typing = this.subview(new Views.Shared.TypingUsers({
            users: this.model.typingUsers(this.input.key())
        }));
        this.lastReadMarker = new Flowdock.LastReadMarker({
            name: "chat",
            listDirection: "down",
            messageList: this.messageList,
            jumpIndicator: function(e) {
                return function(t) {
                    return e.$el.append(t);
                };
            }(this),
            jumpToMessage: function(e) {
                return function(t) {
                    return e.jumpToMessage(t);
                };
            }(this)
        });
        this.listenTo(this.input.textarea, "scale", function() {
            this.messageList.resize(this.input.$el.outerHeight());
            return this.$indicators.css("bottom", this.input.$el.outerHeight());
        });
        this.listenTo(this.input.textarea, "input", function() {
            return this.messageList.setScrollLocation();
        });
        this.listenTo(this.input, "edit-last-message", this.editLastMessage);
        if (this.options.fileUpload) {
            return this.fileupload = this.buildFileupload(this.input);
        }
        return;
    };
    Chat.prototype.findMessage = function(e) {
        return this.messageList.collection.get(e);
    };
    Chat.prototype.findLastMessage = function() {
        return this.messageList.collection.last();
    };
    Chat.prototype.resize = function() {
        this.messageList.resize();
        return this.input.triggerAttach();
    };
    Chat.prototype.render = function() {
        var e;
        this.$el.empty().append(this.messageList.render().$el, this.$indicators, this.input.render().$el, (e = this.fileupload) != null ? e.render().$el : void 0);
        this.$indicators.append(this.typing.render().el);
        return this;
    };
    Chat.prototype.destructor = function() {
        this.messageList.collection.cleanup();
        this.lastReadMarker.cleanup();
        Chat.__super__.destructor.apply(this, arguments);
        return this.input = this.messageList = this.fileupload = this.lastReadMarker = this.$indicators = this.typing = null;
    };
    Chat.prototype.buildFileupload = function(e) {
        var t;
        t = this.subview(new r({
            model: this.model,
            target: this.$el,
            targetName: this.model.get("name")
        }));
        this.listenTo(t, "new_upload", function(e) {
            return this.messageList.collection.add(e);
        });
        this.listenTo(e, "upload", function() {
            return t.prompt();
        });
        return t;
    };
    Chat.prototype.buildInputPlaceholder = function() {
        if (this.model.isFlow()) {
            return "Type to start a new thread...";
        }
        return "Type to chat with " + this.model.get("name").replace("@", "") + "…";
    };
    Chat.prototype.buildMessageList = function(e, t) {
        var n;
        n = this.subview(Views.Chat.MessageList.build(e, t));
        this.listenTo(n, "indication", function(e) {
            return this.$indicators.prepend(e);
        });
        e.fullyLoaded.done(function() {
            return n.renderMessages();
        });
        return n;
    };
    Chat.prototype.swapMessageList = function(e) {
        this.messageList.collection.cleanup();
        if ($.contains($("body")[0], this.el)) {
            this.messageList.triggerDetach()
        };
        this.removeSubview(this.messageList);
        this.messageList = e;
        this.$el.prepend(this.messageList.render().$el);
        this.lastReadMarker.setupMessageList(this.messageList);
        if ($.contains($("body")[0], this.el)) {
            this.messageList.triggerAttach()
        };
        return this.input.triggerAttach();
    };
    Chat.prototype.editLastMessage = function(e, t) {
        var n, r;
        if (n = this.messageList.lastMessageOf(this.model.me())) {
            r = n.asProperty("id").filter(function(e) {
                return e != null;
            }).take(1);
            if (0 !== arguments.length) {
                return r.onValue(function() {
                    return n.searchReplaceContent(e, t);
                });
            }
            if (s.call(this.messageList.collection.slice(-10), n) >= 0) {
                return r.onValue(function(e) {
                    return function() {
                        var t;
                        if (t = _.last(e.messageList.findSubviews(n))) {
                            t.openEditor();
                            return t.once("completed", function() {
                                return _.defer(function() {
                                    return e.input.focus();
                                });
                            });
                        }
                        return;
                    };
                }(this));
            }
            return;
        }
        return;
    };
    Chat.prototype.jumpToMessage = function(e) {
        if (this.messageList.hasMessage(e)) {
            return this.messageList.jumpToMessage(e);
        }
        return this.swapMessageList(this.buildMessageList(this.model, _.extend({
            startAt: e
        }, this.options)));
    };
    Chat.prototype.jumpToCurrent = function() {
        return this.swapMessageList(this.buildMessageList(this.model, this.options));
    };
    Chat.prototype.jumpLastOpenThread = function() {
        return this.trigger("jump-last-open-thread");
    };
    Chat.prototype.focusInput = function() {
        return this.input.focus();
    };
    return Chat;
}(Flowdock.HierarchicalView);

_.extend(Views.Chat.prototype, Flowdock.KeyboardEvents);