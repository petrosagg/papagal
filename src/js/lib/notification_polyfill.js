var r, o, i, s, a = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (u.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, u = {}.hasOwnProperty, l = [].slice;

o = function() {
    function e() {
        this._listeners = {};
    }
    e.prototype.addEventListener = function(e, t) {
        var n;
        (n = this._listeners)[e] || (n[e] = []);
        return this._listeners[e].push(t);
    };
    e.prototype.removeEventListener = function(e, t) {
        var n;
        if (this._listeners[e]) {
            return this._listeners[e] = function() {
                var r, o, i, s;
                for (i = this._listeners[e], s = [], r = 0, o = i.length; o > r; r++) {
                    n = i[r];
                    if (n !== t) {
                        s.push(n)
                    };
                }
                return s;
            }.call(this);
        }
    };
    e.prototype.dispatchEvent = function(e) {
        var t, n, r, o, i;
        if (e.type && (typeof this["on" + e.type] == "function" && this["on" + e.type](e), 
        this._listeners[e.type])) {
            for (o = this._listeners[e.type], i = [], t = 0, n = o.length; n > t; t++) {
                r = o[t];
                i.push(r(e));
            }
            return i;
        }
    };
    e.prototype._event = function(e) {
        var t;
        t = document.createEvent("Event");
        t.initEvent(e);
        return t;
    };
    return e;
}();

r = function(e) {
    function t(e, n) {
        var r, o, i, s, a, u, l, c, p;
        for (n == null && (n = {}), t.__super__.constructor.apply(this, arguments), this.underlying = window.webkitNotifications.createNotification(n.icon, e, n.body), 
        l = t.events, i = 0, a = l.length; a > i; i++) {
            o = l[i];
            this["on" + o] = n["on" + o];
        }
        for (p = function() {
            var e, n, i, s;
            for (i = t.events, s = [], e = 0, n = i.length; n > e; e++) {
                o = i[e];
                s.push(this.removeEventListener(name, r));
            }
            return s;
        }, r = function(e) {
            return function(t) {
                e.dispatchEvent(t);
                if (t.type === "close") {
                    return p();
                }
                return;
            };
        }(this), c = t.events, s = 0, u = c.length; u > s; s++) {
            o = c[s];
            this.underlying.addEventListener(o, r);
        }
        this.underlying.show();
    }
    var n;
    a(t, e);
    t.events = [ "show", "close", "error", "click" ];
    t.available = window.webkitNotifications != null && !(((n = window.Notification) != null ? n.permission : void 0) != null);
    t.requestPermission = function(e) {
        var t;
        if ((t = window.webkitNotifications) != null) {
            return t.requestPermission(e);
        }
        return;
    };
    t.permissionLevel = function() {
        var e, t;
        e = (t = window.webkitNotifications) != null ? t.checkPermission() : void 0;
        if (e === 0) {
            return "granted";
        }
        if (e === 2) {
            return "denied";
        }
        return "default";
    };
    t.prototype.close = function() {
        return this.underlying.close();
    };
    return t;
}(o);

s = function() {
    function e(e, t) {
        if (t == null) {
            t = {}
        };
        this.notification = window.windowsApp.notifier(e, t);
    }
    e.available = window.windowsApp != null;
    e.permission = "granted";
    e.requestPermission = function(e) {
        if (typeof e == "function") {
            return e("granted");
        }
        return;
    };
    e.prototype.addEventListener = function() {
        var e, t;
        e = arguments.length >= 1 ? l.call(arguments, 0) : [];
        if ((t = this.notification) != null) {
            return t.addEventListener.apply(t, e);
        }
        return;
    };
    e.prototype.removeEventListener = function() {
        var e, t;
        e = arguments.length >= 1 ? l.call(arguments, 0) : [];
        if ((t = this.notification) != null) {
            return t.removeEventListener.apply(t, e);
        }
        return;
    };
    e.prototype.close = function() {};
    return e;
}();

i = function(e) {
    function t(e, n) {
        if (n == null) {
            n = {}
        };
        t.__super__.constructor.call(this);
        this.onclose = n.onclose;
        this.onerror = n.onerror;
        this.onshow = n.onshow;
        this._show({
            title: e,
            content: n.body,
            payload: n.payload
        });
    }
    var n;
    a(t, e);
    t.available = (typeof macgap != "undefined" && null !== macgap && (n = macgap.growl) != null ? n.notify : void 0) != null;
    t.permissionLevel = function() {
        return "granted";
    };
    t.requestPermission = function(e) {
        if (typeof e == "function") {
            return e(this.permissionLevel);
        }
        return;
    };
    t.prototype._show = function(e) {
        var t, n;
        if ((typeof macgap != "undefined" && null !== macgap && (n = macgap.growl) != null ? n.notify : void 0) != null) {
            macgap.growl.notify(e);
            this.dispatchEvent(this._event("show"));
            return setTimeout(function(e) {
                return function() {
                    return e.dispatchEvent(e._event("close"));
                };
            }(this), 5e3);
        }
        t = this._event("error");
        t.message("MacGap notifications not available");
        return this.dispatchEvent(t);
    };
    t.prototype.close = function() {};
    return t;
}(o);

window.NotificationPolyfill = {
    polyfills: [ i, r, s ],
    bestAlternative: function() {
        var e, t;
        e = function() {
            var e, n, r, o;
            for (r = NotificationPolyfill.polyfills, o = [], e = 0, n = r.length; n > e; e++) {
                t = r[e];
                if (t.available) {
                    o.push(t)
                };
            }
            return o;
        }();
        if (e.length > 0) {
            return e[0];
        }
        return window.Notification;
    },
    replace: function() {
        return window.Notification = NotificationPolyfill.bestAlternative();
    }
};
