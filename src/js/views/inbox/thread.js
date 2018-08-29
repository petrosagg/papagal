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

Views.Inbox.Thread = function(e) {
    function Thread() {
        return Thread.__super__.constructor.apply(this, arguments);
    }
    r(Thread, e);
    Thread.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Thread.__super__.initialize.apply(this, arguments);
        this.listenTo(this.model, "change:thread", this.updateThread, this);
        this.listenTo(this.model, "change:thread", this.render, this);
        return this.thread = new Models.Thread(this.model.get("thread"));
    };
    Thread.prototype.commentCount = function() {
        return Number(this.model.get("thread").internal_comments || 0) + Number(this.model.get("thread").external_comments || 0) + Number(this.model.get("thread").activities || 0);
    };
    Thread.prototype.commentCountVisible = function() {
        return this.collapseThreads && this._visibleComments();
    };
    Thread.prototype._visibleComments = function() {
        return this.commentCount() > 1 || this.commentCount() === 1 && !Number(this.model.get("thread").activities || 0) === 1;
    };
    Thread.prototype.hideTitle = function() {
        var e;
        e = this.model.get("thread");
        if (e) {
            return !e.status && this.model.get("excerpt_title") != null;
        }
        return;
    };
    Thread.prototype.open = function() {
        var e;
        Flowdock.app.router.navigateToFlow(this.model.flow(), {
            thread: this.model.get("thread_id")
        });
        if ((e = Flowdock.app.manager.currentView) != null) {
            return e.jumpTo(this.model.id);
        }
        return;
    };
    Thread.prototype.updateThread = function() {
        return this.thread.set(this.model.get("thread"));
    };
    Thread.prototype.renderContent = function() {
        Thread.__super__.renderContent.apply(this, arguments);
        if (this.threadActions) {
            this.removeSubview(this.threadActions)
        };
        this.threadActions = this.subview(new Views.Thread.ThreadActionList({
            model: this.thread
        }));
        this.$(".dropdown-menu:not(.sub-menu)").prepend(this.threadActions.$el);
        return this.threadActions.render();
    };
    return Thread;
}(Views.Inbox.Item);
