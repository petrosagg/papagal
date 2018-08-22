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

Views.Shared.TabbedOverlay = function(t) {
    function TabbedOverlay() {
        return TabbedOverlay.__super__.constructor.apply(this, arguments);
    }
    r(TabbedOverlay, t);
    TabbedOverlay.prototype.className = "modal tabbed";
    TabbedOverlay.prototype.events = {
        "click .overlay-tab": "activateClickedTab"
    };
    TabbedOverlay.prototype.initialize = function(e) {
        this.tabs = e.tabs || [];
        return TabbedOverlay.__super__.initialize.apply(this, arguments);
    };
    TabbedOverlay.prototype.render = function() {
        this.$el.empty();
        this.$el.append($("<ul>").addClass("clean overlay-tabs").append(this.tabs.map(function(e) {
            return function(t) {
                return e.renderTab(t);
            };
        }(this))));
        this.$el.append(this.tabs.map(function(e) {
            return function(t) {
                return e.renderTabContent(t);
            };
        }(this)));
        this.activateTab(this.initialTab);
        return this;
    };
    TabbedOverlay.prototype.renderTab = function(t) {
        return Helpers.renderTemplate(require("../../templates/shared/overlay_tab.mustache"))({
            title: t.title || t.options.title,
            rel: t.attributes.rel
        });
    };
    TabbedOverlay.prototype.renderTabContent = function(e) {
        return e.render().$el;
    };
    TabbedOverlay.prototype.activateClickedTab = function(e) {
        return this.activateTab($(e.target).attr("rel"));
    };
    TabbedOverlay.prototype.activateTab = function(e) {
        var t, n, r, o;
        if (e != null) {
            for (this.$(".overlay-tab").removeClass("current"), this.$(".overlay-tab[rel='" + e + "']").addClass("current"), 
            r = this.tabs, t = 0, n = r.length; n > t; t++) {
                o = r[t];
                o.$el.toggleClass("hidden", o.$el.attr("rel") !== e);
            }
            this.route(e);
            return this;
        }
    };
    TabbedOverlay.prototype.route = function(e) {};
    return TabbedOverlay;
}(Views.Shared.Overlay);