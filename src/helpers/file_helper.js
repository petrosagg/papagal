Helpers.FileHelper = {
    parseAttachment: function(e) {
        var t;
        t = {
            file: {
                type: this.iconType(e.content_type),
                path: Helpers.apiUrl(this.escapePath(e.path), !0),
                size: Helpers.format.bytes(e.file_size),
                name: e.file_name
            }
        };
        if (e.thumbnail) {
            t.image = {
                width: e.image.width,
                height: e.image.height
            }, t.thumbnail = {
                path: Helpers.apiUrl(this.escapePath(e.thumbnail.path), !0),
                width: e.thumbnail.width,
                height: e.thumbnail.height
            }
        };
        if (e.rotated) {
            t.rotated = {
                path: Helpers.apiUrl(this.escapePath(e.rotated.path), !0)
            }
        };
        return t;
    },
    iconType: function(e) {
        var t, n, r, o, i;
        o = function(e, t) {
            var n, r;
            for (n in t) {
                r = t[n]
                if (-1 !== n.split(",").indexOf(e)) {
                    return r;
                }
            }
        };
        t = {
            audio: function() {
                return "audio";
            },
            video: function() {
                return "video";
            },
            image: function() {
                return "image";
            },
            text: function(e) {
                return o(e, {
                    html: "html",
                    css: "css",
                    plain: "text"
                });
            },
            application: function(e) {
                return o(e, {
                    pdf: "pdf",
                    msword: "word",
                    powerpoint: "powerpoint",
                    "excel,vnd.ms-excel": "excel",
                    "shockwave-flash": "flash",
                    "octet-stream": "binary",
                    "zip,x-zip,x-tar,x-gzip,x-stuffit": "zip"
                });
            }
        };
        n = e.split("/");
        i = n[0];
        r = n[1];
        return (typeof t[i] == "function" ? t[i](r) : void 0) || "document";
    },
    escapePath: function(e) {
        var t;
        t = _.map(e.split("/"), function(e) {
            return encodeURIComponent(e);
        });
        return t.join("/");
    }
};
