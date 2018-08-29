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
}, o = {}.hasOwnProperty, i = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Views.Inbox.CommentList = function(t) {
    function CommentList() {
        return CommentList.__super__.constructor.apply(this, arguments);
    }
    r(CommentList, t);
    CommentList.prototype.template = require("../../templates/inbox/comment_list.mustache");
    CommentList.prototype.className = "single-view-comments";
    CommentList.prototype.itemViewContainer = ".comment-list";
    CommentList.prototype.collectionEvents = {
        add: "addComment",
        remove: "removeSubview",
        "change:event": "updateMessageType"
    };
    CommentList.prototype.initialize = function() {
        CommentList.__super__.initialize.apply(this, arguments);
        this.commentsLoaded = new $.Deferred();
        this.commentsLoaded.always(function(e) {
            return function() {
                var t;
                if ((t = e.$spinner) != null) {
                    return t.remove();
                }
                return;
            };
        }(this)).fail(function(e) {
            return function() {
                return e.$(e.itemViewContainer).prepend('<li class="error">Failed loading comments</li>');
            };
        }(this));
        if (this.collection.message.commentsFetched()) {
            return this.commentsLoaded.resolve(this.collection);
        }
        return this.fetchComments();
    };
    CommentList.prototype.serializeData = function() {
        var e;
        return {
            hasContext: (e = this.model.get("event"), i.call(Models.Filter.Chat.prototype.event, e) >= 0)
        };
    };
    CommentList.prototype.addComment = function(e) {
        var t;
        if ("pending" !== this.collection.flow.fullyLoaded.state()) {
            if (this.collection.length === 1) {
                this.removeEmptyMessage()
            };
            t = this.renderOne(e);
            this.$(this.itemViewContainer).append(t);
            return this.trigger("commentRendered", e, t);
        }
    };
    CommentList.prototype.lastMessageOf = function(e) {
        return this.collection.lastMessageOf(e);
    };
    CommentList.prototype.fetchComments = function() {
        var e;
        e = this.untilEnd(Bacon.fromPromise(this.collection.fetchHistory({
            data: {
                limit: 100
            }
        }), true));
        e.onValue(function(e) {
            return function(t) {
                if (t.length === 100) {
                    return e.fetchComments();
                }
                return e.commentsLoaded.resolve(e.collection);
            };
        }(this));
        return e.onError(function(e) {
            return function() {
                return e.commentsLoaded.reject();
            };
        }(this));
    };
    CommentList.prototype.renderOne = function(e) {
        var t, n, r, o, i;
        try {
            o = e.get("event") === "file" ? "FileMessage" : "Message";
            t = e.get("event") === "file" ? "inbox-file-comment-message" : "inbox-comment-message";
            i = this.subview(new Views.Chat[o]({
                className: "chat-message " + t,
                inCommentList: true,
                model: e
            }));
            i.render();
            if (this.isAttached()) {
                i.triggerAttach()
            };
            return i.$el;
        } catch (s) {
            return n = s, console.error(n.stack), console.log("CommentList renderOne error", n, e), 
            r = this.subview(new Views.Shared.MessageError({
                app: "chat",
                model: e,
                error: n
            })), r.render().$el;
        }
    };
    CommentList.prototype.renderGroup = function(e) {
        return this.$(this.itemViewContainer).prepend(e.map(function(e) {
            return function(t) {
                return e.renderOne(t);
            };
        }(this)));
    };
    CommentList.prototype.onAfterRender = function() {
        if (this.commentsLoaded.state() === "pending") {
            this.$spinner = $("<li/>").html(Helpers.renderTemplate(require("../../templates/spinner.mustache"))()), 
            this.$(this.itemViewContainer).append(this.$spinner)
        };
        $.when(this.commentsLoaded, this.collection.flow.fullyLoaded).done(function(t) {
            return function(n) {
                var r, o;
                t.renderGroup(n);
                o = t.model.get("event");
                if (i.call(Models.Filter.Chat.prototype.event, o) >= 0) {
                    t.renderGroup([ t.model ])
                };
                t.trigger("addHistory");
                if (t.collection.length > 0) {
                    return t.renderDefaultMessage();
                }
                t.$(".comment-list-header").hide();
                r = require("../../templates/inbox/comment_list_empty.mustache");
                return t.$(".comment-list-footer").append(r.render());
            };
        }(this));
        return this;
    };
    CommentList.prototype.destructor = function() {
        CommentList.__super__.destructor.apply(this, arguments);
        this.$el.empty();
        return this.$spinner = this.commentsLoaded = null;
    };
    CommentList.prototype.removeEmptyMessage = function() {
        this.$(".comment-list-header").show();
        this.$(".empty-message").remove();
        return this.renderDefaultMessage();
    };
    CommentList.prototype.renderDefaultMessage = function() {
        var t;
        t = require("../../templates/inbox/comment_list_default.mustache");
        return this.$(".comment-list-footer").append(t.render({
            tip: Helpers.singleViewTip()
        }));
    };
    CommentList.prototype.jumpToMessage = function(e) {
        var t, n;
        t = Number(e) === this.model.id ? this.model : this.collection.get(Number(e));
        if (t && (n = this.findSubviews(t).pop())) {
            this.$(".message-history-highlight").removeClass("message-history-highlight");
            n.$el.addClass("message-history-highlight");
            return this.asEventStream("view:attach:before").merge(this.$el.asEventStream(Helpers.animationend())).take(1).onValue(function() {
                return n.$el.removeClass("message-history-highlight");
            });
        }
        return;
    };
    CommentList.prototype.updateMessageType = function(e, t) {
        if (e.get("event") === "comment") {
            return this.addComment(e);
        }
        return this.removeSubview(e);
    };
    return CommentList;
}(Flowdock.ItemView);
