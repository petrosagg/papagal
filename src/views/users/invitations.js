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

Views.Chat.Invitations = function(e) {
    function Invitations() {
        return Invitations.__super__.constructor.apply(this, arguments);
    }
    r(Invitations, e);
    Invitations.prototype.tagName = "ul";
    Invitations.prototype.className = "invite-list";
    Invitations.prototype.collectionEvents = {
        add: "addInvite",
        remove: "removeInvite",
        reset: "render"
    };
    Invitations.prototype.reset = function() {
        var e, t, n, r;
        for (n = this.subviews, e = 0, t = n.length; t > e; e++) {
            r = n[e];
            if ((r != null ? r.model : void 0) != null) {
                this.removeSubview(r)
            };
        }
        return this.$el.empty();
    };
    Invitations.prototype.render = function() {
        this.reset();
        this.$el.append(this.collection.map(function(e) {
            return function(t) {
                return e.renderOne(t).$el;
            };
        }(this)));
        this.$el.html();
        return this;
    };
    Invitations.prototype.renderOne = function(e) {
        var t;
        t = this.subview(new Views.Chat.Invitation({
            model: e
        }));
        return t.render();
    };
    Invitations.prototype.addInvite = function(e) {
        return this.$el.append(this.renderOne(e).$el);
    };
    Invitations.prototype.removeInvite = function(e) {
        return this.removeSubview(e);
    };
    return Invitations;
}(Flowdock.HierarchicalView);