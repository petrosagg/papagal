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

Views.Shared.Avatar = function(e) {
    function Avatar() {
        return Avatar.__super__.constructor.apply(this, arguments);
    }
    r(Avatar, e);
    Avatar.prototype.className = "avatar";
    Avatar.prototype.events = {
        dblclick: "openPrivateChat",
        click: "toggleUserCard"
    };
    Avatar.prototype.modelEvents = {
        "change:avatar": "onAvatarChange"
    };
    Avatar.prototype.initialize = function(e) {
        this.size = e.size;
        return this.avatarOnly = e.avatarOnly;
    };
    Avatar.prototype.openPrivateChat = function() {
        if (this.model.canChatWith(this.model.collection.flow.me()) && (Flowdock.app.router.navigateTo({
            private: this.model
        }), this.userCardOpen())) {
            return this.userCard.destructor();
        }
        return;
    };
    Avatar.prototype.onAvatarChange = function() {
        var e;
        e = "url(" + this.model.get("avatar") + this.size + ")";
        if (this.$el.css("background-image") !== e) {
            return this.$el.css("background-image", e);
        }
        return;
    };
    Avatar.prototype.render = function() {
        this.onAvatarChange();
        return this;
    };
    Avatar.prototype.userCardOpen = function() {
        return this.userCard != null;
    };
    Avatar.prototype.toggleUserCard = function() {
        if (!this.avatarOnly || this.userCardOpen() || Flowdock.mobile) {
            return void 0;
        }
        this.userCard = new Views.Chat.UserCard({
            model: this.model,
            me: this.model.collection.flow.me()
        });
        this.userCard.once("destructor", function(e) {
            return function() {
                return e.userCard = void 0;
            };
        }(this));
        return this.placeUserCard(this.userCard.render({
            alignTop: !1
        }));
    };
    Avatar.prototype.getPosition = function() {
        return this.$el.offset();
    };
    Avatar.prototype.placeUserCard = function(e) {
        var t, n, r, o, i, s;
        $("body").append(e.$el.css({
            visibility: "hidden"
        }));
        s = e.$el.width();
        o = e.$el.height();
        t = this.$el.height();
        r = this.$el.width();
        n = this.getPosition();
        i = {
            top: n.top + t > $(window).height() ? n.top - o : n.top + t,
            left: n.left + s > $(window).width() ? n.left + r - s : n.left
        };
        return e.$el.css({
            top: i.top + "px",
            left: i.left + "px",
            visibility: "visible"
        });
    };
    return Avatar;
}(Flowdock.HierarchicalView);
