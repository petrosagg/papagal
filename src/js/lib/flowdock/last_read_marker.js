Flowdock.LastReadMarker = function() {
    function LastReadMarker(e) {
        var t;
        this.name = e.name;
        this.listDirection = e.listDirection;
        this.jumpIndicator = e.jumpIndicator;
        this.jumpToMessage = e.jumpToMessage;
        t = e.messageList;
        this.end = new Bacon.Bus();
        this.setupMessageList(t);
        this.endJumpToListeners = new Bacon.Bus();
        this.overrideAttachReset = false;
    }
    LastReadMarker.prototype.cleanup = function() {
        this.end.push(Bacon.Next());
        this.endJumpToListeners.push(Bacon.Next());
        return this.messageList = this.jumpIndicator = this.jumpToMessage = this.end = this.endJumpToListeners = null;
    };
    LastReadMarker.prototype.setupMessageList = function(e) {
        var t, n, r;
        if ((n = this.messageList) != null) {
            n.trigger("remove-last-read-listener")
        };
        this.messageList = e;
        t = this.messageList.asEventStream("view:attach:before").doAction(function(e) {
            return function() {
                return e.setLastReadMessageIdOnAttach();
            };
        }(this));
        r = Bacon.mergeAll([ t, this.messageList.asEventStream("renderMessages"), this.messageList.collection.asEventStream("messagesAdded") ]).filter(function(e) {
            return function() {
                return e.messageList.collection.length > 0;
            };
        }(this)).map(function(e) {
            return function() {
                return e.lastReadMessageIdOnAttach;
            };
        }(this)).filter(function(e) {
            return e;
        }).filter(function(e) {
            return function() {
                return !(e.name === "inbox" && e.messageList.viewModel.get("filter") !== "{}");
            };
        }(this)).takeUntil(this.end);
        r.filter(function(e) {
            return function(t) {
                return !e._messageIdInHistory(t);
            };
        }(this)).onValue(this, "setLastReadMessageIndicator");
        return r.filter(function(e) {
            return function(t) {
                return e._messageIdInHistory(t);
            };
        }(this)).onValue(this, "buildJumpToMarkerIndicator");
    };
    LastReadMarker.prototype.setLastReadMessageIdOnAttach = function() {
        if (this.overrideAttachReset) {
            return this.overrideAttachReset = false;
        }
        return this.lastReadMessageIdOnAttach = this.lastReadMessageId();
    };
    LastReadMarker.prototype.lastReadMessageId = function() {
        return Flowdock.app.markers.getMarker(this.messageList.model, this.name);
    };
    LastReadMarker.prototype.messageFromId = function(e) {
        return this.messageList.collection.find(function(t) {
            return t.get("id") === e;
        });
    };
    LastReadMarker.prototype.setLastReadMessageIndicator = function(e) {
        var t, n, r, o, i;
        o = this.messageList.collection.get(e);
        n = this.messageList.collection.slice(this.messageList.collection.indexOf(o) + 1);
        r = this._findLastConsecutiveMessageFromCurrentUser(n) || o;
        i = _.last(this.messageList.findSubviews(r));
        if (e === this.lastReadMessageIdOnAttach && (i != null ? i.$el.hasClass("last-read-message") : 0) || (this._removeIndicators(), 
        !i || this._isFirstChild(i) || (i != null && i.$el.addClass("last-read-message"), 
        t = $("<div>").addClass("last-read-message-text").html("new messages"), this.listDirection === "up" ? i != null && i.$el.prepend(t) : i != null && i.$el.append(t), 
        this._visibleInScreen(i.$el)))) {
            return undefined;
        }
        return this.buildJumpToMarkerIndicator(r.id);
    };
    LastReadMarker.prototype.buildJumpToMarkerIndicator = function(t) {
        this._removeJumpToMarker();
        if (!this.markerIndicator && _.isFunction(this.jumpIndicator)) {
            t = t || this.lastReadMessageIdOnAttach;
            if (t) {
                this.markerIndicator = $(Helpers.renderTemplate(require("../../templates/shared/jump_to_marker.mustache"))());
                this.markerIndicator.find("[data-marker-jump]").asEventStream("click").takeUntil(this.endJumpToListeners).take(1).onValue(function(e) {
                    return function() {
                        e._removeJumpToMarker();
                        e.lastReadMessageIdOnAttach = t;
                        e.overrideAttachReset = e._messageIdInHistory(t);
                        return e.jumpToMessage(t);
                    };
                }(this));
                this.markerIndicator.find("[data-marker-remove]").asEventStream("click").takeUntil(this.endJumpToListeners).take(1).onValue(function(e) {
                    return function() {
                        return e._removeJumpToMarker();
                    };
                }(this));
                this.jumpIndicator(this.markerIndicator);
                return this.messageList.$el.asEventStream("scroll").filter(function(e) {
                    return function() {
                        var t;
                        t = e.messageList.$(".last-read-message");
                        return t.length > 0 && e._visibleInScreen(t);
                    };
                }(this)).takeUntil(this.endJumpToListeners).take(1).onValue(function(e) {
                    return function() {
                        return e._removeJumpToMarker();
                    };
                }(this));
            }
            return;
        }
        return;
    };
    LastReadMarker.prototype._isFirstChild = function(e) {
        var t;
        if (this.listDirection === "up") {
            t = this.messageList.$el.children("li").first()[0];
        } else {
            t = this.messageList.$el.children("li").last()[0];
        }
        return t === (e != null ? e.$el[0] : undefined);
    };
    LastReadMarker.prototype._visibleInScreen = function(e) {
        return e.offset().top >= this.messageList.$el.offset().top;
    };
    LastReadMarker.prototype._messageIdInHistory = function(e) {
        var t;
        t = this.messageList.collection.min(function(e) {
            return e.get("id");
        });
        return t.get("id") > e;
    };
    LastReadMarker.prototype._removeIndicators = function() {
        this._removeJumpToMarker();
        return this._removeLastReadMarker();
    };
    LastReadMarker.prototype._removeJumpToMarker = function() {
        var e;
        this.endJumpToListeners.push(Bacon.Next());
        if ((e = this.markerIndicator) != null) {
            e.remove()
        };
        return this.markerIndicator = null;
    };
    LastReadMarker.prototype._removeLastReadMarker = function() {
        return this.messageList.$(".last-read-message").removeClass("last-read-message").find(".last-read-message-text").remove();
    };
    LastReadMarker.prototype._findLastConsecutiveMessageFromCurrentUser = function(e) {
        var t, n, r, o;
        for (n = undefined, t = 0, r = e.length; r > t && (o = e[t], o.get("user").toString() === Flowdock.app.user.id.toString()); t++) {
            n = o;
        }
        return n;
    };
    return LastReadMarker;
}();
