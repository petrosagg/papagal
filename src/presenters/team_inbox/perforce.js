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

Presenters.TeamInbox.Perforce = function(e) {
    function Perforce(e, n) {
        this.content = n;
        Perforce.__super__.constructor.call(this, e, o(this.content));
    }
    i(Perforce, e);
    Perforce.prototype.icon = function() {
        return Flowdock.icons.svn;
    };
    return Perforce;
}(Presenters.TeamInbox.Git);

r = function(e, t) {
    var n, r;
    if ((n = e.files) != null && (r = n[t]) != null) {
        return r.map(function(e) {
            return e.file;
        });
    }
    return;
};

o = function(e) {
    return {
        ref: "refs/head/" + (e.branch || "trunk"),
        sender: e.commit.author,
        commits: [ {
            author: {
                name: e.commit.author.name,
                email: e.commit.author.email
            },
            id: e.commit.id,
            message: e.commit.message,
            added: r(e.commit, "added"),
            modified: r(e.commit, "modified"),
            removed: r(e.commit, "removed"),
            branched: r(e.commit, "branched"),
            integrated: r(e.commit, "integraged")
        } ],
        repository: e.repository
    };
};
