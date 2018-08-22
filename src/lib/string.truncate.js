var r;

r = require("unicode-substring");

module.exports = function(e, t) {
    var n, o, i, s;
    if (t == null) {
        t = 80
    }
    i = new RegExp(FlowdockText.regexen.hashtagAlpha.source + "+$", "i")
    n = /[\s\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007F\u00A0-\u00BF]$/
    o = "…"
    s = s || o
    if (t >= e.length) {
        return e;
    }
    for (e = r(e, 0, t - s.length).replace(i, ""); e && n.test(e); ) {
        e = e.replace(n, "");
    }
    if (e) {
        return e + s;
    }
    return "";
};
