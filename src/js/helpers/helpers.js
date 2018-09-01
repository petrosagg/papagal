var r, o, i, s = [].slice;

o = require("diacritics").remove;

i = {
    editSVGIcon: require("../templates/icons/edit.mustache"),
    emojiReactionSymbolSVGIcon: require("../templates/icons/emoji_reaction_symbol.mustache"),
    deleteSVGIcon: require("../templates/icons/delete.mustache"),
    shareSVGIcon: require("../templates/icons/share.mustache"),
    rethreadSVGIcon: require("../templates/icons/rethread.mustache"),
    editTagsSVGIcon: require("../templates/icons/edit_tags.mustache"),
    checkSVGIcon: require("../templates/icons/check.mustache"),
    paperclipSVGIcon: require("../templates/icons/paperclip.mustache"),
    slashSVGIcon: require("../templates/icons/slash.mustache"),
    userSVGIcon: require("../templates/icons/user.mustache")
};

_.extend(Helpers, {
    format: {
        number: function(e, t) {
            var n, r;
            if (t == null) {
                t = 2
            };
            n = function(e) {
                var n, r, o, i;
                for (i = e.split("."), r = i[0], t = i.length >= 2 ? s.call(i, 1) : [], t = function() {
                    var e, r, o;
                    for (o = [], e = 0, r = t.length; r > e; e++) {
                        n = t[e];
                        o.push("." + n);
                    }
                    return o;
                }().join(), o = /(\d+)(\d{3})/; o.test(r); ) {
                    r = r.replace(o, "$1,$2");
                }
                return "" + r + t;
            };
            r = Math.pow(10, t);
            return n(String(Math.round(e * r) / r));
        },
        pad: function(e, t, n) {
            var r;
            if (n == null) {
                n = "0"
            };
            r = String(e);
            if (r.length < t) {
                return Helpers.format.pad(n + r, t, n);
            }
            return r;
        },
        bytes: function(e) {
            if (e >= 1e3 * Math.pow(2, 20)) {
                return Helpers.format.number(e / Math.pow(2, 30)) + " GB";
            }
            if (e >= 1e3 * Math.pow(2, 10)) {
                return Helpers.format.number(e / Math.pow(2, 20)) + " MB";
            }
            return Helpers.format.number(e / Math.pow(2, 10)) + " kB";
        },
        duration: function(e) {
            var t;
            t = Math.floor(e / 60);
            e = Helpers.format.pad(e % 60, 2);
            return t + ":" + e;
        }
    },
    animationend: function() {
        var e;
        e = {
            WebkitAnimation: "webkitAnimationEnd",
            MozAnimation: "animationend",
            MsAnimation: "MSAnimationEnd",
            OAnimation: "oAnimationEnd",
            animation: "animationend"
        };
        return e[Modernizr.prefixed("animation")];
    },
    transitionend: function() {
        var e;
        e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            MsTransition: "MSTransitionEnd",
            OTransition: "oTransitionEnd",
            transition: "transitionend"
        };
        return e[Modernizr.prefixed("transition")];
    },
    animate: function(e, t, n) {
        e.one(this.animationend(), n);
        return e.addClass(t);
    },
    transitionIn: function(e, t, n) {
        return this.transition(e, t, "in", n);
    },
    transition: function(e, t, n, r) {
        var o, i, s, a, u;
        i = null;
        u = this.transitionend();
        s = [ t, "in" ].join("-");
        a = [ t, n, "active" ].join("-");
        e.addClass(s);
        _.defer(function() {
            return e.addClass(a);
        });
        o = function() {
            clearTimeout(i);
            e.removeClass([ s, a ].join(" "));
            if (typeof r == "function") {
                return r();
            }
            return;
        };
        i = setTimeout(function() {
            e.off(u, o);
            return o();
        }, 5e3);
        return e.one(u, o);
    },
    unsafeLink: function(e, t) {
        e = $("<div/>").text(e).html();
        return '<a class="external" href="' + t + '">' + e + "</a>";
    },
    textSelected: function() {
        var e;
        if (window.getSelection) {
            e = window.getSelection().toString();
        } else {
            if (document.selection) {
                e = document.selection.createRange().text;
            } else {
                e = undefined;
            }
        }
        return (e != null ? e.length : undefined) > 0;
    },
    urlDecode: function(e) {
        if (e == null) {
            return null;
        }
        return decodeURIComponent(e.replace(/\+/g, " "));
    },
    urlEncode: function(e) {
        if (e == null) {
            return "";
        }
        return encodeURIComponent(e).replace(/#{" "}/g, "+");
    },
    capitalize: function(e) {
        return e.split(" ").map(function(e) {
            return Helpers.capitalizeFirst(e);
        }).join(" ");
    },
    replaceDiacritics: function(e) {
        return o(e.toLowerCase());
    },
    capitalizeFirst: function(e) {
        var t;
        if (!e) {
            e = ""
        };
        return "" + (((t = e[0]) != null ? t.toUpperCase() : undefined) || "") + e.slice(1);
    },
    buttonConfirm: function(e, t, n) {
        var r, o;
        r = e.html();
        o = function(i) {
            _.delay(function() {
                if (e.hasClass("danger-button")) {
                    return e.one("click", n);
                }
                return;
            }, 300);
            e.one("mouseout", function() {
                e.removeClass("danger-button").html(r);
                e.off("click", n);
                return e.one("click", o);
            });
            return e.addClass("danger-button").text(t);
        };
        return e.one("click", o);
    },
    selectText: function(e) {
        var t, n;
        t = document.createRange();
        t.selectNodeContents(e);
        n = window.getSelection();
        n.removeAllRanges();
        return n.addRange(t);
    },
    clickWithin: function(e, t) {
        var n;
        n = $(e.target);
        return n.hasClass(t) || n.parents(t).length > 0;
    },
    confirmDelete: function() {
        return confirm("Do you want to permanently delete this message?\nWhen deleted, no one will be able to see the message anymore.");
    },
    addMixin: function(e, t) {
        var n;
        n = _.extend({}, e.prototype.events);
        _.extend(e.prototype, t);
        return e.prototype.events = _.extend(n, t.events);
    },
    csrfToken: function() {
        return $('meta[name="csrf-token"]').attr("content");
    },
    renderTemplate: function(e) {
        return function(t, n) {
            return e.render(t, _.assign({}, i, n));
        };
    },
    postBrowser: function(e, t, n, r) {
        var o, i, s;
        if (t == null) {
            t = "post"
        };
        if (n == null) {
            n = ""
        };
        if (r == null) {
            r = {}
        };
        if (t.toLowerCase() === "delete") {
            t = "post", r._method = "delete"
        };
        o = $("<form />", {
            action: e,
            method: t,
            style: "display: none;",
            target: n
        }).append("<input type='hidden' name='authenticity_token' value='" + Helpers.csrfToken() + "'>");
        for (i in r) {
            s = r[i];
            o.append($("<input>").attr({
                type: "hidden",
                name: i
            }).val(s));
        }
        return o.appendTo($("body")).submit();
    },
    colors: [ "#8848BA", "#FFCE1C", "#008BDD", "#433A85", "#D02C6B", "#17CEA6", "#00A651", "#55C1FF", "#FF6E84" ],
    stringToColor: function(e) {
        return this.colors[Math.abs(r(e) % this.colors.length)];
    },
    singleViewTip: function() {
        return _.sample([ 'Use <span class="keycode">Shift</span> + <i class="fa fa-arrow-up"></i>/<i class="fa fa-arrow-down"></i> to move between threads.', 'Hit <span class="keycode">Esc</span> twice to toggle between this thread and the main chat.', "@Mention people to bring this topic to their attention.", "Use #tags to make it easier to find this thread later on.", "Drag & drop to upload a file.", 'Hit <span class="keycode">Esc</span> - S to see a thread and the main chat side by side.' ]);
    },
    humanizeArray: function(e) {
        var t;
        if (e.length === 0) {
            return "";
        }
        if (e.length === 1) {
            return e[0];
        }
        t = e[e.length - 1];
        return e.slice(0, e.length - 1).join(", ") + (" and " + t);
    },
    endsWith: function(e, t) {
        return e.slice(e.length - t.length) === t;
    },
    openNewWindowAt: function(e) {
        var t;
        t = $("<a></a>").attr("target", "_blank").attr("rel", "noopener noreferrer").attr("href", e).css({
            display: "none"
        }).appendTo($("body"));
        t[0].click();
        return t.remove();
    }
}, r = function(e) {
    var t, n, r, o;
    for (t = 0, n = r = 0, o = e.length; o >= 0 ? o > r : r > o; n = o >= 0 ? ++r : --r) {
        t = e.charCodeAt(n) + ((t << 5) - t);
    }
    return t;
});
