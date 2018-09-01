var r;

r = require("../lib/string.truncate");

Presenters.Activity = function() {
    function Activity(e, t, n) {
        this.data = e;
        this.threadGroup = t;
        this.lineLimit = n;
        if (this.lineLimit != null) {
            this.visibleGroup = this.threadGroup.slice(0, this.lineLimit);
        } else {
            this.visibleGroup = this.threadGroup;
        }
    }
    Activity.prototype.icon = function() {
        return null;
    };
    Activity.prototype.meta = function() {
        var e;
        e = this.threadGroup.length - this.visibleGroup.length;
        if (e > 0) {
            return [ {
                text: e + " more message" + (e > 1 ? "s" : "")
            } ];
        }
        return [];
    };
    Activity.prototype.link = function() {
        var e;
        if ((e = this.data.thread) != null) {
            return e.external_url;
        }
        return;
    };
    Activity.prototype.actions = function() {
        return [];
    };
    Activity.prototype.author = function() {
        return this.data.author;
    };
    Activity.prototype.avatar = function(e) {
        var t, n, r, o, i;
        return ((t = this.data.thread) != null && (n = t.source) != null && (r = n.application) != null ? r.icon_url : undefined) || ((o = this.data.thread) != null && (i = o.source) != null ? i.icon : undefined);
    };
    Activity.prototype.classNameFor = function(e) {
        var t;
        t = {
            "integration-comment": "comment-from-integration"
        };
        return t[e] || "";
    };
    Activity.prototype.grouped = function() {
        return true;
    };
    Activity.prototype.headline = function() {
        var e;
        return ((e = this.data.thread) != null ? e.title : undefined) || this.data.title;
    };
    Activity.prototype.htmlHeadline = function() {
        return this.headline();
    };
    Activity.prototype.excerpt = function() {
        return {
            html: this._renderGroup()
        };
    };
    Activity.prototype.body = function() {
        return Presenters.Helper.render("body", {
            body: {
                html: this.data.body
            }
        });
    };
    Activity.prototype.linkTitle = function() {
        var e, t, n, r, o, i, s, a, u, l;
        if ((e = this.data.thread) != null && (t = e.source) != null && (n = t.application) != null && n.name) {
            return "Open in " + ((r = this.data.thread) != null && (o = r.source) != null && (i = o.application) != null ? i.name : undefined);
        }
        if ((s = this.data.thread) != null && (a = s.source) != null && a.application) {
            return "Open in " + ((u = this.data.thread) != null && (l = u.source) != null ? l.application : undefined);
        }
        return "Open original";
    };
    Activity.prototype.summary = function() {
        var e;
        return [ Presenters.Helper.unsafeStripHTML((e = this.data.thread) != null ? e.title : undefined), this.summaryExcerpt() ].filter(_.identity).join(": ");
    };
    Activity.prototype._renderDiscussion = function(e) {
        return {
            author: e.get("author").name,
            avatar: e.get("author").avatar || Flowdock.icons.defaultAvatar,
            excerpt: this._discussionExcerpt(e)
        };
    };
    Activity.prototype.summaryExcerpt = function() {
        if (this.data.event === "discussion" && this.data.body) {
            return r(Presenters.Helper.unsafeStripHTML(this.data.body));
        }
        if (this.data.title) {
            return Presenters.Helper.unsafeStripHTML(this.data.title);
        }
        return;
    };
    Activity.prototype._discussionExcerpt = function(e) {
        var t, n, r;
        if ((n = Presenters.Helper.unsafeStripHTML(e.get("body"))) != null) {
            t = n.trim();
        } else {
            t = undefined;
        }
        t && t.length !== 0 || (t = (r = Presenters.Helper.unsafeStripHTML(e.get("title"))) != null ? r.trim() : undefined);
        t && t.length !== 0 || (t = "commented");
        return t;
    };
    Activity.prototype._renderActivity = function(e) {
        return {
            author: e.get("author").name,
            avatar: e.get("author").avatar || Flowdock.icons.defaultAvatar,
            title: e.get("title"),
            excerpt: Presenters.Helper.unsafeStripHTML(e.get("body"))
        };
    };
    Activity.prototype._renderMessage = function(e) {
        return {
            author: e.user().get("name"),
            avatar: e.user().get("avatar"),
            excerpt: e.get("content")
        };
    };
    Activity.prototype._render = function(e) {
        switch (e.get("event")) {
          case "activity":
            return this._renderActivity(e);

          case "discussion":
            return this._renderDiscussion(e);

          case "message":
            return this._renderMessage(e);
        }
    };
    Activity.prototype._renderGroup = function() {
        return Presenters.Helper.render("thread_group", {
            messages: this.visibleGroup.map(function(e) {
                return function(t) {
                    return _.extend(e._render(t), {
                        single: e.visibleGroup.length === 1
                    });
                };
            }(this))
        });
    };
    return Activity;
}();
