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

Views.KeyboardShortcuts = function(t) {
    function KeyboardShortcuts() {
        return KeyboardShortcuts.__super__.constructor.apply(this, arguments);
    }
    r(KeyboardShortcuts, t);
    KeyboardShortcuts.prototype.events = {
        "click #enable-kbs-btn": "enableShortcuts"
    };
    KeyboardShortcuts.prototype.render = function() {
        this.$el.html(Helpers.renderTemplate(require("../../templates/overlays/keyboard_shortcuts.mustache"))(this.shortcuts()));
        if (this.model.get("keyboard_shortcuts")) {
            this.$("#not-enabled-notice").hide()
        };
        return this;
    };
    KeyboardShortcuts.prototype.enableShortcuts = function() {
        this.model.save({
            keyboard_shortcuts: true
        });
        this.$("#not-enabled-notice").hide();
        return this.$(".shortcut-list").show();
    };
    KeyboardShortcuts.prototype.shortcuts = function(e) {
        var t, n;
        n = {
            unfocus: "ESC",
            nTab: "ESC [n]",
            prevNextTab: 'ESC <i class="fa fa-arrow-up"></i>/<i class="fa fa-arrow-down"></i>',
            firstUnread: "ESC A",
            closeTab: "ESC W",
            newTab: "ESC N or T",
            preferences: "ESC ,",
            toggleUsers: "ESC U",
            setDND: "ESC D",
            focusSearch: "ESC F",
            focusChat: "ESC I",
            toggleThread: "ESC ESC",
            refocus: "TAB",
            goBack: "BACKSPACE",
            help: "?",
            editMessage: '<i class="fa fa-arrow-up"/>',
            prevNextThread: /(windows)/.test((t = window.navigator.userAgent) != null ? t.toLowerCase() : undefined) ? 'Shift+<i class="fa fa-arrow-up"/>/<i class="fa fa-arrow-down"/>' : '⇧<i class="fa fa-arrow-up"/> / <i class="fa fa-arrow-down"/>',
            flipThread: "ESC S"
        };
        if (typeof macgap != "undefined" && macgap !== null) {
            return _.extend(n, {
                nTab: "⌘[n]",
                prevNextTab: '⌥⌘<i class="fa fa-arrow-up"></i>/<i class="fa fa-arrow-down"></i>',
                prevNextThread: '⌃⌘<i class="fa fa-arrow-up"></i> / <i class="fa fa-arrow-down"></i>',
                closeTab: "⌘W",
                newTab: "⌘T",
                preferences: "⌘,"
            });
        }
        if (typeof windowsApp != "undefined" && windowsApp !== null) {
            return _.extend(n, {
                nTab: "Ctrl+[n]",
                prevNextTab: "Ctrl+Tab",
                focusSearch: "Ctrl+F",
                newTab: "Ctrl+N/T"
            });
        }
        return n;
    };
    return KeyboardShortcuts;
}(Views.Shared.Overlay);
