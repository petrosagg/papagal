Flowdock.FlowActivities = function() {
    function FlowActivities(e) {
        this.peaks = e.peaks;
        this.markers = e.markers;
        this.notificationItems = e.notificationItems;
        this.flows = e.flows;
        this.privates = e.privates;
        this.end = new Bacon.Bus();
        this.flowActivities = Bacon.mergeAll(this.peaks.asEventStream("add change sync remove"), this.markers.asEventStream("add change sync remove"), this.notificationItems.asEventStream("add change sync remove"), this.flows.asEventStream("add remove change"), this.privates.asEventStream("add remove change")).map(this, "_mapActivities").takeUntil(this.end).toProperty(this._mapActivities());
        this.combinedActivity = this.flowActivities.map(this, "_combineActivities").skipDuplicates();
    }
    FlowActivities.prototype.activityFor = function(e) {
        return this.flowActivities.map(function(t) {
            return _.find(t, function(t) {
                return t.id === e.id;
            });
        }).filter(function(e) {
            return e;
        }).skipDuplicates();
    };
    FlowActivities.prototype.destructor = function() {
        var e;
        if ((e = this.end) != null) {
            e.end()
        };
        return this.flowActivities = this.combinedActivity = this.peaks = this.markers = this.notificationItems = this.flows = this.privates = this.end = null;
    };
    FlowActivities.prototype._combineActivities = function(e) {
        var t, n, r, o;
        for (t = {
            chat: !1,
            inbox: !1,
            mentions: this.notificationItems.unreadCount()
        }, r = 0, o = e.length; o > r; r++) {
            n = e[r];
            if (n.chat) {
                t.chat = !0
            };
            if (n.inbox) {
                t.inbox = !0
            };
        }
        return t;
    };
    FlowActivities.prototype._mapActivities = function() {
        var e;
        e = this.flows.where({
            open: !0
        }).concat(this.privates.where({
            open: !0
        }));
        return _.map(e, function(e) {
            return function(t) {
                return {
                    id: t.id,
                    chat: e._getAppActivity(t, "chat"),
                    inbox: e._getAppActivity(t, "inbox"),
                    mentions: e.notificationItems.unreadCount(t) || 0
                };
            };
        }(this));
    };
    FlowActivities.prototype._getAppActivity = function(e, t) {
        var n;
        if (e.isFlow()) {
            return this._comparePeaksAndMarkers((n = this.peaks.get(e.id)) != null ? n.get(t) : void 0, this.markers.getMarker(e, t));
        }
        return !1;
    };
    FlowActivities.prototype._comparePeaksAndMarkers = function(e, t) {
        if (e) {
            if (t) {
                return e > t;
            }
            return !0;
        }
        return !1;
    };
    return FlowActivities;
}();