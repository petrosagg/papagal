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

Views.Inbox.CommentForm = function(t) {
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
            threadColor: Helpers.CommentHelper.color(this.model.flow().id, this.model.threadId())
        });
    };
    CommentForm.prototype.flow = function() {
        return this.model.flow();
    };
    CommentForm.prototype.key = function() {
        return this.flow().id + "-" + this.model.id + "-comment-form";
    };
    CommentForm.prototype.value = function() {
        return this.textarea.value();
    };
    CommentForm.prototype.parse = function(e) {
        if (e.content != null) {
            e = e.content
        };
        return {
            content: {
                title: this.formatTitle(),
                text: r.replaceEmoji(e)
            },
            tags: this.parseTags(e),
            flow: this.model.get("flow")
        };
    };
    CommentForm.prototype.formatTitle = function() {
        var e, t, n;
        n = this.model.presenter();
        if (typeof n.action == "function" && n.action()) {
            e = n.action() + " ";
        } else {
            e = "";
        }
        t = n.headline() || n.summary();
        return unescape("" + e + t);
    };
    CommentForm.prototype.tagThread = function() {
        if (this.model.hasComments()) {
            return undefined;
        }
        return this.model.threadify();
    };
    CommentForm.prototype.createMessage = function(e) {
        e.tags || (e.tags = []);
        e.tags = e.tags.concat([ "influx:" + this.model.id ]);
        e = this.flow().buildMessage(e, Models.CommentMessage);
        if (e.isValid()) {
            e.save();
            this.tagThread();
            this.textarea.reset();
            return this.focus();
        }
        return;
    };
    CommentForm.prototype.jumpThreadUp = function() {
        return this.$el.trigger("jump-thread:up", this.model);
    };
    CommentForm.prototype.jumpThreadDown = function() {
        return this.$el.trigger("jump-thread:down", this.model);
    };
    CommentForm.prototype.onKeydown = function(e) {
        if (KeyEvent.is("left")(e) && $(e.target).val().length === 0) {
            return this.trigger("back");
        }
        return CommentForm.__super__.onKeydown.apply(this, arguments);
    };
    return CommentForm;
}(Views.Shared.MessageInput);
