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

r = require("textarea-caret-position");

Views.Shared.TextareaAutocompleter = function(t) {
    function TextareaAutocompleter() {
        this.displayCustomEmojiLink = o(this.displayCustomEmojiLink, this);
        this.displayHtmlFor = o(this.displayHtmlFor, this);
        this.reposition = o(this.reposition, this);
        this.populate = o(this.populate, this);
        return TextareaAutocompleter.__super__.constructor.apply(this, arguments);
    }
    i(TextareaAutocompleter, t);
    TextareaAutocompleter.prototype.className = "textarea-autocompleter-area";
    TextareaAutocompleter.prototype.initialize = function(e) {
        this.inputView = e.inputView || null;
        return this.duplicateNicksIndex = {};
    };
    TextareaAutocompleter.prototype.destructor = function() {
        this.inputView = this["null"];
        return TextareaAutocompleter.__super__.destructor.apply(this, arguments);
    };
    TextareaAutocompleter.prototype.render = function(e) {
        var t;
        if (e == null) {
            e = {}
        };
        this.inputView.getInput().autoComplete({
            source: this.populate,
            displayHtml: this.displayHtmlFor,
            autoSelect: this.autoSelect,
            el: this.$el,
            completionHook: this.onComplete,
            emptyHook: this.displayCustomEmojiLink,
            hiddenComplete: true,
            excludeHidden: [ (t = Flowdock.app.user) != null ? t.get("nick") : undefined ],
            sort: function(e) {
                return function(e, t) {
                    e = e.toLowerCase();
                    t = t.toLowerCase();
                    if (t > e) {
                        return -1;
                    }
                    if (e > t) {
                        return 1;
                    }
                    return 0;
                };
            }(this),
            hiddenCompleteLimiter: [ "#", "@", ":" ],
            reverse: true
        });
        if (e.repositioning) {
            this.$el.on("selector-open", this.reposition)
        };
        return this;
    };
    TextareaAutocompleter.prototype.setElement = function(e, t) {
        TextareaAutocompleter.__super__.setElement.call(this, e);
        return this.inputView = t;
    };
    TextareaAutocompleter.prototype.populate = function() {
        var e, t, n, r, o, i, s, a;
        s = [];
        o = [];
        r = [];
        if (this.model.isFlow()) {
            s = this.model.tags.models.sort(function(e, t) {
                return t.get("count") - e.get("count");
            }), s = s.concat([ this.model.tags.everyone(), this.model.tags.team() ]), s = s.map(function(e) {
                return {
                    word: e.humanize()
                };
            }), n = this.model.users.enabled(), o = function() {
                var e, t, r;
                for (r = [], e = 0, t = n.length; t > e; e++) {
                    a = n[e];
                    if (a.get("nick")) {
                        r.push({
                            word: "@" + a.get("nick"),
                            aliases: [ "@" + a.get("name"), a.get("nick") ]
                        })
                    };
                }
                return r;
            }(), r = this.model.groups.handles().map(function(e) {
                return {
                    word: "@@" + e
                };
            })
        };
        if ((i = window.emojimoji) != null) {
            t = i.autocomplete;
        } else {
            t = undefined;
        }
        if (this.model.emojiKeys) {
            t = t.concat(this.model.emojiKeys())
        };
        t = function() {
            var n, r, o;
            for (o = [], n = 0, r = t.length; r > n; n++) {
                e = t[n];
                o.push({
                    word: e
                });
            }
            return o;
        }();
        return s.concat(o, t, r);
    };
    TextareaAutocompleter.prototype._getCaretWordBoundary = function() {
        var e, t;
        t = this.inputView.textarea[0].value.substr(0, this.inputView.textarea[0].selectionStart);
        e = t.lastIndexOf(" ");
        if (t.lastIndexOf("\n") > e) {
            e = t.lastIndexOf("\n")
        };
        return r(this.inputView.textarea[0], e + 1);
    };
    TextareaAutocompleter.prototype.reposition = function(e) {
        var t, n, r;
        n = this._getCaretWordBoundary();
        $(e.target).css({
            top: n.top + 20,
            left: n.left,
            bottom: "auto",
            right: "auto"
        });
        r = this.$el.closest("ul")[0].getBoundingClientRect();
        t = $(e.target)[0].getBoundingClientRect();
        if (t.right > r.right) {
            $(e.target).css({
                left: "auto",
                right: 10
            })
        };
        if (t.bottom > r.bottom) {
            return $(e.target).css({
                top: "auto",
                bottom: this.inputView.textarea.height() - n.top + 10
            });
        }
        return;
    };
    TextareaAutocompleter.prototype.onComplete = function(e, t) {
        if (t === 0 && "#" !== e[0] && ":" !== e[0] || t === 1 && this.input.text()[0] === "@") {
            return e + ", ";
        }
        return e + " ";
    };
    TextareaAutocompleter.prototype.displayHtmlFor = function(t) {
        var n, r, o, i, s, a, u, l;
        if (t.indexOf("#") === 0) {
            u = this.model.tags.find(function(e) {
                return e.id === t.slice(1);
            });
            n = u.get("count");
        } else {
            if (t[0] === "@" && "@" !== t[1]) {
                s = t.slice(1);
                l = this.model.users.where({
                    nick: s,
                    disabled: false
                });
                if (l.length === 1) {
                    u = t + " (" + l[0].get("name") + ")";
                } else {
                    if (l.length > 1) {
                        if (this.duplicateNicksIndex[s] === undefined) {
                            this.duplicateNicksIndex[s] = 0
                        };
                        u = t + " (" + l[this.duplicateNicksIndex[s]].get("name") + ")";
                        this.duplicateNicksIndex[s] = (this.duplicateNicksIndex[s] + 1) % l.length;
                    } else {
                        if (~"@team".indexOf(t)) {
                            u = "@team";
                            a = this.model.users.notifiableByTeam().length;
                            if (this.model.get("team_notifications") === true) {
                                a--
                            };
                            r = "" + a + (a ? " of " + (this.model.users.available().length - 1) : "") + " people";
                        } else {
                            u = "@everyone";
                            a = this.model.users.available().length - 1;
                            r = a + " " + (a === 1 ? "person" : "people");
                        }
                        n = r + " will be notified";
                    }
                }
            } else {
                u = t;
            }
        }
        i = $(Helpers.renderTemplate(require("../../templates/inbox/autocompleter_option.mustache"))({
            tag: u,
            count: n
        }));
        if (t.indexOf(":") === 0) {
            o = $("<span>").addClass("tokenist-emoji").text(emojimoji(t)), this.model.emoji != null && this.model.emoji.emojie(o[0]), 
            typeof o.emojie == "function" && o.emojie(), i.prepend(o)
        };
        return i;
    };
    TextareaAutocompleter.prototype.displayCustomEmojiLink = function(e) {
        var t;
        if (this.model.organization) {
            if (e && /^\:[a-zA-Z0-9_\-]+$/.test(e)) {
                t = "/organizations/" + this.model.organization() + "/emoji";
                return $("<li>").addClass("autocomplete-info").html("Didn't find the emoji you were looking for? ").append($("<a>").attr("href", t).html("Upload your own."));
            }
            return;
        }
    };
    TextareaAutocompleter.prototype.autoSelect = function(e) {
        return 0 !== e.indexOf(":");
    };
    return TextareaAutocompleter;
}(Flowdock.HierarchicalView);
