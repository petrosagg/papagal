var r, o, i;

i = function(e) {
    var t;
    t = function(e) {
        var t;
        return _.some(function() {
            var n, r, o, i;
            for (o = [ "message-list", "touch-scrollable", "new-tab-results" ], i = [], n = 0, 
            r = o.length; r > n; n++) {
                t = o[n];
                i.push(-1 !== e.indexOf(t));
            }
            return i;
        }());
    };
    if (e.className && t(e.className) || e.tagName === "ARTICLE") {
        return e;
    }
    if (e.parentElement == null) {
        return !1;
    }
    return i(e.parentElement);
};

o = function(e) {
    return e.preventDefault();
};

r = function(e) {
    if (e.scrollTop <= 0) {
        return e.scrollTop = 1;
    }
    if (e.scrollTop + e.clientHeight >= e.scrollHeight) {
        return e.scrollTop = e.scrollHeight - e.clientHeight - 1;
    }
    return;
};

$(function() {
    document.body.addEventListener("touchstart", function(e) {
        var t;
        t = i(e.target);
        if (t) {
            return r(t);
        }
        return document.body.addEventListener("touchmove", o, !1);
    });
    return document.body.addEventListener("touchend", function() {
        return document.body.removeEventListener("touchmove", o, !1);
    });
});
