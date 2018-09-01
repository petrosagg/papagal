var r, o, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

o = require("../overlays/upload_confirm.coffee");

r = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    i(n, t);
    n.prototype.tagName = "form";
    n.prototype.className = "upload";
    n.prototype.events = {
        fileuploadadd: "onFileAdd",
        fileuploadprogress: "onFileProgress",
        "confirm-upload": "confirmUpload"
    };
    n.prototype.initialize = function(e) {
        this.parent = e.parent;
        this.target = e.target;
        this.targetName = e.targetName;
        this.uploading = {};
        if (!this.targetName) {
            this.targetName = null
        };
        this.queue = [];
        this.incomingUploads = new Bacon.Bus();
        return this.incomingUploads.bufferWithTime(300).map(function(e) {
            return e.length >= 5;
        }).startWith(true).toProperty().onValue(function(e) {
            return function(t) {
                if (e.queue.length > 0) {
                    if (t || e.queue.length >= 5) {
                        return e.showConfirmOverlay();
                    }
                    return e.sendQueuedFiles();
                }
                return;
            };
        }(this));
    };
    n.prototype.confirmUpload = function() {
        return this.sendQueuedFiles();
    };
    n.prototype.cancelUpload = function() {
        return this.queue = [];
    };
    n.prototype.destructor = function() {
        n.__super__.destructor.apply(this, arguments);
        return this.uploading = this.$overlay = this.parent = this.target = null;
    };
    n.prototype.showConfirmOverlay = function(e) {
        var t;
        if (e == null) {
            e = {}
        };
        if ((t = this.$confirmOverlay) != null) {
            t.close(true)
        };
        this.$confirmOverlay = new o({
            target: this.target,
            targetName: this.targetName,
            fileCount: this.queue.length,
            confirmCallback: function(e) {
                return function() {
                    return e.confirmUpload();
                };
            }(this),
            cancelCallback: function(e) {
                return function() {
                    return e.cancelUpload();
                };
            }(this)
        });
        return this.$confirmOverlay.attach();
    };
    n.prototype.showOverlay = function() {
        if (!this.$overlay) {
            this.$overlay = new Views.Overlays.Upload({
                target: this.target,
                targetName: this.targetName,
                removeOnHide: false
            })
        };
        return this.$overlay.attach();
    };
    n.prototype.messageOptions = function() {
        var e;
        e = {
            uuid: Models.Message.prototype.generateUuid(),
            user: this.model.me().id
        };
        e[this.model.isFlow() ? "flow" : "to"] = this.model.get("id");
        if (this.parent) {
            e.tags = [ "inbox:" + this.parent.id ]
        };
        return e;
    };
    n.prototype.onFileAdd = function(e, t) {
        if (this.$el.closest("body").length === 0) {
            return false;
        }
        this.queue.push(t);
        return this.incomingUploads.push(t);
    };
    n.prototype.sendQueuedFiles = function() {
        _.each(this.queue, function(e) {
            return function(t) {
                var n, r, o;
                r = t.files[0].name || t.files[0].fileName;
                n = t.files[0].type;
                o = e.setupNewChatMessage(r);
                e.getPresignedData(r, n).done(function(n) {
                    return e.uploadToS3(t, n).done(function() {
                        return e.sendFileMessage(o, r, n.file_uuid);
                    }).fail(function() {
                        var e;
                        if ((e = o.upload) != null) {
                            return e.set({
                                state: "failed"
                            });
                        }
                        return;
                    });
                }).fail(function() {
                    var e;
                    if ((e = o.upload) != null) {
                        return e.set({
                            state: "failed"
                        });
                    }
                    return;
                });
                return e.trigger("new_upload", o);
            };
        }(this));
        return this.queue = [];
    };
    n.prototype.setupNewChatMessage = function(e) {
        var t, n, r;
        n = this.messageOptions();
        t = new Models.FileMessage(n);
        t.upload = new Backbone.Model({
            state: "starting",
            uploaded: 0,
            fileName: e
        });
        r = function() {
            t.upload.off();
            t.off(null, null, t);
            return delete t.upload;
        };
        t.on("change:content", r, t);
        this.uploading[e] = t;
        this.$el.find("input[name=uuid]").val(t.get("uuid"));
        this.$el.find("input[name=event]").val("file");
        if (this.parent) {
            this.$el.find("input[name=tags]").val("influx:" + this.parent.id)
        };
        return t;
    };
    n.prototype.getPresignedData = function(e, t) {
        return $.ajax({
            type: "POST",
            url: Helpers.apiUrl(this.model.get("_links").files.href),
            dataType: "json",
            data: {
                filename: e || "default",
                content_type: t
            }
        });
    };
    n.prototype.uploadToS3 = function(e, t) {
        e.url = t.url;
        e.formData = t.fields;
        return e.submit();
    };
    n.prototype.sendFileMessage = function(e, t, n) {
        return $.ajax({
            type: "POST",
            url: this.endpointUrl(),
            data: {
                uuid: e.get("uuid"),
                event: "file",
                file_uuid: n,
                tags: this.parent ? "influx:" + this.parent.id : undefined
            }
        }).done(function() {
            var t;
            if ((t = e.upload) != null) {
                return t.set({
                    state: "finished"
                });
            }
            return;
        }).fail(function() {
            var t;
            if ((t = e.upload) != null) {
                return t.set({
                    state: "failed"
                });
            }
            return;
        }).always(function(e) {
            return function() {
                return e.uploading[t] = null;
            };
        }(this));
    };
    n.prototype.onFileProgress = function(e, t) {
        var n, r;
        n = t.files[0].name || t.files[0].fileName;
        r = this.uploading[n];
        if ((r != null ? r.upload : undefined) != null) {
            if (r.upload.get("state") === "starting") {
                r.upload.set({
                    state: "uploading"
                })
            };
            return r.upload.set({
                uploaded: parseInt(t.loaded / t.total * 100, 10)
            });
        }
        return;
    };
    n.prototype.setupDragNDrop = function() {
        return this.target.dragNDropFileEvents({
            target: this.target,
            overlayClass: "fileupload-dnd-overlay",
            drop: function(e) {
                return function() {
                    return e.$overlay.close();
                };
            }(this),
            dragenter: function(e) {
                return function() {
                    return e.showOverlay();
                };
            }(this),
            dragleave: function(e) {
                return function() {
                    return e.$overlay.close();
                };
            }(this)
        });
    };
    n.prototype.endpointUrl = function() {
        return this.model.url() + "/messages";
    };
    n.prototype.setupFileUpload = function() {
        return this.$el.fileupload({
            autoUpload: false,
            dataType: "json",
            dropZone: this.target,
            paramName: "file",
            pasteZone: this.target,
            url: this.endpointUrl()
        });
    };
    n.prototype.onDetach = function() {
        var e;
        if ((e = this.$overlay) != null) {
            return e.close();
        }
        return;
    };
    n.prototype.prompt = function() {
        return this.$("input[type=file]").click();
    };
    n.prototype.render = function() {
        this.$el.empty().append(Helpers.renderTemplate(require("../../templates/shared/fileuploader.mustache"))({
            paramName: "file"
        }));
        this.$el.attr({
            enctype: "multipart/form-data"
        });
        this.$el.css({
            visibility: "hidden"
        });
        this.whenAttached(function() {
            this.setupFileUpload();
            return this.setupDragNDrop();
        });
        return this;
    };
    return n;
}(Flowdock.HierarchicalView);

module.exports = r;
