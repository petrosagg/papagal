Cache.LRU = function() {
    function LRU() {
        this.queue = [];
        this.values = {};
    }
    LRU.prototype.insert = function(e) {
        return e;
    };
    LRU.prototype.drop = function(e) {};
    LRU.prototype.cleanup = function() {
        _.each(this.values, function(e) {
            return function(t) {
                return e.drop(t);
            };
        }(this));
        this.values = {};
        return this.queue = [];
    };
    LRU.prototype._removeFromQueue = function(e) {
        var t;
        t = this.queue.indexOf(e);
        if (t >= 0) {
            return this.queue.splice(t, 1);
        }
        return;
    };
    LRU.prototype["delete"] = function(e) {
        if (this.values[e]) {
            this.drop(this.values[e]);
            delete this.values[e];
            return this._removeFromQueue(e);
        }
        return;
    };
    LRU.prototype.peek = function(e) {
        return this.values[e];
    };
    LRU.prototype.load = function(e) {
        this.values[e] != null ? this._removeFromQueue(e) : this.values[e] = this.insert(e);
        this.queue.unshift(e);
        if (this.queue.length > this.maxLength) {
            this["delete"](_.last(this.queue))
        };
        return this.values[e];
    };
    return LRU;
}();
