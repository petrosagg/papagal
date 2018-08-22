Presenters.InboxMessage = function() {
    function InboxMessage(e, t) {
        this.event = e;
        this.content = t;
    }
    InboxMessage.prototype.meta = function() {
        return [];
    };
    InboxMessage.prototype.actions = function() {
        return [];
    };
    InboxMessage.prototype.author = function() {};
    InboxMessage.prototype.avatar = function(e) {
        var t, n;
        t = (n = this.author()) != null ? n.email : void 0;
        if (e == null) {
            e = 100
        };
        return Presenters.Helper.avatarFromEmail(t, e);
    };
    InboxMessage.prototype.grouped = function() {
        return !1;
    };
    InboxMessage.prototype.classNameFor = function(e) {
        var t;
        t = {
            "integration-comment": "comment-from-integration"
        };
        return t[e] || "";
    };
    InboxMessage.prototype.linkTitle = function() {
        return "Open in " + Helpers.capitalizeFirst(this.event);
    };
    return InboxMessage;
}();