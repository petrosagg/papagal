var r;

r = window.AudioContext || window.webkitAudioContext;

Flowdock.AudioNotifications = function() {
    function AudioNotifications(e, t, n) {
        this.activeFlow = e;
        this.user = t;
        this.stream = this.consume(n);
    }
    AudioNotifications.create = function(e, t, n) {
        return new Flowdock.AudioNotifications(e, t, n).stream;
    };
    AudioNotifications.prototype.consume = function(e) {
        var t;
        t = Models.Message.ignoreByFlow(e, Flowdock.windowFocus.and(this.activeFlow)).filter(function(e) {
            return function(t) {
                return t.user !== e.user.id;
            };
        }(this));
        return t.map(function(e) {
            return function(t) {
                var n;
                n = new Models.Message(t);
                if (e.isMention(n)) {
                    return "mention";
                }
                return "chat";
            };
        }(this));
    };
    AudioNotifications.prototype.isMention = function(e) {
        if (e.get("to")) {
            return Number(e.get("to")) === this.user.id && _.include(Models.Filter.Chat.prototype.event, e.get("event"));
        }
        return e.highlights(this.user);
    };
    return AudioNotifications;
}();
