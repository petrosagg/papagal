var r, o, i, s, a = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (u.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, u = {}.hasOwnProperty;

Presenters.TeamInbox.Mercurial = function(e) {
    function Mercurial(e, n) {
        this.content = n;
        Mercurial.__super__.constructor.call(this, e, s(this.content));
    }
    a(Mercurial, e);
    Mercurial.prototype.icon = function() {
        return Flowdock.icons.mercurial;
    };
    Mercurial.prototype.linkTitle = function() {
        if (this.event === "mercurial") {
            return "Open in Bitbucket";
        }
        return "Open original";
    };
    return Mercurial;
}(Presenters.TeamInbox.Git);

r = function(e) {
    return {
        email: (e.match(/<(.*)>/) || [])[1],
        name: e.match(/^([^<]*)/)[0].trim()
    };
};

o = function(e, t) {
    var n;
    if ((n = e.files) != null) {
        return n.filter(function(e) {
            return e.type.toString() === t.toString();
        }).map(function(e) {
            return e.file;
        });
    }
    return;
};

i = function(e) {
    var t;
    t = _.last(e.commits || []);
    return (t != null ? t.branch : void 0) || "";
};

s = function(e) {
    var t;
    return _.extend(e, {
        ref: "refs/head/" + i(e),
        commits: (t = e.commits) != null ? t.map(function(e) {
            return _.extend(e, {
                author: r(e.raw_author),
                url: e.link,
                id: e.raw_node,
                added: o(e, "added"),
                modified: o(e, "modified"),
                removed: o(e, "removed")
            });
        }) : void 0
    });
};