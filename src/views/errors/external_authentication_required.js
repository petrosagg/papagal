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

require("./inline");

Views.Errors.ExternalAuthenticationRequired = function(e) {
    function ExternalAuthenticationRequired() {
        return ExternalAuthenticationRequired.__super__.constructor.apply(this, arguments);
    }
    r(ExternalAuthenticationRequired, e);
    ExternalAuthenticationRequired.prototype.errorName = "external-authentication-required";
    ExternalAuthenticationRequired.prototype.events = _.extend({}, Views.Errors.Inline.prototype.events, {
        "click .authenticate": "onAuthenticationClick"
    });
    ExternalAuthenticationRequired.prototype.initialize = function() {
        return this.popups = [];
    };
    ExternalAuthenticationRequired.prototype.destructor = function() {
        var e, n, r, o, i;
        for (ExternalAuthenticationRequired.__super__.destructor.apply(this, arguments), 
        o = this.popups, i = [], e = 0, n = o.length; n > e; e++) {
            r = o[e];
            i.push(r.destructor());
        }
        return i;
    };
    ExternalAuthenticationRequired.prototype.onAuthenticationClick = function() {
        var e;
        e = new Views.Shared.Popup(this.model.url, "external-wizard", {
            name: "Authentication wizard"
        });
        this.popups.push(e);
        e.open();
        this.remove();
        return !1;
    };
    return ExternalAuthenticationRequired;
}(Views.Errors.Inline);