var r, o, i, s, a = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, u = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (l.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, l = {}.hasOwnProperty;

s = require("../../lib/emoji_data");

o = require("./menu_view");

i = {
    People: "grinning",
    Nature: "seedling",
    Foods: "hamburger",
    Celebration: "gift",
    Activity: "runner",
    Places: "rocket",
    Symbols: "symbols",
    Custom: "star"
};

r = function(t) {
    function n() {
        this.addEmoji = a(this.addEmoji, this);
        this.onBlur = a(this.onBlur, this);
        this.toggleEmojiGroup = a(this.toggleEmojiGroup, this);
        this.scrollTracking = a(this.scrollTracking, this);
        this.filterEmoji = a(this.filterEmoji, this);
        this.handleKeys = a(this.handleKeys, this);
        return n.__super__.constructor.apply(this, arguments);
    }
    var r;
    u(n, t);
    r = 100 / (s.sheetSize - 1);
    n.prototype.template = require("../../templates/shared/emoji_picker.mustache");
    n.prototype.id = "emoji-picker";
    n.prototype.events = function() {
        return {
            "click a[data-emoji-group]": "toggleEmojiGroup",
            "click li[data-emoji-code]": "addEmoji",
            "click .clear": "clearFilter",
            blur: "onBlur"
        };
    };
    n.prototype.initialize = function(e) {
        if (e != null) {
            this.options = e;
        } else {
            this.options = {};
        }
        this.custom = this.options.custom.pluck("id").concat(s.custom);
        return n.__super__.initialize.apply(this, arguments);
    };
    n.prototype.handleKeys = function(e) {
        var t, n, r, o, i, s, a;
        i = e.which;
        t = this.$("li:focus").first();
        o = t.parent().children().length;
        r = t.index();
        if (-1 !== r || 37 !== i && 39 !== i) {
            e.preventDefault();
            if (i === 13) {
                t.click();
                return this.close();
            }
            if (r === -1) {
                return this.$("ul[data-emoji-group]:visible li:first-child").first().focus();
            }
            if (i === 37) {
                return t.prev().focus();
            }
            if (i === 39) {
                return t.next().focus();
            }
            if (i === 38 || i === 40) {
                if (i === 38) {
                    n = -10;
                } else {
                    n = 10;
                }
                s = r + n;
                if (s < 0) {
                    return a = t.parent().prev().find("li:last-child").focus();
                }
                if (s >= o) {
                    return t.parent().next().find("li:eq(" + s % 10 + ")").focus();
                }
                return t.parent().find("li:eq(" + s + ")").focus();
            }
            return;
        }
        return;
    };
    n.prototype.serializeData = function() {
        return {
            preferencesUrl: this.options.preferencesUrl
        };
    };
    n.prototype.onAfterRender = function() {
        this.untilEnd(this.$(".emoji-content").asEventStream("scroll")).throttle(100).onValue(this.scrollTracking);
        this.untilEnd(this.$(".emoji-filter").asEventStream("input")).map(function(e) {
            return e.target.value.toLowerCase();
        }).onValue(this.filterEmoji);
        return _.defer(function(e) {
            return function() {
                return e.$(".emoji-filter").focus();
            };
        }(this));
    };
    n.prototype.filterEmoji = function(e) {
        var t, n;
        t = [];
        this.$(".emojis").toggle(!e);
        this.$(".filter").toggleClass("active", !!e);
        n = this.$(".results").empty();
        if (e) {
            t = _.filter(_.keys(s.codes).concat(this.custom), function(t) {
                return -1 !== ((t != null ? t.code : undefined) || t).indexOf(e);
            });
            return _.each(t, function(e) {
                return function(t) {
                    return n.append($('<li tabindex="0">').attr("data-emoji-code", t).html(e.renderEmoji(t)));
                };
            }(this));
        }
        return;
    };
    n.prototype.clearFilter = function() {
        this.$(".emoji-filter").val("").focus();
        return this.filterEmoji();
    };
    n.prototype.scrollTracking = function(e) {
        return window.requestAnimationFrame(function(t) {
            return function() {
                var n, r, o, i;
                i = e.target.scrollTop;
                n = i + e.target.clientHeight;
                if (n > _.last(t.sections)) {
                    o = t.sections.length - 1;
                } else {
                    o = _.findIndex(t.sections, function(e) {
                        return e > i || e > i && n > e;
                    });
                }
                r = t.$(".emojis ul:eq(" + o + ")")[0].getAttribute("data-emoji-group");
                t.$(".emoji-groups a").removeClass("active");
                return t.$("[data-emoji-group='" + r + "']").addClass("active");
            };
        }(this));
    };
    n.prototype.renderEmoji = function(e) {
        var t, n, o, i;
        n = s.codes[e] || this.options.custom.emojie._emojis[":" + e + ":"];
        if (n.src) {
            return $("<img>").attr(n);
        }
        t = n[0];
        o = n[1];
        i = n[2];
        return $("<i>").attr({
            title: ":" + e + ":",
            class: "emoji"
        }).css({
            backgroundPosition: (o * r).toFixed(4) + "% " + (i * r).toFixed(4) + "%"
        });
    };
    n.prototype.buildMenu = function() {
        _.each(i, function(e, t) {
            var n;
            this.$(".emoji-groups li:last-child").before(this.makeHeaderIcon(t));
            n = $("<ul>").attr("data-emoji-group", t).appendTo(this.$(".emojis"));
            return n.append(this.groupItemsToArray(s.groups[t] || this.custom).join(""));
        }, this);
        this.$(".emoji-groups li:first-child a").addClass("active");
        return this.sections = this.$(".emoji-content ul:visible").map(function(e, t) {
            return t.offsetTop + t.clientHeight - 50;
        });
    };
    n.prototype.makeHeaderIcon = function(e) {
        return $("<li>").append($("<a>").attr("data-emoji-group", e).html(this.renderEmoji(i[e])));
    };
    n.prototype.groupItemsToArray = function(e) {
        return e.map(function(e) {
            return function(t) {
                return "<li tabindex='0' data-emoji-code='" + t + "'>" + e.renderEmoji(t).prop("outerHTML") + "</li>";
            };
        }(this));
    };
    n.prototype.toggleEmojiGroup = function(e) {
        var t, n, r;
        e.stopPropagation();
        this.$("[data-emoji-group]").removeClass("active");
        n = $(e.currentTarget).addClass("active").data("emoji-group");
        t = this.$(".emoji-content");
        r = this.$("ul[data-emoji-group='" + n + "']").offset().top - t.offset().top + t.scrollTop();
        return t.animate({
            scrollTop: r
        }, 100);
    };
    n.prototype.onBlur = function() {
        if (this.options.onClose) {
            return this.options.onClose();
        }
        return;
    };
    n.prototype.addEmoji = function(e) {
        var t;
        t = $(e.currentTarget).data("emoji-code");
        if (this.options.onClose) {
            return this.options.onClose(t);
        }
        return this.options.parent.appendText(":" + t + ":");
    };
    return n;
}(o);

module.exports = r;
