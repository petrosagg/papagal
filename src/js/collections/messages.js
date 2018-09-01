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
}, o = {}.hasOwnProperty, i = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

Collections.Messages = function(e) {
    function Messages() {
        return Messages.__super__.constructor.apply(this, arguments);
    }
    r(Messages, e);
    Messages.prototype.model = Models.Message;
    Messages.prototype.messageFilter = Models.Filter;
    Messages.prototype.limit = 30;
    Messages.prototype.sync = Flowdock.socketIoSync;
    Messages.prototype.initialize = function(e, t) {
        this.startAt = t.startAt;
        this.maximumMessages = t.maximumMessages;
        this.skip = t.skip;
        this.limit = this.maximumMessages || this.limit;
        this.skip = this.skip || 0;
        this.messageFilter = t.filter || new this.messageFilter();
        this.historyComplete = {
            forward: this.startAt == null,
            backward: t.fresh === true
        };
        if (this.maximumMessages) {
            return this.listenTo(this, "add", function() {
                var e, t, n, r, o;
                e = this.length - this.maximumMessages;
                if (e > 0) {
                    for (this.historyComplete.backward = false, o = [], t = n = 0, r = e - 1; r >= 0 ? r >= n : n >= r; t = r >= 0 ? ++n : --n) {
                        o.push(this.shift());
                    }
                    return o;
                }
            });
        }
        return;
    };
    Messages.prototype.url = function() {
        return this.flow.url() + "/messages";
    };
    Messages.prototype._findAllByUuid = function(e) {
        return this.where({
            uuid: e
        });
    };
    Messages.prototype.findByUuid = function(e) {
        var t;
        if ((t = this._findAllByUuid(e)) != null) {
            return t[0];
        }
        return;
    };
    Messages.prototype.threadAfterMessage = function(e) {
        var t, n;
        for (n = this.indexOf(e); n < this.length - 1; ) {
            n++;
            t = this.at(n);
            if (t.threadId() !== e.threadId()) {
                return t;
            }
        }
    };
    Messages.prototype.threadBeforeMessage = function(e) {
        var t, n;
        for (n = this.indexOf(e); n > 0; ) {
            n--;
            t = this.at(n);
            if (t.threadId() !== e.threadId()) {
                return t;
            }
        }
    };
    Messages.prototype._forThreads = function(e) {
        var t, n, r, o, i;
        for (i = {}, r = this.length, t = undefined; r > 0 && !t; ) {
            r--;
            o = this.at(r);
            n = o.threadId();
            i[n] || (i[n] = true, t = e(o));
        }
        return t;
    };
    Messages.prototype.threadAfter = function(e) {
        var t;
        t = undefined;
        return this._forThreads(function(n) {
            if (n.threadId() === e) {
                return t;
            }
            return void (t = n);
        });
    };
    Messages.prototype.threadBefore = function(e) {
        var t;
        t = false;
        return this._forThreads(function(n) {
            if (t) {
                return n;
            }
            return void (t = n.threadId() === e);
        });
    };
    Messages.prototype.hasThreadAfter = function(e) {
        var t, n, r;
        for (r = this.length, n = false; r > 0 && !n && (r--, t = this.at(r), e.id !== t.id); ) {
            n = t.isThread() || t.isComment();
        }
        return n;
    };
    Messages.prototype.lastMessageOf = function(e) {
        return _.last(this.filter(function(t) {
            var n;
            return t.get("user").toString() === e.id.toString() && ((n = t.get("event")) === "message" || n === "comment");
        }));
    };
    Messages.prototype._messageChanged = function(e) {
        var t, n, r, o;
        n = e.message_id;
        r = e.patch;
        t = e.content;
        if ((o = this.get(n)) != null) {
            return o.set(_.pick(t, r));
        }
        return;
    };
    Messages.prototype.consume = function(e) {
        if (this.stream) {
            throw new Error("Message collection is already subscribed to a stream");
        }
        this.stream = this.untilEnd(e.filter(this.flow.eventStreamFilter));
        this.stream.onValue(this, "onStreamMessage");
        return this.stream.onError(this, "onStreamError");
    };
    Messages.prototype.onStreamError = function(e) {
        var t;
        if (e.message) {
            t = this.findByUuid(e.message.uuid), t && !t.get("id") && t.trigger("unsent", e.error)
        };
        return Bacon.more;
    };
    Messages.prototype._matchedMessage = function(e) {
        var t, n;
        n = this._findAllByUuid(e.uuid);
        if (n.length > 1) {
            console.error("more than one message matches uuid " + e.uuid + ": ", n);
            t = n.shift();
            n.forEach(this.remove.bind(this));
        } else {
            t = n[0];
        }
        if (e.id && t && !t.id) {
            t.set(e);
            return t.trigger("sync");
        }
        if (e.id && this.get(e.id)) {
            return undefined;
        }
        return this.add(e, {
            fresh: true
        });
    };
    Messages.prototype.onStreamMessage = function(e) {
        if (e.event === "tag-change") {
            this._tagChange(e);
        } else {
            if (e.event === "emoji-reaction") {
                this._emojiReaction(e);
            } else {
                if (e.event === "message-delete") {
                    this._messageDelete(e);
                } else {
                    if (e.event === "message-edit") {
                        this._messageEdit(e)
                    };
                }
            }
        }
        if (e.event === "thread-change") {
            this._threadUpdate(e.content, e.thread_id);
        } else {
            if (e.thread && e.thread_id) {
                this._threadUpdate(e.thread, e.thread_id)
            };
        }
        if (this.messageFilter.matchesTo(e)) {
            this._matchedMessage(e)
        };
        return Bacon.more;
    };
    Messages.prototype.cleanup = function() {
        this.each(function(e) {
            return e.cleanup();
        });
        Messages.__super__.cleanup.apply(this, arguments);
        this.messageFilter = null;
        return this;
    };
    Messages.prototype.purgeOlderMessages = function(e) {
        var t, n, r, o;
        if (!(this.length <= e) && this.historyComplete.backward !== true) {
            for (o = [], t = n = 1, r = this.length - e; r >= 1 ? r >= n : n >= r; t = r >= 1 ? ++n : --n) {
                o.push(this.shift());
            }
            return o;
        }
    };
    Messages.prototype._messageEdit = function(e) {
        var t, n, r, o, i;
        t = this.get(e.content.message);
        if (t != null) {
            n = {
                content: e.content.updated_content,
                edited: e.sent
            };
            i = e.content.updated_event;
            r = e.content.updated_tags;
            if (r) {
                o = _.extend(t.tagDifference(r), {
                    user: e.user,
                    sync: false
                }), t.modifyTags(o)
            };
            if (i) {
                t.set(n, {
                    trigger: false
                });
                return t.set({
                    event: i
                });
            }
            return t.set(n);
        }
        return;
    };
    Messages.prototype._messageDelete = function(e) {
        var t;
        t = this.get(e.content.message);
        if (t != null) {
            return this.remove(t);
        }
        return;
    };
    Messages.prototype._tagChange = function(e) {
        var t;
        t = this.get(e.content.message);
        if (t != null) {
            return t.modifyTags({
                add: e.content.add,
                remove: e.content.remove,
                remote: true,
                user: e.user
            });
        }
        return;
    };
    Messages.prototype._emojiReaction = function(e) {
        var t;
        t = this.get(e.content.message);
        if (t != null) {
            return t.handleEmojiReaction({
                emoji: e.content.emoji,
                type: e.content.type,
                user: e.user.toString()
            });
        }
        return;
    };
    Messages.prototype._threadUpdate = function(e, t) {
        var n, r, o, i, s;
        for (i = this.where({
            thread_id: t
        }), s = [], n = 0, r = i.length; r > n; n++) {
            o = i[n];
            s.push(o.set("thread", e));
        }
        return s;
    };
    Messages.prototype.fetchHistory = function(e) {
        var t, n, r, o, i, s;
        if (e == null) {
            e = {}
        };
        e = _.extend({
            direction: "backward",
            data: {}
        }, e);
        s = ((o = this.messageFilter) != null && (i = o.tags) != null ? i.length : undefined) > 0;
        r = this.messageFilter instanceof Models.Filter.Search;
        if (e.direction === "forward") {
            this.length !== 0 && this.last().id != null && ((t = e.data).since_id || (t.since_id = this.last().id)), 
            this.length === 0 && this.startAt != null && (e.data.since_id = this.startAt), e.data.sort = "asc"
        };
        if (e.direction === "backward") {
            r || s ? (e.data.skip = this.skip + this.length, e.data.searchSortBy = this.messageFilter.searchSortBy) : (this.length !== 0 && this.first().id != null && ((n = e.data).until_id || (n.until_id = this.first().id)), 
            this.length === 0 && this.startAt != null && (e.data.until_id = this.startAt + 1), 
            e.insertAt || (e.insertAt = 0)), e.skip_until_id && delete e.data.until_id
        };
        this.length !== 0 || e.direction !== "backward" || e.data.until_id || (this.historyComplete.forward = true, 
        this.trigger("historyComplete", "forward"));
        return this.fetchMessages(e, true, false, function(t) {
            return function(n) {
                if (n.length < (e.limit || t.limit)) {
                    t.historyComplete[e.direction] = true
                };
                t.trigger("historyAdd", n, e.direction);
                if (t.historyComplete[e.direction]) {
                    return t.trigger("historyComplete", e.direction);
                }
                return;
            };
        }(this));
    };
    Messages.prototype.fetchMessages = function(e, t, n, r) {
        var o, i, s, a, u, l, c;
        if (e == null) {
            e = {}
        };
        if (t == null) {
            t = false
        };
        if (n == null) {
            n = false
        };
        l = function(e, t) {
            var n, r, o, i;
            if (t) {
                for (i = [], n = 0, r = t.length; r > n; n++) {
                    o = t[n];
                    e.get(o.id) || i.push(o);
                }
                return i;
            }
            return [];
        };
        u = this.messageFilter instanceof Models.Filter.Search;
        a = Flowdock.app.features.F16217_search_api;
        if (u) {
            Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_requested, {
                newSearch: a
            })
        };
        o = _.extend(this.messageFilter.asParams(), {
            sort: "desc",
            limit: e.limit || this.limit
        }, e.data);
        s = moment().valueOf();
        i = {
            delayed: e.delayed,
            cache: false,
            update: t,
            remove: false,
            at: e.insertAt,
            silent: true,
            data: o,
            add: false,
            success: function(t, o) {
                var c, p, d, h;
                c = moment().valueOf() - s;
                if (n) {
                    h = o;
                } else {
                    h = l(t, o);
                }
                t.set(o, _.extend({}, i, {
                    add: true
                }));
                if (_.isFunction(e.success)) {
                    e.success(t, o)
                };
                d = function() {
                    var e, n, r;
                    for (r = [], e = 0, n = h.length; n > e; e++) {
                        p = h[e];
                        r.push(t.get(p.id));
                    }
                    return r;
                }();
                if (typeof r == "function") {
                    r(d)
                };
                t.trigger("messagesAdded", d);
                if (u) {
                    return Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_complete, {
                        fetchTimeMs: c,
                        newSearch: a
                    });
                }
                return;
            },
            error: e.error
        };
        c = this.fetch(i);
        Bacon.fromPromise(c, true).takeUntil(this.asEventStream("cleanup")).onValue(function() {});
        return c;
    };
    return Messages;
}(Flowdock.Collection);

Collections.ThreadedMessages = function(e) {
    function ThreadedMessages() {
        return ThreadedMessages.__super__.constructor.apply(this, arguments);
    }
    r(ThreadedMessages, e);
    ThreadedMessages.prototype.consume = function() {
        ThreadedMessages.__super__.consume.apply(this, arguments);
        return this.each(function(e) {
            return function(t) {
                var n;
                if ((n = t.comments) != null) {
                    return n.consume(e.stream);
                }
                return;
            };
        }(this));
    };
    ThreadedMessages.prototype.addCommentsToMessages = function(e) {
        return _.each(e.slice(0).reverse(), function(e) {
            return function(t) {
                return _.each(t.tags, function(n) {
                    var r;
                    if (n.indexOf("influx:") === 0) {
                        r = e.get(parseInt(n.replace("influx:", ""), 10));
                        if (!r) {
                            return;
                        }
                        return r.comments.unshift(t);
                    }
                });
            };
        }(this));
    };
    ThreadedMessages.prototype.fetchComments = function(e, t) {
        var n, r, o;
        o = function() {
            var t, r, o;
            for (o = [], t = 0, r = e.length; r > t; t++) {
                n = e[t];
                if (n.id && n.commentable()) {
                    o.push("influx:" + n.id)
                };
            }
            return o;
        }();
        if (_.isEmpty(o)) {
            return undefined;
        }
        r = $.ajax({
            url: this.url(),
            dataType: "json",
            data: {
                tags: o.join(","),
                tag_mode: "or",
                event: "comment,file",
                limit: 100,
                until_id: t
            },
            success: function(t) {
                return function(r) {
                    var o, i, s;
                    t.addCommentsToMessages(r);
                    if (r.length === 100) {
                        return t.fetchComments(e, r[0].id);
                    }
                    for (s = [], o = 0, i = e.length; i > o; o++) {
                        n = e[o];
                        s.push(n.comments.historyComplete.backward = true);
                    }
                    return s;
                };
            }(this),
            error: function() {
                return console.error("could not sync comments on inbox messages", o);
            }
        });
        Bacon.fromPromise(r, true).takeUntil(this.asEventStream("cleanup")).onValue(function() {});
        return r;
    };
    ThreadedMessages.prototype._prepareModel = function(e, n) {
        var r;
        e = ThreadedMessages.__super__._prepareModel.call(this, e, n);
        if (this.stream && (r = e.comments) != null) {
            r.consume(this.stream)
        };
        return e;
    };
    ThreadedMessages.prototype._removeReference = function(e) {
        e.cleanup();
        return ThreadedMessages.__super__._removeReference.call(this, e);
    };
    return ThreadedMessages;
}(Collections.Messages);

Collections.ChatMessages = function(e) {
    function ChatMessages() {
        return ChatMessages.__super__.constructor.apply(this, arguments);
    }
    r(ChatMessages, e);
    ChatMessages.prototype.messageFilter = Models.Filter.Chat;
    ChatMessages.prototype.initialize = function() {
        ChatMessages.__super__.initialize.apply(this, arguments);
        return this.listenTo(this, "messagesAdded", function(e) {
            var t, n;
            n = function() {
                var n, r, o;
                for (o = [], n = 0, r = e.length; r > n; n++) {
                    t = e[n];
                    if (t.hasComments()) {
                        o.push(t)
                    };
                }
                return o;
            }();
            return this.fetchComments(n);
        });
    };
    return ChatMessages;
}(Collections.ThreadedMessages);

Collections.InboxMessages = function(e) {
    function InboxMessages() {
        return InboxMessages.__super__.constructor.apply(this, arguments);
    }
    r(InboxMessages, e);
    InboxMessages.prototype.messageFilter = Models.Filter.Inbox;
    InboxMessages.prototype.initialize = function() {
        InboxMessages.__super__.initialize.apply(this, arguments);
        this.listenTo(this, "add", function(e) {
            if (e.get("thread")) {
                return this.where({
                    thread_id: e.get("thread_id")
                }).forEach(function(t) {
                    return t.set({
                        thread: JSON.parse(JSON.stringify(e.get("thread")))
                    });
                });
            }
            return;
        });
        return this.listenTo(this, "messagesAdded", function(e) {
            return this.fetchComments(e);
        });
    };
    InboxMessages.prototype.isThreadGroupLeader = function(e) {
        return this.threadGroupLeaderOf(e).get("id") === e.get("id");
    };
    InboxMessages.prototype.threadGroupLeaderOf = function(e) {
        var t, n;
        if (!e.isThread()) {
            return e;
        }
        for (t = this.indexOf(e), n = this.at(++t); n && e.get("thread_id") === n.get("thread_id"); ) {
            e = n;
            n = this.at(++t);
        }
        return e;
    };
    InboxMessages.prototype._threadGroupTailOf = function(e) {
        var t, n, r;
        if (!e.isThread()) {
            return [ e ];
        }
        for (t = this.indexOf(e), r = [ e ], n = this.at(--t); t >= 0 && n && e.get("thread_id") === n.get("thread_id"); ) {
            r.push(n);
            n = this.at(--t);
        }
        return r;
    };
    InboxMessages.prototype.threadGroupOf = function(e) {
        return this._threadGroupTailOf(this.threadGroupLeaderOf(e));
    };
    InboxMessages.prototype.purgeOlderMessages = function(e) {
        var n, r, o, i, s, a, u;
        for (o = this.reduce(function(e) {
            return function(t, n, r) {
                var o;
                o = e.threadGroupLeaderOf(n).id;
                if (t[o] != null) {
                    t[o].count++;
                } else {
                    t[o] = {
                        index: r,
                        count: 1
                    };
                }
                return t;
            };
        }(this), {}), r = function() {
            var e, t, r, i;
            for (r = _.sortBy(o, "index"), i = [], e = 0, t = r.length; t > e; e++) {
                n = r[e];
                i.push(n.count);
            }
            return i;
        }(), a = 0, i = s = 0, u = e; u >= 0 ? u > s : s > u; i = u >= 0 ? ++s : --s) {
            if (r[i] != null) {
                a += r[i]
            };
        }
        return InboxMessages.__super__.purgeOlderMessages.call(this, a);
    };
    return InboxMessages;
}(Collections.ThreadedMessages);

Collections.CommentMessages = function(e) {
    function CommentMessages() {
        return CommentMessages.__super__.constructor.apply(this, arguments);
    }
    r(CommentMessages, e);
    CommentMessages.prototype.initialize = function(e, n) {
        this.message = n.message;
        return CommentMessages.__super__.initialize.call(this, e, _.extend({
            filter: new Models.Filter.Comments(this.message)
        }, n));
    };
    CommentMessages.prototype.cleanup = function() {
        CommentMessages.__super__.cleanup.apply(this, arguments);
        return this.message = null;
    };
    return CommentMessages;
}(Collections.Messages);

Collections.UnreadMentionsMessages = function(e) {
    function UnreadMentionsMessages() {
        return UnreadMentionsMessages.__super__.constructor.apply(this, arguments);
    }
    r(UnreadMentionsMessages, e);
    UnreadMentionsMessages.prototype.messageFilter = Models.Filter.All;
    UnreadMentionsMessages.prototype.limit = 10;
    UnreadMentionsMessages.prototype.unreadTag = function() {
        return ":unread:" + this.userId;
    };
    UnreadMentionsMessages.prototype.initialize = function(e, n) {
        UnreadMentionsMessages.__super__.initialize.apply(this, arguments);
        this.userId = n.userId;
        return this.messageFilter.tags = [ this.unreadTag() ];
    };
    UnreadMentionsMessages.prototype.unread = function() {
        var e;
        e = this.unreadTag();
        return this.filter(function(t) {
            return _.include(t.get("tags"), e);
        });
    };
    UnreadMentionsMessages.prototype.markAllRead = function() {
        var e, t, n, r, o, i;
        for (i = this.unreadTag(), r = this.unread(), o = [], e = 0, t = r.length; t > e; e++) {
            n = r[e];
            o.push(n.removeTags([ i ]));
        }
        return o;
    };
    return UnreadMentionsMessages;
}(Collections.Messages);

Collections.Activities = function(e) {
    function Activities() {
        return Activities.__super__.constructor.apply(this, arguments);
    }
    r(Activities, e);
    Activities.maxPending = 5;
    Activities.maxBulkFetches = 5;
    Activities.pendingFetches = {};
    Activities.flowTimer = {};
    Activities.bulkFetchPendingFlow = function(e, n) {
        var r, o, i, s, a, u, l, c, p, d;
        if (n == null) {
            n = true
        };
        this.clearTimer(e);
        if ((l = Activities.pendingFetches[e]) && l.length > 0) {
            for (l.splice(this.maxPending).forEach(function(e) {
                var t, n;
                n = e.options;
                t = e.deferred;
                t.reject("abandoned");
                if (typeof n.error == "function") {
                    return n.error("abandoned");
                }
                return;
            }), d = l.splice(0, this.maxBulkFetches), l.length > 0 ? this.setTimer(e) : delete Activities.pendingFetches[e], 
            u = function(e) {
                return d.forEach(function(t, n) {
                    var r, o, i;
                    o = t.options;
                    r = t.deferred;
                    if (e[n] != null) {
                        i = e[n];
                    } else {
                        i = [];
                    }
                    if (i) {
                        r.resolve(i);
                        if (typeof o.success == "function") {
                            return o.success(i);
                        }
                        return;
                    }
                    r.reject({
                        status: 404
                    });
                    if (typeof o.error == "function") {
                        return o.error({
                            status: 404
                        });
                    }
                    return;
                });
            }, a = function(e) {
                return d.forEach(function(t) {
                    var n, r;
                    r = t.options;
                    n = t.deferred;
                    n.reject(e);
                    if (typeof r.error == "function") {
                        return r.error(e);
                    }
                    return;
                });
            }, r = {}, o = i = 0, s = d.length; s > i; o = ++i) {
                c = d[o];
                r[o] = c.options.data;
            }
            p = $.ajax({
                headers: n ? {
                    "X-owl-prefetch": "prefetch"
                } : {},
                url: Activities.bulkUrl(_.first(d).flow),
                data: r,
                dataType: "json"
            });
            return p.then(u, a);
        }
    };
    Activities.clearTimer = function(e) {
        clearTimeout(this.flowTimer[e]);
        return delete this.flowTimer[e];
    };
    Activities.setTimer = function(e) {
        if (this.flowTimer[e]) {
            clearTimeout(this.flowTimer[e])
        };
        return this.flowTimer[e] = setTimeout(function() {
            return Activities.bulkFetchPendingFlow(e);
        }, 3e3 + 10 * Math.random() * 1e3);
    };
    Activities.prototype.addPending = function(e) {
        var n, r, o, i, s, a;
        o = e.method;
        i = e.model;
        a = e.options;
        r = $.Deferred();
        ((n = Activities.pendingFetches)[s = this.flow.id] || (n[s] = [])).unshift({
            method: o,
            model: i,
            options: a,
            deferred: r,
            flow: this.flow
        });
        Activities.setTimer(this.flow.id);
        a.delayed || Activities.bulkFetchPendingFlow(this.flow.id, !!a.delayed);
        return r;
    };
    Activities.prototype.sync = function(e, t, n) {
        if (e !== "read") {
            return Flowdock.socketIoSync(e, t, n);
        }
        (n.data || (n.data = {})).thread_id = this.thread;
        return this.addPending({
            method: e,
            model: t,
            options: n
        });
    };
    Activities.prototype.initialize = function(e, n) {
        var r;
        r = new Models.Filter.Thread(n.thread);
        Activities.__super__.initialize.call(this, e, _.extend({
            filter: r
        }, n));
        this.thread = n.thread;
        return this.listenTo(this, "change:thread_id", function(e) {
            if (e.get("thread_id") !== this.thread) {
                return this.remove(e);
            }
            return;
        });
    };
    Activities.prototype.consume = function() {
        Activities.__super__.consume.apply(this, arguments);
        return this.addStream(this.stream.filter(function(e) {
            return e.event === "message-change";
        }).onValue(this, "_insertMissingToThread"));
    };
    Activities.prototype._insertMissingToThread = function(e) {
        var t, n, r;
        t = e.content;
        r = e.patch;
        n = e.message_id;
        if (i.call(r, "thread_id") >= 0 && t.thread_id === this.thread && !this.get(n)) {
            return this.add(t);
        }
        return;
    };
    Activities.prototype.url = function() {
        return this.flow.url() + "/threads/" + this.thread + "/messages";
    };
    Activities.bulkUrl = function(e) {
        return e.url() + "/bulk/messages";
    };
    return Activities;
}(Collections.Messages);

exports.Activities = Collections.Activities;
