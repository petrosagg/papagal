jQuery.fn.delayedHover = function(e, t) {
    if (e == null) {
        e = "hover"
    };
    this.asEventStream("mouseenter", t).flatMap(function(e) {
        var t, n, r, o;
        r = $(e.currentTarget).asEventStream("mouseenter").map(!0);
        o = $(e.currentTarget).asEventStream("mouseleave").map(!1);
        t = r.merge(o).flatMapLatest(function(t) {
            var n;
            if (t) {
                return Bacon.never();
            }
            n = $(e.currentTarget).data("close-delay");
            return Bacon.later(n || 0, {
                target: $(e.currentTarget),
                action: "close"
            });
        });
        n = $(e.currentTarget).data("hover-delay");
        return Bacon.later(n || 0, {
            target: $(e.currentTarget),
            action: "open"
        }).takeUntil(t).merge(t);
    }).skipDuplicates(function(e, t) {
        return e.action === t.action;
    }).onValue(function(t) {
        t.target.toggleClass(e, t.action === "open");
        return t.target.triggerHandler("hover-delay-" + t.action);
    });
    return this;
};
