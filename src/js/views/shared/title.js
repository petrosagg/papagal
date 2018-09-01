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

Views.Shared.Title = function(t) {
    function Title() {
        return Title.__super__.constructor.apply(this, arguments);
    }
    r(Title, t);
    Title.prototype.className = "title";
    Title.prototype.modelEvents = {
        change: "render"
    };
    Title.prototype.initialize = function(e) {
        return this.body = e.body;
    };
    Title.prototype.render = function() {
        var t;
        t = this.iconAttributes();
        this.$el.html(Helpers.renderTemplate(require("../../templates/shared/title.mustache"))({
            body: _.result(this, "body"),
            iconAttributes: t
        }, {
            icon: this.icon()
        }));
        this.collapseTitle();
        this.renderEmoji(this.$el);
        return this;
    };
    Title.prototype.collapseTitle = function() {
        if (this.model.get("app") === "chat" && this.model.get("event") !== "file") {
            return this.$el.addClass("collapsed");
        }
        return;
    };
    Title.prototype.icon = function() {
        return require("../../templates/shared/title_icon.mustache");
    };
    Title.prototype.iconAttributes = Views.Shared.Message.prototype.iconType;
    Title.prototype.renderEmoji = function(e) {
        var t, n;
        if (typeof e.emojie == "function") {
            e.emojie()
        };
        if ((t = this.model.flow()) != null && (n = t.emoji) != null) {
            return n.emojie(e[0]);
        }
        return;
    };
    Title.prototype.destructor = function() {
        Title.__super__.destructor.apply(this, arguments);
        return this.body = null;
    };
    return Title;
}(Flowdock.HierarchicalView);
