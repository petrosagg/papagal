var r = [].slice;

Collections.Combined = function() {
    function Combined() {
        var e, t, n, o, i;
        for (t = arguments.length >= 1 ? r.call(arguments, 0) : [], this.collections = t, 
        _.extend(this, Backbone.Events), i = this.collections, n = 0, o = i.length; o > n; n++) {
            e = i[n];
            this.listenTo(e, "all", function() {
                return this.trigger.apply(this, arguments);
            });
            this.listenTo(e, "add remove reset", this._updateLength);
        }
        this._updateLength();
    }
    Combined.prototype._updateLength = function() {
        var e, t, n, r, o;
        for (this.length = 0, r = this.collections, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            o.push(this.length += e.length);
        }
        return o;
    };
    Combined.prototype.each = function() {
        var e, t, n, r, o;
        for (r = this.collections, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            o.push(e.each.apply(e, arguments));
        }
        return o;
    };
    Combined.prototype.indexOf = function() {
        var e, t, n, r, o;
        for (o = this.collections, t = 0, r = o.length; r > t; t++) {
            e = o[t];
            n = e.indexOf.apply(e, arguments);
            if (n >= 0) {
                return n;
            }
        }
        return -1;
    };
    Combined.prototype.where = function() {
        var e, t, n, r, o;
        for (r = [], o = this.collections, t = 0, n = o.length; n > t; t++) {
            e = o[t];
            r = r.concat(e.where.apply(e, arguments));
        }
        return r;
    };
    Combined.prototype.remove = function() {
        var e, t, n, r, o;
        for (r = this.collections, o = [], t = 0, n = r.length; n > t; t++) {
            e = r[t];
            o.push(e.remove.apply(e, arguments));
        }
        return o;
    };
    Combined.prototype.add = function(e) {
        var t, n, r, o, i;
        for (o = this.collections, i = [], n = 0, r = o.length; r > n; n++) {
            t = o[n];
            if (e instanceof t.model) {
                i.push(t.add.apply(t, arguments))
            };
        }
        return i;
    };
    Combined.prototype.cleanup = function() {
        this.stopListening();
        return this.collections = [];
    };
    Combined.prototype.get = function() {
        var e, t, n, r, o;
        for (o = this.collections, t = 0, n = o.length; n > t; t++) {
            e = o[t];
            if (r = e.get.apply(e, arguments)) {
                return r;
            }
        }
    };
    Combined.prototype.find = function() {
        var e, t, n, r, o;
        for (o = this.collections, t = 0, n = o.length; n > t; t++) {
            e = o[t];
            if (r = e.find.apply(e, arguments)) {
                return r;
            }
        }
    };
    Combined.prototype.first = function() {
        var e, t, n, r, o;
        for (o = this.collections, t = 0, n = o.length; n > t; t++) {
            e = o[t];
            if (r = e.first.apply(e, arguments)) {
                return r;
            }
        }
    };
    Combined.prototype.getCollectionFor = function(e) {
        var t, n, r, o;
        for (o = this.collections, n = 0, r = o.length; r > n; n++) {
            t = o[n];
            if (e instanceof t.model) {
                return t;
            }
        }
    };
    Combined.prototype.getCollectionOfType = function(e) {
        var t, n, r, o;
        for (o = this.collections, n = 0, r = o.length; r > n; n++) {
            t = o[n];
            if (t instanceof e) {
                return t;
            }
        }
    };
    Combined.prototype.toArray = function() {
        var e, t, n, r, o;
        for (r = [], o = this.collections, t = 0, n = o.length; n > t; t++) {
            e = o[t];
            r = r.concat(e.toArray());
        }
        return r;
    };
    return Combined;
}();
