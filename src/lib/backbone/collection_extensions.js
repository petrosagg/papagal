_.extend(Backbone.Collection.prototype, {
    isLoadingStream: function() {
        var e, t, n;
        e = this.asEventStream("request", function(e, t) {
            return t;
        });
        n = this.asEventStream("sync");
        t = function(e) {
            var t;
            t = n.filter(function() {
                return e.readyState === 4;
            }).take(1);
            return Bacon.once(!0).merge(t.map(!1));
        };
        return e.flatMapLatest(t);
    }
});