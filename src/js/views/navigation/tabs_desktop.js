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

Views.Navigation.Tabs.Desktop = function(e) {
    function Desktop() {
        return Desktop.__super__.constructor.apply(this, arguments);
    }
    r(Desktop, e);
    Desktop.ACTIVE_CLASS = "active";
    Desktop.prototype.className = "desktop clean";
    Desktop.prototype.keyboardEvents = {
        nextTab: "navigateToNextTab",
        previousTab: "navigateToPreviousTab",
        navigateToNthTab: "navigateToNthTab",
        newTab: "navigateToNewTab",
        unreadTab: "navigateToUnreadTab"
    };
    Desktop.prototype.initialize = function(e) {
        Desktop.__super__.initialize.apply(this, arguments);
        this.bindKeyboardEvents();
        return this.$el.delayedHover(Views.Navigation.Tabs.Desktop.ACTIVE_CLASS, ".dropdown");
    };
    Desktop.prototype.navigateToNextTab = function(e) {
        var t;
        if (e != null) {
            e.preventDefault()
        };
        if (e != null) {
            e.stopPropagation()
        };
        t = this._currentIndex();
        if (t < this._tabCount()) {
            return this.navigateToNthTab(t + 1);
        }
        return this.navigateToNthTab(1);
    };
    Desktop.prototype.navigateToPreviousTab = function(e) {
        var t;
        if (e != null) {
            e.preventDefault()
        };
        if (e != null) {
            e.stopPropagation()
        };
        t = this._currentIndex();
        if (t > 1) {
            return this.navigateToNthTab(t - 1);
        }
        return this.navigateToNthTab(this._tabCount());
    };
    Desktop.prototype.navigateToUnreadTab = function(e) {
        var t;
        if (e != null) {
            e.preventDefault()
        };
        if (e != null) {
            e.stopPropagation()
        };
        t = this.$(".tab .activity-indicator-mentions").not(".current").first().closest("a.tab-link");
        if (0 !== t.length) {
            return t.click();
        }
        return this.$(".tab .activity-indicator-chat").first().closest("a.tab-link").click();
    };
    Desktop.prototype.onAttach = function() {
        return this.$tabListContent.wrap("<div class='scroll-wrapper'></div>").parent().nanoScroller({
            contentClass: "tab-list-content",
            iOSNativeScrolling: true
        });
    };
    Desktop.prototype.flowOpenChanged = function() {
        Desktop.__super__.flowOpenChanged.apply(this, arguments);
        return _.defer(function(e) {
            return function() {
                return e.refreshScrollbar();
            };
        }(this));
    };
    Desktop.prototype.refreshScrollbar = function() {
        return this.$(".scroll-wrapper").nanoScroller();
    };
    Desktop.prototype.navigateToNewTab = function() {
        return Flowdock.app.router.navigateTo({
            showNewTab: true
        });
    };
    Desktop.prototype._currentIndex = function() {
        return this.$(".current").index(".tab") + 1;
    };
    Desktop.prototype._tabCount = function() {
        return this.$(".tab").length;
    };
    return Desktop;
}(Views.Navigation.Tabs);

_.extend(Views.Navigation.Tabs.Desktop.prototype, Flowdock.KeyboardEvents);
