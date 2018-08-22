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

Views.Shared.ReversedMessageList = function(e) {
    function ReversedMessageList() {
        return ReversedMessageList.__super__.constructor.apply(this, arguments);
    }
    r(ReversedMessageList, e);
    ReversedMessageList.prototype.renderGroup = function(e, n) {
        if (n == null) {
            n = {}
        };
        return ReversedMessageList.__super__.renderGroup.call(this, e, _.extend(n, {
            reverse: !0
        }));
    };
    ReversedMessageList.prototype.scrollLocation = function(e) {
        if (e != null) {
            this.el.scrollTop = this.el.scrollHeight - e - this.$el.outerHeight()
        };
        return this.el.scrollHeight - this.el.scrollTop - this.$el.outerHeight();
    };
    ReversedMessageList.prototype.insert = function(e, t) {
        var n, r, o;
        if (t == null) {
            t = !1
        };
        r = t ? "prepend" : "append";
        n = function() {
            var t, n, r;
            for (r = [], t = 0, n = e.length; n > t; t++) {
                o = e[t];
                o instanceof Element ? r.push(o) : (this.subview(o), r.push(o.el));
            }
            return r;
        }.call(this);
        this.$el[r](n);
        return this.propagateAttachedState(e);
    };
    ReversedMessageList.prototype.lastElement = function(e, t) {
        if (t == null) {
            t = 0
        };
        return e.slice(0, t + 1).last();
    };
    ReversedMessageList.prototype.firstElement = function(e, t) {
        if (t == null) {
            t = 0
        };
        return e.slice(-1 - t).first();
    };
    ReversedMessageList.prototype.elementOffset = function(e) {
        return this.viewport()[0].scrollHeight - e.offsetTop - e.offsetHeight;
    };
    ReversedMessageList.prototype.isCurrentItemVisible = function() {
        var e, t;
        e = this.$currentItem();
        if (e.length) {
            t = e.offset().top - this.$el.scrollTop();
            return t > this.$el.innerHeight;
        }
        return !1;
    };
    return ReversedMessageList;
}(Views.Shared.MessageList);