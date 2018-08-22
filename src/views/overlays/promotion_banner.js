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

Views.Overlays.PromotionBanner = function(t) {
    function PromotionBanner() {
        return PromotionBanner.__super__.constructor.apply(this, arguments);
    }
    r(PromotionBanner, t);
    PromotionBanner.prototype.className = "overlay-mask";
    PromotionBanner.prototype.id = "promotion-banner";
    PromotionBanner.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        return this.content = e.content;
    };
    PromotionBanner.prototype.events = {
        "click .close": "close"
    };
    PromotionBanner.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/overlays/android_promotion_banner.mustache"))({
            content: this.content
        }));
        return this;
    };
    PromotionBanner.prototype.close = function() {
        localStorage.setItem("promotion-banner-closed", !0);
        return this.remove();
    };
    PromotionBanner.prototype.closedPermanently = function() {
        return localStorage.getItem("promotion-banner-closed");
    };
    return PromotionBanner;
}(Flowdock.HierarchicalView);