var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, o = function(e, t) {
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

Views.NewOrganization = function(t) {
    function NewOrganization() {
        this.onError = r(this.onError, this);
        this.onSuccess = r(this.onSuccess, this);
        return NewOrganization.__super__.constructor.apply(this, arguments);
    }
    o(NewOrganization, t);
    NewOrganization.prototype.id = "new-organization";
    NewOrganization.prototype.events = {
        "click .edit-subdomain": "showEditSubdomain",
        "click .close": "close",
        "click .switch-accounts": "logout"
    };
    NewOrganization.prototype.render = function() {
        this.collection.ready.done(function(t) {
            return function() {
                var n;
                n = t.collection.active().length !== 0;
                if (t.loader) {
                    t.removeLoader()
                };
                t.$el.html(Helpers.renderTemplate(require("../templates/dialogs/new_organization_dialog.mustache"))({
                    host: "flowdock.com",
                    user: Flowdock.app.user.toJSON(),
                    noOrganizations: t.collection.length === 0,
                    canBeDismissed: n,
                    expiredOrganizations: _.map(t.collection.where({
                        active: false
                    }), function(e) {
                        var t;
                        if (e.get("subscription").trial) {
                            t = "Your trial has expired";
                        } else {
                            t = e.get("subscription").error || "Your payments have been canceled";
                        }
                        return _.extend(e.toJSON(), {
                            reason: t
                        });
                    })
                }, {
                    noEnabledOrganizations: require("../templates/dialogs/no_enabled_organizations.mustache")
                }));
                t.eventHandlers();
                if (n) {
                    return undefined;
                }
                return t.disableDialogDismissal();
            };
        }(this));
        return this;
    };
    NewOrganization.prototype.destructor = function() {
        var e, t;
        NewOrganization.__super__.destructor.apply(this, arguments);
        if ((e = this.model) != null && e.get("id")) {
            return undefined;
        }
        if ((t = this.model) != null) {
            return t.destroy();
        }
        return;
    };
    NewOrganization.prototype.showEditSubdomain = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        this.$(".subdomain").addClass("editing");
        return this.$("input[name=subdomain-name]").focus();
    };
    NewOrganization.prototype.eventHandlers = function() {
        var e, t, n, r, o, i;
        o = this.valueFrom(this.$("input[name=subdomain-name]"));
        i = this.$("form").asEventStream("submit").doAction(".preventDefault");
        e = this.valueFrom(this.$("input[name=organization-name]"));
        r = e.map(this.nameToSubdomain).takeUntil(o);
        t = Bacon.combineTemplate({
            name: e,
            subdomain: r.merge(o)
        });
        n = t.sampledBy(i).map(this.newOrganization).flatMapLatest(function(e) {
            return function(t) {
                var n;
                e.model = t;
                e.model.set({
                    "g-recaptcha-response": e.$("#g-recaptcha-response").val()
                }, {
                    silent: true
                });
                n = e.model.save();
                if (n) {
                    e.spin();
                    return Bacon.fromPromise(n);
                }
                return Bacon.once(new Bacon.Error(e.model.validationError));
            };
        }(this));
        this.addStream(r.assign(this.$(".email-example .organization-part"), "text"));
        this.addStream(r.assign(this.$("input[name=subdomain-name]"), "val"));
        this.addStream(n.onValue(this.onSuccess));
        return this.addStream(n.onError(this.onError));
    };
    NewOrganization.prototype.newOrganization = function(e) {
        return new Models.Organization(e);
    };
    NewOrganization.prototype.onSuccess = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.organizations_add);
        this.collection.add(this.model);
        return this.close();
    };
    NewOrganization.prototype.onError = function(t) {
        var n;
        if (t.responseText) {
            n = JSON.parse(t.responseText);
        } else {
            n = t;
        }
        this.$(".validation-errors").html(Helpers.renderTemplate(require("../templates/dialogs/new_organization_dialog_errors.mustache"))(this.errors(n)));
        return this.unspin();
    };
    NewOrganization.prototype.errors = function(e) {
        var t;
        t = function(t) {
            var n, r, o, i, s;
            n = [];
            for (o in t) {
                s = t[o];
                if (s.length > 0) {
                    for (r = 0, i = s.length; i > r; r++) {
                        e = s[r];
                        n.push({
                            message: Helpers.capitalize(o) + " " + e
                        });
                    }
                }
            }
            return n;
        };
        return {
            message: e.message,
            errors: t(e.errors)
        };
    };
    NewOrganization.prototype.valueFrom = function(e) {
        return e.asEventStream("input").map(function() {
            return e.val();
        });
    };
    NewOrganization.prototype.nameToSubdomain = function(e) {
        e = e.toLowerCase().trim().replace(/[^a-z0-9]/g, "-");
        return e.replace(/^-{1,}/, "").replace(/-{1,}/g, "-");
    };
    NewOrganization.prototype.spin = function() {
        this.$(".create-organization").prop("disabled", true);
        this.spinner = new Views.Shared.Progress();
        return this.$("form").append(this.spinner.render().el);
    };
    NewOrganization.prototype.unspin = function() {
        var e;
        this.$(".create-organization").prop("disabled", false);
        if ((e = this.spinner) != null) {
            e.remove()
        };
        return delete this.spinner;
    };
    NewOrganization.prototype.logout = function(e) {
        e.preventDefault();
        return Helpers.postBrowser("/session", "delete");
    };
    NewOrganization.prototype.close = function(e) {
        var t, r;
        t = this.model;
        NewOrganization.__super__.close.apply(this, arguments);
        if ((t != null ? t.id : undefined) != null) {
            r = {
                createFlow: true,
                organization: t.get("id")
            };
            return Flowdock.app.router.navigateTo(r);
        }
        return this.navigateToFlow();
    };
    return NewOrganization;
}(Views.Shared.Overlay);
