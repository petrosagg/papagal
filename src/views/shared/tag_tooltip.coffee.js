var r, o, i, s = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (a.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, a = {}.hasOwnProperty;

r = require("./coach_tooltip");

i = require("tether");

o = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    s(n, t);
    n.prototype.events = {
        "click .coach-tooltip-next.group": "openGroupSettings",
        "click .coach-tooltip-next.team": "toggleMute",
        "click .coach-tooltip-stop": "close",
        "click [data-user]": "toggleUserCard"
    };
    n.prototype.id = "tag-tip";
    n.prototype.template = require("templates/shared/tag_tooltip.mustache");
    n.prototype.initialize = function(e) {
        this.options = e != null ? e : {};
        return _.defer(function(e) {
            return function() {
                return e.untilEnd($(window).asEventStream("blur click")).onValue(e, "close");
            };
        }(this));
    };
    n.prototype.openGroupSettings = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.tag_tooltip_group_settings_clicked);
        return Flowdock.app.manager.openFlowSettings(this.options.flow, "groups");
    };
    n.prototype.toggleMute = function() {
        this.options.onMute();
        this.close();
        return !1;
    };
    n.prototype.toggleUserCard = function(e) {
        e.stopPropagation();
        return this.options.toggleUserCard(e);
    };
    n.prototype.addTether = function(e) {
        this.tether = new i({
            element: this.$el,
            target: e,
            attachment: "bottom center",
            targetModifier: "visible",
            optimizations: {
                gpu: !1
            },
            constraints: [ {
                to: "scrollParent",
                attachment: "together",
                pin: [ "left", "right" ]
            } ]
        });
        return this.$el.addClass("coach-tooltip-enter");
    };
    n.prototype.serializeData = function() {
        var e, t;
        t = this.options.tagType === "group";
        e = this.options.childPillsHTML;
        return {
            childPillsHTML: e,
            noMembers: e === "" && t,
            isGroup: t,
            isTeam: this.options.tagType === "team",
            muteVerb: this.options.muteVerb,
            tag: this.options.tag
        };
    };
    n.prototype.close = function() {
        var e;
        if (typeof (e = this.options).onClose == "function") {
            e.onClose(this)
        };
        return this.fadeOut(function(e) {
            return function() {
                return e.destructor();
            };
        }(this));
    };
    n.prototype.destructor = function() {
        var e;
        n.__super__.destructor.apply(this, arguments);
        if ((e = this.tether) != null) {
            return e.destroy();
        }
        return;
    };
    return n;
}(r);

module.exports = o;