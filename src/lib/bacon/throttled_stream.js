Bacon.throttledStream = function(e, t, n) {
    return new Bacon.EventStream(function(r) {
        var o, i, s;
        s = !1;
        i = function(s) {
            var a;
            e.removeEventListener(t, i, !1);
            a = r(new Bacon.Next(s));
            if (a !== Bacon.noMore) {
                return setTimeout(o, n);
            }
            return;
        };
        o = function() {
            if (s) {
                return void 0;
            }
            return e.addEventListener(t, i, !1);
        };
        o();
        return function() {
            s = !0;
            return e.removeEventListener(t, i, !1);
        };
    });
};