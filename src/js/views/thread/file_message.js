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

Views.Thread.FileMessage = function(t) {
    function FileMessage() {
        return FileMessage.__super__.constructor.apply(this, arguments);
    }
    r(FileMessage, t);
    FileMessage.prototype.className = "chat-message thread-file-message";
    FileMessage.prototype.events = function() {
        return _.extend({}, FileMessage.__super__.events.apply(this, arguments), {
            "click menu.message-actions a.discard": "discard"
        });
    };
    FileMessage.prototype.modelEvents = _.extend({}, Views.Thread.Comment.prototype.modelEvents, {
        "change:content": "render"
    });
    FileMessage.prototype.initialize = function(e) {
        FileMessage.__super__.initialize.call(this, e);
        if (this.tId != null) {
            return clearTimeout(this.tId);
        }
        return;
    };
    FileMessage.prototype.body = function() {
        return null;
    };
    FileMessage.prototype.renderContent = function() {
        if (this.model.upload) {
            return this.renderUploading();
        }
        return this.preserveScrolling(function(e) {
            return function() {
                return e.renderCompleteUpload();
            };
        }(this));
    };
    FileMessage.prototype.renderCompleteUpload = function() {
        var e;
        e = this.subview(new Views.Shared.Attachment({
            model: this.model,
            parent: this,
            attachment: this.model.get("content")
        }));
        Views.Thread.Comment.prototype.renderContent.apply(this);
        this.$el.find(".content").prepend(e.render().el);
        if (this.finished) {
            return e.load();
        }
        return;
    };
    FileMessage.prototype.discard = function() {
        if (this.model.collection) {
            return this.model.collection.remove(this.model);
        }
        return;
    };
    FileMessage.prototype.renderUploadedAmount = function() {
        var e;
        if (this.model.upload != null) {
            e = this.model.upload.get("uploaded");
            this.$("progress").prop({
                value: e
            });
            this.$(".uploaded,progress").text("(" + e + "%)");
            if (e >= 100) {
                this.$(".state").text("Processing");
                return this.$(".uploaded").hide();
            }
            return;
        }
    };
    FileMessage.prototype.renderRemoveButton = function() {
        return this.$("menu.message-actions li a.delete").addClass("discard").removeClass("delete");
    };
    FileMessage.prototype.renderUploadResult = function() {
        var e;
        if (!this.finished && this.model.upload != null && "uploading" !== this.model.upload.get("state")) {
            this.finished = (e = this.model.upload.get("state")) === "failed" || e === "finished";
            if (this.model.upload.get("state") === "failed") {
                this.$el.addClass("failed"), this.$("a.edit-tags").toggle(!1), this.renderRemoveButton()
            };
            return this.stopListening(this.model.upload);
        }
    };
    FileMessage.prototype.renderUploading = function() {
        var t;
        t = {
            fileName: this.model.upload.get("fileName"),
            noLeftSideMessageComponents: !0,
            removable: !0,
            timestamp: this.messageTimestamp(),
            user: this.model.user().toJSON()
        };
        this.$el.html(Helpers.renderTemplate(require("../../templates/messages/file_uploading_message.mustache"))(t, {
            messageHeader: require("../../templates/chat/message_header.mustache")
        }));
        this.renderUploadedAmount();
        this.listenTo(this.model.upload, "change:state", this.renderUploadResult);
        return this.listenTo(this.model.upload, "change:uploaded", this.renderUploadedAmount);
    };
    return FileMessage;
}(Views.Thread.Comment);
