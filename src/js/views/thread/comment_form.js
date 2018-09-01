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
}, i = {}.hasOwnProperty;

r = require("lib/markdown");

Views.Thread.CommentForm = function(t) {
    function CommentForm() {
        return CommentForm.__super__.constructor.apply(this, arguments);
    }
    o(CommentForm, t);
    CommentForm.prototype.disabledCommands = [ "appear", "hangout", "me", "room", "slap", "status" ];
    CommentForm.prototype.autofocus = true;
    CommentForm.prototype.placeholder = "Type to comment on this thread…";
    CommentForm.prototype.partials = {
        before: require("../../templates/inbox/thread_indicator.mustache"),
        commentsIcon: require("../../templates/icons/comments.mustache")
    };
    CommentForm.prototype.events = _.extend({}, Views.Shared.MessageInput.prototype.events, {
        "focus textarea": function() {
            return window.lastFocusedInput = "thread";
        }
    });
    CommentForm.prototype.serializeData = function() {
        return _.extend({}, CommentForm.__super__.serializeData.call(this), {
            threadColor: Helpers.CommentHelper.color(this.flow().id, this.model.threadId())
        });
    };
    CommentForm.prototype.key = function() {
        return this.flow().id + "-" + this.model.get("thread_id") + "-comment-form";
    };
    CommentForm.prototype.parse = function(e) {
        if (e.content != null) {
            e = e.content
        };
        return {
            content: r.replaceEmoji(e),
            tags: this.parseTags(e),
            flow: this.model.flow().id,
            thread_id: this.model.get("thread_id"),
            thread: this.model.attributes
        };
    };
    CommentForm.prototype.formatTitle = function() {
        return this.model.get("title");
    };
    CommentForm.prototype.createMessage = function(e) {
        Flowdock.analytics.trackHighVolume(Flowdock.ANALYTICS_EVENT_TYPES.messages_reply_chat);
        if (!e.tags) {
            e.tags = []
        };
        e.event = "message";
        e.app = "chat";
        e = this.flow().buildMessage(e);
        if (e.isValid()) {
            e.save();
            this.textarea.reset();
            return this.focus();
        }
        return;
    };
    CommentForm.prototype.onKeydown = function(e) {
        if (KeyEvent.is("left")(e) && $(e.target).val().length === 0) {
            return this.trigger("back");
        }
        return CommentForm.__super__.onKeydown.apply(this, arguments);
    };
    CommentForm.prototype.flow = function() {
        return this.model.flow();
    };
    return CommentForm;
}(Views.Shared.MessageInput);
