var r;

r = function() {
    function e(e, t) {
        this.model = e;
        this["private"] = t;
    }
    e.prototype.id = function() {
        return "user-" + this.model.id;
    };
    e.prototype.description = function() {
        return this.model.get("email");
    };
    e.prototype.icon = function() {
        return {
            avatar: this.model.avatar(120),
            title: this.model.get("name")
        };
    };
    e.prototype.hasUsers = function() {
        return !1;
    };
    e.prototype.lastMessageAt = function() {
        var e;
        return moment(new Date(((e = this["private"]) != null ? e.get("last_message_at") : void 0) || 0));
    };
    e.prototype.name = function() {
        return "@" + this.model.get("nick");
    };
    e.prototype.specifier = function() {
        return this.model.get("name");
    };
    e.prototype.url = function() {
        return "/app/private/" + this.model.id;
    };
    e.prototype.userCount = function() {
        return 0;
    };
    e.prototype.visibleUsers = function() {
        return [];
    };
    return e;
}();

module.exports = r;