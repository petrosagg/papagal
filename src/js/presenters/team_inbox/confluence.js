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

Presenters.TeamInbox.Confluence = function(e) {
    function Confluence() {
        return Confluence.__super__.constructor.apply(this, arguments);
    }
    r(Confluence, e);
    Confluence.prototype.icon = function() {
        return Flowdock.icons.confluence;
    };
    Confluence.prototype.author = function() {
        var e, t, n;
        e = (t = this.content) != null ? t.user_email : undefined;
        return {
            name: (n = this.content) != null ? n.user_name : undefined,
            link: "mailto:" + e,
            email: e
        };
    };
    Confluence.prototype.action = function() {
        var e;
        e = this.content.event;
        if (e === "comment_create") {
            return "commented wiki page";
        }
        return e + "d wiki page";
    };
    Confluence.prototype.headline = function() {
        return this.content.page_title;
    };
    Confluence.prototype.link = function() {
        return this.content.page_url;
    };
    Confluence.prototype.meta = function() {
        var e;
        e = [ {
            text: this.content.space_name,
            link: this.content.space_url
        } ];
        if (this.isComment()) {
            e.push({
                text: this.content.page_title,
                link: this.content.page_url
            })
        };
        return e;
    };
    Confluence.prototype.summary = function() {
        var e;
        e = this.action() + ' wiki page "' + this.content.page_title + '"';
        if (this.isComment()) {
            return e + ": " + this.content.comment_content_summary;
        }
        return e;
    };
    Confluence.prototype.body = function() {
        var e, t;
        e = (t = this.htmlBody()) ? {
            html: t
        } : {
            text: this.textBody()
        };
        return Presenters.Helper.render("confluence", {
            body: e,
            diff: this.content.diff
        });
    };
    Confluence.prototype.additionalClasses = function() {
        if (this.isComment()) {
            return this.classNameFor("integration-comment");
        }
        return;
    };
    Confluence.prototype.excerpt = function() {
        var e;
        e = this.textBody();
        return Presenters.Helper.sliceExcerpt(e);
    };
    Confluence.prototype.htmlBody = function() {
        if (this.isComment()) {
            return this.content.comment_content_summary_html;
        }
        return;
    };
    Confluence.prototype.textBody = function() {
        if (this.isComment()) {
            return this.content.comment_content_summary;
        }
        return this.content.version_comment;
    };
    Confluence.prototype.isComment = function() {
        return this.content.event === "comment_create";
    };
    return Confluence;
}(Presenters.InboxMessage);
