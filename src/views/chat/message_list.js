var r, o, i, s, a, u, l = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (c.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, c = {}.hasOwnProperty, p = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = React.createFactory(require("components/chat/header"));

a = function(e) {
    return ($(e.target).parents("li").get(0) || e.target) === e.currentTarget;
};

u = function(e) {
    return $(e.currentTarget);
};

o = function(e) {
    return e.is("[data-parent]");
};

i = function(e) {
    return e.attr("data-parent");
};

s = function(e, t) {
    return e.get(t.originalEvent.dataTransfer.getData("Text")).isRethreadable();
};

Views.Chat.MessageList = function(e) {
    function MessageList() {
        return MessageList.__super__.constructor.apply(this, arguments);
    }
    l(MessageList, e);
    MessageList.prototype.className = "chat-message-list";
    MessageList.prototype.events = {
        resize: "resize"
    };
    MessageList.prototype.collectionEvents = _.extend({}, Views.Shared.MessageList.prototype.collectionEvents, {
        historyComplete: "onHistoryComplete",
        "change:event": "updateMessageType"
    });
    MessageList.prototype.listName = "chat";
    MessageList.build = function(e, t) {
        var n;
        if (t == null) {
            t = {}
        };
        n = new Collections.ChatMessages([], {
            flow: e,
            startAt: t.startAt
        });
        n.consume(e.stream);
        return new Views.Chat.MessageList(_.extend(t, {
            collection: n,
            model: e
        }));
    };
    MessageList.prototype.initialize = function(e) {
        var n, r;
        this.viewModel = e.viewModel;
        MessageList.__super__.initialize.apply(this, arguments);
        n = this.attachedProperty("after", "before");
        r = Flowdock.resize.window.move.merge(this.viewModel.asEventStream("change:rhs"));
        this.addStream(this.viewModel.asEventStream("beforechange").onValue(this, "setScrollLocation"));
        this.addStream(r.filter(n).onValue(this, "resize"));
        this.addStream(this.unreadMessageStream().onValue(this, "toggleMessageSeen"));
        this.currentItemTimeout = null;
        return this.setupMessagePurging(700, 100);
    };
    MessageList.prototype.resize = function(e) {
        if (e != null) {
            this.inputHeight = e
        };
        if (this.inputHeight != null) {
            this.$el.css("bottom", this.inputHeight)
        };
        return this.scrollLocation(this.state.scrollLocation);
    };
    MessageList.prototype.render = function() {
        MessageList.__super__.render.apply(this, arguments);
        this.stopListening(Flowdock.app.preferences, "change:emphasize_own_nick", this.toggleEmphasis);
        this.toggleEmphasis();
        return this.listenTo(Flowdock.app.preferences, "change:emphasize_own_nick", this.toggleEmphasis);
    };
    MessageList.prototype.onAttach = function() {
        var e, t;
        if (!this.model.isPrivate()) {
            t = this.hoverElementStream();
            e = this.asEventStream("view:detach:before");
            t.takeUntil(e).onValue(this, "highLightCommentGroup");
            return this.trackDrags(e);
        }
    };
    MessageList.prototype.onDetach = function() {
        return this.$(".comment-group-hover").removeClass("comment-group-hover");
    };
    MessageList.prototype.trackDrags = function(e) {
        var t;
        t = this.untilEnd(this.$el.asEventStream("dragstart", ">li").takeUntil(e));
        return t.filter(s, this.collection).onValue(function(e) {
            return function() {
                var t, n, r, s, l, c, p, d, h, f, m, g;
                t = e.untilEnd(e.$el.asEventStream("dragend", ">li").take(1));
                n = e.$el.asEventStream("dragenter", ">li");
                l = e.$el.asEventStream("dragover", ">li").takeUntil(t);
                s = e.$el.asEventStream("dragleave", ">li");
                c = e.$el.asEventStream("drop", ">li").takeUntil(t);
                h = n.filter(a).takeUntil(t);
                f = s.filter(a).takeUntil(t);
                p = $("body").asEventStream("dragenter").takeUntil(t);
                d = p.filter(function(t) {
                    return $(t.target).parents("." + e.className).length > 0;
                });
                m = p.filter(function(t) {
                    return $(t.target).parents("." + e.className).length === 0;
                });
                g = d.map(!0).merge(m.map(!1)).skipDuplicates().toProperty();
                h.doAction(".preventDefault");
                l.onValue(e.stopEvent);
                f.doAction(".preventDefault");
                c.onValue(e, "onDrop");
                r = h.map(u).filter(o).map(i).merge(g.changes().filter(function(e) {
                    return !e;
                }).map(null)).skipDuplicates();
                r.onValue(e, "highlightDropGroup");
                return r.onEnd(e, "dimDropGroup");
            };
        }(this));
    };
    MessageList.prototype.updateMessageType = function(e) {
        var t;
        t = this.findSubviews(e)[0];
        t.$el.replaceWith(this.renderOne(e));
        return this.removeSubview(t);
    };
    MessageList.prototype.unreadMessageStream = function() {
        var e;
        if (this.model.isPrivate()) {
            e = function(e) {
                return !e.get("tags").length && parseInt(e.get("user")) === Flowdock.app.user.id;
            };
            return this.collection.asEventStream("change:tags").filter(e).merge(this.collection.asEventStream("add").filter(function(e) {
                return e.get("user") !== Flowdock.app.user.id;
            })).merge(this.collection.asEventStream("historyAdd").take(1).filter(".length").map(function(t) {
                if (parseInt(_.last(t).get("user")) !== Flowdock.app.user.id) {
                    return _.last(t);
                }
                return _.find(t.slice(0).reverse(), e);
            }));
        }
        return Bacon.never();
    };
    MessageList.prototype.toggleMessageSeen = function(e) {
        var t;
        if (this.collection.indexOf(e) > this.collection.indexOf(this.lastSeenMessage) && (t = this.findSubviews(e)[0], 
        this.lastSeenMessage = e, t)) {
            return this.applyMessageSeen(e, t.$el);
        }
        return;
    };
    MessageList.prototype.applyMessageSeen = function(e, t) {
        this.$el.find(".message-seen").removeClass("message-seen").removeAttr("title");
        return $(t).addClass("message-seen").attr("title", e.flow().otherParty().nick() + " has seen this message.");
    };
    MessageList.prototype.stopEvent = function(e) {
        e.preventDefault();
        return e.stopPropagation();
    };
    MessageList.prototype.onDrop = function(e) {
        var t, n;
        n = $(e.currentTarget).data("parent");
        t = this.collection.get(e.originalEvent.dataTransfer.getData("Text"));
        if (t.isDroppableTo(n) && !this.collection.get(n)) {
            t.rethread(n, Flowdock.ANALYTICS_EVENT_TYPES.rethread_dnd);
            return this.$("[data-parent=" + n + "]").removeClass("drop-group-hover");
        }
        return;
    };
    MessageList.prototype.hoverElementStream = function() {
        var e, t, n;
        e = this.untilEnd(this.$el.asEventStream("mouseenter", "li.message")).map(function(e) {
            return {
                mouseOver: !0,
                $el: $(e.currentTarget)
            };
        });
        t = this.untilEnd(this.$el.asEventStream("mouseleave", "li.message")).map(function(e) {
            return {
                mouseOver: !1,
                $el: $(e.currentTarget)
            };
        });
        n = this.scrollState.map(function(e) {
            return !e;
        });
        return e.filter(n).merge(t).merge(e.merge(t).toProperty().sampledBy(n.filter(_.identity)).filter(function(e) {
            return e.mouseOver;
        }).skipDuplicates().changes());
    };
    MessageList.prototype.toggleEmphasis = function() {
        return this.$el.toggleClass("emphasize-me", Flowdock.app.preferences.get("emphasize_own_nick"));
    };
    MessageList.prototype.highLightCommentGroup = function(e) {
        var t;
        if (t = e.$el.attr("data-parent")) {
            return this.highlightGroupCallback = window.requestAnimationFrame(function(n) {
                return function() {
                    var r, o;
                    r = $(function() {
                        var e, n, r, i;
                        for (r = this.subviews, i = [], e = 0, n = r.length; n > e; e++) {
                            o = r[e];
                            if ((typeof o.threadId == "function" ? o.threadId() : void 0) + "" === t) {
                                i.push(o.el)
                            };
                        }
                        return i;
                    }.call(n));
                    if (e.mouseOver) {
                        r.addClass("comment-group-hover");
                        return n.cancelAnimationFrame();
                    }
                    return r.removeClass("comment-group-hover");
                };
            }(this));
        }
        return;
    };
    MessageList.prototype.highlightDropGroup = function(e) {
        var t;
        this.dimDropGroup();
        if (null !== e) {
            t = this.$("[data-parent=" + e + "]");
            return t.addClass("drop-group-hover");
        }
        return;
    };
    MessageList.prototype.dimDropGroup = function() {
        return this.$(".drop-group-hover").removeClass("drop-group-hover");
    };
    MessageList.prototype.renderGroup = function(e, n) {
        var r, o, i;
        if (n == null) {
            n = {}
        };
        o = MessageList.__super__.renderGroup.call(this, e, _.extend(n, {
            reverse: !n.reverse
        }));
        if (n.direction === "backward") {
            r = this.collection.at(this.collection.indexOf(_.last(e)) + 1), r != null && (i = this.findSubviews(r)[0], 
            this.applySeparators(r, i.$el))
        };
        return o;
    };
    MessageList.prototype.applySeparators = function(e, t) {
        var n, r, o, i, s, a;
        o = function(e, t) {
            if ((e != null ? e.get("external_user_name") : void 0) || (t != null ? t.get("external_user_name") : void 0)) {
                return (e != null ? e.get("external_user_name") : void 0) === (t != null ? t.get("external_user_name") : void 0);
            }
            return String(e != null ? e.get("user") : void 0) === String(t != null ? t.get("user") : void 0);
        };
        n = function(e, t) {
            var n, r, o;
            n = [ "message", "comment" ];
            r = e != null ? e.get("event") : void 0;
            return p.call(n, r) >= 0 && (o = t != null ? t.get("event") : void 0, p.call(n, o) >= 0);
        };
        r = this.collection.indexOf(e);
        if (r >= 1) {
            s = this.collection.at(r - 1), i = e.get("sent") || new Date().getTime(), a = s != null ? s.get("sent") : void 0, 
            s != null && moment(a).format("L") !== moment(i).format("L") && $(t).attr("data-timestamp", moment(i).format("dddd, MMMM D")).addClass("date-separator")
        };
        return t;
    };
    MessageList.prototype.onAdd = function(e) {
        MessageList.__super__.onAdd.apply(this, arguments);
        if (this.scrollLocation() > this.scrollThreshold) {
            this.buildMoreMessagesIndicator({
                direction: "below"
            })
        };
        if (this.header && this.collection.length === 1) {
            return this.header.setProps({
                compact: !0
            });
        }
        return;
    };
    MessageList.prototype.renderBeginningMessage = function() {
        var e, t;
        t = $("<div>").addClass("chat-header-wrapper");
        this.$el.prepend(t);
        e = {
            compact: this.collection.length > 0,
            flow: this.model
        };
        this.header = this.component(t[0], r(e));
        return this.scrollLocation(this.state.scrollLocation || 0);
    };
    MessageList.prototype.onHistoryComplete = function(e) {
        if ("forward" !== e) {
            if (this.state.renderMessages) {
                return this.renderBeginningMessage();
            }
            return this.once("renderMessages", this.renderBeginningMessage, this);
        }
        return;
    };
    MessageList.prototype.destructor = function() {
        MessageList.__super__.destructor.apply(this, arguments);
        this.cancelAnimationFrame();
        return this.viewModel = this.lastSeenMessage = null;
    };
    MessageList.prototype.cancelAnimationFrame = function() {
        if (this.highlightHoverCallback != null) {
            return window.cancelAnimationFrame(this.highlightHoverCallback);
        }
        return;
    };
    MessageList.prototype.delegateEvents = function() {
        this.addStream($(window).asEventStream("resize").debounce(75).onValue(this, "resize"));
        return MessageList.__super__.delegateEvents.apply(this, arguments);
    };
    MessageList.prototype.renderOne = function(e) {
        var t, n, r, o, i, s;
        try {
            r = e.presenter().event;
            t = e.isInformational() ? Views.Chat.Message : Views.Chat[r[0].toUpperCase() + r.substr(1) + "Message"] || Views.Chat.Message;
            s = this.subview(new t({
                model: e,
                viewModel: this.viewModel,
                tags: this.options.tags,
                shareWithRally: function(e) {
                    return function(t) {
                        return e._showShareWarning(t);
                    };
                }(this)
            }));
            i = s.render().el;
            this.applySeparators(e, i);
            if (e === this.lastSeenMessage) {
                this.applyMessageSeen(e, i)
            };
            return [ s ];
        } catch (a) {
            return n = a, console.error(n.stack), console.log("MessageList renderOne error", n, e), 
            o = this.subview(new Views.Shared.MessageError({
                app: "chat",
                model: e,
                error: n
            })), [ o.render() ];
        }
    };
    return MessageList;
}(Views.Shared.ReversedMessageList);