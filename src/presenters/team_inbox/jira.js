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

Presenters.TeamInbox.Jira = function(e) {
    function Jira() {
        return Jira.__super__.constructor.apply(this, arguments);
    }
    r(Jira, e);
    Jira.prototype.icon = function() {
        return Flowdock.icons.jira;
    };
    Jira.prototype.author = function() {
        var e, t, n;
        e = (t = this.content) != null ? t.user_email : void 0;
        return {
            name: (n = this.content) != null ? n.user_name : void 0,
            link: "mailto:" + e,
            email: e
        };
    };
    Jira.prototype.action = function() {
        var e;
        e = this.content.event_type;
        if (e === "start_work") {
            return "started";
        }
        if (e && "unknown" !== e) {
            if (e[e.length - 1] === "e") {
                return e + "d";
            }
            return e + "ed";
        }
        return "updated";
    };
    Jira.prototype.headline = function() {
        return this.issueName();
    };
    Jira.prototype.linkTitle = function() {
        return "Open in JIRA";
    };
    Jira.prototype.link = function() {
        return this.content.issue_url;
    };
    Jira.prototype.meta = function() {
        return [ {
            text: this.content.project_name,
            link: this.content.project_url
        } ];
    };
    Jira.prototype.summary = function() {
        var e;
        e = this.action() + ' "' + this.issueName() + '"';
        if (this.content.event_type === "comment") {
            return e + ": " + this.content.comment_body;
        }
        return e;
    };
    Jira.prototype.body = function() {
        var e, t, n;
        e = (t = this.htmlBody()) ? {
            html: t
        } : {
            text: this.textBody()
        };
        n = this.content.issue_changelog ? void 0 : Presenters.Helper.keyValuePairs(this.issueProperties());
        return Presenters.Helper.render("jira", {
            changeLog: this.content.issue_changelog,
            body: e,
            propertyList: n
        }, {
            changeLog: "shared/changeLog",
            propertyList: "shared/propertyList"
        });
    };
    Jira.prototype.additionalClasses = function() {
        if (this.content.event_type === "comment") {
            return this.classNameFor("integration-comment");
        }
        return;
    };
    Jira.prototype.excerpt = function() {
        return Presenters.Helper.sliceExcerpt(this.textBody());
    };
    Jira.prototype.issueProperties = function() {
        return {
            Type: this.content.issue_type,
            Status: this.content.issue_status,
            Priority: this.content.issue_priority,
            Assignee: this.content.issue_assignee_name,
            Reporter: this.content.issue_reporter_name,
            Summary: this.content.issue_summary
        };
    };
    Jira.prototype.htmlBody = function() {
        if (this.content.comment_body_html != null) {
            return this.content.comment_body_html;
        }
        if (this.content.issue_description_html != null) {
            return this.content.issue_description_html;
        }
        return;
    };
    Jira.prototype.textBody = function() {
        if (this.content.comment_body != null) {
            return this.content.comment_body;
        }
        if (this.content.issue_description != null) {
            return this.content.issue_description;
        }
        return "";
    };
    Jira.prototype.issueName = function() {
        var e;
        e = this.content.issue_key + " (" + this.content.issue_type + "): " + this.content.issue_summary;
        if (this.content.issue_resolution) {
            return e + (" as " + this.content.issue_resolution);
        }
        return e;
    };
    return Jira;
}(Presenters.InboxMessage);