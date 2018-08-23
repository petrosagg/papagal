var r, o, i = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

o = require("../lib/markdown");

Helpers.TagHelper = {};

r = function(e) {
    var t, n, r, o, i, s, a, u;
    for (n = 0, o = e.length; o > n; n++) {
        u = e[n];
        if (u.type === "inline") {
            for (s = u.children, r = 0, i = s.length; i > r; r++) {
                t = s[r];
                if ((a = t.type) === "link_open") {
                    return !0;
                }
            }
        }
    }
    return !1;
};

Helpers.TagHelper.parseTags = function(e, t) {
    var n, s, a, u, l, c, p, d, h, f, m, g, v, b, y;
    n = function(e) {
        return e.get("nick") && e.get("nick").length > 0 && 0 !== e.get("id") && !e.get("disabled");
    };
    s = function(e) {
        return e.get("id") === t.me().get("id");
    };
    g = [];
    h = t.me().toJSON();
    b = o.parse(e);
    f = o.tags(b);
    d = function() {
        var e, t, n;
        for (n = [], e = 0, t = f.length; t > e; e++) {
            m = f[e];
            if (m[0] === "#") {
                n.push(m.slice(1))
            };
        }
        return n;
    }();
    p = function() {
        var e, t, n;
        for (n = [], e = 0, t = f.length; t > e; e++) {
            m = f[e];
            if (m[0] === "@" && "@" !== m[1]) {
                n.push(m)
            };
        }
        return n;
    }();
    t.groups ? (u = function() {
        var e, t, n;
        for (n = [], e = 0, t = f.length; t > e; e++) {
            m = f[e];
            if (m.slice(0, 2) === "@@") {
                n.push(m.slice(2).toLowerCase())
            };
        }
        return n;
    }(), c = t.groups.models.filter(function(e) {
        var t;
        t = e.get("handle").toLowerCase();
        return i.call(u, t) >= 0;
    }), l = Object.keys(c.reduce(function(e, t) {
        return e.concat(t.get("members"));
    }, []).reduce(function(e, t) {
        e[t.id] = !0;
        return e;
    }, {}))) : (c = [], l = []);
    y = function(e) {
        var t;
        t = e.id.toString();
        return i.call(l, t) >= 0;
    };
    d.forEach(function(e) {
        if (_.contains(g, e.toLowerCase())) {
            return void 0;
        }
        return g.push(e);
    });
    if (r(b)) {
        g.push(":url")
    };
    if (c.length) {
        c.forEach(function(e) {
            return g.push(Models.Tag.groupTagFor(e.id));
        })
    };
    a = FlowdockText.mentionsTags(p, Collections.Tags.everyoneTags);
    if (a) {
        g.push(":user:everyone")
    };
    v = FlowdockText.mentionsTags(p, Collections.Tags.teamTags);
    if (v) {
        g.push(":user:team")
    };
    t.users.filter(n).forEach(function(e) {
        var t, n, r, o, i;
        n = FlowdockText.mentionsUser(p, e.nick());
        t = y(e);
        if (n) {
            g.push(":user:" + e.id)
        };
        r = a && e.get("in_flow");
        i = v && e.get("in_flow") && e.get("team_notifications");
        o = t && e.get("in_flow");
        if (!s(e) && (n || r || i || o)) {
            return g.push(":unread:" + e.id);
        }
        return;
    });
    return g.filter(function(e) {
        return "@" !== e[0];
    });
};

Helpers.TagHelper.textualize = function(e) {
    return _.compact(e.tags().map(function(e) {
        return e.humanize();
    })).join(", ");
};

Helpers.TagHelper.textualizeChange = function(e, t, n) {
    var r, o, i, s;
    t || (t = e.previousTags());
    o = function(e) {
        return e.filter(function(e) {
            return e.humanize();
        });
    };
    r = o(t.add);
    s = o(t.remove);
    i = function(e, t, n) {
        if (n.length > 0) {
            return t + " " + n.map(function(e) {
                return e.humanize();
            }).join(", ");
        }
        return;
    };
    if (r.length > 0 || s.length > 0) {
        return _.compact([ n.get("nick"), i("add", "added", r), i("remove", "removed", s) ]).join(" ");
    }
    return;
};
