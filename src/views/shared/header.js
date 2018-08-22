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

Views.Shared.Header = function(t) {
    function Header() {
        return Header.__super__.constructor.apply(this, arguments);
    }
    r(Header, t);
    Header.prototype.template = require("../../templates/threads/header.mustache");
    Header.prototype.tagName = "header";
    Header.prototype.className = "thread-header";
    Header.prototype.initialize = function(e) {
        this.message = e.message;
        this.listenTo(this.closeButton, "close", this.returnToList);
        this.listenTo(this.message, "change:actions", this.toggleActions);
        if (e.belowTitleProperty) {
            this.belowTitleProperty = e.belowTitleProperty
        };
        if (e.fullyLoaded) {
            return this.fullyLoaded = e.fullyLoaded;
        }
        return;
    };
    Header.prototype.onAfterRender = function() {
        this.title.setElement(this.$(".thread-title")).render();
        return this.actions.setElement(this.$(".thread-actions")).render();
    };
    Header.prototype.setCloseButton = function(e) {
        return this.closeButton.setElement(e).render();
    };
    Header.prototype.onAttach = function() {
        if (this.belowTitleProperty) {
            return this.trackScrollPosition();
        }
        return;
    };
    Header.prototype.returnToList = function() {
        return this.trigger("return-to-list");
    };
    Header.prototype.trackScrollPosition = function() {
        this.hide = this.untilEnd(this.belowTitleProperty().not());
        return this.hide.onValue(function(e) {
            return function(t) {
                return e.$el.toggleClass("hidden", t);
            };
        }(this));
    };
    Header.prototype.destructor = function() {
        Header.__super__.destructor.apply(this, arguments);
        return this.hide = this.belowTitleProperty = this.fullyLoaded = null;
    };
    return Header;
}(Flowdock.ItemView);