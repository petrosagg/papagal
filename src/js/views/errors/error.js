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

Views.Errors.Error = function(t) {
    function Error() {
        return Error.__super__.constructor.apply(this, arguments);
    }
    r(Error, t);
    Error.prototype.errorName = "error";
    Error.prototype.className = "error";
    Error.prototype.tagName = "div";
    Error.prototype.errorType = "global";
    Error.prototype.events = {
        "click .reload": "reload",
        "click .toast-continue": "triggerDetach",
        "click .back": "navigateBack"
    };
    Error.prototype.templates = {
        alert: require("../../templates/errors/alert.mustache"),
        "connection-closed": require("../../templates/errors/connection_closed.mustache"),
        error: require("../../templates/errors/error.mustache"),
        "external-action-failed": require("../../templates/errors/external_action_failed.mustache"),
        "external-authentication-required": require("../../templates/errors/external_authentication_required.mustache"),
        "flow-not-found": require("../../templates/errors/flow_not_found.mustache"),
        "flow-subscribe-failed": require("../../templates/errors/flow_subscribe_failed.mustache"),
        "handshake-failed": require("../../templates/errors/handshake_failed.mustache"),
        "new-flow-error": require("../../templates/errors/new_flow_error.mustache"),
        "private-not-found": require("../../templates/errors/private_not_found.mustache"),
        "private-subscribe-failed": require("../../templates/errors/private_subscribe_failed.mustache"),
        "routing-error": require("../../templates/errors/routing_error.mustache"),
        update: require("../../templates/errors/update.mustache"),
        "use-mac-app": require("../../templates/errors/use_mac_app.mustache")
    };
    Error.prototype.render = function() {
        this.$el.empty().append(this.templates[this.errorName].render(this.model));
        this.animateEllipsis();
        this.$el.addClass(this.errorType);
        return this;
    };
    Error.prototype.onDetach = function() {
        return this.destructor();
    };
    Error.prototype.triggerDetach = function(e) {
        if (e != null && typeof e.preventDefault == "function") {
            e.preventDefault()
        };
        return Error.__super__.triggerDetach.apply(this, arguments);
    };
    Error.prototype.navigateBack = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        return window.history.back();
    };
    Error.prototype.destructor = function() {
        this.ellipsisAnimation = clearInterval(this.ellipsisAnimation);
        return Error.__super__.destructor.apply(this, arguments);
    };
    Error.prototype.animateEllipsis = function() {
        var e, t;
        e = this.$el.find(".animate-ellipsis");
        if (0 !== e.length) {
            t = "...";
            return this.ellipsisAnimation = setInterval(function() {
                if (t === "...") {
                    t = "";
                } else {
                    t += ".";
                }
                return e.text(t);
            }, 1e3);
        }
        return;
    };
    Error.prototype.reload = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        return window.location.reload();
    };
    return Error;
}(Flowdock.HierarchicalView);
