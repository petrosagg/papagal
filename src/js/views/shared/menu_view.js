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
    o(t, e);
    t.prototype.initialize = function(e) {
        if (e != null) {
            this.options = e;
        } else {
            this.options = {};
        }
        return _.defer(function(e) {
            return function() {
                e.untilEnd($(window).asEventStream("blur click keyup")).filter(function(t) {
                    return !$(t.target).closest("#" + e.id).length || KeyEvent.isKey("esc")(t);
                }).onValue(function() {
                    return e.close();
                });
                return e.untilEnd(e.$el.asEventStream("keydown")).filter(function(e) {
                    var t;
                    return (t = e.which) === 13 || t === 37 || t === 38 || t === 39 || t === 40;
                }).onValue(e.handleKeys);
            };
        }(this));
    };
    t.prototype.addTether = function(e) {
        t.__super__.addTether.apply(this, arguments);
        this.$el.addClass("menu-view-tether");
        return this.buildMenu();
    };
    t.prototype.buildMenu = function() {
        throw "Must override buildMenu in subclass";
    };
    t.prototype.close = function() {
        return Helpers.animate(this.$el, "menu-view-tether-leave", function(e) {
            return function() {
                var t;
                if ((t = e.tether) != null) {
                    t.destroy()
                };
                e.destructor();
                if (e.options.parent) {
                    return e.options.parent.focus();
                }
                return;
            };
        }(this));
    };
    return t;
}(Flowdock.ItemView);

module.exports = r;
