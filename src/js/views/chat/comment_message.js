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

Views.Chat.CommentMessage = function(e) {
    function CommentMessage() {
        return CommentMessage.__super__.constructor.apply(this, arguments);
    }
    r(CommentMessage, e);
    CommentMessage.prototype.className = "chat-message comment-message";
    return CommentMessage;
}(Views.Chat.Message);
