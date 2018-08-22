var r, o, i, s, a;

for (o = 0, a = [ "ms", "moz", "webkit", "o" ], r = 0, i = a.length; i > r; r++) {
    s = a[r];
    window.requestAnimationFrame || (window.requestAnimationFrame = window[s + "RequestAnimationFrame"], 
    window.cancelAnimationFrame = window[s + "CancelAnimationFrame"] || window[s + "CancelRequestAnimationFrame"]);
}

window.requestAnimationFrame || (window.requestAnimationFrame = function(e, t) {
    var n, r, i;
    n = new Date().getTime();
    i = Math.max(0, 16 - (n - o));
    r = setTimeout(function() {
        return e(n + i);
    }, i);
    o = n + i;
    return r;
});

window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e) {
    return clearTimeout(e);
});

Bacon.fromAnimationFramePoll = function(e, t) {
    return new EventStream(function(n) {
        var r, o, i;
        o = void 0;
        r = function() {
            return window.requestAnimationFrame(function() {
                var e, r;
                r = t();
                e = n(r);
                if (e === Bacon.noMore || r.isEnd()) {
                    return i();
                }
                return;
            });
        };
        i = function() {
            return clearInterval(o);
        };
        o = setInterval(r, e);
        return i;
    });
};