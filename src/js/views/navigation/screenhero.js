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

Views.Navigation.Screenhero = function(t) {
    function Screenhero() {
        return Screenhero.__super__.constructor.apply(this, arguments);
    }
    r(Screenhero, t);
    Screenhero.prototype.id = "screenhero-overlay";
    Screenhero.prototype.events = {
        "click #make-call": "retryCall",
        "click .close": "close"
    };
    Screenhero.prototype.initialize = function(e) {
        this.user = e != null ? e.user : undefined;
        this.useVoice = e != null ? e.useVoice : undefined;
        this.message = "Calling…";
        this.callSucceeded = false;
        this.isCalling = true;
        this.makeCall();
        return Screenhero.__super__.initialize.apply(this, arguments);
    };
    Screenhero.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/overlays/screenhero.mustache"))({
            toUser: this.user.nick(),
            message: this.message,
            isCalling: this.isCalling,
            callSucceeded: this.callSucceeded
        }));
        return this;
    };
    Screenhero.prototype.makeCall = function() {
        var e;
        return this.request = $.post("/rest/screenhero", {
            user: (e = this.user) != null ? e.id : undefined,
            voice: this.useVoice
        }).fail(function(e) {
            return function(t, n, r) {
                var o;
                if (((o = t.responseJSON) != null ? o.message : undefined) != null) {
                    return e.failed(t.responseJSON.message);
                }
                return e.failed("Unable to initiate a Screenhero call: " + r);
            };
        }(this)).done(function(e) {
            return function() {
                return e.succeeded();
            };
        }(this));
    };
    Screenhero.prototype.retryCall = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        if (this.callSucceeded) {
            return void this.close();
        }
        this.isCalling = true;
        this.message = "Calling…";
        this.render();
        return this.makeCall();
    };
    Screenhero.prototype.succeeded = function() {
        this.callSucceeded = true;
        this.isCalling = false;
        this.message = "Connected!";
        return this.render();
    };
    Screenhero.prototype.failed = function(e) {
        this.isCalling = false;
        this.message = e;
        return this.render();
    };
    Screenhero.prototype.close = function() {
        var e;
        if ((e = this.request) != null) {
            e.abort()
        };
        Screenhero.__super__.close.apply(this, arguments);
        return this.navigateToFlow();
    };
    return Screenhero;
}(Views.Shared.Overlay);
