module.exports = Flowdock.MacAudioPlayer = function() {
    function MacAudioPlayer(e) {
        this.volumeStream = e;
        this.sounds = {
            mention: this.sound("mention"),
            chat: this.sound("chat")
        };
        this.unsubscibeVolume = this.volumeStream.onValue(this, "setVolume");
    }
    MacAudioPlayer.load = function(e) {
        return new Flowdock.MacAudioPlayer(e);
    };
    MacAudioPlayer.prototype.sound = function(e) {
        return "./resources/audio/" + e + ".mp3";
    };
    MacAudioPlayer.prototype.play = function(e) {
        if (this.muted) {
            return undefined;
        }
        return _.defer(function(t) {
            return function() {
                return macgap.sound.play(t.sound(e), t._volume);
            };
        }(this));
    };
    MacAudioPlayer.prototype.setVolume = function(e) {
        return this._volume = e;
    };
    MacAudioPlayer.prototype.mute = function(e) {
        return this.muted = e;
    };
    MacAudioPlayer.prototype.unload = function() {
        return this.unsubscibeVolume();
    };
    return MacAudioPlayer;
}();
