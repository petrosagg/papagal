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

r = require("tether");

Flowdock.ItemView = function(e) {
    function ItemView() {
        return ItemView.__super__.constructor.apply(this, arguments);
    }
    o(ItemView, e);
    ItemView.prototype.triggerMethod = Flowdock.triggerMethod;
    ItemView.prototype.addTether = function(e, t) {
        var n;
        if (t == null) {
            t = {}
        };
        n = {
            addTargetClasses: false,
            attachment: "bottom right",
            constraints: [ {
                attachment: "together",
                pin: true,
                to: "window"
            } ],
            offset: "0 30px",
            element: this.$el,
            optimizations: {
                gpu: false
            },
            outOfBoundsClass: "out-of-bounds",
            target: e,
            targetAttachment: "top right",
            targetModifier: "visible"
        };
        return this.tether = new r(_.assign(n, t));
    };
    ItemView.prototype.render = function() {
        var e;
        ItemView.__super__.render.apply(this, arguments);
        if (e = _.result(this, "template")) {
            this.triggerMethod("before:render");
            this.$el.html(Helpers.renderTemplate(e)(this.serializeData(), _.result(this, "partials")));
            this.triggerMethod("after:render");
            return this;
        }
        return console.error("Template is not defined", "TemplateNotFoundError");
    };
    ItemView.prototype.serializeData = function() {
        return {};
    };
    return ItemView;
}(Flowdock.HierarchicalView);
