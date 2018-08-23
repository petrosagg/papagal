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

r = function(e) {
    if (e.$el.is(".dropdown")) {
        return e.$el;
    }
    return e.$(".dropdown");
};

Flowdock.Dropdown = function(e) {
    function Dropdown() {
        return Dropdown.__super__.constructor.apply(this, arguments);
    }
    o(Dropdown, e);
    Dropdown.CLOSE_DELAY = 1e4;
    Dropdown.prototype.events = {
        "click .dropdown-toggle": "toggle",
        mouseleave: "_closeOnMouseLeave",
        mouseenter: "_clearDelayedClose"
    };
    Dropdown.prototype.isOpen = !1;
    Dropdown.prototype.toggle = function(e) {
        e.stopPropagation();
        if (this.isOpen) {
            return this.close(e);
        }
        $(document).click();
        return this.open(e);
    };
    Dropdown.prototype.open = function(e) {
        var t;
        if (this.isOpen) {
            return void 0;
        }
        t = e ? $(e.target).closest(".dropdown") : r(this);
        t.addClass("open");
        $(document).trigger("dropdown-open");
        $(document).on("click", {
            view: this
        }, this.blur);
        $(document).on("dropdown-open", {
            view: this
        }, this.blur);
        this.trigger("open");
        return this.isOpen = !0;
    };
    Dropdown.prototype.blur = function(e) {
        var t, n, r;
        r = e != null && (t = e.data) != null ? t.view : void 0;
        n = $(e.target);
        if (n.is("a") || !n.closest(".dropdown-menu").length) {
            return _.defer(function() {
                return r.close();
            });
        }
        return;
    };
    Dropdown.prototype.close = function() {
        var e;
        if (this.isOpen) {
            e = r(this);
            e.removeClass("open");
            $(document).trigger("dropdown-close");
            $(document).off("dropdown-open", this.blur);
            $(document).off("click", this.blur);
            clearTimeout(this.delayedClose);
            this.isOpen = !1;
            return this.trigger("close");
        }
        return;
    };
    Dropdown.prototype._closeOnMouseLeave = function(e) {
        if (this.closeOnMouseLeave && this.isOpen) {
            return this.close(e);
        }
        if (this.isOpen) {
            return this.delayedClose = setTimeout(this.close.bind(this), Flowdock.Dropdown.CLOSE_DELAY);
        }
        return;
    };
    Dropdown.prototype._clearDelayedClose = function() {
        return clearTimeout(this.delayedClose);
    };
    Dropdown.prototype.remove = function() {
        this.close();
        return Dropdown.__super__.remove.apply(this, arguments);
    };
    return Dropdown;
}(Backbone.View);
