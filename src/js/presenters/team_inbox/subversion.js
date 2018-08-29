var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

Presenters.TeamInbox.Subversion = function(e) {
    function Subversion(e, n) {
        this.content = n;
        Subversion.__super__.constructor.call(this, e, o(this.content));
    }
    i(Subversion, e);
    Subversion.prototype.icon = function() {
        return Flowdock.icons.svn;
    };
    return Subversion;
}(Presenters.TeamInbox.Git);

r = function(e, t) {
    var n, r;
    if ((n = e.changes) != null && (r = n[t]) != null) {
        return r.map(function(e) {
            return e.path;
        });
    }
    return;
};

o = function(e) {
    var t, n, o;
    t = e.revision_url ? e.revision_url.replace(/:revision/, e.revision) : undefined;
    _.extend(e, {
        ref: "refs/head/" + (e.branch || "trunk"),
        sender: e.author,
        created: e.action === "branch_create",
        deleted: e.action === "branch_delete",
        commits: [ {
            author: {
                name: e.author.name,
                email: e.author.email
            },
            url: t,
            id: e.revision,
            message: e.message,
            added: r(e, "added"),
            modified: r(e, "modified"),
            removed: r(e, "removed")
        } ]
    });
    if (e.created || e.deleted) {
        e.compare = (n = e.commits) != null && (o = n[0]) != null ? o.url : undefined, e.commits = []
    };
    return e;
};
