var r, o = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, i = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (s.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, s = {}.hasOwnProperty;

r = require("../shared/share_warning.coffee");

Views.Shared.MessageList = function(t) {
    function MessageList() {
        this.renderBackwardLoader = o(this.renderBackwardLoader, this);
        this.renderHeader = o(this.renderHeader, this);
        this.canPurgeMessages = o(this.canPurgeMessages, this);
        this.keyboardEventFilter = o(this.keyboardEventFilter, this);
        return MessageList.__super__.constructor.apply(this, arguments);
    }
    i(MessageList, t);
    MessageList.prototype.tagName = "ul";
    MessageList.prototype.className = "message-list";
    MessageList.prototype.scrollThreshold = 25;
    MessageList.prototype.collectionEvents = {
        historyAdd: "onHistoryAdd",
        add: "onAdd",
        remove: "onRemove"
    };
    MessageList.prototype.removeTimeout = null;
    MessageList.prototype.scrollAnimationDuration = 100;
    MessageList.prototype.keyboardEventFilter = function(e) {
        return e.activeSide === this.listName;
    };
    MessageList.prototype.initialize = function(e) {
        var t;
        this.options = _.defaults(e, {
            tags: true
        });
        this.bindKeyboardEvents();
        this.state = {
            renderMessages: this.options.renderMessages
        };
        this.startAt = this.options.startAt;
        this.backwardLoader = new Views.Shared.MessageLoader({
            collection: this.collection,
            direction: "backward"
        });
        if (this.startAt) {
            this.forwardLoader = new Views.Shared.MessageLoader({
                collection: this.collection,
                direction: "forward"
            })
        };
        this.backwardLoader.blockSuccessRenderingChange = !this.state.renderMessages;
        if ((t = this.forwardLoader) != null) {
            t.blockSuccessRenderingChange = !this.state.renderMessages
        };
        if (this.forwardLoader != null) {
            $.when(this.backwardLoader.firstLoad, this.forwardLoader.firstLoad).done(function(e) {
                return function() {
                    return _.defer(function() {
                        return e.jumpToMessage(e.startAt);
                    });
                };
            }(this))
        };
        this.listenTo(this, "view:attach:before", function() {
            this.scrollLocation(this.state.scrollLocation || 0);
            return this.attached = true;
        });
        this.listenTo(this, "view:detach:before", function() {
            this.setScrollLocation();
            return this.attached = false;
        });
        this.scrollState = this.$el.asEventStream("scroll").debounceImmediate(100).flatMapLatest(function() {
            return Bacon.once(true).merge(Bacon.once(false).delay(150));
        }).skipDuplicates().toProperty(false);
        return MessageList.__super__.initialize.apply(this, arguments);
    };
    MessageList.prototype.setupMessagePurging = function(e, t) {
        var n, r, o, i;
        i = this.asEventStream("view:attach:after").map(false).merge(this.asEventStream("view:detach:after").map(true)).toProperty();
        n = $(window).asEventStream("blur");
        o = $(window).asEventStream("focus");
        r = Bacon.mergeAll([ n.skipWhile(i), this.asEventStream("view:detach:after") ]).filter(this.canPurgeMessages);
        return r.flatMapLatest(function(t) {
            return function() {
                return Bacon.later(e, true).takeUntil(t.asEventStream("view:attach:after").merge(o));
            };
        }(this)).takeUntil(this.asEventStream("destructor")).onValue(function(e) {
            return function() {
                var n;
                if ((n = e.collection) != null) {
                    return n.purgeOlderMessages(t);
                }
                return;
            };
        }(this));
    };
    MessageList.prototype.canPurgeMessages = function() {
        return this.state.scrollLocation < this.scrollThreshold;
    };
    MessageList.prototype._showShareWarning = function(e) {
        if (this.shareWarning) {
            return this.shareWarning.close(function(t) {
                return function() {
                    return t._createShareWarning(e);
                };
            }(this));
        }
        return this._createShareWarning(e);
    };
    MessageList.prototype._createShareWarning = function(e) {
        var t;
        t = new r({
            msg: e,
            text: e.model.get("content")
        });
        this.shareWarning = this.subview(t);
        e.$el.append(this.shareWarning.render().$el);
        return this.shareWarning.addTether(e.$el);
    };
    MessageList.prototype.renderMessages = function() {
        var e;
        this.backwardLoader.blockSuccessRenderingChange = false;
        if ((e = this.forwardLoader) != null) {
            e.blockSuccessRenderingChange = false
        };
        this.state.renderMessages = true;
        if (this.$el.children().length > 0) {
            this.render()
        };
        this.trigger("renderMessages");
        return true;
    };
    MessageList.prototype.preserveScrolling = function(e, t) {
        var n, r, o;
        if (e == null) {
            e = {}
        };
        o = this.scrollLocation();
        r = this.el.scrollHeight;
        t();
        if (this.attached && e.direction !== "forward") {
            n = this.el.scrollHeight - r;
            if (n > o || e.history) {
                if (o > this.scrollThreshold) {
                    this.scrollLocation(o);
                } else {
                    this.scrollLocation(0);
                }
            } else {
                this.scrollLocation(o + n);
            }
            return this.setScrollLocation();
        }
        return;
    };
    MessageList.prototype.setScrollLocation = function() {
        if ($.contains($("body")[0], this.el)) {
            return this.state.scrollLocation = this.scrollLocation();
        }
        return;
    };
    MessageList.prototype.onHistoryAdd = function(e, t) {
        if (this.state.renderMessages) {
            this.preserveScrolling({
                history: true,
                direction: t
            }, function(n) {
                return function() {
                    return n.renderGroup(e, {
                        history: true,
                        direction: t
                    });
                };
            }(this));
            return this.trigger("add", e);
        }
        return;
    };
    MessageList.prototype.onAdd = function(e) {
        if (!this.collection.historyComplete.forward) {
            return void this.collection.remove(e);
        }
        if (this.state.renderMessages) {
            this.preserveScrolling({
                history: false
            }, function(t) {
                return function() {
                    return t.insert(t.renderOne(e));
                };
            }(this));
            return this.trigger("add", [ e ]);
        }
    };
    MessageList.prototype.scrollLocation = function(e) {
        if (e != null) {
            this.el.scrollTop = e
        };
        return this.el.scrollTop;
    };
    MessageList.prototype.onRemove = function(e) {
        var t, n, r, o, i;
        for (r = this.removeSubview(e), o = [], t = 0, n = r.length; n > t; t++) {
            i = r[t];
            i.remove();
            o.push(i.destructor());
        }
        return o;
    };
    MessageList.prototype.renderGroup = function(e, t) {
        var n, r, o, i, s;
        if (t == null) {
            t = {}
        };
        if (!t.direction) {
            t.direction = "backward"
        };
        if (t.direction === "backward") {
            r = this.backwardLoader;
        } else {
            r = this.forwardLoader;
        }
        r.detach();
        i = function(e) {
            return function() {
                var n;
                e.insert([ r.render().el ], t.direction === "backward");
                if (t.direction === "backward") {
                    n = e.lastElement(e.$el.children("li"), 5);
                } else {
                    n = e.firstElement(e.$el.children("li"), 5);
                }
                return r.inView(n, e.viewport());
            };
        }(this);
        n = function() {
            var t, n, r;
            for (r = [], t = 0, n = e.length; n > t; t++) {
                o = e[t];
                r.push(this.renderOne(o));
            }
            return r;
        }.call(this);
        if (!t.reverse) {
            n.reverse()
        };
        this.insert(_.flatten(n, true), t.history && t.direction === "backward");
        if (this.collection.historyComplete[t.direction]) {
            r.remove();
            if (t.direction === "forward") {
                this.$el.removeClass("in-history"), this.$(".message-history-highlight").removeClass("message-history-highlight"), 
                (s = this.$jumpToCurrent) != null && s.remove()
            };
        } else {
            i();
        }
        return this;
    };
    MessageList.prototype.clearMessages = function() {
        return this.$el.children("li.inbox-message").remove();
    };
    MessageList.prototype.viewport = function() {
        return this.$el;
    };
    MessageList.prototype.buildMoreMessagesIndicator = function(e) {
        var t;
        if (this.moreMessages) {
            return void this.moreMessages.increment();
        }
        t = {
            direction: "below",
            scrollable: this.$el,
            removeWhen: function(e) {
                return function() {
                    return e.collection.historyComplete.forward && e.scrollLocation() < e.scrollThreshold;
                };
            }(this),
            onRemoved: function(e) {
                return function() {
                    if (e.collection.historyComplete.forward) {
                        e.scrollLocation(0);
                    } else {
                        e.jumpToCurrent();
                    }
                    e.removeSubview(e.moreMessages);
                    return e.moreMessages = null;
                };
            }(this)
        };
        this.moreMessages = this.subview(new Views.Shared.MoreMessages(_.extend(t, e)));
        return this.trigger("indication", this.moreMessages.render().$el);
    };
    MessageList.prototype.buildJumpToCurrentIndicator = function() {
        if (this.$jumpToCurrent) {
            return undefined;
        }
        this.$jumpToCurrent = $(Helpers.renderTemplate(require("../../templates/shared/jump_to_current.mustache"))());
        return this.trigger("indication", this.$jumpToCurrent);
    };
    MessageList.prototype.lastElement = function(e, t) {
        if (t == null) {
            t = 0
        };
        return e.slice(-1 - t).first();
    };
    MessageList.prototype.firstElement = function(e, t) {
        if (t == null) {
            t = 0
        };
        return e.slice(0, t + 1).last();
    };
    MessageList.prototype.insert = function(e, t) {
        var n, r, o;
        if (t == null) {
            t = false
        };
        if (t) {
            r = "append";
        } else {
            r = "prepend";
        }
        n = function() {
            var t, n, r;
            for (r = [], t = 0, n = e.length; n > t; t++) {
                o = e[t];
                if (o instanceof Element) {
                    r.push(o);
                } else {
                    this.subview(o);
                    r.push(o.el);
                }
            }
            return r;
        }.call(this);
        this.$el[r](n);
        return this.propagateAttachedState(e);
    };
    MessageList.prototype.propagateAttachedState = function(e) {
        var t, n, r;
        if (this.isAttached()) {
            for (t = 0, n = e.length; n > t; t++) {
                r = e[t];
                if (r.trigger && !r._attached) {
                    r.triggerAttach()
                };
            }
        }
        return null;
    };
    MessageList.prototype.empty = function() {
        var e, t, n, r, o;
        for (this.backwardLoader.detach(), (n = this.forwardLoader) != null && n.detach(), 
        this.$el.empty(), r = this.subviews, e = 0, t = r.length; t > e; e++) {
            o = r[e];
            if (o !== this.backwardLoader && o !== this.forwardLoader) {
                this.removeSubview(o)
            };
        }
        return this;
    };
    MessageList.prototype.render = function() {
        var e;
        this.empty();
        this.renderHeader();
        if (this.state.renderMessages) {
            e = this.collection.models;
        } else {
            e = [];
        }
        this.renderGroup(e);
        if (this.forwardLoader != null) {
            this.$el.addClass("in-history"), this.$el.append(this.forwardLoader.render().el), 
            this.forwardLoader.inView(null, this.viewport()), this.buildJumpToCurrentIndicator()
        };
        this.trigger("render");
        this.scrollLocation(0);
        if (!this.options.tags) {
            this.$el.addClass("tags-disabled")
        };
        return this;
    };
    MessageList.prototype.renderHeader = function() {};
    MessageList.prototype.renderBackwardLoader = function() {
        return this.$el.append(this.backwardLoader.render().el);
    };
    MessageList.prototype.hasMessage = function(e) {
        return !!this.collection.get(Number(e));
    };
    MessageList.prototype.lastMessageOf = function(e) {
        return this.collection.lastMessageOf(e);
    };
    MessageList.prototype.jumpToMessage = function(e) {
        var t, n, r, o, i;
        o = this.collection.get(Number(e));
        if (o && (i = this.findSubviews(o).pop())) {
            this.$(".message-history-highlight").removeClass("message-history-highlight");
            n = this.elementOffset(i.el);
            t = i.$el.height();
            r = this.viewport().height();
            this.scrollLocation(n - .5 * r + .5 * t);
            this.setScrollLocation();
            i.$el.addClass("message-history-highlight");
            return i.$el.one(Helpers.animationend(), function() {
                return i.$el.removeClass("message-history-highlight");
            });
        }
        return;
    };
    MessageList.prototype.jumpToCurrent = function() {
        var e;
        if ((e = Flowdock.app.manager.currentView) != null) {
            return e.chat.jumpToCurrent();
        }
        return;
    };
    MessageList.prototype.highlightAccessed = function(e) {
        var t;
        this.$(".just-read").removeClass("just-read");
        t = this.$("[data-parent=" + e + "]");
        t.addClass("just-read");
        return this.asEventStream("view:detach:before").merge($(window).asEventStream("blur")).merge(Bacon.later(100).flatMapLatest(function() {
            return $(document.activeElement).asEventStream("blur click");
        })).take(1).onValue(function() {
            return t.removeClass("just-read");
        });
    };
    MessageList.prototype.elementOffset = function(e) {
        return e.offsetTop;
    };
    MessageList.prototype.destructor = function() {
        var e, t, r;
        if ((e = this.forwardLoader) != null) {
            e.remove()
        };
        this.backwardLoader.remove();
        this.empty();
        MessageList.__super__.destructor.apply(this, arguments);
        if ((t = this.$jumpToCurrent) != null) {
            t.remove()
        };
        if ((r = this.moreMessages) != null) {
            r.destructor()
        };
        return this.forwardLoader = this.backwardLoader = this.moreMessages = this.$jumpToCurrent = this.options = null;
    };
    MessageList.prototype.$currentItem = function() {
        return this.$(".current-item");
    };
    MessageList.prototype.onceMessagesRendered = function(e) {
        if (this.state.renderMessages) {
            return e();
        }
        return this.once("renderMessages", e);
    };
    return MessageList;
}(Flowdock.HierarchicalView);

_.extend(Views.Shared.MessageList.prototype, Flowdock.KeyboardEvents);
