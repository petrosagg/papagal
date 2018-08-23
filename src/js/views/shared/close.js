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

Views.Shared.Close = function(t) {
    function Close() {
        return Close.__super__.constructor.apply(this, arguments);
    }
    r(Close, t);
    Close.prototype.tagName = "a";
    Close.prototype.className = "thread-close-button";
    Close.prototype.template = require("../../templates/inbox/single_view_close.mustache");
    Close.prototype.partials = function() {
        return {
            closeIcon: require("../../templates/icons/cross_thin_with_toggle.mustache")
        };
    };
    Close.prototype.events = {
        click: "close"
    };
    Close.prototype.keyboardEvents = {
        toggleSingleView: "close"
    };
    Close.prototype.initialize = function() {
        return this.bindKeyboardEvents();
    };
    Close.prototype.close = function(e) {
        if ($.contains($("body")[0], this.el)) {
            if (e != null) {
                e.preventDefault()
            };
            return this.trigger("close");
        }
        return;
    };
    Close.prototype.destructor = function() {
        Close.__super__.destructor.apply(this, arguments);
        return this.stream = null;
    };
    return Close;
}(Flowdock.ItemView);

_.extend(Views.Shared.Close.prototype, Flowdock.KeyboardEvents);
