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

Views.Inbox = function(e) {
    function Inbox() {
        return Inbox.__super__.constructor.apply(this, arguments);
    }
    r(Inbox, e);
    Inbox.prototype.id = "inbox";
    Inbox.prototype.className = "detailed";
    Inbox.prototype.initialize = function(e) {
        this.viewModel = e.viewModel;
        this.filter = new Models.Filter.Inbox();
        this.filterInboxMessages(this.filter);
        return this.$indicators = $("<div>").addClass("indicators");
    };
    Inbox.prototype.onSearchChange = function(e) {
        if (0 !== e.tags.length || e.application != null && 0 !== e.application.length || "all" !== e.slug && 0 !== e.event.length) {
            if (this.currentTagCount === 0 && e.tags.length === 1 && e.slug === "inbox") {
                e.slug = "all"
            };
        } else {
            e = new Models.Filter.Inbox();
        }
        return this.filterInbox(e);
    };
    Inbox.prototype.navigateToCurrentState = function(e, t) {
        return Flowdock.app.router.navigateToFlow(this.model, {
            filter: e
        }, t);
    };
    Inbox.prototype.filterInbox = function(e) {
        var t;
        if (e.notEqual(this.filter) || !((t = this.messageList) != null ? t.populated() : undefined)) {
            this.model.fullyLoaded.done(function(t) {
                return function() {
                    return t.filterInboxMessages(e);
                };
            }(this))
        };
        this.filter = e;
        return this.currentTagCount = e.tags.length;
    };
    Inbox.prototype.onDetach = function() {
        var e;
        return this.scrollTop = (e = this.messageList) != null ? e.$el.scrollTop() : undefined;
    };
    Inbox.prototype.onAttach = function() {
        var e;
        if (this.scrollTop && (e = this.messageList) != null) {
            return e.$el.scrollTop(this.scrollTop);
        }
        return;
    };
    Inbox.prototype.destructor = function() {
        this.messageList.collection.cleanup();
        this.lastReadMarker.cleanup();
        Inbox.__super__.destructor.apply(this, arguments);
        return this.messageList = this.filter = this.filters = this.lastReadMarker = null;
    };
    Inbox.prototype.render = function() {
        var e, t;
        this.listenTo(Flowdock.app.preferences, "change:link_previews", this.onMuteChange);
        this.$el.empty().append(this.$indicators, (e = this.messageList) != null && typeof e.render == "function" && (t = e.render()) != null ? t.$el : undefined);
        return this;
    };
    Inbox.prototype.findMessage = function(e) {
        return this.messageList.collection.get(e);
    };
    Inbox.prototype.rendered = function() {
        return this.$el.children().length > 0;
    };
    Inbox.prototype.filterInboxMessages = function(e) {
        var t, n, r, o;
        if (this.messageList) {
            this.messageList.collection.cleanup(), this.messageList.triggerDetach(), this.removeSubview(this.messageList)
        };
        t = !((o = e.query) != null ? o.length : undefined) && e.tags.length === 0;
        r = {
            flow: this.model,
            filter: e
        };
        n = new Collections.InboxMessages([], r);
        n.consume(this.model.stream);
        this.messageList = this.subview(new Views.Inbox.MessageList({
            collection: n,
            model: this.model,
            viewModel: this.viewModel,
            collapseThreads: t
        }));
        this.listenTo(this.messageList, "indication", function(e) {
            return this.$indicators.append(e);
        });
        this.scrollTop = null;
        if (this.lastReadMarker) {
            this.lastReadMarker.setupMessageList(this.messageList);
        } else {
            this.lastReadMarker = new Flowdock.LastReadMarker({
                name: "inbox",
                listDirection: "up",
                messageList: this.messageList
            });
        }
        this.model.fullyLoaded.done(function(e) {
            return function() {
                return e.messageList.renderMessages();
            };
        }(this));
        if (this.rendered()) {
            this.messageList.render(), this.$el.append(this.messageList.$el), $.contains($("body")[0], this.el) && this.messageList.triggerAttach()
        };
        return this.messageList;
    };
    Inbox.prototype.onMuteChange = function() {
        if (this.rendered()) {
            return this.$el.find(".message.file").each(function() {
                return $(this).toggleClass("no-thumbnail", !Flowdock.app.preferences.linkPreviews());
            });
        }
        return;
    };
    return Inbox;
}(Flowdock.HierarchicalView);
