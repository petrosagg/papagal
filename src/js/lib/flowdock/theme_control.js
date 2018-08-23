var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
};

Flowdock.ThemeControl = function() {
    function ThemeControl(e) {
        this.preference = e;
        this.setupTheme = r(this.setupTheme, this);
        _.extend(this, Backbone.Events);
    }
    ThemeControl.prototype.start = function() {
        return this.preference.onValue(this.setupTheme);
    };
    ThemeControl.prototype.element = function() {
        return $("body");
    };
    ThemeControl.prototype.setupTheme = function(e) {
        if (e == null) {
            e = "classic"
        };
        return this.element().removeClass("theme-classic theme-flowdark").addClass("theme-" + e);
    };
    return ThemeControl;
}();
