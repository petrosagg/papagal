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

Views.Navigation.SidebarDropdown = function(t) {
    function SidebarDropdown() {
        return SidebarDropdown.__super__.constructor.apply(this, arguments);
    }
    r(SidebarDropdown, t);
    SidebarDropdown.prototype.className = "tab-menu-link tab-menu-toggle dropdown-toggle";
    SidebarDropdown.prototype.tagName = "a";
    SidebarDropdown.prototype.isOpen = false;
    SidebarDropdown.prototype.attributes = {
        title: "Manage flow"
    };
    SidebarDropdown.prototype.events = {
        click: "toggle"
    };
    SidebarDropdown.prototype.render = function() {
        if (this.model.isFlow()) {
            this.$el.append($(Helpers.renderTemplate(require("../../templates/icons/menu_icon.mustache"))()));
            this.menu = this.subview(new Views.Navigation.FlowDropdownMenu({
                model: this.model
            }));
            this.listenTo(this.menu, "closing", function() {
                return this.trigger("closing", this);
            });
            this.menu.render();
            return this;
        }
        return;
    };
    SidebarDropdown.prototype.toggle = function(e) {
        if (e != null) {
            e.stopImmediatePropagation()
        };
        if (e != null) {
            e.preventDefault()
        };
        if (this.isOpen) {
            return this.close();
        }
        return this.open(e);
    };
    SidebarDropdown.prototype.open = function(e) {
        $("body").append(this.menu.$el);
        this.menu.nextTo(this.$el);
        this.$el.addClass("open");
        this.menu.delegateEvents();
        $(document).trigger("dropdown-open");
        $(document).on("dropdown-open", {
            view: this
        }, this.blur);
        $(document).on("click", {
            view: this
        }, this.blur);
        return this.isOpen = true;
    };
    SidebarDropdown.prototype.close = function() {
        if (this.menu != null) {
            this.menu.$el.remove();
            this.$el.removeClass("open");
            $(document).off("click", this.blur);
            $(document).off("dropdown-open", this.blur);
            return this.isOpen = false;
        }
        return;
    };
    SidebarDropdown.prototype.blur = function(e) {
        var t, n, r;
        r = e != null && (t = e.data) != null ? t.view : undefined;
        n = $(e.target);
        if (n.is("a") || !n.closest(".dropdown-menu").length) {
            return _.delay(function() {
                return r.close();
            });
        }
        return;
    };
    SidebarDropdown.prototype.destructor = function() {
        this.close();
        SidebarDropdown.__super__.destructor.apply(this, arguments);
        return this.menu = null;
    };
    return SidebarDropdown;
}(Flowdock.HierarchicalView);
