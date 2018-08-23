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

Presenters.TeamInbox.Kiln = function(e) {
    function Kiln(e, n) {
        this.content = n;
        Kiln.__super__.constructor.call(this, e, o(this.content));
    }
    i(Kiln, e);
    Kiln.prototype.icon = function() {
        return Flowdock.icons.kiln;
    };
    Kiln.prototype.linkTitle = function() {
        return "Open in Kiln";
    };
    return Kiln;
}(Presenters.TeamInbox.Git);

r = function(e) {
    var t;
    t = _.last(e.commits || []);
    if (t != null) {
        return t.branch;
    }
    return;
};

o = function(e) {
    var t;
    return _.extend(e, {
        ref: "refs/head/" + r(e),
        commits: (t = e.commits) != null ? t.map(function(e) {
            return _.extend(e, {
                added: [],
                modified: [],
                removed: []
            });
        }) : void 0
    });
};
