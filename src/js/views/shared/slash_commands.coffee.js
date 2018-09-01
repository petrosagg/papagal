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

r = require("./menu_view");

i = require("./slash_commands_replace_warning");

o = function(t) {
    function n() {
        this.close = s(this.close, this);
        this.appendCommandText = s(this.appendCommandText, this);
        return n.__super__.constructor.apply(this, arguments);
    }
    a(n, t);
    n.prototype.id = "slash-commands";
    n.prototype.template = require("../../templates/shared/slash_commands.mustache");
    n.prototype.initialize = function(e) {
        if (e != null) {
            this.options = e;
        } else {
            this.options = {};
        }
        return _.defer(function(e) {
            return function() {
                var t;
                t = function(t) {
                    return !e.replaceTextWarning && (!$(t.target).closest("#" + e.id).length || KeyEvent.isKey("esc")(t));
                };
                return e.untilEnd($(window).asEventStream("blur click keyup")).filter(t).onValue(function() {
                    return e.close();
                });
            };
        }(this));
    };
    n.prototype.appendCommandText = function(e) {
        var t, n, r, o;
        o = this.options.parent.textarea.val();
        r = this.options.slashCommands.reduce(function(e, t) {
            var n;
            n = t.command;
            _.isArray(n) || (n = [ n ]);
            return e.concat(n.map(function(e) {
                return "/" + e;
            }));
        }, []);
        t = r.indexOf(o.split(" ")[0]) !== -1;
        n = $(e.currentTarget).find(".the-actual-command").html() + " ";
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.input_slash_option_selected);
        Flowdock.analytics.track(Flowdock.ANALYTICS_EVENT_TYPES.input_slash_action_ + n.slice(1));
        if (o === "") {
            this.options.parent.appendText(n);
            return this.close();
        }
        if (t) {
            this.options.parent.setText(n);
            return this.close();
        }
        if (this.replaceTextWarning) {
            this.replaceTextWarning.closeSelf(), this.replaceTextWarning = null
        };
        return this.showReplaceTextWarning(e, {
            commandText: n,
            inputBox: this.options.parent,
            close: function(e) {
                return function() {
                    return e.close();
                };
            }(this)
        });
    };
    n.prototype.close = function() {
        if (this.replaceTextWarning) {
            this.replaceTextWarning.closeSelf()
        };
        this.replaceTextWarning = null;
        return n.__super__.close.apply(this, arguments);
    };
    n.prototype.showReplaceTextWarning = function(e, t) {
        var n;
        n = new i(t);
        this.replaceTextWarning = this.subview(n);
        $("body").append(this.replaceTextWarning.render().$el);
        return this.replaceTextWarning.addTether(e.target, {
            targetAttachment: "bottom left",
            offset: "0 30px"
        });
    };
    n.prototype.buildMenu = function() {
        var e;
        e = this.options.slashCommands.filter(function(e) {
            return e.showInSlashCommandMenu;
        }).reduce(function(e, t) {
            var n, r, o, i, s, a;
            n = t.command;
            a = t.showInSlashCommandMenu;
            r = a.description;
            o = a.nameHelper;
            s = a.onlyShowCommand;
            _.isArray(n) || (n = [ n ]);
            i = n.filter(function(e) {
                return !s || e === s;
            }).map(function(e) {
                return {
                    description: r,
                    name: e,
                    nameHelper: o
                };
            });
            return e.concat(i);
        }, []).sort(function(e, t) {
            return e.name.localeCompare(t.name);
        }).map(function(e) {
            return '<div class="command-item"><div class="command-text"><span class="the-actual-command">/' + e.name + "</span>" + (e.nameHelper ? " " + e.nameHelper : "") + '</div><div class="command-description">' + e.description + "</div></div>";
        }).join("");
        return $(e).appendTo(this.$(".commands-content"));
    };
    n.prototype.events = function() {
        return {
            "click .command-item": "appendCommandText"
        };
    };
    return n;
}(r);

module.exports = o;
