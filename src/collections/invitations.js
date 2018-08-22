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

Collections.Invitations = function(e) {
    function Invitations() {
        return Invitations.__super__.constructor.apply(this, arguments);
    }
    r(Invitations, e);
    Invitations.prototype.model = Models.Invitation;
    Invitations.prototype.url = function() {
        return Helpers.apiUrl(this.flow.get("_links").invitations.href);
    };
    Invitations.prototype.initialize = function() {
        return this.subscriptions = [];
    };
    Invitations.prototype.consume = function(e) {
        if (this.stream) {
            throw new Error("Invitations collection is already subscribed to a stream");
        }
        this.stream = e.filter(function(e) {
            return function(t) {
                return t.flow === e.flow.id;
            };
        }(this));
        this.addStream(this.stream.filter(function(e) {
            return e.event === "action" && e.content.type === "invite";
        }).onValue(function(e) {
            return function(t) {
                return e.addInvite(e.emailFromInvite(t));
            };
        }(this)));
        this.addStream(this.stream.filter(function(e) {
            return e.event === "action" && e.content.type === "uninvite";
        }).onValue(function(e) {
            return function(t) {
                return e.removeInvite(e.emailFromInvite(t));
            };
        }(this)));
        return this.addStream(this.stream.filter(function(e) {
            return e.event === "backend.join.user";
        }).onValue(function(e) {
            return function(t) {
                return e.removeInvite(t.content.user.email);
            };
        }(this)));
    };
    Invitations.prototype.addInvite = function(e) {
        return this.fetch({
            update: !0
        });
    };
    Invitations.prototype.removeInvite = function(e) {
        return this.remove(this.where({
            email: e
        }));
    };
    Invitations.prototype.emailFromInvite = function(e) {
        return e.content.recipient_email;
    };
    Invitations.prototype["import"] = function(e) {
        return $.post(this.url() + "/import", e);
    };
    return Invitations;
}(Flowdock.Collection);