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

Models.User = function(e) {
    function User() {
        return User.__super__.constructor.apply(this, arguments);
    }
    r(User, e);
    User.prototype.url = function() {
        return Helpers.apiUrl("/users/" + this.id);
    };
    User.prototype.cleanup = function() {
        if (this.unsubscribe) {
            return this.unsubscribe();
        }
        return;
    };
    User.prototype.consume = function(e) {
        this.cleanup();
        return this.unsubscribe = e.filter(function(e) {
            return e.event === "user-edit";
        }).filter(function(e) {
            return function(t) {
                return t.content.user.id === e.id;
            };
        }(this)).onValue(function(e) {
            return function(t) {
                return e.set(t.content.user);
            };
        }(this));
    };
    User.prototype.isOnline = function() {
        var e;
        return (e = this.presence()) === "active" || e === "idle";
    };
    User.prototype.flowGroups = function() {
        var e, t;
        if ((e = Flowdock.app) != null && (t = e.flows) != null) {
            return t.models.reduce(function(e, t) {
                return e.concat(t.groups.models);
            }, []).filter(function(e) {
                return function(t) {
                    return t.isMember(e);
                };
            }(this));
        }
        return;
    };
    User.prototype.nick = function() {
        return this.get("nick");
    };
    User.prototype.presenceModel = function() {
        var e, t;
        if ((e = Flowdock.app) != null && (t = e.presence) != null) {
            return t.user(this.id);
        }
        return;
    };
    User.prototype.presence = function() {
        var e;
        return ((e = this.presenceModel()) != null ? e.state() : void 0) || "unknown";
    };
    User.prototype.canChatWith = function(e) {
        if (e.external()) {
            return !1;
        }
        if (e.id.toString() === this.id.toString()) {
            return !1;
        }
        return !0;
    };
    User.prototype.avatar = function(e) {
        if (e == null) {
            e = 80
        };
        return this.get("avatar") + e;
    };
    User.prototype.external = function() {
        return this.id === "0";
    };
    User.prototype.block = function(e) {
        if (e == null) {
            e = {}
        };
        if (e.flow) {
            return this.updateFlowUser({
                disabled: !0
            }, e);
        }
        return;
    };
    User.prototype.updateFlowUser = function(e, t) {
        return $.ajax({
            url: t.flow.url() + "/users/" + this.id,
            type: "PUT",
            data: e,
            success: function(e) {
                if (t.success) {
                    return t.success(e);
                }
                return;
            },
            error: function(e) {
                if (t.error) {
                    return t.error(e);
                }
                return;
            }
        });
    };
    User.prototype.enabled = function() {
        return !this.get("disabled");
    };
    User.prototype.available = function() {
        return this.enabled() && this.get("in_flow");
    };
    return User;
}(Backbone.Model);

Models.ExternalUser = function(e) {
    function ExternalUser() {
        return ExternalUser.__super__.constructor.apply(this, arguments);
    }
    r(ExternalUser, e);
    ExternalUser.prototype.defaults = {
        id: "0",
        nick: "Flowdock",
        avatar: Helpers.assetPath("/avatars/default/")
    };
    ExternalUser.prototype.external = function() {
        return !0;
    };
    ExternalUser.prototype.canChatWith = function(e) {
        return !1;
    };
    ExternalUser.prototype.consume = function() {};
    return ExternalUser;
}(Models.User);

Models.DefaultUser = function(e) {
    function DefaultUser() {
        return DefaultUser.__super__.constructor.apply(this, arguments);
    }
    r(DefaultUser, e);
    DefaultUser.prototype.defaults = {
        id: "0",
        name: "Team Flowdock",
        nick: "Flowdock",
        status_message: null,
        email: "team@flowdock.com",
        avatar: Helpers.assetPath("/avatars/9e6f7168611d249b28bbd84dc60cb194/"),
        disabled: !0
    };
    DefaultUser.prototype.canChatWith = function(e) {
        return !1;
    };
    return DefaultUser;
}(Models.ExternalUser);
