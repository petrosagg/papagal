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

Views.Thread.Activity = function(t) {
    function Activity() {
        return Activity.__super__.constructor.apply(this, arguments);
    }
    r(Activity, t);
    Activity.prototype.tagName = "li";
    Activity.prototype.className = "thread-activity-message";
    Activity.prototype.template = require("../../templates/threads/activity.mustache");
    Activity.prototype.initialize = function(e) {
        var t, r;
        if (e == null) {
            e = {}
        };
        Activity.__super__.initialize.apply(this, arguments);
        this.combined = ((t = e.previous) != null ? t.get("event") : void 0) === "activity";
        this.first = this.model.get("event") === "discussion" || "activity" !== ((r = e.previous) != null ? r.get("event") : void 0);
        return this.last = !e.next || "activity" !== e.next.get("event");
    };
    Activity.prototype.renderContent = function() {
        var e, t, n, r;
        e = Presenters.Helper.restifyFilepaths(this.model.get("body"));
        r = Helpers.renderTemplate(this.template)({
            author: this.author().name,
            avatar: this.avatar(),
            title: this.model.get("title"),
            body: e,
            datetime: this.time().toJSON(),
            timeFromNow: Helpers.TimeHelper.calendarTime(this.time(), !0),
            longTime: this.time().format("LLL"),
            removable: this.model.removable(),
            editable: this.model.editable() && this.model.myMessage(),
            renderSource: this.first,
            source: (t = this.model.get("thread")) != null ? t.source : void 0,
            hasAttachments: ((n = this.model.get("attachments")) != null ? n.length : void 0) > 0
        }, _.result(this, "partials"));
        this.$el.addClass(this.model.get("comment")).html(r);
        if (this.combined) {
            this.$el.addClass("combined")
        };
        if (this.last) {
            this.$el.addClass("last")
        };
        return this;
    };
    Activity.prototype.avatar = function() {
        var e;
        if (((e = this.author().avatar) != null ? e.length : void 0) > 0) {
            return this.author().avatar;
        }
        return Flowdock.icons.defaultAvatar;
    };
    return Activity;
}(Views.Thread.Message);
