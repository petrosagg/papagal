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

Views.Shared.Attachment = function(t) {
    function Attachment() {
        return Attachment.__super__.constructor.apply(this, arguments);
    }
    r(Attachment, t);
    Attachment.prototype.className = "attachment";
    Attachment.prototype.initialize = function(e) {
        e = _.extend({
            renderIfPreviewsHidden: true
        }, e);
        this.file = new Presenters.Attachment(e.attachment);
        this.parent = e.parent;
        this.renderIfPreviewsHidden = e.renderIfPreviewsHidden;
        return this.addStream(Flowdock.app.preferences.asEventStream("change:link_previews").onValue(this, "onLinkPreviewChange"));
    };
    Attachment.prototype.render = function() {
        var t, n;
        if (this.showPreview() || this.renderIfPreviewsHidden) {
            this.$el.html(Helpers.renderTemplate(require("../../templates/shared/attachment.mustache"))({
                dimensions: this.file.dimensions(),
                file: this.file,
                meta: this.file.meta()
            }));
        } else {
            this.$el.html("");
        }
        this.$el.addClass(this.model.get("event"));
        if (this.file.type() === "image") {
            t = Views.Embed.Image;
        } else {
            t = Views.Embed.match(this.file.path());
        }
        if (this.parent && t != null && this.showPreview()) {
            n = this.$el.find("a").first().wrap("<div class='embed file-preview'>").parent(), 
            this.preview(t, n)
        };
        return this;
    };
    Attachment.prototype.preview = function(e, t) {
        var n;
        n = {
            url: this.file.path(),
            rotatedUrl: this.file.rotatedPath(),
            el: t,
            parent: this.parent,
            skipTimeout: this.model.get("event") === "file",
            hideable: this.renderIfPreviewsHidden,
            message: this.model
        };
        return this.previewer = this.subview(new e(n).render());
    };
    Attachment.prototype.load = function() {
        var e;
        if ((e = this.previewer) != null) {
            return e.load();
        }
        return;
    };
    Attachment.prototype.destructor = function() {
        Attachment.__super__.destructor.apply(this, arguments);
        return this.file = this.parent = this.previewer = null;
    };
    Attachment.prototype.onLinkPreviewChange = function() {
        if (this.previewer != null) {
            this.removeSubview(this.previewer), this.previewer = null
        };
        return this.render();
    };
    Attachment.prototype.showPreview = function() {
        return Flowdock.app.preferences.linkPreviews();
    };
    return Attachment;
}(Flowdock.HierarchicalView);
