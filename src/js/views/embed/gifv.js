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

Views.Embed.Gifv = function(e) {
    function Gifv() {
        return Gifv.__super__.constructor.apply(this, arguments);
    }
    o(Gifv, e);
    Gifv.prototype.type = "gifv";
    Gifv.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Gifv.__super__.initialize.apply(this, arguments);
        if (e.hideable != null) {
            this.hideable = e.hideable;
        } else {
            this.hideable = true;
        }
        return this.video = this.createElement(decodeURI(e.rotatedUrl || e.url));
    };
    Gifv.prototype.load = function() {
        if (this.shouldLoad()) {
            this.renderVideo();
            if (this.hideable) {
                return undefined;
            }
            return this.$(".embed-hide-btn").hide();
        }
        return;
    };
    Gifv.prototype.renderVideo = function() {
        this.embed(this.video);
        return this.render();
    };
    Gifv.prototype.createElement = function(e) {
        var t, n, o;
        if ((t = e.match(/(https?\:\/\/(?:i\.)?imgur\.com\/\w+)\.(?:gifv|mp4|webm)$/)) != null) {
            o = t[1];
        } else {
            o = undefined;
        }
        if (o) {
            n = [ {
                key: "mp4",
                type: "video/mp4",
                src: o + ".mp4"
            }, {
                key: "webm",
                type: "video/webm",
                src: o + ".webm"
            } ];
            return r({
                url: e,
                sources: n,
                onError: this.destructor.bind(this),
                parent: this.parent
            });
        }
    };
    Gifv.match = function(e) {
        return e.match(/https?\:\/\/(?:i\.)?imgur\.com\/(\w+)\.(?:gifv|mp4|webm)$/);
    };
    Gifv.prototype.destructor = function() {
        this.hideEmbed();
        return this.video = null;
    };
    return Gifv;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Gifv);
