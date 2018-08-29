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

Views.Embed.Spotify = function(t) {
    function Spotify() {
        return Spotify.__super__.constructor.apply(this, arguments);
    }
    r(Spotify, t);
    Spotify.prototype.type = "spotify";
    Spotify.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Spotify.__super__.initialize.apply(this, arguments);
        this.url = e.url;
        this.spotifyUrl = Spotify.parseSpotifyApiUrl(this.url);
        return this.skipTimeout = e.skipTimeout;
    };
    Spotify.prototype.load = function() {
        var e, t;
        if (this.shouldLoad()) {
            e = this.getMusicInfo();
            e.then(function(e) {
                return function(n) {
                    e.renderElement(n);
                    return clearTimeout(t);
                };
            }(this), function(e) {
                return function() {
                    e.cancelLoading();
                    return clearTimeout(t);
                };
            }(this));
            if (this.skipTimeout) {
                return undefined;
            }
            return t = setTimeout(function(e) {
                return function() {
                    return e.cancelLoading();
                };
            }(this), Views.Embed.Embeddable.TIMEOUT);
        }
    };
    Spotify.prototype.renderElement = function(t) {
        var n, r;
        switch (t.type) {
          case "track":
            r = Helpers.renderTemplate(require("../../templates/embed/spotify.track.mustache"))({
                icon: Flowdock.icons.spotify,
                track: t.name,
                album: t.album.name,
                artist: function() {
                    var e, r, o, i;
                    for (o = t.artists, i = [], e = 0, r = o.length; r > e; e++) {
                        n = o[e];
                        i.push(n.name);
                    }
                    return i;
                }().join(", ")
            });
            break;

          case "album":
            r = Helpers.renderTemplate(require("../../templates/embed/spotify.album.mustache"))({
                icon: Flowdock.icons.spotify,
                album: t.name,
                artist: function() {
                    var e, r, o, i;
                    for (o = t.artists, i = [], e = 0, r = o.length; r > e; e++) {
                        n = o[e];
                        i.push(n.name);
                    }
                    return i;
                }().join(", ")
            });
            break;

          case "artist":
            r = Helpers.renderTemplate(require("../../templates/embed/spotify.artist.mustache"))({
                icon: Flowdock.icons.spotify,
                artist: t.name
            });
        }
        this.embed($.parseHTML(r));
        return this.render();
    };
    Spotify.prototype.cancelLoading = function() {
        return this.embed(false);
    };
    Spotify.prototype.getMusicInfo = function() {
        return $.ajax({
            url: this.spotifyUrl,
            method: "get",
            headers: null
        });
    };
    Spotify.match = function(e) {
        return Spotify.parseSpotifyApiUrl(e);
    };
    Spotify.parseSpotifyApiUrl = function(e) {
        var t;
        t = e.match(/(?:open|play)\.spotify\.com\/(artist|album|track)\/(\w+)$/i);
        if (t) {
            return "https://api.spotify.com/v1/" + t[1] + "s/" + t[2];
        }
        return null;
    };
    return Spotify;
}(Views.Embed.Embeddable);

Views.Embed.register(Views.Embed.Spotify);
