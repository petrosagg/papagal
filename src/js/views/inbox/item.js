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

Views.Inbox.Item = function(t) {
    function Item() {
        return Item.__super__.constructor.apply(this, arguments);
    }
    r(Item, t);
    Item.prototype.className = "inbox-message";
    Item.prototype.events = {
        "click .delete": "delete",
        "click .context": "showContext",
        "click .dropdown-toggle": "toggleItemMenu",
        "click .edit-tags": "openTagInput",
        "click .emoji-reaction-button": "openEmojiPicker",
        "click .emoji-reaction": "onEmojiReactionClicked",
        "click .dropdown a": "preventOpen",
        "click .dropdown-wrapper": "preventOpen",
        mouseleave: "hideMenu"
    };
    Item.prototype.tagName = "li";
    Item.build = function(e) {
        if (e.model.get("thread")) {
            return new Views.Inbox.Thread(e);
        }
        return new Views.Inbox.Item(e);
    };
    Item.prototype.contentClass = "title";
    Item.prototype.initialize = function(e) {
        var t, r;
        t = e.alwaysHeadline;
        this.viewModel = e.viewModel;
        this.collapseThreads = e.collapseThreads;
        Item.__super__.initialize.apply(this, arguments);
        this.selected = false;
        this.alwaysHeadline = t || false;
        this.lineLimit = 2;
        r = this.model.get("event");
        if (!this.$el) {
            throw new Error("missing @$el");
        }
        this.addStream(this.$el.asEventStream("click").onValue(this, "toggleOpen"));
        if (!this.model.comments) {
            throw new Error("missing @model.comments");
        }
        this.untilEnd(this.model.comments.asEventStream("add")).onValue(this, "updateCommentCount");
        if (r === "message" || r === "comment" || r === "line" || r === "action") {
            this.contentClass = "excerpt"
        };
        if (!this.viewModel) {
            throw new Error("missing @viewModel");
        }
        this.untilEnd(this.viewModel.asEventStream("change")).onValue(this, "_handleSelection");
        return this;
    };
    Item.prototype._handleSelection = function() {
        if (this._isSelected()) {
            return this._select();
        }
        return this._deselect();
    };
    Item.prototype._isSelected = function() {
        return String(this.viewModel.get("selected_message")) === String(this.model.threadId()) && (this.viewModel.get("thread") || this.viewModel.get("single"));
    };
    Item.prototype.commentCount = function() {
        return this.model.comments.length;
    };
    Item.prototype.commentCountVisible = function() {
        return this.commentCount() > 0 && this.collapseThreads;
    };
    Item.prototype.hideTitle = function() {
        return false;
    };
    Item.prototype.renderContent = function() {
        var t, n, r, o, s, a, u, l, c, p, d, h, f, m, g, v, b, y, _;
        m = this.model.presenter({
            collapseThreads: this.collapseThreads,
            lineLimit: this.lineLimit
        });
        if (!m) {
            throw new Error("No presenter found");
        }
        n = m.author() || (typeof (o = this.model).user == "function" ? o.user() : undefined);
        r = m.avatar(120) || (n != null && typeof n.avatar == "function" ? n.avatar(120) : undefined);
        t = (typeof m.action == "function" ? m.action() : undefined) || "";
        d = this.model.humanTags();
        if (typeof m.excerpt == "function") {
            l = m.excerpt();
        } else {
            l = undefined;
        }
        a = this.model.editable() && (l != null && (g = l.html) != null ? g.length : undefined) === 0;
        s = Helpers.TimeHelper.editTime(this.model.get("edited"), a);
        v = this.model.get("event");
        c = i.call(Models.Filter.Chat.prototype.event, v) >= 0;
        b = this.model.get("event");
        p = i.call(Models.Filter.Chat.prototype.event, b) >= 0 && !this.model.get("thread_id") || (typeof m.hasCommits == "function" ? m.hasCommits() : undefined) && (typeof m.action == "function" ? m.action().match(/updated/) : undefined);
        f = this.model.get("event") === "file";
        this.$el.html(Helpers.renderTemplate(require("../../templates/inbox/item.mustache"))({
            presenter: m,
            hideTitle: this.hideTitle(),
            icon: m.icon(),
            avatar: r,
            author: n,
            status: (y = this.model.get("thread")) != null ? y.status : undefined,
            headline: m.headline(),
            htmlHeadline: typeof m.htmlHeadline == "function" ? m.htmlHeadline() : undefined,
            meta: m.meta(),
            excerpt: l,
            emptied: a,
            editTime: s,
            timestamp: Helpers.TimeHelper.timestamp(this.model.get("sent"), {
                calendar: true,
                preposition: true,
                link: this.timestampLink(m)
            }),
            commentCount: this.commentCount(),
            removable: this.model.removable(),
            hideHeadline: p && !this.alwaysHeadline,
            metaInExcerpt: f,
            hasContext: c,
            hasAuthor: !(typeof m.grouped == "function" ? m.grouped() : undefined) && (n.name || n.partial),
            tags: d,
            mainLink: typeof m.link == "function" ? m.link() : undefined,
            mainLinkTitle: typeof m.linkTitle == "function" ? m.linkTitle() : undefined,
            actionLinkTitle: Helpers.capitalizeFirst(typeof m.linkTitle == "function" && (_ = m.linkTitle()) != null ? _.replace(/^Open(?: in)? /, "") : undefined),
            action: Helpers.capitalizeFirst(t),
            iconType: this.iconType()
        }, {
            author: require("../../templates/inbox/item_author.mustache"),
            excerpt: require("../../templates/inbox/item_excerpt.mustache"),
            headline: require("../../templates/inbox/item_headline.mustache"),
            itemMeta: require("../../templates/inbox/item_meta.mustache"),
            menuIcon: require("../../templates/icons/menu_icon.mustache"),
            metaItem: require("../../templates/inbox/item_meta_item.mustache")
        }));
        h = new Views.Inbox.ItemActionList({
            model: this.model
        });
        this.$(".dropdown-menu:not(.sub-menu)").append(h.$el);
        h.render();
        if (l != null && l.html) {
            this.$(".commit-details").each(function(e, t) {
                return $(t).tipsy({
                    title: function() {
                        return "<ul class='commit-changes show'>" + $(t).next(".commit-changes").html() + "</ul>";
                    },
                    html: true
                });
            })
        };
        Helpers.TimeHelper.updateTimestamps(this.$el);
        this.$el.toggleClass("deleted", a);
        this.$el.addClass(typeof m.additionalClasses == "function" ? m.additionalClasses() : undefined);
        if (r) {
            this.$(".avatar").addClass("found").css("background-image", "url(" + r + ")")
        };
        u = this.model.get("event");
        if ([ "message", "comment", "action" ].indexOf(u) >= 0) {
            u = "inbox-chat-message";
        } else {
            u = u;
        }
        this.$el.addClass(u);
        this.$el.toggleClass("no-thumbnail", !Flowdock.app.preferences.linkPreviews() && this.model.get("event") === "file");
        this.updateCommentCount();
        this.menu = this.$("menu");
        this.menuButton = this.$("button.more");
        this._handleSelection();
        return this;
    };
    Item.prototype.updateCommentCount = function() {
        return this.$(".comment-count").text(this.commentCount()).toggle(this.commentCountVisible());
    };
    Item.prototype.toggleOpen = function(e) {
        var t, n;
        n = this.model.collection.messageFilter.slug !== "inbox";
        if (n) {
            t = this.model.collection.length - this.model.collection.indexOf(this.model), Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.search_result_click, {
                position: t
            })
        };
        if (Helpers.textSelected() || $(e.target).attr("href") || $(e.target).closest("a[href]").length > 0) {
            return undefined;
        }
        if (this.selected) {
            return this.close();
        }
        return this.open();
    };
    Item.prototype.open = function() {
        var e;
        this._select();
        if (this.model.flow().isPrivate()) {
            return Flowdock.app.router.navigateToPrivate(this.model.flow());
        }
        Flowdock.app.router.navigateToFlow(this.model.flow(), {
            message: this.model.threadId()
        });
        if ((e = Flowdock.app.manager.currentView) != null) {
            return e.jumpTo(this.model.id);
        }
        return;
    };
    Item.prototype.close = function() {
        this._deselect();
        return Flowdock.app.router.navigateToFlow(this.model.flow(), {
            message: null,
            thread: null
        });
    };
    Item.prototype.toggleItemMenu = function(e) {
        e.stopPropagation();
        return $(e.target).closest(".dropdown").toggleClass("open");
    };
    Item.prototype.hideMenu = function(e) {
        this.$el.removeClass("open");
        return this.$(".dropdown").removeClass("open");
    };
    Item.prototype.preventOpen = function(e) {
        return e.stopPropagation();
    };
    Item.prototype.newTagInput = function() {
        return new Views.Shared.TagInput({
            model: this.model,
            optionalDirection: "w"
        });
    };
    Item.prototype.openTagInput = function(e) {
        this.hideMenu();
        return Item.__super__.openTagInput.apply(this, arguments);
    };
    Item.prototype.destructor = function() {
        Item.__super__.destructor.apply(this, arguments);
        return this.menu = this.menuButton = null;
    };
    Item.prototype.showContext = function() {
        var e, t, n;
        if ((e = Flowdock.app.manager.currentView) != null && (t = e.single) != null) {
            t.returnToList()
        };
        if ((n = Flowdock.app.manager.currentView) != null) {
            return n.chat.jumpToMessage(this.model.id);
        }
        return;
    };
    Item.prototype._deselect = function() {
        if (this.selected) {
            this.$el.removeClass("selected")
        };
        return this.selected = false;
    };
    Item.prototype._select = function() {
        this.selected || this.$el.addClass("selected");
        return this.selected = true;
    };
    Item.prototype.renderTagBubbles = function() {};
    return Item;
}(Views.Shared.Message);
