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

Views.Embed.Youtube = function(t) {
    function Youtube() {
        return Youtube.__super__.constructor.apply(this, arguments);
    }
    r(Youtube, t);
    Youtube.prototype.type = "youtube";
    Youtube.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Youtube.__super__.initialize.apply(this, arguments);
        this.url = e.url;
        this.videoId = Youtube.parseVideoId(this.url);
        return this.skipTimeout = e.skipTimeout;
    };
    Youtube.prototype.load = function() {
        var e, t;
        if (this.shouldLoad()) {
            e = this.skipTimeout ? void 0 : setTimeout(function(e) {
                return function() {
                    return e.cancelLoading();
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
            t = this.getVideoInfo();
            return t.then(function(t) {
                return function(n) {
                    t.renderElement(n);
                    return clearTimeout(e);
                };
            }(this), function(t) {
                return function() {
                    t.cancelLoading();
                    return clearTimeout(e);
                };
            }(this));
        }
    };
    Youtube.prototype.item = function(e) {
        return _.findWhere(e.items, {
            id: this.videoId
        });
    };
    Youtube.prototype.duration = function(e) {
        return moment.duration(e.contentDetails.duration, moment.ISO_8601).asSeconds();
    };
    Youtube.prototype.renderVideoImage = function() {
        return this.$(".video-image img").one("load", function(e) {
            return function() {
                return e.renderPreview(!0);
            };
        }(this));
    };
    Youtube.prototype.renderElement = function(t) {
        var n, r;
        n = this.item(t);
        if (n) {
            r = Helpers.renderTemplate(require("../../templates/embed/video.mustache"))({
                url: this.url,
                title: n.snippet.title,
                duration: Helpers.format.duration(this.duration(n)),
                image: this.thumbnailUrl(t),
                author: {
                    name: n.snippet.author
                }
            }), this.embed($.parseHTML(r)), this.renderVideoImage()
        };
        return this.render();
    };
    Youtube.prototype.cancelLoading = function() {
        return this.embed(!1);
    };
    Youtube.prototype.getVideoInfo = function() {
        var e;
        e = "https://www.googleapis.com/youtube/v3/videos?id=" + this.videoId + ("&key=" + Flowdock.youtube.key + "&part=snippet,statistics,contentDetails");
        return $.getJSON(e);
    };
    Youtube.prototype.thumbnailUrl = function(e) {
        var t, n;
        t = this.item(e).snippet.thumbnails;
        n = t["default"].url;
        return n.replace(/^http\:/, "https:");
    };
    Youtube.match = function(e) {
        return Youtube.parseVideoId(e);
    };
    Youtube.parseVideoId = function(e) {
        var t;
        t = e.match(/youtube\.com\/watch\?(?:.+&|)v=([\w-]+)|youtu\.be\/([\w-]+)(\?.+)?$/i);
        if (t) {
            return t[2] || t[1];
        }
        return null;
    };
    return Youtube;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Youtube);