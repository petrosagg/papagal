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

Collections.Peaks = function(e) {
    function Peaks() {
        return Peaks.__super__.constructor.apply(this, arguments);
    }
    r(Peaks, e);
    Peaks.prototype.url = function() {
        return Helpers.apiUrl("/notifications/peaks");
    };
    Peaks.prototype.consume = function(e) {
        return this.addStream(e.filter(this, "_filteredMessages").onValue(this, "_updatePeak"));
    };
    Peaks.prototype.parse = function(e) {
        var t, n, r, o, i;
        o = [];
        for (i in e) {
            t = e[i];
            for (r in t) {
                n = t[r];
                o.push({
                    id: r,
                    chat: n.chat,
                    inbox: n.inbox
                });
            }
        }
        return o;
    };
    Peaks.prototype._updatePeak = function(e) {
        var t, n, r;
        t = this._getMessageApp(e);
        r = this._flowOrPrivateId(e);
        if (this.get(r)) {
            if (this.get(r).get(t) >= e.id) {
                return void 0;
            }
            return this.get(r).set(t, e.id);
        }
        n = {
            id: r
        };
        n[t] = e.id;
        return this.add(n);
    };
    Peaks.prototype._getMessageApp = function(e) {
        var t;
        t = (typeof e.get == "function" ? e.get("app") : void 0) || e.app;
        if (t === "influx") {
            return "inbox";
        }
        return t;
    };
    Peaks.prototype._filteredMessages = function(e) {
        var t, n;
        return this._getMessageApp(e) && !((t = e.event) === "user-edit" || t === "activity.user" || e.event === "action" && ((n = e.content.type) === "join" || n === "add_people"));
    };
    Peaks.prototype._flowOrPrivateId = function(e) {
        return (e.flow || this._otherUserId(e)).toString();
    };
    Peaks.prototype._otherUserId = function(e) {
        if (e.user.toString() === Flowdock.app.user.id.toString()) {
            return e.to;
        }
        return e.user;
    };
    return Peaks;
}(Flowdock.Collection);