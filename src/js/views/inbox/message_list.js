var r, o, i, s = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, a = function(e, t) {
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
}, u = {}.hasOwnProperty;

i = React.DOM.a;

o = React.createFactory(require("components/inbox/list_header"));

r = React.createFactory(require("components/inbox/footer"));

Views.Inbox.MessageList = function(e) {
    function MessageList() {
        this._clearSearch = s(this._clearSearch, this);
        this._openInboxSettings = s(this._openInboxSettings, this);
        this.setSearchSortBy = s(this.setSearchSortBy, this);
        this.isSearching = s(this.isSearching, this);
        this.validNewTagSearch = s(this.validNewTagSearch, this);
        this.canPurgeMessages = s(this.canPurgeMessages, this);
        return MessageList.__super__.constructor.apply(this, arguments);
    }
    a(MessageList, e);
    MessageList.prototype.className = "inbox-message-list";
    MessageList.prototype.scrollThreshold = 50;
    MessageList.prototype.collectionEvents = _.extend({}, Views.Shared.MessageList.prototype.collectionEvents, {
        historyComplete: "onHistoryComplete"
    });
    MessageList.prototype.listName = "inbox";
    MessageList.prototype.initialize = function(e) {
        this.viewModel = e.viewModel;
        this.collapseThreads = e.collapseThreads;
        this.parent = e.parent;
        MessageList.__super__.initialize.apply(this, arguments);
        this.setupMessagePurging(500, 50);
        return this.listenTo(this.viewModel, "inbox-scroll-top", function() {
            return this.scrollLocation(0);
        });
    };
    MessageList.prototype.canPurgeMessages = function() {
        return this.state.scrollLocation < this.scrollThreshold && this.backwardLoader.current === "more";
    };
    MessageList.prototype.validNewTagSearch = function() {
        var e;
        e = function(e) {
            return !e.includes(":") || e.includes(":user") || e.includes(":group");
        };
        return !this.collection.messageFilter.slug && this.collection.messageFilter.tags.length > 0 && this.collection.messageFilter.tags.filter(e).length === this.collection.messageFilter.tags.length;
    };
    MessageList.prototype.isSearching = function() {
        var e, t;
        e = this.collection.messageFilter.slug === "files";
        t = this.collection.messageFilter.slug === "links";
        return this.collection.messageFilter.slug === "search" || e || t || this.validNewTagSearch();
    };
    MessageList.prototype.setSearchSortBy = function(e) {
        if (this.backwardLoader.current === "loading") {
            return false;
        }
        this.collection.reset();
        this.collection.messageFilter.searchSortBy = e;
        this.clearMessages();
        this.removeEndMessage();
        this.backwardLoader.state("loading");
        this.renderBackwardLoader();
        return this.collection.fetchMessages({
            data: {
                searchSortBy: e
            }
        }, true, true, function(e) {
            return function(t) {
                e.renderGroup(t, {
                    history: true
                });
                e.backwardLoader.state("more");
                return e.renderBackwardLoader();
            };
        }(this));
    };
    MessageList.prototype.renderHeader = function() {
        var e, t, n, r;
        e = this.collection.messageFilter.slug === "files";
        t = this.collection.messageFilter.slug === "links";
        if (!this.isSearching() || e || t) {
            return undefined;
        }
        n = {
            setSortBy: this.setSearchSortBy
        };
        r = $("<div>").addClass("inbox-message-list-wrapper");
        this.$el.append(r);
        return this.header = this.component(r[0], o(n));
    };
    MessageList.prototype.removeEndMessage = function() {
        return this.$el.children(".inbox-footer-wrapper").remove();
    };
    MessageList.prototype.renderEndMessage = function() {
        var e, t, n, o, s, a;
        a = $("<div>").addClass("inbox-footer-wrapper");
        this.$el.append(a);
        t = this.collection.length > 0;
        if (this.isSearching() && t) {
            s = "No more matching results.";
            o = "Didn't find what you wanted? Try simpler search terms.";
            e = [ i({
                className: "primary-button",
                onClick: this._clearSearch
            }, "Clear search") ];
        } else {
            if (this.isSearching()) {
                s = "No messages matched the search.";
                o = "Try simplifying or modifying your search terms.";
                e = [ i({
                    className: "primary-button",
                    onClick: this._clearSearch
                }, "Clear search") ];
            } else {
                s = "You've reached the end of inbox.";
                o = "Looking for more? Add another source.";
                if (!this.isPrivate) {
                    e = [ i({
                        className: "primary-button",
                        onClick: this._openInboxSettings
                    }, "Set up more sources") ]
                };
            }
        }
        n = {
            flow: this.collection.flow,
            compact: this.collection.length > 0 || this.isSearching(),
            title: s,
            subtitle: o,
            actions: e
        };
        return this.footer = this.component(a[0], r(n));
    };
    MessageList.prototype.onHistoryComplete = function(e) {
        var t;
        if (e !== "forward") {
            t = function(e) {
                return function() {
                    return e.$el.append(e.renderEndMessage());
                };
            }(this);
            return this.onceMessagesRendered(t);
        }
    };
    MessageList.prototype.populated = function() {
        return this.$el.children().length > 0;
    };
    MessageList.prototype.renderOne = function(e) {
        var t, n, r, o, i;
        try {
            r = this.collection.indexOf(e);
            if (this.collapseThreads && r > 0) {
                i = this.collection.at(r - 1);
                if (i && this.collection.threadGroupLeaderOf(i).get("id") === e.get("id")) {
                    this.removeSubview(i)
                };
            };
            if (!this.collapseThreads || this.collection.isThreadGroupLeader(e)) {
                o = this.subview(new Views.Inbox.Item.build({
                    model: e,
                    viewModel: this.viewModel,
                    collapseThreads: this.collapseThreads
                }));
                t = o.render().el;
                if (this.isAttached()) {
                    o.triggerAttach()
                };
                return [ t ];
            }
            return [];
        } catch (s) {
            return n = s, console.error(n, n.message, n.stack), console.log("Error was caused by", e.get("event"), e), 
            o = this.subview(new Views.Shared.MessageError({
                app: "inbox",
                model: e,
                error: n
            })), [ o.render().el ];
        }
    };
    MessageList.prototype.onAdd = function(e) {
        MessageList.__super__.onAdd.apply(this, arguments);
        if (this.scrollLocation() > this.scrollThreshold) {
            this.buildMoreMessagesIndicator({
                direction: "above"
            })
        };
        if (this.footer && this.collection.length === 1) {
            return this.footer.setProps({
                compact: true
            });
        }
        return;
    };
    MessageList.prototype.onRemove = function(e, n, r) {
        var o, i, s, a, u;
        i = r.index;
        if ((u = this.findSubviews(e)[0]) && (a = this.collection.at(i - 1)) && a.threadId() === e.threadId()) {
            s = this.subview(new Views.Inbox.Item.build({
                model: a,
                viewModel: this.viewModel
            }));
            o = s.render().el;
            u.$el.before(o);
            if (this.isAttached()) {
                s.triggerAttach()
            };
        };
        MessageList.__super__.onRemove.apply(this, arguments);
        if (this.footer && this.collection.length === 0) {
            return this.footer.setProps({
                compact: false
            });
        }
        return;
    };
    MessageList.prototype.messageCount = function() {
        return this.$("li.inbox-message").length;
    };
    MessageList.prototype.destructor = function() {
        MessageList.__super__.destructor.apply(this, arguments);
        return this.viewModel = null;
    };
    MessageList.prototype._openInboxSettings = function() {
        return Flowdock.app.manager.openFlowSettings(this.collection.flow, "integrations");
    };
    MessageList.prototype._clearSearch = function() {
        if (this.collection.flow.isFlow()) {
            return Flowdock.app.router.navigateTo({
                flow: this.collection.flow
            });
        }
        return this.trigger("closePrivateSearch");
    };
    return MessageList;
}(Views.Shared.MessageList);

_.extend(Views.Inbox.MessageList.prototype, Flowdock.LastReadMarker);
