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

Views.Chat.Input = function(t) {
    function Input() {
        return Input.__super__.constructor.apply(this, arguments);
    }
    r(Input, t);
    Input.prototype.id = "chat-form";
    Input.prototype.partials = function() {
        if (this.model.isFlow()) {
            return {
                before: require("../../templates/inbox/thread_indicator.mustache"),
                commentsIcon: require("../../templates/icons/post_bubble.mustache")
            };
        }
        return {};
    };
    Input.prototype.events = _.extend({}, Views.Shared.MessageInput.prototype.events, {
        "focus textarea": function() {
            return window.lastFocusedInput = "chat";
        }
    });
    Input.prototype.keyboardEvents = {
        focusChat: "focus",
        returnFocusToChat: "focus"
    };
    Input.prototype.key = function() {
        var e;
        e = this.model.isPrivate() ? this.model.users.map(function(e) {
            return e.id;
        }).sort().join("-") : this.model.id;
        return e + "-chat-input";
    };
    Input.prototype.createMessage = function(e) {
        var t;
        t = this.model.buildMessage(e, Models.ChatMessage);
        if (t.isValid()) {
            if (t.isThreadStarter()) {
                Flowdock.analytics.trackHighVolume(Flowdock.ANALYTICS_EVENT_TYPES.messages_add_chat);
            } else Flowdock.analytics.trackHighVolume(Flowdock.ANALYTICS_EVENT_TYPES.messages_reply_chat);
            t.save();
            this.textarea.reset();
            this.focus();
            return this.trigger("send");
        }
        return;
    };
    Input.prototype.flow = function() {
        return this.model;
    };
    return Input;
}(Views.Shared.MessageInput);
