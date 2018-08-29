var r, o;

r = function(e) {
    var t, n, r, o;
    for (o = e + "=", n = document.cookie.split(";"), r = 0; r < n.length; ) {
        for (t = n[r]; t.charAt(0) === " "; ) {
            t = t.substring(1, t.length);
        }
        if (t.indexOf(o) === 0) {
            return t.substring(o.length, t.length);
        }
        r++;
    }
    return null;
};

o = function(e, t, n) {
    var r, o;
    if (n) {
        r = new Date();
        r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3);
        o = "; expires=" + r.toGMTString();
    } else {
        o = "";
    }
    return document.cookie = e + "=" + t + o + "; path=/";
};

module.exports = {
    getCookie: r,
    setCookie: o
};
