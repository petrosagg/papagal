var r = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
};

Flowdock.EmojiControl = function() {
    function EmojiControl(e) {
        this.preference = e;
        this.setupEmojiSize = r(this.setupEmojiSize, this);
        _.extend(this, Backbone.Events);
    }
    EmojiControl.prototype.start = function() {
        return this.preference.onValue(this.setupEmojiSize);
    };
    EmojiControl.prototype.element = function() {
        return $("body");
    };
    EmojiControl.prototype.setupEmojiSize = function(e) {
        if (e == null) {
            e = "0"
        };
        return this.element().removeClass("emoji-0 emoji-1 emoji-2 emoji-3 emoji-4").addClass("emoji-" + e);
    };
    return EmojiControl;
}();
