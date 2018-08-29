var r, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty, s = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = require("../truncate");

Views.Inbox.SingleViewMessage = function(t) {
    function SingleViewMessage() {
        return SingleViewMessage.__super__.constructor.apply(this, arguments);
    }
    var i;
    o(SingleViewMessage, t);
    i = 4;
    SingleViewMessage.prototype.tagName = "article";
    SingleViewMessage.prototype.className = "single-view-message single-message";
    SingleViewMessage.prototype.events = {
        "click a.tag-edit-link": "openTagInput",
        "click a.upgrade-integration": "openInboxPreferences"
    };
    SingleViewMessage.prototype.contentClass = "headline";
    SingleViewMessage.prototype.initialize = function() {
        SingleViewMessage.__super__.initialize.apply(this, arguments);
        if (this.isChatMessage()) {
            return this.contentClass = "excerpt";
        }
        return;
    };
    SingleViewMessage.prototype.destructor = function() {
        var e;
        if ((e = this.dropdown) != null) {
            e.remove()
        };
        this.dropdown = null;
        SingleViewMessage.__super__.destructor.apply(this, arguments);
        return this.truncatedContent = null;
    };
    SingleViewMessage.prototype.isChatMessage = function() {
        var e;
        e = this.model.get("event");
        return s.call(Models.Filter.Chat.prototype.event, e) >= 0;
    };
    SingleViewMessage.prototype.renderContent = function() {
        var t, n, o, s, a, u, l, c, p, d, h, f, m, g, v, b;
        if ((f = this.dropdown) != null) {
            f.remove()
        };
        if (typeof (s = this.model).presenter == "function") {
            h = s.presenter({
                lineLimit: Math.pow(2, 32)
            });
        } else {
            h = undefined;
        }
        if (!h) {
            throw new Error("No presenter found");
        }
        for (a = typeof h.body == "function" ? h.body() : undefined, o = h.author(), u = this.model.editable() && (typeof excerpt != "undefined" && null !== excerpt && (m = excerpt.html) != null ? m.length : undefined) === 0, 
        (a && $.trim(a) === "" || this.isChatMessage()) && (a = undefined), this.$el.html(Helpers.renderTemplate(require("../../templates/inbox/single_view_message.mustache"))({
            presenter: h,
            avatar: h.avatar(40),
            author: o,
            action: Helpers.capitalizeFirst(typeof h.action == "function" ? h.action() : undefined),
            emptied: u,
            body: a,
            meta: h.meta(),
            linkify_meta: true,
            linkify_author: (o != null ? o.link : undefined) != null,
            timestamp: Helpers.TimeHelper.timestamp(this.model.get("sent"), {
                calendar: true,
                link: this.timestampLink(h),
                before: "on"
            }),
            editTime: Helpers.TimeHelper.editTime(this.model.get("edited"), u),
            mainLink: typeof h.link == "function" ? h.link() : undefined,
            mainLinkTitle: typeof h.linkTitle == "function" ? h.linkTitle() : undefined,
            iconType: this.iconType(),
            commentCount: this.model.comments.length,
            showMeta: !this.isChatMessage(),
            hasAttachments: this.model.appendedAttachments().length > 0 && !this.isChatMessage(),
            hasAuthor: true,
            deprecated: this.model.isDeprecated()
        }, {
            author: require("../../templates/inbox/item_author.mustache"),
            meta: require("../../templates/inbox/single_view_meta.mustache")
        })), h.events != null && this.delegateEvents(_.extend(this.events, h.events())), 
        g = this.model.appendedAttachments(), c = 0, d = g.length; d > c; c++) {
            t = g[c];
            n = this.subview(new Views.Shared.Attachment({
                attachment: t,
                model: this.model,
                parent: this,
                renderIfPreviewsHidden: "file" !== this.model.get("event")
            }));
            this.$(".attachments").append(n.render().$el);
        }
        this.$el.toggleClass("deleted", u);
        if (h.avatar() == null) {
            this.$(".meta-content").addClass("no-avatar")
        };
        l = this.$(".updated-fields");
        if ((typeof h.updatedFields == "function" ? h.updatedFields().length : undefined) > i && l.length > 0) {
            this.truncatedContent && this.removeSubview(this.truncatedContent), b = (v = this.truncatedContent) != null ? v.truncated : undefined, 
            this.truncatedContent = this.subview(new r({
                el: l,
                truncated: b
            })).render()
        };
        if (this.isChatMessage()) {
            this.previewImageLinks()
        };
        if (this.isChatMessage()) {
            p = "single-chat-message";
        } else {
            p = this.model.get("event");
        }
        this.$el.addClass(p);
        return this;
    };
    SingleViewMessage.prototype.tagInputTarget = function() {
        return this.$(".tag-edit-link");
    };
    SingleViewMessage.prototype.previewImageLinks = function() {
        return this.$(".body a.embeddable").filter(function() {
            return "CODE" !== $(this).parent()[0].nodeName;
        }).each(function(e) {
            return function(t, n) {
                var r, o, i, s;
                o = $(n);
                s = o.prop("href");
                r = Views.Embed.match(s);
                if (r) {
                    i = o.wrap('<div class="embed">').parent();
                    return e.subview(new r({
                        url: s,
                        el: i,
                        parent: e,
                        message: e.model
                    }).render());
                }
                return;
            };
        }(this));
    };
    SingleViewMessage.prototype.newTagInput = function() {
        return new Views.Shared.TagInput({
            model: this.model,
            direction: "w"
        });
    };
    SingleViewMessage.prototype.toggleCommitSummary = function(e) {};
    SingleViewMessage.prototype.openInboxPreferences = function(e) {
        return Flowdock.app.manager.openFlowSettings(this.model.flow(), "integrations");
    };
    return SingleViewMessage;
}(Views.Shared.Message);
