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

Views.Shared.TypingUsers = function(e) {
    function TypingUsers() {
        return TypingUsers.__super__.constructor.apply(this, arguments);
    }
    r(TypingUsers, e);
    TypingUsers.prototype.className = "typing-users";
    TypingUsers.prototype.initialize = function(e) {
        return this._users = e.users;
    };
    TypingUsers.prototype.render = function() {
        this.users().onValue(function(e) {
            return function(n) {
                return e.$el.text(TypingUsers.formatUsers(n));
            };
        }(this));
        return this;
    };
    TypingUsers.prototype.users = function() {
        return Flowdock.app.preferences.typingActivity().flatMapLatest(function(e) {
            return function(t) {
                if (t) {
                    return e._users;
                }
                return Bacon.once([]);
            };
        }(this)).takeUntil(this.asEventStream("destructor"));
    };
    TypingUsers.formatUsers = function(e) {
        if (e.length > 2) {
            return e[0].nick() + " and " + (e.length - 1) + " others are typing…";
        }
        if (e.length === 2) {
            return e[0].nick() + " and " + e[1].nick() + " are typing…";
        }
        if (e.length === 1) {
            return e[0].nick() + " is typing…";
        }
        return "";
    };
    TypingUsers.prototype.destructor = function() {
        TypingUsers.__super__.destructor.apply(this, arguments);
        return this._users = null;
    };
    return TypingUsers;
}(Flowdock.HierarchicalView);