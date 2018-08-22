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

Views.Shared.MessageError = function(t) {
    function MessageError() {
        return MessageError.__super__.constructor.apply(this, arguments);
    }
    r(MessageError, t);
    MessageError.prototype.tagName = "li";
    MessageError.prototype.className = "error-message";
    MessageError.prototype.events = {
        "click .report-link": "reportError",
        "click a.delete": "delete",
        "click .dropdown-toggle": "toggleMenu",
        "click .dropdown a": "preventOpen",
        "click .dropdown-wrapper": "preventOpen",
        mouseleave: "hideMenu"
    };
    MessageError.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        MessageError.__super__.initialize.apply(this, arguments);
        this.app = e.app;
        return this.error = e.error;
    };
    MessageError.prototype.toggleMenu = function(e) {
        e.stopPropagation();
        return $(e.target).closest(".dropdown").toggleClass("open");
    };
    MessageError.prototype.hideMenu = function() {
        return this.$(".dropdown").removeClass("open");
    };
    MessageError.prototype.preventOpen = function(e) {
        return e.stopPropagation();
    };
    MessageError.prototype["delete"] = function(e) {
        e.stopPropagation();
        if (Helpers.confirmDelete()) {
            return this.model.destroy();
        }
        return;
    };
    MessageError.prototype.reportError = function(e) {
        e.preventDefault();
        return !1;
    };
    MessageError.prototype.report = function() {
        var e, t;
        e = (this.model.get("originalModel") || this.model).toJSON();
        return "Couldn't render an " + this.app + " item:\n" + this.error + "\n\n" + ("Message:\n" + JSON.stringify(e, null, 4) + "\n\n") + ("Stacktrace:\n" + ((t = this.error) != null ? t.stack : void 0) + "\n\n") + ("URL:\n" + window.location + "\n\n");
    };
    MessageError.prototype.templates = {
        chat: require("../../templates/chat/error.mustache"),
        inbox: require("../../templates/chat/error.mustache")
    };
    MessageError.prototype.render = function() {
        this.$el.html(this.templates[this.app].render({
            removable: this.model.removable()
        }));
        return this;
    };
    MessageError.prototype.destructor = function() {
        MessageError.__super__.destructor.apply(this, arguments);
        return this.app = this.error = null;
    };
    return MessageError;
}(Flowdock.HierarchicalView);