exports.encode = function(e) {
    var t = "";
    for (var n in e) {
        if (e.hasOwnProperty(n)) {
            t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n])
        };
    }
    return t;
};

exports.decode = function(e) {
    for (var t = {}, n = e.split("&"), r = 0, o = n.length; o > r; r++) {
        var i = n[r].split("=");
        t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
    }
    return t;
};