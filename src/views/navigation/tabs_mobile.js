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

Views.Navigation.Tabs.Mobile = function(e) {
    function Mobile() {
        return Mobile.__super__.constructor.apply(this, arguments);
    }
    r(Mobile, e);
    Mobile.prototype.className = "mobile clean";
    Mobile.prototype.events = {
        "click .tab-link": "hideNavigation"
    };
    Mobile.prototype.hideNavigation = function(e) {
        if ($(e.target).is(".cog")) {
            return void 0;
        }
        return Flowdock.eventBus.trigger("mobile:hide-navigation");
    };
    return Mobile;
}(Views.Navigation.Tabs);