Flowdock.TitleManager = function() {
    function TitleManager(e, t, n) {
        this.activityProperty = e;
        this.activeFlow = t;
        this.user = n.id || n;
    }
    TitleManager.prototype.start = function() {
        return Bacon.combineAsArray(this.activeFlow, this.activityProperty, Flowdock.app.preferences.mute()).flatMapLatest(function(e) {
            var t, n, r, o;
            n = e[0];
            t = e[1];
            r = e[2];
            if (r) {
                return Bacon.once([ n, {
                    chat: false,
                    mentions: 0
                } ]);
            }
            if (n) {
                o = n.asProperty("name").changes().map([ n, t ]);
            } else {
                o = Bacon.never();
            }
            return Bacon.once([ n, t ]).merge(o);
        }).onValue(this.update);
    };
    TitleManager.prototype.update = function(t) {
        var n, r;
        r = t[0];
        n = t[1];
        Helpers.setWindowTitle(r, n.chat, n.mentions);
        return TitleManager.setDockBadge(n.chat, n.mentions);
    };
    TitleManager.setDockBadge = function(e, t) {
        if (window.macgap != null) {
            return macgap.dock.badge = this.badgeString(e, t);
        }
        if (window.windowsApp != null) {
            return window.windowsApp.setBadgeLabel(this.badgeString(e, t));
        }
        return;
    };
    TitleManager.badgeString = function(e, t) {
        if (t) {
            return "" + t;
        }
        if (e) {
            return "⋯";
        }
        return null;
    };
    return TitleManager;
}();
