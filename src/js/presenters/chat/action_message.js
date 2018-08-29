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

Presenters.ChatMessage.Action = function(e) {
    function Action() {
        return Action.__super__.constructor.apply(this, arguments);
    }
    r(Action, e);
    Action.prototype.body = function() {
        return Presenters.Helper.render("body", {
            body: this.description()
        });
    };
    Action.prototype.summary = function() {
        var e;
        e = this.description();
        if (e.html != null) {
            return Presenters.Helper.unsafeStripHTML(e.html);
        }
        return e.text;
    };
    Action.prototype.description = function() {
        var e, t, n, r;
        e = this.content.type;
        r = this.getTypeObj(e);
        n = this.content[r.field];
        t = this.descriptionFormatter(e, n, this.data, this.content);
        return r.description(t);
    };
    Action.prototype.getTypeObj = function(e) {
        var t;
        t = {
            "user-edit": {
                field: "user",
                description: function(e) {
                    return {
                        text: e.name + " is now known as " + e.nick
                    };
                }
            },
            add_people: {
                field: "message",
                description: function(e) {
                    return {
                        text: "Added " + e + " to the flow."
                    };
                }
            },
            join: {
                description: function() {
                    return {
                        text: "Joined the flow."
                    };
                }
            },
            invite: {
                field: "email",
                description: function(e) {
                    return {
                        html: "Invited " + e + " to the flow."
                    };
                }
            },
            decline: {
                field: "email",
                description: function(e) {
                    return {
                        html: e + " declined invitation to the flow."
                    };
                }
            },
            uninvite: {
                field: "email",
                description: function(e) {
                    return {
                        html: "Canceled invite for " + e + "."
                    };
                }
            }
        };
        return t[e];
    };
    Action.prototype.descriptionFormatter = function(e, t, n, r) {
        var o, i;
        o = function(e) {
            return Presenters.Helper.render("shared/emailLink", {
                name: e,
                email: e
            }).trim();
        };
        i = {
            add_people: function(e) {
                var t, n;
                n = e;
                if (n.length === 1) {
                    return n[0];
                }
                if (n.length === 2) {
                    return n.join(" and ");
                }
                t = n.pop();
                return n.join(", ") + " and " + t;
            },
            invite: o,
            uninvite: o,
            decline: o
        };
        return (typeof i[e] == "function" ? i[e](t, n, r) : undefined) || t;
    };
    return Action;
}(Presenters.ChatMessage);
