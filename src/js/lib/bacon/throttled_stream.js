Bacon.throttledStream = function(e, t, n) {
    return new Bacon.EventStream(function(r) {
        var o, i, s;
        s = false;
        i = function(s) {
            var a;
            e.removeEventListener(t, i, false);
            a = r(new Bacon.Next(s));
            if (a !== Bacon.noMore) {
                return setTimeout(o, n);
            }
            return;
        };
        o = function() {
            if (s) {
                return undefined;
            }
            return e.addEventListener(t, i, false);
        };
        o();
        return function() {
            s = true;
            return e.removeEventListener(t, i, false);
        };
    });
};
