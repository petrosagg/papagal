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

Views.Navigation.Mobile = function(t) {
    function Mobile() {
        return Mobile.__super__.constructor.apply(this, arguments);
    }
    r(Mobile, t);
    Mobile.prototype.template = require("../../templates/navigation/navigation.mustache");
    Mobile.prototype.className = "mobile";
    Mobile.prototype.events = {
        "click .search-tab": "openNewTab"
    };
    Mobile.prototype.initialize = function(e) {
        var t, r;
        Mobile.__super__.initialize.apply(this, arguments);
        this.listenTo(Flowdock.eventBus, "mobile:show-navigation", this.showNavigation);
        this.listenTo(Flowdock.eventBus, "mobile:hide-navigation", this.hideNavigation);
        r = this.untilEnd(this.$el.asEventStream("click", "#user-menu-toggle, #notification-center-toggle"));
        t = this.untilEnd($(document).asEventStream("click")).filter("isMenuOpen");
        return r.merge(t).onValue(function(e) {
            return function(t) {
                $(t.target).closest(".dropdown-menu").length || e.closeOpenMenu(t);
                return e.toggleMenuByEventTarget(t);
            };
        }(this));
    };
    Mobile.prototype.isMenuOpen = function() {
        return this.$(".dropdown").hasClass("open");
    };
    Mobile.prototype.showNavigation = function() {
        return $("body").addClass("navigation-in");
    };
    Mobile.prototype.hideNavigation = function() {
        return $("body").removeClass("navigation-in");
    };
    Mobile.prototype.closeOpenMenu = function() {
        return this.$(".dropdown.open").removeClass("open");
    };
    Mobile.prototype.toggleMenuByEventTarget = function(e) {
        return $(e.target).closest(".dropdown").toggleClass("open");
    };
    Mobile.prototype.openNewTab = function() {
        return Flowdock.app.router.showNewTab();
    };
    Mobile.prototype.destructor = function() {
        this.stopListening(Flowdock.eventBus);
        return Mobile.__super__.destructor.apply(this, arguments);
    };
    return Mobile;
}(Views.Navigation);