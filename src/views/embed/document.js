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

Views.Embed.Document = function(t) {
    function Document() {
        return Document.__super__.constructor.apply(this, arguments);
    }
    r(Document, t);
    Document.prototype.type = "document";
    Document.prototype.initialize = function(e) {
        Document.__super__.initialize.apply(this, arguments);
        this.url = e.url;
        return this.fileType = _.last(this.url.split(".")).split("?")[0].toLowerCase();
    };
    Document.prototype.load = function() {
        var t;
        if (this.shouldLoad()) {
            t = Helpers.renderTemplate(require("../../templates/shared/embed/document.mustache"))({
                url: this.url,
                type: this.fileType
            });
            this.embed($.parseHTML(t));
            return this.render();
        }
    };
    Document.match = function(e) {
        return e.match(/^(?:https?:\/\/).*\.(?:pdf|ppt)(#|\?|$)/i);
    };
    return Document;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Document);