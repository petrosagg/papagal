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

Views.Embed.Vimeo = function(t) {
    function Vimeo() {
        return Vimeo.__super__.constructor.apply(this, arguments);
    }
    r(Vimeo, t);
    Vimeo.prototype.type = "vimeo";
    Vimeo.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Vimeo.__super__.initialize.apply(this, arguments);
        this.url = e.url;
        this.vimeoId = Vimeo.parseVideoId(this.url);
        return this.skipTimeout = e.skipTimeout;
    };
    Vimeo.prototype.load = function() {
        var e, t;
        if (this.shouldLoad()) {
            t = this.getVideoInfo();
            t.then(function(t) {
                return function(n) {
                    t.renderElement(_.first(n));
                    return clearTimeout(e);
                };
            }(this), function(e) {
                return function() {
                    return e.cancelLoading();
                };
            }(this));
            if (this.skipTimeout) {
                return undefined;
            }
            return e = setTimeout(function(e) {
                return function() {
                    return e.cancelLoading();
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
        }
    };
    Vimeo.prototype.renderVideoImage = function() {
        return this.$(".video-image img").one("load", function(e) {
            return function() {
                return e.renderPreview(true);
            };
        }(this));
    };
    Vimeo.prototype.renderElement = function(t) {
        var n;
        n = Helpers.renderTemplate(require("../../templates/embed/video.mustache"))({
            url: this.url,
            title: t.title,
            description: t.description,
            duration: Helpers.format.duration(t.duration),
            image: t.thumbnail_medium.replace(/^http\:/, "https:"),
            author: {
                name: t.user_name
            }
        });
        this.renderVideoImage();
        this.embed($.parseHTML(n));
        return this.render();
    };
    Vimeo.prototype.cancelLoading = function() {
        var e;
        return this.embed(e = false);
    };
    Vimeo.prototype.getVideoInfo = function() {
        var e;
        e = "https://vimeo.com/api/v2/video/" + this.vimeoId + ".json";
        return $.ajax({
            url: e,
            method: "get",
            headers: null
        });
    };
    Vimeo.match = function(e) {
        return Vimeo.parseVideoId(e);
    };
    Vimeo.parseVideoId = function(e) {
        var t;
        t = e.match(/https?:\/\/(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/);
        if (t) {
            return t[3];
        }
        return null;
    };
    return Vimeo;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Vimeo);
