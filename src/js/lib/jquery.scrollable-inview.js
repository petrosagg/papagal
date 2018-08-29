var r;

r = null;

$.fn.scrollableInview = function(e, t) {
    if (e == null) {
        e = {}
    };
    if (e === "destroy") {
        this.each(function() {
            var e;
            if ((e = $(this).data("inview")) != null) {
                return e.unsubscribe();
            }
            return;
        });
    } else if (e === "remove") {
        this.each(function() {
            var e, n, r, o;
            e = $(this);
            if (n = e.data("inview")) {
                for (;(r = n.callbacks.indexOf(t)) >= 0; ) {
                    [].splice.apply(n.callbacks, [ r, r - r + 1 ].concat(o = []));
                    o;
                }
                if (n.callbacks.length === 0) {
                    return n.unsubscribe();
                }
                return;
            }
        });
    } else this.each(function() {
        var t, n, o, i, s, a, u;
        t = $(this);
        i = t.data("inview");
        if (i != null) {
            return void i.callbacks.push(e.onInview);
        }
        i = {
            callbacks: [ e.onInview ]
        };
        n = $(e.scrollParent);
        if (n.length === 0) {
            n = t.parent()
        };
        u = function() {
            var e, t, n, r;
            for (r = i.callbacks, t = 0, n = r.length; n > t; t++) {
                (e = r[t])();
            }
            return i.unsubscribe();
        };
        o = function() {
            if ($.contains($("body")[0], t[0]) && n.is(":visible") && t.visible(!e.fully)) {
                return u();
            }
            return;
        };
        r || (r = Bacon.fromPoll(1e3, function() {
            return new Bacon.Next();
        }));
        s = n.data("inview-scroll-stream");
        s || (s = n.asEventStream("scroll").debounce(50).merge(r));
        n.data("inview-scroll-stream", s);
        a = s.onValue(o);
        _.defer(o);
        i.unsubscribe = function() {
            a();
            return t.data("inview", null);
        };
        return t.data("inview", i);
    });
    return this;
};
