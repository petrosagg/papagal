var r, o, i, s, a, u, l, c, p, d, h, f, m, g, v, b, y, w, k, x, C, E, T, S, D, A, M, F, N, O = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, I = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (P.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, P = {}.hasOwnProperty;

l = require("../../lib/string.capitalize");

Presenters.TeamInbox.Git = function(e) {
    function Git(e, t, n) {
        this.event = e;
        this.content = t;
        if (n == null) {
            n = {}
        };
        this.actions = O(this.actions, this);
        this.lineLimit = n.lineLimit || 3;
        this.renderedContent = D(this.content);
    }
    I(Git, e);
    Git.prototype.icon = function() {
        return Flowdock.icons.git;
    };
    Git.prototype.avatar = function(e) {
        var t, n, r;
        if (e == null) {
            e = 100
        };
        if ((t = this.author()) != null && t.avatarUrl) {
            return this.author().avatarUrl + ("&s=" + e);
        }
        if ((n = this.author()) != null && n.email) {
            return Presenters.Helper.avatarFromEmail(this.author().email, e);
        }
        if ((r = this.author()) != null && r.gravatarId) {
            return Presenters.Helper.avatarFromHash(this.author().gravatarId, e);
        }
        return;
    };
    Git.prototype.link = function() {
        var e, t;
        if (this.renderedContent.link) {
            e = this.renderedContent.link;
        } else {
            if (((t = this.branch()) != null ? t.url : undefined) && !s(this.content)) {
                e = this.branch().url;
            } else {
                e = undefined;
            }
        }
        if (e != null && e.match(/^https?/)) {
            return e;
        }
        return;
    };
    Git.prototype.author = function() {
        return r(this.content);
    };
    Git.prototype.action = function() {
        return this.renderedContent.action;
    };
    Git.prototype.headline = function() {
        return f(this.renderedContent.headline);
    };
    Git.prototype.summary = function() {
        return f(N(this.content));
    };
    Git.prototype.body = function() {
        return f(this.renderedContent.action === "edited" ? this.renderPages() : i(this.content) || s(this.content) ? null : this.hasCommits() ? this.renderCommits() : Presenters.Helper.render("body", {
            body: this.renderedContent.body
        }));
    };
    Git.prototype.renderPages = function() {
        return Presenters.Helper.render("github/pages", {
            pages: this.renderedContent.pages
        });
    };
    Git.prototype.renderCommits = function(e) {
        var t, n;
        n = this.renderedContent.commits.map(function(e) {
            return function(t) {
                return E(t, e.content.before);
            };
        }(this)).reverse();
        t = n.length;
        if (e && t - e > 0) {
            n = n.slice(0, e)
        };
        return Presenters.Helper.render("github/commits", {
            commits: n,
            forced: this.renderedContent.forced
        }, {
            commit: "github/commit",
            commit_summary: "github/commit_summary"
        });
    };
    Git.prototype.additionalClasses = function() {
        if (this.content.comment) {
            return this.classNameFor("integration-comment");
        }
        return;
    };
    Git.prototype.excerpt = function() {
        var e;
        if (this.hasCommits()) {
            return {
                html: f(this.renderCommits(this.lineLimit))
            };
        }
        e = Presenters.Helper.unsafeStripHTML(this.body());
        return f(Presenters.Helper.sliceExcerpt(e));
    };
    Git.prototype.meta = function() {
        var e, t, n, r;
        r = this.repository();
        e = this.branch();
        t = [ {
            text: r.name,
            link: r.url
        } ];
        if (e != null && e.name) {
            t.push({
                text: e.name,
                link: e.url
            })
        };
        if (g(this.content)) {
            t.unshift({
                text: "Forced update"
            })
        };
        n = k(this.content, this.lineLimit);
        if (n > 0) {
            t.unshift({
                text: n + " more commit" + (n > 1 ? "s" : "")
            })
        };
        return t;
    };
    Git.prototype.actions = function() {
        var e;
        e = [];
        if (s(this.content)) {
            return [];
        }
        if (this.content.compare) {
            e.push({
                text: "diff",
                link: this.content.compare,
                className: "list"
            })
        };
        if (this.pullRequestPossible()) {
            e.push({
                text: "pull request",
                link: this.repository().url + "/compare/" + this.branch().name,
                className: "code-fork"
            })
        };
        return e;
    };
    Git.prototype.events = function() {
        return {
            "click .commit-list .commit-details": this.toggleCommitSummary
        };
    };
    Git.prototype.linkAndDescription = function(e, t) {
        if (e.indexOf("view") === 0) {
            return {
                text: e,
                link: t,
                className: e.split(" ")[0]
            };
        }
        return {
            text: e,
            link: t
        };
    };
    Git.prototype.pullRequestPossible = function() {
        var e, t;
        e = this.content.ref;
        return ((t = this.repository().url) != null ? t.match(/^https?:\/\/github.com/) : undefined) && e && e !== "refs/heads/master" && !this.tag() && !s(this.content);
    };
    Git.prototype.linkTitle = function() {
        if (this.event === "vcs" && String(this.link()).indexOf("github.com") >= 0) {
            return "Open in GitHub";
        }
        return "Open original";
    };
    Git.prototype.repository = function() {
        return M(this.content);
    };
    Git.prototype.branch = function() {
        return this.renderedContent.branch;
    };
    Git.prototype.tag = function() {
        return this.renderedContent.tag;
    };
    Git.prototype.gitEvent = function() {
        return b(this.content);
    };
    Git.prototype.commits = function() {
        return this.renderedContent.commits;
    };
    Git.prototype.pages = function() {
        return this.renderedContent.pages;
    };
    Git.prototype.issue = function() {
        return this.renderedContent.issue;
    };
    Git.prototype.pullRequest = function() {
        return this.renderedContent.pullRequest;
    };
    Git.prototype.hasCommits = function() {
        return (this.renderedContent.commits != null) > 0;
    };
    Git.prototype.toggleCommitSummary = function(e) {
        var t;
        if (!$(e.target).is("a")) {
            t = $(e.target).closest(".commit");
            $(t).toggleClass("toggled");
            return $(t).find(".details").toggleClass("show");
        }
    };
    return Git;
}(Presenters.InboxMessage);

E = function(e, t) {
    var n, r, o, i;
    n = $.extend(true, {}, e);
    if ((r = n.id) != null) {
        n.id = r.slice(0, 7);
    } else {
        n.id = undefined;
    }
    if (t != null) {
        n.before = t.slice(0, 7);
    } else {
        n.before = undefined;
    }
    n.author.avatar = Presenters.Helper.avatarFromEmail(n.author.email, 20);
    [ "added", "modified", "removed" ].forEach(function(e) {
        var t;
        return n.changes[e] = function() {
            var r, o, i, s;
            for (i = n.changes[e], s = [], r = 0, o = i.length; o > r; r++) {
                t = i[r];
                s.push(m(t, n, e));
            }
            return s;
        }();
    });
    if ((o = f(n.message)) != null) {
        i = o.split("\n\n");
    } else {
        i = undefined;
    }
    if (i.length > 1) {
        n.message = i[0], n.furthermore = i[1]
    };
    return n;
};

f = function(e) {
    if (e != null) {
        return emojimoji(e);
    }
    return e;
};

m = function(e, t, n) {
    var r, o;
    o = {
        file: e
    };
    if (t.url) {
        r = t.url.split("/commit/")[0], n !== "removed" ? o.link = r + "/blob/" + t.id + "/" + e : o.link = r + "/blob/" + t.before + "/" + e
    };
    return o;
};

D = function(e) {
    var t;
    t = e.event || b(e);
    return A[t](e);
};

h = function(e) {
    if (e.commits == null) {
        return [];
    }
    return e.commits.map(function(e) {
        return {
            author: e.author,
            url: e.url || e.link,
            id: e.id || e.sha,
            message: e.message,
            changes: {
                added: e.added || [],
                removed: e.removed || [],
                modified: e.modified || []
            }
        };
    });
};

k = function(e, t) {
    var n, r;
    if ((r = e.commits) != null) {
        n = r.length;
    } else {
        n = undefined;
    }
    if (_.isNumber(n)) {
        return Math.max(n - t, 0);
    }
    return 0;
};

C = function(e) {
    if (e.pages == null) {
        return [];
    }
    return e.pages.map(function(e) {
        return {
            title: e.title,
            url: e.html_url,
            summary: e.summary,
            action: e.action
        };
    });
};

g = function(e) {
    return e.forced && e.event === "push" && !e.created && !e.deleted && e.refType !== "tag";
};

y = function(e) {
    if (e) {
        return e.replace("//api.github.com/repos", "//github.com");
    }
    return;
};

S = function(e) {
    var t;
    if (((t = e.ref) != null ? t.split("/")[1] : undefined) === "tags") {
        return "tag";
    }
    return "branch";
};

o = function(e) {
    var t;
    if ((t = e.ref) != null) {
        return t.split("/").slice(2).join("/");
    }
    return;
};

a = function(e) {
    var t, n, r, i, s;
    i = function(e) {
        if (e === 1) {
            return "a commit";
        }
        return e + " commits";
    };
    if (o(e)) {
        n = o(e) + " ";
    } else {
        n = "";
    }
    t = {
        headline: Number((s = e.commits) != null ? s.length : undefined) > 0 ? n + "with " + i(e.commits.length) : o(e) || "",
        forced: g(e)
    };
    if (e.repository.url && e.repository.url.indexOf("https://github.com") === 0) {
        r = e.repository.url + "/tree/" + o(e);
    } else {
        r = e.repository.url;
    }
    t[S(e)] = {
        name: o(e),
        url: r
    };
    return t;
};

u = function(e) {
    var t, n;
    if (s(e)) {
        return "Deleted " + S(e) + " " + o(e);
    }
    if (i(e)) {
        return "Created " + S(e) + " " + o(e);
    }
    if (o(e)) {
        t = " " + o(e);
    } else {
        t = "";
    }
    n = "" + S(e) + t + " at " + e.repository.name + " updated";
    if (g(e)) {
        n += " (forced)"
    };
    return n;
};

M = function(e) {
    if (e.repository != null) {
        return {
            name: e.repository.name,
            url: y(e.repository.url)
        };
    }
    return;
};

r = function(e) {
    var t, n;
    t = e.sender || e.pusher || ((n = _.last(e.commits)) != null ? n.author : undefined);
    if (t) {
        return {
            name: t.login || t.name,
            email: t.email,
            link: t.email ? "mailto:" + t.email : "https://github.com/" + t.login,
            avatarUrl: t.avatar_url,
            gravatarId: t.gravatar_id
        };
    }
    return;
};

d = function(e) {
    var t;
    if (((t = e.issue.pull_request) != null ? t.html_url : undefined) != null) {
        return "Pull request";
    }
    return "Issue";
};

p = function(e) {
    var t, n;
    t = A[e.event || b(e)](e).body;
    if (t.html) {
        t = Presenters.Helper.unsafeStripHTML(t.html);
    } else {
        t = t.text;
    }
    if (e.issue) {
        n = d(e) + " # " + e.issue.number + ": " + e.issue.title;
    } else {
        n = "Commit " + e.comment.commit_id.substr(0, 10);
    }
    return n + " in " + e.repository.name + " commented by " + e.sender.login + ':\n"' + (t != null && typeof t.trim == "function" ? t.trim() : undefined) + '"';
};

b = function(e) {
    if (e.commits) {
        return "push";
    }
    if (e.comment && e.comment.commit_id) {
        return "commit_comment";
    }
    if (e.comment) {
        return "issue_comment";
    }
    if (e.pages) {
        return "gollum";
    }
    if (e.pull_request) {
        return "pull_request";
    }
    if (e.issue) {
        return "issues";
    }
    return "push";
};

x = function(e) {
    var t, n;
    n = e.pages.map(function(e) {
        return e.title;
    });
    t = _.first(n, e.pages.length - 1).join(", ") + (" & " + _.last(n));
    return {
        action: "edited wiki pages",
        headline: t,
        summary: "Edited wiki pages " + t,
        pages: C(e),
        link: y(e.repository.url + "/wiki/_pages")
    };
};

F = function(e) {
    var t;
    t = e.pages[0];
    return {
        action: t.action + " wiki page",
        headline: t.title,
        summary: l(t.action) + " wiki page " + t.title,
        pages: C(e),
        link: t.html_url
    };
};

s = function(e) {
    return e.deleted;
};

i = function(e) {
    var t;
    return e.created && ((t = e.commits) != null ? t.length : undefined) === 0;
};

A = {
    push: function(e) {
        var t, n;
        if (s(e)) {
            t = "deleted";
        } else {
            if (i(e)) {
                t = "created";
                n = e.compare;
            } else {
                t = "updated";
                if (g(e)) {
                    t += " (forced)"
                };
            }
        }
        t += " " + S(e);
        return _.extend(a(e), {
            action: t,
            commits: h(e),
            link: n
        });
    },
    gollum: function(e) {
        return (e.pages.length === 1 ? F : x)(e);
    },
    pull_request: function(e) {
        var t, n;
        if (e.action === "closed" && e.pull_request.merged) {
            t = "merged";
        } else {
            t = e.action;
        }
        n = e.pull_request;
        return {
            action: t,
            link: n.html_url,
            headline: T(n),
            summary: l(t) + " pull request " + n.number + " “" + n.title + "”",
            body: v(n),
            pullRequest: {
                title: n.title,
                number: n.number
            }
        };
    },
    issues: function(e) {
        var t;
        t = e.issue;
        return {
            action: e.action,
            link: t.html_url,
            headline: w(t),
            body: v(t),
            issue: {
                title: t.title,
                number: t.number
            }
        };
    },
    commit_comment: function(e) {
        return {
            action: "commented",
            link: e.comment.html_url,
            headline: "commit " + e.comment.commit_id.slice(0, 7),
            body: v(e.comment)
        };
    },
    issue_comment: function(e) {
        var t, n, r, o, i;
        n = e.issue;
        if (((o = n.pull_request) != null ? o.html_url : undefined) != null) {
            r = {
                title: n.title,
                number: n.number
            };
        } else {
            r = undefined;
        }
        if (r) {
            t = T(n);
        } else {
            t = w(n);
        }
        return {
            action: "commented",
            link: y(((i = e.comment) != null ? i.html_url : undefined) || e.issue.html_url || e.issue.url),
            headline: t,
            body: v(e.comment),
            pullRequest: r
        };
    }
};

A.pull_request_review_comment = A.commit_comment;

v = function(e) {
    if (e.body_html) {
        return {
            html: e.body_html
        };
    }
    if (e.body) {
        return {
            text: e.body
        };
    }
    return;
};

T = function(e) {
    return "pull request #" + e.number + ': "' + e.title + '"';
};

w = function(e) {
    return "issue #" + e.number + ': "' + e.title + '"';
};

c = function(e) {
    var t;
    t = e.body.indexOf("\n");
    if (t !== -1) {
        return e.body.substring(0, t);
    }
    return e.body;
};

N = function(e) {
    var t;
    if (e.commits) {
        return u(e);
    }
    if (e.comment) {
        return p(e);
    }
    t = e.event || b(e);
    return A[t](e).summary;
};
