var r;

r = function() {
    function e(e, t) {
        if (e == null) {
            e = {}
        };
        if (t == null) {
            t = {}
        };
        this._global = {};
        this._flows = {};
        this.parse(e);
    }
    e.prototype.defaults = {
        chat_desktop_notifications: true,
        chat_sound_notifications: true,
        inbox_desktop_notifications: true,
        inbox_sound_notifications: true,
        mentions_desktop_notifications: true,
        mentions_sound_notifications: true,
        private_desktop_notifications: true,
        private_sound_notifications: true
    };
    e.prototype.parse = function(e) {
        var t, n, r, o, i, s, a;
        if (e == null) {
            e = {}
        };
        o = e.global;
        for (n in o) {
            a = o[n];
            this._global[n] = this._mapBooleanValue(a);
        }
        i = e.flows;
        s = [];
        for (t in i) {
            r = i[t];
            this._flows[t] = {};
            s.push(function() {
                var e;
                e = [];
                for (n in r) {
                    a = r[n];
                    e.push(this._flows[t][n] = this._mapBooleanValue(a));
                }
                return e;
            }.call(this));
        }
        return s;
    };
    e.prototype.get = function(e, t) {
        var n;
        if (((n = this._flows[t]) != null ? n[e] : undefined) != null) {
            return this._flows[t][e];
        }
        if (this._global[e] != null) {
            return this._global[e];
        }
        return this.defaults[e];
    };
    e.prototype._mapBooleanValue = function(e) {
        switch (e) {
          case "true":
            return true;

          case "false":
            return false;

          default:
            return e;
        }
    };
    return e;
}();

module.exports = r;
