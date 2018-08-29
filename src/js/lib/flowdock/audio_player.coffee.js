var r, o, i, s;

s = require("howler");

r = s.Howl;

o = s.Howler;

i = function() {
    if (o.ctx) {
        o.ctx.resume();
        return window.removeEventListener("mousedown", i);
    }
    return;
};

window.addEventListener("mousedown", i, true);

module.exports = Flowdock.AudioPlayer = function() {
    function AudioPlayer(e) {
        this.volumeStream = e;
        this.sounds = {
            mention: this.sound("mention"),
            chat: this.sound("chat")
        };
        this.unsubscibeVolume = this.volumeStream.onValue(this, "volume");
    }
    AudioPlayer.load = function(e) {
        return new Flowdock.AudioPlayer(e);
    };
    AudioPlayer.prototype.volume = function(e) {
        return o.volume(e);
    };
    AudioPlayer.prototype.sound = function(e) {
        var t;
        return ((t = this.sounds) != null ? t[e] : undefined) || new r({
            src: [ Flowdock.audios.ogg[e], Flowdock.audios.mp3[e] ]
        });
    };
    AudioPlayer.prototype.play = function(e) {
        if (this.muted) {
            return undefined;
        }
        return _.defer(function(t) {
            return function() {
                return t.sound(e).play();
            };
        }(this));
    };
    AudioPlayer.prototype.unloadSound = function(e) {
        if (this.sounds[e]) {
            this.sounds[e].unload();
            return this.sounds[e] = null;
        }
        return;
    };
    AudioPlayer.prototype.mute = function(e) {
        return this.muted = e;
    };
    AudioPlayer.prototype.unload = function() {
        var e, t, n, r;
        for (n = this.sounds, e = 0, t = n.length; t > e; e++) {
            r = n[e];
            this.unloadSound(r);
        }
        return this.sounds = null;
    };
    return AudioPlayer;
}();
