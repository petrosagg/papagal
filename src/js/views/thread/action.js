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

Views.Thread.Action = function(e) {
    function Action() {
        this.hideSuccessIcon = r(this.hideSuccessIcon, this);
        this.hideErrorIcon = r(this.hideErrorIcon, this);
        return Action.__super__.constructor.apply(this, arguments);
    }
    o(Action, e);
    Action.prototype.events = {
        click: "requestAction"
    };
    Action.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Action.__super__.initialize.apply(this, arguments);
        this.thread = e.thread;
        this.disabled = false;
        return this.popups = [];
    };
    Action.prototype.disableLink = function() {
        this.$el.addClass("disabled");
        return this.disabled = true;
    };
    Action.prototype.enableLink = function() {
        this.$el.removeClass("disabled");
        return this.disabled = false;
    };
    Action.prototype.serializeData = function() {
        return {
            link: this.actionUrl(),
            text: this.action.name,
            image: this.action.image,
            icon: this.actionIcon(),
            class: this.actionClass()
        };
    };
    Action.prototype.actionUrl = function() {
        var e;
        if (this.action["@type"] === "UpdateAction") {
            return Helpers.apiUrl(((e = this.action.target) != null ? e.urlTemplate : undefined) || this.action.url);
        }
        return this.action.url;
    };
    Action.prototype.actionIcon = function() {
        if (this.action["@type"] === "ViewAction") {
            return "fa-external-link";
        }
        return null;
    };
    Action.prototype.actionClass = function() {
        if (this.action["@type"] === "UpdateAction") {
            return "update-action";
        }
        return "view-action";
    };
    Action.prototype.actionMethod = function() {
        var e;
        return ((e = this.action.target) != null ? e.httpMethod : undefined) || "GET";
    };
    Action.prototype.applicationName = function() {
        return this.thread.get("source").application.name;
    };
    Action.prototype.requestAction = function(e) {
        if (this.action["@type"] === "UpdateAction" || this.disabled) {
            e.preventDefault();
            e.stopPropagation();
        };
        if (this.action["@type"] !== "UpdateAction" || this.disabled) {
            return undefined;
        }
        $.ajax({
            url: this.actionUrl(),
            type: this.actionMethod(),
            data: JSON.stringify(this.action),
            error: function(e) {
                return function(t) {
                    var n;
                    n = JSON.parse(t.responseText);
                    if ((n != null ? n.message : undefined) === "Authentication required" && n.url != null) {
                        return e.requestAuthenticationFromUser(n.url);
                    }
                    return Flowdock.app.manager.toastError("external-action-failed", {
                        title: e.applicationName() + " action failed!",
                        description: (n != null ? n.message : undefined) || "status " + t.status
                    });
                };
            }(this),
            complete: function(e) {
                return function(t, n) {
                    e.hideLoadingIcon();
                    if (n === "error") {
                        return e.showErrorIcon();
                    }
                    return e.showSuccessIcon();
                };
            }(this)
        });
        return this.showLoadingIcon();
    };
    Action.prototype.requestAuthenticationFromUser = function(e) {
        return Flowdock.app.manager.toastError("external-authentication-required", {
            url: e,
            application: this.applicationName()
        });
    };
    Action.prototype.showLoadingIcon = function() {
        this.$el.trigger("disable-dropdown");
        return this.$el.addClass("title-action-requesting disabled");
    };
    Action.prototype.hideLoadingIcon = function() {
        this.$el.trigger("enable-dropdown");
        return this.$el.removeClass("title-action-requesting disabled");
    };
    Action.prototype.showErrorIcon = function() {
        this.$el.trigger("enable-dropdown");
        this.$el.addClass("title-action-error");
        return this.delay = setTimeout(this.hideErrorIcon, 2e3);
    };
    Action.prototype.hideErrorIcon = function() {
        this.$el.removeClass("title-action-error");
        this.$el.trigger("close-dropdown");
        return this.delay = null;
    };
    Action.prototype.showSuccessIcon = function() {
        this.$el.trigger("enable-dropdown");
        this.$el.addClass("title-action-success");
        return this.delay = setTimeout(this.hideSuccessIcon, 2e3);
    };
    Action.prototype.hideSuccessIcon = function() {
        this.$el.removeClass("title-action-success");
        this.$el.trigger("close-dropdown");
        return this.delay = null;
    };
    Action.prototype.destructor = function() {
        var e, n, r, o, i;
        for (Action.__super__.destructor.apply(this, arguments), clearTimeout(this.delay), 
        o = this.popups, i = [], e = 0, n = o.length; n > e; e++) {
            r = o[e];
            i.push(r.destructor());
        }
        return i;
    };
    return Action;
}(Views.Shared.TitleAction);
