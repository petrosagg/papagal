var r, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

r = React.createFactory(require("components/users/avatar_list"));

Views.Toolbar.Desktop = function(e) {
    function Desktop() {
        return Desktop.__super__.constructor.apply(this, arguments);
    }
    o(Desktop, e);
    Desktop.prototype.initialize = function() {
        Desktop.__super__.initialize.apply(this, arguments);
        return this.avatarList = null;
    };
    Desktop.prototype.renderAvatarList = function() {
        return this.avatarList = this.component(this.$(".avatar-list-item")[0], r({
            onlineUsers: this.sortedOnlineUsers(this.model.users)
        }));
    };
    Desktop.prototype.onAttach = function() {
        return this.renderAvatarList();
    };
    Desktop.prototype.onDetach = function() {
        var e;
        if (this.avatarList) {
            e = this.$(".avatar-list-item");
            this.destroyComponent(e[0]);
            e.empty();
            return this.avatarList = null;
        }
        return;
    };
    Desktop.prototype.onAfterRender = function() {
        Desktop.__super__.onAfterRender.apply(this, arguments);
        return this.renderAvatarList();
    };
    Desktop.prototype.destructor = function() {
        Desktop.__super__.destructor.apply(this, arguments);
        return this.avatarList = null;
    };
    Desktop.prototype.sortedOnlineUsers = function(e) {
        return e.usersPropertyByState("active", "idle").map(function(e) {
            var t;
            t = _.find(e, function(e) {
                return e.id === Flowdock.app.user.id;
            });
            if (t) {
                return _.without(e, t).concat([ t ]);
            }
            return e;
        }).map(function(e) {
            return e.slice(0, 45);
        });
    };
    return Desktop;
}(Views.Toolbar);