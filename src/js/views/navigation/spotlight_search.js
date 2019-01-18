var r, o = function(e, t) {
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

r = require("views/overlays/spot_search");

Views.Navigation.SpotlightSearch = function(t) {
    function SpotlightSearch() {
        return SpotlightSearch.__super__.constructor.apply(this, arguments);
    }
    o(SpotlightSearch, t);
    SpotlightSearch.prototype.events = {
        "click .spotlight-search": "toggleSpotlight"
    };
    SpotlightSearch.prototype.initialize = function(e) {
        SpotlightSearch.__super__.initialize.apply(this, arguments);
        return this.listenTo(e.manager, "change", this.viewChange);
    };
    SpotlightSearch.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/navigation/spotlight_search.mustache"))({}));
        return this;
    };
    SpotlightSearch.prototype.toggleSpotlight = function(e) {
        var t;
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.spotlight_search_click);
        t = false;
        return Flowdock.app.router.showSpotSearch(t);
    };
    SpotlightSearch.prototype.viewChange = function(e) {
        this.spotSearchActive = e instanceof r;
        return this.$el.find(".spotlight-search").toggleClass("open", this.spotSearchActive);
    };
    return SpotlightSearch;
}(Flowdock.ItemView);

_.extend(Views.Navigation.SpotlightSearch.prototype);
