Flowdock.triggerMethod = function() {
    var e, t, n;
    t = /(^|:)(\w)/g;
    e = function(e, t, n) {
        return n.toUpperCase();
    };
    return n = function(n) {
        var r, o;
        o = "on" + n.replace(t, e);
        r = this[o];
        if (_.isFunction(this.trigger)) {
            this.trigger.apply(this, arguments)
        };
        if (_.isFunction(r)) {
            return r.apply(this, _.tail(arguments));
        }
        return;
    };
}();