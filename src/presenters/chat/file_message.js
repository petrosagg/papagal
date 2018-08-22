Presenters.ChatMessage.File = function() {
    function File(e, t, n) {
        this.event = e;
        this.content = t;
        this.data = n;
        if (this.content) {
            this.file = new Presenters.Attachment(this.content)
        };
    }
    File.prototype.avatar = function(e) {
        var t;
        return "" + ((t = this.data.user) != null ? t.avatar : void 0) + e;
    };
    File.prototype.icon = function() {};
    File.prototype.author = function() {
        if (this.data.user) {
            return {
                name: this.data.user.nick
            };
        }
        return;
    };
    File.prototype.excerpt = function() {
        var e;
        e = this.file.thumbnail();
        if (e) {
            return {
                html: e
            };
        }
        return {
            html: this.file.info()
        };
    };
    File.prototype.action = function() {};
    File.prototype.meta = function() {};
    File.prototype.headline = function() {
        var e;
        e = this.file.content.file.name + " - " + this.file.content.file.size;
        if (this.file.content.image) {
            e += " (" + this.file.content.image.width + "x" + this.file.content.image.height + ")"
        };
        return e;
    };
    File.prototype.body = function() {
        return this.content.file_name;
    };
    File.prototype.linkTitle = function() {
        return "Download";
    };
    File.prototype.link = function() {
        return "/rest" + this.content.path;
    };
    File.prototype.summary = function() {
        return "Uploaded a file: " + this.content.file_name;
    };
    return File;
}();