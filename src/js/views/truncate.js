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
}, i = {}.hasOwnProperty;

r = function(e) {
    function t() {
        return t.__super__.constructor.apply(this, arguments);
    }
    var n;
    o(t, e);
    n = 100;
    t.prototype.initialize = function(e) {
        if (e == null) {
            e = {}
        };
        return this.truncated = _.defaults(e, {
            truncated: true
        }).truncated;
    };
    t.prototype.events = function() {
        return {
            "click .truncate-toggle": "onClick"
        };
    };
    t.prototype.collapse = function() {
        this.truncated = true;
        this.$(".truncate-wrap").toggleClass("truncate-open", false);
        return this.$(".truncate-toggle").attr("title", "Show the rest of this message");
    };
    t.prototype.expand = function() {
        this.truncated = false;
        this.$(".truncate-wrap").toggleClass("truncate-open", true);
        return this.$(".truncate-toggle").attr("title", "Collapse this message");
    };
    t.prototype.overflow = function() {
        if (this.el) {
            return this.el.scrollHeight > this.el.clientHeight + n;
        }
        return false;
    };
    t.prototype.onClick = function(e) {
        if (this.truncated) {
            return this.expand();
        }
        return this.collapse();
    };
    t.prototype.render = function() {
        this.$el.addClass("truncate-wrap");
        this.whenAttached(function() {
            if (this.overflow()) {
                this.wrap()
            };
            return this.$el.removeClass("truncate-wrap");
        });
        return this;
    };
    t.prototype.wrap = function() {
        var e, t;
        e = $("<a>").addClass("truncate-toggle");
        t = $("<div>").addClass("truncate-wrap");
        this.$el.wrapInner(t);
        this.$el.append(e);
        this.$el.addClass("truncated");
        if (this.truncated) {
            this.collapse();
        } else {
            this.expand();
        }
        return this;
    };
    return t;
}(Flowdock.HierarchicalView);

module.exports = r;
