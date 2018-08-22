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

Views.Navigation.SidebarDropdownMenu = function(e) {
    function SidebarDropdownMenu() {
        return SidebarDropdownMenu.__super__.constructor.apply(this, arguments);
    }
    r(SidebarDropdownMenu, e);
    SidebarDropdownMenu.prototype.className = "dropdown float-dropdown open e";
    SidebarDropdownMenu.prototype.events = {
        "click .close": "closeModel"
    };
    SidebarDropdownMenu.prototype.nextTo = function(e) {
        var t, n, r, o, i, s, a, u;
        s = 5;
        this.$el.removeAttr("style");
        o = this.$(".dropdown-menu").outerHeight();
        a = e.offset();
        u = $(window).innerHeight();
        n = $("#chat-form").outerHeight();
        r = a.left + e.width() + s;
        i = 10;
        if (u < a.top + o + n) {
            this.$el.addClass("caret-left-bottom");
            t = u - a.top + o + i;
            return this.$el.css({
                left: r,
                bottom: this._menuBottom(t, e.height())
            });
        }
        this.$el.removeClass("caret-left-bottom");
        return this.$el.css({
            left: r,
            top: this._menuTop(a.top)
        });
    };
    SidebarDropdownMenu.prototype.closeModel = function(e) {
        var t;
        if (e != null) {
            e.stopImmediatePropagation()
        };
        if (e != null) {
            e.preventDefault()
        };
        this.trigger("closing", this);
        if (typeof (t = this.model).saveWithRetry == "function") {
            return t.saveWithRetry({
                open: !1
            }, {
                patch: !0
            });
        }
        return;
    };
    SidebarDropdownMenu.prototype._caretHeight = function() {
        return 12;
    };
    SidebarDropdownMenu.prototype._menuTop = function(e) {
        if (Flowdock.app.preferences.get("sidebar_collapsed")) {
            return e + this._caretHeight() / 2;
        }
        return e - this._caretHeight() / 2;
    };
    SidebarDropdownMenu.prototype._menuBottom = function(e, t) {
        if (Flowdock.app.preferences.get("sidebar_collapsed")) {
            return e - t;
        }
        return e - 2 * t;
    };
    return SidebarDropdownMenu;
}(Flowdock.ItemView);
