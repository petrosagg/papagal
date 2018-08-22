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
    n.prototype.id = "upload-confirm-dialog";
    n.prototype.events = {
        "click button[data-confirm-upload]": "confirmClick",
        "click button[data-cancel-upload]": "cancelClick"
    };
    n.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        n.__super__.initialize.apply(this, arguments);
        this.confirmCallback = e.confirmCallback;
        this.cancelCallback = e.cancelCallback;
        this.targetName = e.targetName;
        return this.fileCount = e.fileCount;
    };
    n.prototype.confirmClick = function() {
        this.confirmCallback();
        return this.close(!0);
    };
    n.prototype.cancelClick = function() {
        return this.close();
    };
    n.prototype.close = function(e) {
        e || this.cancelCallback();
        return n.__super__.close.apply(this, arguments);
    };
    n.prototype.render = function() {
        this.$el.append(Helpers.renderTemplate(require("../../templates/overlays/upload_confirm.mustache"))({
            fileCount: this.fileCount,
            targetName: this.targetName
        }));
        return this;
    };
    return n;
}(Views.Shared.Overlay);

module.exports = r;
