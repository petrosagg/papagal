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

r = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    o(n, t);
    n.prototype.template = require("../../templates/navigation/ignore_confirm.mustache");
    n.prototype.className = "ignore-confirm";
    n.prototype.events = {
        "click .confirm": "onConfirm",
        "click .cancel": "onCancel",
        "click .undo": "onUndo"
    };
    n.prototype.initialize = function(e) {
        this.props = e;
    };
    n.prototype.serializeData = function() {
        return {
            flowName: this.props.flowName,
            success: this.success
        };
    };
    n.prototype.onAfterRender = function() {
        return this.$el.toggleClass("success", this.success != null);
    };
    n.prototype.onConfirm = function(e) {
        e.stopImmediatePropagation();
        this.success = !0;
        this.render();
        return this.props.onConfirm();
    };
    n.prototype.onCancel = function(e) {
        e.stopImmediatePropagation();
        return this.props.onCancel();
    };
    n.prototype.onUndo = function(e) {
        e.stopImmediatePropagation();
        return this.props.onUndo();
    };
    return n;
}(Flowdock.ItemView);

module.exports = r;