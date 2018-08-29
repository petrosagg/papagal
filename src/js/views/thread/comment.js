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

Views.Thread.Comment = function(t) {
    function Comment() {
        return Comment.__super__.constructor.apply(this, arguments);
    }
    r(Comment, t);
    Comment.prototype.className = "chat-message thread-comment-message";
    Comment.prototype.bodyTemplate = require("../../templates/threads/comment.mustache");
    Comment.prototype.fullBodyTemplate = require("../../templates/threads/full_body.mustache");
    Comment.prototype.events = function() {
        return _.extend({
            "click [data-user]": "toggleUserCard"
        }, Comment.__super__.events.apply(this, arguments));
    };
    Comment.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Comment.__super__.initialize.apply(this, arguments);
        this.shareWithRally = e.shareWithRally || function() {
            return null;
        };
        if (this.model.get("author")) {
            return undefined;
        }
        return this.listenTo(this.model.user(), "change", this._userUpdate, this);
    };
    Comment.prototype.fullBody = function() {
        var e;
        e = this.model.get("full_body");
        if (e) {
            return Presenters.Helper.restifyFilepaths(e);
        }
        return;
    };
    Comment.prototype.body = function() {
        if (this.model.get("event") === "discussion") {
            return Presenters.Helper.restifyFilepaths(this.model.get("body") || " ");
        }
        return this.model.presenter().body();
    };
    Comment.prototype.onShareWithRally = function() {
        return this.shareWithRally(this);
    };
    Comment.prototype.renderContent = function() {
        var e, t, n, r, o, i, s, a, u, l;
        n = this.model.get("edited");
        r = n != null && ((s = this.body()) != null ? s.length : undefined) === 0;
        t = Helpers.TimeHelper.editTime(n, r);
        l = this.model.user();
        e = this.body();
        o = this.fullBody();
        i = {
            author: this.author().name,
            avatar: this.author().avatar || Flowdock.icons.defaultAvatar,
            title: this.model.get("title"),
            source: (a = this.model.get("thread")) != null ? a.source : undefined,
            renderSource: this.model.get("event") === "discussion",
            full_body: o,
            body: e,
            datetime: this.time().toJSON(),
            permalink: Helpers.absoluteUrlFor({
                flow: this.model.flow(),
                message: this.model.id
            }),
            timeFromNow: Helpers.TimeHelper.calendarTime(this.time(), true),
            longTime: this.time().format("LLL"),
            removable: this.model.removable(),
            editable: this.model.editable() && this.model.myMessage(),
            sendableToRally: this.model.sendableToRally(),
            edited: n,
            emptied: r,
            editTime: t,
            displayableUserCard: !l.external(),
            hasAttachments: this.hasAttachments(),
            user: l,
            bubble: "discussion" !== this.model.get("event")
        };
        if (o) {
            u = Helpers.renderTemplate(this.fullBodyTemplate)(i, _.result(this, "partials"));
        } else {
            u = Helpers.renderTemplate(this.bodyTemplate)(i, _.result(this, "partials"));
        }
        this.$el.addClass(this.model.get("comment")).html(u);
        if (this.model.get("event") === "message") {
            this._previewLinks()
        };
        this.$el.toggleClass("deleted", r);
        return this;
    };
    Comment.prototype.hasAttachments = function() {
        return false;
    };
    Comment.prototype._previewLinks = function() {
        return this.$(".content a.embeddable").filter(function() {
            return "CODE" !== $(this).parent()[0].nodeName;
        }).each(function(e) {
            return function(t, n) {
                var r, o, i, s;
                o = $(n);
                s = o.prop("href");
                r = Views.Embed.match(s);
                if (r) {
                    i = o.wrap('<div class="embed">').parent();
                    return e.subview(new r({
                        url: s,
                        el: i,
                        parent: e,
                        message: e.model
                    }).render());
                }
                return;
            };
        }(this));
    };
    Comment.prototype._userUpdate = function() {
        this.$el.find(".thread-avatar").attr("src", this.model.user().avatar());
        return this.$el.find(".message-author").text(this.model.user().get("nick"));
    };
    return Comment;
}(Views.Thread.Message);
