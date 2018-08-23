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

Views.Overlays.Upload = function(t) {
    function Upload() {
        return Upload.__super__.constructor.apply(this, arguments);
    }
    r(Upload, t);
    Upload.prototype.id = "upload-dialog";
    Upload.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Upload.__super__.initialize.apply(this, arguments);
        this.flow = e.flow;
        return this.targetName = e.targetName;
    };
    Upload.prototype.render = function() {
        this.$el.append(Helpers.renderTemplate(require("../../templates/overlays/upload.mustache"))({
            targetName: this.targetName
        }));
        return this;
    };
    return Upload;
}(Views.Shared.Overlay);
