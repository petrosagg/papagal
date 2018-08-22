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

Views.Shared.UserList = function(e) {
    function UserList() {
        return UserList.__super__.constructor.apply(this, arguments);
    }
    r(UserList, e);
    UserList.prototype.tagName = "ul";
    UserList.prototype.className = "user-list";
    UserList.prototype.collectionEvents = {
        add: "renderUser",
        remove: "destroyUser",
        reset: "render"
    };
    UserList.prototype.initialize = function(e) {
        this.opts = e != null ? e : {
            avatarOnly: !1
        };
    };
    UserList.prototype.render = function() {
        var e, t, n, r;
        for (n = this.subviews.slice(0), e = 0, t = n.length; t > e; e++) {
            r = n[e];
            this.removeSubview(r, {
                removeDomElement: !1
            });
        }
        this.$el.empty().append(this.collection.map(function(e) {
            return function(t) {
                return e.subview(new Views.Chat.User({
                    model: t,
                    avatarOnly: e.opts.avatarOnly
                })).render().el;
            };
        }(this)));
        return this;
    };
    UserList.prototype.renderUser = function(e) {
        var t, n;
        t = this.collection.indexOf(e);
        n = this.subview(new Views.Chat.User({
            model: e,
            avatarOnly: this.opts.avatarOnly
        }));
        if (t >= this.collection.length - 1) {
            return this.$el.append(n.render().$el);
        }
        if (t > 0) {
            return this.$(".user").eq(t - 1).after(n.render().$el);
        }
        return this.$el.prepend(n.render().$el);
    };
    UserList.prototype.destroyUser = function(e) {
        return this.removeSubview(e);
    };
    return UserList;
}(Flowdock.HierarchicalView);
