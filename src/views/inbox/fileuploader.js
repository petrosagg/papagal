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

r = require("views/shared/file_uploader");

Views.Inbox.FileUploader = function(e) {
    function FileUploader() {
        return FileUploader.__super__.constructor.apply(this, arguments);
    }
    o(FileUploader, e);
    FileUploader.prototype.endpointUrl = function() {
        return this.model.url() + ("/messages/" + this.parent.id + "/comments");
    };
    return FileUploader;
}(r);