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

r = React.createFactory(require("components/overlays/image_overlay"));

Views.Embed.Image = function(e) {
    function Image() {
        return Image.__super__.constructor.apply(this, arguments);
    }
    o(Image, e);
    Image.prototype.type = "image";
    Image.prototype.events = _.extend({}, Views.Embed.Embeddable.prototype.events, {
        "click img": "openOverlay"
    });
    Image.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Image.__super__.initialize.apply(this, arguments);
        this.originalUrl = e.url;
        this.url = Image.url(decodeURI(e.rotatedUrl || e.url));
        this.skipTimeout = e.skipTimeout;
        return this.hideable = e.hideable != null ? e.hideable : true;
    };
    Image.prototype.destructor = function() {
        var e;
        if (this.loadTimeout) {
            clearTimeout(this.loadTimeout)
        };
        if ((e = this.$image) != null) {
            e.off("load")
        };
        this.loadTimeout = this.$image = null;
        return Image.__super__.destructor.apply(this, arguments);
    };
    Image.prototype.load = function() {
        var e, n;
        if (this.shouldLoad()) {
            e = new window.Image();
            this.$image = $(e);
            this.$image.one("load", function(t) {
                return function() {
                    t.embed(e);
                    t.renderPreview(true);
                    if (!t.hideable) {
                        t.$(".embed-hide-btn").hide()
                    };
                    return clearTimeout(t.loadTimeout);
                };
            }(this));
            this.$image.one("error", function(t) {
                return function() {
                    return t.embed(e = false);
                };
            }(this));
            e.src = this.url;
            e.alt = this.url;
            if (Image.isImageFileURL(this.url)) {
                if ((n = this.url.replace(/\?.*/, "").match(/([^\/]+)$/)) != null) {
                    e.title = n[0];
                } else {
                    e.title = undefined;
                }
            } else {
                e.title = this.originalUrl;
            }
            if (this.skipTimeout) {
                return undefined;
            }
            return this.loadTimeout = setTimeout(function(t) {
                return function() {
                    t.$image.off("load");
                    return t.embed(e = false);
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
        }
    };
    Image.isImageFileURL = function(e) {
        return e.match(/(\.jpg|\.jpeg|\.png|\.gif)(#|\?|$)/i);
    };
    Image.url = function(e) {
        var n, r, o, i, s, a, u, l;
        if (e.match(/^https:\/\/www\.dropbox\.com\//i)) {
            return e.replace("www.dropbox.com", "dl.dropboxusercontent.com");
        }
        if (Image.isImageFileURL(e)) {
            return e;
        }
        if (e.match(/^http:\/\/d\.pr\//i) && e[e.length - 1] !== "+") {
            return e + "+";
        }
        if (e.match(/^http:\/\/cl\.ly\//i)) {
            return e + "/src";
        }
        if (e.match(/^https?:\/\/pbs\.twimg\.com\/media/i)) {
            return e.replace(/:\w+$/, "");
        }
        if (e.match(/^https?:\/\/monosnap\.com\/image/i)) {
            if ((r = e.match(/(\w+)\/?$/)) != null) {
                n = r[1];
            } else {
                n = undefined;
            }
            return "https://api.monosnap.com/image/download?id=" + n;
        }
        if (e.match(/^https?:\/\/infinit\.io\/_\/(\w+)$/i)) {
            return e + ".png";
        }
        if ((o = e.match(/^https?:\/\/inft\.ly\/(\w+)$/i)) != null) {
            n = o[1];
        } else {
            n = undefined;
        }
        if (n) {
            return "https://infinit.io/_/" + n + ".png";
        }
        if ((i = e.match(/^https?:\/\/(?:www\.)?instagram\.com\/(?:[^\/]+\/)?p\/([^\/]+)/i)) != null) {
            n = i[1];
        } else {
            n = undefined;
        }
        if (n) {
            return "https://instagram.com/p/" + n + "/media/?size=l";
        }
        if ((s = e.match(/^https?:\/\/imgur\.com\/(\w+)(\/)?$/i)) != null) {
            n = s[1];
        } else {
            n = undefined;
        }
        if (n) {
            return "https://i.imgur.com/" + n + ".gif";
        }
        if ((a = e.match(/^https?:\/\/giphy\.com\/gifs\/(?:.+-)?([^-]+)$/i)) != null) {
            n = a[1];
        } else {
            n = undefined;
        }
        if (n) {
            return "http://i.giphy.com/" + n + ".gif";
        }
        if ((u = e.match(/^https:\/\/(?:docs|drive)\.google\.com\/(?:a\/.+?\/)?file\/d\/(.+?)(?:\/view|\/edit)?(?:\?[^?]*)?$/i)) != null) {
            n = u[1];
        } else {
            n = undefined;
        }
        if (n) {
            return "https://drive.google.com/uc?export=view&id=" + n;
        }
        if ((l = e.match(/^https?:\/\/drive\.google\.com\/open\?(?:\w+=[^&]*&)*id=([^&]+)/i)) != null) {
            n = l[1];
        } else {
            n = undefined;
        }
        if (n) {
            return "https://drive.google.com/uc?export=view&id=" + n;
        }
        if (e.match(/^https?:\/\/drive\.google\.com\/uc\?(?:export=\w+?&)?id=\w+/i)) {
            return e + "#";
        }
        return e;
    };
    Image.match = function(e) {
        var n;
        if (!Image.isImageFileURL(e) && Image.url(e) === e) {
            return false;
        }
        try {
            return !!decodeURI(e);
        } catch (r) {
            return n = r, !1;
        }
    };
    Image.prototype.openOverlay = function(e) {
        var t;
        if (!((e != null ? e.ctrlKey : undefined) || (e != null ? e.metaKey : undefined)) && this._embedded) {
            if (e != null) {
                e.preventDefault()
            };
            t = new Views.Shared.Overlay({
                target: $("body"),
                className: "image-overlay",
                id: "image-overlay",
                removeOnHide: true
            }).attach();
            return t.component(t.el, r({
                url: this.url,
                original: this.originalUrl,
                onClose: t.close.bind(t)
            }));
        }
    };
    return Image;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Image);
