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
}, a = {}.hasOwnProperty, u = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

o = require("./truncate");

r = require("./thread/file_uploader");

Views.Thread = function(t) {
    function Thread() {
        this.scrollingBelowTitle = i(this.scrollingBelowTitle, this);
        this.titleBody = i(this.titleBody, this);
        return Thread.__super__.constructor.apply(this, arguments);
    }
    var a, l, c;
    s(Thread, t);
    l = 100;
    a = 4;
    c = 60;
    Thread.prototype.id = "thread";
    Thread.prototype.className = "touch-scrollable";
    Thread.prototype.template = require("../templates/threads/thread.mustache");
    Thread.prototype.events = {
        "click .empty-message, .help-message": "focusForm",
        "click menu .side-flip": "flipSide",
        "click menu .context": "showContext",
        "keypress .message-form textarea": "onCommentKeypress"
    };
    Thread.prototype.modelEvents = {
        change: "renderBody",
        "change:id": "renderId",
        "change:internal_comments": "closeIfEmpty"
    };
    Thread.prototype.keyboardEvents = {
        returnFocusToThread: "focusCommentInput",
        focusChat: "focusCommentInput"
    };
    Thread.prototype.closeIfEmpty = function() {
        var e;
        e = Flowdock.app.flows.get(this.model.get("flow"));
        if (this.model.commentCount() > 0) {
            return undefined;
        }
        return _.defer(function() {
            return Flowdock.app.router.navigateToFlow(e, {
                thread: null
            });
        });
    };
    Thread.prototype.initialize = function(e) {
        var t;
        t = e.flow;
        this.viewModel = e.viewModel;
        this.bindKeyboardEvents();
        this.state = {
            jump: null
        };
        this.staticHeader = this.subview(new Views.Thread.Header({
            message: this.model,
            titleBody: this.titleBody
        }));
        this.floatingHeader = this.subview(new Views.Thread.Header({
            message: this.model,
            titleBody: this.titleBody,
            belowTitleProperty: this.scrollingBelowTitle
        }));
        this.floatingCloseButton = this.subview(new Views.Shared.Close());
        this.commentForm = this.subview(new Views.Thread.CommentForm({
            model: this.model,
            fileUpload: true
        }));
        this.fileUpload = null;
        this.typing = this.subview(new Views.Shared.TypingUsers({
            users: this.model.flow().typingUsers(this.commentForm.key())
        }));
        this.$indicators = $("<div>").addClass("indicators");
        this.activityList = this.subview(new Views.Thread.ActivityList({
            collection: this.model.activities,
            viewport: function(e) {
                return function() {
                    return e.$(".thread-content");
                };
            }(this)
        }));
        this.flow.fullyLoaded.done(function(e) {
            return function() {
                return e.activityList.renderMessages();
            };
        }(this));
        this.listenTo(this.model.activities, "add remove historyComplete", this.updateTitleVisibility);
        this.listenTo(this.activityList, "add render", this.onListRender);
        this.listenTo(this.commentForm.textarea, "scale", this.onCommentFormResize);
        this.listenTo(this.commentForm, "after:render", this.onCommentFormResize);
        this.listenTo(this.commentForm, "edit-last-message", this.editLastMessage);
        this.listenTo(this.commentForm, "back", this.returnToList);
        this.listenTo(this.staticHeader, "return-to-list", this.returnToList);
        this.listenTo(this.floatingHeader, "return-to-list", this.returnToList);
        this.listenTo(this.floatingCloseButton, "close", this.returnToList);
        this.listenTo(this.activityList, "state", this.onStateChange);
        this.untilEnd(this.model.activities.asEventStream("sync")).flatMapLatest(this.model.activities.asEventStream("add")).filter(function(e) {
            return function() {
                return !e.atBottom();
            };
        }(this)).onValue(this, "_buildMoreMessagesIndicator");
        return this.untilEnd(this.model.activities.asEventStream("error", function(e, t) {
            return t;
        })).takeUntil(this.model.activities.asEventStream("sync")).onValue(this, "renderError");
    };
    Thread.prototype._setupFileUpload = function() {
        var e;
        e = this.subview(new r({
            model: this.flow,
            thread: this.model,
            target: this.$el,
            targetName: "this thread"
        }));
        this.listenTo(e, "new_upload", this._onUpload);
        this.listenTo(this.commentForm, "upload", e.prompt);
        return e;
    };
    Thread.prototype._onUpload = function(e) {
        return this.activityList.collection.add(e);
    };
    Thread.prototype.renderError = function(e) {
        this.dirty = true;
        this.$(".loader").remove();
        if (e.status === 404) {
            this.model.set("title", "Not found");
            this.$(".thread-body").text("This thread does not exist or has been deleted.");
        } else {
            this.model.set("title", "Internal Server Error");
            this.$(".thread-body").text("Could not fetch thread data.");
        }
        return this;
    };
    Thread.prototype._renderEmoji = function() {
        this._emojify(this.$(".thread-body"));
        return this._emojify(this.$(".updated-fields"));
    };
    Thread.prototype._emojify = function(e) {
        var t;
        if (e.length > 0) {
            typeof e.emojie == "function" && e.emojie(), (t = this.model.flow().emoji) != null && t.emojie(e[0])
        };
        return e;
    };
    Thread.prototype.render = function() {
        var t, n, r, o, i;
        r = this.model.activities.length === 0 ? this.untilEnd(this.model.activities.asEventStream("sync add").take(1)).map(false).toProperty(true) : Bacon.constant(false);
        n = r.combine(Bacon.fromPromise(this.flow.fullyLoaded), function(e, t) {
            return e || t;
        });
        i = require("../templates/spinner.mustache");
        o = require("../templates/threads/property_list.mustache");
        t = this._formatFields();
        this.$el.html(Helpers.renderTemplate(this.template)({
            body: this.model.get("body"),
            fields: t
        }, {
            spinner: i,
            propertyList: o
        }));
        if (t.length === 0) {
            this.$(".updated-fields").hide();
        } else {
            if (t.length > a) {
                this.truncatedContent && this.removeSubview(this.truncatedContent), this.truncateFields()
            };
        }
        this.staticHeader.setElement(this.$(".static-header")).render();
        this.floatingHeader.setElement(this.$(".floating-header")).render();
        this.staticHeader.setCloseButton(this.$(".thread-close-button"));
        n.filter(function(e) {
            return !e;
        }).onValue(this, "onLoad");
        this.$el.append(this.$indicators);
        this.$indicators.append(this.typing.render().$el);
        if (this.model.activities.length > 0) {
            this.renderFooter();
        } else {
            n.filter(function(e) {
                return !e;
            }).onValue(this, "renderFooter");
        }
        this.whenAttached(function() {
            this.onListRender();
            return this.onCommentFormResize();
        });
        this._renderEmoji();
        this._parseTimeTags();
        this.updateTitleVisibility();
        return this;
    };
    Thread.prototype.updateTitleVisibility = function() {
        var e;
        if (this.model.activities.historyComplete.backward && (e = this.model.activities.first())) {
            return this.$(".static-header").toggleClass("static-header-short", e.get("excerpt_title") != null);
        }
        return;
    };
    Thread.prototype.onLoad = function() {
        this._renderActivities();
        this.fileUpload = this._setupFileUpload();
        return this._renderCommentForm();
    };
    Thread.prototype._renderActivities = function() {
        this.$(".loader").hide();
        this.$(".thread-activities").replaceWith(this.activityList.$el);
        return this.activityList.render();
    };
    Thread.prototype._renderCommentForm = function() {
        this.$el.append(this.commentForm.render().$el);
        this.$el.append(this.fileUpload.render().$el);
        this.commentForm.triggerAttach();
        return this.fileUpload.triggerAttach();
    };
    Thread.prototype.scrollable = function() {
        var e, t;
        e = this.$(".thread-content-wrap");
        t = this.$(".thread-content");
        return t.outerHeight() < e[0].scrollHeight - 1;
    };
    Thread.prototype.renderFooter = function() {
        var t, n;
        this.onListRender();
        if (this.scrollable()) {
            return undefined;
        }
        if (this.model.hasContinuation()) {
            n = require("../templates/inbox/comment_list_default.mustache");
            return this.$(".thread-footer").append(n.render({
                tip: Helpers.singleViewTip()
            }));
        }
        t = require("../templates/inbox/comment_list_empty.mustache");
        return this.$(".thread-footer").append(t.render());
    };
    Thread.prototype.atBottom = function(e) {
        var t, n, r, o, i;
        if (e == null) {
            e = 0
        };
        o = this.$(".thread-content");
        i = 20;
        n = o[0].scrollHeight;
        r = o[0].scrollTop;
        t = o.outerHeight();
        return i > n - r - t - e;
    };
    Thread.prototype.restoreScrollPosition = function() {
        var e, t, n;
        t = this.state.jump;
        e = t === "last-message" ? this.$(".thread-content").find(".thread-activities > li").last() : t ? function() {
            var e, r, o, i, s;
            for (o = this.activityList.subviews, s = [], e = 0, r = o.length; r > e; e++) {
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
                return this.activityList.jumpToMessage(Number(t));
            }
            return this.scrollTo(this.scrollTop(e) - l, true);
        }
        return;
    };
    Thread.prototype.scrollToMessage = function(e) {
        this.state.jump = e;
        return this.whenAttached(function() {
            return this.restoreScrollPosition();
        });
    };
    Thread.prototype.scrollToBottom = function(e, t) {
        if (t == null) {
            t = false
        };
        return this.scrollTo("bottom", t);
    };
    Thread.prototype.scrollTop = function(e) {
        var t;
        if (e) {
            t = this.$(".thread-content");
            return t.scrollTop() - t.offset().top + e.offset().top - this.floatingHeader.$el.outerHeight();
        }
        return 0;
    };
    Thread.prototype.scrollTo = function(e, t) {
        var n, r;
        if (t == null) {
            t = false
        };
        n = this.$el.find(".thread-content");
        r = this.$el.find(".thread-content-wrap");
        if (e === "bottom") {
            e = r[0].scrollHeight
        };
        if (t) {
            return n[0].scrollTop = e;
        }
        return n.animate({
            scrollTop: e
        }, 300);
    };
    Thread.prototype.onCommentFormResize = function(e) {
        var t, n;
        if (e == null) {
            e = 0
        };
        t = this.atBottom(e);
        n = this.commentForm.$el.outerHeight();
        if (n > 0) {
            this.$(".thread-content").css({
                bottom: n + "px"
            }), this.$indicators.css("bottom", n)
        };
        if (t) {
            return this.scrollToBottom(null, true);
        }
        return;
    };
    Thread.prototype.hideTipsWhenScrollable = function() {
        return this.$(".thread-footer").toggle(!this.scrollable());
    };
    Thread.prototype.onListRender = function() {
        return this.whenAttached(function() {
            this.hideTipsWhenScrollable();
            return this.restoreScrollPosition();
        });
    };
    Thread.prototype.titleBody = function() {
        return Helpers.renderTemplate(require("../templates/threads/title.mustache"))({
            link: this.model.get("external_url"),
            title: this.model.get("title"),
            status: this.model.get("status")
        });
    };
    Thread.prototype.scrollingBelowTitle = function() {
        return this.untilEnd(this.$(".thread-content").asEventStream("scroll")).map(function(e) {
            return function() {
                var t;
                t = e.staticHeader.$el.outerHeight();
                return e.$(".thread-content").scrollTop() > t - c;
            };
        }(this)).skipDuplicates().toProperty(false);
    };
    Thread.prototype.renderBody = function() {
        var t;
        this.$(".thread-body").html(this.model.get("body"));
        t = require("../templates/threads/property_list.mustache");
        if (this._formatFields().length > 0) {
            this.$(".updated-fields").show();
            this.$(".thread-properties").html(Helpers.renderTemplate(t)({
                fields: this._formatFields()
            }));
            if (!this.truncatedContent && this._formatFields().length > a) {
                this.truncateFields()
            };
        } else {
            this.$(".updated-fields").hide();
        }
        this._renderEmoji();
        return this._parseTimeTags();
    };
    Thread.prototype.scrollLocation = function(e) {};
    Thread.prototype.setScrollLocation = function() {};
    Thread.prototype.onSplitResize = function() {};
    Thread.prototype.returnToList = function() {
        return this.trigger("return-to-list");
    };
    Thread.prototype.focusForm = function() {
        var e;
        if ((e = this.commentForm) != null) {
            return e.focus();
        }
        return;
    };
    Thread.prototype._formatFields = function() {
        return this.model.get("fields") || [];
    };
    Thread.prototype._parseTimeTags = function() {
        return Helpers.TimeHelper.updateTimestamps(this.$el);
    };
    Thread.prototype._buildMoreMessagesIndicator = function() {
        var e;
        if (this.moreMessages) {
            return void this.moreMessages.increment();
        }
        e = {
            direction: "below",
            scrollable: this.$(".thread-content"),
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
    Thread.prototype.editLastMessage = function(e, t) {
        var n, r;
        n = this.activityList.lastMessageOf(Flowdock.app.user);
        if (n) {
            r = n.asProperty("id").filter(function(e) {
                return e != null;
            }).take(1);
            if (0 !== arguments.length) {
                return r.onValue(function() {
                    return n.searchReplaceContent(e, t);
                });
            }
            if (u.call(this.activityList.collection.slice(-10), n) >= 0) {
                return r.onValue(function(e) {
                    return function() {
                        var t;
                        t = _.last(e.activityList.findSubviews(n));
                        if (t) {
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
    Thread.prototype.onAttach = function() {
        return this.commentKeypress = false;
    };
    Thread.prototype.onCommentKeypress = function() {
        if (Modernizr.touchevents || this.commentKeyPress || (this.commentKeypress = true, 
        this.atBottom())) {
            return undefined;
        }
        return this.scrollToBottom();
    };
    Thread.prototype.onStateChange = function(e) {
        var t;
        t = this.model.activities.length === 0 || e === "error";
        return this.$el.toggleClass("error", t);
    };
    Thread.prototype.showContext = function() {
        var e;
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.show_in_chat_click);
        e = this.model.get("initial_message");
        if (e) {
            return this.trigger("show-context", e);
        }
        return;
    };
    Thread.prototype.flipSide = function() {
        return Flowdock.app.preferences.flip("single_view_in_inbox");
    };
    Thread.prototype.destructor = function() {
        Thread.__super__.destructor.apply(this, arguments);
        return this.commentForm = this.ctivityList = this.$indicators = this.staticHeader = this.floatingHeader = this.floatingCloseButton = this.fileupload = this.moreMessages = this.truncatedContent = null;
    };
    Thread.prototype.truncateFields = function() {
        var e, t;
        t = (e = this.truncatedContent) != null ? e.truncated : undefined;
        return this.truncatedContent = this.subview(new o({
            el: this.$(".updated-fields"),
            truncated: t
        })).render();
    };
    Thread.prototype.focusCommentInput = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        return this.$("textarea").focus();
    };
    return Thread;
}(Flowdock.HierarchicalView);

_.extend(Views.Thread.prototype, Flowdock.KeyboardEvents);
