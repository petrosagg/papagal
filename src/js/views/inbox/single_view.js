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
}, i = {}.hasOwnProperty, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Views.Inbox.SingleView = function(t) {
    function SingleView() {
        this.floatTitleProperty = r(this.floatTitleProperty, this);
        this.titleBody = r(this.titleBody, this);
        return SingleView.__super__.constructor.apply(this, arguments);
    }
    var i, a, u;
    o(SingleView, t);
    i = 10;
    u = 60;
    a = 150;
    SingleView.prototype.id = "single";
    SingleView.prototype.className = "touch-scrollable";
    SingleView.prototype.events = {
        "click .message-form textarea": "scrollToBottom",
        "keypress .message-form textarea": "onCommentKeypress",
        "click menu .delete": "delete",
        "click menu .context": "showContext"
    };
    SingleView.prototype.modelEvents = {
        destroy: "onDestroy",
        "change:thread_id": "indicateThreadMove"
    };
    SingleView.prototype.keyboardEvents = {
        returnFocusToThread: "focusCommentInput",
        focusChat: "focusCommentInput"
    };
    SingleView.prototype.indicateThreadMove = function(e) {
        var t, n;
        t = Flowdock.app.flows.get(e.get("flow"));
        n = e.get("thread_id");
        return _.defer(function() {
            var r;
            Flowdock.app.router.navigateToFlow(t, {
                thread: n
            });
            if ((r = Flowdock.app.manager.currentView) != null) {
                return r.jumpTo(e.id);
            }
            return;
        });
    };
    SingleView.prototype.initialize = function(e) {
        var t;
        t = e.flow;
        this.viewModel = e.viewModel;
        this.bindKeyboardEvents();
        this.state = {
            scrollLocation: 0,
            jump: null
        };
        this.$indicators = $("<div>").addClass("indicators");
        this.dirty = false;
        this.staticHeader = this.subview(new Views.Inbox.Header({
            message: this.model,
            titleBody: this.titleBody
        }));
        this.floatingHeader = this.subview(new Views.Inbox.Header({
            message: this.model,
            titleBody: this.titleBody,
            belowTitleProperty: this.floatTitleProperty,
            fullyLoaded: this.model.flow().fullyLoaded
        }));
        this.floatingCloseButton = this.subview(new Views.Shared.Close());
        this.listenTo(this.staticHeader, "return-to-list", this.returnToList);
        this.listenTo(this.floatingHeader, "return-to-list", this.returnToList);
        this.listenTo(this.floatingCloseButton, "close", this.returnToList);
        this.listenTo(this, "view:attach:before", function() {
            return this.scrollLocation(this.state.scrollLocation || 0);
        });
        return this.listenTo(this, "view:detach:before", function() {
            return this.setScrollLocation();
        });
    };
    SingleView.prototype.renderHeaders = function() {
        this.staticHeader.setElement(this.$(".static-header")).render();
        this.staticHeader.triggerAttach();
        this.floatingHeader.setElement(this.$(".floating-header")).render();
        this.floatingHeader.triggerAttach();
        return this.staticHeader.setCloseButton(this.$(".thread-close-button"));
    };
    SingleView.prototype.renderComments = function() {
        this.commentList = this.setupCommentList();
        return this.$(".single-view-body").append(this.commentList.render().$el);
    };
    SingleView.prototype.renderCommentForm = function(e) {
        this.commentForm = this.setupCommentForm(e);
        this.listenTo(this.commentForm, "after:render", this.positionCommentForm);
        this.typing = this.setupTyping();
        this.$el.append(this.commentForm.render().$el);
        this.$indicators.append(this.typing.render().$el);
        this.commentForm.triggerAttach();
        return this.positionCommentForm();
    };
    SingleView.prototype.renderFileUpload = function() {
        this.$el.append(this.fileUpload.render().$el);
        return this.fileUpload.triggerAttach();
    };
    SingleView.prototype.renderContent = function() {
        return this.untilEnd(Bacon.fromPromise(this.model.flow().fullyLoaded)).onValue(function(e) {
            return function() {
                var t, n, r, o;
                try {
                    o = typeof (t = e.model).presenter == "function" ? t.presenter() : undefined;
                    if (!o) {
                        throw new Error("No presenter found");
                    }
                    e.fileUpload = e.setupFileUpload();
                    e.message = e.subview(new Views.Inbox.SingleViewMessage({
                        model: e.model
                    }));
                    e.$(".loader").remove();
                    e.renderHeaders();
                    e.$(".single-view-body").append(e.message.render().$el);
                    e.renderFileUpload();
                    e.$el.append(e.$indicators);
                    if ("message" !== e.model.get("event")) {
                        e.$el.addClass(e.model.get("event"))
                    };
                    e.renderComments();
                    if (e.model.commentable()) {
                        e.renderCommentForm(e.fileUpload)
                    };
                    e.addStream($(window).asEventStream("resize").filter(!Modernizr.touchevents).merge($(window).asEventStream("orientationchange")).debounce(0).onValue(function(t) {
                        return e.positionCommentForm();
                    }));
                    e.whenAttached(function() {
                        this.hideTipsWhenScrollable();
                        if (this.model.comments.length > 0) {
                            this.restoreScrollPosition();
                            return this.positionCommentForm();
                        }
                        return;
                    });
                    return _.defer(function() {
                        var t;
                        if ((t = e.model) != null) {
                            return t.markAsRead(Flowdock.app.user);
                        }
                        return;
                    });
                } catch (i) {
                    return n = i, r = {
                        content: "Sorry, this message could not be rendered"
                    }, e.model = e.buildErrorMessage(r, e.model, n), e.renderError({
                        report: !0
                    });
                }
            };
        }(this));
    };
    SingleView.prototype.renderError = function(e) {
        var t;
        if (e == null) {
            e = {}
        };
        t = _.extend(e, {
            app: "inbox",
            model: this.model,
            error: this.model.get("error")
        });
        this.$el.html(this.subview(new Views.Inbox.SingleViewError(t)).render().el);
        this.$(".loader").remove();
        this.renderHeaders();
        return this.renderComments();
    };
    SingleView.prototype.buildErrorMessage = function(e, t, n) {
        var r, o;
        if (n) {
            try {
                throw n;
            } catch (i) {
                r = i, console.log("Error was caused by", t.get("event"), t, "function" == typeof t.presenter ? t.presenter() : void 0), 
                console.error(r, r.message, r.stack), n = r;
            }
        }
        o = new Models.ErrorMessage(_.extend({}, t.attributes, e, {
            event: "error-message",
            error: n,
            originalModel: t
        }));
        o.comments = t.comments;
        return o;
    };
    SingleView.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/inbox/single_view.mustache"))({}, {
            spinner: require("../../templates/spinner.mustache")
        }));
        if (this.model.get("sent")) {
            if (this.model.get("thread_id")) {
                this.indicateThreadMove(this.model);
            } else {
                this.renderContent();
            }
        } else {
            this.model.fetch({
                error: function(e) {
                    return function(t, n) {
                        if (n.status === 404) {
                            e.model = e.buildErrorMessage({
                                content: "The message you are looking for does not exist or may have been deleted."
                            }, t);
                            return e.renderError({
                                report: false,
                                actions: false
                            });
                        }
                        console.error("An unexpected error occurred.", t);
                        e.model = e.buildErrorMessage({
                            content: "An unexpected error occurred."
                        }, t);
                        return e.renderError({
                            report: true,
                            actions: false
                        });
                    };
                }(this),
                success: function(e) {
                    return function() {
                        var t;
                        if (e.model.get("thread_id")) {
                            return e.indicateThreadMove(e.model);
                        }
                        if (t = e.model.parent()) {
                            e.setDirty();
                            return Flowdock.app.router.navigateToFlow(e.model.flow(), {
                                message: t
                            });
                        }
                        if (e.model.get("sent")) {
                            return e.renderContent();
                        }
                        return;
                    };
                }(this)
            });
        }
        return this;
    };
    SingleView.prototype.setDirty = function() {
        return this.dirty = true;
    };
    SingleView.prototype.hideTipsWhenScrollable = function() {
        return this.$(".comment-list-footer").toggle(!this.scrollable());
    };
    SingleView.prototype.setupFileUpload = function() {
        var e;
        e = this.subview(new Views.Inbox.FileUploader({
            model: this.model.flow(),
            parent: this.model,
            target: this.$el,
            targetName: "this thread"
        }));
        this.listenTo(e, "new_upload", this.onUpload);
        return e;
    };
    SingleView.prototype.setupCommentForm = function(e) {
        var t;
        t = this.subview(new Views.Inbox.CommentForm({
            model: this.model
        }));
        this.listenTo(t, "upload", function() {
            return e.prompt();
        });
        this.listenTo(t, "edit-last-message", this.editLastMessage);
        this.listenTo(t, "back", function() {
            return this.returnToList();
        });
        this.listenTo(t.textarea, "scale", this.onCommentFormResize);
        return t;
    };
    SingleView.prototype.setupTyping = function() {
        var e, t;
        t = this.model.flow().typingUsers(this.commentForm.key());
        return e = this.subview(new Views.Shared.TypingUsers({
            users: t
        }));
    };
    SingleView.prototype.setupCommentList = function() {
        var e;
        e = this.subview(new Views.Inbox.CommentList({
            model: this.model,
            collection: this.model.comments
        }));
        this.listenTo(e, "commentRendered", this.onCommentRendered);
        this.listenTo(e, "addHistory", this.onAddHistory);
        this.listenTo(e, "commentRendered addHistory", this.updateThreadColor);
        return e;
    };
    SingleView.prototype.titleBody = function() {
        var t, n;
        n = this.model.presenter();
        t = this.model.isDeleted() ? Helpers.TimeHelper.editTime(this.model.get("edited"), true) : false;
        return Helpers.renderTemplate(require("../../templates/inbox/item_headline.mustache"))({
            icon: n != null ? n.icon() : undefined,
            action: Helpers.capitalizeFirst(n != null && typeof n.action == "function" ? n.action() : undefined),
            htmlHeadline: n != null && typeof n.singleViewHtmlHeadline == "function" ? n.singleViewHtmlHeadline() : undefined,
            headline: n != null ? n.headline() : undefined,
            headlineLink: n != null && typeof n.link == "function" ? n.link() : undefined,
            emptiedAt: t
        });
    };
    SingleView.prototype.floatTitleProperty = function() {
        return this.untilEnd(this.$(".single-view-content").asEventStream("scroll")).map(function(e) {
            return function() {
                var t;
                t = e.staticHeader.$el.outerHeight();
                return e.scrollLocation() > t - u;
            };
        }(this)).skipDuplicates().toProperty(false);
    };
    SingleView.prototype.scrollLocation = function(e) {
        var t;
        t = this.$(".single-view-content");
        if (e != null) {
            t.scrollTop(e)
        };
        return t.scrollTop();
    };
    SingleView.prototype.scrollToMessage = function(e) {
        this.state.jump = e;
        return this.whenAttached(function() {
            return this.restoreScrollPosition();
        });
    };
    SingleView.prototype.setScrollLocation = function() {
        if ($.contains($("body")[0], this.el)) {
            return this.state.scrollLocation = this.scrollLocation();
        }
        return;
    };
    SingleView.prototype.onAttach = function() {
        this.commentKeypress = false;
        return _.defer(function(e) {
            return function() {
                var t;
                if ((t = e.commentForm) != null) {
                    return t.focus();
                }
                return;
            };
        }(this));
    };
    SingleView.prototype.positionCommentForm = function() {
        var e, t, n;
        if (this.commentForm) {
            e = (t = this.commentForm) != null ? t.focused() : undefined;
            this.onCommentFormResize();
            if (e && (n = this.commentForm) != null) {
                n.focus()
            };
            if (this.$el.parent().length) {
                return undefined;
            }
            return Bacon.noMore;
        }
    };
    SingleView.prototype.scrollable = function() {
        var e, t;
        e = this.$(".single-view-content-wrap");
        t = this.$(".single-view-content");
        return t.outerHeight() < e[0].scrollHeight - 1;
    };
    SingleView.prototype.onCommentRendered = function(e, t) {
        this.hideTipsWhenScrollable();
        if (this.state.jump && this.model.id !== this.state.jump) {
            return this.restoreScrollPosition();
        }
        if (this.atBottom(t != null ? t.outerHeight() : undefined) || e.get("user") === Flowdock.app.user.id) {
            return this.scrollToBottom(null, true);
        }
        return this._buildMoreMessagesIndicator();
    };
    SingleView.prototype.editLastMessage = function(e, t) {
        var n, r;
        n = this.commentList.lastMessageOf(Flowdock.app.user);
        n || this.model.get("user").toString() !== Flowdock.app.user.id.toString() || (n = this.model);
        if (n) {
            r = n.asProperty("id").filter(function(e) {
                return e != null;
            }).take(1);
            if (0 !== arguments.length) {
                return r.onValue(function() {
                    return n.searchReplaceContent(e, t);
                });
            }
            if (s.call(this.commentList.collection.slice(-10), n) >= 0 || n === this.model && this.commentList.collection.length < 10) {
                return r.onValue(function(e) {
                    return function() {
                        var t;
                        if (t = _.last(e.commentList.findSubviews(n))) {
                            t.openEditor();
                            return t.once("completed", function() {
                                return _.defer(function() {
                                    return e.commentForm.focus();
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
    SingleView.prototype.onAddHistory = function() {
        this.restoreScrollPosition();
        return this.whenAttached(function() {
            this.positionCommentForm();
            return this.hideTipsWhenScrollable();
        });
    };
    SingleView.prototype.atBottom = function(e) {
        var t, n, r, o, i;
        if (e == null) {
            e = 0
        };
        o = this.$(".single-view-content");
        i = 20;
        n = o[0].scrollHeight;
        r = o[0].scrollTop;
        t = o.outerHeight();
        return i > n - r - t - e;
    };
    SingleView.prototype.scrollToBottom = function(e, t) {
        if (t == null) {
            t = false
        };
        return this.scrollTo("bottom", t);
    };
    SingleView.prototype.scrollTop = function(e) {
        var t, n, r, o;
        if (e.offset()) {
            r = this.$(".single-view-content");
            o = ((t = this.collapsetTitle) != null && (n = t.$el) != null && typeof n.height == "function" ? n.height() : undefined) || 0;
            return r.scrollTop() - r.offset().top + e.offset().top - o;
        }
        return 0;
    };
    SingleView.prototype.scrollTo = function(e, t) {
        var n;
        if (t == null) {
            t = false
        };
        n = this.$el.find(".single-view-content");
        if (e === "bottom") {
            e = n[0].scrollHeight
        };
        if (e === "last-message") {
            e = this.scrollTop(n.find(".comment-list > li").last() - a)
        };
        if (t) {
            return n[0].scrollTop = e;
        }
        return n.animate({
            scrollTop: e
        }, 300);
    };
    SingleView.prototype.onCommentKeypress = function() {
        if (Modernizr.touchevents || this.commentKeyPress || (this.commentKeypress = true, 
        this.atBottom())) {
            return undefined;
        }
        return this.scrollToBottom();
    };
    SingleView.prototype.onCommentFormResize = function(e) {
        var t, n;
        if (e == null) {
            e = 0
        };
        t = this.atBottom(e);
        n = this.commentForm.$el.outerHeight();
        if (n > 0) {
            this.$(".single-view-content").css({
                bottom: n + "px"
            }), this.$indicators.css("bottom", n)
        };
        if (t) {
            return this.scrollToBottom(null, true);
        }
        return;
    };
    SingleView.prototype.onUpload = function(e) {
        this.commentForm.tagThread();
        return this.commentList.collection.add(e);
    };
    SingleView.prototype["delete"] = function() {
        if (Helpers.confirmDelete()) {
            return this.model.destroy({
                wait: true
            }).fail(function() {
                return _.defer(function() {
                    return alert("Failed deleting the message. Plase try again.");
                });
            });
        }
        return;
    };
    SingleView.prototype.destructor = function() {
        SingleView.__super__.destructor.apply(this, arguments);
        return this.commentForm = this.commentList = this.$indicators = this.staticHeader = this.floatingHeader = this.floatingCloseButton = this.typing = this.moreMessages = this.actions = null;
    };
    SingleView.prototype.showContext = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.show_in_chat_click);
        return this.trigger("show-context", this.model.id);
    };
    SingleView.prototype.focusCommentInput = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        return this.$("textarea").focus();
    };
    SingleView.prototype.returnToList = function() {
        return this.trigger("return-to-list");
    };
    SingleView.prototype.onDestroy = function() {
        this.model = new Models.InboxMessage({
            id: this.model.id,
            flow: this.model.flow()
        });
        this.commentList.off("commentRendered");
        this.render();
        return this.returnToList();
    };
    SingleView.prototype._buildMoreMessagesIndicator = function() {
        var e;
        if (this.moreMessages) {
            return void this.moreMessages.increment();
        }
        e = {
            direction: "below",
            scrollable: this.$(".single-view-content"),
            removeWhen: function(e) {
                return function() {
                    return e.atBottom();
                };
            }(this),
            onRemoved: function(e) {
                return function() {
                    e.scrollToBottom();
                    e.removeSubview(e.moreMessages);
                    return e.moreMessages = null;
                };
            }(this)
        };
        this.moreMessages = this.subview(new Views.Shared.MoreMessages(e));
        return this.$indicators.prepend(this.moreMessages.render().$el);
    };
    SingleView.prototype.updateThreadColor = function() {
        if (this.commentList.collection.length > 0) {
            return Helpers.CommentHelper.color(this.flow.id, this.model.threadId());
        }
        return;
    };
    SingleView.prototype.restoreScrollPosition = function() {
        var e, t, n;
        if (this.commentList) {
            t = this.state.jump;
            e = t === "last-message" ? this.$(".single-view-content").find(".comment-list > li").last() : t ? function() {
                var e, r, o, i, s;
                for (o = this.commentList.subviews, s = [], e = 0, r = o.length; r > e; e++) {
                    n = o[e];
                    if (String((i = n.model) != null ? i.id : undefined) === String(t)) {
                        s.push(n.$el)
                    };
                }
                return s;
            }.call(this)[0] : undefined;
            if (e) {
                this.state.jump = null;
                if ("last-message" !== t) {
                    this.commentList.jumpToMessage(Number(t))
                };
                return this.scrollTo(this.scrollTop(e) - a, true);
            }
            return;
        }
    };
    SingleView.prototype.flipSide = function() {
        var e, t;
        if ((e = this.actions) != null && (t = e.dropdown) != null) {
            t.close()
        };
        return Flowdock.app.preferences.flip("single_view_in_inbox");
    };
    return SingleView;
}(Flowdock.HierarchicalView);

_.extend(Views.Inbox.SingleView.prototype, Flowdock.KeyboardEvents);
