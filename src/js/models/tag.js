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

Models.Tag = function(e) {
    function Tag(e, n) {
        if (e != null && e.id) {
            e.id = e.id.toString().toLowerCase()
        };
        Tag.__super__.constructor.call(this, e, n);
    }
    r(Tag, e);
    Tag.regularTag = function(e) {
        return e.indexOf(":") === -1;
    };
    Tag.userTag = function(e) {
        return e.indexOf(":user:") === 0;
    };
    Tag.groupTag = function(e) {
        return e.indexOf(":group:") === 0;
    };
    Tag.inboxTag = function(e) {
        return e.indexOf("influx:") === 0;
    };
    Tag.userTagFor = function(e) {
        return ":user:" + e;
    };
    Tag.groupTagFor = function(e) {
        return ":group:" + e;
    };
    Tag.userIdFor = function(e) {
        if (Models.Tag.userTag(e) && e !== Models.Tag.userTagFor("everyone")) {
            return e.split(":")[2];
        }
        return;
    };
    Tag.stripHashes = function(e) {
        return e.replace(/^#+/, "");
    };
    Tag.special = {
        thread: ":thread"
    };
    Tag.prototype.defaults = function() {
        return {
            count: 0
        };
    };
    Tag.prototype.flow = function() {
        var e;
        return this.get("flow") || ((e = this.collection) != null ? e.flow : undefined);
    };
    Tag.prototype.type = function() {
        if (Models.Tag.regularTag(this.id)) {
            return "tag";
        }
        return this.id.split(":")[1];
    };
    Tag.prototype.increment = function(e) {
        var t;
        if (e == null) {
            e = 1
        };
        t = this.get("count") + e;
        this.set({
            count: t
        });
        return t;
    };
    Tag.prototype.decrement = function(e) {
        if (e == null) {
            e = 1
        };
        return this.increment(-e);
    };
    Tag.prototype.humanize = function() {
        var e, t, n, r, o, i, s, a, u, l;
        u = this.id;
        if (u === Models.Tag.userTagFor("everyone")) {
            return "@everyone";
        }
        if (u === Models.Tag.userTagFor("team")) {
            return "@team";
        }
        if (Models.Tag.userTag(u)) {
            o = u.split(":");
            t = o[0];
            r = o[1];
            n = o[2];
            if ((i = this.flow()) != null) {
                l = i.users.get(n);
            } else {
                l = undefined;
            }
            if (l != null) {
                return "@" + l.get("nick");
            }
        } else if (Models.Tag.groupTag(u)) {
            s = u.split(":");
            t = s[0];
            r = s[1];
            n = s[2];
            if ((a = this.flow()) != null) {
                e = a.groups.get(n);
            } else {
                e = undefined;
            }
            if (e != null) {
                return "@@" + e.get("handle");
            }
        } else if (Models.Tag.regularTag(u)) {
            return "#" + u;
        }
    };
    Tag.prototype.humanizeSpecial = function() {
        switch (this.id) {
          case ":thread":
            return "Threads";

          case ":url":
            return "Links";
        }
        if (this.id.startsWith(':papagal:star:')) {
            return "Starred"
        }
    };
    Tag.prototype.isAtMention = function() {
        var e;
        e = this.humanize();
        return e && e[0] === "@";
    };
    Tag.prototype.toString = function() {
        return this.humanize() || this.humanizeSpecial();
    };
    return Tag;
}(Backbone.Model);
