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

Models.Organization = function(e) {
    function Organization() {
        return Organization.__super__.constructor.apply(this, arguments);
    }
    r(Organization, e);
    Organization.prototype.url = Helpers.apiUrl("/organizations");
    Organization.prototype.link = function(e) {
        var t;
        if ((t = this.get("_links")[e]) != null) {
            return t.href;
        }
        return;
    };
    Organization.prototype.userLimit = function() {
        return Bacon.combineAsArray([ this.asEventStream("change:user_count").map(function(e) {
            return function() {
                return e.get("user_count");
            };
        }(this)).toProperty(this.get("user_count")), this.asEventStream("change:user_limit").map(function(e) {
            return function() {
                return e.get("user_limit");
            };
        }(this)).toProperty(this.get("user_limit")) ]);
    };
    Organization.prototype.updateIfStale = function() {
        if ((this.updated == null || this.updated < new Date().getTime() - 3e5) && !this.fetching) {
            return this.fetch();
        }
        return;
    };
    Organization.prototype.consume = function(e) {
        return this._bacon = e.filter(function(e) {
            return function(t) {
                var n, r;
                return ((n = t.flow) != null ? n.indexOf(e.get("id")) : undefined) === 0 && t.event === "action" && ((r = t.content.type) === "invite" || r === "uninvite");
            };
        }(this)).onValue(function(e) {
            return function() {
                delete e.updated;
                return e.trigger("needsUpdate", e);
            };
        }(this));
    };
    Organization.prototype.cleanup = function() {
        if (typeof this._bacon == "function") {
            return this._bacon();
        }
        return;
    };
    Organization.prototype.fetch = function() {
        var e;
        this.fetching = true;
        e = Organization.__super__.fetch.apply(this, arguments);
        e.always(function(e) {
            return function() {
                e.fetching = false;
                return e.updated = new Date().getTime();
            };
        }(this));
        return e;
    };
    Organization.prototype.validate = function(e, t) {
        var n, r, o, i, s;
        n = {};
        n.name = [];
        n.subdomain = [];
        n.reCAPTCHA = [];
        if (!e.name) {
            n.name.push("must be specified")
        };
        if (!e.subdomain) {
            n.subdomain.push("must be specified")
        };
        if (((r = e.name) != null ? r.length : undefined) > 65) {
            n.name.push("is too long (max length 65)")
        };
        if (((o = e.name) != null ? o.length : undefined) < 3) {
            n.name.push("is too short (min length 3)")
        };
        if (((i = e.subdomain) != null ? i.length : undefined) > 65) {
            n.subdomain.push("is too long (max length is 65)")
        };
        if (((s = e.subdomain) != null ? s.length : undefined) < 3) {
            n.subdomain.push("is too short (min length is 3)")
        };
        if (!/^[a-z0-9]{1}[a-z0-9-]*$/.test(e.subdomain)) {
            n.subdomain.push("has invalid format. Only alphanumeric characters and hyphens (-) allowed. May not begin with a hyphen.")
        };
        if (!e["g-recaptcha-response"]) {
            n.reCAPTCHA.push("needs to be entered")
        };
        if (n.name.length > 0 || n.subdomain.length > 0 || n.reCAPTCHA.length > 0) {
            return {
                message: "Validation error",
                errors: n
            };
        }
        return;
    };
    Organization.prototype.flows = function() {
        return Flowdock.app.flows.filter(function(e) {
            return function(t) {
                return t.get("organization").id === e.id;
            };
        }(this));
    };
    Organization.prototype.users = function() {
        return new Collections.Users(this.get("users"));
    };
    return Organization;
}(Backbone.Model);
