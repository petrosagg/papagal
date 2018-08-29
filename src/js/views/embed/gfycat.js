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

r = React.createFactory(require("components/embed/gifv"));

Views.Embed.Gfycat = function(e) {
    function Gfycat() {
        return Gfycat.__super__.constructor.apply(this, arguments);
    }
    o(Gfycat, e);
    Gfycat.prototype.type = "gifv";
    Gfycat.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Gfycat.__super__.initialize.apply(this, arguments);
        if (e.hideable != null) {
            this.hideable = e.hideable;
        } else {
            this.hideable = true;
        }
        this.url = e.url;
        return this.skipTimeout = e.skipTimeout;
    };
    Gfycat.prototype.load = function() {
        var e, t;
        if (this.shouldLoad()) {
            this.hideable || this.$(".embed-hide-btn").hide();
            t = this.getVideoInfo();
            t.then(function(t) {
                return function(n) {
                    t.renderElement(n != null ? n.gfyItem : undefined);
                    return clearTimeout(e);
                };
            }(this), function(e) {
                return function() {
                    return e.destructor();
                };
            }(this));
            if (this.skipTimeout) {
                return undefined;
            }
            return e = setTimeout(function(e) {
                return function() {
                    return e.destructor();
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
        }
    };
    Gfycat.prototype.renderElement = function(e) {
        var t;
        t = [ {
            key: "mp4",
            type: "video/mp4",
            src: e.mp4Url
        }, {
            key: "webm",
            type: "video/webm",
            src: e.webmUrl
        } ];
        this.embed(r({
            url: this.url,
            sources: t,
            onError: this.destructor.bind(this),
            parent: this.parent
        }));
        return this.render();
    };
    Gfycat.prototype.getVideoInfo = function() {
        var e, n;
        n = Gfycat.parseVideoId(this.url);
        e = "https://gfycat.com/cajax/get/" + n;
        return $.ajax({
            url: e,
            method: "get",
            headers: null
        });
    };
    Gfycat.match = function(e) {
        return Gfycat.parseVideoId(e);
    };
    Gfycat.parseVideoId = function(e) {
        var t;
        t = e.match(/https?:\/\/(?:\w+\.)?gfycat\.com\/([a-zA-Z]+)/);
        if (t) {
            return t[1];
        }
        return null;
    };
    Gfycat.prototype.destructor = function() {
        var e;
        this.embed(e = false);
        return this.hideEmbed();
    };
    return Gfycat;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Gfycat);
