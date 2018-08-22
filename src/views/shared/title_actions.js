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

Views.Shared.TitleActions = function(t) {
    function TitleActions() {
        return TitleActions.__super__.constructor.apply(this, arguments);
    }
    r(TitleActions, t);
    TitleActions.prototype.className = "title-actions dropdown sw";
    TitleActions.prototype.template = require("../../templates/shared/title_actions.mustache");
    TitleActions.prototype.partials = function() {
        return {
            menuIcon: require("../../templates/icons/menu_icon.mustache")
        };
    };
    TitleActions.prototype.initialize = function() {
        return this.itemActionList = this.subview(new Views.Inbox.ItemActionList({
            model: this.model
        }));
    };
    TitleActions.prototype.onAfterRender = function() {
        if (this.dropdown == null) {
            this.dropdown = new Flowdock.Dropdown({
                el: this.$el
            });
            return this.dropdown.on("open", this.onOpenActions.bind(this));
        }
        return;
    };
    TitleActions.prototype.onOpenActions = function() {
        var e;
        e = this.$el.find(".dropdown-menu").first().find(".item-action-list");
        this.itemActionList.setElement(e).render();
        return this.listenTo(this.itemActionList, "close", function() {
            return this.dropdown.close();
        });
    };
    TitleActions.prototype.destructor = function() {
        var e;
        TitleActions.__super__.destructor.apply(this, arguments);
        if ((e = this.dropdown) != null) {
            e.remove()
        };
        this.dropdown = null;
        return this.itemActions = null;
    };
    return TitleActions;
}(Flowdock.ItemView);