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

Views.NewFlow = function(t) {
    function NewFlow() {
        this.showError = r(this.showError, this);
        this.saveSuccess = r(this.saveSuccess, this);
        return NewFlow.__super__.constructor.apply(this, arguments);
    }
    o(NewFlow, t);
    NewFlow.prototype.id = "new-flow";
    NewFlow.prototype.events = {
        "submit form": "createFlow",
        "click #new-organization-link": "redirectToOrganizationCreate",
        "click .close": "close"
    };
    NewFlow.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        this.organizations = e.organizations;
        this.preselect = e.preselect;
        return NewFlow.__super__.initialize.apply(this, arguments);
    };
    NewFlow.prototype.destructor = function() {
        this.model.id || this.model.destroy();
        NewFlow.__super__.destructor.apply(this, arguments);
        return this.organizations = this.spinner = null;
    };
    NewFlow.prototype.render = function() {
        this.organizations.ready.done(function(t) {
            return function() {
                var n;
                n = t.collection.where({
                    open: true
                }).length === 0;
                if (t.loader) {
                    t.removeLoader()
                };
                if (t.organizations.active().length === 0) {
                    t.close();
                    return void Flowdock.app.router.routingError();
                }
                t.$el.addClass("hidden").html(Helpers.renderTemplate(require("../templates/dialogs/new_flow.mustache"))({
                    organizations: _.map(t.organizations.active(), function(e) {
                        return e.toJSON();
                    }),
                    noFlows: n
                }));
                t.$name = t.$("[name=name]");
                t.$description = t.$("[name=description]");
                setTimeout(function() {
                    return t.$name.focus();
                }, 1e3);
                t.$el.removeClass("hidden");
                if (n) {
                    t.disableDialogDismissal()
                };
                if (t.preselect) {
                    t.$("select option[value=" + t.preselect + "]").prop("selected", true)
                };
                return t.$("select[name=organization]").asEventStream("change").map(t, "selectedOrganization").toProperty(t.selectedOrganization()).onValue(function(e) {
                    e || t.redirectToOrganizationCreate();
                });
            };
        }(this));
        this.organizations.ready.fail(function(t) {
            return function() {
                return t.$el.empty().append(Helpers.renderTemplate(require("../templates/errors/new_flow_error.mustache"))());
            };
        }(this));
        return this;
    };
    NewFlow.prototype.close = function(e) {
        NewFlow.__super__.close.call(this, e);
        return Flowdock.app.router.activatePrevious();
    };
    NewFlow.prototype.createFlow = function(e) {
        var t, n, r, o, i;
        if (e != null) {
            e.preventDefault()
        };
        r = $.trim(this.$name.val());
        n = $.trim(this.$description.val());
        o = this.selectedOrganization();
        if (this.$("#new-flow-open").prop("checked")) {
            t = "organization";
        } else {
            t = "invitation";
        }
        if ("" !== r && o) {
            this.spin();
            i = {
                name: r,
                description: n,
                organization_subdomain: o.get("parameterized_name"),
                open: true,
                organization: o.get("name"),
                access_mode: t
            };
            this.model.save(i, {
                success: this.saveSuccess,
                error: this.showError,
                wait: true
            });
            return this;
        }
        return;
    };
    NewFlow.prototype.selectedOrganization = function() {
        return this.organizations.get(this.$("select[name=organization]").val());
    };
    NewFlow.prototype.saveSuccess = function(e, t) {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.flows_add);
        Flowdock.app.allFlows().add(new Models.Flow(e.attributes, {
            embedded: false
        }));
        this.unspin();
        this.collection.add(e);
        this.close();
        return Flowdock.app.router.navigateTo({
            flow: e
        });
    };
    NewFlow.prototype.showError = function(e, t) {
        var n, r, o, i, s, a, u, l, c, p, d, h;
        this.unspin();
        try {
            l = JSON.parse(t.responseText);
        } catch (f) {
            n = f;
        }
        if (t.status === 400 && l) {
            for (r = $("<p/>").addClass("error save-completed"), i = [], d = [ "name", "parameterized_name" ], 
            a = 0, c = d.length; c > a; a++) {
                s = d[a];
                if (l.errors[s]) {
                    for (h = l.errors[s], u = 0, p = h.length; p > u; u++) {
                        o = h[u];
                        i.push(o);
                    }
                }
            }
            r.text("Name " + i.join(", "));
            return this.$("form ol > li:last-child").append(r);
        }
        if (l) {
            return this.$("form ol > li:last-child").append($("<p>").addClass("save-completed error").text(l.message));
        }
        return this.$("form ol > li:last-child").append($("<p>").addClass("save-completed error").text("Something went wrong."));
    };
    NewFlow.prototype.spin = function() {
        this.$("#createFlow").prop("disabled", true).addClass("disabled");
        this.$(".error").remove();
        this.spinner = new Views.Shared.Progress();
        return this.$("form ol > li:last-child").append(this.spinner.render().el);
    };
    NewFlow.prototype.unspin = function() {
        var e;
        this.$("#createFlow").prop("disabled", false).removeClass("disabled");
        if ((e = this.spinner) != null) {
            e.remove()
        };
        return delete this.spinner;
    };
    NewFlow.prototype.redirectToOrganizationCreate = function() {
        this.close();
        return Flowdock.app.router.navigateTo({
            createOrganization: true
        });
    };
    return NewFlow;
}(Views.Shared.Overlay);
