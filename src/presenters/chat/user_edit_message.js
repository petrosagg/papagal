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

Presenters.ChatMessage.UserEdit = function(e) {
    function UserEdit(e, n, r) {
        n.type = "user-edit";
        UserEdit.__super__.constructor.call(this, "action", n, r);
    }
    r(UserEdit, e);
    return UserEdit;
}(Presenters.ChatMessage.Action);
