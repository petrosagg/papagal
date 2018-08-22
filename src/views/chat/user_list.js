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

o = require("react");

r = o.createFactory(require("components/user_list/list"));

Views.Chat.UserList = function(e) {
    function UserList() {
        return UserList.__super__.constructor.apply(this, arguments);
    }
    i(UserList, e);
    UserList.prototype.collectionEvents = {
        "change add remove": "render"
    };
    UserList.prototype._flowUser = function() {
        if (Flowdock.app.user) {
            return this.collection.get(Flowdock.app.user.id);
        }
        return;
    };
    UserList.prototype.initialize = function(e) {
        var t;
        this.listenTo(this.flow, "change:team_notifications", this.render);
        this.listenTo(this.flow, "change:access_mode", this.render);
        t = Flowdock.app.user.id;
        return this.flow.fullyLoaded.then(function(e) {
            return function() {
                e.render();
                return e.listenTo(e._flowUser(), "change", e.render);
            };
        }(this));
    };
    UserList.prototype.render = function() {
        var e, t;
        if ((e = this._flowUser()) && (t = this.collection)) {
            this.component(this.$el[0], r({
                organization: this.flow.get("organization").name,
                inviteOnly: this.flow.get("access_mode") === "invitation",
                onClose: function(e) {
                    return function() {
                        return e.close();
                    };
                }(this),
                onInvite: function(e) {
                    return function() {
                        return e.openUserSettings();
                    };
                }(this),
                saveStatus: function(e) {
                    return function(t) {
                        var n;
                        n = e.flow.buildMessage({
                            event: "status",
                            content: t
                        }, Models.ChatMessage);
                        return n.save();
                    };
                }(this),
                me: {
                    status: e.get("status"),
                    model: e,
                    inTeam: this.flow.receivesTeamNotifications()
                },
                users: t,
                invitations: this.flow.invitations
            }))
        };
        return this;
    };
    UserList.prototype.close = function() {
        return this.trigger("close:user:list");
    };
    UserList.prototype.openUserSettings = function() {
        return Flowdock.app.manager.openFlowSettings(this.flow, "preferences?add_people=true");
    };
    return UserList;
}(Flowdock.HierarchicalView);