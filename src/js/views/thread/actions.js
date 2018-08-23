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

Views.Thread.Actions = function(e) {
    function Actions() {
        return Actions.__super__.constructor.apply(this, arguments);
    }
    r(Actions, e);
    Actions.prototype.actionViewModel = Views.Thread.Action;
    Actions.prototype.events = {
        "close-dropdown": "closeDropdown",
        "disable-dropdown": "disableDropdown",
        "enable-dropdown": "enableDropdown"
    };
    Actions.prototype.initialize = function() {
        Actions.__super__.initialize.apply(this, arguments);
        this.listenTo(this.model, "change:actions", function(e) {
            return function() {
                return e.closeDropdown();
            };
        }(this));
        return this.threadActionList = this.subview(new Views.Thread.ThreadActionList({
            model: this.model
        }));
    };
    Actions.prototype.destructor = function() {
        Actions.__super__.destructor.apply(this, arguments);
        return this.threadActionList = null;
    };
    Actions.prototype.onAfterRender = function() {
        var e;
        Actions.__super__.onAfterRender.apply(this, arguments);
        e = this.$el.find(".dropdown-menu").first().find(".thread-action-list");
        return this.threadActionList.setElement(e).render();
    };
    Actions.prototype.disableDropdown = function() {
        var e, t, n, r, o;
        for (r = this.threadActionList.subviews, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            e.action["@type"] === "UpdateAction" ? o.push(typeof e.disableLink == "function" ? e.disableLink() : void 0) : o.push(void 0);
        }
        return o;
    };
    Actions.prototype.enableDropdown = function() {
        var e, t, n, r, o;
        for (r = this.threadActionList.subviews, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            o.push(typeof e.enableLink == "function" ? e.enableLink() : void 0);
        }
        return o;
    };
    Actions.prototype.closeDropdown = function() {
        return this.dropdown.close();
    };
    return Actions;
}(Views.Shared.TitleActions);
