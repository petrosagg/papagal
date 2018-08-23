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

Views.Toolbar.Mobile = function(e) {
    function Mobile() {
        return Mobile.__super__.constructor.apply(this, arguments);
    }
    r(Mobile, e);
    Mobile.prototype.events = _.extend({}, Views.Toolbar.prototype.events, {
        "click #sidebar-button": "openSidebar"
    });
    Mobile.prototype.openSidebar = function() {
        return Flowdock.eventBus.trigger("mobile:show-navigation");
    };
    return Mobile;
}(Views.Toolbar);
