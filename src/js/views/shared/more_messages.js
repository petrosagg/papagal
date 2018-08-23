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

Views.Shared.MoreMessages = function(t) {
    function MoreMessages() {
        return MoreMessages.__super__.constructor.apply(this, arguments);
    }
    r(MoreMessages, t);
    MoreMessages.prototype.className = "more-messages";
    MoreMessages.prototype.events = {
        click: "dismiss"
    };
    MoreMessages.prototype.initialize = function(e) {
        this.counter = new Bacon.Bus();
        this.direction = e.direction;
        this.list = e.scrollable;
        this.predicate = e.removeWhen || function(e) {
            return e.target.scrollTop === 0;
        };
        this.onRemoved = e.onRemoved || function() {};
        this.addStream(this.scrollHandling());
        return this.addStream(this.countHandling());
    };
    MoreMessages.prototype.render = function(t) {
        var n;
        n = {
            below: "icon-arrow-down-4",
            above: "icon-arrow-up-3"
        };
        this.$el.html(Helpers.renderTemplate(require("../../templates/shared/more_messages.mustache"))({
            direction: this.direction,
            iconClass: n[this.direction],
            count: t
        }));
        this.$el.addClass(this.direction);
        return this;
    };
    MoreMessages.prototype.countHandling = function() {
        return this.counter.scan(1, function(e, t) {
            return e + t;
        }).skip(1).onValue(function(e) {
            return function(t) {
                return e.render(t);
            };
        }(this));
    };
    MoreMessages.prototype.scrollHandling = function() {
        return this.list.asEventStream("scroll").filter(this.predicate).onValue(function(e) {
            return function() {
                return e.dismiss();
            };
        }(this));
    };
    MoreMessages.prototype.increment = function() {
        return this.counter.push(1);
    };
    MoreMessages.prototype.decrement = function() {
        return this.counter.push(-1);
    };
    MoreMessages.prototype.dismiss = function(e) {
        if (e != null) {
            e.preventDefault()
        };
        this.onRemoved();
        return this.destructor();
    };
    MoreMessages.prototype.destructor = function() {
        var e;
        if ((e = this.counter) != null) {
            e.end()
        };
        MoreMessages.__super__.destructor.apply(this, arguments);
        return this.counter = this.list = this.onRemoved = this.predicate = null;
    };
    return MoreMessages;
}(Flowdock.HierarchicalView);
