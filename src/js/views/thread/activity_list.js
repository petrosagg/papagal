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

Views.Thread.ActivityList = function(e) {
    function ActivityList() {
        return ActivityList.__super__.constructor.apply(this, arguments);
    }
    r(ActivityList, e);
    ActivityList.prototype.tagName = "ul";
    ActivityList.prototype.className = "thread-activities";
    ActivityList.prototype.listName = "activities";
    ActivityList.prototype.initialize = function(e) {
        this.viewport = e.viewport;
        ActivityList.__super__.initialize.apply(this, arguments);
        this.listenTo(this.backwardLoader, "state", function(e) {
            return this.trigger("state", e);
        });
        if (this.forwardLoader != null) {
            return this.listenTo(this.forwardLoader, "state", function(e) {
                return this.trigger("state", e);
            });
        }
        return;
    };
    ActivityList.prototype.scrollLocation = function(e) {
        var t;
        t = this.viewport();
        if (e != null) {
            t.scrollTop(t[0].scrollHeight - e - t.outerHeight())
        };
        if (t.length === 0) {
            return 0;
        }
        return t[0].scrollHeight - t.scrollTop() - t.outerHeight();
    };
    ActivityList.prototype._previousTo = function(e) {
        var t;
        t = this.collection.indexOf(e);
        if (t > 0) {
            return this.collection.at(t - 1);
        }
        return;
    };
    ActivityList.prototype._nextTo = function(e) {
        return this.collection.at(this.collection.indexOf(e) + 1);
    };
    ActivityList.prototype._continues = function(e, t) {
        var n, r;
        return !("activity" !== (n = e != null ? e.get("event") : undefined) && "thread" !== n || "activity" !== (r = t.get("event")) && "thread" !== r);
    };
    ActivityList.prototype.onAdd = function(e) {
        if (this._continues(this._previousTo(e), e)) {
            this.$(".last").last().removeClass("last")
        };
        return ActivityList.__super__.onAdd.apply(this, arguments);
    };
    ActivityList.prototype.renderOne = function(e) {
        var t, n, r;
        try {
            r = this.subview(Views.Thread.Message.build(e, {
                previous: this._previousTo(e),
                next: this._nextTo(e),
                shareWithRally: function(e) {
                    return function(t) {
                        return e._showShareWarning(t);
                    };
                }(this)
            }));
            r.render();
            if (this.isAttached()) {
                r.triggerAttach()
            };
            return [ r ];
        } catch (o) {
            return t = o, console.error(t.stack), console.log("ActivityList renderOne error", t, e), 
            n = this.subview(new Views.Shared.MessageError({
                app: "chat",
                model: e,
                error: t
            })), [ n.render() ];
        }
    };
    ActivityList.prototype.destructor = function() {
        ActivityList.__super__.destructor.apply(this, arguments);
        return this.viewport = null;
    };
    return ActivityList;
}(Views.Shared.ReversedMessageList);
