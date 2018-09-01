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

Models.Thread = function(e) {
    function Thread() {
        return Thread.__super__.constructor.apply(this, arguments);
    }
    r(Thread, e);
    Thread.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this._flow = e.flow;
        this.activities = new Collections.Activities(e.activities || [], {
            flow: this.flow(),
            thread: this.threadId(),
            maximumMessages: e.maximumMessages
        });
        this.listenTo(this.activities, "add historyAdd remove change:thread", this._updateThreadState);
        return this._updateThreadState();
    };
    Thread.prototype.threadId = function() {
        return this.get("thread_id");
    };
    Thread.prototype.flow = function() {
        return this._flow;
    };
    Thread.prototype.removable = function() {
        return false;
    };
    Thread.prototype.hasContext = function() {
        return this.isChatThread();
    };
    Thread.prototype.isPrivate = function() {
        return false;
    };
    Thread.prototype.cleanup = function() {
        this.activities.cleanup();
        return Thread.__super__.cleanup.apply(this, arguments);
    };
    Thread.prototype.hasContinuation = function() {
        return this.commentCount() > 1 || this.commentCount() === 1 && (Number(this.get("activities")) || 0) !== 1;
    };
    Thread.prototype.isChatThread = function() {
        return !this.get("source");
    };
    Thread.prototype.getTitle = function() {
        return this.get("title");
    };
    Thread.prototype.hasChatConversation = function() {
        return this.get("internal_comments") > 1 || this.commentCount() > 1 && this.get("internal_comments") > 0;
    };
    Thread.prototype.commentCount = function() {
        return (Number(this.get("internal_comments")) || 0) + (Number(this.get("external_comments")) || 0) + (Number(this.get("activities")) || 0);
    };
    Thread.prototype.fullyLoaded = function() {
        return this.commentCount() === this.activities.length;
    };
    Thread.prototype._updateThreadState = function() {
        var e;
        e = this.activities.last();
        if (e != null && e.get("thread")) {
            return this.set(e.get("thread"));
        }
        return;
    };
    Thread.prototype.hasStatus = function() {
        return this.get("status") != null;
    };
    Thread.prototype.permalink = function() {
        return Helpers.absoluteUrlFor({
            flow: this.flow(),
            message: this
        });
    };
    return Thread;
}(Backbone.Model);
