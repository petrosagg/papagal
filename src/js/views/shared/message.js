var r, o, i, s, a = function(e, t) {
    return function() {
        return e.apply(t, arguments);
    };
}, u = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (l.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, l = {}.hasOwnProperty, c = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = require("../shared/emoji_picker.coffee");

i = require("../truncate");

o = require("../shared/tag_tooltip.coffee");

s = require("lib/markdown");

Views.Shared.Message = function(t) {
    function Message() {
        this._markAsSeen = a(this._markAsSeen, this);
        this._markTagAsRead = a(this._markTagAsRead, this);
        this.onInview = a(this.onInview, this);
        return Message.__super__.constructor.apply(this, arguments);
    }
    u(Message, t);
    Message.prototype.events = function() {
        return Collections.Tags.everyoneTags.concat("@team").reduce(function(e, t) {
            e["click [data-tag-search='" + t + "']"] = "toggleTagTooltip";
            return e;
        }, {
            "click [data-group]": "toggleTagTooltip",
            "click .share-with-rally": "onShareWithRally",
            "click .emoji-reaction": "onEmojiReactionClicked",
            "click .emoji-reaction-button": "openEmojiPicker"
        });
    };
    Message.prototype.modelEvents = {
        "change:emojiReactions": "onEmojiReactionChange",
        "change:tags": "onTagChange",
        "change:content": "onContentChange",
        "change:edited": "onContentChange",
        "change:id": "onIdChange",
        "change:thread": "onThreadChange",
        "tag-change": "checkUnread"
    };
    Message.prototype.author = function() {
        return this.model.get("author") || {
            avatar: this.model.user().avatar() || "",
            name: this.model.user().get("nick") || ""
        };
    };
    Message.prototype.contentClass = "content";
    Message.prototype.isPrivateMessage = function() {
        return !!this.model.get("to");
    };
    Message.prototype.onShareWithRally = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.integration_rally_share);
        return this.shareWithRally(this);
    };
    Message.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        Message.__super__.initialize.apply(this, arguments);
        this.$el.addClass("message");
        if (e.tags === !1) {
            this.disableTagRendering = !0
        };
        this.shareWithRally = e.shareWithRally || function() {
            return null;
        };
        if (this.needsEyeTracking()) {
            this.deferredEyeTracking = _.defer(function(e) {
                return function() {
                    var t;
                    t = e.attachedProperty().takeUntil(e.asEventStream("stopEyeTracking")).flatMapLatest(function(e) {
                        if (e) {
                            return Flowdock.appFocus;
                        }
                        return Bacon.once(!1);
                    });
                    return e.untilEnd(t).skipDuplicates().takeUntil(e.asEventStream("stopEyeTracking")).onValue(function(t) {
                        if (e.needsEyeTracking()) {
                            if (t) {
                                return e.eyeTracking();
                            }
                            return e.removeEyeTracking();
                        }
                        return e.stopEyeTracking();
                    });
                };
            }(this))
        };
        if (this.model.get("id")) {
            return void 0;
        }
        this.$el.addClass("hide-actions");
        this.listenToOnce(this.model, "unsent", this.onUnsent);
        this.listenToOnce(this.model, "sync", this.onSent);
        return this.tId = setTimeout(function(e) {
            return function() {
                return e.onUnsaved();
            };
        }(this), 8e3);
    };
    Message.prototype.onSent = function() {
        return this.preserveScrolling(function(e) {
            return function() {
                clearTimeout(e.tId);
                e.stopListening(e.model, "unsent", e.onUnsent);
                e.$el.removeClass("unsaved hide-actions");
                clearInterval(e.ellipsisAnimation);
                return e.$el.find(".unsent").remove();
            };
        }(this));
    };
    Message.prototype.onUnsent = function(t) {
        if (t === "invalid") {
            clearTimeout(this.tId);
            return this.preserveScrolling(function(t) {
                return function() {
                    t.$el.addClass("unsaved invalid");
                    return t.$el.append(Helpers.renderTemplate(require("../../templates/chat/notifications/message_invalid.mustache"))());
                };
            }(this));
        }
        this.onUnsaved();
        this.$(".unsent").remove();
        clearInterval(this.ellipsisAnimation);
        return this.$el.append(Helpers.renderTemplate(require("../../templates/chat/notifications/unsent.mustache"))());
    };
    Message.prototype.onUnsaved = function() {
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.messages_send_fail);
        return this.preserveScrolling(function(t) {
            return function() {
                var n;
                t.$el.addClass("unsaved");
                t.$(".unsent").remove();
                t.$el.append(Helpers.renderTemplate(require("../../templates/chat/notifications/message_pending.mustache"))());
                n = t.$(".unsent .ellipsis");
                return t.ellipsisAnimation = setInterval(function() {
                    var e;
                    e = n.text() + ".";
                    if (e.length === 4) {
                        e = ""
                    };
                    return n.text(e);
                }, 1e3);
            };
        }(this));
    };
    Message.prototype.resendMessage = function(e) {
        var t;
        e.preventDefault();
        if (this.model.isNew()) {
            t = this.model.clone();
            this.model.destroy();
            return t.save();
        }
        return;
    };
    Message.prototype.renderTags = function() {
        var e, t;
        e = this.model.humanTags();
        this.$(".edit-tags").toggleClass("filled", e.length > 0);
        this.$el.toggleClass("unread", this.model.unread((t = this.model.flow()) != null ? t.me() : void 0));
        this._updateTagList(e);
        this._renderNotificationMuted();
        return this.renderTagBubbles(this.$el);
    };
    Message.prototype._getTooltipText = function(e, t, n) {
        var r, o, i;
        i = t.filter(function(e) {
            return +e !== Flowdock.app.user.id;
        }).map(function(e) {
            return function(t) {
                return e.model.flow().getUserById(t).get("nick");
            };
        }(this));
        if (n) {
            i.unshift("You")
        };
        if (i.length > 1) {
            o = i.length > 2 ? "," : "";
            r = i.slice(0, -1).join(", ") + (o + " and " + i[i.length - 1]);
        } else r = i;
        return "<span><b>" + r + "</b> reacted with :" + e + ":</span>";
    };
    Message.prototype.renderEmojiReactions = function() {
        var e, t;
        t = this.$("ul.emoji-reactions").html("");
        e = this.model.get("emojiReactions");
        if (Object.keys(e).length) {
            Object.keys(e).forEach(function(n) {
                return function(r) {
                    var o, i, s, a, u, l, c, p, d;
                    p = e[r].filter(function(e) {
                        return !!n.model.flow().getUserById(e);
                    });
                    if (p.length) {
                        u = p.filter(function(e) {
                            return +e === Flowdock.app.user.id;
                        }).length > 0;
                        o = "<span class='count-text'>" + p.length + "</span>";
                        i = emojimoji(":" + r + ":");
                        c = n._getTooltipText(r, p, u);
                        d = u ? " user-selected" : "";
                        l = $("<li class='emoji-reaction" + d + "' data-emoji='" + r + "' title='" + c + "'>").html($('<a class="tag">').html("" + i + o));
                        a = n.renderEmoji(l);
                        s = a.find(".emojie,.emoji");
                        if (!s.length && i.length > 20) {
                            i = ":" + i.slice(1, 19) + "...:", a.find(".tag").html("" + i + o)
                        };
                        s.removeAttr("title");
                        return t.append(a);
                    }
                    return;
                };
            }(this));
            return $(t).find(".emoji-reaction").each(function() {
                return $(this).tipsy({
                    html: !0,
                    opacity: 1
                });
            });
        }
        return;
    };
    Message.prototype._getChildPills = function(e, t) {
        var n, r, o, i;
        r = this.model.flow();
        n = r.users.available();
        i = e === "group" ? t.get("members").map(function(e) {
            return r.users.get(e.id);
        }) : e === "team" ? n.filter(function(e) {
            return function(t) {
                return e.model.inTeam(t);
            };
        }(this)) : n;
        o = this.model.usersReadMessage().reduce(function(e, t) {
            e[t.id] = !0;
            return e;
        }, {});
        i.sort(function(e, t) {
            if (o[e.id] === o[t.id]) {
                return e.get("nick").toLowerCase().localeCompare(t.get("nick").toLowerCase());
            }
            if (o[e.id]) {
                return -1;
            }
            return 1;
        });
        return s.renderInline(i.map(function(e) {
            return "@" + e.get("nick");
        }).join(" "), this.model.presenterData());
    };
    Message.prototype.renderTagBubbles = function(e) {
        var t;
        t = this.model.usersReadMessage();
        return e.find(":not(.removed).tag.mention").toArray().forEach(function(e) {
            return function(n) {
                var r, o, i, s, a, u, l, p, d, h, f, m;
                m = parseInt(n.getAttribute("data-user"));
                a = n.getAttribute("data-group");
                p = n.getAttribute("data-tag-search") === "@team";
                i = e.model.flow().users.available();
                if (m) {
                    d = t.some(function(e) {
                        return e.id === m;
                    }) ? 1 : 0;
                    h = 1;
                } else if (a) {
                    s = e.model.flow().groups.getByHandle(a.slice(2));
                    if (!s) {
                        return;
                    }
                    u = s.get("members").map(function(e) {
                        return e.id;
                    });
                    d = t.filter(function(e) {
                        var t;
                        t = e.id;
                        return c.call(u, t) >= 0;
                    }).length;
                    h = u.length;
                } else if (p) {
                    d = t.filter(function(t) {
                        return e.model.inTeam(t);
                    }).length;
                    h = i.filter(function(t) {
                        return e.model.inTeam(t);
                    }).length;
                } else {
                    d = t.length;
                    h = i.length;
                }
                if (d) {
                    l = $(n).hasClass("highlight") ? " highlight" : "";
                    o = d === h ? '<strong class="fa fa-check fa-stack-1x" />' : "<strong class='fa-stack-1x seen-by-count' data-seen-by-count='" + d + "' />";
                    r = "<i class='fa fa-circle fa-stack-2x" + l + "' />" + o;
                    f = $(n).parent(".seen-by-ct")[0];
                    if (f) {
                        return $(f).find(".fa-stack").html(r);
                    }
                    $(n).wrap('<div class="seen-by-ct" />');
                    return $(n).after('<span class="fa-stack">' + r + "</span>");
                }
                return;
            };
        }(this));
    };
    Message.prototype._renderNotificationMuted = function() {
        return this.$(".mute-tag").toggleClass("muted", this.model.flow().get("team_notifications"));
    };
    Message.prototype._updateTagList = function(e) {
        var t, n, r, o, i, s, a, u, l;
        for (l = this.$("ul.tags").html(""), t = this.$("." + this.contentClass + " .tag, ." + this.contentClass + " .mention").filter(function(e, t) {
            return !$(t).parent().hasClass("emoji-reaction");
        }).addClass("removed"), a = [], r = 0, o = e.length; o > r; r++) {
            u = e[r];
            this.disableTagRendering || (s = $(_.filter(t, function(e) {
                return function(t) {
                    var n;
                    n = $(t).text().toLowerCase();
                    return u.humanize().toLowerCase() === n || e.model.flow().tags.dehumanize(n) === u.id;
                };
            }(this))), s.length > 0 ? s.removeClass("removed") : (i = (n = Models.Tag.userIdFor(u.id)) ? $('<a class="tag mention">').attr("data-user", n) : $('<a class="tag">').attr("href", Helpers.urlFor({
                flow: this.model.flow(),
                filter: new Models.Filter.All({
                    tags: [ u ]
                })
            })).attr("data-tag-search", u.id), a.push(l.append($("<li>").html(i.text(u))))));
        }
        return a;
    };
    Message.prototype.eyeTracking = function() {
        this.$el.scrollableInview("destroy");
        return _.defer(function(e) {
            return function() {
                return e.$el.scrollableInview({
                    onInview: e.onInview,
                    scrollParent: e.$el.closest("ul"),
                    fully: !0
                });
            };
        }(this));
    };
    Message.prototype.stopEyeTracking = function() {
        this.trigger("stopEyeTracking");
        return this.removeEyeTracking();
    };
    Message.prototype.removeEyeTracking = function() {
        return this.$el.scrollableInview("destroy");
    };
    Message.prototype.needsEyeTracking = function() {
        return this.isUnreadMention() || this.isUnreadMessage();
    };
    Message.prototype.onInview = function() {
        this.stopEyeTracking();
        if (this.isUnreadMention()) {
            return this._markTagAsRead();
        }
        if (this.isUnreadMessage()) {
            return this._markAsSeen();
        }
        return;
    };
    Message.prototype.isUnreadMessage = function() {
        var e, t;
        if (typeof (e = this.model).flow == "function" && (t = e.flow()) != null) {
            return t.unreadMessages.needsEyeTracking(this.model);
        }
        return;
    };
    Message.prototype.isUnreadMention = function() {
        return this.model.unread(Flowdock.app.user.id);
    };
    Message.prototype.render = function() {
        this.renderContent();
        this.renderTags();
        this.renderEmoji(this.$el);
        this.renderEmojiReactions();
        this.onThreadChange();
        this.$el.toggleClass("thread-starter", this.model.isThreadStarter());
        return this;
    };
    Message.prototype.renderEmoji = function(e) {
        if (e.emojie) {
            e.emojie()
        };
        if (this.model.flow().emoji != null) {
            this.model.flow().emoji.emojie(e[0])
        };
        return e;
    };
    Message.prototype.onEmojiReactionChange = function(e) {
        return this.preserveScrolling(function(e) {
            return function() {
                return e.renderEmojiReactions();
            };
        }(this));
    };
    Message.prototype.onTagChange = function(e) {
        return this.preserveScrolling(function(e) {
            return function() {
                e.renderTags();
                if (e.needsEyeTracking()) {
                    return e.eyeTracking();
                }
                return e.stopEyeTracking();
            };
        }(this));
    };
    Message.prototype.onContentChange = function() {
        return this.preserveScrolling(function(e) {
            return function() {
                return e.render();
            };
        }(this));
    };
    Message.prototype.onThreadChange = function() {};
    Message.prototype.checkUnread = function(e) {
        if (!this.model.flow().isPrivate() && _.include(e.remove, ":unread:" + Flowdock.app.user.id)) {
            this.$el.addClass("remove-unread");
            return setTimeout(function(e) {
                return function() {
                    return e.$el.removeClass("remove-unread");
                };
            }(this), 2e3);
        }
        return;
    };
    Message.prototype._markTagAsRead = function() {
        var e;
        this.model.markAsRead((e = this.model.flow()) != null ? e.me() : void 0);
        return this._markAsSeen();
    };
    Message.prototype._markAsSeen = function() {
        if (typeof this.windowFocusUnsubscribe == "function") {
            this.windowFocusUnsubscribe()
        };
        delete this.windowFocusUnsubscribe;
        return this.model.flow().unreadMessages.readMessage(this.model);
    };
    Message.prototype.preserveScrolling = function(e) {
        var t, n, r, o, i, s, a, u, l;
        s = this.$el.parents(".chat-message-list, .inbox-message-list, .single-view-content, .thread-content").first();
        if (a = s[0]) {
            o = function() {
                return (a != null ? a.scrollHeight : void 0) || 0;
            };
            l = function() {
                return (a != null ? a.scrollTop : void 0) || 0;
            };
            i = l();
            u = this.$el.position().top / this.$el.parent().height();
            t = a ? a.scrollHeight - a.scrollTop - s.height() <= 50 : !1;
            n = o();
            e();
            r = i - l();
            if (u < 0 || t && u < 1 && o() > n) {
                a.scrollTop += o() - n, r > 0 && (a.scrollTop += r)
            };
            if (o() !== n) {
                s.trigger("scroll")
            };
            return this;
        }
        return void e();
    };
    Message.prototype.openTagInput = function(e) {
        var t, n;
        e.preventDefault();
        e.stopPropagation();
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.tag_button_click);
        if (this.disableTagRendering) {
            return void 0;
        }
        t = $(e.target);
        if (this.cancelOpen) {
            return void (this.cancelOpen = !1);
        }
        t.one("mousedown", function(e) {
            return function(t) {
                if (e.tagInput) {
                    return e.cancelOpen = !0;
                }
                return;
            };
        }(this));
        n = this.tagInputTarget();
        n.addClass("open");
        t.addClass("active");
        this.tagInput = this.subview(this.newTagInput());
        n.append(this.tagInput.$el);
        this.tagInput.render();
        return this.listenTo(this.tagInput.tokenist, "tokenist-blur", function() {
            t.removeClass("active");
            this.removeSubview(this.tagInput);
            this.tagInput = void 0;
            return n.removeClass("open");
        });
    };
    Message.prototype.newTagInput = function() {
        if (this.disableTagRendering) {
            return void 0;
        }
        return new Views.Shared.TagInput({
            model: this.model
        });
    };
    Message.prototype.tagInputTarget = function() {
        return this.$el;
    };
    Message.prototype.toggleTagTooltip = function(e) {
        var t, n, r, i, s;
        e.preventDefault();
        if ($(e.target).hasClass("tether-enabled")) {
            return void 0;
        }
        r = e.target;
        if (r.getAttribute("data-group")) {
            n = "group";
            t = this.model.flow().groups.getByHandle(r.getAttribute("data-group").slice(2));
        } else n = r.getAttribute("data-tag-search").slice(1);
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.tag_tooltip_opened);
        i = new o({
            childPillsHTML: this._getChildPills(n, t),
            flow: this.model.flow(),
            toggleUserCard: function(e) {
                return function(t) {
                    return e.toggleUserCard(t, !0);
                };
            }(this),
            muteVerb: this.model.flow().get("team_notifications") ? "Mute" : "Unmute",
            tag: t && "@@" + t.get("handle") || r.textContent.toLowerCase(),
            tagType: n,
            target: r,
            onMute: this.toggleMuteWithRetry.bind(this),
            onClose: _.once(this.closeTagTooltip.bind(this))
        });
        this.subview(i);
        s = i.render().$el;
        $("body").append(s);
        this.renderTagBubbles(s);
        i.addTether(r);
        return i;
    };
    Message.prototype.closeTagTooltip = function(e) {
        return e.fadeOut(function(t) {
            return function() {
                return t.removeSubview(e);
            };
        }(this));
    };
    Message.prototype.toggleMuteWithRetry = function() {
        var e;
        e = this.model.flow();
        if (typeof e.saveWithRetry == "function") {
            return e.saveWithRetry({
                team_notifications: !e.get("team_notifications")
            }, {
                patch: !0
            });
        }
        return;
    };
    Message.prototype.destructor = function() {
        var e;
        if (this.deferredEyeTracking) {
            clearTimeout(this.deferredEyeTracking)
        };
        if (typeof this.windowFocusUnsubscribe == "function") {
            this.windowFocusUnsubscribe()
        };
        if ((e = this.usercard) != null) {
            e.destructor()
        };
        this.$el.scrollableInview("destroy");
        Message.__super__.destructor.apply(this, arguments);
        this.tagInput = null;
        this.truncatedContent = null;
        if (this.model != null) {
            this.stopListening(this.model, "unsent", this.onUnsent);
            return this.stopListening(this.model, "sync", this.onSent);
        }
        return;
    };
    Message.prototype.iconType = function() {
        var e;
        e = this.model.get("event");
        if (e === "action" || e === "line" || e === "message") {
            return "comment";
        }
        if (e === "status") {
            return "fa fa-quote-left";
        }
        return e;
    };
    Message.prototype.messageTimestamp = function() {
        var e;
        e = this.model.get("to") ? void 0 : this.timestampLink();
        return Helpers.TimeHelper.detailedTimestamp(this.model.get("sent"), {
            link: e
        });
    };
    Message.prototype.timestampLink = function(e) {
        if (e != null && typeof e.timestampLink == "function" && e.timestampLink()) {
            return {
                href: typeof e.timestampLink == "function" ? e.timestampLink() : void 0,
                target: "_blank",
                rel: "noopener noreferrer"
            };
        }
        if (this.model.flow().isFlow()) {
            return {
                href: Helpers.absoluteUrlFor({
                    flow: this.model.flow(),
                    message: this.model
                }),
                title: "Permalink",
                "data-thread": this.model.isThread() ? this.model.threadId() : void 0,
                "data-message": this.model.isThread() ? void 0 : this.model.threadId()
            };
        }
        return;
    };
    Message.prototype.onIdChange = function() {
        this.$("a.timestamp-link").attr("href", Helpers.absoluteUrlFor({
            flow: this.model.flow(),
            message: this.model
        }));
        return this.onThreadChange();
    };
    Message.prototype.toggleUserCard = function(e, t) {
        var n, r, o;
        r = $(e.currentTarget);
        if (r.hasClass("removed")) {
            return void 0;
        }
        if (r.hasClass("tether-enabled") || Flowdock.mobile) {
            return void ((n = this.usercard) != null && n.destructor());
        }
        if (o = this.model.flow().users.get(r.data("user"))) {
            this.usercard = new Views.Chat.UserCard({
                alwaysVisible: t,
                model: o,
                me: this.model.flow().me()
            });
            this.usercard.render();
            $("body").append(this.usercard.$el);
            return this.usercard.addTether(r);
        }
        return;
    };
    Message.prototype.openEditor = function() {
        var t;
        this.editor = this.subview(new Views.Shared.ExpandingInput());
        this.editor.render();
        this.editor.setText(remojimoji(this.model.getContent()));
        this.$(".content").html(this.editor.el);
        t = Helpers.renderTemplate(require("../../templates/messages/save_button.mustache"))();
        this.$(".edit-message").replaceWith(t);
        $(".tipsy").remove;
        this.editAutocompleter = this.subview(new Views.Shared.TextareaAutocompleter({
            model: this.model.flow()
        }));
        this.editAutocompleter.setElement(this.$(".content"), this.editor);
        this.editAutocompleter.render({
            repositioning: !0
        });
        _.defer(function(e) {
            return function() {
                if (e.editor) {
                    return e.editor.setCaretAtEnd();
                }
                return;
            };
        }(this));
        return this.$el.addClass("open");
    };
    Message.prototype.saveMessage = function(e, t) {
        var n, r;
        if (KeyEvent.is("esc")(e)) {
            this.$("textarea").val(this.model.getContent());
            this.render();
        } else {
            if (e.type === "keydown" && !Flowdock.app.preferences.shouldSendMessageWith(e)) {
                return;
            }
            e.type === "focusout" && t || (e.preventDefault(), r = s.replaceEmoji(this.$("textarea").val()), 
            r !== this.model.getContent() ? (n = this._findChangedTags(r), this.model.modifyTags(_.extend({
                sync: !1
            }, n)), this.model.updateContent(r, {
                silent: !0
            })) : this.render());
        }
        this.$el.removeClass("open");
        this.trigger("completed");
        this.removeSubview(this.editor);
        this.removeSubview(this.editAutocompleter);
        return this.editor = this.editAutocompleter = void 0;
    };
    Message.prototype.onEmojiReactionClicked = function(e) {
        var t, n, r, o;
        e.stopPropagation();
        n = $(e.target).closest(".emoji-reaction");
        n.tipsy("hide");
        t = n.data("emoji");
        o = this.model.get("emojiReactions")[t];
        r = o.filter(function(e) {
            return e === Flowdock.app.user.id.toString();
        }).length > 0;
        if (r) {
            Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.messages_remove_emoji_reaction, {
                emoji: t
            });
            return this.model.sync("emoji-reaction", this.model, {
                emojiReaction: {
                    emoji: t,
                    type: "remove"
                }
            });
        }
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.messages_add_emoji_reaction, {
            emoji: t
        });
        return this.model.sync("emoji-reaction", this.model, {
            emojiReaction: {
                emoji: t,
                type: "add"
            }
        });
    };
    Message.prototype.emojiReactionPicked = function(e) {
        return this.model.sync("emoji-reaction", this.model, {
            emojiReaction: {
                emoji: e,
                type: "add"
            }
        });
    };
    Message.prototype.openEmojiPicker = function(e) {
        this.toggleMenu("picker", e, ".emoji-picker-toggle", new r({
            custom: this.model.flow().emoji,
            onClose: function(e) {
                return function(t) {
                    e.toggleMenu("picker");
                    if (t) {
                        return e.emojiReactionPicked(t);
                    }
                    return;
                };
            }(this),
            parent: this.textarea,
            preferencesUrl: this.model.flow().isFlow() ? "/organizations/" + this.model.flow().organization() + "/emoji" : "/account"
        }));
        return !1;
    };
    Message.prototype.toggleMenu = function(e, t, n, r) {
        if (this[e]) {
            return void this[e].close();
        }
        this[e] = r;
        this.$el.find(n).addClass("message-building-button-active");
        this.subview(r);
        r.once("destructor", function(t) {
            return function() {
                t.$el.find(n).removeClass("message-building-button-active");
                t.removeSubview(r);
                return t[e] = void 0;
            };
        }(this));
        $("body").append(this[e].render().$el);
        return r.addTether(t.target);
    };
    Message.prototype.rethreadMessage = function() {
        var e;
        if (e = this.model.collection.threadBeforeMessage(this.model).get("thread_id")) {
            return this.model.rethread(e, Flowdock.ANALYTICS_EVENT_TYPES.rethread_button);
        }
        return;
    };
    Message.prototype.truncateWrap = function(e) {
        var t, n;
        if (this.truncatedContent) {
            this.removeSubview(this.truncatedContent, {
                removeDomElement: !1
            })
        };
        n = (t = this.truncatedContent) != null ? t.truncated : void 0;
        return this.truncatedContent = this.subview(new i({
            el: this.$(e),
            truncated: n
        })).render();
    };
    Message.prototype["delete"] = function(e) {
        e.stopPropagation();
        if (Helpers.confirmDelete()) {
            this.$el.hide();
            return this.model.destroy({
                wait: !0
            }).fail(function(e) {
                return function() {
                    _.defer(function() {
                        return alert("Failed to delete the message. Please try again.");
                    });
                    return e.$el.show().addClass("delete-failed").one(Helpers.animationend(), function() {
                        return e.$el.removeClass("delete-failed");
                    });
                };
            }(this));
        }
        return;
    };
    Message.prototype._findChangedTags = function(e) {
        var t, n, r, o;
        t = this.model.getContent();
        r = this.model.get("tags");
        n = Helpers.TagHelper.parseTags(t, this.model.flow());
        o = Helpers.TagHelper.parseTags(e, this.model.flow());
        return {
            add: _.difference(o, n, r),
            remove: _.intersection(_.difference(n, o), r)
        };
    };
    return Message;
}(Flowdock.HierarchicalView);
