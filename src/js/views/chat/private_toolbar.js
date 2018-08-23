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

Views.Chat.PrivateToolbar = function(t) {
    function PrivateToolbar() {
        return PrivateToolbar.__super__.constructor.apply(this, arguments);
    }
    r(PrivateToolbar, t);
    PrivateToolbar.prototype.template = require("../../templates/toolbar/private_toolbar.mustache");
    PrivateToolbar.prototype.id = "toolbar";
    PrivateToolbar.prototype.className = "private-toolbar";
    PrivateToolbar.prototype.events = {
        "click #sidebar-button": "openSidebar"
    };
    PrivateToolbar.prototype.onAfterRender = function() {
        return this.model.fullyLoaded.done(function(e) {
            return function() {
                e.userView = e.subview(new Views.Chat.User({
                    model: e.model.otherParty(),
                    size: 72,
                    className: "user-avatar",
                    avatarOnly: !1
                }));
                e.userView.setElement(e.$(".private-user"));
                return e.userView.render();
            };
        }(this));
    };
    PrivateToolbar.prototype.openSidebar = function() {
        return Flowdock.eventBus.trigger("mobile:show-navigation");
    };
    PrivateToolbar.prototype.destructor = function() {
        PrivateToolbar.__super__.destructor.apply(this, arguments);
        return this.userView = null;
    };
    return PrivateToolbar;
}(Flowdock.ItemView);
