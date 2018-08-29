var r, o, i, s, a, u, l, c, p, d = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (h.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, h = {}.hasOwnProperty, f = [].indexOf || function(e) {
    for (var t = 0, n = this.length; n > t; t++) {
        if (t in this && this[t] === e) {
            return t;
        }
    }
    return -1;
};

r = "🍺";

o = "🍻";

a = "LZAo1TdBWynoA";

u = "https://api.giphy.com/v1/gifs/random";

l = "http://memegen.link";

s = require("./everyone_warning.coffee");

p = require("lib/markdown");

i = require("../shared/emoji_picker.coffee");

c = require("../shared/slash_commands.coffee");

Views.Shared.MessageInput = function(t) {
    function MessageInput() {
        return MessageInput.__super__.constructor.apply(this, arguments);
    }
    d(MessageInput, t);
    MessageInput.prototype.className = "message-form";
    MessageInput.prototype.disabledCommands = [];
    MessageInput.prototype.events = {
        "click .send-button": "sendMessage",
        "click .upload-button-web": "triggerUpload",
        "click .upload-button": "triggerUpload",
        "click .emoji-picker-toggle": "toggleEmojiPicker",
        "click .slash-commands-toggle": "toggleSlashCommands"
    };
    MessageInput.prototype.tagName = "form";
    MessageInput.prototype.template = require("../../templates/shared/message_input.mustache");
    MessageInput.prototype.slashCommands = [ {
        command: [ "query", "q", "msg" ],
        message: !1,
        showInSlashCommandMenu: {
            description: "Start a 1-to-1 conversation",
            nameHelper: "@username",
            onlyShowCommand: "query"
        },
        validateParams: function(e) {
            return e.match(/\w+/);
        },
        action: function(e) {
            return !!this.openPrivate(e.replace(/@/, ""));
        }
    }, {
        command: "hangout",
        message: !1,
        validateParams: function() {
            return !0;
        },
        action: function() {
            this.openHangout();
            return !0;
        }
    }, {
        command: "room",
        message: !1,
        validateParams: function() {
            return !0;
        },
        action: function() {
            this.openRoom();
            return !0;
        }
    }, {
        command: "appear",
        message: !1,
        showInSlashCommandMenu: {
            description: "Start a video call, with room name optionally defined",
            nameHelper: "[room name]"
        },
        validateParams: function() {
            return !0;
        },
        action: function(e) {
            return this.openAppear(e);
        }
    }, {
        command: "hero",
        message: !1,
        validateParams: function() {
            return !0;
        },
        action: function(e) {
            return this.openScreenhero(e);
        }
    }, {
        command: [ "status", "away" ],
        message: !0,
        showInSlashCommandMenu: {
            description: "Set status or clear with blank message",
            nameHelper: "[message]"
        },
        validateParams: function() {
            return !0;
        },
        action: function(e) {
            return {
                content: e || "",
                event: "status"
            };
        },
        isDisabled: function() {
            return this.flow().isPrivate();
        }
    }, {
        command: "me",
        message: !0,
        showInSlashCommandMenu: {
            description: "Send an action message",
            nameHelper: "message"
        },
        validateParams: function(e) {
            return e.match(/[^\s]+/);
        },
        action: function(e) {
            return {
                event: "line",
                content: e
            };
        }
    }, {
        command: "slap",
        message: !0,
        showInSlashCommandMenu: {
            description: "Slap with a fish",
            nameHelper: "@username"
        },
        validateParams: function(e) {
            return e.match(/\w+/);
        },
        action: function(e) {
            var t;
            t = $.trim(e);
            return {
                event: "line",
                content: "slaps " + t + " around a bit with a large trout"
            };
        }
    }, {
        command: [ "help", "?" ],
        message: !1,
        showInSlashCommandMenu: {
            description: "Command help"
        },
        validateParams: function() {
            return !0;
        },
        action: function() {
            this.showSlashCommandHelp();
            return !0;
        }
    }, {
        command: "",
        message: !0,
        validateParams: function() {
            return !0;
        },
        action: function(e) {
            return {
                event: "message",
                content: e
            };
        }
    }, {
        command: "beers",
        message: !0,
        validateParams: function(e) {
            return parseInt(e, 10) > 0;
        },
        action: function(e) {
            return {
                event: "message",
                content: Array(parseInt(e, 10) + 1).join(r)
            };
        }
    }, {
        command: "doublebeers",
        message: !0,
        validateParams: function(e) {
            return parseInt(e, 10) > 0;
        },
        action: function(e) {
            return {
                event: "message",
                content: Array(parseInt(e, 10) + 1).join(o)
            };
        }
    }, {
        command: "spin",
        message: !1,
        validateParams: function() {
            return !0;
        },
        action: function() {
            var e, t;
            e = [ "img", "svg", "i", 'div[style*="background-image"]', ".emojie" ];
            t = function(e, t) {
                return $(e).css({
                    transform: t
                });
            };
            if (Flowdock.app.spin) {
                clearInterval(Flowdock.app.spin.id);
                e.map(function(e) {
                    return t(e, "");
                });
                Flowdock.app.spin = null;
            } else {
                Flowdock.app.spin = {
                    deg: 0
                };
                Flowdock.app.spin.id = setInterval(function() {
                    Flowdock.app.spin.deg += 1;
                    return e.map(function(e) {
                        return t(e, "rotate(" + Flowdock.app.spin.deg + "deg)");
                    });
                }, 25);
            }
            return !0;
        }
    }, {
        command: "pack",
        message: !0,
        validateParams: function(e) {
            var t;
            return (t = parseInt(e, 10)) === 6 || t === 12 || t === 18 || t === 24;
        },
        action: function(e) {
            var t, n, o, i, s, a;
            t = parseInt(e, 10);
            i = function() {
                switch (t) {
                  case 6:
                    return [ 2, 3 ];

                  case 12:
                    return [ 2, 6 ];

                  case 18:
                    return [ 3, 6 ];

                  case 24:
                    return [ 4, 6 ];
                }
            }();
            a = i[0];
            n = i[1];
            s = Array(n + 1).join(r);
            return {
                event: "message",
                content: function() {
                    var e, t, n;
                    for (n = [], o = e = 0, t = a; t >= 0 ? t > e : e > t; o = t >= 0 ? ++e : --e) {
                        n.push(s);
                    }
                    return n;
                }().join("\n")
            };
        }
    }, {
        command: "capslock",
        message: !1,
        validateParams: function(e) {
            return !0;
        },
        action: function() {
            var e, t;
            t = function() {
                return 0 !== $("style#capslock").length;
            };
            if (t()) {
                return $("#capslock").remove();
            }
            e = "<style id='capslock'>* {text-transform: uppercase !important}</style>";
            return $("head").append(e);
        }
    }, {
        command: "giphy",
        message: !0,
        showInSlashCommandMenu: {
            description: "Show animated image from Giphy",
            nameHelper: "[search terms]"
        },
        validateParams: function() {
            return !0;
        },
        promise: function(e) {
            return $.ajax({
                url: u + "?tag=" + this.encodeForGiphy(e) + "&api_key=" + a + "&fmt=json&rating=pg-13",
                method: "get",
                headers: null
            });
        },
        action: function(e, t) {
            return {
                event: "message",
                content: this.showGiphyCommand(e, t)
            };
        }
    }, {
        command: "meme",
        message: !0,
        showInSlashCommandMenu: {
            description: "Generate memes from Flowdock"
        },
        validateParams: function() {
            return !0;
        },
        action: function(e) {
            var t, n;
            n = _.compact(e.split("/"));
            t = "";
            if (n.length === 0 || n[0].trim() === "help") {
                this.showMemeHelp();
            } else if (n[0].trim() === "templates") {
                this.showMemeTemplates();
            } else t = this.buildMemeUri(n);
            return {
                event: "message",
                content: t
            };
        }
    } ];
    MessageInput.prototype.encodeForGiphy = function(e) {
        return encodeURIComponent(e.trim()).replace(/%20/g, "+");
    };
    MessageInput.prototype.escapeForMeme = function(e) {
        return encodeURIComponent(e.trim()).replace(/-/g, "--").replace(/_/g, "__").replace(/%20/g, "-");
    };
    MessageInput.prototype.buildMemeUri = function(e) {
        var t;
        t = l + "/" + this.escapeForMeme(e[0]);
        if (e.length > 1) {
            t += "/" + this.escapeForMeme(e[1])
        };
        if (e.length > 2) {
            t += "/" + this.escapeForMeme(e[2])
        };
        return t + ".jpg";
    };
    MessageInput.prototype.initialize = function(e) {
        this.fileupload = e.fileUpload != null;
        this.placeholder || (this.placeholder = e.placeholder);
        this.textarea = this.subview(new Views.Shared.ExpandingInput({
            autofocus: this.autofocus,
            persistId: this.key(),
            placeholder: this.placeholder
        }));
        this.autocompleter = this.subview(new Views.Shared.TextareaAutocompleter({
            model: this.flow()
        }));
        this.bindKeyboardEvents();
        this.listenTo(this.textarea, "focusin focusout", this.toggleFocus);
        this.listenTo(this.textarea, "input", this.onInput);
        return this.listenTo(this.textarea, "keydown", this.onKeydown);
    };
    MessageInput.prototype.destructor = function() {
        MessageInput.__super__.destructor.apply(this, arguments);
        return this.fileupload = this.textarea = this.autocompleter = null;
    };
    MessageInput.prototype.onAfterRender = function() {
        this.textarea.setElement(this.$(".expanding-input"));
        this.autocompleter.setElement(this.$(".textarea-autocompleter-area"), this.textarea);
        this.textarea.render();
        this.autocompleter.render();
        return this.toggleValueRelatedClasses();
    };
    MessageInput.prototype.onAttach = function() {
        return _.defer(function(e) {
            return function() {
                var t, n, r, o;
                if (e.model != null) {
                    e.textarea.setMaxHeight();
                    Flowdock.mobile || ((t = Flowdock.app.manager) != null && (n = t.currentView) != null && (r = n.toolbar) != null && (o = r.search) != null ? o.focused() : void 0) || e.focus();
                    return e.unsubscribeResize = Flowdock.resize.window.end.onValue(e.setMaxHeight);
                }
            };
        }(this));
    };
    MessageInput.prototype.onDetach = function() {
        if (typeof this.unsubscribeResize == "function") {
            this.unsubscribeResize()
        };
        return delete this.unsubscribeResize;
    };
    MessageInput.prototype.jumpThreadUp = function() {
        return this.$el.trigger("jump-thread:up");
    };
    MessageInput.prototype.jumpThreadDown = function() {
        return this.$el.trigger("jump-thread:down");
    };
    MessageInput.prototype.openHangout = function() {
        return this.openExternalCall("hangouts", "Google Hangout");
    };
    MessageInput.prototype.openRoom = function() {
        return this.openExternalCall("room", "Room video call");
    };
    MessageInput.prototype.openAppear = function(e) {
        var t;
        t = e.split(/\s+/)[0];
        if (t) {
            return this.openExternalCall("appear", "Appear.in video call", {
                roomName: "/" + t
            });
        }
        return this.openExternalCall("appear", "Appear.in video call");
    };
    MessageInput.prototype.openExternalCall = function(e, t, n) {
        if (n == null) {
            n = {}
        };
        n.authenticity_token = Helpers.csrfToken();
        n[this.model.isFlow() ? "flow" : "private"] = this.model.id;
        return $.ajax({
            url: "/" + e + "/new",
            type: "post",
            dataType: "json",
            data: n,
            error: function(e, n, r) {
                return alert("Unable to create a " + t + ": " + r);
            },
            success: function(n, r, o) {
                if ((n != null ? n.url : void 0) != null) {
                    return Helpers.openNewWindowAt(n.url);
                }
                if ("room" !== e) {
                    return alert("Unable to create a " + t + ".");
                }
                return;
            }
        });
    };
    MessageInput.prototype.openPrivate = function(e) {
        var t;
        if (t = this.findUser(e)) {
            if (t.id === Flowdock.app.user.id) {
                return this.unableToTargetSelf();
            }
            Flowdock.app.router.navigateToPrivate(t.id);
            return !0;
        }
        return this.userNotFound(e);
    };
    MessageInput.prototype.openScreenhero = function(e) {
        var t, n, r, o, i;
        r = e.split(/\s+/);
        i = r[0] === "voice";
        if (typeof (t = this.model).isPrivate == "function" && t.isPrivate()) {
            o = this.model.otherParty();
        } else {
            if (r.length > 1 && i) {
                n = r[1].replace(/@/, "");
            } else {
                if (!(r.length > 0 && r[0])) {
                    this.showScreenheroHelp();
                    return !0;
                }
                n = r[0].replace(/@/, "");
            }
            o = this.findUser(n);
        }
        if (o) {
            if (o.id === Flowdock.app.user.id) {
                return this.unableToTargetSelf();
            }
            return this.openScreenheroWith(o, i);
        }
        return this.userNotFound(n);
    };
    MessageInput.prototype.openScreenheroWith = function(e, t) {
        var n;
        if (t == null) {
            t = !1
        };
        n = new Views.Navigation.Screenhero({
            model: Flowdock.app.manager.currentFlow,
            removeOnHide: !0,
            target: $("body"),
            user: e,
            useVoice: t
        });
        n.attach();
        return !0;
    };
    MessageInput.prototype.showScreenheroHelp = function() {
        return alert("Share your screen or make a voice call using Screenhero. Requires a Screenhero account and the Screenhero application.\n\nUsage:\n/hero @username\n/hero voice @username");
    };
    MessageInput.prototype.showMemeHelp = function() {
        var e;
        e = new Views.MemeCommands({
            target: $("body")
        }).attach();
        return e.once("close", this.focus, this);
    };
    MessageInput.prototype.showMemeTemplates = function() {
        var e;
        e = new Views.MemeTemplates({
            target: $("body")
        }).attach();
        return e.once("close", this.focus, this);
    };
    MessageInput.prototype.findUser = function(e) {
        return Flowdock.app.users.find(function(t) {
            return t.get("nick").toLowerCase() === e.toLowerCase().trim() && !t.get("disabled");
        });
    };
    MessageInput.prototype.focus = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        return this.textarea.focus();
    };
    MessageInput.prototype.focused = function() {
        return this.textarea.focused();
    };
    MessageInput.prototype.matchCommand = function(e) {
        var t, n, r, o;
        for (o = this.slashCommands, n = 0, r = o.length; r > n; n++) {
            t = o[n];
            if (_.flatten([ t.command ]).indexOf(e) >= 0) {
                return t;
            }
        }
    };
    MessageInput.prototype.invalidCommand = function(e, t, n) {
        var r, o;
        o = _.once(function(e) {
            return function(t) {
                e.$("textarea").off("keypress focus", o);
                if (t.type === "keypress") {
                    return t.preventDefault();
                }
                return;
            };
        }(this));
        this.$("textarea").on("keypress focus", o);
        r = n ? "/" + e + " requires a valid parameter." : "/" + e + " is not a recognized /command.";
        return alert(r + "\n\n" + ("If you want to start a chat message with /" + e + ", use ") + (' "/ /' + e + '". To see all available commands, type /help.'));
    };
    MessageInput.prototype.showSlashCommandHelp = function() {
        var e;
        e = new Views.SlashCommands({
            target: $("body")
        }).attach();
        return e.once("close", this.focus, this);
    };
    MessageInput.prototype.isSlashCommand = function(e) {
        return e.indexOf("/") === 0;
    };
    MessageInput.prototype.isDisabledCommand = function(e) {
        var t;
        if (e == null) {
            return !1;
        }
        t = _.isArray(e.command) ? e.command[0] : e.command;
        return f.call(this.disabledCommands, t) >= 0 || e.isDisabled && e.isDisabled.call(this);
    };
    MessageInput.prototype.triggerUpload = function(e) {
        e.preventDefault();
        return this.trigger("upload");
    };
    MessageInput.prototype.editLastMessage = function(e) {
        return this.trigger("edit-last-message");
    };
    MessageInput.prototype.userNotFound = function(e) {
        _.defer(function() {
            return alert(e + " - no such user found.");
        });
        return !1;
    };
    MessageInput.prototype.unableToTargetSelf = function() {
        _.defer(function() {
            return alert("Can't start a session with yourself");
        });
        return !1;
    };
    MessageInput.prototype.value = function() {
        return this.textarea.value();
    };
    MessageInput.prototype.parse = function(e) {
        var t;
        t = e.event || "message";
        if (e.content != null) {
            e = e.content
        };
        return {
            event: t,
            content: p.replaceEmoji(e),
            tags: this.parseTags(e)
        };
    };
    MessageInput.prototype.parseTags = function(e) {
        return Helpers.TagHelper.parseTags(e, _.result(this, "flow"));
    };
    MessageInput.prototype.getCommand = function(e) {
        return e.toLowerCase().match(/^\/([^\s]*)/)[1];
    };
    MessageInput.prototype.commandNotAvailable = function(e) {
        return _.defer(function() {
            return alert("The " + e + " command cannot be used here.\nTry using it in your flow's chat.");
        });
    };
    MessageInput.prototype.sendMessage = function(e) {
        var t, n, r, o, i, s, a, u, l, c;
        if (e != null) {
            e.preventDefault()
        };
        u = this.value();
        i = u.replace(/^\s+/g, "");
        if (this.isSlashCommand(i)) {
            this.sendSlashCommand(i);
        } else if (n = u.match(/^s\/([^\/]+)\/([^\/]*)/)) {
            this.trigger("edit-last-message", n[1], n[2]);
            this.textarea.reset();
            this.focus();
        } else if (this.parseTags(u).indexOf(Models.Tag.userTagFor("everyone")) >= 0) {
            r = this.flow();
            c = r.users.available().length - 1;
            if (c >= 10 && !this.everyoneWarning) {
                o = this;
                a = p.tags(p.parse(u));
                l = function() {
                    var e, t, n;
                    for (n = [], e = 0, t = a.length; t > e; e++) {
                        s = a[e];
                        if (f.call(Collections.Tags.everyoneTags, s) >= 0) {
                            n.push(s)
                        };
                    }
                    return n;
                }()[0];
                this.showEveryoneWarning(r.get("name"), c, l);
                t = function() {
                    return o.textarea.$("textarea").one("keydown", function(e) {
                        if (KeyEvent.is("enter", "esc")(e)) {
                            e.preventDefault()
                        };
                        e.stopImmediatePropagation();
                        o.removeEveryoneWarning();
                        if (KeyEvent.is("enter")(e)) {
                            return o.createMessage(o.parse(u));
                        }
                        return;
                    });
                };
                if (e.type === "keydown") {
                    o.textarea.$("textarea").one("keyup", function() {
                        return setTimeout(t, 150);
                    });
                } else t();
            } else if (c < 10) {
                this.createMessage(this.parse(u))
            };
            this.focus();
        } else this.createMessage(this.parse(u));
        return this.toggleValueRelatedClasses();
    };
    MessageInput.prototype.showEveryoneWarning = function(e, t, n) {
        var r, o;
        r = function(e) {
            return function(t) {
                var n;
                n = jQuery.Event("keydown", {
                    which: t
                });
                return e.textarea.$("textarea").trigger(n);
            };
        }(this);
        o = new s({
            flowName: e,
            userCount: t,
            usedTag: n,
            onConfirm: function() {
                return r(13);
            },
            onCancel: function() {
                return r(27);
            }
        });
        this.everyoneWarning = this.subview(o);
        return this.$el.append(this.everyoneWarning.render().$el);
    };
    MessageInput.prototype.removeEveryoneWarning = function() {
        return this.everyoneWarning.fadeOut(function(e) {
            return function() {
                e.removeSubview(e.everyoneWarning);
                return e.everyoneWarning = null;
            };
        }(this));
    };
    MessageInput.prototype.toggleEmojiPicker = function(e) {
        return this.toggleMenu(e, "picker", ".emoji-picker-toggle", new i({
            custom: this.flow().emoji,
            parent: this.textarea,
            preferencesUrl: this.flow().isFlow() ? "/organizations/" + this.flow().organization() + "/emoji" : "/account"
        }));
    };
    MessageInput.prototype.toggleSlashCommands = function(e) {
        this.slashMenu || Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.input_slash_opened);
        return this.toggleMenu(e, "slashMenu", ".slash-commands-toggle", new c({
            parent: this.textarea,
            slashCommands: this.slashCommands.filter(function(e) {
                return function(t) {
                    return !e.isDisabledCommand(t);
                };
            }(this))
        }));
    };
    MessageInput.prototype.toggleMenu = function(e, t, n, r) {
        if (this[t]) {
            return void this[t].close();
        }
        this[t] = r;
        this.$el.find(n).addClass("message-building-button-active");
        this.subview(r);
        r.once("destructor", function(e) {
            return function() {
                e.$el.find(n).removeClass("message-building-button-active");
                e.removeSubview(r);
                return e[t] = void 0;
            };
        }(this));
        $("body").append(this[t].render().$el);
        return r.addTether(e.target);
    };
    MessageInput.prototype.sendSlashCommand = function(e) {
        var t, n, r, o, i, s;
        t = this.getCommand(e);
        r = e.substring(("/" + t + " ").length);
        s = this.matchCommand(t);
        if (s == null && t.split("/").length >= 2) {
            return this.createMessage(this.parse(e));
        }
        if (this.isDisabledCommand(s)) {
            this.commandNotAvailable(t);
            return !1;
        }
        if (s != null && s.validateParams.call(this, r)) {
            if (s.message) {
                if (o = s != null && (i = s.promise) != null ? i.call(this, r) : void 0) {
                    return o.then(function(e) {
                        return function(t) {
                            return e.createMessage(e.parse(s.action.call(e, t, r)));
                        };
                    }(this));
                }
                if (n = s.action.call(this, r)) {
                    if ("" !== n) {
                        return this.createMessage(this.parse(n));
                    }
                    this.textarea.reset();
                    return this.focus();
                }
                return this.commandNotAvailable(t);
            }
            if (s.action.call(this, r)) {
                this.textarea.reset();
                return this.focus();
            }
            return;
        }
        this.invalidCommand(t, r, s != null);
        return !1;
    };
    MessageInput.prototype.onKeydown = function(e) {
        if (KeyEvent.is("enter")(e) && $.trim(this.value()).length === 0) {
            e.preventDefault();
            return e.stopImmediatePropagation();
        }
        if (Flowdock.app.preferences.shouldSendMessageWith(e)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return this.sendMessage(e);
        }
        if (KeyEvent.is("shift+up")(e) && this.inputIsEmpty()) {
            return this.jumpThreadUp();
        }
        if (KeyEvent.is("shift+down")(e) && this.inputIsEmpty()) {
            return this.jumpThreadDown();
        }
        if (KeyEvent.is("up")(e) && this.inputIsEmpty()) {
            return this.editLastMessage(e);
        }
        if (KeyEvent.is("esc")(e)) {
            return this.textarea.$("textarea").blur();
        }
        return;
    };
    MessageInput.prototype.onInput = function() {
        return this.toggleValueRelatedClasses();
    };
    MessageInput.prototype.serializeData = function() {
        return _.extend({}, MessageInput.__super__.serializeData.call(this), {
            mobile: Flowdock.mobile
        });
    };
    MessageInput.prototype.toggleValueRelatedClasses = function() {
        return this.$el.toggleClass("typing", !this.inputIsEmpty());
    };
    MessageInput.prototype.inputIsEmpty = function() {
        return this.textarea.textarea.val() === "";
    };
    MessageInput.prototype.toggleFocus = function(e) {
        return this.$el.toggleClass("focused", e.type === "focusin");
    };
    MessageInput.prototype.showGiphyCommand = function(e, t) {
        var n, r;
        n = [ "/giphy", t ].join(" ").trim();
        if (e != null && (r = e.data) != null && r.image_url) {
            return "_" + n + "_ " + e.data.image_url;
        }
        return "Sorry, we couldn't find any images to match: " + t;
    };
    return MessageInput;
}(Flowdock.ItemView);

_.extend(Views.Shared.MessageInput.prototype, Flowdock.KeyboardEvents);
