var r, o = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, i = function(e, t) {
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

r = React.createFactory(require("components/chat/bubble"));

Views.Thread.Message = function(t) {
    function Message() {
        this._updateTimestamps = o(this._updateTimestamps, this);
        return Message.__super__.constructor.apply(this, arguments);
    }
    i(Message, t);
    Message.prototype.tagName = "li";
    Message.prototype.partials = {
        messageFooter: require("../../templates/shared/message_footer.mustache"),
        messageMenu: require("../../templates/threads/menu.mustache"),
        messageHeader: require("../../templates/chat/message_header.mustache")
    };
    Message.prototype.events = function() {
        return _.defaults({
            "blur .expanding-input textarea": "saveMessage",
            "click .edit-tags": "openTagInput",
            "click .delete": "delete",
            "click .edit-message": "openEditor",
            "click .save-message": "saveMessage",
            "keydown .expanding-input textarea": "saveMessage",
            "click .resend": "resendMessage"
        }, Message.__super__.events.apply(this, arguments));
    };
    Message.prototype.id = function() {
        return "thread-message-" + this.model.get("flow") + "-" + (this.model.id || this.model.get("uuid"));
    };
    Message.prototype.destructor = function() {
        if (this._updateTimestampInterval) {
            clearInterval(this._updateTimestampInterval)
        };
        this._updateTimestampInterval = null;
        return Message.__super__.destructor.apply(this, arguments);
    };
    Message.prototype.initialize = function() {
        Message.__super__.initialize.apply(this, arguments);
        return this._updateTimestampInterval = setInterval(this._updateTimestamps, 6e4);
    };
    Message.prototype._renderBubble = function() {
        var e, t;
        if (e = this.$(".bubble-container")[0]) {
            t = {
                color: this.model.threadColor(),
                isInformational: this.model.isInformational(),
                isThreadStarter: this.model.isThreadStarter()
            };
            return this.component(e, r(t));
        }
        return;
    };
    Message.prototype.render = function() {
        var e;
        e = Message.__super__.render.apply(this, arguments);
        if (this.model.get("full_body")) {
            this.truncateWrap(".thread-comment-unexcerpt");
        } else this.truncateWrap(".content");
        this._renderBubble();
        this.appendAttachments();
        this._updateTimestamps();
        return e;
    };
    Message.prototype._updateTimestamps = function() {
        return Helpers.TimeHelper.updateTimestamps(this.$el);
    };
    Message.prototype.appendAttachments = function() {
        var e, t, n, r, o, i;
        for (o = this.model.appendedAttachments(), i = [], n = 0, r = o.length; r > n; n++) {
            e = o[n];
            t = this.subview(new Views.Shared.Attachment({
                attachment: e,
                model: this.model,
                parent: this,
                renderIfPreviewsHidden: "file" !== this.model.get("event")
            }));
            i.push(this.$(".attachments").append(t.render().$el));
        }
        return i;
    };
    Message.prototype.time = function() {
        return moment(this.model.get("sent"));
    };
    Message.build = function(e, t) {
        var n, r;
        n = _.extend({
            model: e
        }, t);
        if ((r = e.get("event")) === "activity" || r === "thread") {
            return new Views.Thread.Activity(n);
        }
        if (e.get("event") === "file") {
            return new Views.Thread.FileMessage(n);
        }
        if (e.get("event") === "discussion") {
            return new Views.Thread.Discussion(n);
        }
        return new Views.Thread.Comment(n);
    };
    return Message;
}(Views.Shared.Message);
