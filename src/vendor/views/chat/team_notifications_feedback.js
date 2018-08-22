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

r = function(t) {
    function n() {
        return n.__super__.constructor.apply(this, arguments);
    }
    o(n, t);
    n.prototype.id = "team-notif-feedback";
    n.prototype.className = "chat-notification";
    n.prototype.template = require("templates/chat/team_notifications_feedback.mustache");
    n.prototype.events = function() {
        return {
            "click .undo": "onUndo",
            "click .close": "onClose"
        };
    };
    n.prototype.serializeData = function() {
        return {
            flowName: this.props.flowName
        };
    };
    n.prototype.partials = function() {
        return {
            content: require(this.props.teamNotificationsOn ? "templates/chat/team_notifications_feedback_on.mustache" : "templates/chat/team_notifications_feedback_off.mustache")
        };
    };
    n.prototype.initialize = function(e) {
        this.props = e;
    };
    n.prototype.onUndo = function() {
        return this.props.onUndo();
    };
    n.prototype.onClose = function() {
        return this.props.onClose();
    };
    return n;
}(Flowdock.ItemView);

module.exports = r;