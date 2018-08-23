var r;

r = require("../lib/markdown");

Presenters.ChatMessage = function() {
    function ChatMessage(e, t, n) {
        this.event = e;
        this.content = t;
        this.data = n;
    }
    ChatMessage.SUPPORTED_EVENTS = [ "message", "comment", "error-message" ];
    ChatMessage.prototype.avatar = function(e) {
        var t;
        return "" + ((t = this.data.user) != null ? t.avatar : void 0) + e;
    };
    ChatMessage.prototype.icon = function() {};
    ChatMessage.prototype.author = function() {
        if (this.data.user) {
            return {
                name: this.data.user.nick
            };
        }
        return;
    };
    ChatMessage.prototype.excerpt = function() {
        var e;
        e = this.body();
        if (e != null) {
            return {
                html: e
            };
        }
        return;
    };
    ChatMessage.prototype.grouped = function() {
        return !1;
    };
    ChatMessage.prototype.meta = function() {};
    ChatMessage.prototype.action = function() {};
    ChatMessage.prototype.htmlHeadline = function() {
        var e, t;
        if ((e = this.data) != null && (t = e.thread) != null) {
            return t.title;
        }
        return;
    };
    ChatMessage.prototype.headline = function() {
        var e, t;
        return ((e = this.data) != null && (t = e.thread) != null ? t.title : void 0) || this.summary().split("\n")[0];
    };
    ChatMessage.prototype.body = function() {
        return this._summary(this.format);
    };
    ChatMessage.prototype.plainText = function(e) {
        return r.text(r.parse(e));
    };
    ChatMessage.prototype._summary = function(e) {
        var t;
        if ((t = this.event) === "message" || t === "line" || t === "error-message") {
            return e.call(this, this.content);
        }
        if (this.event === "status") {
            return Presenters.Helper.escape(this.content) || "cleared status";
        }
        if (this.event === "comment") {
            return e.call(this, this.content.text);
        }
        if (this.event === "file") {
            return "Uploaded a file: " + this.content.file_name;
        }
        return;
    };
    ChatMessage.prototype.summary = function() {
        return this._summary(this.plainText);
    };
    ChatMessage.prototype.format = function(e) {
        var t;
        if ((t = this.event) === "message" || t === "comment" || t === "line") {
            return r.render(e, this.data);
        }
        return Presenters.Helper.autoLink(Helpers.IndentationHelper.formatIndented(e), this.data);
    };
    return ChatMessage;
}();
