Presenters.Attachment = function() {
    function Attachment(e) {
        this.content = Helpers.FileHelper.parseAttachment(e);
    }
    Attachment.prototype.dimensions = function() {
        if (this.isImage()) {
            return this.content.image.width + "x" + this.content.image.height;
        }
        return;
    };
    Attachment.prototype.size = function() {
        return this.content.file.size;
    };
    Attachment.prototype.name = function() {
        return this.content.file.name;
    };
    Attachment.prototype.meta = function() {
        var e;
        e = [ {
            text: this.name()
        }, {
            text: this.size()
        } ];
        if (this.isImage()) {
            e.push({
                text: "(" + this.dimensions() + ")"
            })
        };
        return e;
    };
    Attachment.prototype.type = function() {
        return this.content.file.type;
    };
    Attachment.prototype.path = function() {
        return this.content.file.path;
    };
    Attachment.prototype.thumbnail = function() {
        if (this.content.thumbnail) {
            return Presenters.Helper.render("shared/thumbnail", {
                attachment: this.content
            }, {
                details: "shared/file_details"
            });
        }
        return;
    };
    Attachment.prototype.info = function() {
        return Presenters.Helper.render("shared/file_info", {
            attachment: this.content
        }, {
            details: "shared/file_details"
        });
    };
    Attachment.prototype.rotatedPath = function() {
        var e;
        if ((e = this.content.rotated) != null) {
            return e.path;
        }
        return;
    };
    Attachment.prototype.isImage = function() {
        return this.content.image;
    };
    return Attachment;
}();