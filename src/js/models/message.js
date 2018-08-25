var r, o, i = function(e, t) {
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
}, s = {}.hasOwnProperty, a = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

o = require("../lib/string.truncate");

r = require("../lib/markdown");

Models.Message = function(e) {
    function Message() {
        return Message.__super__.constructor.apply(this, arguments);
    }
    i(Message, e);
    Message.prototype.defaults = function() {
        return {
            event: "message",
            content: "",
            emojiReactions: {},
            tags: []
        };
    };
    Message.prototype.sync = Flowdock.socketIoSync;
    Message.prototype.getTitle = function() {
        var e, t, n;
        e = this.get("content");
        if ((t = this.get("thread")) != null) {
            n = t.title;
        } else {
            n = undefined;
        }
        if (e != null && e.file_name) {
            if (e != null) {
                return e.file_name;
            }
            return;
        }
        if (typeof e == "object") {
            return n;
        }
        return e || n;
    };
    Message.prototype._threadTitle = function(e) {
        if (e) {
            return o(r.text(r.parse(e)).split(/\n/)[0] || "", 80).trim();
        }
        if (this.get("event") === "file" && this.isUnsaved()) {
            return "Uploading file";
        }
        return;
    };
    Message.prototype.initialize = function(e, t) {
        var n, r, o;
        if (e == null) {
            e = {}
        };
        if (t == null) {
            t = {}
        };
        e.uuid || this.set("uuid", this.generateUuid());
        if (t.flow) {
            this._flow = t.flow, this.set({
                flow: t.flow.id
            })
        };
        n = this.isUnsaved() && !t["private"] && !this.get("thread_id") && this.get("app") === "chat" && ((r = this.get("event")) === "message" || r === "file" || r === "status" || r === "line");
        if (n) {
            o = this.generateThreadId(), this.set({
                thread: {
                    title: this._threadTitle(this.getContent()),
                    id: o
                },
                thread_id: o
            }), Flowdock.analytics.trackHighVolume(Flowdock.ANALYTICS_EVENT_TYPES.threads_add)
        };
        if (t["private"]) {
            this._private = t["private"], this.set({
                to: t["private"].id
            })
        };
        if (t.comments !== false) {
            return this.comments = new Collections.CommentMessages([], {
                flow: this.flow(),
                message: this,
                fresh: t.fresh
            });
        }
        return;
    };
    Message.prototype.threadColor = function() {
        if (this.isThreadStarter() || this.isInConversation()) {
            return Helpers.CommentHelper.color(this.flow().id, this.threadId());
        }
        return null;
    };
    Message.prototype.isUnsaved = function() {
        return this.id == null;
    };
    Message.fromOpenFlows = function(e, t) {
        return e.filter(function(e) {
            var n;
            return e.to || ((n = t.get(e.flow)) != null ? n.get("open") : undefined);
        });
    };
    Message.ignoreByFlow = function(e, t) {
        return t.map(function(e) {
            return e || false;
        }).sampledBy(e, function(e, t) {
            if (e) {
                if (e.isFlow() && t.flow != null && t.flow === e.id) {
                    return false;
                }
                if (e.isPrivate() && t.to != null && e.isBetweenUsers([ t.user, t.to ])) {
                    return false;
                }
                return t;
            }
            return t;
        }).filter(function(e) {
            return e;
        });
    };
    Message.highlightStream = function(e, t) {
        return e.filter(function(e) {
            return new Models.Message(e).highlights(t);
        });
    };
    Message.prototype.url = function() {
        return this.flow().url() + "/messages/" + this.id;
    };
    Message.prototype.flow = function() {
        if (this._flow) {
            return this._flow;
        }
        if (this._private) {
            return this._private;
        }
        if (this.collection) {
            return this.collection.flow;
        }
        if (Flowdock.app == null) {
            return null;
        }
        if (this.get("to")) {
            return Flowdock.app.privates.forMessage(this);
        }
        return Flowdock.app.flows.get(this.get("flow"));
    };
    Message.prototype.tags = function() {
        var e, t, n, r, o;
        for (n = this.get("tags"), r = [], e = 0, t = n.length; t > e; e++) {
            o = n[e];
            r.push(this.flow().tags.getOrAdd(o));
        }
        return r;
    };
    Message.prototype.humanTags = function() {
        return _.filter(this.tags(), function(e) {
            return e.humanize();
        });
    };
    Message.prototype.generateThreadId = function() {
        return this.generateIdentifier(27);
    };
    Message.prototype.generateUuid = function() {
        return this.generateIdentifier(16);
    };
    Message.prototype.generateIdentifier = function(e) {
        var t, n;
        t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz-_";
        return function() {
            var r, o, i;
            for (i = [], n = r = 0, o = e; o >= 0 ? o > r : r > o; n = o >= 0 ? ++r : --r) {
                i.push(t.charAt(Math.floor(Math.random() * t.length)));
            }
            return i;
        }().join("");
    };
    Message.prototype.myMessage = function() {
        var e, t, n, r, o;
        if ((t = this.user()) != null) {
            o = t.id;
        } else {
            o = undefined;
        }
        if ((n = this.flow()) != null && (r = n.me()) != null) {
            e = r.id;
        } else {
            e = undefined;
        }
        return !(!o || !e || o !== e);
    };
    Message.prototype.editable = function() {
        var e;
        return (e = this.get("event")) === "message" || e === "comment";
    };
    Message.prototype.getContent = function() {
        var e;
        if (this.get("event") === "comment") {
            return this.get("content").text;
        }
        if ((e = this.get("event")) === "message" || e === "status") {
            return this.get("content");
        }
        return;
    };
    Message.prototype.containsNSFWContent = function() {
        var e, t, n, r;
        e = _.some(this.humanTags(), function(e) {
            return e.id === "nsfw";
        });
        n = !!(typeof this.getContent == "function" && (r = this.getContent()) != null ? r.match(/\bnsfw\b/i) : undefined);
        t = n && !!this.getContent().match(/#nsfw\b/i);
        if (t) {
            return e;
        }
        return e || n;
    };
    Message.prototype.isDeleted = function() {
        return this.editable() && this.getContent() === "" && this.get("edited") != null;
    };
    Message.prototype.searchReplaceContent = function(e, t) {
        var n, r;
        if (this.editable()) {
            r = function(e, t, n) {
                var r;
                r = e.replace(RegExp(t, "gi"), n);
                if (r !== e) {
                    return r;
                }
                return;
            };
            if (this.get("event") === "comment") {
                n = r(this.get("content").text, e, t);
            } else {
                if (this.get("event") === "message") {
                    n = r(this.get("content"), e, t)
                };
            }
            return this.updateContent(n);
        }
    };
    Message.prototype.updateContent = function(e, t) {
        if (_.isString(e)) {
            if (e.trim().length === 0) {
                e = ""
            };
            if (e.length > 8e3) {
                e = e.slice(0, 8e3)
            };
            if (this.get("event") === "comment") {
                this.set({
                    content: _.extend(this.get("content"), {
                        text: e
                    })
                });
            } else {
                if (this.get("event") === "message") {
                    this.set("content", e)
                };
            }
            return this.saveWithRetry(null, t);
        }
        return;
    };
    Message.prototype.sendableToRally = function() {
        var e, t, n;
        return ((e = this.get("thread")) != null && (t = e.source) != null && (n = t.application) != null ? n.name : undefined) === "Rally" && this.editable() && this.myMessage();
    };
    Message.prototype.rethread = function(e, t) {
        Flowdock.analytics.track(t);
        return $.post(this.url() + "/rethread", {
            thread_id: e
        });
    };
    Message.prototype.removable = function() {
        if (this.get("app") === "influx") {
            return true;
        }
        return this.get("event") === "file" && this.myMessage();
    };
    Message.prototype.user = function() {
        var e, t;
        if (this.has("external_user_name")) {
            return new Models.ExternalUser({
                nick: this.get("external_user_name")
            });
        }
        if ((e = this.get("user")) === 0 || e === "0" || e === null) {
            return new Models.DefaultUser();
        }
        if (this.flow()) {
            t = this.get("event");
            if (a.call(Models.Filter.Chat.prototype.event, t) >= 0) {
                return this.flow().users.getOrAdd(this.get("user"));
            }
            return this.flow().users.get(this.get("user"));
        }
        return;
    };
    Message.prototype.isValid = function() {
        var e;
        if (this.attributes.flow || this.attributes.to) {
            if (((e = this.attributes.event) === "message" || e === "line") && this.attributes.content.trim().length <= 0) {
                return false;
            }
            return true;
        }
        return false;
    };
    Message.prototype.isInformational = function() {
        var e;
        return (e = this.get("event")) === "action" || e === "activity" || e === "line" || e === "status" || e === "user-edit";
    };
    Message.prototype.presenterData = function() {
        var e, t;
        return {
            flowPath: typeof (e = this.flow()).path == "function" ? e.path() : undefined,
            groups: this.flow().groups,
            inTeam: this.inTeam(Flowdock.app.user),
            sent: this.get("sent"),
            thread: this.get("thread"),
            user: (t = this.user()) != null ? t.toJSON() : undefined,
            users: this.flow().users.toJSON()
        };
    };
    Message.prototype.presenter = function(e) {
        var t, n, r;
        if ((n = this.get("event")) === "activity" || n === "discussion") {
            if (e != null && e.collapseThreads) {
                t = ((r = this.collection) != null ? r.threadGroupOf(this) : undefined) || [];
            } else {
                t = [ this ];
            }
            return new Presenters.Activity(this.toJSON(), t, e != null ? e.lineLimit : undefined);
        }
        if (this.get("event") === "thread") {
            return new Presenters.Thread(this.toJSON());
        }
        return Presenters.createPresenter(this.get("event"), this.get("content"), _.extend(this.presenterData(), e));
    };
    Message.prototype.appendedAttachments = function() {
        return (this.get("attachments") || []).filter(function(e) {
            return !e.content_disposition || !e.content_disposition.match(/^inline/);
        });
    };
    Message.prototype.previousTags = function(e) {
        var t, n, r, o, i, s;
        if (e == null) {
            e = false
        };
        o = this.previousAttributes().tags;
        n = this.get("tags");
        t = _.difference(n, o);
        i = _.difference(o, n);
        r = function(e) {
            return function(t) {
                if (e.collection) {
                    return e.collection.flow.tags.getOrAdd(t);
                }
                return new Models.Tag({
                    id: t
                });
            };
        }(this);
        if (e) {
            return {
                add: t,
                remove: i
            };
        }
        return {
            add: function() {
                var e, n, o;
                for (o = [], e = 0, n = t.length; n > e; e++) {
                    s = t[e];
                    o.push(r(s));
                }
                return o;
            }(),
            remove: function() {
                var e, t, n;
                for (n = [], e = 0, t = i.length; t > e; e++) {
                    s = i[e];
                    n.push(r(s));
                }
                return n;
            }()
        };
    };
    Message.prototype.modifyTags = function(e) {
        var t, n, r, o, i, s;
        if (e == null) {
            e = {}
        };
        t = function() {
            var t, n, r, o;
            for (r = e.add || [], o = [], t = 0, n = r.length; n > t; t++) {
                s = r[t];
                o.push(s.toLowerCase());
            }
            return o;
        }();
        i = function() {
            var t, n, r, o;
            for (r = e.remove || [], o = [], t = 0, n = r.length; n > t; t++) {
                s = r[t];
                o.push(s.toLowerCase());
            }
            return o;
        }();
        r = this.get("tags");
        n = _.union(_.difference(r, i), t);
        this.set("tags", n, {
            user: e.user || ((o = window.user) != null ? o.id : undefined)
        });
        this.trigger("tag-change", {
            add: t,
            remove: i
        });
        if (e.remote !== true && e.sync !== false) {
            this.sync("tag-change", this, {
                tagChanges: {
                    add: t,
                    remove: i
                }
            })
        };
        return this;
    };
    Message.prototype.handleEmojiReaction = function(e) {
        var t, n, r;
        if (e == null) {
            e = {}
        };
        t = e.emoji;
        r = e.user;
        n = this.get("emojiReactions");
        if (e.type === "add") {
            n[t] = n[t] || [];
            if (n[t].indexOf(r) === -1) {
                n[t].push(r)
            };
        } else {
            if (e.type === "remove" && n[t]) {
                n[t] = n[t].filter(function(e) {
                    return e !== r;
                }), n[t].length || delete n[t]
            };
        }
        this.set("emojiReactions", n);
        this.trigger("change:emojiReactions", this, n);
        return this;
    };
    Message.prototype.tagDifference = function(e) {
        return {
            add: _.difference(e, this.get("tags")),
            remove: _.difference(this.get("tags"), e)
        };
    };
    Message.prototype.addTags = function(e, t) {
        if (t == null) {
            t = {}
        };
        return this.modifyTags(_.extend({}, t, {
            add: e
        }));
    };
    Message.prototype.removeTags = function(e, t) {
        if (t == null) {
            t = {}
        };
        return this.modifyTags(_.extend({}, t, {
            remove: e
        }));
    };
    Message.prototype.markAsRead = function(e) {
        if (e && this.unread(e)) {
            return this.removeTags([ ":unread:" + e.id ]);
        }
        return;
    };
    Message.prototype.markAsUnread = function(e) {
        if (e && !this.unread(e)) {
            return this.addTags([ ":unread:" + e.id ]);
        }
        return;
    };
    Message.prototype.parent = function() {
        var e;
        if ((e = _.find(this.get("tags"), Models.Tag.inboxTag)) != null) {
            return e.split(":").pop();
        }
        return;
    };
    Message.prototype.isThread = function() {
        return !(!this.get("thread_id") || !this.get("thread"));
    };
    Message.prototype.threadId = function() {
        if (this.get("thread_id")) {
            return this.get("thread_id");
        }
        return parseInt(this.parent(), 10) || this.get("id");
    };
    Message.prototype.hasComments = function() {
        var e;
        e = Models.Tag.special.thread;
        return a.call(this.get("tags") || [], e) >= 0;
    };
    Message.prototype.hasTag = function(e) {
        var t;
        t = e.id || e;
        return _.any(this.get("tags") || [], function(e) {
            return e === t;
        });
    };
    Message.prototype.highlights = function(e, t) {
        var n, r;
        if (t == null) {
            t = {}
        };
        if (e && -1 !== Models.Filter.All.prototype.event.indexOf(this.get("event"))) {
            r = e.get("id").toString();
            if (t["private"] && this.get("to") != null && String(this.get("to")) === r) {
                return true;
            }
            n = [ ":user:" + r, ":user:everyone" ].concat(e.flowGroups().map(function(e) {
                return Models.Tag.groupTagFor(e.id);
            }));
            if (this.inTeam(e)) {
                n.push(":user:team")
            };
            return _.any(this.get("tags"), function(e) {
                return a.call(n, e) >= 0;
            });
        }
        return false;
    };
    Message.prototype.inTeam = function(e) {
        var t, n;
        if (e) {
            n = e.get("id").toString();
            return !this.flow().isPrivate() && ((t = this.flow().users.get(n)) != null ? t.get("team_notifications") : undefined);
        }
    };
    Message.prototype.usersReadMessage = function() {
        var e;
        e = this.flow().isPrivate();
        return this.flow().users.available().filter(function(t) {
            return function(n) {
                return t.highlights(n, {
                    private: e
                }) && !t.unread(n);
            };
        }(this));
    };
    Message.prototype.unread = function(e) {
        var t;
        if (e) {
            t = e.id || e;
            return _.include(this.get("tags"), ":unread:" + t);
        }
        return false;
    };
    Message.prototype.commentable = function() {
        return !this.isComment();
    };
    Message.prototype.isInConversation = function() {
        var e;
        if (this.isThread()) {
            e = this.get("thread");
            return e.initial_message !== this.id || (e.internal_comments || 0) + (e.external_comments || 0) + (e.activities || 0) > 1;
        }
        return this.hasComments() || this.parent();
    };
    Message.prototype.isCommentToThread = function() {
        var e, t;
        if (this.isThread()) {
            return ((e = this.get("event")) === "message" || e === "file" || e === "comment" || e === "discussion") && ((t = this.get("thread")) != null ? t.initial_message : undefined) !== this.id;
        }
        return this.parent();
    };
    Message.prototype.isComment = function() {
        return _.find(this.get("tags"), Models.Tag.inboxTag) != null;
    };
    Message.prototype.isPrivate = function() {
        var e;
        if ((e = this.flow()) != null) {
            return e.isPrivate();
        }
        return;
    };
    Message.prototype.isDeprecated = function() {
        var e;
        e = _.find(this.flow().integrations.deprecated(), function(e) {
            return function(t) {
                return t.get("service") === e.get("event");
            };
        }(this));
        if (this._skipNonGithubVcsEvents()) {
            return false;
        }
        return e != null;
    };
    Message.prototype._skipNonGithubVcsEvents = function() {
        return this.get("event") === "vcs" && !this._isGitHub();
    };
    Message.prototype._isGitHub = function() {
        var e, t, n;
        if ((e = this.get("content")) != null && (t = e.repository) != null && (n = t.url) != null) {
            return n.match("^https://api.github.com");
        }
        return;
    };
    Message.prototype.consume = function(e) {
        var t;
        this.subscriptions = [];
        t = e.filter(function(e) {
            return function(t) {
                return t.flow === e.get("flow");
            };
        }(this));
        this.subscriptions.push(t.filter(function(e) {
            return function(t) {
                return t.event === "tag-change" && t.content.message === e.id;
            };
        }(this)).onValue(function(e) {
            return function(t) {
                return e.modifyTags({
                    add: t.content.add,
                    remove: t.content.remove,
                    remote: true,
                    user: t.user
                });
            };
        }(this)));
        this.subscriptions.push(t.filter(function(e) {
            return function(t) {
                return t.event === "message-delete" && t.content.message === e.id;
            };
        }(this)).onValue(function(e) {
            return function(t) {
                return e.trigger("message-deleted");
            };
        }(this)));
        this.subscriptions.push(t.filter(function(e) {
            return function(t) {
                return t.thread && t.thread_id === e.get("thread_id");
            };
        }(this)).onValue(function(e) {
            return function(t) {
                return e.set("thread", t.thread);
            };
        }(this)));
        this.subscriptions.push(t.filter(function(e) {
            return function(t) {
                return t.event === "message-edit" && t.content.message === e.id;
            };
        }(this)).onValue(function(e) {
            return function(t) {
                var n, r, o, i;
                n = {
                    content: t.content.updated_content,
                    edited: t.sent
                };
                i = t.content.updated_event;
                r = t.content.updated_tags;
                if (r) {
                    o = _.extend(e.tagDifference(r), {
                        user: t.user,
                        sync: false
                    }), e.modifyTags(o)
                };
                if (i) {
                    e.set(n, {
                        trigger: false
                    });
                    return e.set({
                        event: i
                    });
                }
                return e.set(n);
            };
        }(this)));
        return this;
    };
    Message.prototype.unconsume = function() {
        var e, t, n, r;
        if (this.subscriptions != null) {
            for (n = this.subscriptions, e = 0, t = n.length; t > e; e++) {
                (r = n[e])();
            }
        }
        this.subscriptions = null;
        return this;
    };
    Message.prototype.cleanup = function() {
        if (this._preventCleanup) {
            return void console.log("not cleaning up locked model");
        }
        this.unconsume();
        if (this.comments) {
            this.comments.cleanup();
            return this.comments = undefined;
        }
        return;
    };
    Message.prototype.flowKey = function() {
        if (this.get("to")) {
            return {
                to: this.flow().id.toString()
            };
        }
        return {
            flow: this.get("flow")
        };
    };
    Message.prototype.commentsFetched = function() {
        return this.comments.historyComplete.backward === true;
    };
    Message.prototype.lockCleanup = function() {
        this._preventCleanup = true;
        return this;
    };
    Message.prototype.unlockCleanup = function() {
        this._preventCleanup = false;
        return this;
    };
    Message.prototype.isDroppableTo = function(e) {
        var t;
        return this.id !== e && (t = this.get("thread_id")) && t !== e;
    };
    Message.prototype.threadify = function() {
        return this.addTags([ Models.Tag.special.thread ]);
    };
    Message.prototype.deThreadify = function() {
        return this.removeTags([ Models.Tag.special.thread ]);
    };
    Message.prototype.replyTitle = function() {
        var e, t, n;
        n = "";
        if (this.isCommentToThread()) {
            n = this.isThread() ? (e = this.get("thread")) != null ? e.title : undefined : (t = this.get("content")) != null ? t.title : undefined
        };
        if (n && "" !== n) {
            return n;
        }
        return "Reply";
    };
    Message.prototype.isThreadStarter = function() {
        if (this.get("to")) {
            return false;
        }
        if (this.isThread()) {
            return !this.isCommentToThread();
        }
        return !this.parent();
    };
    Message.prototype.isRethreadable = function() {
        var e;
        return this.myMessage() && !this.isPrivate() && (!this.isThreadStarter() || !this.isInConversation()) && !this.isInformational() && ((e = this.collection) != null ? e.threadBeforeMessage(this) : undefined);
    };
    Message.prototype.hasContext = function() {
        var e;
        e = this.get("event");
        return a.call(Models.Filter.Chat.prototype.event, e) >= 0;
    };
    Message.prototype.hasStatus = function() {
        return false;
    };
    Message.prototype.permalink = function() {
        return Helpers.absoluteUrlFor({
            flow: this.flow(),
            message: this
        });
    };
    Message.prototype.flowUrl = function() {
        if (this.get("to")) {
            return undefined;
        }
        return Helpers.absoluteUrlFor({
            flow: this.flow()
        });
    };
    return Message;
}(Backbone.Model);

Models.ChatMessage = function(e) {
    function ChatMessage() {
        return ChatMessage.__super__.constructor.apply(this, arguments);
    }
    i(ChatMessage, e);
    ChatMessage.prototype.defaults = function() {
        return {
            app: "chat",
            event: "message",
            content: "",
            emojiReactions: {},
            tags: []
        };
    };
    return ChatMessage;
}(Models.Message);

Models.CommentMessage = function(e) {
    function CommentMessage() {
        return CommentMessage.__super__.constructor.apply(this, arguments);
    }
    i(CommentMessage, e);
    CommentMessage.prototype.defaults = function() {
        return {
            app: "chat",
            event: "comment",
            content: "",
            emojiReactions: {},
            tags: []
        };
    };
    CommentMessage.prototype.isValid = function() {
        return CommentMessage.__super__.isValid.call(this) && this.attributes.content.text.trim().length > 0;
    };
    return CommentMessage;
}(Models.ChatMessage);

Models.FileMessage = function(e) {
    function FileMessage() {
        return FileMessage.__super__.constructor.apply(this, arguments);
    }
    i(FileMessage, e);
    FileMessage.prototype.defaults = function() {
        return {
            app: "chat",
            event: "file",
            emojiReactions: {},
            tags: []
        };
    };
    return FileMessage;
}(Models.ChatMessage);

Models.InboxMessage = function(e) {
    function InboxMessage() {
        return InboxMessage.__super__.constructor.apply(this, arguments);
    }
    i(InboxMessage, e);
    InboxMessage.prototype.defaults = function() {
        return {
            app: "influx",
            content: "",
            emojiReactions: {},
            tags: []
        };
    };
    return InboxMessage;
}(Models.Message);

Models.ErrorMessage = function(e) {
    function ErrorMessage() {
        return ErrorMessage.__super__.constructor.apply(this, arguments);
    }
    i(ErrorMessage, e);
    ErrorMessage.prototype.defaults = function() {
        return {
            event: "error-message",
            content: "",
            emojiReactions: {},
            tags: []
        };
    };
    ErrorMessage.prototype.commentable = function() {
        return false;
    };
    return ErrorMessage;
}(Models.Message);
