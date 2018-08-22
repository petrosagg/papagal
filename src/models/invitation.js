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

Models.Invitation = function(e) {
    function Invitation() {
        return Invitation.__super__.constructor.apply(this, arguments);
    }
    r(Invitation, e);
    Invitation.prototype.url = function() {
        if (this.get("url")) {
            return Helpers.apiUrl(this.get("url"));
        }
        return Invitation.__super__.url.apply(this, arguments);
    };
    Invitation.prototype.resend = function(e) {
        return $.post(this.collection.url(), {
            email: this.get("email")
        }, function(t) {
            if (e != null && e.success) {
                return e.success(t);
            }
            return;
        }).error(function(t) {
            if (e != null && e.error) {
                return e.error(t);
            }
            return;
        });
    };
    return Invitation;
}(Backbone.Model);