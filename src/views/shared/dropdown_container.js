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

Views.Shared.DropdownContainer = function(e) {
    function DropdownContainer() {
        return DropdownContainer.__super__.constructor.apply(this, arguments);
    }
    r(DropdownContainer, e);
    DropdownContainer.prototype.events = {
        "click .dropdown-toggle": "toggleMenu",
        mouseleave: "closeMenu"
    };
    DropdownContainer.prototype.getDropdown = function() {
        return this.$(".dropdown");
    };
    DropdownContainer.prototype.toggleMenu = function(e) {
        if (this.getDropdown().hasClass("open")) {
            return this.closeMenu(e);
        }
        return this.openMenu(e);
    };
    DropdownContainer.prototype.openMenu = function(e) {
        if (e != null) {
            e.stopImmediatePropagation()
        };
        this.getDropdown().addClass("open");
        return $("body").one("click", ":not(.dropdown-menu)", this.closeMenu.bind(this));
    };
    DropdownContainer.prototype.closeMenu = function(e) {
        return this.getDropdown().removeClass("open");
    };
    DropdownContainer.prototype.destructor = function() {
        DropdownContainer.__super__.destructor.apply(this, arguments);
        return $("body").off("click", ":not(.dropdown-menu)");
    };
    return DropdownContainer;
}(Flowdock.HierarchicalView);