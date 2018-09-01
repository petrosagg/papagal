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

r = React.createFactory(require("components/chat/avatar"));

o = React.createFactory(require("components/chat/bubble"));

Views.Chat.Message = function(t) {
    function Message() {
        return Message.__super__.constructor.apply(this, arguments);
    }
    i(Message, t);
    Message.prototype.tagName = "li";
    Message.prototype.className = "chat-message";
    Message.prototype.events = function() {
        return _.defaults({
            "click .edit-tags": "openTagInput",
            "click .delete": "delete",
            "click .edit-message": "openEditor",
            "click .save-message": "saveMessage",
            "blur .expanding-input textarea": "saveMessage",
            "keydown .expanding-input textarea": "saveMessage",
            "click [data-user]": "toggleUserCard",
            "change:id": "updateParent",
            "click .resend": "resendMessage",
            "click .rethread-message": "rethreadMessage",
            dragstart: "onDragStart",
            dragend: "onDragEnd"
        }, Message.__super__.events.apply(this, arguments));
    };
    Message.prototype.initialize = function(e) {
        var t, r;
        r = e.inbox;
        t = e.inCommentList;
        this.viewModel = e.viewModel;
        Message.__super__.initialize.apply(this, arguments);
        if (r === false) {
            this.disableInbox = true
        };
        this.inCommentList = t || false;
        this.listenTo(this.model.user(), "change:nick change:avatar", this.updateUser);
        this.listenTo(this.model, "change", this._renderThreadComponents);
        if (this.viewModel) {
            return this.listenTo(this.viewModel, "change:selected_message", this._updateSelectedMessage);
        }
        return;
    };
    Message.prototype.threadId = function() {
        return this.model.parent() || this.model.get("thread_id") || this.model.id;
    };
    Message.prototype.renderTags = function() {
        if (this.disableTagRendering) {
            return undefined;
        }
        Message.__super__.renderTags.apply(this, arguments);
        return this._setParent(this.threadId());
    };
    Message.prototype.onTagChange = function(e, t, r) {
        var o;
        if (r == null) {
            r = {}
        };
        Message.__super__.onTagChange.apply(this, arguments);
        if (r.user && r.user !== this.model.flow().me().id) {
            o = this.model.flow().users.get(r.user);
            return this.flashMessage(Helpers.TagHelper.textualizeChange(e, e.previousTags(), o));
        }
        return;
    };
    Message.prototype.onThreadChange = function() {
        Message.__super__.onThreadChange.apply(this, arguments);
        if (this.model.isThread()) {
            this._updateSelectedMessage();
            return this._setParent(this.model.threadId());
        }
        return;
    };
    Message.prototype.onSent = function() {
        Message.__super__.onSent.apply(this, arguments);
        return this._setParent(this.threadId());
    };
    Message.prototype._setParent = function(e) {
        this.$el.attr("data-parent", e);
        this.$el.data("parent", e);
        return this.$("a.timestamp-link").attr("href", Helpers.absoluteUrlFor({
            flow: this.model.flow(),
            message: this.model
        }));
    };
    Message.prototype._link = function() {
        var e;
        if (this.isPrivateMessage()) {
            return undefined;
        }
        e = {
            flow: this.model.flow()
        };
        if (this.model.isThread()) {
            e.thread = this.model.threadId()
        };
        this.model.isThread() || (e.message = this.model.threadId());
        return Helpers.urlFor(e);
    };
    Message.prototype.render = function() {
        var e;
        this.destroyComponents();
        e = Message.__super__.render.apply(this, arguments);
        this._renderThreadComponents();
        this.truncateWrap(".content");
        return e;
    };
    Message.prototype._renderThreadComponents = function() {
        var e, t;
        this.$el.toggleClass("not-rethreadable", !this.model.isRethreadable());
        e = this.$(".bubble-container")[0];
        if (e) {
            t = {
                color: this.model.isInConversation() && this.model.threadColor(),
                isInformational: this.model.isInformational(),
                isThreadStarter: this.model.isThreadStarter(),
                onClick: this.openSingleView.bind(this),
                title: this.model.replyTitle()
            };
            this.inCommentList || (t.link = this._link());
            this.component(e, o(t));
            return this.component(this.$(".avatar-container")[0], r({
                alt: this.author().name,
                src: this.author().avatar || Flowdock.icons.defaultAvatar
            }));
        }
        return;
    };
    Message.prototype.renderContent = function() {
        var t, n, r, o, i, s;
        i = this.model.presenter();
        s = this.model.user();
        t = i.body();
        r = this.model.get("edited");
        o = r != null && (t != null ? t.length : undefined) === 0;
        n = Helpers.TimeHelper.editTime(r, o);
        this.$el.html(Helpers.renderTemplate(require("../../templates/messages/message.mustache"))({
            content: t,
            editable: this.model.myMessage() && this.model.editable(),
            editTime: n,
            emptied: o,
            noLeftSideMessageComponents: this.isPrivateMessage(),
            private: this.isPrivateMessage(),
            rethreadable: this.model.isRethreadable(),
            sendableToRally: this.model.sendableToRally(),
            tags: this.disableTagRendering ? undefined : this.model.humanTags(),
            timestamp: this.messageTimestamp(),
            user: s.toJSON(),
            withoutNick: !s.has("nick")
        }, {
            messageHeader: require("../../templates/chat/message_header.mustache"),
            messageFooter: require("../../templates/shared/message_footer.mustache")
        }));
        this._updateSelectedMessage();
        this.$el.toggleClass("deleted", o);
        this.toggleClasses();
        return this.$(".content a.embeddable").filter(function() {
            return $(this).parent()[0].nodeName !== "CODE";
        }).each(function(e) {
            return function(t, n) {
                return e.preview($(n));
            };
        }(this));
    };
    Message.prototype.toggleClasses = function() {
        var e;
        e = this.model.user();
        this.$el.toggleClass("external", e.external());
        return this.$el.toggleClass("me", this.model.myMessage());
    };
    Message.prototype.preview = function(e) {
        var t, n, r;
        r = e.prop("href");
        t = Views.Embed.match(r);
        if (t != null) {
            n = e.wrap('<div class="embed">').parent();
            return this.subview(new t({
                url: r,
                el: n,
                parent: this,
                message: this.model
            }).render());
        }
        return;
    };
    Message.prototype.flashMessage = function(e) {
        var t, n;
        if (e) {
            n = this.$el.find(".timestamp");
            t = $("<span>").addClass("message-edit-message").text(e);
            if (this.inCommentList) {
                n.append(t);
            } else {
                n.prepend(t);
            }
            return setTimeout(function() {
                return t.remove();
            }, 1e3);
        }
    };
    Message.prototype.destructor = function() {
        Message.__super__.destructor.apply(this, arguments);
        jQuery.removeData(this.$el);
        clearTimeout(this.tId);
        clearInterval(this.ellipsisAnimation);
        if (this.viewModel != null) {
            return this.viewModel = null;
        }
        return;
    };
    Message.prototype.openSingleView = function(e) {
        var t, n;
        if (!e.metaKey && !e.ctrlKey && (e.preventDefault(), !this.disableInbox && this.model.get("id"))) {
            if (this.$el.is(".selected-message")) {
                Flowdock.app.router.navigateToFlow(this.model.flow(), {
                    message: null,
                    thread: null
                });
            } else {
                if (this.model.get("thread_id")) {
                    Flowdock.app.router.navigateToFlow(this.model.flow(), {
                        thread: this.model.threadId()
                    });
                    if ((t = Flowdock.app.manager.currentView) != null) {
                        t.jumpTo(this.model.id)
                    };
                } else {
                    Flowdock.app.router.navigateToFlow(this.model.flow(), {
                        message: this.model.threadId()
                    });
                    if ((n = Flowdock.app.manager.currentView) != null) {
                        n.jumpTo(this.model.id)
                    };
                }
            }
            return $(".message-form .message-input").focus();
        }
    };
    Message.prototype._updateSelectedMessage = function() {
        if (this.viewModel) {
            return this.$el.toggleClass("selected-message", "" + this.viewModel.get("selected_message") == "" + this.model.threadId());
        }
        return;
    };
    Message.prototype.updateUser = function() {
        var e;
        e = this.model.user();
        this.$(".message-author").text(e.get("nick"));
        return this.$(".avatar").css({
            "background-image": "url('" + e.avatar(80) + "')"
        });
    };
    Message.prototype.onDragStart = function(t) {
        var n, r, o;
        n = this.$el;
        this.$el.addClass("dragging");
        if (typeof (r = t.originalEvent.dataTransfer).setDragImage == "function") {
            r.setDragImage(this.el, 10, 10)
        };
        t.originalEvent.dataTransfer.setData("Text", "" + this.model.id);
        o = require(this.model.isRethreadable() ? "../../templates/chat/drag/enabled.mustache" : "../../templates/chat/drag/disabled.mustache");
        return _.defer(function() {
            return n.append(Helpers.renderTemplate(o)());
        });
    };
    Message.prototype.onDragEnd = function() {
        var e;
        e = this.$(".instructions-overlay");
        this.$el.removeClass("dragging");
        return e.addClass("out").one(Helpers.animationend(), function() {
            return e.remove();
        });
    };
    return Message;
}(Views.Shared.Message);
