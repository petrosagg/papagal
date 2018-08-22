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

r = require("emojie/emojie");

Collections.Emoji = function(e) {
    function Emoji(e, n) {
        Emoji.__super__.constructor.apply(this, arguments);
        this.populateEmojie();
    }
    o(Emoji, e);
    Emoji.prototype.model = Models.Emoji;
    Emoji.prototype.populateEmojie = function() {
        this.emojie = r({
            ignoreAttribute: "data-no-text-emoji"
        });
        this.each(this.registerEmoji, this);
        return this.emojie.merge(window.emojie.custom);
    };
    Emoji.prototype.registerEmoji = function(e) {
        var t;
        t = e.colonized();
        return this.emojie.register(t, {
            title: t,
            src: e.get("image_url"),
            class: "emojie"
        });
    };
    Emoji.prototype.consume = function(e) {
        return this.addStream(e.filter(function(e) {
            return e.event === "emoji-add";
        }).onValue(function(e) {
            return function(t) {
                var n;
                e.add(n = new Models.Emoji(t.content));
                return e.registerEmoji(n);
            };
        }(this)));
    };
    Emoji.prototype.reset = function(e, n) {
        Emoji.__super__.reset.apply(this, arguments);
        return this.populateEmojie();
    };
    Emoji.prototype.emojie = function(e) {
        return this.emojie(e);
    };
    Emoji.prototype.keys = function() {
        var e, t, n, r, o;
        for (r = this.pluck("id"), o = [], e = 0, n = r.length; n > e; e++) {
            t = r[e];
            o.push(":" + t + ":");
        }
        return o;
    };
    return Emoji;
}(Flowdock.Collection);